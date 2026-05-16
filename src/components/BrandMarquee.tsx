import React from 'react';

const logos = [
  'https://masterscustompatches.com/images/brands/apple.png',
  'https://masterscustompatches.com/images/brands/google.png',
  'https://masterscustompatches.com/images/brands/amazon.png',
  'https://masterscustompatches.com/images/brands/nike.png',
  'https://masterscustompatches.com/images/brands/pepsi.png',
  'https://masterscustompatches.com/images/brands/spotify.png',
  'https://masterscustompatches.com/images/brands/tesla.png',
  'https://masterscustompatches.com/images/brands/north-face.png',
  'https://masterscustompatches.com/images/brands/linkedin.png',
  'https://masterscustompatches.com/images/brands/mcdonalds.png',
  'https://masterscustompatches.com/images/brands/honda.png',
  'https://masterscustompatches.com/images/brands/kfc.png',
  'https://masterscustompatches.com/images/brands/shopify.png',
  'https://masterscustompatches.com/images/brands/adidas.png',
  'https://masterscustompatches.com/images/brands/tiktok.png',
  'https://masterscustompatches.com/images/brands/youtube.png',
];

export default function BrandMarquee() {
  const topRow = logos.slice(0, 9);
  const bottomRow = logos.slice(9);

  return (
    <div className="w-full bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 lg:gap-x-12">
            {topRow.map((src) => (
              <div
                key={src}
                className="group flex h-10 items-center justify-center transition-transform duration-300 ease-out hover:-translate-y-1 sm:h-12 lg:h-14"
              >
                <img
                  src={src}
                  alt="Brand logo"
                  className="max-h-full w-auto object-contain opacity-60 grayscale transition-all duration-300 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 group-hover:drop-shadow-[0_10px_16px_rgba(0,0,0,0.22)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 lg:gap-x-12">
            {bottomRow.map((src) => (
              <div
                key={src}
                className="group flex h-10 items-center justify-center transition-transform duration-300 ease-out hover:-translate-y-1 sm:h-12 lg:h-14"
              >
                <img
                  src={src}
                  alt="Brand logo"
                  className="max-h-full w-auto object-contain opacity-50 grayscale transition-all duration-300 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 group-hover:drop-shadow-[0_10px_16px_rgba(0,0,0,0.22)]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
