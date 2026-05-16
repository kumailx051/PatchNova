import React from 'react';
import PageLayout from '../components/PageLayout';
import FAQAccordion, { FAQItem } from '../components/FAQAccordion';

const faqs: FAQItem[] = [
  {
    q: 'What are custom patches?',
    a: 'Custom patches are personalized embroidered or printed designs created to your specifications. They can be applied to clothing, bags, uniforms, and more through various backing options like iron-on, sew-on, or adhesive backing.',
  },
  {
    q: 'How does pricing work?',
    a: 'Our pricing is based on patch type, size, quantity, and complexity of design. We offer bulk discounts that can save you up to 74% on larger orders. Get a custom quote by uploading your design.',
  },
  {
    q: 'What backing options are available?',
    a: 'We offer multiple backing options including heat press (iron-on), sew-on, peel-and-stick, and Velcro backing. Choose the option that best suits your application needs.',
  },
  {
    q: 'How do I order patches?',
    a: 'Simply upload your design, select your patch type and size, choose your backing option, and place your order. We’ll send you a virtual proof for approval before production begins.',
  },
  {
    q: 'Can I create my own design?',
    a: 'We accept unlimited colors and design complexity. You can upload simple or highly detailed artwork, and our design team will work with you to ensure the best results.',
  },
  {
    q: 'Are patches washable?',
    a: 'Yes, our patches are made with premium threads and durable fabrics designed to withstand regular washing and wearing. They maintain their vibrant colors and quality after multiple wash cycles.',
  },
  {
    q: 'Is there a minimum order quantity?',
    a: 'All patch types have a minimum of 10 pieces. We offer Patch Kraze Fast production options with low minimums starting at just 10 patches.',
  },
  {
    q: 'How fast can I get my order?',
    a: 'Standard production takes 5-7 business days after proof approval. Our Patch Kraze Fast option produces patches in five days for select patch types, perfect for urgent orders.',
  },
  {
    q: 'Do you offer a sample pack?',
    a: 'Yes! We offer sample packs so you can see the quality of our work before committing to a larger order. Contact our team for sample pack options and pricing.',
  },
];

export default function FAQPage() {
  return (
    <PageLayout>
      <div className="px-0 py-10 md:py-14">
        <h1 className="text-center text-3xl font-extrabold text-black md:text-4xl">
          Frequently Asked Questions
        </h1>
        <div className="mt-8">
          <FAQAccordion items={faqs} />
        </div>
      </div>
    </PageLayout>
  );
}
