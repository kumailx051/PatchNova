import React from 'react';
import type { Product } from '../data/products';

type ProductCardProps = {
  product: Product;
  ctaHref: string;
  placeholderImageText?: string;
  badgeText?: string;
};

export default function ProductCard({
  product,
  ctaHref,
  placeholderImageText,
  badgeText,
}: ProductCardProps) {
  return (
    <div className="w-full bg-white">
      <div className="relative flex flex-col">
        {badgeText ? (
          <div className="absolute left-0 top-0">
            <span className="inline-flex rounded-full bg-emerald-500 px-4 py-1 text-[12px] font-bold text-white">
              {badgeText}
            </span>
          </div>
        ) : null}

        <div className="mt-0 w-full bg-white">
          <div className="h-56 w-full bg-gray-100">
            <div className="flex h-full items-center justify-center p-4 text-center">
              <div className="text-sm font-semibold text-gray-500">{placeholderImageText ?? product.name}</div>
            </div>
          </div>

          <div className="px-2 pb-4 pt-6">
            <h3 className="text-[14px] font-bold text-black">{product.name}</h3>
            <div className="mt-2 text-[12px] font-semibold text-black">
              As low as {product.price} ea.
            </div>
            <p className="mt-3 line-clamp-2 text-[12px] leading-relaxed text-gray-700">
              {product.description}
            </p>

            <a
              href={ctaHref}
              className="mt-6 inline-flex w-full items-center justify-center rounded-none bg-black px-4 py-2 text-[13px] font-bold text-white"
            >
              Customize
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
