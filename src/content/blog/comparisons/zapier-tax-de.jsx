import React from 'react';

export const ZapierTaxComparisonDE = () => {
  return (
    <>
      <h2>Die Zapier-Steuer: Wie Integrationslast still 5.000+ € pro Jahr kostet</h2>
      <p>
        Jedes Tool in deinem Stack ist technisch getrennt. Dein CRM spricht nicht mit deiner E-Mail. Dein Projekt-Tracker synchronisiert sich nicht mit deinem Kalender. Deine Buchhaltungssoftware kennt deine Kundendatenbank nicht.
      </p>

      <p>
        Also kaufst du Zapier, um sie zusammenzunähen. Ein paar Zaps hier, ein paar Automatisierungen dort. Es scheint billig: 25–99 €/Monat.
      </p>

      <p>
        Aber im Jahr 2 zahlst du 3.000+ € jährlich nur für Zapier, wartest 50+ Zaps, und deine Integrationen sind fragil, langsam und halb defekt.
      </p>

      <h3>Was Zapier wirklich kostet (Die echte Zahl)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Element</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Kosten</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Zapier-Abonnement (beginnt 25 €/Monat, wächst zu 99+)</td>
            <td style={{ padding: '12px' }}>~2.000–3.000 €/Jahr</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Premium-App-Verbindungen (Slack, Gmail, Salesforce)</td>
            <td style={{ padding: '12px' }}>500–1.500 €/Jahr</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Zeit zum Warten und Debuggen fehlerhafter Zaps</td>
            <td style={{ padding: '12px' }}>2.000–5.000 €/Jahr (versteckte Kosten)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Alternative Integrationen (Make, benutzerdefinierte Webhooks)</td>
            <td style={{ padding: '12px' }}>500–1.000 €/Jahr</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Gesamt jährliche „Zapier-Steuer"</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>5.000–10.000 €</td>
          </tr>
        </tbody>
      </table>

      <p>
        Für ein 10-köpfiges Team sind das 500–1.000 € pro Person pro Jahr, nur um deine Tools zum Sprechen zu bringen.
      </p>

      <h3>Warum Zapier notwendig wurde (Die Grundursache)</h3>

      <p>
        Du hast nicht geplant, Zapier zu nutzen. Es schlich sich ein, weil du Tools wähltest, die sich nicht integrieren:
      </p>

      <ul>
        <li>Du hast HubSpot CRM + Slack + Google Calendar + Asana + Stripe gekauft. Niemand spricht miteinander.</li>
        <li>Du brauchtest, dass sie miteinander sprechen. Also hast du Zapier gekauft.</li>
        <li>Jetzt ist Zapier ein „kritischer" Service. Wenn Zapier ausfällt, brechen deine Integrationen zusammen.</li>
        <li>Du hast eine Ausfallabhängigkeit von einem Dritten.</li>
      </ul>

      <p>
        Zapier erfolgreich, weil deine Tools fehlschlagen. Es ist eine Steuer auf Fragmentierung.
      </p>

      <h3>Was passiert, wenn du Zapier-Nutzung skalierst</h3>

      <p>
        <strong>Monat 0:</strong> Du erstellst 5 Zaps. Einfache Sachen. Slack-Benachrichtigungen, E-Mail-Weiterleitungen.
      </p>

      <p>
        <strong>Monat 3:</strong> Du hast 15 Zaps. Einige brechen gelegentlich zusammen. Eine Slack-Benachrichtigung wird nicht ausgelöst. Ein Kontakt wird nicht synchronisiert. Du debuggst es auf Slack.
      </p>

      <p>
        <strong>Monat 6:</strong> Du hast 30 Zaps. Die Hälfte ist inaktiv oder defekt. Du zahlst für Zaps, die du vergessen hast. Kritische Integrationen schlagen manchmal stillschweigend fehl. Du verbringst 4 Stunden damit zu debuggen, warum Kontakte nicht synchronisiert werden.
      </p>

      <p>
        <strong>Monat 12:</strong> Du hast 50+ Zaps. Du weißt nicht, wie viele. Du weißt nicht, welche kritisch sind. Zapier ist fragil. Du ziehst in Betracht, jemanden nur für die Wartung deiner Integrationen einzustellen.
      </p>

      <h3>Die echten Kosten: Versteckte Zeit und Zerbrechlichkeit</h3>

      <p>
        Das 99 €/Monat-Zapier-Abonnement ist klein. Die versteckten Kosten sind riesig:
      </p>

      <ul>
        <li><strong>Zeit zum Erstellen von Zaps:</strong> Was 5 Minuten in einer nativen Integration sein sollte, dauert 30 Minuten zum Debuggen in Zapier. (10 Zaps × 25 Minuten × 50 €/Stunde = 200 € pro Zap = 2.000 €)</li>
        <li><strong>Debuggen, wenn Integrationen fehlschlagen:</strong> „Warum wurden diese Daten nicht synchronisiert?" Du verbringst 1 Stunde bei der Untersuchung. Es war ein Rate Limit. (Einmal pro Monat × 12 Monate × 1 Stunde × 50 €/Stunde = 600 €/Jahr)</li>
        <li><strong>Umbauen, wenn APIs brechen:</strong> Eine Drittanbieter-API wird aktualisiert. Deine Zaps brechen. Du baust sie um. (2-3 Mal pro Jahr × 2 Stunden = 300–450 €)</li>
        <li><strong>Kognitive Last:</strong> Du musst dich merken, dass 50 Zaps existieren und was sie tun. Mentales Overhead.</li>
      </ul>

      <p>
        Das sind 3-5 Stunden pro Monat von jemandem Zeit. Bei 50 €/Stunde sind das 1.800–3.000 € jährlich. Nur um Integrationen zu verwalten.
      </p>

      <h3>Wenn Zapier es wert ist</h3>

      <p>
        Zapier macht Sinn, wenn:
      </p>

      <ul>
        <li>Du &lt;10 Zaps hast und sie sind größtenteils passiv (Benachrichtigungen, Protokollierung)</li>
        <li>Du dir native Integrationen zwischen deinen Tools nicht leisten kannst</li>
        <li>Du gerade anfängst und schnelle Lösungen brauchst</li>
      </ul>

      <p>
        Zapier ist eine Falle, wenn:
      </p>

      <ul>
        <li>Du &gt;20 Zaps hast (du hast ein Fragmentierungsproblem, kein Integrationsproblem)</li>
        <li>Deine kritischen Workflows von Zapier abhängen (Synchronisierung zwischen CRM und Buchhaltung)</li>
        <li>Du mehr für Zapier zahlst, als deine primären Tools kosten</li>
      </ul>

      <h3>Was du stattdessen tun solltest</h3>

      <p>
        <strong>Option 1: Wähle Tools, die sich nativ integrieren.</strong>
      </p>

      <ul>
        <li>Nutze HubSpot (umfasst CRM + E-Mail + Kalender)</li>
        <li>Nutze Notion (erstelle benutzerdefinierte Datenbanken, reduziere die Anzahl der Tools)</li>
        <li>Nutze Stripe (integriert sich mit den meisten Buchhaltungstools nativ)</li>
      </ul>

      <p>
        <strong>Option 2: Akzeptiere Tool-Fragmentierung und nutze native Integrationsfunktionen.</strong>
      </p>

      <ul>
        <li>HubSpot → Slack (native Integration, kostenlos)</li>
        <li>Asana → Google Calendar (nativ, kostenlos)</li>
        <li>Stripe → Zapier (nur für Zapier, nicht als Backbone)</li>
      </ul>

      <p>
        <strong>Option 3: Erstelle benutzerdefinierte Integrationen (für ernsthaften Betrieb).</strong>
      </p>

      <ul>
        <li>Nutze Make.com (besser als Zapier, ähnlicher Preis)</li>
        <li>Erstelle Webhooks (wenn du einen Entwickler hast)</li>
        <li>Nutze APIs direkt (kostet Entwicklerzeit, nicht Zapier)</li>
      </ul>

      <h3>Die Mathematik: Höre auf, fragmentierte Tools zu kaufen</h3>

      <p>
        So sparst du Geld:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Ansatz</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Tools + Integrationslast</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Fragmentiert (HubSpot + Asana + Slack + Calendar + Zapier)</td>
            <td style={{ padding: '12px' }}>15.000 €/Jahr + 5.000 € Zapier + 2.000 € Zeit = 22.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Integriert (HubSpot mit Slack + Asana + kein Zapier)</td>
            <td style={{ padding: '12px' }}>14.400 €/Jahr + 2.400 € Asana = 16.800 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Ersparnis durch Wahl von integrierten Tools</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>5.200 €/Jahr</td>
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
          Zapiers echte Kosten sind 5.000–10.000 € pro Jahr für die meisten Teams, wenn du das Abonnement, Premium-Verbindungen und die Zeit für Wartung fragiler Integrationen zählst.
        </p>
        <p style={{ margin: 0 }}>
          Die Lösung ist nicht, bessere Integrations-Tools zu kaufen. Die Lösung ist, weniger, besser integrierte Tools zu kaufen.
          Wähle HubSpot statt CRM + E-Mail. Wähle Notion statt CRM + Projektmanager. Höre auf, zu fragmentieren. Höre auf, Zapier zu brauchen.
        </p>
      </div>
    </>
  );
};
