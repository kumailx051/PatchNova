import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';

type Tab = 'login' | 'register';

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('login');

  return (
    <PageLayout>
      <div className="bg-[#f7f8fa] px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto w-full max-w-[560px]">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
              Hello, sign in
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#35506b] md:text-base">
              Sign in to your account to manage orders, track shipments, and access your saved information.
            </p>
          </div>

          <div className="mt-8 flex overflow-hidden rounded-full border border-[#d9e1ea] bg-white p-1 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <button
              type="button"
              className={`h-11 flex-1 rounded-full px-3 text-sm font-bold transition-colors ${
                tab === 'login' ? 'bg-black text-white' : 'bg-transparent text-black'
              }`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`h-11 flex-1 rounded-full px-3 text-sm font-bold transition-colors ${
                tab === 'register' ? 'bg-black text-white' : 'bg-transparent text-black'
              }`}
              onClick={() => setTab('register')}
            >
              Register
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-[#e5eaf0] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
            {tab === 'login' ? (
              <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-black">Email</label>
                <input
                  type="email"
                  required
                  className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Password</label>
                <input
                  type="password"
                  required
                  className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-black px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Sign In
              </button>

              <div className="text-center text-xs text-[#35506b]">
                <a href="#" className="underline">
                  Forgot password?
                </a>
              </div>
            </form>
            ) : (
              <form className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-black">First Name</label>
                    <input
                      type="text"
                      required
                      className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                      placeholder="First"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Last Name</label>
                    <input
                      type="text"
                      required
                      className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                      placeholder="Last"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black">Password</label>
                  <input
                    type="password"
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                    placeholder="Create password"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-black px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
