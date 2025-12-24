import React from 'react';

export const SlackVsDiscordComparisonDE = () => {
  return (
    <>
      <h2>Slack vs Discord: Zahlst du 1.500 € pro Jahr für etwas, das 0 € kostet?</h2>
      <p>
        Slack: 8 € pro Benutzer pro Monat = 1.500 € pro Jahr für ein 10-köpfiges Team.
      </p>

      <p>
        Discord: 0 € pro Jahr.
      </p>

      <p>
        Discord macht 90% davon, was Slack macht. Slack ist corporate polish. Discord ist funktional.
      </p>

      <h3>Slack vs Discord: Unterschied?</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Feature</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Slack</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Discord</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Preis</td>
            <td style={{ padding: '12px' }}>8 €/Benutzer/Monat</td>
            <td style={{ padding: '12px' }}>Kostenlos</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Sprachkanäle</td>
            <td style={{ padding: '12px' }}>Ja (als Slack Calls)</td>
            <td style={{ padding: '12px' }}>Ja (nativ, großartig)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Threaded Conversations</td>
            <td style={{ padding: '12px' }}>Ja</td>
            <td style={{ padding: '12px' }}>Ja (Threads)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Bot-Integrationen</td>
            <td style={{ padding: '12px' }}>Ja (App-Marketplace)</td>
            <td style={{ padding: '12px' }}>Ja (Webhooks, Bots)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Message Archive</td>
            <td style={{ padding: '12px' }}>Ja (limited mit kostenlos plan)</td>
            <td style={{ padding: '12px' }}>Unbegrenzt</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Großartig für</td>
            <td style={{ padding: '12px' }}>Remote Work Teams</td>
            <td style={{ padding: '12px' }}>Tech Teams, Gaming, Communities</td>
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
          Die SaaSKiller-Position
        </p>
        <p style={{ margin: 0 }}>
          Slack kostet 1.500 € pro Jahr. Discord kostet 0 €. Die Funktionalität ist 90% gleich. Nutze Discord. Spar 1.500 €.
        </p>
      </div>
    </>
  );
};
