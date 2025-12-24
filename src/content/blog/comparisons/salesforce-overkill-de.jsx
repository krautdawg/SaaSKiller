import React from 'react';

export const SalesforceOverkillComparisonDE = () => {
  return (
    <>
      <h2>Salesforce Overkill: 105.000–158.000 € pro Jahr für 10 Verkäufer</h2>
      <p>
        Salesforce beginnt mit einer einfachen Versprechung: „Verwalte deine Kundenbeziehungen besser."
      </p>

      <p>
        Die Realität: 105.000–158.000 € Jahreslohn für 10 Verkäufer. Für ein Team, das oft nur ein simples CRM-System zum Nachverfolgen von Leads braucht.
      </p>

      <p>
        Salesforce ist ein CRM von Enterprise für Enterprise-Kosten. Dein kleines Startup brauchts nicht.
      </p>

      <h3>Die echten Salesforce-Kosten</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Kostentyp</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Jährlich (10 Verkäufer)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Salesforce Enterprise License ($550/Benutzer/Monat)</td>
            <td style={{ padding: '12px' }}>66.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Einrichtung und Migration (20 Stunden × 150 €)</td>
            <td style={{ padding: '12px' }}>3.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Jährliche Verwaltung und Wartung (2 Stunden/Woche)</td>
            <td style={{ padding: '12px' }}>5.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Integrationen mit anderen Tools (Zapier, Custom)</td>
            <td style={{ padding: '12px' }}>5.000–10.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Schulung und Support</td>
            <td style={{ padding: '12px' }}>3.000–5.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Lizenzplatz für Admin (mindestens eine Person)</td>
            <td style={{ padding: '12px' }}>6.600 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Gesamtjahrespreis (Minimal)</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>88.600 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Gesamtjahrespreis (Mit Customization)</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>105.000–158.000 €</td>
          </tr>
        </tbody>
      </table>

      <p>
        Das ist für ein kleines Verkaufsteam. Wenn dein Team 20 Personen ist? 210.000–316.000 € pro Jahr.
      </p>

      <h3>Warum du Salesforce nicht brauchst</h3>

      <p>
        <strong>Die meisten Startups brauchen nicht 95% von Salesforce's Funktionen.</strong>
      </p>

      <ul>
        <li>Du brauchst nicht Custom Objects und Workflows.</li>
        <li>Du brauchst nicht Advanced Reporting.</li>
        <li>Du brauchst nicht Einstein AI (du brauchst keine AI-getriebene Vorhersagen, wenn du nur 100 Leads pro Monat hast).</li>
        <li>Du brauchst nicht Apex-Entwicklung.</li>
      </ul>

      <p>
        <strong>Was du BRAUCHST:</strong>
      </p>

      <ul>
        <li>Einen Ort um Leads zu speichern</li>
        <li>Die Möglichkeit, sie zu tracken (wann hast du das letzte Mal gesprochen?)</li>
        <li>Die Möglichkeit, Stadien (Prospect → Negotiations → Won/Lost) zu verfolgen</li>
        <li>Export zu CSV</li>
      </ul>

      <p>
        HubSpot macht das für 600 € pro Jahr. Airtable macht das kostenlos. Salesforce macht das für 88.600 € pro Jahr.
      </p>

      <h3>Salesforce vs Alternativen</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>CRM</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Preis (10 Benutzer)</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Setup Komplexität</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Beste für</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Salesforce</td>
            <td style={{ padding: '12px' }}>88.600–158.000 €/Jahr</td>
            <td style={{ padding: '12px' }}>Sehr hoch</td>
            <td style={{ padding: '12px' }}>Enterprise (1.000+ Mitarbeiter)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>HubSpot</td>
            <td style={{ padding: '12px' }}>600–5.000 €/Jahr</td>
            <td style={{ padding: '12px' }}>Mittel</td>
            <td style={{ padding: '12px' }}>Startups, kleine Unternehmen</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Pipedrive</td>
            <td style={{ padding: '12px' }}>400–2.000 €/Jahr</td>
            <td style={{ padding: '12px' }}>Niedrig</td>
            <td style={{ padding: '12px' }}>Verkaufsteams unter 50 Personen</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Airtable</td>
            <td style={{ padding: '12px' }}>0–120 €/Jahr</td>
            <td style={{ padding: '12px' }}>Niedrig</td>
            <td style={{ padding: '12px' }}>Sehr kleine Teams (Bootstrapped)</td>
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
        <p style={{ margin: 0, marginBottom: '12px' }}>
          Salesforce kostet 88.600–158.000 € pro Jahr für 10 Verkäufer. Du brauchst nicht 95% seiner Funktionen. HubSpot oder Pipedrive machen 95% der gleichen Sache für 600–2.000 € pro Jahr.
        </p>
        <p style={{ margin: 0 }}>
          Nutze Salesforce nur wenn dein Unternehmen &gt;500 Mitarbeiter ist und eine dedizierten Salesforce-Administrator hast. Für alles andere: Nutze HubSpot, Pipedrive oder sogar Airtable.
        </p>
      </div>
    </>
  );
};
