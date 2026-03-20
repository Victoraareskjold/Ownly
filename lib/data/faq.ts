export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const FAQ: FaqSection[] = [
  {
    title: "For buyers",
    items: [
      {
        question: "How do I get access to the code after purchase?",
        answer:
          "Immediately after payment you'll receive access to the seller's repository or download link. You can also find all your purchases in your dashboard.",
      },
      {
        question: "Are products reviewed before going live?",
        answer:
          "Yes. Every product is manually reviewed by the Ownie team before it's listed on the marketplace.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Due to the nature of digital products, all sales are final. We recommend contacting the seller directly if you have issues — most sellers are happy to help.",
      },
      {
        question: "What does 'one-time payment' mean?",
        answer:
          "You pay once and own the product forever. No subscriptions, no recurring fees, no lock-in.",
      },
    ],
  },
  {
    title: "For sellers",
    items: [
      {
        question: "How do I get approved as a seller?",
        answer:
          "After signing up, the Ownie team reviews your account. This typically takes 1–2 business days. You'll be notified by email once approved.",
      },
      {
        question: "What is Ownie's fee?",
        answer:
          "Ownie takes a 3% fee on each sale. The rest is paid out directly to your connected Stripe account.",
      },
      {
        question: "When do I receive my payout?",
        answer:
          "Payouts are handled by Stripe and typically arrive within 2–7 business days depending on your country and bank.",
      },
      {
        question: "Do I need to connect Stripe?",
        answer:
          "Yes. You need to connect a Stripe account before your products go live. This is required to receive payouts.",
      },
    ],
  },
  {
    title: "General",
    items: [
      {
        question: "What kind of products can be sold on Ownie?",
        answer:
          "Complete software products — SaaS boilerplates, internal tools, CRM systems, e-commerce solutions, and similar. Products must include full source code and documentation.",
      },
      {
        question: "Is my payment secure?",
        answer:
          "Yes. All payments are processed by Stripe, one of the world's most trusted payment providers.",
      },
    ],
  },
];
