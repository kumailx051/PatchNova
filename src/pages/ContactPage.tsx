import React from 'react';
import PageLayout from '../components/PageLayout';

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-center text-3xl font-extrabold text-black">Contact</h1>

        <div className="mt-8 rounded-none bg-white p-6 shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black">Name</label>
              <input
                type="text"
                placeholder="Your name"
                required
                className="mt-2 h-11 w-full rounded-none border border-brand-border bg-white px-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black">
                Email <span className="text-brand-gold">*</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="mt-2 h-11 w-full rounded-none border border-brand-border bg-white px-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black">Phone</label>
              <input
                type="tel"
                placeholder="Your phone number"
                className="mt-2 h-11 w-full rounded-none border border-brand-border bg-white px-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black">Comment</label>
              <textarea
                rows={5}
                placeholder="Your message"
                className="mt-2 w-full resize-none rounded-none border border-brand-border bg-white px-3 py-2 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-none bg-black px-4 text-sm font-bold text-white"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-none bg-white p-6 shadow-sm">
          <div className="space-y-2 text-sm text-black">
            <div>
              <span className="font-bold">Phone: </span>
              909-931-6231
            </div>
            <div>
              <span className="font-bold">Email: </span>
              orders@patchkraze.com
            </div>
            <div>
              <span className="font-bold">Hours: </span>
              Mon-Fri 8am-12am EST, Sat-Sun 9am-5pm EST
            </div>
            <div>
              <span className="font-bold">Address 1: </span>
              2720 NJ-42, Sickerville, NJ 08081
            </div>
            <div>
              <span className="font-bold">Address 2: </span>
              1848 W 11th St Suite G, Upland, CA 91786
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
