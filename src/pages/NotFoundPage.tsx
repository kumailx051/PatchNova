import React from 'react';
import PageLayout from '../components/PageLayout';

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-center text-4xl font-extrabold text-black">404</h1>
        <p className="mt-4 text-center text-sm font-medium text-gray-700">
          Page not found.
        </p>
      </div>
    </PageLayout>
  );
}
