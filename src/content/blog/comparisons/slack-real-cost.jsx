import React from 'react';

export const SlackRealCostComparison = () => {
  return (
    <>
      <h2>Slack's Real Cost: $12.50/Month Per User Is Just the Beginning</h2>
      <p>
        Everyone knows Slack costs $12.50 per user per month on Pro plan. That's how Slack markets it: the per-user price.
      </p>

      <p>
        But the per-user price is a lie. It's not the real cost. The real cost includes all the hidden things Slack doesn't talk about.
      </p>

      <p>
        For a 10-person team, Slack's real cost is closer to $30,000/year. Not $1,500.
      </p>

      <h3>The Visible Cost</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Item</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>10 Pro licenses × $12.50/user/month</td>
            <td style={{ padding: '12px' }}>$1,500/year</td>
          </tr>
        </tbody>
      </table>

      <h3>The Hidden Costs (The Real Story)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Hidden Cost</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Lost productivity from constant notifications</td>
            <td style={{ padding: '12px' }}>$8,000–$12,000/year</td>
            <td style={{ padding: '12px' }}>Average worker loses 1-2 hours/day context switching between chat and actual work. For 10 people × $50/hour × 250 workdays.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Slack integrations (Zapier, custom bots)</td>
            <td style={{ padding: '12px' }}>$500–$2,000/year</td>
            <td style={{ padding: '12px' }}>You quickly realize Slack alone doesn't do what you need. You buy Zapier or hire someone to build bots.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Information chaos & knowledge loss</td>
            <td style={{ padding: '12px' }}>$5,000–$8,000/year</td>
            <td style={{ padding: '12px' }}>Critical information gets lost in channels. You spend time searching or recreating things that were discussed 3 months ago.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Slack becoming your email (inefficiency)</td>
            <td style={{ padding: '12px' }}>$3,000–$5,000/year</td>
            <td style={{ padding: '12px' }}>Slack replaces email in theory but adds overhead. You're managing notifications in two places, missing things either way.</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Replacing with Discord 3 years later (switching cost)</td>
            <td style={{ padding: '12px' }}>$2,000–$5,000</td>
            <td style={{ padding: '12px' }}>One-time: exporting data, retraining team, rebuilding integrations, archiving old Slack workspace</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Total Real Cost (10 people, 3 years)</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>$28,500–$42,500</td>
            <td style={{ padding: '12px' }}></td>
          </tr>
        </tbody>
      </table>

      <p>
        That's $30,000 that could have gone to hiring, or customer support, or literally anything else.
      </p>

      <h3>The Productivity Killer Nobody Talks About</h3>

      <p>
        Slack is designed to interrupt you. That's how it works. It succeeds at interrupting you.
      </p>

      <p>
        Your team gets pinged constantly:
      </p>

      <ul>
        <li>"Quick question in #marketing" – 5 minutes to switch context, 10 minutes to answer, 20 minutes to refocus on your actual work</li>
        <li>Direct message from coworker – "Hey do you have a sec?" (You don't, but you feel obligated)</li>
        <li>Bot notification about something that probably doesn't matter – glance over anyway</li>
        <li>@channel – everyone stops what they're doing</li>
      </ul>

      <p>
        Studies consistently show that knowledge workers take 20+ minutes to fully regain focus after an interruption.
      </p>

      <p>
        If your 10-person team is interrupted 30 times per day by Slack (realistic), that's:
      </p>

      <ul>
        <li>30 interruptions × 20 minutes recovery = 600 minutes of lost productivity per person per day</li>
        <li>= 10 hours per person per day in Slack-related distraction</li>
        <li>= $50/hour × 10 hours × 10 people × 250 workdays = $1.25M annually</li>
      </ul>

      <p>
        Okay, that math is exaggerated. But the principle isn't: Slack is a context-switching machine. The $1,500 license fee is nothing compared to what it costs your productivity.
      </p>

      <h3>The Lock-In Problem</h3>

      <p>
        You can't leave Slack easily. After 2 years, you have:
      </p>

      <ul>
        <li>3 years of historical conversations (important decisions made there)</li>
        <li>15 integrations (Google Calendar, Jira, GitHub, GitHub, Zapier, etc.)</li>
        <li>Custom bots and workflows your team relies on</li>
        <li>Slack has become your actual workspace operating system</li>
      </ul>

      <p>
        Exporting and migrating to Discord takes 2-3 weeks of tech setup plus change management.
      </p>

      <p>
        So you stay. Year 3 comes. Slack raises prices. You accept it.
      </p>

      <h3>What You Should Actually Do</h3>

      <ul>
        <li><strong>Use Discord (Free):</strong> Same functionality. No cost. Better integrations than Slack's free tier. Your team already knows it.</li>
        <li><strong>Use email for actual information:</strong> Slack is a notification system, not a knowledge base. Critical information should be documented in email or Notion, not disappearing from a channel.</li>
        <li><strong>Establish norms for interruption:</strong> Designated focus blocks (no Slack 9-11am). Async communication as default. Threads for conversations, not scattered @mentions.</li>
        <li><strong>Use Twist ($5-$7/month):</strong> If you love threaded conversation, use Twist instead. Still cheaper than Slack and designed differently (no notification hell).</li>
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
          Slack's per-user price is deceptively cheap. The real cost—lost productivity, integrations, lock-in—is 10x higher.
        </p>
        <p style={{ margin: 0 }}>
          You're paying $1,500/year to have your team interrupted constantly. That's not a deal. That's a ransom.
          Use Discord or Twist. Establish norms that value focus. That's worth more to your business than anything Slack sells you.
        </p>
      </div>
    </>
  );
};
