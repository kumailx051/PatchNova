import React from 'react';
import PageLayout from '../../components/PageLayout';

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-center text-5xl font-extrabold text-black">
          Privacy policy
        </h1>

        <p className="mt-4 text-center text-sm text-gray-600">
          Last updated: April 6, 2026
        </p>

        <div className="mt-12 space-y-6 text-sm leading-relaxed text-gray-800">
          {/* Overview */}
          <div>
            <p>
              patchkraze operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). patchkraze is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us.
            </p>
          </div>

          <div>
            <p>
              If there is a conflict between our <a href="/policies/terms" className="text-blue-600 underline">Terms of Service</a> and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
            </p>
          </div>

          <div>
            <p>
              Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mt-8">
            <h2 className="text-2xl font-extrabold text-black">
              Personal Information We Collect or Process
            </h2>
            <p className="mt-4">
              When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:
            </p>
            <ul className="mt-4 space-y-2 ml-6 list-disc">
              <li>Contact details including your name, address, billing address, shipping address, phone number, and email address.</li>
              <li>Financial information including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.</li>
              <li>Account information including your username, password, security questions, preferences and settings.</li>
              <li>Transaction information including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
              <li>Communications with us including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
              <li>Device information including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
              <li>Usage information including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mt-8">
            <h2 className="text-2xl font-extrabold text-black">
              Personal Information Sources
            </h2>
            <p className="mt-4">
              We may collect personal information from the following sources:
            </p>
            <ul className="mt-4 space-y-2 ml-6 list-disc">
              <li>Directly from you including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information.</li>
              <li>Automatically through the Services including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies.</li>
              <li>From our service providers including when we engage them to enable certain technology and when they collect or process your personal information on our behalf.</li>
              <li>From our partners or other third parties.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mt-8">
            <h2 className="text-2xl font-extrabold text-black">
              How We Use Your Personal Information
            </h2>
            <p className="mt-4">
              Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:
            </p>
            <ul className="mt-4 space-y-2 ml-6 list-disc">
              <li>Provide, Tailor, and Improve the Services.</li>
              <li>Marketing and Advertising.</li>
              <li>Security and Fraud Prevention.</li>
              <li>Communicating with You.</li>
              <li>Legal Reasons.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mt-8">
            <h2 className="text-2xl font-extrabold text-black">
              How We Disclose Personal Information
            </h2>
            <p className="mt-4">
              In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy.
            </p>
            <ul className="mt-4 space-y-2 ml-6 list-disc">
              <li>With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
              <li>With business and marketing partners to provide marketing services and advertise to you.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mt-8">
            <h2 className="text-2xl font-extrabold text-black">
              Relationship with Shopify
            </h2>
            <p className="mt-4">
              The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mt-8 pb-12">
            <h2 className="text-2xl font-extrabold text-black">
              Contact
            </h2>
            <p className="mt-4">
              Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at <a href="mailto:orders@patchkraze.com" className="text-blue-600 underline">orders@patchkraze.com</a> or contact us at 1848 West 11th Street, Upland, CA, 91786, US.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
