import React from 'react';

export const HubSpotPricingTrapComparisonDE = () => {
  return (
    <>
      <h2>HubSpots Pricing-Falle: Von 600 € zu 3.500+ € pro Monat in 3 Jahren</h2>
      <p>
        HubSpot startet günstig und erscheint großartig. Du denkst: „Das ist toll für 600 €/Monat, warum würde ich etwas anderes brauchen?"
      </p>

      <p>
        Drei Jahre später: Du zahlst 3.500+ € pro Monat und fragst dich, wie das passiert ist.
      </p>

      <p>
        HubSpots Geschäftsmodell hängt davon ab, dass du mit dem kostenlosen/günstigen Plan anfängst und dann immer mehr bezahlte Tiers brauchst.
      </p>

      <h3>Wie HubSpots Preisgestaltung funktioniert</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Plan</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Was du bekommst</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Monatspreis</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Jährlich (1 Modul)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Starter</td>
            <td style={{ padding: '12px' }}>Basis-CRM (50 € Kontakte)</td>
            <td style={{ padding: '12px' }}>50 €</td>
            <td style={{ padding: '12px' }}>600 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Professional</td>
            <td style={{ padding: '12px' }}>Advanced CRM Automation (500 €)</td>
            <td style={{ padding: '12px' }}>500 €</td>
            <td style={{ padding: '12px' }}>6.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Enterprise</td>
            <td style={{ padding: '12px' }}>Alles (3.200 €+)</td>
            <td style={{ padding: '12px' }}>3.200+ €</td>
            <td style={{ padding: '12px' }}>38.400+ €</td>
          </tr>
        </tbody>
      </table>

      <p>
        Aber das ist pro MODUL. HubSpot hat mehrere Module:
      </p>

      <ul>
        <li>CRM (Kundenverwaltung)</li>
        <li>Marketing (E-Mail-Kampagnen, Landing Pages)</li>
        <li>Sales (Pipeline-Management)</li>
        <li>Service (Kundenunterstützung)</li>
        <li>Content Hub (Content Management)</li>
      </ul>

      <p>
        Wenn du alles brauchst (was die meisten Startups nach 2 Jahren tun), zahlst du Professional oder Enterprise für JEDEN Modul.
      </p>

      <h3>Ein echtes Szenario: Von 600 € zu 3.500 € in 3 Jahren</h3>

      <p>
        <strong>Jahr 1:</strong>
      </p>

      <ul>
        <li>Du fängst mit CRM Starter an (50 € × 3 Benutzer = 150 €/Monat)</li>
        <li>Nach 3 Monaten brauchst du Marketing (E-Mail-Kampagnen)</li>
        <li>Du upgradest zu CRM Professional + Marketing Starter = 800 €/Monat</li>
      </ul>

      <p>
        <strong>Jahr 2:</strong>
      </p>

      <ul>
        <li>Dein Team wächst. Du brauchst 5 CRM-Benutzer</li>
        <li>Du brauchst Advanced Marketing Automation</li>
        <li>Du füge Sales Hub hinzu (weil du doch einen Verkäufer eingestellt hast)</li>
        <li>Kosten: CRM Professional (5 Benutzer × 100 € = 500 €) + Marketing Professional (1.000 €) + Sales Starter (500 €) = 2.000 €/Monat</li>
      </ul>

      <p>
        <strong>Jahr 3:</strong>
      </p>

      <ul>
        <li>Dein Team ist jetzt 8 Personen</li>
        <li>Alles ist in HubSpot (du kannst nicht mehr heraus)</li>
        <li>Du brauchst Advanced Features in allen Modulen</li>
        <li>Kosten: CRM Professional (1.000 €) + Marketing Professional (1.500 €) + Sales Professional (1.000 €) + Service Hub (500 €) = 4.000+ €/Monat</li>
      </ul>

      <p>
        Du fängst mit 600 € / Jahr an. Du endest mit 48.000 € / Jahr. Das ist 80x teurer.
      </p>

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
          HubSpot ist eine Preisgestaltungs-Falle. Du fängst bei 600 € an und endest bei 4.000+ € pro Monat innerhalb von 3 Jahren, nicht weil du mehr Benutzer hast, sondern weil HubSpot die Kosten pro Modul erhöht, während dein Unternehmen wächst.
        </p>
        <p style={{ margin: 0 }}>
          Wenn du großes Wachstum erwartest, wechsel statt zu HubSpot zu Salesforce oder Pipedrive. Wenn du klein bleibst, bleib bei Airtable oder Notion. HubSpot ist nur gut wenn du klein bleibst und es nicht brauchst zu skalieren.
        </p>
      </div>
    </>
  );
};
