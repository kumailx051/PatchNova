import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { Menu, LogOut } from 'lucide-react';
import ProductCatalog from './ProductCatalog';

type Page = 'overview' | 'products';

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.data();
        
        if (userData?.role !== 'admin') {
          navigate('/');
        } else {
          setUser({ ...userData, uid: currentUser.uid, email: currentUser.email });
        }
      } else {
        navigate('/account');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo/Title */}
          <div className="px-6 py-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">Patch Kraze</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2">
            <button
              onClick={() => {
                setCurrentPage('overview');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'overview' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => {
                setCurrentPage('products');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'products' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Product Catalog
            </button>
          </nav>

          {/* User Info */}
          <div className="px-6 py-4 border-t border-gray-700">
            <div className="text-sm">
              <p className="text-gray-400">Logged in as</p>
              <p className="text-white font-semibold">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.firstName} {user?.lastName}</span>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {currentPage === 'overview' && (
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2">$0</p>
                  </div>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Go to <strong>Product Catalog</strong> to upload products via CSV</li>
                    <li>• Upload a CSV file with columns: id, title, handle, vendor, product_type, tags, price, sku, image</li>
                    <li>• Products will be automatically added to your store</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'products' && <ProductCatalog />}
        </div>
      </div>
    </div>
  );
}
