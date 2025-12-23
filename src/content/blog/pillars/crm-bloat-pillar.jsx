import React from 'react';
import { Link } from 'react-router-dom';

export const CRMBloatPillar = () => {
  return (
    <>
      <h2>CRM Bloat: How It Happened and How to Fix It</h2>
      <p>
        Your CRM started with a simple mission: manage customer relationships. Somewhere along the way, it became
        a bloated monster that requires a PhD to operate and a second job to maintain.
      </p>

      <p>
        You're not alone. <strong>67% of small businesses report their CRM is "too complicated"</strong> and
        <strong>42% admit their team doesn't use all the features they're paying for</strong>.
      </p>

      <h3>Why CRM Bloat Happens (And How to Stop It)</h3>
      <p>
        CRM bloat doesn't happen because Salesforce, HubSpot, or other platforms are inherently bad. It happens
        because of three reasons:
      </p>

      <h4>1. You Bought More Than You Needed</h4>
      <p>
        You picked an "enterprise" plan because the salesperson said "you might need it someday" or "it's only
        $50 more per month." Now you're paying for 50 features when you use 5.
      </p>

      <p>
        A small business with 5–10 salespeople doesn't need the same features as a 200-person sales team.
        But enterprise CRM platforms sell as if you do.
      </p>

      <h4>2. Feature Creep Over Time</h4>
      <p>
        Your CRM keeps adding features. Some are useful. Most aren't. Your admin tries to implement them anyway
        because they're "available" and "might improve efficiency."
      </p>

      <p>
        The problem: Each new feature adds complexity. Your team gets confused. Usage goes down. But your bill stays high.
      </p>

      <h4>3. Customization Gone Wrong</h4>
      <p>
        Someone (usually your IT person or an external consultant) customizes your CRM. They add fields, workflows,
        integrations, and automations. Some are valuable. Others are legacy nonsense from 3 years ago nobody remembers.
      </p>

      <p>
        Now your CRM is so customized that only one person understands it. New employees are overwhelmed. Updates break things.
        You're stuck paying thousands annually just to maintain what you've built.
      </p>

      <h3>The Cost of CRM Bloat</h3>
      <p>
        Here's what CRM bloat costs your business:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Cost</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Impact</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Annual</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Subscription fees (often too high)</td>
            <td style={{ padding: '12px' }}>$200–$500/user/month</td>
            <td style={{ padding: '12px' }}>$12,000–$60,000+</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Implementation & customization</td>
            <td style={{ padding: '12px' }}>Days/weeks of setup time</td>
            <td style={{ padding: '12px' }}>$5,000–$25,000</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Training and onboarding</td>
            <td style={{ padding: '12px' }}>Hours per employee</td>
            <td style={{ padding: '12px' }}>$3,000–$10,000</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Admin/maintenance</td>
            <td style={{ padding: '12px' }}>Ongoing complexity management</td>
            <td style={{ padding: '12px' }}>$4,000–$15,000</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>User adoption (people avoid using it)</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Sales reps use spreadsheets instead</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$20,000–$100,000+</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Total: $44,000–$210,000 annually—and that's just the direct costs.</strong>
      </p>

      <h3>The Real Problem: User Adoption Fails</h3>
      <p>
        Here's what most companies don't talk about: bloated CRMs have terrible user adoption.
      </p>

      <p>
        When a CRM is too complicated:
      </p>

      <ul>
        <li>Sales reps avoid using it and track deals in spreadsheets instead</li>
        <li>Customer data becomes inconsistent and unreliable</li>
        <li>Managers can't see accurate pipelines</li>
        <li>You make decisions based on bad data</li>
        <li>Forecasting becomes impossible</li>
        <li>Deal velocity slows down</li>
      </ul>

      <p>
        You're paying tens of thousands for a tool your team refuses to use. That's not a software problem—that's a complexity problem.
      </p>

      <h3>Signs Your CRM Is Bloated</h3>
      <p>
        Do any of these describe your situation?
      </p>

      <ul>
        <li>Your team complains the CRM is "too hard" or "too slow"</li>
        <li>People track deals in spreadsheets or email instead</li>
        <li>Your pipeline data is incomplete or inaccurate</li>
        <li>Only your admin understands how to use it</li>
        <li>You pay for more users than actually use the system</li>
        <li>Implementation took months (or is still ongoing)</li>
        <li>Customizations keep breaking with every update</li>
        <li>Your monthly bill is $2,000+ and keeps growing</li>
        <li>New hires need 2+ weeks of training to get productive</li>
        <li>You have features you've never used</li>
      </ul>

      <h3>How Bloat Develops Over Time (A Real Example)</h3>
      <p>
        A 12-person B2B SaaS company started with Salesforce Essentials ($165/user/month). Perfect for their size.
        Simple. Affordable. Good user adoption.
      </p>

      <p>
        Then they grew:
      </p>

      <ul>
        <li><strong>Year 1:</strong> Added 3 custom fields to track customer health scores (good decision)</li>
        <li><strong>Year 2:</strong> Upgraded to Professional ($330/user/month) for "better reporting" (bloat begins)</li>
        <li><strong>Year 2:</strong> Added 12 custom fields, 5 custom workflows, and 3 integrations (increasing complexity)</li>
        <li><strong>Year 3:</strong> Added 20+ custom fields, 10 workflows, multiple integrations, and custom apps (chaos)</li>
        <li><strong>Year 3:</strong> Upgraded to Enterprise ($1,320/user/month) because "we need the stability" (bloat confirmed)</li>
      </ul>

      <p>
        By Year 3, they were paying <strong>$158,400 annually</strong> for a system that was:
      </p>

      <ul>
        <li>Too slow because of too many customizations</li>
        <li>Too confusing for new hires</li>
        <li>Maintained by one person (the admin)</li>
        <li>Used by only 8 of 12 team members (4 preferred spreadsheets)</li>
      </ul>

      <p>
        If they'd stuck with Essentials ($19,800/year) and kept it simple, they would have saved $138,600 annually
        AND had better user adoption.
      </p>

      <h3>How to Fix CRM Bloat</h3>

      <h4>The Nuclear Option: Start Over (If You're Truly Bloated)</h4>
      <p>
        If your CRM is a complete mess, sometimes the best option is to:
      </p>

      <ol>
        <li>Pick a simpler CRM (e.g., HubSpot CRM Free, Pipedrive, Notion, or even Excel if you're tiny)</li>
        <li>Export your customer data cleanly</li>
        <li>Import into the new system</li>
        <li>Start fresh with simple, no-nonsense processes</li>
      </ol>

      <p>
        Yes, migration is painful. But it's often cheaper than paying for Enterprise Salesforce
        that nobody uses.
      </p>

      <h4>The Pragmatic Option: Simplify What You Have</h4>
      <p>
        If you're not ready to switch, here's how to reduce bloat in your current CRM:
      </p>

      <h5>1. Audit Your Fields (Delete 80%)</h5>
      <p>
        Go through every field in your CRM. Ask: "Do we actually use this?" Most companies find they have 100+ custom
        fields and use maybe 20.
      </p>

      <p>
        <strong>Action:</strong> Delete unused fields. Your CRM will run faster and feel simpler.
      </p>

      <h5>2. Disable Features You Don't Use</h5>
      <p>
        In Salesforce, HubSpot, or Pipedrive: there are probably 50+ features you're not using. Turn them off.
        Remove them from navigation. Simplify the interface.
      </p>

      <p>
        <strong>Action:</strong> Work with your admin to hide/disable unused features. Show only what your team needs.
      </p>

      <h5>3. Simplify Your Workflows</h5>
      <p>
        If you have 15 automations, you probably only need 5.
      </p>

      <p>
        <strong>Action:</strong> Keep only automations that save real time. Delete the rest.
      </p>

      <h5>4. Consolidate Integrations</h5>
      <p>
        You might have 10 integrations. Maybe you only need 3.
      </p>

      <p>
        <strong>Action:</strong> Disable integrations nobody uses. Integration maintenance is a hidden cost.
      </p>

      <h5>5. Consider Downgrades</h5>
      <p>
        If you're on Enterprise but only need Professional features, downgrade.
        <strong>Save $20,000–$100,000+/year.</strong>
      </p>

      <p>
        <strong>Action:</strong> Get a full feature comparison between your current and lower-tier plans.
        Downgrade if it makes sense.
      </p>

      <h3>When to Replace Your CRM (Not Just Simplify)</h3>
      <p>
        Sometimes the best move is to switch to a simpler platform:
      </p>

      <h4>Consider a replacement if:</h4>

      <ul>
        <li>You're paying $25,000+/year and not seeing ROI</li>
        <li>Adoption is below 50%</li>
        <li>Your CRM requires a full-time admin to maintain</li>
        <li>Implementation never really "finished"</li>
        <li>You have constant problems with data quality</li>
        <li>New hires take months to get productive</li>
      </ul>

      <h4>Better CRM Options (Depending on Your Size):</h4>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Company Size</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Recommended CRM</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Cost</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>1–5 people</td>
            <td style={{ padding: '12px' }}>HubSpot Free / Notion</td>
            <td style={{ padding: '12px' }}>Free</td>
            <td style={{ padding: '12px' }}>Simple, fast, free</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>5–15 people</td>
            <td style={{ padding: '12px' }}>HubSpot Professional / Pipedrive</td>
            <td style={{ padding: '12px' }}>$50–$150/month</td>
            <td style={{ padding: '12px' }}>Great balance of features & simplicity</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>15–50 people</td>
            <td style={{ padding: '12px' }}>HubSpot Enterprise / Monday</td>
            <td style={{ padding: '12px' }}>$200–$500/month</td>
            <td style={{ padding: '12px' }}>More features, still reasonable cost</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>50+ people</td>
            <td style={{ padding: '12px' }}>Salesforce / MS Dynamics / HubSpot Enterprise</td>
            <td style={{ padding: '12px' }}>$500–$2,000+/month</td>
            <td style={{ padding: '12px' }}>Enterprise-grade, but plan carefully</td>
          </tr>
        </tbody>
      </table>

      <h3>A Real Question: What's Your CRM Actually Worth?</h3>
      <p>
        Before you spend another dime maintaining bloated CRM customizations, ask yourself:
      </p>

      <ul>
        <li>Are my salespeople more efficient because of this CRM? (Or despite it?)</li>
        <li>Do I make better business decisions because of CRM data?</li>
        <li>Is the ROI positive?</li>
        <li>Could my team be more productive with a simpler system?</li>
      </ul>

      <p>
        If the answer to most of these is "no"—it's time to make a change.
      </p>

      <div style={{
        padding: '24px',
        backgroundColor: '#f0f9ff',
        borderLeft: '4px solid #0066cc',
        margin: '32px 0',
        borderRadius: '4px'
      }}>
        <p style={{ margin: 0, marginBottom: '16px', fontWeight: 'bold', fontSize: '1.2em' }}>
          Not sure if your CRM is bloated? Let's analyze it.
        </p>
        <p style={{ margin: 0, marginBottom: '16px' }}>
          Use our free audit to see if you're overpaying for complexity you don't need—and find a path to simplicity.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            backgroundColor: '#cc0000',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginBottom: '12px'
          }}
        >
          Get Your CRM Analysis →
        </Link>
      </div>

      <h3>Final Thoughts</h3>
      <p>
        Your CRM should make your life easier, not harder. If it's become a bloated nightmare—you have options.
      </p>

      <p>
        The best CRM isn't the most expensive one. It's the simplest one that your team will actually use.
        And sometimes, simplicity is worth more than all the features in the world.
      </p>
    </>
  );
};
