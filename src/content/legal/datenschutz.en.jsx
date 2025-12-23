export const datenschutzEN = {
  title: 'Privacy Policy',
  lastUpdated: '2025-12-23',
  sections: [
    {
      heading: '1. Data Protection at a Glance',
      content: <>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">General Information</h3>
            <p className="font-sans">
              The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to identify you personally.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Data Collection on This Website</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Who is responsible?</strong> Data processing on this website is carried out by the website operator (Tim Neunzig). Contact information can be found in the imprint.
              </li>
              <li>
                <strong>How do we collect your data?</strong> We collect data that you provide to us (e.g., your email address in the quote request form). Other data is automatically collected by our IT systems when you visit the website (e.g., technical data such as browser, operating system).
              </li>
              <li>
                <strong>What do we use your data for?</strong> To provide the website, to create software quotes (leads), and to perform technical analysis of your SaaS inquiries using AI.
              </li>
            </ul>
          </div>
        </div>
      </>
    },
    {
      heading: '2. Hosting',
      content: <>
        <div className="space-y-4">
          <p className="font-sans">
            We host the content of our website with the following provider:
          </p>
          <div>
            <h3 className="font-bold mb-2">Hetzner Cloud</h3>
            <p className="font-sans mb-2">
              The provider is Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen (hereinafter "Hetzner").
            </p>
            <p className="font-sans mb-2">
              <strong>Data Storage:</strong> Our applications and databases run on servers provided by Hetzner in Germany. When you visit our website, Hetzner collects various log files including your IP address.
            </p>
            <p className="font-sans mb-2">
              For details, please refer to Hetzner's privacy policy:{' '}
              <a
                href="https://www.hetzner.com/en/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 rounded px-1"
              >
                https://www.hetzner.com/en/privacy
              </a>
              .
            </p>
            <p className="font-sans mb-2">
              <strong>Legal Basis:</strong> The use of Hetzner is based on Article 6 (1) (f) GDPR (legitimate interest in reliable and secure provision of our online service).
            </p>
            <p className="font-sans">
              <strong>Data Processing Agreement:</strong> We have concluded a data processing agreement (DPA) with the above-mentioned provider.
            </p>
          </div>
        </div>
      </>
    },
    {
      heading: '3. General Information and Mandatory Disclosures',
      content: <>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">Responsible Party</h3>
            <p className="font-sans">
              Tim Neunzig<br />
              Alpenstr. 13<br />
              14542 Werder (Havel)<br />
              Email: tim@ki-katapult.de
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Withdrawal of Your Consent to Data Processing</h3>
            <p className="font-sans">
              Many data processing operations are only possible with your express consent. You can withdraw any consent you have already given at any time. The legality of data processing carried out prior to withdrawal is not affected by the withdrawal.
            </p>
          </div>
        </div>
      </>
    },
    {
      heading: '4. Data Collection on This Website',
      content: <>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">Inquiries via Form (Lead Generation)</h3>
            <p className="font-sans mb-2">
              When you submit inquiries to us via form (e.g., "Get My Sovereign Software Quote"), your details including the email address you provide will be stored by us for the purpose of processing your inquiry, creating a quote, and for follow-up questions. We do not pass this data to third parties without your consent.
            </p>
            <p className="font-sans">
              The processing of this data is based on Article 6 (1) (b) GDPR, as your inquiry is necessary for the performance of pre-contractual measures (quote creation).
            </p>
          </div>
        </div>
      </>
    },
    {
      heading: '5. Plugins and Tools',
      content: <>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">Local Fonts</h3>
            <p className="font-sans">
              This website uses web fonts for uniform font display. These fonts are provided by us and hosted locally on our server. There is <strong>no</strong> connection to Google servers. No data is transmitted to Google Fonts.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">AI Analysis (Perplexity API)</h3>
            <p className="font-sans mb-2">
              We use interfaces to artificial intelligence provided by Perplexity (Perplexity AI) to analyze software tools.
            </p>
            <p className="font-sans mb-2">
              When you enter the name of a software tool in our search box, this term is transmitted to Perplexity's API to retrieve technical information (features, pricing). No personal data is transmitted in this process unless you voluntarily enter it in the search field.
            </p>
            <p className="font-sans">
              The use is in line with our legitimate interest (Article 6 (1) (f) GDPR) to provide you with an automated analysis of software tools.
            </p>
          </div>
        </div>
      </>
    }
  ]
};
