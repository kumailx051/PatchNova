import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import BrandMarquee from '../components/BrandMarquee';
import FAQAccordion from '../components/FAQAccordion';
import ProductCard from '../components/ProductCard';
import { products as staticProducts } from '../data/products';
import { db } from '../firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import heroImage from '../assets/hero-section-image.png';
import heroWebVideo from '../assets/herovideoWeb.mp4';
import heroMobileVideo from '../assets/herovideoMobile.mp4';
import { Check, Clock3, CircleHelp, Shield, ThumbsUp, Package } from 'lucide-react';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <video
          className="hidden h-full w-full object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={heroWebVideo} type="video/mp4" />
        </video>
        <video
          className="h-full w-full object-cover md:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={heroMobileVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative mx-auto grid min-h-[560px] w-full max-w-[1480px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:min-h-[640px] md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Premium Custom Patches with Low 10-Piece Minimums
          </h1>
          <p className="mt-4 text-base font-medium text-white/90 md:text-lg">
            15+ premium heat-pressable patch styles that apply in just 20 seconds. 5-day rush
            shipping available for select patch types.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="text-[18px] text-[#e11d2f]">✓</span>
              <span className="text-sm font-semibold text-white">Free Shipping</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="text-[18px] text-[#e11d2f]">✓</span>
              <span className="text-sm font-semibold text-white">Low Minimums</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="text-[18px] text-[#e11d2f]">✓</span>
              <span className="text-sm font-semibold text-white">No Setup Fees</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/collections/custom-patches"
              className="inline-flex w-full items-center justify-center bg-[#e11d2f] px-6 py-3 text-sm font-bold text-white sm:w-auto sm:min-w-[220px] sm:rounded-none"
            >
              Shop Custom Patches
            </Link>
            <Link
              to="/collections/rush-order"
              className="inline-flex w-full items-center justify-center border border-white bg-white px-6 py-3 text-sm font-bold text-[#111827] sm:w-auto sm:min-w-[220px] sm:rounded-none"
            >
              Shop 5 Day Rush Patches
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-[560px]">
            <img
              src={heroImage}
              alt="Custom patches and product display"
              className="h-auto w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShopAllSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, limit(8));
        const snapshot = await getDocs(q);
        const productList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static products
        setProducts(staticProducts.map((p) => ({
          id: p.slug,
          title: p.name,
          handle: p.slug,
          price: parseFloat(p.price.replace('$', '')),
          image: '',
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <h2 className="text-left text-2xl font-extrabold text-black md:text-3xl">
          Shop All Patch Types
        </h2>

        {loading ? (
          <div className="mt-10 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard
                key={p.docId || p.id}
                product={{
                  slug: p.handle || p.id,
                  name: p.title,
                  price: `$${p.price?.toFixed(2) || '0.00'}`,
                  minQty: '10pc min',
                  description: p.description || 'Custom patch product',
                  imageUrl: p.image,
                }}
                ctaHref={`/products/${p.handle || p.id}`}
                badgeText="10pc min"
                placeholderImageText={p.title}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeatureSteps() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <h2 className="text-center text-2xl font-extrabold text-black md:text-3xl">
          The Patch Kraze Ordering Process
        </h2>
        <p className="mt-3 text-center text-sm font-medium text-gray-600 md:text-base">
          Simplifying the Process with Satisfaction Guaranteed
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              img: 'https://patchkraze.com/cdn/shop/files/4-step.jpg?v=1768381402',
              title: 'Upload Your Designs & Place Order Online',
              body: "Use designs with unlimited colors, simple or high detail artwork. Upload any design you want and we’ll turn it into high quality custom patches.",
            },
            {
              img: 'https://patchkraze.com/cdn/shop/files/1-step.jpg?v=1768381402',
              title: 'Approve Your Patch Artwork Proofs',
              body: 'If selected during checkout, we will send you a virtual proof for approval before we can begin production. We offer free proof approvals on patch orders of $300 or more.',
            },
            {
              img: 'https://patchkraze.com/cdn/shop/files/3-step.jpg?v=1768381402',
              title: 'We Create & Ship Your Custom Patch Order',
              body: 'We make ordering custom patches easy. We can create the most detailed, highest quality, full color custom patches you can find.',
            },
            {
              img: 'https://patchkraze.com/cdn/shop/files/2-step.jpg?v=1768381402',
              title: 'Heatpress when Ready. Keep Extras in Storage Forever',
              body: 'Press your custom made patches with a heat press, while using our required pressing instructions for ultimate durability.',
            },
          ].map((s) => (
            <div key={s.title} className="group text-center">
              <div className="mx-auto h-40 w-40 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 text-sm font-extrabold text-black">{s.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-gray-700 md:text-sm">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureWhyBuyCards() {
  const items = [
    {
      icon: Check,
      title: '5 Day Production, Low Minimums',
      body: 'Our Patch Kraze Fast option produces patches in five days — available for select patch types, including options with low minimums starting at just 10 patches.',
    },
    {
      icon: Shield,
      title: 'Top Quality Materials',
      body: 'We only use top quality materials and the latest technology for all of our patches. Our patches are durable, machine washable, and will not fade.',
    },
    {
      icon: Package,
      title: 'Free Shipping',
      body: 'All of our orders come with free shipping to the continental United States. We also offer rush shipping options for tight deadlines.',
    },
    {
      icon: CircleHelp,
      title: 'Free Design & Setup',
      body: 'We offer free design and setup for all orders. Our expert designers will work with you to create the perfect patch for your needs.',
    },
    {
      icon: ThumbsUp,
      title: '100% Satisfaction Guarantee',
      body: 'We stand behind our products 100%. If you are not satisfied with your order for any reason, we will make it right.',
    },
    {
      icon: Clock3,
      title: 'Fast Turnaround',
      body: 'Our standard turnaround time is 10-12 business days. We also offer rush options for those who need their patches sooner.',
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <h2 className="text-center text-3xl font-extrabold text-black md:text-[34px]">
          Why Buy From Patch Kraze?
        </h2>

        <p className="mx-auto mt-4 max-w-4xl text-center text-sm font-medium leading-relaxed text-[#0b3d5a] md:text-base">
          At Patch Kraze, we are proud of the service we provide and the quality of our embroidered patches and other
          products. There are many reasons why you should choose us for your custom patches.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-none border border-[#e5eaf0] bg-white px-5 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] md:px-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ccffec] text-[#0e7f76]">
                  <it.icon className="h-6 w-6" strokeWidth={2.4} />
                </div>

                <div>
                  <h3 className="text-[15px] font-extrabold leading-tight text-black md:text-[16px]">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#0b3d5a] md:text-[14px]">
                    {it.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQHeadingOnly() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-2xl font-extrabold text-black md:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-8">
          <FAQAccordion
            items={[
              {
                q: 'What are custom patches?',
                a: 'Custom patches are personalized embroidered or printed designs created to your specifications. They can be applied to clothing, bags, uniforms, and more through various backing options like iron-on, sew-on, or adhesive backing.',
              },
              {
                q: 'How does pricing work?',
                a: 'Our pricing is based on patch type, size, quantity, and complexity of design. We offer bulk discounts that can save you up to 74% on larger orders. Get a custom quote by uploading your design.',
              },
              {
                q: 'What backing options are available?',
                a: 'We offer multiple backing options including heat press (iron-on), sew-on, peel-and-stick, and Velcro backing. Choose the option that best suits your application needs.',
              },
              {
                q: 'How do I order patches?',
                a: 'Simply upload your design, select your patch type and size, choose your backing option, and place your order. We’ll send you a virtual proof for approval before production begins.',
              },
              {
                q: 'Can I create my own design?',
                a: 'We accept unlimited colors and design complexity. You can upload simple or highly detailed artwork, and our design team will work with you to ensure the best results.',
              },
              {
                q: 'Are patches washable?',
                a: 'Yes, our patches are made with premium threads and durable fabrics designed to withstand regular washing and wearing. They maintain their vibrant colors and quality after multiple wash cycles.',
              },
              {
                q: 'Is there a minimum order quantity?',
                a: 'All patch types have a minimum of 10 pieces. We offer Patch Kraze Fast production options with low minimums starting at just 10 patches.',
              },
              {
                q: 'How fast can I get my order?',
                a: 'Standard production takes 5-7 business days after proof approval. Our Patch Kraze Fast option produces patches in five days for select patch types, perfect for urgent orders.',
              },
              {
                q: 'Do you offer a sample pack?',
                a: 'Yes! We offer sample packs so you can see the quality of our work before committing to a larger order. Contact our team for sample pack options and pricing.',
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <ShopAllSection />
      <BrandMarquee />
      <FeatureSteps />
      <FeatureWhyBuyCards />
      <FAQHeadingOnly />
    </PageLayout>
  );
}
