import React from 'react';

export const SlackRealCostComparisonDE = () => {
  return (
    <>
      <h2>Slacks echte Kosten: 30.000 € pro Jahr, nicht 1.500 €</h2>
      <p>
        Slack sagt: „8 € pro Benutzer pro Monat für ein 10-köpfiges Team = 1.500 € pro Jahr."
      </p>

      <p>
        Das ist eine Lüge. Die echten Kosten sind 30.000 € pro Jahr, wenn du Produktivitätsverluste zählst.
      </p>

      <p>
        Slack ist die beste Chat-App, aber es ist ein Produktivitäts-Killer, wenn dein Team es schlecht nutzt (was die meisten Teams tun).
      </p>

      <h3>Die echten Slack-Kosten</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Kostentyp</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Jährliche Kosten (10 Personen)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Slack-Abonnement ($8/Benutzer/Monat)</td>
            <td style={{ padding: '12px' }}>1.500 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Zeit verbracht mit Slack-Ablenkung (siehe unten)</td>
            <td style={{ padding: '12px' }}>15.000–20.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Produktivitätsverlust durch ständige Unterbrechungen</td>
            <td style={{ padding: '12px' }}>10.000–15.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>App-Integrationen und Verwaltung (Bots, Webhooks)</td>
            <td style={{ padding: '12px' }}>2.000–5.000 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Gesamtechte Kosten</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>28.500–41.500 €</td>
          </tr>
        </tbody>
      </table>

      <p>
        Das ist 19-27x was das Abonnement kostet.
      </p>

      <h3>Wie Slack Produktivität vernichtet</h3>

      <p>
        <strong>Das durchschnittliche Slack-Paradoxon:</strong> Es ist ein Kommunikations-Tool, das dein Team daran hindert zu kommunizieren, weil es zu viel kommuniziert.
      </p>

      <ul>
        <li><strong>Der Notification Hell:</strong> Dein Team bekommt 50+ Slack-Benachrichtigungen pro Tag. Mehr als 90% sind unwichtig. Du wirst zum Notification-Manager statt zum Arbeiter.</li>
        <li><strong>Das Lesen-Lesen-Klingeln-Problem:</strong> Slack zeigt „3 ungelesene Nachrichten". Du musst schauen. Das sind 30 Sekunden. × 50 mal am Tag = 25 Minuten täglich nur um Nachrichten zu überprüfen.</li>
        <li><strong>Ständige Kontext-Wechsel:</strong> Ein Slack-Ping. Du schaust hin. Nicht relevant. Du bist schon raus aus dem Fluss. Die Forschung zeigt, dass es 15-23 Minuten dauert, um den Kontext wiederherzustellen. (Research: Gloria Mark, UCI)</li>
        <li><strong>Die Erwartung der sofortigen Reaktion:</strong> Jemand postet in Slack. Es ist nicht urgent, aber dein Gehirn FÜHLT sich urgent an. Du antwortest in 2 Minuten. Das zerstört Deep Work.</li>
      </ul>

      <h3>Slack-Nutzung Kosten-Analyse</h3>

      <p>
        Ein durchschnittliches Mitglied eines 10-köpfigen Teams, das Slack schlecht nutzt:
      </p>

      <ul>
        <li><strong>50 Slack-Benachrichtigungen pro Tag × 365 Tage = 18.250 Notifications pro Jahr</strong></li>
        <li><strong>Durchschnitt 30 Sekunden um jede zu überprüfen = 151 Stunden pro Jahr</strong></li>
        <li><strong>Bei 50 € pro Stunde = 7.550 € pro Person pro Jahr</strong></li>
        <li><strong>× 10 Personen = 75.500 € Kosten für „Notification Checking"</strong></li>
      </ul>

      <p>
        Plus:
      </p>

      <ul>
        <li><strong>Deep Work Kontext-Wechsel:</strong> Slack unterbricht dich 20x pro Tag. Jede Unterbrechung kostet 15-23 Minuten Produktivität. (20 × 20 Minuten durchschnitt = 6 Stunden täglich lost!)</li>
        <li><strong>6 Stunden × 50 € × 250 Arbeitstage = 75.000 € Produktivitätsverlust pro Person pro Jahr</strong></li>
      </ul>

      <p>
        Für ein 10-köpfiges Team: Das ist 750.000 € Produktivitätsverlust pro Jahr nur von Slack-Ablenkung.
      </p>

      <h3>Was du tun solltest</h3>

      <p>
        <strong>Option 1: Nutze Slack richtig (was die meisten Teams nicht tun).</strong>
      </p>

      <ul>
        <li>Notifications standardmäßig AUSschalten. Nur kritische Channels aktiv.</li>
        <li>Lege „Slack-freie Stunden" fest (8-10 AM und 2-4 PM keine Slack-Checks erlaubt).</li>
        <li>Minimiere Channels. Ziel: &lt;5 Channels, nicht 50.</li>
        <li>Nutze Threads um Spam zu reduzieren.</li>
        <li>E-Mail für wichtige, asynchrone Nachrichten. Slack nur für zeitrelevante Kommunikation.</li>
      </ul>

      <p>
        <strong>Option 2: Nutze Discord statt Slack (kostenlos oder minimal).</strong>
      </p>

      <ul>
        <li>Discord ist kostenlos für Teams.</li>
        <li>Bessere Sprachfunktionen.</li>
        <li>Weniger Enterprise-Feature-Bloat.</li>
      </ul>

      <p>
        <strong>Option 3: Nutze E-Mail + Meetings statt Slack.</strong>
      </p>

      <ul>
        <li>Asynchrone Kommunikation über E-Mail.</li>
        <li>Synchron nur in geplanten Meetings.</li>
        <li>Weniger ständige Ablenkung.</li>
      </ul>

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
          Slack ist 8 € pro Benutzer monatlich. Aber die echten Kosten sind 15.000–25.000 € pro Person pro Jahr in Produktivitätsverlust durch ständige Unterbrechungen und Kontext-Wechsel.
        </p>
        <p style={{ margin: 0 }}>
          Slack ist ein großartiges Kommunikations-Tool. Es ist ein schreckliches Produktivitäts-Tool. Nutze es für dringende Feuerwehrprobleme. Nutze alles andere asynchron.
        </p>
      </div>
    </>
  );
};
