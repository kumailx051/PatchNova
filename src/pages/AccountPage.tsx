import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import PageLayout from '../components/PageLayout';

type Tab = 'login' | 'register';

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('login');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ADMIN_CODE = '1234'; // Simple admin code
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAdminCode, setRegAdminCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      
      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data();
      
      if (userData?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      
      // Determine if user is admin based on admin code
      const isAdmin = regAdminCode === ADMIN_CODE;
      
      // Save user to Firestore with role
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        role: isAdmin ? 'admin' : 'user',
        createdAt: new Date(),
      });
      
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="bg-[#f7f8fa] px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto w-full max-w-[560px]">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
              Hello, sign in
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#35506b] md:text-base">
              Sign in to your account to manage orders, track shipments, and access your saved information.
            </p>
          </div>

          <div className="mt-8 flex overflow-hidden rounded-full border border-[#d9e1ea] bg-white p-1 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <button
              type="button"
              className={`h-11 flex-1 rounded-full px-3 text-sm font-bold transition-colors ${
                tab === 'login' ? 'bg-black text-white' : 'bg-transparent text-black'
              }`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`h-11 flex-1 rounded-full px-3 text-sm font-bold transition-colors ${
                tab === 'register' ? 'bg-black text-white' : 'bg-transparent text-black'
              }`}
              onClick={() => setTab('register')}
            >
              Register
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-[#e5eaf0] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}
            
            {tab === 'login' ? (
              <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-semibold text-black">Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-black px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center text-xs text-[#35506b]">
                <a href="#" className="underline">
                  Forgot password?
                </a>
              </div>
            </form>
            ) : (
              <form className="space-y-5" onSubmit={handleRegister}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-black">First Name</label>
                    <input
                      type="text"
                      required
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                      className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                      placeholder="First"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black">Last Name</label>
                    <input
                      type="text"
                      required
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                      className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                      placeholder="Last"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black">Email</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                    placeholder="Create password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black">Admin Code (Optional)</label>
                  <input
                    type="password"
                    value={regAdminCode}
                    onChange={(e) => setRegAdminCode(e.target.value)}
                    className="mt-2 h-12 w-full rounded-xl border border-[#d9e1ea] bg-white px-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-black"
                    placeholder="Leave blank for regular user"
                  />
                  <p className="mt-1 text-xs text-gray-500">Enter admin code if you're registering as an administrator</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-black px-4 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
