import React from 'react';
import { Link } from 'react-router-dom';

export const HubSpotVsSalesforceComparison = () => {
  return (
    <>
      <h2>HubSpot vs Salesforce: The Math on Why Most Small Teams Pick Wrong</h2>
      <p>
        Here's what happens: A startup picks HubSpot because it's "simpler than Salesforce."
        Then it grows. Someone hears "Salesforce is the industry standard."
        They upgrade. Three years later, they're paying $15,000+ annually for a system they don't use,
        maintained by one person, with data they can't easily get out.
      </p>

      <p>
        This comparison is about helping you avoid that trap.
      </p>

      <h3>The Core Difference (In Real Terms)</h3>

      <p>
        <strong>HubSpot:</strong> Designed for growing companies with non-technical teams. All-in-one marketing + sales + service.
        Owned by teams who use it every day.
      </p>

      <p>
        <strong>Salesforce:</strong> Designed for large enterprises with dedicated Salesforce admins.
        Sold like an operating system. Implemented like a major project.
      </p>

      <h3>Pricing That Tells the Real Story</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Scenario</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>HubSpot Cost/Year</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Salesforce Cost/Year</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>5-person startup (free tier)</td>
            <td style={{ padding: '12px' }}>Free</td>
            <td style={{ padding: '12px' }}>Not available</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>5-person startup (paid)</td>
            <td style={{ padding: '12px' }}>$1,200/month = $14,400</td>
            <td style={{ padding: '12px' }}>$1,650/month = $19,800 (Essentials)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>10-person team</td>
            <td style={{ padding: '12px' }}>$2,400/month = $28,800</td>
            <td style={{ padding: '12px' }}>$3,300/month = $39,600 (Professional)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>20-person team</td>
            <td style={{ padding: '12px' }}>$4,800/month = $57,600</td>
            <td style={{ padding: '12px' }}>$6,600/month = $79,200 (Professional)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>+ custom fields (HubSpot) / Sandbox (Salesforce)</td>
            <td style={{ padding: '12px' }}>$0–$300</td>
            <td style={{ padding: '12px' }}>+$400–$1,000</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>+ Admin / Implementation / Training</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$5,000–$15,000</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$20,000–$100,000+</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>For a 10-person team, HubSpot costs 27% less and takes 80% less time to implement.</strong>
      </p>

      <h3>What You Actually Get (The Honest Assessment)</h3>

      <h4>HubSpot Strengths</h4>
      <ul>
        <li><strong>Easy to learn.</strong> Salespeople can start using it on day one with minimal training.</li>
        <li><strong>Built-in email and meetings.</strong> No Salesforce + Outlook nightmare.</li>
        <li><strong>All-in-one.</strong> Marketing automation, email, CRM, forms—included. Saves 2–3 subscriptions.</li>
        <li><strong>Less customization required.</strong> Works the way you think, not the way your admin thinks.</li>
        <li><strong>Painless data export.</strong> Get your data out whenever you want (no ransom fees).</li>
      </ul>

      <h4>HubSpot Weaknesses</h4>
      <ul>
        <li><strong>Limited custom fields.</strong> You hit limits faster if you want lots of customization.</li>
        <li><strong>Reporting can feel basic.</strong> Advanced analytics are in a separate tool (Looker).</li>
        <li><strong>Can't customize as deeply.</strong> If you need wild customizations, you'll hit walls.</li>
        <li><strong>Doesn't replace sales execution tools.</strong> You might still need Outreach, SalesLoft, etc.</li>
      </ul>

      <h4>Salesforce Strengths</h4>
      <ul>
        <li><strong>Infinitely customizable.</strong> If you have the budget (and a dedicated admin), build anything.</li>
        <li><strong>True enterprise scale.</strong> 500-seat companies use it the same way 50,000-seat companies do.</li>
        <li><strong>Ecosystem.</strong> Thousands of add-ons and integrations.</li>
        <li><strong>Industry-specific versions.</strong> Healthcare, financial services, etc. have tailored solutions.</li>
      </ul>

      <h4>Salesforce Weaknesses</h4>
      <ul>
        <li><strong>Complex to implement.</strong> Plan for 3–6 months and $30K–$100K in consulting.</li>
        <li><strong>Admin-dependent.</strong> Requires a dedicated person or team to maintain it.</li>
        <li><strong>Steep learning curve.</strong> Sales reps need training and often refuse to use it.</li>
        <li><strong>Over-engineered for small teams.</strong> You're paying for capacity you'll never use.</li>
        <li><strong>Data lock-in.</strong> Exporting is possible but painful, designed to trap you.</li>
        <li><strong>Upgrades break things.</strong> Regular updates sometimes break customizations you've built.</li>
      </ul>

      <h3>The Real Difference (What It Actually Costs Your Business)</h3>

      <p>
        The sticker price is just the beginning. Here's what most small businesses don't calculate:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Hidden Cost</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>HubSpot</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Salesforce</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Implementation time</td>
            <td style={{ padding: '12px' }}>2–4 weeks</td>
            <td style={{ padding: '12px' }}>3–6 months</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Consulting needed</td>
            <td style={{ padding: '12px' }}>$0–$5K</td>
            <td style={{ padding: '12px' }}>$25K–$100K+</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Admin time (annual)</td>
            <td style={{ padding: '12px' }}>Part-time (0.5–1 person)</td>
            <td style={{ padding: '12px' }}>Full-time (1–2 people)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Training hours per user</td>
            <td style={{ padding: '12px' }}>2–4 hours</td>
            <td style={{ padding: '12px' }}>8–20 hours</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>User adoption rate</td>
            <td style={{ padding: '12px' }}>70–90%</td>
            <td style={{ padding: '12px' }}>40–60%</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Total 3-year cost of ownership</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>~$86K–$106K</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>~$180K–$280K+</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>For a 10-person team over 3 years, Salesforce costs 2–3x more than HubSpot—and delivers worse adoption rates.</strong>
      </p>

      <h3>When You Actually Might Need Salesforce</h3>

      <p>
        Here's the honest answer: Most small teams don't.
      </p>

      <p>
        You might need Salesforce if:
      </p>

      <ul>
        <li>You have 50+ salespeople and need advanced forecasting</li>
        <li>You're in a regulated industry requiring audit trails and specific customizations</li>
        <li>Your existing vendor ecosystem is built on Salesforce (and switching is expensive)</li>
        <li>You have a dedicated Salesforce admin who loves it</li>
      </ul>

      <p>
        You probably don't need Salesforce if:
      </p>

      <ul>
        <li>You're under 50 employees</li>
        <li>You don't have a dedicated admin</li>
        <li>Your salespeople are avoiding your current CRM</li>
        <li>You're paying for features you don't use</li>
        <li>You're considering Salesforce because "it's the standard"</li>
      </ul>

      <h3>The Migration Problem (Why You're Stuck)</h3>

      <p>
        One reason companies don't leave Salesforce: Fear of migration.
      </p>

      <p>
        After 3 years, you have:
      </p>

      <ul>
        <li>Custom fields and workflows nobody remembers</li>
        <li>5–10 integrations (Slack, Marketo, Looker, etc.) you'll have to rebuild</li>
        <li>Institutional knowledge only your admin has</li>
        <li>Historical data you're afraid to lose</li>
      </ul>

      <p>
        Salesforce knows this. It's part of the strategy.
      </p>

      <p>
        HubSpot makes this easier. Your data is exportable. Your integrations are simpler. You're not trapped.
      </p>

      <h3>The Real Recommendation</h3>

      <p>
        <strong>If you're under 50 people and choosing between HubSpot and Salesforce: Pick HubSpot.</strong>
      </p>

      <p>
        Not because HubSpot is "better." But because:
      </p>

      <ul>
        <li>It costs less (50% savings over 3 years)</li>
        <li>It takes less time to implement (weeks, not months)</li>
        <li>Your team will actually use it (better adoption rates)</li>
        <li>It doesn't require a dedicated admin</li>
        <li>You can leave if it stops working for you</li>
      </ul>

      <p>
        Use HubSpot for 2–3 years. If your business fundamentally changes and you truly outgrow it, then migrate to Salesforce.
      </p>

      <p>
        But don't start with Salesforce because you think you "might" grow into it.
        You won't. You'll just pay more for complexity you don't need.
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
          Salesforce is built for large enterprises. If you're not large, you're subsidizing Salesforce's ecosystem
          with money you could spend on hiring, marketing, or product.
        </p>
        <p style={{ margin: 0 }}>
          HubSpot isn't perfect. But it's built for teams like yours. Use it. If you genuinely outgrow it,
          switch then. Not before.
        </p>
      </div>
    </>
  );
};
