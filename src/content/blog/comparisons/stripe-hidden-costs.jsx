import React from 'react';

export const StripeHiddenCostsComparison = () => {
  return (
    <>
      <h2>Stripe's Hidden Costs: 2.9% + 30¢ Is Just the Beginning</h2>
      <p>
        You know Stripe charges 2.9% + 30¢ per transaction. That's the visible cost.
      </p>

      <p>
        But most small businesses don't calculate the total cost of using Stripe. The 2.9% is layer one. There are five more layers underneath that add another 1–3% to your costs.
      </p>

      <p>
        For a business processing $100,000/year in payments, Stripe costs $4,500. You're probably only counting the obvious 2.9% = $2,900. You're missing $1,600 in hidden costs.
      </p>

      <h3>The Stripe Cost Breakdown (What You Actually Pay)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Fee Type</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Rate</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>On $100K Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Card processing (Visa, Mastercard)</td>
            <td style={{ padding: '12px' }}>2.9% + 30¢</td>
            <td style={{ padding: '12px' }}>$3,200</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>ACH transfers (to your bank)</td>
            <td style={{ padding: '12px' }}>$0.25 per transfer</td>
            <td style={{ padding: '12px' }}>$10–$30/year (if daily)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Failed charge retry</td>
            <td style={{ padding: '12px' }}>2.9% + 30¢ (per attempt)</td>
            <td style={{ padding: '12px' }}>$300–$500 (3% failure rate)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Chargeback protection</td>
            <td style={{ padding: '12px' }}>$0.35 per transaction + liability</td>
            <td style={{ padding: '12px' }}>$150–$300/year</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>International transaction fees</td>
            <td style={{ padding: '12px' }}>+1.5% for foreign cards</td>
            <td style={{ padding: '12px' }}>$500–$1,500 (if 10% intl)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Stripe integrations / apps</td>
            <td style={{ padding: '12px' }}>$0–$200/month</td>
            <td style={{ padding: '12px' }}>$0–$2,400</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Time managing refunds, disputes, incidents</td>
            <td style={{ padding: '12px' }}>3-5 hours/month</td>
            <td style={{ padding: '12px' }}>$1,800–$3,000/year</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Total Stripe Cost</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Effective rate: 4.5–5.9%</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$4,500–$6,000</td>
          </tr>
        </tbody>
      </table>

      <p>
        The 2.9% is a lie. The real cost is 4.5–5.9%.
      </p>

      <h3>The Hidden Stripe Costs Nobody Talks About</h3>

      <p>
        <strong>1. International Transactions</strong><br />
        Stripe charges 2.9% + 30¢ for US domestic cards. For international cards (which are increasingly common), add 1.5% more.
        If 10% of your revenue is international, that's an extra $1,500 on $100K revenue.
      </p>

      <p>
        <strong>2. Failed Payments and Retries</strong><br />
        When a card declines, Stripe will retry it (with your permission). Each retry = another charge. If 3% of your transactions fail (normal),
        you're paying the 2.9% + 30¢ multiple times on the same order. Cost: $300–$600/year.
      </p>

      <p>
        <strong>3. Chargeback Protection</strong><br />
        Stripe doesn't charge for chargeback protection directly. But if someone disputes a charge, Stripe takes $15–$100 from you for the "dispute fee."
        If you have 2-3 chargebacks per year, that's $30–$300. Plus you lose the original transaction fee + the sale itself.
      </p>

      <p>
        <strong>4. Your Time Managing Payments</strong><br />
        Refunds, disputes, failed transactions, fraud investigations, reconciliation. It's 3-5 hours per month for most small businesses.
        At $50/hour, that's $1,800–$3,000 per year in labor.
      </p>

      <p>
        <strong>5. Stripe Integrations and Plugins</strong><br />
        You need to connect Stripe to your accounting software (QuickBooks, FreshBooks). Many apps charge for this integration.
        Stripe's own ecosystem of apps often charge $50–$200/month for features that should be free.
      </p>

      <h3>When Stripe Is Unavoidable vs When It's Not</h3>

      <p>
        <strong>You need Stripe if:</strong>
      </p>

      <ul>
        <li>You're processing credit card payments online</li>
        <li>You need PCI compliance without managing servers</li>
        <li>You want webhooks and API access</li>
      </ul>

      <p>
        <strong>You don't need Stripe if:</strong>
      </p>

      <ul>
        <li>You're only accepting bank transfers (use bank transfer = $0 fee)</li>
        <li>You're accepting cash or checks (cheaper than Stripe)</li>
        <li>You can defer payments and collect them monthly (eliminates transaction fees)</li>
      </ul>

      <h3>Stripe Alternatives (With Real Costs)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Provider</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Rate</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>On $100K</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Advantage</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Stripe</td>
            <td style={{ padding: '12px' }}>2.9% + 30¢</td>
            <td style={{ padding: '12px' }}>$3,200+ (4.5%+ real)</td>
            <td style={{ padding: '12px' }}>Best integration ecosystem</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Square</td>
            <td style={{ padding: '12px' }}>2.9% + 30¢</td>
            <td style={{ padding: '12px' }}>$3,200 (same as Stripe)</td>
            <td style={{ padding: '12px' }}>Better in-person tools</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>PayPal</td>
            <td style={{ padding: '12px' }}>2.99% + 30¢</td>
            <td style={{ padding: '12px' }}>$3,280</td>
            <td style={{ padding: '12px' }}>Lower fraud chargeback rates</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Bank transfers</td>
            <td style={{ padding: '12px' }}>$0</td>
            <td style={{ padding: '12px' }}>$0</td>
            <td style={{ padding: '12px' }}>Free, but slow (5-7 days)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Crypto (Bitcoin Lightning)</td>
            <td style={{ padding: '12px' }}>0.5%</td>
            <td style={{ padding: '12px' }}>$500</td>
            <td style={{ padding: '12px' }}>Cheapest, but niche</td>
          </tr>
        </tbody>
      </table>

      <h3>The Real Question: Can You Avoid Payment Processing Fees?</h3>

      <p>
        For most online businesses: no. You need some way to collect money. Stripe is standard.
      </p>

      <p>
        But you can reduce the cost:
      </p>

      <ul>
        <li><strong>Collect via bank transfer instead of card:</strong> ACH transfers = $0.25 per transfer, free for the customer if they're in the US.</li>
        <li><strong>Batch invoicing:</strong> Instead of per-transaction, send monthly invoices. Customers pay once per month. Reduce transaction count by 90%.</li>
        <li><strong>Use local payment methods:</strong> SEPA in Europe, iDEAL in Netherlands, local card schemes in Asia. Often cheaper than Stripe's international rates.</li>
        <li><strong>Offer payment plans:</strong> Instead of one $1,000 charge, offer three $333 charges. Reduces fraud, reduces refunds.</li>
      </ul>

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
          Stripe's headline rate of 2.9% + 30¢ is misleading. Real costs are 4.5–5.9% once you add international fees, chargebacks,
          failed payment retries, and your time managing disputes. That's 50–100% more expensive than advertised.
        </p>
        <p style={{ margin: 0 }}>
          Stripe is still the best option for most businesses. But don't assume it's cheap. Model the real 5% cost into your pricing.
          And explore alternatives: bank transfers ($0), invoice batching, or local payment methods that might be cheaper.
        </p>
      </div>
    </>
  );
};
