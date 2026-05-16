import React, { useEffect, useMemo, useState } from 'react';
import logoUrl from '../assets/logo.png';

type CartItem = {
  productSlug?: string;
  productName?: string;
  image?: string | null;
  price?: string | number;
  quantity?: number;
  width?: number;
  height?: number;
  shape?: string;
  backing?: string;
};

const parsePrice = (value: unknown) => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return 0;
  const numeric = Number.parseFloat(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(Array.isArray(stored) ? stored : []);
    } catch (error) {
      console.error('Failed to parse cart data:', error);
      setCartItems([]);
    }
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const unitPrice = parsePrice(item.price);
      const qty = Number(item.quantity) || 0;
      return sum + unitPrice * qty;
    }, 0);
  }, [cartItems]);

  return (
    <main className="min-h-screen bg-[#f1f1f1] text-[#111111]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="bg-white px-6 pb-12 pt-8 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-[560px]">
            <a href="/" className="inline-flex items-center">
              <img src={logoUrl} alt="Patch Kraze" className="h-14 w-auto" />
            </a>

            <div className="mt-10 text-center text-sm text-slate-500">Express checkout</div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button type="button" className="h-11 rounded-md bg-[#5a31f4] text-xl font-semibold text-white">shop</button>
              <button type="button" className="h-11 rounded-md bg-[#ffcf2d] text-xl font-semibold text-[#0d2d6d]">PayPal</button>
              <button type="button" className="h-11 rounded-md bg-black text-xl font-semibold text-white">G Pay</button>
            </div>

            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-300" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-300" />
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-[30px] font-medium">Contact</h2>
              <a href="/account" className="text-sm text-blue-600 underline underline-offset-2">Sign in</a>
            </div>
            <input className="mt-3 h-12 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Email or mobile phone number" />

            <h3 className="mt-7 text-[30px] font-medium">Delivery</h3>
            <select className="mt-3 h-12 w-full rounded-md border border-slate-300 px-3 text-sm">
              <option>United States</option>
            </select>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <input className="h-12 rounded-md border border-slate-300 px-3 text-sm" placeholder="First name (optional)" />
              <input className="h-12 rounded-md border border-slate-300 px-3 text-sm" placeholder="Last name" />
            </div>

            <input className="mt-3 h-12 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Address" />
            <input className="mt-3 h-12 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Apartment, suite, etc. (optional)" />

            <div className="mt-3 grid grid-cols-[1fr_120px_120px] gap-2">
              <input className="h-12 rounded-md border border-slate-300 px-3 text-sm" placeholder="City" />
              <input className="h-12 rounded-md border border-slate-300 px-3 text-sm" placeholder="State" />
              <input className="h-12 rounded-md border border-slate-300 px-3 text-sm" placeholder="ZIP code" />
            </div>

            <input className="mt-3 h-12 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Phone" />

            <h3 className="mt-8 text-[30px] font-medium">Shipping method</h3>
            <div className="mt-3 rounded-md border border-slate-200 bg-slate-100 p-4 text-sm text-slate-600">
              Enter your shipping address to view available shipping methods.
            </div>

            <h3 className="mt-8 text-[30px] font-medium">Payment</h3>
            <p className="text-sm text-slate-500">All transactions are secure and encrypted.</p>

            <div className="mt-3 rounded-md border border-blue-500">
              <div className="flex items-center justify-between border-b border-slate-200 bg-blue-50 px-3 py-3 text-sm font-medium">
                <span>Credit card</span>
                <span>VISA • MC • AMEX</span>
              </div>
              <div className="p-3">
                <input className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Card number" />
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" placeholder="Expiration date (MM / YY)" />
                  <input className="h-11 rounded-md border border-slate-300 px-3 text-sm" placeholder="Security code" />
                </div>
                <input className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm" placeholder="Name on card" />
              </div>

              <div className="border-t border-slate-200 px-3 py-3 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span>Use shipping address as billing address</span>
                </label>
              </div>

              <button type="button" className="w-full border-t border-slate-200 px-3 py-4 text-left text-sm hover:bg-slate-50">Shop Pay - Pay in full or in installments</button>
              <button type="button" className="w-full border-t border-slate-200 px-3 py-4 text-left text-sm hover:bg-slate-50">PayPal</button>
            </div>

            <div className="mt-8">
              <button type="button" className="h-12 w-full rounded-md bg-[#1565d8] text-lg font-semibold text-white hover:bg-[#0f57bf]">Pay now</button>
            </div>
          </div>
        </section>

        <section className="border-l border-slate-200 bg-[#f5f5f5] px-6 pb-12 pt-8 sm:px-10 lg:px-8">
          <div className="mx-auto w-full max-w-[460px]">
            {cartItems.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
                Your cart is empty.
              </div>
            ) : (
              <>
                {cartItems.map((item, index) => {
                  const unitPrice = parsePrice(item.price);
                  const qty = Number(item.quantity) || 0;

                  return (
                    <div key={`${item.productSlug || item.productName}-${index}`} className="mb-5 flex gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded border border-slate-300 bg-white">
                        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
                          {qty}
                        </span>
                        {item.image ? (
                          <img src={item.image} alt={item.productName || 'Cart item'} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-medium text-black">{item.productName || 'Custom Velcro Patches'}</div>
                        <div className="text-sm text-slate-600">{item.width ?? 2.0} inch - 100-199</div>
                        <div className="text-sm text-slate-600">Width: {item.width ?? 2.0}</div>
                        <div className="text-sm text-slate-600">Height: {item.height ?? 2.0}</div>
                        <div className="text-sm text-slate-600">Shape: {item.shape || 'Square'}</div>
                        <div className="text-sm text-slate-600">Backing: {item.backing || 'Heat Applied (Most Popular)'}</div>
                      </div>
                      <div className="text-right text-base font-medium text-black">${(unitPrice * qty).toFixed(2)}</div>
                    </div>
                  );
                })}
              </>
            )}

            <div className="mt-4 flex gap-2">
              <input className="h-10 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm" placeholder="Discount code" />
              <button type="button" className="h-10 rounded-md border border-slate-300 bg-[#efefef] px-4 text-sm">Apply</button>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-slate-500">Enter shipping address</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-300 pt-4">
              <span className="text-3xl font-medium">Total</span>
              <span className="text-3xl font-semibold">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
