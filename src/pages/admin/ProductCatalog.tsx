import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Trash2, Upload } from 'lucide-react';
import Papa from 'papaparse';

interface Product {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  product_type: string;
  tags: string;
  price: number;
  sku: string;
  image: string;
  docId?: string;
}

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection, limit(100));
      const snapshot = await getDocs(q);
      const productList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      } as Product));
      setProducts(productList);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setMessage('Error fetching products');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    try {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            const productsCollection = collection(db, 'products');
            let successCount = 0;
            let errorCount = 0;

            for (const row of results.data as any[]) {
              try {
                // Skip empty rows
                if (!row.id && !row.title) continue;

                // Parse tags if it's a string representation of array
                let tagsArray = [];
                if (typeof row.tags === 'string' && row.tags.trim()) {
                  try {
                    tagsArray = JSON.parse(row.tags);
                  } catch {
                    tagsArray = row.tags.split(',').map((t: string) => t.trim());
                  }
                }

                const productData = {
                  id: row.id || '',
                  title: row.title || '',
                  handle: row.handle || '',
                  vendor: row.vendor || '',
                  product_type: row.product_type || '',
                  tags: tagsArray,
                  price: parseFloat(row.price) || 0,
                  sku: row.sku || '',
                  image: row.image || '',
                  createdAt: new Date(),
                };

                // Validate required fields
                if (!productData.title || !productData.handle) {
                  console.warn(`Skipping product: Missing title or handle in row:`, row);
                  errorCount++;
                  continue;
                }

                await addDoc(productsCollection, productData);
                successCount++;
              } catch (rowError) {
                console.error('Error processing row:', rowError, row);
                errorCount++;
              }
            }

            if (successCount > 0 || errorCount > 0) {
              setMessage(`Upload complete! ✓ ${successCount} products added${errorCount > 0 ? `, ✕ ${errorCount} errors` : ''}.`);
              setMessageType(successCount > 0 ? 'success' : 'error');
              
              // Refresh product list if any products were added
              if (successCount > 0) {
                await fetchProducts();
              }
            } else {
              setMessage('No valid products found in CSV file.');
              setMessageType('error');
            }
          } catch (error: any) {
            setMessage(`Upload error: ${error.message}`);
            setMessageType('error');
          } finally {
            setUploading(false);
          }
        },
        error: (error: any) => {
          setMessage(`CSV Parse error: ${error.message}`);
          setMessageType('error');
          setUploading(false);
        },
      });
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
      setMessageType('error');
      setUploading(false);
    }
  };

  const handleDeleteProduct = async (docId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', docId));
      setMessage('Product deleted successfully');
      setMessageType('success');
      await fetchProducts();
    } catch (error: any) {
      setMessage(`Error deleting product: ${error.message}`);
      setMessageType('error');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Product Catalog</h2>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Products from CSV</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Upload size={32} className="mx-auto text-gray-400 mb-3" />
            <label className="cursor-pointer">
              <span className="text-emerald-600 font-semibold hover:text-emerald-700">
                Click to upload CSV
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <p className="text-gray-500 text-sm mt-2">or drag and drop</p>
            <p className="text-gray-400 text-xs mt-1">
              CSV must include: id, title, handle, vendor, product_type, tags, price, sku, image
            </p>
          </div>

          {uploading && (
            <div className="mt-4 text-center text-gray-600">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
              <p className="mt-2">Uploading products...</p>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Products ({products.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <p className="mt-2">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No products yet. Upload a CSV to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.docId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-10 w-10 rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.title}</p>
                            <p className="text-xs text-gray-500">{product.handle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {product.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {product.product_type || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDeleteProduct(product.docId!)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
