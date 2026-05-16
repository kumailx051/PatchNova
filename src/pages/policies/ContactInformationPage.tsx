import React from 'react';
import PageLayout from '../../components/PageLayout';

const contactInfoText = `Contact information
===================

Trade name: patchkraze

Phone number: 9099850312

Email: nash@masterscustompatches.com

Physical address: 1848 West 11th Street, Upland CA 91786, United States

VAT number:

Trade number:
`;

export default function ContactInformationPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-center text-3xl font-extrabold text-black">
          Contact information
        </h1>

        <div className="mt-8 rounded-none border border-[#eaeef3] bg-white p-4">
          <div className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-[#111827]">
            {contactInfoText}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
