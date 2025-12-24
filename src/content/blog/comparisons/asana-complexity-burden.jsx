import React from 'react';

export const AsanaComplexityBurdenComparison = () => {
  return (
    <>
      <h2>Asana's Complexity Burden: When a Simple Task Manager Becomes Your Second Job</h2>
      <p>
        Asana starts simple. You create projects. You add tasks. You assign them. It works.
      </p>

      <p>
        But Asana has depth. Custom fields. Dependencies. Portfolio management. Templates. Automations. Rules. Webhooks.
      </p>

      <p>
        Teams quickly discover: to actually use Asana effectively, you need to spend 20+ hours setting it up. And 2-3 hours per week maintaining it.
      </p>

      <p>
        For a 10-person team, that's 100+ hours annually managing Asana instead of actual work. At $50/hour, that's $5,000 in overhead. But you're only paying $3,000 for Asana itself.
      </p>

      <h3>The Asana Setup Trap</h3>

      <p>
        Here's what happens when you set up Asana "the right way":
      </p>

      <ul>
        <li><strong>Project templates:</strong> You create templates for different project types (marketing campaign, software release, customer project). 5 hours of initial setup.</li>
        <li><strong>Custom fields:</strong> You add fields for Priority, Status, Budget, Timeline, Owner, Tags, etc. Each field needs rules and defaults. 3 hours.</li>
        <li><strong>Portfolios:</strong> You want to see all projects across the company. You set up portfolios by department. 2 hours.</li>
        <li><strong>Dependencies:</strong> You link tasks (Task B depends on Task A). This makes sense but adds complexity. 4 hours learning curve.</li>
        <li><strong>Automation rules:</strong> When status changes to "Done," auto-mark related tasks. When Owner changes, send notification. 3 hours setting up rules.</li>
        <li><strong>Timeline and Gantt charts:</strong> You want to see the project timeline visually. Set that up. 2 hours.</li>
      </ul>

      <p>
        Total: 19 hours to set up Asana "correctly." That's almost a week of work for a project manager or one engineer doing setup.
      </p>

      <h3>Then Maintenance Starts</h3>

      <p>
        Once Asana is set up, someone needs to maintain it:
      </p>

      <ul>
        <li><strong>Weekly cleanup:</strong> Archive completed projects, delete test tasks, update portfolio status. 1 hour/week.</li>
        <li><strong>Template updates:</strong> New project type discovered, add to templates. New field needed, add custom field, update all existing projects. 1 hour/week.</li>
        <li><strong>Help desk:</strong> "How do I add a custom field?" "Why isn't my task showing up in the report?" "Can we change the project structure?" 2 hours/week.</li>
        <li><strong>Integration maintenance:</strong> Asana is connected to Slack, Google Calendar, your CRM. Something breaks, debug it. 1 hour/week.</li>
      </ul>

      <p>
        That's 5 hours per week = 250 hours per year = $12,500 in overhead (at $50/hour).
      </p>

      <p>
        You're paying $3,000/year for Asana but spending $12,500 keeping it working. The real cost is 4x the subscription.
      </p>

      <h3>The Complexity Problem</h3>

      <p>
        Asana becomes a problem because:
      </p>

      <ul>
        <li><strong>It's flexible to the point of confusion.</strong> You can do project management 10 different ways in Asana. Everyone has a different approach. Chaos.</li>
        <li><strong>It requires training.</strong> New employees need to learn your custom field structure, your project naming convention, your status workflow. That takes time.</li>
        <li><strong>It's not self-explanatory.</strong> Unlike Trello (which is obvious), Asana requires setup. If you don't have someone maintaining it, it falls apart.</li>
        <li><strong>It becomes critical infrastructure.</strong> Once everything is in Asana, switching is hard. You're locked in because migration is painful.</li>
      </ul>

      <h3>When Asana's Complexity Is Worth It</h3>

      <p>
        Asana makes sense if:
      </p>

      <ul>
        <li>You have 20+ projects running simultaneously and need real portfolio management</li>
        <li>You have dependencies across teams (marketing → design → engineering → launch)</li>
        <li>You have a dedicated project manager who loves Asana</li>
        <li>Your projects are complex enough that a simple board (Trello) doesn't work</li>
      </ul>

      <p>
        Asana is overkill if:
      </p>

      <ul>
        <li>You have &lt;5 concurrent projects</li>
        <li>You don't have clear dependencies across teams</li>
        <li>Your team is &lt;10 people</li>
        <li>You just want to see "what's in progress" without complex reporting</li>
      </ul>

      <h3>Asana vs Simpler Alternatives</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Tool</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Setup Time</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Monthly Maintenance</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Complexity</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Trello</td>
            <td style={{ padding: '12px' }}>1–2 hours</td>
            <td style={{ padding: '12px' }}>30 minutes</td>
            <td style={{ padding: '12px' }}>Low</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Linear</td>
            <td style={{ padding: '12px' }}>3–5 hours</td>
            <td style={{ padding: '12px' }}>1 hour</td>
            <td style={{ padding: '12px' }}>Medium (great defaults)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Notion</td>
            <td style={{ padding: '12px' }}>5–10 hours</td>
            <td style={{ padding: '12px' }}>2–3 hours</td>
            <td style={{ padding: '12px' }}>Medium (abandoned often)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Asana</td>
            <td style={{ padding: '12px' }}>15–25 hours</td>
            <td style={{ padding: '12px' }}>4–6 hours</td>
            <td style={{ padding: '12px' }}>High</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Monday</td>
            <td style={{ padding: '12px' }}>10–15 hours</td>
            <td style={{ padding: '12px' }}>3–4 hours</td>
            <td style={{ padding: '12px' }}>Medium-High</td>
          </tr>
        </tbody>
      </table>

      <h3>The Real Cost Analysis</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Cost Type</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Trello</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Asana</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Subscription (10 people/year)</td>
            <td style={{ padding: '12px' }}>$600</td>
            <td style={{ padding: '12px' }}>$3,000</td>
            <td style={{ padding: '12px' }}>Asana +$2,400</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Setup cost (10 hours × $50)</td>
            <td style={{ padding: '12px' }}>$500</td>
            <td style={{ padding: '12px' }}>$1,000</td>
            <td style={{ padding: '12px' }}>Asana +$500</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Annual maintenance (100 hours × $50)</td>
            <td style={{ padding: '12px' }}>$1,500</td>
            <td style={{ padding: '12px' }}>$5,000</td>
            <td style={{ padding: '12px' }}>Asana +$3,500</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Total 3-year cost</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$6,900</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$24,000</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Asana costs 3.5x more</td>
          </tr>
        </tbody>
      </table>

      <h3>What You Should Do</h3>

      <p>
        <strong>If you have &lt;10 concurrent projects:</strong> Use Trello ($50/year). You're overthinking this.
      </p>

      <p>
        <strong>If you have 10–20 projects:</strong> Use Linear ($0 or $10/user). It has better defaults than Asana. Less setup required.
      </p>

      <p>
        <strong>If you have 20+ projects and cross-team dependencies:</strong> Use Asana. Accept the 20-hour setup and 5-hour/week maintenance. Budget $24K over 3 years.
      </p>

      <p>
        But most teams claim they need Asana and actually just need Trello with better discipline.
      </p>

      <div style={{
        padding: '24px',
        backgroundColor: '#fff5f5',
        borderLeft: '4px solid #cc0000',
        margin: '32px 0',
        borderRadius: '4px'
      }}>
        <p style={{ margin: 0, marginBottom: '16px', fontWeight: 'bold', fontSize: '1.1em' }}>
          The SaaSKiller Take
        </p>
        <p style={{ margin: 0, marginBottom: '12px' }}>
          Asana's real cost is 8x the subscription: $3,000/year becomes $24,000/year once you count setup, maintenance, and training overhead.
        </p>
        <p style={{ margin: 0 }}>
          You don't need Asana's complexity. 95% of teams would be fine with Trello or Linear. Start simple. Upgrade to Asana only when you're drowning
          in your own growth. Most teams aren't. They just like buying power they don't use.
        </p>
      </div>
    </>
  );
};
