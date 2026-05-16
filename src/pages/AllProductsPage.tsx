import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { ChevronDown } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase';

type PatchProduct = {
  docId: string;
  id?: string;
  handle?: string;
  title?: string;
  name?: string;
  price?: number | string;
  description?: string;
  image?: string;
  imageUrl?: string;
};

function toNumberPrice(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<PatchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'products'));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...(doc.data() as Omit<PatchProduct, 'docId'>),
        }));
        setProducts(fetched);
      } catch (error) {
        console.error('Error fetching all products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    const next = [...products];

    if (sortBy === 'price-low') {
      next.sort((a, b) => toNumberPrice(a.price) - toNumberPrice(b.price));
    } else if (sortBy === 'price-high') {
      next.sort((a, b) => toNumberPrice(b.price) - toNumberPrice(a.price));
    } else if (sortBy === 'name') {
      next.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
    }

    return next;
  }, [products, sortBy]);

  return (
    <PageLayout>
      <div className="mx-auto w-full max-w-[1480px] px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-black">All Products</h1>
        <p className="mt-2 text-sm text-gray-600">Browse all available patch styles.</p>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="text-sm text-gray-600">{sortedProducts.length} items</div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded border border-gray-300 bg-white px-3 py-2 pr-8 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-3 h-4 w-4" />
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product) => {
              const handle = product.handle || product.docId;
              const title = product.title || product.name || 'Custom Patch';
              const price = `$${toNumberPrice(product.price).toFixed(2)}`;

              return (
                <ProductCard
                  key={product.docId}
                  product={{
                    slug: handle,
                    name: title,
                    price,
                    minQty: '10pc min',
                    description: product.description || 'Custom patch product',
                    imageUrl: product.image || product.imageUrl || '',
                  }}
                  ctaHref={`/products/${handle}`}
                  imageUrl={product.image || product.imageUrl}
                  placeholderImageText={title}
                  badgeText="10pc min"
                />
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-600">No products found.</div>
        )}
      </div>
    </PageLayout>
  );
}
