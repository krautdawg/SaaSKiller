import dotenv from 'dotenv';

dotenv.config();

// Perplexity API Integration
export async function callPerplexityAPI(query) {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY not configured');
  }

  try {
    console.log(`[Perplexity] Analyzing tool: ${query}`);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'You are a SaaS tool analyzer. Return ONLY valid JSON with the exact schema shown in the example. No markdown, no code blocks, just raw JSON.'
          },
          {
            role: 'user',
            content: `Analyze the SaaS tool "${query}" and return this exact JSON structure:
{
  "name": "Tool Name",
  "website": "https://example.com",
  "category": "communication",
  "short_description": "Brief one-sentence description of the tool",
  "logo_url": "https://logo.clearbit.com/example.com",
  "core_features": [
    {
      "id": 1,
      "name": "User Management",
      "description": "Create, edit, and manage user accounts",
      "icon": "users",
      "priority": 1
    },
    {
      "id": 2,
      "name": "Team Collaboration",
      "description": "Real-time collaboration features",
      "icon": "users",
      "priority": 2
    }
  ],
  "bloaty_features": [
    {
      "id": 1,
      "name": "Advanced Analytics Dashboard",
      "description": "Complex reporting rarely used by 80%+ of users",
      "icon": "bar-chart",
      "priority": 1
    },
    {
      "id": 2,
      "name": "White Label Branding",
      "description": "Customize platform with your brand",
      "icon": "palette",
      "priority": 2
    }
  ],
  "subscription_tiers": [
    {
      "tier_name": "Free",
      "tier_order": 0,
      "price_monthly": 0,
      "price_yearly": 0,
      "price_model": "flat",
      "user_limit": 10,
      "notes": "Limited features for small teams"
    },
    {
      "tier_name": "Pro",
      "tier_order": 1,
      "price_monthly": 15.00,
      "price_yearly": 150.00,
      "price_model": "per_seat",
      "user_limit": null,
      "notes": "Most popular tier for growing teams"
    }
  ]
}

CRITICAL RULES:
1. **Core Features (GET ALL - NO LIMIT):
   - List EVERY essential feature used by 80%+ of customers
   - Include all basic functionality that defines the tool
   - Examples: "Send Messages", "File Sharing", "User Authentication", "Search"
   - Don't artificially limit - some tools have 8 core features, others have 40+
   - Assign priority 1-100 (lower = more important/commonly used)
   - Priority helps UI show "top 20" but store ALL

2. **Bloaty Features (GET ALL - NO LIMIT):
   - List EVERY advanced feature rarely used by 80%+ of customers
   - Enterprise-only or niche functionality
   - Examples: "Advanced Security Controls", "Custom Integrations", "White Labeling"
   - Some tools have 3 bloaty features, others have 20+
   - Assign priority 1-100 (lower = more important among bloat features)
   - Priority helps UI show "top 10" but store ALL

3. **Feature Descriptions:
   - Keep under 100 characters
   - Focus on "what" not "why"
   - No marketing fluff

4. **Feature Icons:
   - Use Lucide React icon names (lowercase, hyphenated)
   - Examples: "users", "message-circle", "file", "lock", "settings", "zap"
   - Choose icons that visually represent the feature

5. **Feature Priority (NEW):
   - Assign priority number 1-100 to each feature
   - Priority 1 = most important/commonly used
   - Priority 100 = least important/rarely used
   - For core features: rank by usage frequency (e.g., "Send Message" = 1, "Export Data" = 40)
   - For bloaty features: rank by how bloated (e.g., "Basic Reports" = 1, "AI Predictions" = 10)
   - This allows UI to show "top 20 core" and "top 10 bloat" while storing all

6. **Subscription Tiers (2-5 tiers):
   - Look up actual current pricing from the vendor's website
   - tier_order: 0 (cheapest) to 4 (most expensive)
   - price_model: "per_seat" (price per user), "flat" (fixed price), or "usage_based"
   - price_monthly: Monthly price in USD (0 for free tier)
   - price_yearly: Annual price in USD (typically 10-20% discount from monthly × 12)
   - user_limit: Max users (null if unlimited)
   - Include Free/Trial tier if available
   - Include Enterprise tier (can set price_monthly as null if "Contact Sales")

7. **Category:
   - Choose ONE from: communication, productivity, development, design, marketing,
     sales-crm, analytics, project-management, finance, hr-recruiting

8. **Data Accuracy:
   - Use current 2025 pricing data
   - If pricing unavailable, estimate reasonably based on similar tools
   - Be honest if you're unsure (note in "notes" field)

Return ONLY valid JSON. No markdown, no explanations, just the raw JSON object.`
          }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Clean JSON if wrapped in markdown code blocks
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/```json?\n?/g, '').replace(/```\n?$/g, '');
    }

    // Log raw response for debugging
    console.log('[Perplexity] Raw response preview:', cleanedContent.substring(0, 500) + '...');

    let toolData;
    try {
      toolData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('[Perplexity] JSON parse failed. Full response:', cleanedContent);
      throw new Error(`Failed to parse JSON response: ${parseError.message}`);
    }

    // Log parsed structure
    console.log('[Perplexity] Parsed structure:', {
      hasName: !!toolData.name,
      hasCoreFeatures: !!toolData.core_features,
      coreIsArray: Array.isArray(toolData.core_features),
      coreCount: toolData.core_features?.length,
      hasBloatyFeatures: !!toolData.bloaty_features,
      bloatyIsArray: Array.isArray(toolData.bloaty_features),
      bloatyCount: toolData.bloaty_features?.length,
      hasTiers: !!toolData.subscription_tiers,
      tiersIsArray: Array.isArray(toolData.subscription_tiers),
      tiersCount: toolData.subscription_tiers?.length
    });

    // Validate new structure
    if (!toolData.name) {
      throw new Error('Missing required field: name');
    }
    if (!toolData.core_features || !Array.isArray(toolData.core_features)) {
      throw new Error('core_features must be an array');
    }
    if (!toolData.bloaty_features || !Array.isArray(toolData.bloaty_features)) {
      throw new Error('bloaty_features must be an array');
    }
    if (toolData.core_features.length === 0) {
      throw new Error('Tool must have at least 1 core feature');
    }
    if (!toolData.subscription_tiers || !Array.isArray(toolData.subscription_tiers)) {
      throw new Error('subscription_tiers must be an array');
    }
    if (toolData.subscription_tiers.length < 2) {
      throw new Error('Expected at least 2 subscription tiers');
    }

    // Sort features by priority (lowest priority number = most important)
    toolData.core_features.sort((a, b) => (a.priority || 999) - (b.priority || 999));
    toolData.bloaty_features.sort((a, b) => (a.priority || 999) - (b.priority || 999));

    console.log(`[Perplexity] ✅ Successfully analyzed ${toolData.name} (${toolData.core_features.length} core, ${toolData.bloaty_features.length} bloat, ${toolData.subscription_tiers.length} tiers)`);
    return toolData;

  } catch (error) {
    console.error('[Perplexity] ❌ Error:', error.message);
    throw error;
  }
}

// Custom Feature Analysis - Lightweight Perplexity call for single features
export async function analyzeCustomFeature(featureName) {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY not configured');
  }

  try {
    console.log(`[Perplexity] Analyzing custom feature: ${featureName}`);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'You are a software development estimator. Return ONLY valid JSON. No markdown, no explanations.'
          },
          {
            role: 'user',
            content: `Estimate the development complexity and hours for this custom feature: "${featureName}"

Return this exact JSON structure:
{
  "complexity": "simple",
  "estimated_hours": 3
}

Rules:
- complexity must be "simple", "medium", or "complex"
  - simple: Basic UI/UX features, simple CRUD (2-4 hours)
  - medium: Moderate logic, integrations, real-time features (8-16 hours)
  - complex: Advanced infrastructure, AI, video/voice, complex workflows (40-80 hours)
- estimated_hours: Realistic time for a solo developer at $150/hour
  - Include frontend, backend, testing, deployment
  - Consider the feature described in: "${featureName}"
- Be realistic and err on the side of medium complexity if uncertain`
          }
        ],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Clean JSON if wrapped in markdown
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/```json?\n?/g, '').replace(/```\n?$/g, '');
    }

    const featureData = JSON.parse(cleanedContent);

    // Validate structure
    if (!featureData.complexity || !featureData.estimated_hours) {
      throw new Error('Invalid response structure from Perplexity');
    }

    // Validate complexity values
    const validComplexities = ['simple', 'medium', 'complex'];
    if (!validComplexities.includes(featureData.complexity)) {
      console.warn(`[Perplexity] Invalid complexity "${featureData.complexity}", defaulting to medium`);
      featureData.complexity = 'medium';
    }

    // Validate hours is a reasonable number
    if (typeof featureData.estimated_hours !== 'number' || featureData.estimated_hours < 1 || featureData.estimated_hours > 200) {
      console.warn(`[Perplexity] Invalid hours ${featureData.estimated_hours}, using default for ${featureData.complexity}`);
      const defaults = { simple: 3, medium: 12, complex: 60 };
      featureData.estimated_hours = defaults[featureData.complexity] || 12;
    }

    console.log(`[Perplexity] ✅ Analyzed: ${featureData.complexity} (${featureData.estimated_hours}h)`);
    return featureData;

  } catch (error) {
    console.error('[Perplexity] ❌ Error analyzing custom feature:', error.message);
    throw error;
  }
}
