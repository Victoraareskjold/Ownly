export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6 text-[#1A1A1A] text-sm">
      <section>
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-gray-600">Effective Date: March 2026</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">1. Introduction</h2>
        <p>
          Ownie values your privacy. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          platform.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">
          2. Information We Collect
        </h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Account information:</strong> Name, email, company, and
            account credentials.
          </li>
          <li>
            <strong>Transaction data:</strong> Purchases, sales, and payment
            information via Stripe Connect.
          </li>
          <li>
            <strong>Product usage:</strong> Interaction with Ownie platform,
            including product views and messages.
          </li>
          <li>
            <strong>Communications:</strong> Emails, support requests, and
            messages sent via Ownie.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">
          3. How We Use Information
        </h2>
        <ul className="list-disc list-inside">
          <li>To provide and improve our services.</li>
          <li>To process transactions and manage payouts to sellers.</li>
          <li>
            To communicate with users regarding their accounts and products.
          </li>
          <li>To ensure compliance with legal and regulatory obligations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">4. Sharing Information</h2>
        <p>
          Ownie does not sell or rent your personal information. We may share
          information with:
        </p>
        <ul className="list-disc list-inside">
          <li>
            Service providers necessary to operate the platform (e.g., Stripe
            for payments, hosting providers).
          </li>
          <li>Law enforcement or regulators when required by law.</li>
          <li>
            Other users only to the extent necessary for transactions (e.g.,
            buyer and seller communication).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">5. Data Retention</h2>
        <p>
          We retain personal data as long as necessary to provide our services,
          comply with legal obligations, resolve disputes, and enforce
          agreements.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">6. Security</h2>
        <p>
          Ownie implements reasonable administrative, technical, and physical
          safeguards to protect personal information. However, no method of
          transmission over the internet or electronic storage is completely
          secure.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">7. Your Rights</h2>
        <ul className="list-disc list-inside">
          <li>
            Access, correct, or delete personal information associated with your
            account.
          </li>
          <li>Opt-out of marketing communications at any time.</li>
          <li>
            Request restriction or portability of your data where applicable
            under law.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">8. Cookies and Tracking</h2>
        <p>
          Ownie uses cookies and similar technologies to improve the user
          experience, analyze usage, and personalize content. You can manage
          cookie preferences via your browser.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">9. Third-Party Links</h2>
        <p>
          Our platform may contain links to third-party websites. Ownie is not
          responsible for the privacy practices of these sites.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">
          10. Changes to This Policy
        </h2>
        <p>
          Ownie may update this Privacy Policy from time to time. Updates will
          be communicated via email or posted on the platform. Continued use
          constitutes acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">11. Contact</h2>
        <p>
          For questions regarding this Privacy Policy or your personal data,
          contact us at{" "}
          <a href="mailto:hello@ownie.com" className="text-blue-600 underline">
            hello@ownie.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
