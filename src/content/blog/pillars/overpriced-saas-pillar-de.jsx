import React from 'react';
import { Link } from 'react-router-dom';

export const OverpricedSaasPillarDE = () => {
  return (
    <>
      <h2>Warum überteuerte SaaS-Tools kleine Geschäftsmargen zerstören</h2>
      <p>
        Du bist nicht geizig. Du bist nicht schlecht im Geschäft. Du zahlst einfach zu viel für Software.
      </p>

      <p>
        Das durchschnittliche kleine Unternehmen (5–50 Personen) gibt <strong>25.000–75.000 € pro Jahr für SaaS-Tools aus</strong>.
        Die meisten fragen je, ob sie einen fairen Preis zahlen.
      </p>

      <p>
        Spoiler Alert: Das tun sie nicht.
      </p>

      <h3>Warum Enterprise-Preisgestaltung für kleine Teams keinen Sinn ergibt</h3>
      <p>
        Die SaaS-Preisgestaltung ist für kleine Unternehmen kaputt. Hier ist warum:
      </p>

      <h4>1. Die Preisgestaltung ist für Enterprises gebaut (Nicht für dich)</h4>
      <p>
        Salesforce kostet 165–330 € pro Benutzer pro Monat für KMU. Für Enterprises kann es 500+ € pro Benutzer sein.
        Aber die Software ist im Grunde die gleiche.
      </p>

      <p>
        Warum der große Unterschied?
      </p>

      <p>
        Weil Enterprise-Kunden Budgets dafür haben. Sie können verhandeln. Sie haben Beschaffungsteams.
        Für ein kleines Unternehmen ist der Preis „Nimm es oder lass es".
      </p>

      <h4>2. Preis-Tiers erzwingen dich in Premium-Features, die du nicht brauchst</h4>
      <p>
        Die meisten SaaS-Plattformen nutzen ein einfaches Preismodell:
      </p>

      <ul>
        <li><strong>Starter:</strong> 0–50 €/Monat (fehlen kritische Features)</li>
        <li><strong>Professional:</strong> 150–300 €/Monat (okay für die meisten, aber teuer)</li>
        <li><strong>Enterprise:</strong> 500–2.000 €/Monat (viel zu viel für kleine Teams)</li>
      </ul>

      <p>
        Der „Starter"-Tier ist absichtlich lahm gemacht. Er ist konzipiert, um dich zum Upgrade zu motivieren.
        Also springst du zu „Professional"—das hat Features, die du nie nutzen wirst.
      </p>

      <h4>3. Du zahlst für Skalierbarkeit, die du nicht hast</h4>
      <p>
        SaaS-Preisgestaltung basiert oft auf „was du brauchst" statt auf „was du tatsächlich nutzt."
      </p>

      <ul>
        <li>HubSpot berechnet pro Kontakt, der in deiner Datenbank gespeichert ist</li>
        <li>Slack berechnet pro aktivem Benutzer</li>
        <li>Zapier berechnet pro Task-Automatisierung</li>
        <li>AWS berechnet pro Datenübertragung, Speicher, Berechnung</li>
      </ul>

      <p>
        Das klingt theoretisch fair. In der Praxis? Du zahlst für Kapazität, die du nicht nutzt.
      </p>

      <h3>Die Mathematik: Warum SaaS teuer für kleine Teams ist</h3>
      <p>
        Hier ist ein echtes Beispiel: Eine 10-köpfige Marketing-Agentur braucht ein einfaches CRM, E-Mail-Marketing und Projektmanagement.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Tool</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Tier</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Monatliche Kosten</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Jährliche Kosten</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>HubSpot CRM</td>
            <td style={{ padding: '12px' }}>Professional (10 Benutzer)</td>
            <td style={{ padding: '12px' }}>3.200 €</td>
            <td style={{ padding: '12px' }}>38.400 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Mailchimp E-Mail</td>
            <td style={{ padding: '12px' }}>Standard</td>
            <td style={{ padding: '12px' }}>500 €</td>
            <td style={{ padding: '12px' }}>6.000 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Monday.com Projektmanagement</td>
            <td style={{ padding: '12px' }}>Pro (10 Benutzer)</td>
            <td style={{ padding: '12px' }}>1.200 €</td>
            <td style={{ padding: '12px' }}>14.400 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Slack</td>
            <td style={{ padding: '12px' }}>Pro (10 Benutzer)</td>
            <td style={{ padding: '12px' }}>1.250 €</td>
            <td style={{ padding: '12px' }}>15.000 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>Insgesamt</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>—</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>6.150 €</td>
            <td style={{ padding: '12px', fontWeight: 'bold' }}>73.800 €</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>73.800 € jährlich für 10 Personen. Das sind 7.380 € pro Person pro Jahr.</strong>
      </p>

      <p>
        Zum Vergleich: Das sind etwa 2% der jährlichen Lohnkosten für ein kleines Unternehmen mit 50 €/Stunde Gehalt.
        Für ein kämpfendes Startup? Es sind 5–10% der Betriebskosten.
      </p>

      <h3>Das versteckte Problem: „Billige" Abonnements summieren sich</h3>
      <p>
        Die meisten kleinen Unternehmen denken nicht an 50–200 €/Monat Tools als teuer. Aber sie summieren sich schnell.
      </p>

      <p>
        Ein 10-köpfiges Team könnte haben:
      </p>

      <ul>
        <li>CRM: 3.200 €/Monat</li>
        <li>E-Mail-Marketing: 500 €/Monat</li>
        <li>Projektmanagement: 1.200 €/Monat</li>
        <li>Kommunikation (Slack): 1.250 €/Monat</li>
        <li>Analytics-Tool: 300 €/Monat</li>
        <li>Design-Tool (Figma): 240 €/Monat</li>
        <li>Formular-Tool (Typeform): 40 €/Monat</li>
        <li>Video-Tool (Loom): 50 €/Monat</li>
        <li>Cloud-Speicher: 200 €/Monat</li>
        <li>Kalender/Planung: 150 €/Monat</li>
        <li>Doc-Zusammenarbeit: 100 €/Monat</li>
        <li>Sicherheit/VPN: 100 €/Monat</li>
      </ul>

      <p>
        <strong>Insgesamt: 7.330 €/Monat = 87.960 € pro Jahr</strong>
      </p>

      <p>
        Kein einzelnes dieser Tools scheint teuer. Zusammen? Sie bluten dein Geschäft aus.
      </p>

      <h3>Wo SaaS-Preisgestaltung am meisten kaputt ist</h3>

      <h4>CRM & Marketing-Automatisierung (Schlimmster Täter)</h4>
      <p>
        <strong>Salesforce Professional: 330 €/Benutzer/Monat</strong>
      </p>

      <p>
        Für ein 5-köpfiges Team sind das 19.800 €/Jahr. Viele kleine Unternehmen brauchen nicht die Hälfte von dem, das Salesforce anbietet.
        Aber Switching Costs sind hoch, also bleiben sie.
      </p>

      <p>
        <strong>Bessere Alternativen für kleine Teams:</strong>
      </p>
      <ul>
        <li>HubSpot CRM (Kostenlos oder 50–150 €/Monat)</li>
        <li>Pipedrive (59–249 €/Monat für ganzes Team)</li>
        <li>Freshsales (29–99 €/Monat pro Benutzer)</li>
      </ul>

      <h4>Projektmanagement (Schleichende Preiserhöhungen)</h4>
      <p>
        <strong>Monday.com Pro: 120 €/Benutzer/Monat</strong>
      </p>

      <p>
        Ein 10-köpfiges Team zahlt 1.200 €/Monat (14.400 €/Jahr) für Projektmanagement.
        Das ist wahnsinnig, wenn Alternativen wie Asana, ClickUp oder Notion 1/3 so viel kosten.
      </p>

      <h4>Kommunikation & Zusammenarbeit (Premium-Features, die du nicht brauchst)</h4>
      <p>
        <strong>Slack Pro: 12,50 €/Benutzer/Monat</strong>
      </p>

      <p>
        Für ein 10-köpfiges Team sind das 1.500 €/Jahr. Ja, Slack ist großartig. Aber Microsoft Teams ist kostenlos. Discord ist kostenlos.
        Mattermost ist kostenlos. Du zahlst für Branding und Politur, nicht Funktionalität.
      </p>

      <h3>Warum die Preisgestaltung für kleine Unternehmen unfair ist</h3>

      <h4>Grund 1: Keine Verhandlungskraft</h4>
      <p>
        Enterprise-Kunden verhandeln SaaS-Deals. Sie zahlen oft 50–70% weniger als Listenpreis.
        Kleine Unternehmen zahlen volle Preise mit keinem Raum zu verhandeln.
      </p>

      <h4>Grund 2: Vendor Lock-In</h4>
      <p>
        Sobald du in einem SaaS-Ökosystem steckst (Daten, Integrationen, Team-Training), ist ein Wechsel schmerzhaft.
        Anbieter wissen das und erhöhen Preise. Es ist billiger, als neue Kunden zu akquirieren.
      </p>

      <h4>Grund 3: „Kostenlos"-Preis-Falle</h4>
      <p>
        Viele SaaS-Unternehmen bieten kostenlose Tiers mit Features an, die gerade genug lahm gemacht sind, um dich zum Upgrade zu motivieren.
        Es ist nicht wirklich kostenlos—es ist ein Loss Leader, konzipiert, um später mehr Wert zu extrahieren.
      </p>

      <h4>Grund 4: Bundling (Erzwingung, Dinge zu kaufen, die du nicht brauchst)</h4>
      <p>
        Statt dir einzelne Features zu ermöglichen, bündeln SaaS-Unternehmen sie in Tiers.
        Du willst Feature A. Aber es ist nur im Tier, das auch Features B, C, D, E enthält, die du nie nutzen wirst.
      </p>

      <h3>Wie man aufhört, zu viel für SaaS zu zahlen</h3>

      <h4>Strategie 1: Unbenutzbare Abonnements rücksichtslos schneiden</h4>
      <p>
        Gehe jetzt durch deine SaaS-Liste. Für jedes Tool:
      </p>

      <ul>
        <li>Wann wurde es zuletzt genutzt?</li>
        <li>Wer nutzt es?</li>
        <li>Welches Problem löst es?</li>
        <li>Gibt es eine billigere Alternative?</li>
      </ul>

      <p>
        <strong>Maßnahme:</strong> Schneide oder downgrades alles, das nicht wöchentlich genutzt wird. Du wirst wahrscheinlich sofort 20–30% sparen.
      </p>

      <h4>Strategie 2: Aggressiv downgraden</h4>
      <p>
        Du bist wahrscheinlich auf einem Plan-Tier höher als du brauchst.
      </p>

      <p>
        <strong>Beispiele:</strong>
      </p>

      <ul>
        <li>Auf Salesforce Enterprise? Wahrscheinlich brauchst du das nicht. Downgrade zu Professional und spare 10.000+ €/Jahr.</li>
        <li>Auf HubSpot Professional? Überprüfe, ob der kostenlose Tier das hat, was du brauchst. Spare 3.200+ €/Jahr.</li>
        <li>Auf Monday.com Pro? Versuche ClickUp. Gleiche Features, 1/3 des Preises.</li>
      </ul>

      <h4>Strategie 3: Rücksichtslos Toolkonsolidieren</h4>
      <p>
        Statt 5 Tools zu nutzen, die sich überlappen, wähle 1 und nutze es gut.
      </p>

      <p>
        <strong>Konsolidierungs-Beispiele:</strong>
      </p>

      <ul>
        <li>Slack + Asana + Google Docs → Notion (alles an einem Ort)</li>
        <li>Salesforce + HubSpot + Pipedrive → Wähle eine und engagiere dich</li>
        <li>Typeform + Google Forms + Jotform → Nutze einfach eine</li>
      </ul>

      <h4>Strategie 4: Wechsel zu Open-Source oder kostenlose Alternativen</h4>
      <p>
        Manche Probleme können mit kostenlosen Tools gelöst werden:
      </p>

      <ul>
        <li>Kommunikation: Discord, Mattermost oder Rocket.Chat (kostenlose Alternativen zu Slack)</li>
        <li>Projektmanagement: Plane, OpenProject oder Taiga (kostenlose Alternativen zu Monday)</li>
        <li>CRM: HubSpot Kostenlos oder Odoo (kostenlose Alternativen zu Salesforce)</li>
        <li>E-Mail: Mautic oder Sendy (billige Alternativen zu Mailchimp)</li>
        <li>Analytics: Plausible oder Fathom (billige Alternativen zu Google Analytics)</li>
      </ul>

      <h4>Strategie 5: Verhandle deine Verträge (Ja, wirklich)</h4>
      <p>
        Die meisten kleinen Unternehmen wissen nicht, dass sie SaaS-Preisgestaltung verhandeln können. Viele Anbieter werden:
      </p>

      <ul>
        <li>Einen Rabatt geben, wenn du dich auf jährliche Abrechnung einigst</li>
        <li>Services zu einem reduzierten Preis bündeln</li>
        <li>Preis senken, wenn du einen längeren Vertrag hast</li>
      </ul>

      <p>
        <strong>Taktik:</strong> Sende eine E-Mail an das Verkaufsteam deines Anbieters und sag: „Wir lieben dein Produkt, aber erwägen wir einen Wechsel um Geld zu sparen. Würdest du bereit sein zu verhandeln?"
      </p>

      <p>
        Oft werden sie 10–40% Rabatt nur geben, um dein Geschäft zu behalten.
      </p>

      <h3>Die Formel: Was du wirklich zahlen solltest</h3>
      <p>
        Hier ist ein angemessenes SaaS-Budget für kleine Teams:
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Team-Größe</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Angemessenes Budget</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Pro Person/Monat</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>1–5 Personen</td>
            <td style={{ padding: '12px' }}>200–500 €/Monat</td>
            <td style={{ padding: '12px' }}>40–100 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>5–15 Personen</td>
            <td style={{ padding: '12px' }}>500–1.500 €/Monat</td>
            <td style={{ padding: '12px' }}>33–100 €</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>15–50 Personen</td>
            <td style={{ padding: '12px' }}>1.500–4.000 €/Monat</td>
            <td style={{ padding: '12px' }}>30–80 €</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>50+ Personen</td>
            <td style={{ padding: '12px' }}>4.000–10.000 €/Monat</td>
            <td style={{ padding: '12px' }}>20–50 €</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Wenn du mehr als das zahlst, wirst du überberechnet.</strong>
      </p>

      <h3>Echtes Beispiel: SaaS-Kosten um 50% schneiden</h3>
      <p>
        Eine 12-köpfige Digital-Agentur zahlte 8.400 €/Monat für SaaS-Tools. Sie prüften und fanden:
      </p>

      <ul>
        <li>Salesforce (3.960 €/Monat): Könnte zu HubSpot Pro (400 €/Monat) downgraden → Spare 3.560 €/Monat</li>
        <li>Monday.com (1.440 €/Monat): Könnte zu Asana (750 €/Monat) wechseln → Spare 690 €/Monat</li>
        <li>Slack (1.500 €/Monat): Zu teuer. Wechsel zu Discord + Twist (Kostenlos + 200 €/Monat) → Spare 1.300 €/Monat</li>
        <li>Mehrere Analytics-Tools (800 €/Monat): Konsolidiere zu einem → Spare 600 €/Monat</li>
        <li>Unbenutzbare Abonnements (700 €/Monat): Stornieren → Spare 700 €/Monat</li>
      </ul>

      <p>
        <strong>Neue Gesamtsumme: 4.200 €/Monat = 50.400 €/Jahr</strong>
      </p>

      <p>
        <strong>Einsparungen: 4.200 €/Monat = 50.400 €/Jahr (50% Reduktion)</strong>
      </p>

      <div style={{
        padding: '24px',
        backgroundColor: '#f0f9ff',
        borderLeft: '4px solid #0066cc',
        margin: '32px 0',
        borderRadius: '4px'
      }}>
        <p style={{ margin: 0, marginBottom: '16px', fontWeight: 'bold', fontSize: '1.2em' }}>
          Bereit, deine SaaS-Ausgaben halbieren?
        </p>
        <p style={{ margin: 0, marginBottom: '16px' }}>
          Lass uns deinen aktuellen SaaS-Stack analysieren. Wir zeigen dir genau, welche Tools zu schneiden, welche zu ersetzen und wie viel du sparen wirst.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            backgroundColor: '#cc0000',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginBottom: '12px'
          }}
        >
          Hol dir deine Sparschätzung →
        </Link>
      </div>

      <h3>Abschließende Gedanken</h3>
      <p>
        Du bist nicht geizig dafür, SaaS-Preisgestaltung zu hinterfragen. Du bist smart.
      </p>

      <p>
        Die Realität ist: <strong>Die meisten kleinen Unternehmen overpayern massiv für Software</strong>.
        Nicht weil sie schlecht im Geschäft sind, aber weil SaaS-Preisgestaltung konzipiert ist, um maximalen Wert von dir zu extrahieren.
      </p>

      <p>
        <strong>Aber du hast Optionen.</strong> Durch rücksichtslose Audits, Konsolidierung und Ersatz überteuerter Tools,
        kannst du deine SaaS-Ausgaben um 30–50% reduzieren, während du die Produktivität verbesserst.
      </p>

      <p>
        Das ist echtes Geld, das zurück in Einstellungen, Marketing oder deinen Produktaufbau gehen kann.
      </p>
    </>
  );
};
