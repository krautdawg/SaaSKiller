import React from 'react';

export const AsanaComplexityBurdenComparisonDE = () => {
  return (
    <>
      <h2>Asanas Komplexitätslast: Wenn ein einfacher Task Manager zu deinem zweiten Job wird</h2>
      <p>
        Asana beginnt einfach. Du erstellst Projekte. Du fügst Tasks hinzu. Du weist sie zu. Es funktioniert.
      </p>

      <p>
        Aber Asana hat Tiefe. Benutzerdefinierte Felder. Abhängigkeiten. Portfolio-Management. Vorlagen. Automatisierungen. Regeln. Webhooks.
      </p>

      <p>
        Teams entdecken schnell: Um Asana wirklich effektiv zu nutzen, brauchst du 20+ Stunden zum Einrichten. Und 2-3 Stunden pro Woche zum Verwalten.
      </p>

      <p>
        Für ein 10-köpfiges Team sind das 100+ Stunden pro Jahr, die du mit Asana-Verwaltung statt mit echter Arbeit verbringst. Bei 50 €/Stunde sind das 5.000 € Overhead. Aber du zahlst nur 3.000 € für Asana selbst.
      </p>

      <h3>Die Asana-Einrichtungsfalle</h3>

      <p>
        So sieht es aus, wenn du Asana „richtig" einrichtest:
      </p>

      <ul>
        <li><strong>Projektvorlagen:</strong> Du erstellst Vorlagen für verschiedene Projekttypen (Marketingkampagne, Softwareversion, Kundenprojekt). 5 Stunden anfängliches Setup.</li>
        <li><strong>Benutzerdefinierte Felder:</strong> Du fügst Felder für Priorität, Status, Budget, Zeitplan, Besitzer, Tags usw. hinzu. Jedes Feld benötigt Regeln und Standards. 3 Stunden.</li>
        <li><strong>Portfolios:</strong> Du möchtest alle Projekte im Unternehmen sehen. Du richtest Portfolios nach Abteilung ein. 2 Stunden.</li>
        <li><strong>Abhängigkeiten:</strong> Du verlinkst Tasks (Task B hängt von Task A ab). Das macht Sinn, aber fügt Komplexität hinzu. 4 Stunden Lernkurve.</li>
        <li><strong>Automatisierungsregeln:</strong> Wenn Status sich in „Erledigt" ändert, kennzeichne verwandte Tasks automatisch. Wenn Besitzer sich ändert, sende Benachrichtigung. 3 Stunden zum Einrichten von Regeln.</li>
        <li><strong>Timeline und Gantt-Diagramme:</strong> Du möchtest die Projekt-Timeline visuell sehen. Richte das ein. 2 Stunden.</li>
      </ul>

      <p>
        Gesamt: 19 Stunden zum korrekten Einrichten von Asana. Das ist fast eine Woche Arbeit für einen Projektmanager oder einen Engineer beim Setup.
      </p>

      <h3>Dann beginnt die Wartung</h3>

      <p>
        Sobald Asana eingerichtet ist, muss jemand es warten:
      </p>

      <ul>
        <li><strong>Wöchentliche Bereinigung:</strong> Archiviere abgeschlossene Projekte, lösche Test-Tasks, aktualisiere Portfolio-Status. 1 Stunde/Woche.</li>
        <li><strong>Vorlagen-Updates:</strong> Neuer Projekttyp entdeckt, zur Vorlage hinzufügen. Neues Feld benötigt, benutzerdefiniertes Feld hinzufügen, alle bestehenden Projekte aktualisieren. 1 Stunde/Woche.</li>
        <li><strong>Helpdesk:</strong> „Wie füge ich ein benutzerdefiniertes Feld hinzu?" „Warum wird mein Task nicht im Report angezeigt?" „Können wir die Projektstruktur ändern?" 2 Stunden/Woche.</li>
        <li><strong>Integrations-Wartung:</strong> Asana ist mit Slack, Google Calendar, deinem CRM verbunden. Etwas funktioniert nicht, debugge es. 1 Stunde/Woche.</li>
      </ul>

      <p>
        Das sind 5 Stunden pro Woche = 250 Stunden pro Jahr = 12.500 € Overhead (bei 50 €/Stunde).
      </p>

      <p>
        Du zahlst 3.000 €/Jahr für Asana, aber gibst 12.500 € aus, um es funktionsfähig zu halten. Die echten Kosten sind 4x das Abonnement.
      </p>

      <h3>Das Komplexitätsproblem</h3>

      <p>
        Asana wird zum Problem, weil:
      </p>

      <ul>
        <li><strong>Es ist zu flexibel.</strong> Du kannst Projektmanagement auf 10 verschiedene Arten in Asana machen. Jeder hat einen anderen Ansatz. Chaos.</li>
        <li><strong>Es erfordert Training.</strong> Neue Mitarbeiter müssen deine benutzerdefinierte Feldstruktur, deine Projekt-Namenskonvention, deinen Status-Workflow erlernen. Das kostet Zeit.</li>
        <li><strong>Es ist nicht selbsterklärend.</strong> Anders als Trello (das offensichtlich ist), erfordert Asana Setup. Wenn niemand es wartet, fällt es auseinander.</li>
        <li><strong>Es wird zur kritischen Infrastruktur.</strong> Sobald alles in Asana ist, ist ein Wechsel schwer. Du bist eingesperrt, weil die Migration schmerzhaft ist.</li>
      </ul>

      <h3>Wann ist Asanas Komplexität es wert?</h3>

      <p>
        Asana macht Sinn, wenn:
      </p>

      <ul>
        <li>Du 20+ Projekte gleichzeitig laufen hast und echtes Portfolio-Management brauchst</li>
        <li>Du Abhängigkeiten zwischen Teams hast (Marketing → Design → Engineering → Launch)</li>
        <li>Du einen dedizierten Projektmanager hast, der Asana liebt</li>
        <li>Deine Projekte komplex genug sind, dass ein einfaches Board (Trello) nicht funktioniert</li>
      </ul>

      <p>
        Asana ist Overkill, wenn:
      </p>

      <ul>
        <li>Du &lt;5 gleichzeitige Projekte hast</li>
        <li>Du keine klaren Abhängigkeiten zwischen Teams hast</li>
        <li>Dein Team &lt;10 Personen ist</li>
        <li>Du einfach nur sehen möchtest, „was läuft gerade", ohne komplexe Reports</li>
      </ul>

      <h3>Asana vs Einfachere Alternativen</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Tool</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Setup-Zeit</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Monatliche Wartung</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Komplexität</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Trello</td>
            <td style={{ padding: '12px' }}>1–2 Stunden</td>
            <td style={{ padding: '12px' }}>30 Minuten</td>
            <td style={{ padding: '12px' }}>Niedrig</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Linear</td>
            <td style={{ padding: '12px' }}>3–5 Stunden</td>
            <td style={{ padding: '12px' }}>1 Stunde</td>
            <td style={{ padding: '12px' }}>Mittel (gute Standards)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Notion</td>
            <td style={{ padding: '12px' }}>5–10 Stunden</td>
            <td style={{ padding: '12px' }}>2–3 Stunden</td>
            <td style={{ padding: '12px' }}>Mittel (oft vergessen)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Asana</td>
            <td style={{ padding: '12px' }}>15–25 Stunden</td>
            <td style={{ padding: '12px' }}>4–6 Stunden</td>
            <td style={{ padding: '12px' }}>Hoch</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Monday</td>
            <td style={{ padding: '12px' }}>10–15 Stunden</td>
            <td style={{ padding: '12px' }}>3–4 Stunden</td>
            <td style={{ padding: '12px' }}>Mittel-Hoch</td>
          </tr>
        </tbody>
      </table>

      <h3>Die echte Kostenanalyse</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Kostentyp</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Trello</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Asana</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Unterschied</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Abonnement (10 Personen/Jahr)</td>
            <td style={{ padding: '12px' }}>600 €</td>
            <td style={{ padding: '12px' }}>3.000 €</td>
            <td style={{ padding: '12px' }}>Asana +2.400 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Setup-Kosten (10 Stunden × 50 €)</td>
            <td style={{ padding: '12px' }}>500 €</td>
            <td style={{ padding: '12px' }}>1.000 €</td>
            <td style={{ padding: '12px' }}>Asana +500 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Jährliche Wartung (100 Stunden × 50 €)</td>
            <td style={{ padding: '12px' }}>1.500 €</td>
            <td style={{ padding: '12px' }}>5.000 €</td>
            <td style={{ padding: '12px' }}>Asana +3.500 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Gesamtkosten über 3 Jahre</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>6.900 €</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>24.000 €</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Asana kostet 3,5x mehr</td>
          </tr>
        </tbody>
      </table>

      <h3>Was du tun solltest</h3>

      <p>
        <strong>Wenn du &lt;10 gleichzeitige Projekte hast:</strong> Nutze Trello (50 €/Jahr). Du überlegst zu viel.
      </p>

      <p>
        <strong>Wenn du 10–20 Projekte hast:</strong> Nutze Linear (0 € oder 10 €/Benutzer). Es hat bessere Standards als Asana. Weniger Setup erforderlich.
      </p>

      <p>
        <strong>Wenn du 20+ Projekte und teamübergreifende Abhängigkeiten hast:</strong> Nutze Asana. Akzeptiere die 20-Stunden-Einrichtung und 5-Stunden-/Woche-Wartung. Budgetiere 24K über 3 Jahre.
      </p>

      <p>
        Aber die meisten Teams behaupten, dass sie Asana brauchen, und brauchen wirklich nur Trello mit besserer Disziplin.
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
          Asanas echte Kosten sind 8x das Abonnement: 3.000 €/Jahr werden zu 24.000 €/Jahr, wenn du Setup, Wartung und Training-Overhead zählst.
        </p>
        <p style={{ margin: 0 }}>
          Du brauchst nicht Asanas Komplexität. 95% der Teams hätten mit Trello oder Linear keine Probleme. Fange einfach an. Upgrade zu Asana nur, wenn du in deinem eigenen Wachstum ertrickst. Die meisten Teams tun das nicht. Sie mögen einfach nur Macht kaufen, die sie nicht nutzen.
        </p>
      </div>
    </>
  );
};
