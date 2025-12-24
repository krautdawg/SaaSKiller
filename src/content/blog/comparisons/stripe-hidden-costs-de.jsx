import React from 'react';

export const StripeHiddenCostsComparisonDE = () => {
  return (
    <>
      <h2>Stripes versteckte Kosten: 2,9% + 30¢ wird zu 4,5–5,9% in der Realität</h2>
      <p>
        Stripe ist attraktiv. Die Gebühren scheinen transparent: 2,9% + 30¢ pro Transaktion.
      </p>

      <p>
        Das ist eine Lüge durch Auslassung.
      </p>

      <p>
        Die echten Gebühren sind 4,5–5,9%, wenn du alle Stripe-Services zählst, die du wahrscheinlich brauchst, wenn du Stripe wirklich nutzt.
      </p>

      <h3>Die Basis 2,9% + 30¢ deckt fast nichts ab</h3>

      <p>
        Die 2,9% + 30¢-Gebühr ist für grundlegende Kartenpayments. Das ist es. Alles andere wird zusätzlich abgerechnet.
      </p>

      <p>
        <strong>Stripe Gebühren, die nicht erwähnt werden:</strong>
      </p>

      <ul>
        <li><strong>Internationale Kartenpayments:</strong> +1,5% zusätzlich (wenn du internationale Kunden hast)</li>
        <li><strong>ACH-Transfers (Bankkonten):</strong> 0,80% (+ $0,30), min $1, max $10</li>
        <li><strong>Payout-Gebühren:</strong> 0,25% (min $0,25), wenn du Geld auszahlen möchtest</li>
        <li><strong>Chargeback-Gebühren:</strong> $15 pro Chargeback (nicht „% basiert", aber es summiert sich)</li>
        <li><strong>Failed Payment-Versuche:</strong> Stripe Radar für Betrug: $0,05 pro Anfrage</li>
        <li><strong>Rückerstattungs-Gebühren:</strong> Volle 2,9% + 30¢ Gebühr wird NICHT zurückerstattet</li>
      </ul>

      <h3>Eine echte Beispiel-Rechnung</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Szenario</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Stripe-Kosten</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Echte Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>$10.000 inländische Kartenpayments (nur Basis)</td>
            <td style={{ padding: '12px' }}>$290 + $30 = $320</td>
            <td style={{ padding: '12px' }}>3,2% (nahe bei der Werbung)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>$10.000 Kartenpayments (mit 20% international)</td>
            <td style={{ padding: '12px' }}>$320 + $145 International = $465</td>
            <td style={{ padding: '12px' }}>4,65% (50% höher!)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>$10.000 gemischte Zahlungen (Karten + ACH)</td>
            <td style={{ padding: '12px' }}>$465 + $160 ACH = $625</td>
            <td style={{ padding: '12px' }}>6,25% (mehr als DOPPELT das beworbene Satz!)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>$10.000 mit Chargebacks (2 × $15)</td>
            <td style={{ padding: '12px' }}>$625 + $30 Chargebacks = $655</td>
            <td style={{ padding: '12px' }}>6,55% (fast 3x das beworbene Satz!)</td>
          </tr>
        </tbody>
      </table>

      <p>
        Stripe sagt „2,9%". Aber wenn du international zahlst, Rückerstattungen machst oder Chargebacks hast, ist es 5-6%.
      </p>

      <h3>Die Stripe-Alternativen und ihre echten Kosten</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Anbieter</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Basis-Satz</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Mit allen Gebühren</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Beste für</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Stripe</td>
            <td style={{ padding: '12px' }}>2,9% + $0,30</td>
            <td style={{ padding: '12px' }}>4,5–5,9%</td>
            <td style={{ padding: '12px' }}>SaaS, globale Unternehmen</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Square</td>
            <td style={{ padding: '12px' }}>2,9% + $0,30</td>
            <td style={{ padding: '12px' }}>4,0–4,5%</td>
            <td style={{ padding: '12px' }}>Einzelhandel, POS</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>Paddle</td>
            <td style={{ padding: '12px' }}>5% + $1,00</td>
            <td style={{ padding: '12px' }}>5,5–6,0%</td>
            <td style={{ padding: '12px' }}>SaaS (alles eingebunden)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Adyen</td>
            <td style={{ padding: '12px' }}>Verhandelt (normalerweise 2,5%)</td>
            <td style={{ padding: '12px' }}>3,5–4,5%</td>
            <td style={{ padding: '12px' }}>High-Volume-Unternehmen</td>
          </tr>
        </tbody>
      </table>

      <h3>Was du tun solltest</h3>

      <p>
        <strong>Option 1: Nutze Stripe, aber sei klug darüber.</strong>
      </p>

      <ul>
        <li>Verwende Stripe nur für deine primäre Zahlungsmethode.</li>
        <li>Minimiere die Anzahl der Gebührentypen (Keine ACH, keine internationalen Zahlungen, wenn du kannst).</li>
        <li>Überwache Chargebacks aggressiv.</li>
        <li>Akzeptiere, dass die echten Kosten 4,5–5,9% sind, nicht 2,9%.</li>
      </ul>

      <p>
        <strong>Option 2: Nutze Square, wenn du mehr Einzelhandel bist.</strong>
      </p>

      <ul>
        <li>Square hat bessere POS-Integration.</li>
        <li>Die Gebühren sind ähnlich wie Stripe, aber transparenter.</li>
      </ul>

      <p>
        <strong>Option 3: Verhandle mit Adyen, wenn du großes Volumen hast.</strong>
      </p>

      <ul>
        <li>Adyen ist teurer bei kleinen Volumen, billiger bei großen Volumen.</li>
        <li>Wenn dein monatliches Zahlungsvolumen &gt;100K € ist, verhandle mit Adyen.</li>
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
          Stripe bewirbt 2,9% + 30¢, aber die echten Kosten sind 4,5–5,9% sobald du internationale Zahlungen, Rückerstattungen oder Chargebacks zählst.
        </p>
        <p style={{ margin: 0 }}>
          Stripe ist immer noch gut. Aber vertrau nicht der beworbenen Gebühr. Plan für 5% und verhandel nach oben, wenn dein Volumen groß genug ist.
        </p>
      </div>
    </>
  );
};
