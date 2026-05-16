import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function GenericPage() {
  const params = useParams();
  const slug = params.slug;

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-center text-3xl font-extrabold text-black">
          {slug ?? 'Page'}
        </h1>
        <p className="mt-6 text-center text-sm font-medium text-gray-700">
          This page is under construction.
        </p>
      </div>
    </PageLayout>
  );
}
