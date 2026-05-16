import React from 'react';
import { Facebook, Instagram, Music2 } from 'lucide-react';

const social = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61584071697295',
    icon: Facebook,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/patchkrazeusa',
    icon: Instagram,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@patchkraze1',
    icon: Music2,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-extrabold text-white">Our Products</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href="/products/embroidered-patches" className="hover:underline">
                  Embroidered Patches
                </a>
              </li>
              <li>
                <a href="/products/metallic-flex-patches" className="hover:underline">
                  Metallic Flex Patches
                </a>
              </li>
              <li>
                <a href="/products/full-color-printed-patches" className="hover:underline">
                  Full Color Printed Patches
                </a>
              </li>
              <li>
                <a href="/products/pvc-patches" className="hover:underline">
                  PVC Patches
                </a>
              </li>
              <li>
                <a href="/products/genuine-leather-patches" className="hover:underline">
                  Genuine Leather Patches
                </a>
              </li>
              <li>
                <a href="/products/faux-leather-patches" className="hover:underline">
                  Faux Leather Patches
                </a>
              </li>
              <li>
                <a href="/products/woven-patches" className="hover:underline">
                  Woven Patches
                </a>
              </li>
              <li>
                <a href="/products/3d-embroidered-patches" className="hover:underline">
                  3D Embroidered Patches
                </a>
              </li>
              <li>
                <a href="/products/chenille-patches" className="hover:underline">
                  Chenille Patches
                </a>
              </li>
              <li>
                <a href="/products/custom-stickers" className="hover:underline">
                  Custom Stickers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Custom Patches</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href="/products/backpack-patches" className="hover:underline">
                  Backpack Patches
                </a>
              </li>
              <li>
                <a href="/products/patches-for-beanies" className="hover:underline">
                  Patches for Beanies
                </a>
              </li>
              <li>
                <a href="/products/patches-for-jackets" className="hover:underline">
                  Patches for Jackets
                </a>
              </li>
              <li>
                <a href="/products/patches-for-jeans" className="hover:underline">
                  Patches for Jeans
                </a>
              </li>
              <li>
                <a href="/products/patches-for-hats" className="hover:underline">
                  Patches for Hats
                </a>
              </li>
              <li>
                <a href="/products/patches-for-clothes" className="hover:underline">
                  Patches for Clothes
                </a>
              </li>
              <li>
                <a href="/products/patches-for-shirts" className="hover:underline">
                  Patches for Shirts
                </a>
              </li>
              <li>
                <a href="/products/patches-for-hoodies" className="hover:underline">
                  Patches for Hoodies
                </a>
              </li>
              <li>
                <a href="/products/patches-for-vests" className="hover:underline">
                  Patches for Vests
                </a>
              </li>
              <li>
                <a href="/products/patches-for-pants" className="hover:underline">
                  Patches for Pants
                </a>
              </li>
              <li>
                <a href="/products/letterman-jacket-patches" className="hover:underline">
                  Letterman Jacket Patches
                </a>
              </li>
              <li>
                <a href="/collections/all" className="hover:underline">
                  View All
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Custom Patch Styles</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href="/products/iron-on-patches" className="hover:underline">
                  Iron On Patches
                </a>
              </li>
              <li>
                <a href="/products/morale-patches" className="hover:underline">
                  Morale Patches
                </a>
              </li>
              <li>
                <a href="/products/army-patches" className="hover:underline">
                  Army Patches
                </a>
              </li>
              <li>
                <a href="/products/motorcycle-patches" className="hover:underline">
                  Motorcycle Patches
                </a>
              </li>
              <li>
                <a href="/products/military-patches" className="hover:underline">
                  Military Patches
                </a>
              </li>
              <li>
                <a href="/products/tactical-patches" className="hover:underline">
                  Tactical Patches
                </a>
              </li>
              <li>
                <a href="/products/police-patches" className="hover:underline">
                  Police Patches
                </a>
              </li>
              <li>
                <a href="/products/girl-scout-patches" className="hover:underline">
                  Girl Scout Patches
                </a>
              </li>
              <li>
                <a href="/products/funny-patches" className="hover:underline">
                  Funny Patches
                </a>
              </li>
              <li>
                <a href="/products/name-patches" className="hover:underline">
                  Name Patches
                </a>
              </li>
              <li>
                <a href="/products/custom-velcro-patches" className="hover:underline">
                  Custom Velcro Patches
                </a>
              </li>
              <li>
                <a href="/collections/all" className="hover:underline">
                  View All
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Patch Kraze</h3>
            <p className="mt-4 text-sm text-white/80">
              Chat Available 24 hours a Day. 7 days a Week. 365 Days a Year.
            </p>

            <div className="mt-5 space-y-2 text-sm text-white/80">
              <div>
                <span className="font-bold text-white">Phone:</span>{' '}
                <a href="tel:9099316231" className="hover:underline">
                  909-931-6231
                </a>
              </div>
              <div>
                <span className="font-bold text-white">Email:</span>{' '}
                <a href="mailto:orders@patchkraze.com" className="hover:underline">
                  orders@patchkraze.com
                </a>
              </div>
              <div>
                <span className="font-bold text-white">Address:</span>
                <div className="mt-1 text-sm text-white/80">
                  2720 NJ-42, Sickerville, NJ 08081
                </div>
                <div className="mt-1 text-sm text-white/80">
                  1848 W 11th St Suite G, Upland, CA 91786
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px bg-white/10" />

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-extrabold text-white">Pressing Instructions By Method</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href="/pages/heatpress-for-garments" className="hover:underline">
                  Heatpress For Garments
                </a>
              </li>
              <li>
                <a href="/pages/heatpress-for-hats" className="hover:underline">
                  Heatpress For Hats
                </a>
              </li>
              <li>
                <a href="/pages/iron-for-garments" className="hover:underline">
                  Iron For Garments
                </a>
              </li>
              <li>
                <a href="/pages/peel-and-stick" className="hover:underline">
                  Peel and Stick
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Customer Care</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href="/account" className="hover:underline">
                  My Account
                </a>
              </li>
              <li>
                <a href="/pages/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/pages/order-issues" className="hover:underline">
                  Order Issue Form
                </a>
              </li>
              <li>
                <a href="/pages/satisfaction-guarantee" className="hover:underline">
                  Satisfaction Guarantee
                </a>
              </li>
              <li>
                <a href="/pages/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">Store Info</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href="/policies/shipping-policy" className="hover:underline">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="/policies/refund-policy" className="hover:underline">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/policies/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/policies/terms-of-service" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/policies/contact-information" className="hover:underline">
                  Contact Information
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1480px] flex-wrap items-center justify-between gap-6 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="text-white/70 transition-colors hover:text-white"
              >
                <s.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div className="text-sm text-white/80">Copyright © 2026 Patch Nova.</div>
          <a href="/policies/privacy-policy" className="text-sm text-white/80 hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
