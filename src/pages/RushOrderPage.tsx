import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { ChevronDown } from 'lucide-react';

interface PatchProduct {
  docId: string;
  id?: string;
  handle: string;
  title: string;
  name?: string;
  price: number;
  description?: string;
  image?: string;
  imageUrl?: string;
  tags?: string[];
  vendor?: string;
  product_type?: string;
  sku?: string;
}

export default function RushOrderPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<PatchProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<PatchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'products'));
        const snapshot = await getDocs(q);
        const fetchedProducts: PatchProduct[] = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...(doc.data() as Omit<PatchProduct, 'docId'>),
        }));

        // Filter for rush-eligible products
        const rushProducts = fetchedProducts.filter(
          (p) =>
            p.tags?.some((t) => t.toLowerCase().includes('rush')) ||
            p.product_type?.toLowerCase().includes('rush') ||
            p.title?.toLowerCase().includes('rush')
        );

        setProducts(rushProducts);
        applySort(rushProducts, 'featured');
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applySort = (productsToSort: PatchProduct[], sortType: string) => {
    let sorted = [...productsToSort];
    switch (sortType) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.reverse();
        break;
      case 'featured':
      default:
        // Keep original order
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    applySort(products, newSort);
  };

  const handlePriceFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    setPriceFilter(filter);

    let filtered = [...products];
    if (filter === '0-50') {
      filtered = filtered.filter((p) => p.price >= 0 && p.price <= 50);
    } else if (filter === '50-100') {
      filtered = filtered.filter((p) => p.price > 50 && p.price <= 100);
    } else if (filter === '100+') {
      filtered = filtered.filter((p) => p.price > 100);
    }

    applySort(filtered, sortBy);
  };

  const handleProductClick = (handle: string) => {
    navigate(`/products/${handle}`);
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-red-600 mx-auto" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Rush Order</h1>
        <p className="mb-8 text-gray-600">
          Select Patches Ship as Fast as 5 Business Days with PatchFast. 10pc Mixes with Free
          Shipping!
        </p>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="availability" className="text-sm font-medium text-gray-700">
              Availability
            </label>
            <div className="relative">
              <select className="appearance-none rounded border border-gray-300 bg-white px-3 py-2 text-sm pr-8">
                <option>In Stock</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 h-4 w-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative">
              <select
                value={priceFilter}
                onChange={handlePriceFilter}
                className="appearance-none rounded border border-gray-300 bg-white px-3 py-2 text-sm pr-8"
              >
                <option value="all">All prices</option>
                <option value="0-50">$0 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100+">$100+</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 h-4 w-4 pointer-events-none" />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="appearance-none rounded border border-gray-300 bg-white px-3 py-2 text-sm pr-8"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product count */}
        <div className="mb-6 text-sm text-gray-600">
          {filteredProducts.length} items
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.docId}
                onClick={() => handleProductClick(product.handle)}
                className="cursor-pointer"
              >
                <ProductCard
                  product={{
                    slug: product.handle,
                    name: product.title || product.name || 'Rush Patch',
                    price: `$${product.price?.toFixed(2) || '0.00'}`,
                    minQty: '10pc min',
                    description: product.description || 'Rush patch product',
                    imageUrl: product.image || product.imageUrl || '',
                  }}
                  ctaHref={`/products/${product.handle}`}
                  imageUrl={product.image || product.imageUrl}
                  placeholderImageText={product.title || product.name}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-600">
              No rush products found. Check back soon for 5-day rush options!
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
