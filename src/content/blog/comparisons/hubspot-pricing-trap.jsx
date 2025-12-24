import React from 'react';

export const HubSpotPricingTrapComparison = () => {
  return (
    <>
      <h2>HubSpot's Pricing Creep: How "Cheap" Becomes Expensive Over 3 Years</h2>
      <p>
        HubSpot looks like a deal at first. $600/month for Starter plan. $1,200/month for Professional.
      </p>

      <p>
        But HubSpot has a dark pattern: pricing creep. Every 6-12 months, they add new "Premium" tiers, move features
        you're using to higher plans, and suddenly your "cheap" HubSpot costs as much as Salesforce.
      </p>

      <p>
        This is the story of how you go from $14,400/year to $45,000+/year while HubSpot smiles and calls it "new functionality."
      </p>

      <h3>What HubSpot Costs Over Time (Real Numbers)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Stage</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Monthly Cost</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>What Happened</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Year 0, Month 0</td>
            <td style={{ padding: '12px' }}>$600 (Starter)</td>
            <td style={{ padding: '12px' }}>Excited. This seems cheap. You sign up.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Year 1, Month 8</td>
            <td style={{ padding: '12px' }}>$1,200 (Pro)</td>
            <td style={{ padding: '12px' }}>You need more email sequences. Starter limits you to 1,000 contacts. You upgrade. Double cost.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Year 2, Month 4</td>
            <td style={{ padding: '12px' }}>$1,500 (Pro + add-ons)</td>
            <td style={{ padding: '12px' }}>You need "Sales Hub" features. Turns out it's a separate product. $300/month. Now you're in both Marketing and Sales hubs.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Year 2, Month 10</td>
            <td style={{ padding: '12px' }}>$2,000 (Services Hub)</td>
            <td style={{ padding: '12px' }}>You add customer support tickets. Another $500/month. Still looks "affordable" individually.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Year 3, Month 6</td>
            <td style={{ padding: '12px' }}>$3,500+ (Operations Hub)</td>
            <td style={{ padding: '12px' }}>HubSpot launches "Operations Hub." You need it for automation and data syncing. Another $500/month. You're now on 4 separate products.</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Total 3-year cost</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>~$50,000</td>
            <td style={{ padding: '12px' }}>Started at $600/month. Now at $3,500/month. But it crept up so slowly you didn't notice.</td>
          </tr>
        </tbody>
      </table>

      <h3>How HubSpot Gets You to Spend More</h3>

      <p>
        <strong>The Tiered Feature Lock:</strong> HubSpot puts features behind higher plans. Want workflow automation? That's Pro. Want custom objects? Enterprise. Want automation for those custom objects? Enterprise+.
      </p>

      <p>
        <strong>The Product Bundling Trap:</strong> Marketing Hub. Sales Hub. Service Hub. Commerce Hub. Operations Hub. Each is $300–$1,000/month. HubSpot makes you feel like you're buying modular tools, but you're really just paying for the privilege of integrating their own products.
      </p>

      <p>
        <strong>The Hidden Seat Costs:</strong> Pro plan is per "seat" for some features, per "contact" for others. You think you're paying $1,200. Turns out you're actually paying $1,200 + $0.50 per contact over 10,000 contacts. Suddenly it's $3,000.
      </p>

      <p>
        <strong>The "Free" Add-ons That Aren't:</strong> HubSpot advertises "free CRM" but you need $600+ minimum to use it effectively. Free Marketing Hub sounds great until you realize you need automation, which requires Pro. Free Sales Hub requires Pro tier contacts sync.
      </p>

      <h3>What You Actually Get for the Money</h3>

      <p>
        HubSpot is undeniably better than spreadsheets. The question is: is it $50,000 better than alternatives?
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>What You'd Use</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>HubSpot Cost</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Alternatives</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Savings</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>CRM + Email Marketing + Automation</td>
            <td style={{ padding: '12px' }}>~$30,000 (3 years)</td>
            <td style={{ padding: '12px' }}>Pipedrive ($3,000) + Mailchimp ($600) + Zapier ($2,000) = $5,600</td>
            <td style={{ padding: '12px' }}>$24,400</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>CRM only</td>
            <td style={{ padding: '12px' }}>~$14,400 (3 years)</td>
            <td style={{ padding: '12px' }}>Pipedrive ($780/year × 3) = $2,340</td>
            <td style={{ padding: '12px' }}>$12,060</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Marketing Automation only</td>
            <td style={{ padding: '12px' }}>~$18,000 (3 years)</td>
            <td style={{ padding: '12px' }}>Mailchimp Pro ($500/month × 3) = $18,000</td>
            <td style={{ padding: '12px' }}>$0 (equivalent)</td>
          </tr>
        </tbody>
      </table>

      <h3>The Real Problem With HubSpot</h3>

      <p>
        HubSpot's pricing is psychologically designed to trap you. Each individual hub seems affordable. $600/month, $1,200/month. But you end up with:
      </p>

      <ul>
        <li>Marketing Hub (contact management + email)</li>
        <li>Sales Hub (deal tracking + automation)</li>
        <li>Service Hub (tickets + customer portal)</li>
        <li>Operations Hub (data sync + workflows)</li>
      </ul>

      <p>
        And each one, individually, feels like a reasonable purchase. Together, they're $30,000-$40,000 per year, and HubSpot is bigger than your actual business.
      </p>

      <h3>When HubSpot Is Actually Worth It</h3>

      <ul>
        <li>You're a 20-50 person company with serious revenue and can afford the cost</li>
        <li>You need true integration between marketing, sales, and support (not just features that claim to be integrated)</li>
        <li>You're willing to stay at "Starter" and not upgrade to the higher tiers</li>
        <li>You accept that you're locking into HubSpot's roadmap for the next 5 years</li>
      </ul>

      <p>
        For most small teams starting out: Pick Pipedrive ($780/year) for CRM, Mailchimp ($200/month) for marketing. Re-evaluate in 2 years. You'll have spent $7,000 instead of $30,000.
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
          HubSpot's genius is making expensive feel cheap. $600/month sounds reasonable. But 3 years and 5 product upgrades later,
          you're paying what Salesforce costs and wondering why you didn't just use Salesforce.
        </p>
        <p style={{ margin: 0 }}>
          Start with the cheapest alternative that solves your immediate problem. When you genuinely outgrow it, then upgrade.
          Most teams never do. They just think they do.
        </p>
      </div>
    </>
  );
};
