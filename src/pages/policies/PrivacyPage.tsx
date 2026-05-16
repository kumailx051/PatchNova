import React from 'react';
import PageLayout from '../../components/PageLayout';

const privacyText = `patchkraze operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). patchkraze is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us.

Last updated: April 6, 2026

Privacy policy – patchkraze

If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.

Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.

Personal Information We Collect or Process
------------------------------------------

When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person.

*   **Contact details** including your name, address, billing address, shipping address, phone number, and email address.
*   **Financial information** including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.
*   **Account information** including your username, password, security questions, preferences and settings.
*   **Transaction information** including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.
*   **Communications with us** including the information you include in communications with us, for example, when sending a customer support inquiry.
*   **Device information** including information about your device, browser, or network connection, your IP address, and other unique identifiers.
*   **Usage information** including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.

Personal Information Sources
----------------------------

We may collect personal information from the following sources:

*   **Directly from you** including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;
*   **Automatically through the Services** including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;
*   **From our service providers** including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;
*   **From our partners or other third parties.**

How We Use Your Personal Information
------------------------------------

Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:

*   **Provide, Tailor, and Improve the Services.**
*   **Marketing and Advertising.**
*   **Security and Fraud Prevention.**
*   **Communicating with You.**
*   **Legal Reasons.**

How We Disclose Personal Information
------------------------------------

In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy.

*   With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).
*   With business and marketing partners to provide marketing services and advertise to you.

Relationship with Shopify
-------------------------

The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services.

Contact
-------

Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at orders@patchkraze.com or contact us at 1848 West 11th Street, Upland, CA, 91786, US
`;

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-center text-3xl font-extrabold text-black">
          Privacy Policy
        </h1>

        <div className="mt-4 text-center text-sm font-medium text-gray-700">
          Last updated: April 6, 2026
        </div>

        <div className="mt-8 rounded-none border border-[#eaeef3] bg-white p-4">
          <div className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-[#111827]">
            {privacyText}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
