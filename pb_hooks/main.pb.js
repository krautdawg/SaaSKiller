/// <reference path="../pb_data/types.d.ts" />

// Register custom route for tool analysis
routerAdd("POST", "/api/analyze", (e) => {
  try {
    // 1. Extract query from request
    const data = $apis.requestInfo(e).data;
    const query = data.query || "";

    if (!query) {
      throw new BadRequestError("Missing query parameter");
    }

    // 2. Normalize query (lowercase, trim)
    const normalizedQuery = query.toLowerCase().trim();

    $app.logger().info("Analysis request", { query: normalizedQuery });

    // 3. Check cache first (try exact match first, then fuzzy)
    try {
      const records = $app.dao().findRecordsByFilter(
        "tools",
        `name ~ "${normalizedQuery}"`,
        "-created",
        1
      );

      if (records.length > 0) {
        const cached = records[0];
        $app.logger().info("Cache hit", { tool: cached.get("name") });
        return e.json(200, {
          id: cached.id,
          name: cached.get("name"),
          monthly_cost: cached.get("monthly_cost"),
          features: cached.get("features")
        });
      }
    } catch (err) {
      // Not found in cache, proceed to Perplexity
      $app.logger().info("Cache miss, calling Perplexity");
    }

    // 4. Get Perplexity API key from server environment
    const perplexityApiKey = os.getenv("PERPLEXITY_API_KEY");

    if (!perplexityApiKey) {
      throw new Error("PERPLEXITY_API_KEY not set in server environment");
    }

    // 5. Prepare Perplexity prompt
    const systemPrompt = `You are a SaaS analysis expert. Analyze the following SaaS tool and return ONLY valid JSON in this exact format (no markdown, no code blocks):

{
  "name": "Official Product Name",
  "monthly_cost": 150,
  "features": [
    {"name": "Feature 1", "type": "core"},
    {"name": "Feature 2", "type": "bloat"}
  ]
}

Rules:
- monthly_cost: Base per-user monthly price in USD (number only, no $)
- features: List 5-8 features typical users actually interact with
- type: "core" for essential features used daily by small businesses, "bloat" for advanced/enterprise features
- Focus on SMALL BUSINESS usage (1-25 employees)`;

    const userPrompt = `Analyze the SaaS tool: "${query}"`;

    // 6. Make synchronous HTTP request to Perplexity
    const response = $http.send({
      url: "https://api.perplexity.ai/chat/completions",
      method: "POST",
      headers: {
        "Authorization": "Bearer " + perplexityApiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1000
      }),
      timeout: 10 // 10 second timeout
    });

    // 7. Parse Perplexity response
    if (response.statusCode !== 200) {
      $app.logger().error("Perplexity API error", {
        status: response.statusCode,
        body: response.raw
      });
      throw new Error("Perplexity API request failed with status " + response.statusCode);
    }

    const perplexityData = response.json;
    const contentText = perplexityData.choices[0].message.content;

    $app.logger().info("Perplexity raw response", { content: contentText });

    // 8. Extract JSON from response (handle markdown code blocks)
    let toolData;
    try {
      // Try direct JSON parse first
      toolData = JSON.parse(contentText);
    } catch (e) {
      // Try extracting from markdown code block
      const jsonMatch = contentText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        toolData = JSON.parse(jsonMatch[1]);
      } else {
        // Try finding raw JSON in text
        const rawJsonMatch = contentText.match(/\{[\s\S]*\}/);
        if (rawJsonMatch) {
          toolData = JSON.parse(rawJsonMatch[0]);
        } else {
          throw new Error("Failed to parse Perplexity response as JSON");
        }
      }
    }

    // 9. Validate response structure
    if (!toolData.name || !toolData.monthly_cost || !toolData.features) {
      $app.logger().error("Invalid tool data structure", { toolData: toolData });
      throw new Error("Invalid tool data structure from Perplexity");
    }

    if (!Array.isArray(toolData.features) || toolData.features.length === 0) {
      throw new Error("Features array is missing or empty");
    }

    // Validate features have required fields
    for (let i = 0; i < toolData.features.length; i++) {
      const feature = toolData.features[i];
      if (!feature.name || !feature.type) {
        throw new Error("Feature missing name or type at index " + i);
      }
      if (feature.type !== "core" && feature.type !== "bloat") {
        throw new Error("Feature type must be 'core' or 'bloat' at index " + i);
      }
    }

    // 10. Create slug
    const slug = toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // 11. Write to cache (tools collection)
    const collection = $app.dao().findCollectionByNameOrId("tools");
    const record = new Record(collection);

    record.set("name", toolData.name);
    record.set("slug", slug);
    record.set("monthly_cost", toolData.monthly_cost);
    record.set("features", toolData.features);

    $app.dao().saveRecord(record);

    $app.logger().info("Tool cached", {
      id: record.id,
      name: record.get("name")
    });

    // 12. Return response to frontend
    return e.json(200, {
      id: record.id,
      name: record.get("name"),
      monthly_cost: record.get("monthly_cost"),
      features: record.get("features")
    });

  } catch (err) {
    $app.logger().error("Analysis endpoint error", {
      error: err.message,
      stack: err.stack
    });

    return e.json(500, {
      error: "Failed to analyze tool",
      message: err.message
    });
  }
});

// Add CORS middleware
routerUse((e) => {
  e.response.header().set("Access-Control-Allow-Origin", "*");
  e.response.header().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  e.response.header().set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (e.request.method === "OPTIONS") {
    return e.noContent(204);
  }

  return e.next();
});
