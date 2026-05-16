import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { products } from '../data/products';
import { auth, db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { ChevronDown } from 'lucide-react';

type PatchProduct = {
  id?: string;
  docId?: string;
  title?: string;
  name?: string;
  handle?: string;
  price?: number;
  description?: string;
  image?: string;
  imageUrl?: string;
  tags?: string[];
  vendor?: string;
  product_type?: string;
  sku?: string;
  slug?: string;
  minQty?: string;
};

function toTitleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

const pricingTiers = [
  { qty: '10-49 pcs', price: '$2.48', discount: 'Base' },
  { qty: '50-99 pcs', price: '$2.15', discount: 'Save 13%' },
  { qty: '100-199 pcs', price: '$1.59', discount: 'Save 36%', highlighted: true },
  { qty: '200-499 pcs', price: '$1.07', discount: 'Save 57%' },
  { qty: '500-999 pcs', price: '$0.81', discount: 'Save 67%' },
  { qty: '1000+ pcs', price: '$0.74', discount: 'Save 70%' },
];

const patchShapes = ['Circle', 'Square', 'Rectangle', 'Oval', 'Custom'];
const backingOptions = [
  { name: 'Heat Applied', label: 'Heat Applied (Most Popular)' },
  { name: 'Velcro', label: 'Velcro' },
  { name: 'Peel & Stick', label: 'Peel & Stick' },
];

const customerReviews = [
  {
    name: 'Ralph Arguelles',
    stars: 5,
    text: 'This is now the second order from Patch Kraze. They are so clean and easy to apply. Customer service is top notch.',
  },
  {
    name: 'Darrell DeVor',
    stars: 5,
    text: 'The PVC Velcro back patches came in even better than expected. Quality is amazing and the colors pop like crazy.',
  },
  {
    name: 'Kris Johnson',
    stars: 5,
    text: 'Love my patches from Patch Kraze. They came out exactly how I wanted them and they do not look cheap or flimsy.',
  },
  {
    name: 'Lownice Hobson',
    stars: 5,
    text: 'My design was pretty intricate and the patches look amazing!',
  },
  {
    name: 'Lena Lindsay',
    stars: 5,
    text: 'Absolutely LOVE how my patches came out. Colors and detail definitely a 10+. Working on my next order right now.',
  },
  {
    name: 'Nicole Taylor',
    stars: 5,
    text: 'My small business logo patches turned out beautifully. Customers always ask where I got them!',
  },
  {
    name: 'Ryan Anderson',
    stars: 5,
    text: 'The 3D puff embroidery option makes our patches stand out. Absolutely love the texture!',
  },
  {
    name: 'Stephanie White',
    stars: 5,
    text: 'Ordered for a family reunion. Everyone was impressed with the quality and quick delivery!',
  },
  {
    name: 'Lee Ingram',
    stars: 5,
    text: 'Great quality and service!',
  },
  {
    name: 'Colin Schless',
    stars: 5,
    text: 'Awesome quality patches! We got a set for my son’s soccer team. Thank you!',
  },
];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug ?? '';

  const [fbProduct, setFbProduct] = useState<PatchProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    details: true,
  });
  const [qty, setQty] = useState<number>(100);
  const [width, setWidth] = useState<number>(2.0);
  const [height, setHeight] = useState<number>(2.0);
  const [selectedShape, setSelectedShape] = useState('Circle');
  const [selectedBacking, setSelectedBacking] = useState('Heat Applied');

  // Fetch product from Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('handle', '==', slug));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setFbProduct({
            ...doc.data(),
            docId: doc.id,
          } as PatchProduct);
        } else {
          console.log('Product not found in Firebase for handle:', slug);
        }
      } catch (error) {
        console.error('Error fetching product from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Get product details with fallback to static data
  const staticProduct = products.find((p) => p.slug === slug);
  const name = fbProduct?.title || fbProduct?.name || staticProduct?.name || toTitleFromSlug(slug);
  const priceValue = fbProduct 
    ? `$${fbProduct.price?.toFixed(2) || '0.00'}`
    : staticProduct?.price ?? '$1.59';
  const price = String(priceValue);
  const minQty = (fbProduct?.minQty || staticProduct?.minQty) ?? '10pc min';
  const description =
    fbProduct?.description || staticProduct?.description ||
    'Customize this product with your design. Upload your artwork and our team will help create the perfect patch.';
  const productImage = fbProduct?.image || fbProduct?.imageUrl || staticProduct?.imageUrl;

  // Add product to recently viewed
  useEffect(() => {
    if (fbProduct || staticProduct) {
      const product = {
        docId: fbProduct?.docId || slug,
        handle: fbProduct?.handle || slug,
        title: name,
        price: fbProduct?.price || parseFloat(staticProduct?.price?.replace('$', '') || '0'),
        image: productImage,
      };

      try {
        const stored = localStorage.getItem('recentlyViewed');
        let recentlyViewed = stored ? JSON.parse(stored) : [];
        
        // Remove if already exists
        recentlyViewed = recentlyViewed.filter((p: any) => p.handle !== slug);
        
        // Add to front
        recentlyViewed.unshift(product);
        
        // Keep only last 20
        recentlyViewed = recentlyViewed.slice(0, 20);
        
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
      } catch (error) {
        console.error('Error saving recently viewed product:', error);
      }
    }
  }, [fbProduct, staticProduct, slug, name, productImage]);

  const currentPrice = Number.parseFloat(price.replace(/[^0-9.]/g, ''));
  const totalPrice = (currentPrice * qty).toFixed(2);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `designs/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setUploadedFileName(file.name);

      if (userId) {
        await addDoc(collection(db, 'uploads'), {
          userId,
          productSlug: slug,
          fileName: file.name,
          fileURL: downloadURL,
          uploadedAt: serverTimestamp(),
        });
      }

      alert('Design uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const cartItem = {
        productSlug: slug,
        productName: name,
        image: productImage || null,
        price,
        quantity: qty,
        totalPrice,
        width,
        height,
        shape: selectedShape,
        backing: selectedBacking,
        addedAt: serverTimestamp(),
        uploadedFile: uploadedFileName || null,
      };

      if (userId) {
        await addDoc(collection(db, 'users', userId, 'cart'), cartItem);
      }

      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      existingCart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      window.dispatchEvent(new CustomEvent('cart:updated'));
      window.dispatchEvent(new CustomEvent('cart:open'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading && !fbProduct && !products.find((p) => p.slug === slug)) {
    return (
      <PageLayout>
        <div className="mx-auto w-full max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mx-auto w-full max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: Gallery */}
          <div className="sticky top-24 self-start">
            <div className="relative mb-4 bg-gray-100 aspect-square flex items-center justify-center rounded-2xl overflow-hidden">
              {productImage ? (
                <img
                  src={productImage}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-600">Product Image</div>
                  <div className="text-xs text-gray-500 mt-2">{name}</div>
                </div>
              )}
              <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md text-gray-800 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md text-gray-800 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors" />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">{name}</h1>
            
            {/* Rating */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-sm text-gray-600">16 Reviews</span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <div className="text-[28px] font-bold text-[#111827]">
                ${price.replace('$', '')} <span className="text-[15px] font-normal text-gray-600">each at 100 pieces.</span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-500">{description}</p>
            </div>

            {/* Features */}
            <div className="mt-4 flex items-center gap-4 border-t border-b border-gray-200 py-4 text-[13px]">
              <span className="font-medium text-emerald-500">{minQty}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Ships Fast</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">No Setup Fees</span>
            </div>

            {/* Upload Section */}
            <div className="mt-6 border-2 border-dashed border-emerald-400 bg-emerald-50/30 rounded-2xl px-6 py-8 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-[#111827]">Upload your file(s) to get started</h3>
              <label htmlFor="file-upload" className="mt-4 inline-block">
                <button
                  type="button"
                  className="rounded bg-emerald-500 px-8 py-2 text-[15px] font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
                  disabled={uploading}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('file-upload')?.click();
                  }}
                >
                  {uploading ? 'Uploading...' : 'Browse'}
                </button>
              </label>
              <input
                id="file-upload"
                type="file"
                hidden
                onChange={handleFileUpload}
                accept="image/*,.pdf,.svg+xml"
              />
              <p className="mt-3 text-[13px] text-gray-500">
                or <a href="#" className="text-emerald-500 underline decoration-1 underline-offset-2">skip & get a quote without a design</a>
              </p>
              {uploadedFileName && (
                <p className="mt-2 text-xs text-green-600 font-semibold">✓ {uploadedFileName} uploaded</p>
              )}
            </div>

            {/* Pricing Tiers */}
            <div className="mt-8">
              <h3 className="text-[13px] font-bold text-emerald-500 mb-4 uppercase">BUY MORE. SAVE MORE.</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-3 px-2 font-bold text-[#111827]">Qty</th>
                      <th className="text-left pb-3 px-2 font-bold text-[#111827]">Price</th>
                      <th className="text-left pb-3 px-2 font-bold text-[#111827]">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingTiers.map((tier, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-gray-100 ${
                          tier.highlighted ? 'bg-[#e6f6f1]' : ''
                        }`}
                      >
                        <td className="py-4 px-2 text-gray-500">{tier.qty}</td>
                        <td className="py-4 px-2 text-gray-500 font-medium">{tier.price} <span className="text-xs">ea</span></td>
                        <td className={`py-4 px-2 font-medium ${tier.highlighted ? 'text-emerald-600' : 'text-gray-500'}`}>{tier.discount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Patch Size */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-black mb-4">
                Select Your Patch Size: <a href="#" className="text-emerald-600 underline text-xs">Patch Size Guide</a>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-700 font-semibold">Width (inches)</label>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setWidth(Math.max(0.5, width - 0.5))} className="px-3 py-2 border border-gray-300">−</button>
                    <input type="text" value={width.toFixed(2)} className="w-20 border border-gray-300 px-3 py-2 text-center" readOnly />
                    <button onClick={() => setWidth(width + 0.5)} className="px-3 py-2 border border-gray-300">+</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-700 font-semibold">Height (inches)</label>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setHeight(Math.max(0.5, height - 0.5))} className="px-3 py-2 border border-gray-300">−</button>
                    <input type="text" value={height.toFixed(2)} className="w-20 border border-gray-300 px-3 py-2 text-center" readOnly />
                    <button onClick={() => setHeight(height + 0.5)} className="px-3 py-2 border border-gray-300">+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity and Price Summary */}
            <div className="mt-8 border-t border-b border-gray-200 py-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-600 font-semibold">Price</label>
                  <p className="text-2xl font-extrabold text-black mt-1">${price.replace('$', '')}</p>
                  <p className="text-xs text-gray-600 mt-1">ea.</p>
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-semibold">Qty</label>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setQty(Math.max(10, qty - 10))} className="px-3 py-2 border border-gray-300">−</button>
                    <input type="text" value={qty} className="w-16 border border-gray-300 px-3 py-2 text-center font-bold" readOnly />
                    <button onClick={() => setQty(qty + 10)} className="px-3 py-2 border border-gray-300">+</button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">10 Piece Min</p>
                </div>
                <div>
                  <label className="text-xs text-gray-600 font-semibold">Total</label>
                  <p className="text-2xl font-extrabold text-black mt-1">${totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Patch Shape Selection */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-black mb-4">Select Shape:</h3>
              <div className="grid grid-cols-5 gap-3">
                {patchShapes.map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(shape)}
                    className={`py-4 px-3 border-2 rounded text-center ${
                      selectedShape === shape
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {shape === 'Circle' && '●'}
                      {shape === 'Square' && '■'}
                      {shape === 'Rectangle' && '▬'}
                      {shape === 'Oval' && '◯'}
                      {shape === 'Custom' && '?'}
                    </div>
                    <div className="text-xs font-semibold text-black">{shape}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Backing Options */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-black mb-4">Select Your Backing: Heat Applied (Most Popular)</h3>
              <div className="grid grid-cols-3 gap-3">
                {backingOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedBacking(option.name)}
                    className={`py-4 px-3 border-2 rounded text-center ${
                      selectedBacking === option.name
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="w-full h-16 bg-gray-200 mb-2 rounded" />
                    <div className="text-xs font-semibold text-black">{option.label}</div>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-600">
                Our most popular method allows you to quickly and conveniently use a heat press or even a home iron if the right pressure and heat are applied.
              </p>
            </div>

            {/* Design Notes */}
            <div className="mt-6 flex items-center gap-2">
              <input type="checkbox" id="design-notes" className="w-4 h-4" />
              <label htmlFor="design-notes" className="text-sm text-black font-semibold">
                Add Free Design Notes (Optional)
              </label>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="mt-6 w-full bg-emerald-500 text-white font-bold py-3 rounded text-lg hover:bg-emerald-600 disabled:opacity-50"
            >
              {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-black mb-6">Product Details</h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p>
                Embroidered patches from Patch Kraze offer a vibrant and professional way to feature designs on apparel such as{' '}
                <a href="#" className="text-blue-600">clothing</a>, <a href="#" className="text-blue-600">hats</a>, 
                <a href="#" className="text-blue-600">jackets</a>, or <a href="#" className="text-blue-600">backpacks</a>. 
                Crafted from durable materials with precise embroidery, these custom patches ensure strong and long-lasting adherence to your chosen items.
              </p>
              <p className="mt-4">
                You can personalize your patches extensively, giving you full control over their appearance. Choose from our three backing options: 
                heat-applied (our most popular), peel-and-stick, and Velcro.
              </p>
              <p className="mt-4 italic">
                Want Embroidery, but your design may be too detailed? No worries, we will simply upgrade you to our Print + Stitch method which 
                will include embroidery and our sublimated print for the finer details.
              </p>
            </div>
          </div>

          {/* Right: Accordion */}
          <div>
            <h2 className="text-xl font-bold text-black mb-4">Features</h2>
            <div className="space-y-2">
              {['Features', 'Satisfaction Guarantee', 'Pressing Instructions', 'Art Upload Recommendations', 'Care Instructions', 'Order Issues & Reprints'].map((section) => (
                <div key={section} className="border border-gray-200">
                  <button
                    onClick={() => toggleSection(section)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                  >
                    <span className="font-semibold text-black text-sm">{section}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedSections[section] && (
                    <div className="p-3 border-t border-gray-200 text-sm text-gray-600">
                      <p>Details about {section} would go here.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-6">FAQ</h2>
          <div className="space-y-2">
            {[
              'What Are Embroidered Patches?',
              'How Are Embroidered Patches Made?',
              'What Are The Applications Of Embroidered Patches?',
              'Why Choose Embroidered Patches?',
              'How To Attach Embroidered Patches',
            ].map((question) => (
              <div key={question} className="border border-gray-200">
                <button
                  onClick={() => toggleSection(question)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <span className="font-semibold text-black">{question}</span>
                  <span className="text-2xl">{expandedSections[question] ? '−' : '+'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <section className="relative left-1/2 mt-16 w-screen -translate-x-1/2 overflow-hidden bg-black py-14 text-white">
          <div className="mx-auto mb-12 max-w-[1480px] px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">Custom Patches Backed by Incredible Reviews</h2>
            <p className="mt-2 text-gray-400">Verified Feedback from Authentic Customers</p>
          </div>

          <div className="space-y-5">
            <div className="review-track review-track-left">
              {[...customerReviews.slice(0, 5), ...customerReviews.slice(0, 5)].map((review, idx) => (
                <article key={`top-${review.name}-${idx}`} className="review-card">
                  <div className="mb-3 flex gap-1 text-yellow-400">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <h3 className="text-[30px] font-light leading-tight">{review.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">Verified buyer</p>
                  <p className="mt-4 text-sm leading-7 text-gray-300">{review.text}</p>
                </article>
              ))}
            </div>

            <div className="review-track review-track-right">
              {[...customerReviews.slice(5), ...customerReviews.slice(5)].map((review, idx) => (
                <article key={`bottom-${review.name}-${idx}`} className="review-card">
                  <div className="mb-3 flex gap-1 text-yellow-400">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <h3 className="text-[30px] font-light leading-tight">{review.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">Verified buyer</p>
                  <p className="mt-4 text-sm leading-7 text-gray-300">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
