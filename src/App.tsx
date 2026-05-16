import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import GuaranteePage from './pages/GuaranteePage';
import AccountPage from './pages/AccountPage';

import PrivacyPage from './pages/policies/PrivacyPage';
import ShippingPage from './pages/policies/ShippingPage';
import RefundPage from './pages/policies/RefundPage';
import TermsPage from './pages/policies/TermsPage';
import ContactInformationPage from './pages/policies/ContactInformationPage';

import GenericPage from './pages/GenericPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/pages/contact" element={<ContactPage />} />
        <Route path="/pages/faq" element={<FAQPage />} />
        <Route path="/pages/satisfaction-guarantee" element={<GuaranteePage />} />

        <Route path="/account" element={<AccountPage />} />

        <Route path="/policies/privacy-policy" element={<PrivacyPage />} />
        <Route path="/policies/shipping-policy" element={<ShippingPage />} />
        <Route path="/policies/refund-policy" element={<RefundPage />} />
        <Route path="/policies/terms-of-service" element={<TermsPage />} />
        <Route
          path="/policies/contact-information"
          element={<ContactInformationPage />}
        />

        {/* Keep other site links from breaking while we build */}
        <Route path="/pages/:slug" element={<GenericPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
