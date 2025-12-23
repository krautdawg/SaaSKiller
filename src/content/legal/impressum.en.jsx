export const impressumEN = {
  title: 'Imprint',
  lastUpdated: '2025-12-23',
  sections: [
    {
      heading: 'Information according to § 5 TMG',
      content: <>
        <p className="font-sans">
          <strong>Tim Neunzig</strong><br />
          SaaSKiller<br />
          Alpenstr. 13<br />
          14542 Werder (Havel)<br />
          Germany
        </p>
      </>
    },
    {
      heading: 'Contact',
      content: <>
        <p className="font-sans">
          Email:{' '}
          <a
            href="mailto:tim@ki-katapult.de"
            className="text-brand-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-1"
          >
            tim@ki-katapult.de
          </a>
        </p>
      </>
    },
    {
      heading: 'Responsible for Content according to § 55 Abs. 2 RStV / § 18 Abs. 2 MStV',
      content: <>
        <p className="font-sans">
          Tim Neunzig<br />
          Alpenstr. 13<br />
          14542 Werder (Havel)
        </p>
      </>
    },
    {
      heading: 'EU Dispute Resolution',
      content: <>
        <p className="font-sans">
          The European Commission provides a platform for online dispute resolution (ODR):{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-1"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          .
        </p>
        <p className="font-sans mt-4">
          You will find our email address above in the imprint.
        </p>
      </>
    },
    {
      heading: 'Consumer Dispute Resolution/Alternative Dispute Resolution',
      content: <>
        <p className="font-sans">
          We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board.
        </p>
      </>
    }
  ]
};
