import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, LogOut, Check, AlertCircle, ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { auth, signInWithGoogle, logoutUser } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import appLogo from '../assets/images/app_logo_1784776299619.jpg';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTracker?: () => void;
}

export function AuthModal({ isOpen, onClose, onOpenTracker }: AuthModalProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  // Form fields
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Reset errors and inputs on modal open or mode switch
  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const parseFirebaseError = (err: any): string => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Try signing in.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completing.';
      default:
        return err?.message || 'Authentication failed. Please try again.';
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setSuccessMessage('Successfully signed in!');
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!displayName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !password) {
      setError('Please complete all required fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName.trim(),
        });
      }
      setSuccessMessage('Account created successfully! Welcome to Pawsitive Pillow.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError('Please enter your account email address.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccessMessage(`Password reset link sent to ${email}. Check your inbox!`);
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      setSuccessMessage('Successfully signed in with Google!');
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      setError(parseFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setSuccessMessage('Signed out successfully.');
      setTimeout(() => {
        setMode('signin');
      }, 600);
    } catch (err: any) {
      setError('Failed to sign out.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E5D7C6] overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#5C4033] via-[#3D2E2B] to-[#2A1E1C] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white p-1 border-2 border-[#E5C158] plush-shadow">
              <img src={appLogo} alt="Pawsitive Pillow" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Pawsitive Pillow</h2>
              <p className="text-xs text-[#E5C158] font-medium">Firebase Member Portal</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* User Profile View if Signed In */}
          {currentUser ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-[#E5C158] plush-shadow"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#5C4033] text-white text-2xl font-extrabold flex items-center justify-center mx-auto border-4 border-[#E5C158] plush-shadow">
                      {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 bg-[#87A96B] p-1.5 rounded-full text-white border-2 border-white">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-[#3D2E2B]">
                    {currentUser.displayName || 'Pet Parent'}
                  </h3>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>

              {/* Status Info */}
              <div className="bg-white rounded-2xl p-4 border border-[#E5D7C6] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#5C4033]">
                  <span className="font-medium text-gray-500">Account Type</span>
                  <span className="font-bold flex items-center space-x-1 text-[#87A96B]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pawsitive VIP</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#5C4033]">
                  <span className="font-medium text-gray-500">Authentication</span>
                  <span className="font-semibold text-gray-700">Firebase Auth</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                {onOpenTracker && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTracker();
                    }}
                    className="w-full bg-[#F5EFE6] hover:bg-[#E5D7C6] text-[#5C4033] font-bold py-3 px-4 rounded-2xl border border-[#E5D7C6] transition-all flex items-center justify-center space-x-2 text-sm"
                  >
                    <Truck className="w-4 h-4 text-[#87A96B]" />
                    <span>View Saved Orders & Tracking</span>
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 px-4 rounded-2xl border border-red-200 transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{loading ? 'Signing out...' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up / Forgot Password Forms */
            <div>
              {/* Tab Selector (Sign In vs Register) */}
              {mode !== 'forgot' && (
                <div className="flex bg-[#F5EFE6] p-1 rounded-2xl mb-6 border border-[#E5D7C6]">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      mode === 'signin'
                        ? 'bg-white text-[#3D2E2B] shadow-sm'
                        : 'text-[#795548] hover:text-[#3D2E2B]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      mode === 'signup'
                        ? 'bg-white text-[#3D2E2B] shadow-sm'
                        : 'text-[#795548] hover:text-[#3D2E2B]'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* Status Notifications */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start space-x-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-2xl text-xs text-green-700 flex items-start space-x-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form Content */}
              {mode === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5C4033] mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E5D7C6] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E5C158]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#5C4033]">Password</label>
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] font-semibold text-[#C86D51] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white border border-[#E5D7C6] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E5C158]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#5C4033] hover:bg-[#3D2E2B] text-white font-bold py-3 rounded-2xl text-xs transition-all plush-shadow flex items-center justify-center space-x-2"
                  >
                    <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                    <ArrowRight className="w-4 h-4 text-[#E5C158]" />
                  </button>
                </form>
              )}

              {mode === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#5C4033] mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Aniket Dubey"
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E5D7C6] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E5C158]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C4033] mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E5D7C6] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E5C158]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C4033] mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white border border-[#E5D7C6] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E5C158]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C4033] mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E5D7C6] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E5C158]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#5C4033] hover:bg-[#3D2E2B] text-white font-bold py-3 rounded-2xl text-xs transition-all plush-shadow flex items-center justify-center space-x-2 mt-2"
                  >
                    <span>{loading ? 'Creating Account...' : 'Create Member Account'}</span>
                    <Sparkles className="w-4 h-4 text-[#E5C158]" />
                  </button>
                </form>
              )}

              {mode === 'forgot' && (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-[#3D2E2B]">Reset Your Password</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your account email and we'll send a password recovery link.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C4033] mb-1">Account Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E5D7C6] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E5C158]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#5C4033] hover:bg-[#3D2E2B] text-white font-bold py-3 rounded-2xl text-xs transition-all plush-shadow"
                  >
                    {loading ? 'Sending Link...' : 'Send Recovery Link'}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="text-xs font-bold text-[#C86D51] hover:underline"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              )}

              {/* Social Login Divider */}
              {mode !== 'forgot' && (
                <div className="mt-5 pt-4 border-t border-[#E5D7C6]/60">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    className="w-full bg-white hover:bg-[#F5EFE6] text-[#3D2E2B] font-bold py-2.5 px-4 rounded-2xl border border-[#E5D7C6] text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
