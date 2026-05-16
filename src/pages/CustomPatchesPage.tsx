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

export default function CustomPatchesPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<PatchProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<PatchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  // Product type categories to display
  const categories = [
    { type: 'hat', label: 'Custom Patches For Hats' },
    { type: 'shirt', label: 'Custom Patches For Shirts' },
    { type: 'jacket', label: 'Custom Patches For Jackets' },
    { type: 'hoodie', label: 'Custom Patches For Hoodies' },
    { type: 'jeans', label: 'Custom Patches For Jeans' },
    { type: 'pants', label: 'Custom Patches For Pants' },
  ];

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

        // Filter for custom patch products (exclude rush-only items)
        const customProducts = fetchedProducts.filter(
          (p) =>
            !p.tags?.includes('rush-only') &&
            (p.product_type?.toLowerCase().includes('patch') ||
              p.title?.toLowerCase().includes('patch') ||
              p.tags?.some((t) => t.toLowerCase().includes('patch')))
        );

        setProducts(customProducts);
        applySort(customProducts, 'featured');
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
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Custom Patches</h1>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="availability" className="text-sm font-medium text-gray-700">
              Availability
            </label>
            <div className="relative">
              <select className="appearance-none rounded border border-gray-300 bg-white px-3 py-2 text-sm pr-8">
                <option>All products</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 h-4 w-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative">
              <select className="appearance-none rounded border border-gray-300 bg-white px-3 py-2 text-sm pr-8">
                <option>All prices</option>
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

        {/* Products by category */}
        {categories.map((category) => {
          const categoryProducts = filteredProducts.filter((p) =>
            p.product_type?.toLowerCase().includes(category.type)
          );

          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.type} className="mb-12">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">{category.label}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {categoryProducts.map((product) => (
                  <div
                    key={product.docId}
                    onClick={() => handleProductClick(product.handle)}
                    className="cursor-pointer"
                  >
                    <ProductCard
                      product={{
                        slug: product.handle,
                        name: product.title || product.name || 'Custom Patch',
                        price: `$${product.price?.toFixed(2) || '0.00'}`,
                        minQty: '10pc min',
                        description: product.description || 'Custom patch product',
                        imageUrl: product.image || product.imageUrl || '',
                      }}
                      ctaHref={`/products/${product.handle}`}
                      imageUrl={product.image || product.imageUrl}
                      placeholderImageText={product.title || product.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Catch-all for products without specific category */}
        {filteredProducts.filter(
          (p) => !categories.some((c) => p.product_type?.toLowerCase().includes(c.type))
        ).length > 0 && (
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">Other Patches</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {filteredProducts
                .filter(
                  (p) => !categories.some((c) => p.product_type?.toLowerCase().includes(c.type))
                )
                .map((product) => (
                  <div
                    key={product.docId}
                    onClick={() => handleProductClick(product.handle)}
                    className="cursor-pointer"
                  >
                    <ProductCard
                      product={{
                        slug: product.handle,
                        name: product.title || product.name || 'Custom Patch',
                        price: `$${product.price?.toFixed(2) || '0.00'}`,
                        minQty: '10pc min',
                        description: product.description || 'Custom patch product',
                        imageUrl: product.image || product.imageUrl || '',
                      }}
                      ctaHref={`/products/${product.handle}`}
                      imageUrl={product.image || product.imageUrl}
                      placeholderImageText={product.title || product.name}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600">No products found.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
