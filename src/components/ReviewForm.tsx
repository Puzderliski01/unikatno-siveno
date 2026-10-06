import React, { useState } from 'react';
import { Check, Send, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { submitReview } from '../lib/reviews';
import { useAuth } from '../lib/auth';
import { StarInput } from './Stars';

interface ReviewFormProps {
  /** null → opšti utisak o ateljeu */
  productId: string | null;
  products?: Product[];
  /** prikazuje padajuću listu modela (koristi se na početnoj strani) */
  allowProductChoice?: boolean;
  onSubmitted: () => void;
  onCancel?: () => void;
  /** uklanja ivicu forme (kada je već uokvirena spoljašnjim panelom) */
  bare?: boolean;
  className?: string;
}

const inputClass =
  'w-full px-3 py-2.5 bg-[#1a1a1a] border border-[#e8e0d4]/20 text-xs text-[#e8e0d4] placeholder-[#e8e0d4]/35 outline-none focus:border-[#c9a96e] transition-colors font-sans';
const labelClass =
  'block text-[10px] uppercase tracking-[0.2em] text-[#a08540] font-sans font-semibold mb-1.5';

/**
 * Forma za slanje recenzije / utiska. Radi i za goste i za prijavljene
 * korisnike — komentar uvek prvo ide na odobrenje.
 */
export const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  products,
  allowProductChoice = false,
  onSubmitted,
  onCancel,
  bare = false,
  className = '',
}) => {
  const { user, profile } = useAuth();
  const defaultName = profile?.full_name || (user?.user_metadata?.full_name as string) || '';

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState(defaultName);
  const [city, setCity] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(productId ?? '');
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    if (!honeypot && rating === 0) {
      setResult({ ok: false, message: 'Izaberite ocenu od 1 do 5 zvezdica.' });
      return;
    }

    setSending(true);
    const resolvedProductId = allowProductChoice ? selectedProduct || null : productId;
    const res = await submitReview({
      productId: resolvedProductId,
      authorName,
      city,
      rating,
      title,
      comment,
      userId: user?.id ?? null,
      honeypot,
    });
    setSending(false);
    setResult(res);

    if (res.ok) {
      setRating(0);
      setTitle('');
      setComment('');
      onSubmitted();
    }
  };

  if (result?.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-5 bg-[#111111] border border-emerald-600/40 text-center ${className}`}
      >
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-600/15 border border-emerald-500/40 flex items-center justify-center">
          <Check className="w-5 h-5 text-emerald-400" />
        </div>
        <p className="text-xs text-[#e8e0d4] font-sans leading-relaxed">{result.message}</p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#c9a96e] hover:underline font-sans"
        >
          Napiši još jedan
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 sm:p-5 bg-[#111111] ${bare ? '' : 'border border-[#c9a96e]/25'} ${className}`}
      noValidate
    >
      <div className="flex items-center gap-2 mb-4">
        <Send className="w-3.5 h-3.5 text-[#c9a96e]" />
        <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#e8e0d4] font-sans font-semibold">
          {productId ? 'Ostavi komentar uz model' : 'Ostavi svoj utisak'}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="sm:col-span-2">
          <label className={labelClass}>Vaša ocena *</label>
          <StarInput value={rating} onChange={setRating} />
        </div>

        {allowProductChoice && products && (
          <div className="sm:col-span-2">
            <label className={labelClass}>Model na koji se odnosi (opciono)</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">Opšti utisak o ateljeu</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nameSr}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="sm:col-span-2">
          <label className={labelClass}>Naslov (opciono)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="npr. Oduševljena krojem"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Vaš komentar *</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={2000}
            placeholder="Kako vam pristaje, kakav je kvalitet, kako je protekla izrada po meri..."
            className={`${inputClass} resize-none`}
          />
          <div className="mt-1 text-right text-[10px] text-[#e8e0d4]/35 font-mono">
            {comment.length}/2000
          </div>
        </div>

        <div>
          <label className={labelClass}>Ime *</label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={80}
            placeholder="Vaše ime"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Grad (opciono)</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={60}
            placeholder="npr. Beograd"
            className={inputClass}
          />
        </div>

        {/* Honeypot — popunjavaju ga samo botovi, ljudi ga ne vide */}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
      </div>

      {result && !result.ok && (
        <p className="mt-3 text-[11px] text-red-400 font-sans">{result.message}</p>
      )}

      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="submit"
          disabled={sending}
          className="px-6 py-3 bg-[#c9a96e] text-[#0a0a0a] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#e8d098] transition-colors disabled:opacity-50 font-sans"
        >
          {sending ? 'Šaljem...' : 'Pošalji komentar'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#e8e0d4]/50 hover:text-[#e8e0d4] transition-colors font-sans"
          >
            Otkaži
          </button>
        )}
        <span className="flex items-start gap-1.5 text-[10px] text-[#e8e0d4]/45 font-sans leading-relaxed">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c9a96e] flex-shrink-0 mt-px" />
          Komentar pregleda atelje pre objave — objavljujemo samo iskrena iskustva.
        </span>
      </div>
    </form>
  );
};
