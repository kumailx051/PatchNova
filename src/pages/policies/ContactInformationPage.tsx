import React from 'react';
import PageLayout from '../../components/PageLayout';

const contactInfo = [
  { label: 'Trade name', value: 'patchkraze' },
  { label: 'Phone number', value: '9099850312' },
  { label: 'Email', value: 'nash@masterscustompatches.com' },
  { label: 'Physical address', value: '1848 West 11th Street, Upland CA 91786, United States' },
  { label: 'VAT number', value: '' },
  { label: 'Trade number', value: '' },
];

export default function ContactInformationPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-center text-3xl font-extrabold text-black">
          Contact Information
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {contactInfo.map((item, index) => (
            <div key={index} className="rounded-none border border-[#eaeef3] bg-white p-6">
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                {item.label}
              </div>
              <div className="mt-3 text-sm font-semibold text-black">
                {item.value || '—'}
              </div>
            </div>
          ))}
        </div>

        {/* Alternative: Full-width text format (uncomment if preferred) */}
        {/* <div className="mt-8 rounded-none border border-[#eaeef3] bg-white p-6">
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <div key={index}>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  {item.label}
                </div>
                <div className="mt-1 text-sm text-black">
                  {item.value || '—'}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </PageLayout>
  );
}
