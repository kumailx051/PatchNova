import React from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
