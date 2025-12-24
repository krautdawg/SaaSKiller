import React from 'react';
import { Link } from 'react-router-dom';

export const HubSpotVsSalesforceComparisonDE = () => {
  return (
    <>
      <h2>HubSpot vs Salesforce: Die Mathematik, warum die meisten kleinen Teams falsch wählen</h2>
      <p>
        Hier ist, was passiert: Ein Startup wählt HubSpot, weil es „einfacher als Salesforce" ist.
        Dann wächst es. Jemand hört „Salesforce ist der Industriestandard."
        Sie upgraden. Drei Jahre später zahlen sie 15.000 € pro Jahr für ein System, das sie nicht verwenden,
        das von einer Person gepflegt wird, mit Daten, die sie nicht einfach herausbekommen.
      </p>

      <p>
        Dieser Vergleich hilft dir, diese Falle zu vermeiden.
      </p>

      <h3>Der Kernunterschied (in echten Begriffen)</h3>

      <p>
        <strong>HubSpot:</strong> Konzipiert für wachsende Unternehmen mit nicht-technischen Teams. All-in-One Marketing + Vertrieb + Service.
        Besessen von Teams, die es täglich nutzen.
      </p>

      <p>
        <strong>Salesforce:</strong> Konzipiert für große Unternehmen mit dedizierten Salesforce-Administratoren.
        Verkauft wie ein Betriebssystem. Implementiert wie ein großes Projekt.
      </p>

      <h3>Preisgestaltung, die die echte Geschichte erzählt</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Szenario</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>HubSpot Kosten/Jahr</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Salesforce Kosten/Jahr</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>5-Personen-Startup (kostenlos)</td>
            <td style={{ padding: '12px' }}>Kostenlos</td>
            <td style={{ padding: '12px' }}>Nicht verfügbar</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>5-Personen-Startup (bezahlt)</td>
            <td style={{ padding: '12px' }}>1.100 €/Monat = 13.200 €</td>
            <td style={{ padding: '12px' }}>1.500 €/Monat = 18.000 € (Essentials)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>10-Personen-Team</td>
            <td style={{ padding: '12px' }}>2.200 €/Monat = 26.400 €</td>
            <td style={{ padding: '12px' }}>3.000 €/Monat = 36.000 € (Professional)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>20-Personen-Team</td>
            <td style={{ padding: '12px' }}>4.400 €/Monat = 52.800 €</td>
            <td style={{ padding: '12px' }}>6.000 €/Monat = 72.000 € (Professional)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>+ benutzerdefinierte Felder (HubSpot) / Sandbox (Salesforce)</td>
            <td style={{ padding: '12px' }}>0–275 €</td>
            <td style={{ padding: '12px' }}>+365–915 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>+ Admin / Implementierung / Training</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>4.500–13.500 €</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>18.000–91.000 €+</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Für ein 10-Personen-Team kostet HubSpot 27% weniger und dauert 80% weniger Zeit zur Implementierung.</strong>
      </p>

      <h3>Was du tatsächlich bekommst (ehrliche Bewertung)</h3>

      <h4>HubSpot-Stärken</h4>
      <ul>
        <li><strong>Einfach zu lernen.</strong> Vertriebsmitarbeiter können am ersten Tag damit anfangen mit minimalem Training.</li>
        <li><strong>Eingebautes E-Mail und Meetings.</strong> Kein Salesforce + Outlook-Alptraum.</li>
        <li><strong>All-in-One.</strong> Marketing-Automatisierung, E-Mail, CRM, Formulare—inbegriffen. Spart 2–3 Abos.</li>
        <li><strong>Weniger Anpassung erforderlich.</strong> Funktioniert so, wie du denkst, nicht wie dein Admin denkt.</li>
        <li><strong>Schmerzloser Datenexport.</strong> Hol deine Daten heraus, wann immer du willst (keine Lösegeldgebühren).</li>
      </ul>

      <h4>HubSpot-Schwächen</h4>
      <ul>
        <li><strong>Begrenzte benutzerdefinierte Felder.</strong> Du stößt schneller auf Grenzen, wenn du viele Anpassungen brauchst.</li>
        <li><strong>Reporting fühlt sich grundlegend an.</strong> Erweiterte Analysen sind in einem separaten Tool (Looker).</li>
        <li><strong>Kann nicht so tief angepasst werden.</strong> Wenn du wilde Anpassungen brauchst, wirst du Wände sehen.</li>
        <li><strong>Ersetzt nicht Sales Execution Tools.</strong> Du könntest trotzdem Outreach, SalesLoft, etc. brauchen.</li>
      </ul>

      <h4>Salesforce-Stärken</h4>
      <ul>
        <li><strong>Unendlich anpassbar.</strong> Wenn du das Budget hast (und einen dedizierten Admin), bau alles.</li>
        <li><strong>Wirkliche Enterprise-Skalierbarkeit.</strong> 500er-Sitzunternehmen nutzen es genauso wie 50.000er-Sitzunternehmen.</li>
        <li><strong>Ökosystem.</strong> Tausende von Add-ons und Integrationen.</li>
        <li><strong>Branchenspezifische Versionen.</strong> Gesundheitswesen, Finanzdienstleistungen, etc. haben maßgeschneiderte Lösungen.</li>
      </ul>

      <h4>Salesforce-Schwächen</h4>
      <ul>
        <li><strong>Kompliziert zu implementieren.</strong> Plan für 3–6 Monate und 27.000–91.000 € an Beratung.</li>
        <li><strong>Admin-abhängig.</strong> Erfordert eine engagierte Person oder ein Team, um es zu pflegen.</li>
        <li><strong>Steile Lernkurve.</strong> Vertriebsmitarbeiter brauchen Training und lehnen es oft ab, es zu verwenden.</li>
        <li><strong>Überengineert für kleine Teams.</strong> Du zahlst für Kapazität, die du nie nutzen wirst.</li>
        <li><strong>Daten-Lock-In.</strong> Export ist möglich, aber schmerzhaft, konzipiert um dich zu fangen.</li>
        <li><strong>Updates brechen Dinge.</strong> Regelmäßige Updates brechen manchmal Anpassungen, die du gebaut hast.</li>
      </ul>

      <h3>Der echte Unterschied (Was es dein Unternehmen tatsächlich kostet)</h3>

      <p>
        Der Etikett ist nur der Anfang. Hier ist, was die meisten kleinen Unternehmen nicht berechnen:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Versteckte Kosten</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>HubSpot</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Salesforce</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Implementierungszeit</td>
            <td style={{ padding: '12px' }}>2–4 Wochen</td>
            <td style={{ padding: '12px' }}>3–6 Monate</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Beratung erforderlich</td>
            <td style={{ padding: '12px' }}>0–4.500 €</td>
            <td style={{ padding: '12px' }}>22.700–91.000 €+</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Admin-Zeit (jährlich)</td>
            <td style={{ padding: '12px' }}>Teilzeit (0,5–1 Person)</td>
            <td style={{ padding: '12px' }}>Vollzeit (1–2 Personen)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Trainingstunden pro Benutzer</td>
            <td style={{ padding: '12px' }}>2–4 Stunden</td>
            <td style={{ padding: '12px' }}>8–20 Stunden</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Benutzer-Einführungsrate</td>
            <td style={{ padding: '12px' }}>70–90%</td>
            <td style={{ padding: '12px' }}>40–60%</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Gesamte 3-Jahres-Betriebskosten</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>~78.000–96.000 €</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>~164.000–255.000 €+</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Für ein 10-Personen-Team über 3 Jahre kostet Salesforce 2–3x mehr als HubSpot—und liefert schlechtere Einführungsraten.</strong>
      </p>

      <h3>Wenn du tatsächlich Salesforce brauchst</h3>

      <p>
        Hier ist die ehrliche Antwort: Die meisten kleinen Teams tun das nicht.
      </p>

      <p>
        Du könntest Salesforce brauchen, wenn:
      </p>

      <ul>
        <li>Du hast 50+ Vertriebsmitarbeiter und brauchst erweiterte Prognosen</li>
        <li>Du bist in einer regulierten Branche, die Audit Trails und spezifische Anpassungen erfordert</li>
        <li>Dein bestehendes Anbieter-Ökosystem ist auf Salesforce aufgebaut (und der Wechsel ist teuer)</li>
        <li>Du hast einen dedizierten Salesforce-Admin, der es liebt</li>
      </ul>

      <p>
        Du brauchst Salesforce wahrscheinlich nicht, wenn:
      </p>

      <ul>
        <li>Du hast weniger als 50 Mitarbeiter</li>
        <li>Du hast keinen dedizierten Admin</li>
        <li>Deine Vertriebsmitarbeiter vermeiden dein aktuelles CRM</li>
        <li>Du zahlst für Funktionen, die du nicht nutzt</li>
        <li>Du erwägst Salesforce, weil „es der Standard ist"</li>
      </ul>

      <h3>Das Migrationsproblem (Warum du stecken bleibst)</h3>

      <p>
        Ein Grund, warum Unternehmen Salesforce nicht verlassen: Angst vor Migration.
      </p>

      <p>
        Nach 3 Jahren hast du:
      </p>

      <ul>
        <li>Benutzerdefinierte Felder und Workflows, die keiner erinnert</li>
        <li>5–10 Integrationen (Slack, Marketo, Looker, etc.) die du neu aufbauen musst</li>
        <li>Institutionelles Wissen, das nur dein Admin hat</li>
        <li>Historische Daten, vor denen du Angst hast, zu verlieren</li>
      </ul>

      <p>
        Salesforce weiß das. Es ist Teil der Strategie.
      </p>

      <p>
        HubSpot macht das einfacher. Deine Daten sind exportierbar. Deine Integrationen sind einfacher. Du bist nicht gefangen.
      </p>

      <h3>Die echte Empfehlung</h3>

      <p>
        <strong>Wenn du unter 50 Personen bist und dich zwischen HubSpot und Salesforce entscheidest: Wähle HubSpot.</strong>
      </p>

      <p>
        Nicht, weil HubSpot „besser" ist. Aber weil:
      </p>

      <ul>
        <li>Es kostet weniger (50% Ersparnis über 3 Jahre)</li>
        <li>Es dauert weniger, um es zu implementieren (Wochen, nicht Monate)</li>
        <li>Dein Team wird es tatsächlich verwenden (bessere Einführungsraten)</li>
        <li>Es erfordert keinen dedizierten Admin</li>
        <li>Du kannst weggehen, wenn es nicht mehr für dich funktioniert</li>
      </ul>

      <p>
        Nutze HubSpot 2–3 Jahre lang. Wenn sich dein Geschäft grundlegend ändert und du es wirklich überwächst, dann migriere zu Salesforce.
      </p>

      <p>
        Aber beginne nicht mit Salesforce, weil du denkst, du könntest „hineinwachsen".
        Du wirst nicht. Du zahlst nur mehr für Komplexität, die du nicht brauchst.
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
          Salesforce ist für große Unternehmen gebaut. Wenn du nicht groß bist, subventionierst du Salesforces Ökosystem
          mit Geld, das du für Einstellungen, Marketing oder Produkt ausgeben könntest.
        </p>
        <p style={{ margin: 0 }}>
          HubSpot ist nicht perfekt. Aber es ist für Teams wie deins gebaut. Nutze es. Wenn du es wirklich überwächst,
          wechsle dann. Nicht davor.
        </p>
      </div>
    </>
  );
};
