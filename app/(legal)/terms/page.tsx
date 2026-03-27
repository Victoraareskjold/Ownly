export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6 text-[#1A1A1A] text-sm">
      <section>
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-gray-600">Effective Date: March 2026</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">1. Introduction</h2>
        <p>
          Ownie is a curated marketplace where developers and small teams can
          sell complete, self-hosted alternatives to popular SaaS products. By
          using Ownie, you agree to these Terms of Service.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">2. Definitions</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Buyer:</strong> An individual or business purchasing
            products on Ownie.
          </li>
          <li>
            <strong>Seller:</strong> An individual or team listing products for
            sale on Ownie.
          </li>
          <li>
            <strong>Product:</strong> A complete self-hosted software solution,
            including source code, documentation, and any additional items such
            as setup assistance or updates.
          </li>
          <li>
            <strong>Ownie Fee:</strong> Commission of 3% per sale via Stripe
            Connect.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">3. Accounts</h2>
        <p>
          Buyers and sellers must create an account to use Ownie. You are
          responsible for maintaining the security of your account and providing
          accurate information if listing products.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">4. Purchasing Products</h2>
        <p>
          All purchases on Ownie are one-time payments. Buyers gain access to
          the product&apos;s source code, documentation, and any included setup
          or updates. Buyers own the code and data after purchase.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">5. Seller Obligations</h2>
        <ul className="list-disc list-inside">
          <li>Products must solve a complete, named use case.</li>
          <li>
            Products must include documentation (Docker, Vercel, or equivalent).
          </li>
          <li>
            Sellers must respond to reported bugs or issues within 14 days of
            purchase; failure to do so grants buyers the right to a full refund.
          </li>
          <li>
            Sellers must specify technical stack and hosting requirements.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">
          6. Ownie Responsibilities
        </h2>
        <p>
          Ownie verifies sellers and products for quality, handles payments,
          commissions, and distribution. Ownie may deactivate products or seller
          accounts for violations of these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">
          7. Availability & Updates
        </h2>
        <p>
          Products may include updates and setup assistance if offered by the
          seller. Ownie does not guarantee continued product updates beyond what
          the seller provides.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">8. Fees & Payment</h2>
        <p>
          Payments are processed via Stripe Connect. Ownie collects a 3%
          commission per sale. Sellers receive the remaining balance.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">
          9. Limitation of Liability
        </h2>
        <p>
          Ownie is not responsible for the buyer&apos;s use of products after
          purchase and disclaims liability for direct or indirect losses related
          to product defects.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">10. Termination</h2>
        <p>
          Buyers and sellers may terminate their accounts at any time. Ownie may
          suspend or terminate accounts for violations of these Terms or illegal
          activity.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">11. Changes to Terms</h2>
        <p>
          Ownie may update these Terms. Changes will be communicated via email
          or posted on the platform. Continued use constitutes acceptance of the
          updated Terms.
        </p>
      </section>
    </div>
  );
}
