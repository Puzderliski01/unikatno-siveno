import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) onLogin();
    });
  }, [onLogin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Neispravni podaci za prijavu.');
      setLoading(false);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif-luxury text-2xl text-[#c9a96e] tracking-[0.3em] uppercase mb-2">
            Admin Panel
          </h1>
          <p className="text-xs text-[#e8e0d4]/60 font-sans">Unikatno šiveno - Jelena Erić</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#111111] border border-[#c9a96e]/20 p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#e8e0d4]/70 font-sans mb-2">
              Email adresa
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#c9a96e]/20 text-sm text-[#e8e0d4] placeholder-[#e8e0d4]/30 outline-none focus:border-[#c9a96e] transition-colors"
              placeholder="jelena@example.com"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#e8e0d4]/70 font-sans mb-2">
              Lozinka
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 bg-[#0a0a0a] border border-[#c9a96e]/20 text-sm text-[#e8e0d4] placeholder-[#e8e0d4]/30 outline-none focus:border-[#c9a96e] transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e8e0d4]/40 hover:text-[#c9a96e] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#c9a96e] text-[#0a0a0a] font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#e8d098] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Prijava...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Prijava</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
