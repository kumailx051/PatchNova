import React, { useEffect, useState } from 'react';
import { ChevronDown, Menu, Search, ShoppingBag } from 'lucide-react';
import logoUrl from '../assets/logo.png';

const categories = [
  { label: 'Embroidery', href: '#' },
  { label: 'Full Color Printed Patches', href: '#' },
  { label: 'PVC Rubber', href: '#' },
  { label: 'Leather', href: '#' },
  { label: 'Silicone', href: '#' },
  { label: 'TPU FLEX Patches', href: '#' },
  { label: 'Woven', href: '#' },
  { label: 'Stickers', href: '#' },
  { label: 'DTF Transfers', href: '#' },
  { label: 'Ready Made Patches', href: '#' },
  { label: 'Patch Kraze Blanks', href: '#' },
];

const recentlyViewed = [
  {
    title: 'PVC Rubber Patches',
    price: '$4.50 USD',
    image:
      'https://patchkraze.com/cdn/shop/files/preview_images/aec8f8d95ce2440da4b25d6be7e6999f.thumbnail.0000000000.jpg?v=1778786922&width=200',
  },
  {
    title: 'American Flag Dove Embroidered Patch',
    price: '$8.00 USD',
    image: 'https://patchkraze.com/cdn/shop/files/embroidered-main.jpg?v=1774634138&width=200',
  },
  {
    title: 'Woven Patches',
    price: '$2.54 USD',
    image: 'https://patchkraze.com/cdn/shop/files/embriodary_8.jpg?v=1774634138&width=200',
  },
  {
    title: 'Embroidered Patches',
    price: '$1.23 USD',
    image: 'https://patchkraze.com/cdn/shop/files/embriodary_15.jpg?v=1774634138&width=200',
  },
];

const customPatches = [
  {
    title: 'Custom Patches For Hats',
    price: '$1.23 USD',
    image:
      'https://patchkraze.com/cdn/shop/files/McpEmbdetailImagecollage.jpg?v=1774398155&width=200',
  },
  {
    title: 'Custom Patches For Shirts',
    price: '$1.23 USD',
    image: 'https://patchkraze.com/cdn/shop/files/ChatGPTImageApr22_2026_11_51_12AM.png?v=1776883893&width=200',
  },
  {
    title: 'Custom Patches For Jackets',
    price: '$1.23 USD',
    image: 'https://patchkraze.com/cdn/shop/files/embroidered-main.jpg?v=1774634138&width=200',
  },
  {
    title: 'Custom Patches For Hoodies',
    price: '$1.23 USD',
    image: 'https://patchkraze.com/cdn/shop/files/embriodary_4.jpg?v=1774634138&width=200',
  },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (!isSearchOpen && !isCartOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCartOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, isCartOpen]);

  return (
    <header className="w-full bg-white">
      {/* Main row */}
      <div className="mx-auto flex h-[86px] w-full max-w-[1480px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Mobile: hamburger */}
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="h-7 w-7 text-black" />
        </button>

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logoUrl} alt="Patch Kraze" className="h-12 w-auto" loading="lazy" />
        </a>

        {/* Search */}
        <div className="hidden flex-1 md:block">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="relative flex h-11 w-full items-center rounded-full border border-[#d7dde5] bg-white pl-12 pr-12 text-left text-sm text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none"
            aria-label="Open search"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
            <span>Search Patch Styles</span>
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
          </button>
        </div>

        {/* Right stack */}
        <div className="ml-auto hidden items-center gap-10 md:flex">
          <div className="text-right leading-tight">
            <div className="text-sm font-extrabold text-emerald-500">Live Chat 24/7</div>
            <a
              href="#"
              className="text-xs font-semibold text-black underline underline-offset-2"
            >
              Chat with Us
            </a>
          </div>

          <div className="text-right leading-tight">
            <div className="text-xs font-medium text-gray-500">Hello, sign in</div>
            <a
              href="/account"
              className="text-xs font-bold text-black underline underline-offset-2"
            >
              Account & Reorder
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center justify-center"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-6 w-6 text-black" />
            <span className="absolute -right-3 -top-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-2 text-[12px] font-bold text-white">
              0
            </span>
          </button>
        </div>

        {/* Mobile: cart */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="ml-auto inline-flex relative md:hidden"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-6 w-6 text-black" />
          <span className="absolute -right-3 -top-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-2 text-[12px] font-bold text-white">
            0
          </span>
        </button>
      </div>

      {/* Categories row */}
      <nav className="border-t border-black/10 bg-white">
        <div className="mx-auto flex w-full max-w-[1480px] items-center justify-center gap-6 px-4 py-3 text-[13px] sm:px-6 lg:px-8">
          {categories.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-black/90"
            >
              <span>{c.label}</span>
              <ChevronDown className="h-4 w-4 text-black/70" />
            </a>
          ))}
        </div>
      </nav>

      {isSearchOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/35 px-4 py-12 sm:items-center">
          <button
            type="button"
            aria-label="Close search overlay"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsSearchOpen(false)}
          />

          <div className="relative z-10 w-full max-w-[640px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[#edf1f5] px-5 py-4">
              <Search className="h-5 w-5 text-slate-700" />
              <input
                autoFocus
                type="text"
                placeholder="Search"
                className="w-full border-none bg-transparent text-base font-medium outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                aria-label="Close search"
                className="text-2xl leading-none text-slate-500"
                onClick={() => setIsSearchOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Recently viewed</span>
                <button type="button" className="text-slate-400 hover:text-slate-600">
                  Clear
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {recentlyViewed.map((item) => (
                  <a key={item.title} href="#" className="group block">
                    <div className="overflow-hidden rounded-md bg-[#f5f6f8]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-32 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2 text-sm font-medium leading-tight text-slate-800">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm text-slate-700">{item.price}</div>
                  </a>
                ))}
              </div>

              <div className="mt-5 text-sm font-medium text-slate-700">Custom Patches</div>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {customPatches.map((item) => (
                  <a key={item.title} href="#" className="group block">
                    <div className="overflow-hidden rounded-md bg-[#f5f6f8]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-32 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2 text-sm font-medium leading-tight text-slate-800">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm text-slate-700">{item.price}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isCartOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close cart overlay"
            className="absolute inset-0 bg-black/25"
            onClick={() => setIsCartOpen(false)}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl sm:max-w-[460px]">
            <div className="flex items-center justify-end px-4 py-4">
              <button
                type="button"
                aria-label="Close cart"
                className="text-3xl leading-none text-slate-700"
                onClick={() => setIsCartOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
              <div className="text-[28px] font-medium tracking-tight text-black sm:text-[34px]">
                Your cart is empty
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
                Have an account?{' '}
                <a href="/account" className="underline underline-offset-2 hover:no-underline">
                  Log in
                </a>{' '}
                to check out faster.
              </p>

              <a
                href="/collections/all"
                className="mt-10 text-[15px] font-medium text-black underline underline-offset-4 hover:no-underline"
              >
                Continue shopping
              </a>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
