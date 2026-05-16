import React from 'react';
import PageLayout from '../../components/PageLayout';

export default function RefundPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-center text-5xl font-extrabold text-black">
          Refund policy
        </h1>

        <div className="mt-12 space-y-6 text-sm leading-relaxed text-gray-800">
          {/* Overview */}
          <div>
            <p>
              We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
            </p>
          </div>

          <div>
            <p>
              To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
            </p>
          </div>

          {/* Return Process */}
          <div className="mt-8">
            <p>
              To start a return, you can contact us at <a href="mailto:orders@patchkraze.com" className="text-blue-600 underline">orders@patchkraze.com</a>. Please note that returns will need to be sent to the following address: 1848 W 11th St Suite G Upland, CA 91786
            </p>
          </div>

          <div>
            <p>
              If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
            </p>
          </div>

          <div>
            <p>
              You can always contact us for any return question at <a href="mailto:orders@patchkraze.com" className="text-blue-600 underline">orders@patchkraze.com</a>
            </p>
          </div>

          {/* Damages and Issues */}
          <div className="mt-8 pt-4">
            <h2 className="font-extrabold text-black">
              Damages and issues
            </h2>
            <p className="mt-3">
              Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
            </p>
          </div>

          {/* Exceptions */}
          <div className="mt-8 pt-4">
            <h2 className="font-extrabold text-black">
              Exceptions / non-returnable items
            </h2>
            <p className="mt-3">
              Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
            </p>
            <p className="mt-3">
              Unfortunately, we cannot accept returns on sale items or gift cards.
            </p>
          </div>

          {/* Exchanges */}
          <div className="mt-8 pt-4">
            <h2 className="font-extrabold text-black">
              Exchanges
            </h2>
            <p className="mt-3">
              The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
            </p>
          </div>

          {/* EU Cooling Off */}
          <div className="mt-8 pt-4">
            <h2 className="font-extrabold text-black">
              European Union 14 day cooling off period
            </h2>
            <p className="mt-3">
              Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
            </p>
          </div>

          {/* Refunds */}
          <div className="mt-8 pt-4 pb-12">
            <h2 className="font-extrabold text-black">
              Refunds
            </h2>
            <p className="mt-3">
              We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
            </p>
            <p className="mt-3">
              If more than 15 business days have passed since we've approved your return, please contact us at <a href="mailto:nash@masterscustompatches.com" className="text-blue-600 underline">nash@masterscustompatches.com</a>.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
