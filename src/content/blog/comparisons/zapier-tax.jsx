import React from 'react';

export const ZapierTaxComparison = () => {
  return (
    <>
      <h2>The Zapier Tax: How Integration Costs Silently Drain $5,000+ Per Year</h2>
      <p>
        Every tool in your stack is technically separate. Your CRM doesn't talk to your email. Your project tracker doesn't sync with your calendar.
        Your accounting software doesn't know about your customer database.
      </p>

      <p>
        So you buy Zapier to stitch them together. A few zaps here, a few automations there. It seems cheap: $25-$99/month.
      </p>

      <p>
        But by Year 2, you're paying $3,000+ annually for Zapier alone, maintaining 50+ zaps, and your integrations are fragile, slow, and half-broken.
      </p>

      <h3>What Zapier Actually Costs (The Real Number)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Item</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Zapier subscription (starts $25/month, grows to $99+)</td>
            <td style={{ padding: '12px' }}>~$2,000–$3,000/year</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Premium app connections (Slack, Gmail, Salesforce)</td>
            <td style={{ padding: '12px' }}>$500–$1,500/year</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Time maintaining and debugging broken zaps</td>
            <td style={{ padding: '12px' }}>$2,000–$5,000/year (hidden cost)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Alternative integrations (Make, custom webhooks)</td>
            <td style={{ padding: '12px' }}>$500–$1,000/year</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Total annual "Zapier Tax"</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$5,000–$10,000</td>
          </tr>
        </tbody>
      </table>

      <p>
        For a 10-person team, that's $500-$1,000 per person annually just to make your tools talk to each other.
      </p>

      <h3>Why Zapier Became Necessary (The Root Cause)</h3>

      <p>
        You didn't plan to use Zapier. It crept in because you chose tools that don't integrate:
      </p>

      <ul>
        <li>You bought HubSpot CRM + Slack + Google Calendar + Asana + Stripe. Nobody talks to each other.</li>
        <li>You needed them to talk. So you bought Zapier.</li>
        <li>Now Zapier is a "critical" service. If Zapier is down, your integrations break.</li>
        <li>You have a point-of-failure dependency on a third party.</li>
      </ul>

      <p>
        Zapier is succeeding because your tools are failing. It's a tax on fragmentation.
      </p>

      <h3>What Happens When You Scale Zapier Usage</h3>

      <p>
        <strong>Month 0:</strong> You create 5 zaps. Simple stuff. Slack notifications, email forwarding.
      </p>

      <p>
        <strong>Month 3:</strong> You're at 15 zaps. Some are breaking occasionally. A Slack notification isn't firing. A contact isn't syncing. You debug it on Slack.
      </p>

      <p>
        <strong>Month 6:</strong> You have 30 zaps. Half of them are inactive or broken. You're paying for zaps you forgot about. Critical integrations sometimes fail silently. You spend 4 hours debugging why contacts aren't syncing.
      </p>

      <p>
        <strong>Month 12:</strong> You have 50+ zaps. You don't know how many. You don't know which are critical. Zapier is fragile. You're considering hiring someone just to maintain your integrations.
      </p>

      <h3>The Real Cost: Hidden Time and Fragility</h3>

      <p>
        The $99/month Zapier subscription is small. The hidden costs are huge:
      </p>

      <ul>
        <li><strong>Time spent building zaps:</strong> What should be 5 minutes in a native integration takes 30 minutes to debug in Zapier. (10 zaps × 25 minutes × $50/hour = $200 per zap = $2,000)</li>
        <li><strong>Debugging when integrations fail:</strong> "Why didn't this data sync?" You spend 1 hour investigating. It was a rate limit. (Once per month × 12 months × 1 hour × $50/hour = $600/year)</li>
        <li><strong>Rebuilding when APIs break:</strong> A third-party API updates. Your zaps break. You rebuild them. (2-3 times per year × 2 hours = $300-$450)</li>
        <li><strong>Cognitive load:</strong> You need to remember 50 zaps exist and what they do. Mental overhead.</li>
      </ul>

      <p>
        That's 3-5 hours per month of someone's time. At $50/hour, that's $1,800–$3,000 annually. Just managing integrations.
      </p>

      <h3>When Zapier Is Worth It</h3>

      <p>
        Zapier makes sense if:
      </p>

      <ul>
        <li>You have &lt;10 zaps and they're mostly passive (notifications, logging)</li>
        <li>You can't afford native integrations between your tools</li>
        <li>You're just getting started and need quick solutions</li>
      </ul>

      <p>
        Zapier is a trap if:
      </p>

      <ul>
        <li>You have &gt;20 zaps (you have a fragmentation problem, not an integration problem)</li>
        <li>Your critical workflows depend on Zapier (sync between CRM and accounting)</li>
        <li>You're paying more for Zapier than your primary tools cost</li>
      </ul>

      <h3>What You Should Do Instead</h3>

      <p>
        <strong>Option 1: Choose tools that integrate natively.</strong>
      </p>

      <ul>
        <li>Use HubSpot (includes CRM + email + calendar)</li>
        <li>Use Notion (build custom databases, reduce tool count)</li>
        <li>Use Stripe (integrates with most accounting tools natively)</li>
      </ul>

      <p>
        <strong>Option 2: Accept tool fragmentation and use native integration features.</strong>
      </p>

      <ul>
        <li>HubSpot → Slack (native integration, free)</li>
        <li>Asana → Google Calendar (native, free)</li>
        <li>Stripe → Zapier (only for Zapier, not as a backbone)</li>
      </ul>

      <p>
        <strong>Option 3: Build custom integrations (for serious operations).</strong>
      </p>

      <ul>
        <li>Use Make.com (better than Zapier, similar price)</li>
        <li>Build webhooks (if you have a developer)</li>
        <li>Use APIs directly (costs developer time, not Zapier)</li>
      </ul>

      <h3>The Math: Stop Buying Fragmented Tools</h3>

      <p>
        Here's what saves money:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Approach</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Tools + Integration Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Fragmented (HubSpot + Asana + Slack + Calendar + Zapier)</td>
            <td style={{ padding: '12px' }}>$15,000/year + $5,000 Zapier + $2,000 time = $22,000</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Integrated (HubSpot with Slack + Asana + no Zapier)</td>
            <td style={{ padding: '12px' }}>$14,400/year + $2,400 Asana = $16,800</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Savings by choosing integration-native tools</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$5,200/year</td>
          </tr>
        </tbody>
      </table>

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
          Zapier's real cost is $5,000–$10,000 per year for most teams, once you count the subscription, premium connections, and time maintaining fragile integrations.
        </p>
        <p style={{ margin: 0 }}>
          The solution isn't buying better integration tools. The solution is buying fewer, more integrated tools.
          Choose HubSpot instead of CRM + email. Choose Notion instead of CRM + project manager. Stop fragmenting. Stop needing Zapier.
        </p>
      </div>
    </>
  );
};
