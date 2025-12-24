import React from 'react';

export const GoogleWorkspaceFalseEconomyComparisonDE = () => {
  return (
    <>
      <h2>Google Workspace: Das „billige" Tool, das mehr kostet, als du denkst</h2>
      <p>
        Google Workspace sieht billig aus. 6–18 € pro Benutzer pro Monat. Jeder nutzt bereits Gmail. Du denkst: Wir bekommen das bereits kostenlos über persönliches Gmail, wie viel könnte bezahlter Workspace kosten?
      </p>

      <p>
        Die Antwort: Wesentlich mehr als das Abonnement, wenn du die echten Kosten zählst.
      </p>

      <p>
        Ein 10-köpfiges Team, das 12 €/Benutzer/Monat (1.440 €/Jahr) zahlt, kostet tatsächlich 8.000–12.000 €, wenn du Arbeitszeit-Overhead, Sicherheitsverwaltung und Incident Recovery zählst.
      </p>

      <h3>Was Google Workspace wirklich kostet</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Kostenartikel</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Betrag (10 Personen)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Google Workspace Business Standard (12 €/Benutzer/Monat)</td>
            <td style={{ padding: '12px' }}>1.440 €/Jahr</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Admin-Setup, Training, Migration von kostenlosem Gmail</td>
            <td style={{ padding: '12px' }}>1.000–2.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Datenwiederherstellung / Support-Incidents</td>
            <td style={{ padding: '12px' }}>500–1.000 €/Jahr</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Mitarbeiter-Onboarding (neue Mitarbeiter = Lizenzprobleme = Zeit)</td>
            <td style={{ padding: '12px' }}>500–1.000 €/Jahr</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Sicherheitsverwaltung (Wiederherstellungsschlüssel, 2FA, Passwort-Resets)</td>
            <td style={{ padding: '12px' }}>1–2 Stunden/Monat × 50 € = 600–1.200 €/Jahr</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Besprechungsraum-Verwaltung / Workspace-Buchung</td>
            <td style={{ padding: '12px' }}>300–500 €/Jahr</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Gesamtjahreskosten (Jahr 1)</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>4.340–7.140 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Gesamtjahreskosten (Jahre 2+)</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>3.440–5.440 €</td>
          </tr>
        </tbody>
      </table>

      <p>
        Das ist 3-4x das, was das Abonnement kostet. Aber Google vermarktet diese versteckten Kosten nicht.
      </p>

      <h3>Das echte Problem: Admin Overhead, den du nicht erwartet hast</h3>

      <p>
        Google Workspace sieht einfach aus. In der Praxis ist es nicht.
      </p>

      <p>
        <strong>Onboarding:</strong> Neuer Mitarbeiter kommt. Sie brauchen ein Google Workspace-Konto. Es muss bereitgestellt werden. Aliase einrichten. 2FA aktiviert. Passwort-Wiederherstellungs-E-Mail konfiguriert. Sie brauchen Training zu Best Practices. (1–2 Stunden pro Einstellung)
      </p>

      <p>
        <strong>Offboarding:</strong> Mitarbeiter geht. Du musst seine Drive-Dateien übertragen. Seine Gmail archivieren. Zugriff auf gemeinsame Ressourcen widerrufen. Das ist nicht trivial. (2–3 Stunden pro entlassener Mitarbeiter)
      </p>

      <p>
        <strong>Zugriffskontrolle:</strong> Du brauchst Sicherheitsgruppen für verschiedene Teams. Marketing bekommt gemeinsame Drive-Ordner. Vertrieb bekommt ihre CRM-Integration. Finanzen bekommt ihre Buchhaltungssoftware. Das zu verwalten ist laufend. (1 Stunde/Woche)
      </p>

      <p>
        <strong>Gemeinsame Drive-Chaos:</strong> Jeder hat Zugriff auf alles. Du denkst, du bist organisiert. Zwei Jahre später hast du 100+ gemeinsame Drives, niemand weiß, welche zu nutzen sind, kritische Dateien sind verstreut in persönlichen Drives statt in gemeinsamen. Cleanup-Projekt: 3-5 Tage.
      </p>

      <p>
        <strong>Account-Recovery-Incidents:</strong> Mitarbeiter vergisst Passwort. Account eines Mitarbeiters wird kompromittiert. Jemand sitzt fest ohne Zugriff auf kritische Dateien. 30 Minuten bis 3 Stunden um zu lösen pro Incident. (Passiert 2-3 mal pro Jahr)
      </p>

      <h3>Wenn Google Workspace zum Albtraum wird</h3>

      <ul>
        <li><strong>Mehrere Unternehmens-E-Mails:</strong> Du beginnst mit firstname@company.com. Dann fügst du sales@company.com, info@company.com, support@company.com hinzu. Jede benötigt Verwaltung. Gesamt: 15+ E-Mail-Aliase.</li>
        <li><strong>Integrations-Albträume:</strong> Dein CRM (HubSpot) integriert sich mit Google Workspace. Manchmal funktioniert es nicht. Manchmal synchronisieren sich Daten nicht. Du zahlst für Support zum Debuggen.</li>
        <li><strong>Compliance-Anforderungen:</strong> Du musst E-Mail-Archive beibehalten. Du brauchst Audit-Logs. GDPR-Compliance. Das sind keine kostenlosen Funktionen in Workspace.</li>
        <li><strong>Migrations-Kosten:</strong> Du möchtest Google Workspace verlassen (weil es zu kompliziert ist). Alle deine Drive-Dateien exportieren, Gmail-Archive, Kalender-Verlauf. Das ist Wochen Arbeit.</li>
      </ul>

      <h3>Der Vergleich: Google Workspace vs Alternativen</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Anbieter</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Preis/Benutzer/Monat</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Was du bekommst</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Versteckter Overhead</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Google Workspace</td>
            <td style={{ padding: '12px' }}>12 €</td>
            <td style={{ padding: '12px' }}>Gmail, Drive, Docs, Sheets, Meet</td>
            <td style={{ padding: '12px' }}>Hoch (Admin-Zeit, Integrationen)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Microsoft 365 Business</td>
            <td style={{ padding: '12px' }}>12,50 €</td>
            <td style={{ padding: '12px' }}>Outlook, OneDrive, Teams, Office</td>
            <td style={{ padding: '12px' }}>Hoch (ähnlich wie Workspace)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Proton Mail</td>
            <td style={{ padding: '12px' }}>4,99 €</td>
            <td style={{ padding: '12px' }}>Verschlüsselte E-Mail, Kalender, Speicher</td>
            <td style={{ padding: '12px' }}>Niedrig (keine Integrationen, einfacher)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Kostenlos Gmail + separate Tools</td>
            <td style={{ padding: '12px' }}>0 €</td>
            <td style={{ padding: '12px' }}>Gmail (kostenlos), Notion (10 €/Monat), Cal.com (0 €)</td>
            <td style={{ padding: '12px' }}>Mittel (Tool-Fragmentierung)</td>
          </tr>
        </tbody>
      </table>

      <h3>Die ehrliche Einschätzung</h3>

      <p>
        Für 10 Personen ist Google Workspace etwa 1.500 €/Jahr wert. Der Admin-Overhead (wenn du deine eigene Zeit nicht zählst) ist minimal.
      </p>

      <p>
        Aber wenn du DEINE Zeit zählst:
      </p>

      <ul>
        <li>10 Stunden pro Jahr auf Onboarding / Offboarding neuer Mitarbeiter = 500 €</li>
        <li>1 Stunde pro Woche Zugriff und gemeinsame Drives verwalten = 2.600 €/Jahr</li>
        <li>4 Stunden pro Jahr für Account-Recovery-Incidents = 200 €</li>
      </ul>

      <p>
        Du bist jetzt bei 3.800 €/Jahr nur für deine Zeit. Plus Workspace-Abonnement = 5.300 €. Das ist teuer.
      </p>

      <h3>Was du tun solltest</h3>

      <ul>
        <li><strong>Wenn du klein bist (&lt;5 Personen):</strong> Nutze kostenlos Gmail + Notion + Cal.com. Kostenlos. Reassess in 2 Jahren.</li>
        <li><strong>Wenn du 5-10 Personen bist:</strong> Nutze Google Workspace Starter (6 €/Benutzer/Monat). Minimiere Admin-Komplexität.</li>
        <li><strong>Wenn du 10+ Personen bist:</strong> Wähle Google Workspace oder Microsoft 365. Beide kosten ähnlich. Google ist einfacher für Startups, Microsoft integriert sich besser mit Enterprise-Tools.</li>
      </ul>

      <p>
        NUTZE NICHT zu viel Google Workspace. Richte NICHT 15 verschiedene gemeinsame Drives ein. Mach das nicht zu deinem Dateiverwaltungssystem. Nutze es für E-Mail und Kalender. Nutze Notion oder OneDrive für wichtige Dateien. Halte es einfach.
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
          Google Workspace ist nicht so billig, wie es aussieht. Wenn du Admin-Zeit, Onboarding, Sicherheitsverwaltung und Incident Recovery zählst,
          kostet es 3.000–6.000 € pro Jahr für ein 10-köpfiges Team. Das ist 3-4x das Abonnement.
        </p>
        <p style={{ margin: 0 }}>
          Ist das es wert? Vielleicht, wenn du professionelle E-Mail und zentrale Dateiverwaltung möchtest. Aber nimm nicht an, dass es kostenlos ist.
          Wenn du Bootstrapped bist, nutze kostenlos Gmail und Notion. Du sparst 5.000 € und hast weniger Sachen zum Verwalten.
        </p>
      </div>
    </>
  );
};
