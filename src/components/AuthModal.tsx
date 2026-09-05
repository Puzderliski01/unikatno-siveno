import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { signIn, signUp } = useAuth();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await signUp(email, password, fullName);
        if (signUpError) {
          setError(signUpError.message);
        } else {
          setSuccess('Nalog je uspešno kreiran! Proverite svoj email za potvrdu.');
          setTimeout(() => {
            handleClose();
          }, 2000);
        }
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          setError('Email ili lozinka nisu ispravni.');
        } else {
          handleClose();
        }
      }
    } catch {
      setError('Došlo je do greške. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#c9a96e]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#c9a96e]/20">
              <div>
                <h2 className="font-serif-luxury text-xl text-[#e8e0d4]">
                  {mode === 'login' ? 'Prijavite se' : 'Kreirajte nalog'}
                </h2>
                <p className="text-[11px] text-[#e8e0d4]/60 mt-1 font-sans">
                  {mode === 'login'
                    ? 'Pristupite svom profilu i porudžbinama'
                    : 'Pridružite se Unikatno šiveno zajednici'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 hover:bg-[#e8e0d4]/5 text-[#e8e0d4] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#c9a96e] font-sans font-medium mb-2">
                    Ime i prezime
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#e8e0d4]/40" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Vaše ime"
                      className="w-full pl-10 pr-4 py-3 bg-[#111111] border border-[#c9a96e]/20 focus:border-[#c9a96e] text-sm text-[#e8e0d4] placeholder-[#e8e0d4]/40 outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c9a96e] font-sans font-medium mb-2">
                  Email adresa
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#e8e0d4]/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vas@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#111111] border border-[#c9a96e]/20 focus:border-[#c9a96e] text-sm text-[#e8e0d4] placeholder-[#e8e0d4]/40 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#c9a96e] font-sans font-medium mb-2">
                  Lozinka
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#e8e0d4]/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full pl-10 pr-12 py-3 bg-[#111111] border border-[#c9a96e]/20 focus:border-[#c9a96e] text-sm text-[#e8e0d4] placeholder-[#e8e0d4]/40 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e8e0d4]/40 hover:text-[#e8e0d4] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-sans">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#c9a96e] hover:bg-[#a7823b] text-[#0a0a0a] font-semibold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {mode === 'login' ? 'Prijavljivanje...' : 'Kreiranje naloga...'}
                  </>
                ) : (
                  mode === 'login' ? 'Prijavite se' : 'Kreirajte nalog'
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-xs text-[#e8e0d4]/60 hover:text-[#c9a96e] transition-colors font-sans"
                >
                  {mode === 'login'
                    ? 'Nemate nalog? Registrujte se'
                    : 'Već imate nalog? Prijavite se'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
