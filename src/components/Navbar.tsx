import React, { useEffect, useState } from 'react';
import { ChevronDown, Menu, Search, ShoppingBag } from 'lucide-react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase';
import logoUrl from '../assets/logo.png';

const categories = [
  { label: 'Embroidery', key: 'Embroidered' },
  { label: 'Full Color Printed Patches', key: 'Printed' },
  { label: 'PVC Rubber', key: 'PVC' },
  { label: 'Leather', key: 'Leather' },
  { label: 'Silicone', key: 'Silicone' },
  { label: 'TPU FLEX Patches', key: 'TPU' },
  { label: 'Woven', key: 'Woven' },
  { label: 'Stickers', key: 'Stickers' },
  { label: 'DTF Transfers', key: 'DTF' },
  { label: 'Ready Made Patches', key: 'Ready' },
  { label: 'Patch Kraze Blanks', key: 'Blanks' },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [firebaseProducts, setFirebaseProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  // Load recently viewed products from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recently viewed products:', error);
    }
  }, []);

  // Fetch all products from Firebase on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, limit(100));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        setFirebaseProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products by category when hovering
  const handleCategoryHover = (categoryKey: string) => {
    setHoveredCategory(categoryKey);
    
    const filtered = firebaseProducts.filter((product) => {
      const productType = (product.product_type || '').toLowerCase();
      const tags = (product.tags || []).map((t: string) => t.toLowerCase());
      const title = (product.title || '').toLowerCase();
      const categoryKeyLower = categoryKey.toLowerCase();
      
      return (
        productType.includes(categoryKeyLower) ||
        tags.some((tag: string) => tag.includes(categoryKeyLower)) ||
        title.includes(categoryKeyLower)
      );
    });
    
    setCategoryProducts(filtered);
  };

  // Filter products based on search query
  useEffect(() => {
    const filtered = firebaseProducts.filter((product) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        (product.title && product.title.toLowerCase().includes(searchTerm)) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.vendor && product.vendor.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredProducts(filtered);
  }, [searchQuery, firebaseProducts]);

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

  const loadCartFromStorage = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(Array.isArray(storedCart) ? storedCart : []);
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCartFromStorage();

    const handleCartUpdated = () => {
      loadCartFromStorage();
    };

    const handleCartOpen = () => {
      loadCartFromStorage();
      setIsCartOpen(true);
    };

    window.addEventListener('cart:updated', handleCartUpdated);
    window.addEventListener('cart:open', handleCartOpen);

    return () => {
      window.removeEventListener('cart:updated', handleCartUpdated);
      window.removeEventListener('cart:open', handleCartOpen);
    };
  }, []);

  const parsePrice = (value: unknown) => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return 0;
    const numeric = Number.parseFloat(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const unitPrice = parsePrice(item.price);
    const quantity = Number(item.quantity) || 0;
    return sum + unitPrice * quantity;
  }, 0);

  const updateItemQuantity = (index: number, nextQty: number) => {
    if (nextQty < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index] = { ...updatedCart[index], quantity: nextQty };
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, currentIndex) => currentIndex !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cart:updated'));
  };

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
              {cartCount}
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
            {cartCount}
          </span>
        </button>
      </div>

      {/* Categories row */}
      <nav className="border-t border-black/10 bg-white relative">
        <div className="mx-auto flex w-full max-w-[1480px] items-center justify-center gap-6 px-4 py-3 text-[13px] sm:px-6 lg:px-8">
          {categories.map((c) => (
            <div
              key={c.label}
              className="relative group"
              onMouseEnter={() => handleCategoryHover(c.key)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-black/90 hover:text-emerald-600 transition-colors"
              >
                <span>{c.label}</span>
                <ChevronDown className="h-4 w-4 text-black/70 group-hover:text-emerald-600 transition-colors" />
              </button>

              {/* Category dropdown */}
              {hoveredCategory === c.key && categoryProducts.length > 0 && (
                <div className="absolute left-0 top-full z-40 mt-0 w-80 bg-white shadow-lg rounded-lg border border-gray-200">
                  <div className="p-4">
                    <div className="text-sm font-bold text-black mb-3">
                      {c.label} Products ({categoryProducts.length})
                    </div>
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                      {categoryProducts.slice(0, 6).map((product) => (
                        <a
                          key={product.docId}
                          href={`/products/${product.handle}`}
                          className="group/item block p-2 rounded hover:bg-gray-50 transition-colors"
                        >
                          {product.image && (
                            <div className="mb-2 h-16 bg-gray-100 rounded overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="text-xs font-medium text-black line-clamp-2 group-hover/item:text-emerald-600">
                            {product.title}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            ${product.price?.toFixed(2) || '0.00'}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            <div className="px-5 py-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-slate-700">
                  Recently Viewed ({recentlyViewed.length})
                </div>
                {recentlyViewed.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('recentlyViewed');
                      setRecentlyViewed([]);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              {recentlyViewed.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p>No recently viewed products</p>
                  <p className="text-xs mt-2">Products will appear here as you browse</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {recentlyViewed.map((item) => (
                    <a
                      key={item.docId}
                      href={`/products/${item.handle}`}
                      className="group block"
                    >
                      <div className="overflow-hidden rounded-md bg-[#f5f6f8] h-24">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-slate-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-xs font-medium leading-tight text-slate-800 line-clamp-2">
                        {item.title}
                      </div>
                      <div className="mt-1 text-xs text-slate-700">
                        ${item.price?.toFixed(2) || '0.00'}
                      </div>
                    </a>
                  ))}
                </div>
              )}
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
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <h2 className="text-[38px] font-light leading-none text-black">Cart <span className="text-sm align-top">{cartCount}</span></h2>
              <button
                type="button"
                aria-label="Close cart"
                className="text-3xl leading-none text-slate-700"
                onClick={() => setIsCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
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
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {cartItems.map((item, index) => {
                    const unitPrice = parsePrice(item.price);
                    const quantity = Number(item.quantity) || 0;

                    return (
                      <div key={`${item.productSlug || item.productName}-${index}`} className="mb-5 border-b border-slate-100 pb-5">
                        <div className="flex gap-3">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded border border-slate-200 bg-slate-100">
                            {item.image ? (
                              <img src={item.image} alt={item.productName || 'Cart item'} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="line-clamp-2 text-[28px] font-light leading-tight text-black sm:text-[30px]">
                              {item.productName || 'Custom Velcro Patches'}
                            </div>
                            <div className="mt-1 text-sm text-slate-700">{item.quantity} inch - 100-199</div>
                            <div className="text-sm text-slate-700">Width: {item.width ?? 2.0}</div>
                            <div className="text-sm text-slate-700">Height: {item.height ?? 2.0}</div>
                            <div className="text-sm text-slate-700">Shape: {item.shape || 'Square'}</div>
                            <div className="text-sm text-slate-700">Backing: {item.backing || 'Heat Applied (Most Popular)'}</div>
                          </div>
                          <div className="shrink-0 text-right text-[24px] font-light text-black sm:text-[26px]">
                            ${(unitPrice * quantity).toFixed(2)} USD
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-center gap-6 text-xl text-black">
                          <button type="button" onClick={() => updateItemQuantity(index, quantity - 1)} className="px-2">−</button>
                          <span className="min-w-6 text-center text-base">{quantity}</span>
                          <button type="button" onClick={() => updateItemQuantity(index, quantity + 1)} className="px-2">+</button>
                          <button type="button" onClick={() => removeItem(index)} className="ml-2 text-sm text-slate-600 hover:text-black">Remove</button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-slate-200 px-4 py-5">
                  <div className="mb-2 flex items-center justify-between text-[24px] font-light text-black">
                    <span>Discount</span>
                    <button type="button" className="text-2xl">+</button>
                  </div>
                  <div className="mb-2 flex items-center justify-between text-[20px] font-light text-black">
                    <span>Estimated total</span>
                    <span>${subtotal.toFixed(2)} USD</span>
                  </div>
                  <p className="mb-4 text-xs text-slate-600">Taxes and shipping calculated at checkout.</p>

                  <a
                    href="/checkout"
                    className="flex h-11 w-full items-center justify-center rounded-full border border-slate-400 text-[16px] font-medium text-slate-800 hover:bg-slate-50"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Check out
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>
      ) : null}
    </header>
  );
}
