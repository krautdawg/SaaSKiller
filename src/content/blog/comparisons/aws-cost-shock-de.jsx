import React from 'react';

export const AWSCostShockComparisonDE = () => {
  return (
    <>
      <h2>AWS-Kostensch​ock: Wie deine 100 €/Monat-Rechnung zu 10.000 €/Monat wird</h2>
      <p>
        Fast jedes Startup nutzt AWS. Es beginnt unauffällig: eine kleine EC2-Instanz, eine Datenbank, etwas S3-Speicher. Deine erste Monatsrechnung: 50 €.
      </p>

      <p>
        Du denkst: großartig, wir können auf AWS skalieren. Wir zahlst nur für das, was wir nutzen.
      </p>

      <p>
        Zwei Jahre später öffnest du eine AWS-Rechnung und siehst 8.000 € für den Monat.
      </p>

      <p>
        Du hast keine Ahnung, wo diese Rechnung herkommt. Niemand wollte 8.000 € ausgeben. Es stieg stillschweigend über Monate hinweg an, wegen ignorierten Ressourcen-Creep, falsch konfigurierter Auto-Scaling und verlassener Services im Hintergrund.
      </p>

      <h3>Wie AWS-Rechnungen explodieren (Echte Beispiele)</h3>

      <p>
        <strong>Szenario 1: Datenbank-Backup-Explosion</strong>
      </p>

      <p>
        Du richtst automatische Datenbank-Backups ein. Sie laufen jede Stunde. Jedes Backup ist 50GB. Du behältst sie 30 Tage.
      </p>

      <p>
        Das sind 50GB × 24 Backups/Tag × 30 Tage = 36.000GB gespeichert = 36TB = 800 €/Monat nur für S3-Speicher. Du hast es nicht gewusst. Es passierte einfach.
      </p>

      <p>
        <strong>Szenario 2: Datenübertragungskosten</strong>
      </p>

      <p>
        Du hostest deine App in us-east-1. Deine Datenbank in us-west-2. AWS berechnet 0,02 € pro GB für Datentransfer zwischen Regionen. Deine App überträgt 10GB pro Tag.
      </p>

      <p>
        Das sind 10GB × 30 Tage × 0,02 € = 6 €/Tag = 180 €/Monat. Mal drei (deine App, dein Cache, deine Backups) = 500+ € pro Monat nur für Inter-Region-Traffic.
      </p>

      <p>
        <strong>Szenario 3: NAT-Gateway-Kosten</strong>
      </p>

      <p>
        Dein privates Subnetz muss das Internet erreichen (um externe APIs zu rufen). Du nutzt ein NAT-Gateway. AWS berechnet 0,045 € pro Stunde (32 €/Monat) plus 0,045 € pro GB verarbeitet.
      </p>

      <p>
        Deine App verarbeitet 100GB/Monat durch das NAT-Gateway. Das sind 32 € + (100 × 0,045) = 32 € + 4,50 € = 36,50 €/Monat. Scheint allein okay. Aber multipliziert über 10 Services, 10 Regionen = 3.650+ € pro Monat.
      </p>

      <p>
        <strong>Szenario 4: Die Load-Balancer-Falle</strong>
      </p>

      <p>
        Du richtst einen Load Balancer ein, weil „wir brauchen High Availability". Load Balancer kosten 16,43 €/Monat pro Load Balancer plus 0,006 € pro LB Capacity Unit (LCU).
      </p>

      <p>
        Du hast 5 Load Balancer über Services = 82 €/Monat. Plus LCU-Gebühren für Traffic = 50 €/Monat. Scheint okay. Aber jetzt spinnt jeder Engineer neue Load Balancer zum Testen. Du hast 20 Load Balancer laufen. Kosten: 400+ € pro Monat für etwas, das du kaum nutzt.
      </p>

      <h3>Die echte AWS-Kostenaufschlüsselung (Für ein typisches Startup)</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Service</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Erwartet</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Tatsächlich (Mit Verschwendung)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>EC2 (Berechnung)</td>
            <td style={{ padding: '12px' }}>500 €/Monat</td>
            <td style={{ padding: '12px' }}>2.000 € (überausgestattete Instanzen, die laufen bleiben)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>RDS (Datenbank)</td>
            <td style={{ padding: '12px' }}>300 €/Monat</td>
            <td style={{ padding: '12px' }}>1.200 € (Test-Datenbanken nie gelöscht)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>S3 (Speicher)</td>
            <td style={{ padding: '12px' }}>100 €/Monat</td>
            <td style={{ padding: '12px' }}>800 € (Backup-Vermehrung, unoptimierte Speicherklassen)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Datenübertragung</td>
            <td style={{ padding: '12px' }}>100 €/Monat</td>
            <td style={{ padding: '12px' }}>1.500 € (Inter-Region-Traffic, unoptimierte Routen)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>NAT-Gateways</td>
            <td style={{ padding: '12px' }}>0 € (wenn du richtig planst)</td>
            <td style={{ padding: '12px' }}>400–800 € (falsch konfigurierte Subnets)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Load Balancer</td>
            <td style={{ padding: '12px' }}>100 €/Monat</td>
            <td style={{ padding: '12px' }}>400 € (verlassene Test-Load-Balancer)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>CloudFront (CDN)</td>
            <td style={{ padding: '12px' }}>200 €/Monat</td>
            <td style={{ padding: '12px' }}>1.000 € (Datentransfer zu CDN nicht optimiert)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Erwarteter Gesamt</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>1.300 €/Monat</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>8.100 €/Monat</td>
          </tr>
        </tbody>
      </table>

      <p>
        Du hast 1.300 €/Monat geplant. Du zahlst 8.100 €. Das ist 6x.
      </p>

      <h3>Warum AWS-Kosten spiralen (Das Geschäftsmodell)</h3>

      <p>
        AWS's Geschäftsmodell hängt davon ab, dass Kunden ihre Rechnungen nicht verstehen.
      </p>

      <ul>
        <li><strong>Preise sind undurchsichtig.</strong> EC2 hat 500+ Instanztypen. Jeder hat unterschiedliche Preise in verschiedenen Regionen. Die meisten Unternehmen können nicht optimieren, weil sie nicht wissen, was sie zahlen.</li>
        <li><strong>Jeder Service hat versteckte Kosten.</strong> Die EC2-Kosten sind die Schlagzeile. Aber Datenübertragung, NAT-Gateways, Backup-Speicher – diese sind separate Linienpositionen, die sich summieren.</li>
        <li><strong>Standard-Konfigurationen sind verschwenderisch.</strong> AWS's Standard-Setup ist nicht kostenoptimiert. Es ist für Verfügbarkeit und Einfachheit optimiert. Das kostet Geld.</li>
        <li><strong>Es gibt keine Kostendisziplin-Durchsetzung.</strong> Engineers spinnen Ressourcen ohne Kostenüberlegungen. Die Rechnung kommt 30 Tage später, wenn es zu spät ist.</li>
      </ul>

      <h3>Was du tun solltest</h3>

      <p>
        <strong>Option 1: Nutze AWS, aber sei diszipliniert</strong>
      </p>

      <ul>
        <li>Richte CloudWatch-Abrechnungswarnungen ein (1.000 €/Monat-Schwelle, eskaliere zum CTO)</li>
        <li>Nutze AWS Cost Explorer, um zu sehen, was Geld kostet</li>
        <li>Reserviere Instanzen für vorhersehbare Workloads (30% Rabatt)</li>
        <li>Skaliere aggressiv nach unten (behalte keine Instanzen 24/7, wenn nicht nötig)</li>
        <li>Bereinige Test-Ressourcen monatlich</li>
      </ul>

      <p>
        <strong>Option 2: Nutze eine einfachere, billigere Plattform</strong>
      </p>

      <ul>
        <li><strong>Heroku:</strong> 50–500 €/Monat. Höhere Unit-Kosten, aber viel einfacher. Keine überraschenden Rechnungen. Gut für &lt;5K €/Monat Traffic.</li>
        <li><strong>DigitalOcean:</strong> 5–100 €/Monat. Einfacher als AWS, vorhersehbare Preise. Gut für Startups vor Series A.</li>
        <li><strong>Railway oder Render:</strong> Moderne Alternativen. Pay-as-you-go, aber einfachere Abrechnung als AWS.</li>
        <li><strong>Hetzner oder Linode:</strong> Feste Preise. Keine Überraschungen. Weniger Integrationen als AWS, aber viel billiger.</li>
      </ul>

      <p>
        <strong>Option 3: Hybrid-Ansatz</strong>
      </p>

      <ul>
        <li>Nutze Heroku oder Railway für deine Haupt-App (500 € pro Monat vorhersehbar)</li>
        <li>Nutze AWS nur für spezifische Anforderungen (Big Data, Machine Learning, komplexe Integrationen)</li>
        <li>Setz AWS-Ausgaben mit harten Limits auf 1.000 €/Monat</li>
      </ul>

      <h3>Der Kostenvergleich</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Plattform</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Typische Kosten</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Vorhersagbarkeit</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Wann zu nutzen</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>AWS (diszipliniert)</td>
            <td style={{ padding: '12px' }}>2.000–5.000 €/Monat</td>
            <td style={{ padding: '12px' }}>Unvorhersehbar ohne Verwaltung</td>
            <td style={{ padding: '12px' }}>Series B+ oder komplexe Infrastruktur</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Heroku</td>
            <td style={{ padding: '12px' }}>200–2.000 €/Monat</td>
            <td style={{ padding: '12px' }}>Sehr vorhersehbar</td>
            <td style={{ padding: '12px' }}>Startups, &lt;10 Engineers</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>DigitalOcean</td>
            <td style={{ padding: '12px' }}>100–500 €/Monat</td>
            <td style={{ padding: '12px' }}>Sehr vorhersehbar</td>
            <td style={{ padding: '12px' }}>Nebenprojekte, Bootstrap-Startups</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Linode / Hetzner</td>
            <td style={{ padding: '12px' }}>50–300 €/Monat</td>
            <td style={{ padding: '12px' }}>Extrem vorhersehbar</td>
            <td style={{ padding: '12px' }}>Kleine Teams, feste Kapazitätsanforderungen</td>
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
          AWS-Rechnungen wachsen 10x ohne Absicht. Backup-Speicher, Datenübertragung, NAT-Gateways, verlassene Ressourcen – Kosten spiralen stillschweigend auf.
        </p>
        <p style={{ margin: 0 }}>
          Für die meisten Startups vor Series A: nutze Heroku oder DigitalOcean. Feste Kosten. Keine Überraschungen. Wechsel zu AWS nur, wenn du Engineers hast, die es optimieren.
          Lass AWS dich nicht davon überzeugen, dass „zahlen für das, was du nutzt" billiger ist. Für dich ist es 5-10x teurer als einfachere Alternativen.
        </p>
      </div>
    </>
  );
};
