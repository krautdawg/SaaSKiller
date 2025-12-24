import React from 'react';

export const AWSCostShockComparison = () => {
  return (
    <>
      <h2>AWS Cost Shock: How Your $100/Month Bill Becomes $10,000/Month</h2>
      <p>
        Almost every startup uses AWS. It starts innocuously: a small EC2 instance, a database, some S3 storage. Your first month bill: $50.
      </p>

      <p>
        You think: great, we can scale on AWS. We only pay for what we use.
      </p>

      <p>
        Two years later, you open an AWS bill and see $8,000 for the month.
      </p>

      <p>
        You have no idea where that bill came from. Nobody intended to spend $8,000. It crept up silently over months of ignored resource creep, misconfigured auto-scaling, and abandoned services running in the background.
      </p>

      <h3>How AWS Bills Explode (Real Examples)</h3>

      <p>
        <strong>Scenario 1: Database Backup Explosion</strong>
      </p>

      <p>
        You set up automated database backups. They run every hour. Each backup is 50GB. You keep them for 30 days.
      </p>

      <p>
        That's 50GB × 24 backups/day × 30 days = 36,000GB stored = 36TB = $800/month in S3 storage alone. You didn't know. It just happened.
      </p>

      <p>
        <strong>Scenario 2: Data Transfer Costs</strong>
      </p>

      <p>
        You host your app in us-east-1. Your database in us-west-2. AWS charges $0.02 per GB for data transfer between regions. Your app transfers 10GB per day.
      </p>

      <p>
        That's 10GB × 30 days × $0.02 = $6/day = $180/month. Times three (your app, your cache, your backups) = $500+ per month just for inter-region traffic.
      </p>

      <p>
        <strong>Scenario 3: NAT Gateway Costs</strong>
      </p>

      <p>
        Your private subnet needs to reach the internet (to call external APIs). You use a NAT gateway. AWS charges $0.045 per hour ($32/month) plus $0.045 per GB processed.
      </p>

      <p>
        Your app processes 100GB/month through the NAT gateway. That's $32 + (100 × 0.045) = $32 + $4.50 = $36.50/month. Seems fine alone. But multiply it across 10 services, 10 regions = $3,650+ per month.
      </p>

      <p>
        <strong>Scenario 4: The Load Balancer Trap</strong>
      </p>

      <p>
        You set up a load balancer because "we need high availability." Load balancers cost $16.43/month per load balancer plus $0.006 per LB capacity unit (LCU).
      </p>

      <p>
        You have 5 load balancers across services = $82/month. Plus LCU charges for traffic = $50/month. Seems okay. But now every engineer spins up new load balancers for testing. You have 20 load balancers running. Cost: $400+ per month for something you're barely using.
      </p>

      <h3>The Real AWS Cost Breakdown (For a Typical Startup)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Service</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Expected</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Actual (With Waste)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>EC2 (compute)</td>
            <td style={{ padding: '12px' }}>$500/month</td>
            <td style={{ padding: '12px' }}>$2,000 (over-provisioned instances left running)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>RDS (database)</td>
            <td style={{ padding: '12px' }}>$300/month</td>
            <td style={{ padding: '12px' }}>$1,200 (test databases never deleted)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>S3 (storage)</td>
            <td style={{ padding: '12px' }}>$100/month</td>
            <td style={{ padding: '12px' }}>$800 (backup proliferation, unoptimized storage classes)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Data Transfer</td>
            <td style={{ padding: '12px' }}>$100/month</td>
            <td style={{ padding: '12px' }}>$1,500 (inter-region traffic, unoptimized routes)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>NAT Gateways</td>
            <td style={{ padding: '12px' }}>$0 (if you plan correctly)</td>
            <td style={{ padding: '12px' }}>$400–$800 (misconfigured subnets)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Load Balancers</td>
            <td style={{ padding: '12px' }}>$100/month</td>
            <td style={{ padding: '12px' }}>$400 (abandoned test load balancers)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>CloudFront (CDN)</td>
            <td style={{ padding: '12px' }}>$200/month</td>
            <td style={{ padding: '12px' }}>$1,000 (data transfer to CDN not optimized)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Expected Total</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$1,300/month</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$8,100/month</td>
          </tr>
        </tbody>
      </table>

      <p>
        You planned for $1,300/month. You're paying $8,100. That's 6x.
      </p>

      <h3>Why AWS Costs Spiral (The Business Model)</h3>

      <p>
        AWS's business model depends on customers not understanding their bills.
      </p>

      <ul>
        <li><strong>Pricing is opaque.</strong> EC2 has 500+ instance types. Each has different pricing in different regions. Most companies can't optimize because they don't know what they're paying for.</li>
        <li><strong>Every service has hidden costs.</strong> The EC2 cost is the headline. But data transfer, NAT gateways, backup storage—these are separate line items that add up.</li>
        <li><strong>Default configurations are wasteful.</strong> AWS's default setup is not optimized for cost. It's optimized for availability and simplicity. That costs money.</li>
        <li><strong>There's no enforcement of cost discipline.</strong> Engineers spin up resources without thinking about costs. The bill arrives 30 days later when it's too late.</li>
      </ul>

      <h3>What You Should Do</h3>

      <p>
        <strong>Option 1: Use AWS, but be disciplined</strong>
      </p>

      <ul>
        <li>Set up CloudWatch billing alerts ($1,000/month threshold, escalate to CTO)</li>
        <li>Use AWS Cost Explorer to see what's costing money</li>
        <li>Reserve instances for predictable workloads (30% discount)</li>
        <li>Auto-scale aggressively down (don't leave instances running 24/7 if unnecessary)</li>
        <li>Clean up test resources monthly</li>
      </ul>

      <p>
        <strong>Option 2: Use a simpler, cheaper platform</strong>
      </p>

      <ul>
        <li><strong>Heroku:</strong> $50–$500/month. Higher unit cost but much simpler. No unexpected bills. Good for &lt;$5K/month traffic.</li>
        <li><strong>DigitalOcean:</strong> $5–$100/month. Simpler than AWS, predictable pricing. Good for startups under Series A.</li>
        <li><strong>Railway or Render:</strong> Modern alternatives. Pay-as-you-go but with simpler billing than AWS.</li>
        <li><strong>Hetzner or Linode:</strong> Fixed pricing. No surprises. Less integrations than AWS but much cheaper.</li>
      </ul>

      <p>
        <strong>Option 3: Hybrid approach</strong>
      </p>

      <ul>
        <li>Use Heroku or Railway for your main app ($500/month predictable)</li>
        <li>Use AWS only for specific needs (big data, machine learning, complex integrations)</li>
        <li>Cap your AWS spend at $1,000/month with hard limits</li>
      </ul>

      <h3>The Cost Comparison</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Platform</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Typical Cost</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Predictability</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>When to Use</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>AWS (disciplined)</td>
            <td style={{ padding: '12px' }}>$2,000–$5,000/month</td>
            <td style={{ padding: '12px' }}>Unpredictable without management</td>
            <td style={{ padding: '12px' }}>Series B+ or complex infrastructure</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Heroku</td>
            <td style={{ padding: '12px' }}>$200–$2,000/month</td>
            <td style={{ padding: '12px' }}>Highly predictable</td>
            <td style={{ padding: '12px' }}>Startups, &lt;10 engineers</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>DigitalOcean</td>
            <td style={{ padding: '12px' }}>$100–$500/month</td>
            <td style={{ padding: '12px' }}>Very predictable</td>
            <td style={{ padding: '12px' }}>Side projects, bootstrapped startups</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Linode / Hetzner</td>
            <td style={{ padding: '12px' }}>$50–$300/month</td>
            <td style={{ padding: '12px' }}>Extremely predictable</td>
            <td style={{ padding: '12px' }}>Small teams, fixed capacity needs</td>
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
          AWS bills grow 10x without anyone intending it to. Backup storage, data transfer, NAT gateways, abandoned resources—costs spiral silently.
        </p>
        <p style={{ margin: 0 }}>
          For most startups &lt;Series A: use Heroku or DigitalOcean. Fixed costs. No surprises. Move to AWS only when you have engineers dedicated to optimizing it.
          Don't let AWS convince you that "pay for what you use" is cheaper. For you, it's 5-10x more expensive than simpler alternatives.
        </p>
      </div>
    </>
  );
};
