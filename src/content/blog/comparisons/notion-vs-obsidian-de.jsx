import React from 'react';

export const NotionVsObsidianComparisonDE = () => {
  return (
    <>
      <h2>Notion vs Obsidian: Cloud-Gefängnis vs Souveränes Wissen</h2>
      <p>
        Zwei gegensätzliche Weltanschauungen darüber, wem deine Informationen gehören.
      </p>

      <p>
        Notion: Du zahlst, um dein Wissen zu mieten. Du kannst jederzeit rausgeworfen werden.
      </p>

      <p>
        Obsidian: Du zahlst einmalig, dein Wissen gehört dir für immer.
      </p>

      <h3>Notion: Der Cloud-Gefängnis-Ansatz</h3>

      <ul>
        <li><strong>Du mietest dein Wissen:</strong> Du zahlst monatlich. Wenn du nicht zahlst, ist dein Wissen weg.</li>
        <li><strong>Lock-In:</strong> Deine Daten sind in Notions proprietärem Format. Export ist möglich, aber schmerzhaft.</li>
        <li><strong>Abhängigkeit von der Verfügbarkeit:</strong> Wenn Notion ausfällt, kannst du nicht auf dein Wissen zugreifen.</li>
        <li><strong>Preiserhöhungen:</strong> Notion kann seine Preise jederzeit erhöhen. Du kannst nicht gehen, ohne alles zu verlieren.</li>
      </ul>

      <h3>Obsidian: Der Souveränität-Ansatz</h3>

      <ul>
        <li><strong>Du zahlst einmal, dein Wissen gehört dir:</strong> 50 € Lizenz. Das ist es. Dein Wissen gehört dir für immer.</li>
        <li><strong>Keine Lock-In:</strong> Deine Notizen sind Markdown-Dateien. Du kannst Notion, andere Apps oder gar nichts verwenden.</li>
        <li><strong>Offline-Zugriff:</strong> Keine Internetverbindung nötig. Dein Wissen ist immer verfügbar.</li>
        <li><strong>Open Source Plugin-System:</strong> Die Community erweitert Obsidian, nicht Notion.</li>
      </ul>

      <h3>Der Vergleich</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Feature</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Notion</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Obsidian</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Kosten über 5 Jahre</td>
            <td style={{ padding: '12px' }}>600 € (10 €/Monat)</td>
            <td style={{ padding: '12px' }}>50 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Datenbesitz</td>
            <td style={{ padding: '12px' }}>Du zahlst, Notion besitzt</td>
            <td style={{ padding: '12px' }}>Du besitzt (Markdown-Dateien)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Offline-Zugriff</td>
            <td style={{ padding: '12px' }}>Nein</td>
            <td style={{ padding: '12px' }}>Ja</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Plugin-System</td>
            <td style={{ padding: '12px' }}>Notion kontrolliert alles</td>
            <td style={{ padding: '12px' }}>Community-Plugins sind kostenlos</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Lock-In-Risiko</td>
            <td style={{ padding: '12px' }}>Hoch</td>
            <td style={{ padding: '12px' }}>Niedrig</td>
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
          Notion ist schöner. Obsidian ist günstiger und dein Wissen gehört dir. Für persönliche Notizen: Obsidian. Für Team-Zusammenarbeit: Notion ist ein notwendiges Übel.
        </p>
      </div>
    </>
  );
};
