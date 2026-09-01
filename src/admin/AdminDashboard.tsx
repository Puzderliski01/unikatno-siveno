import React, { useState, useEffect } from 'react';
import { supabase, DbProduct } from '../lib/supabase';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, LogOut, Upload, X, Save, Image as ImageIcon, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { id: 'haljine', label: 'Haljine' },
  { id: 'tunike', label: 'Tunike' },
  { id: 'blejzeri', label: 'Blejzeri & Kaputi' },
  { id: 'svila', label: 'Korseti' },
  { id: 'majice', label: 'Majice' },
  { id: 'suknje', label: 'Suknje' },
  { id: 'aksesoari', label: 'Aksesoari' },
];

const EMPTY_PRODUCT: Partial<DbProduct> = {
  name_sr: '',
  subtitle_sr: '',
  description_sr: '',
  story_sr: '',
  category: 'haljine',
  category_label_sr: 'Haljine',
  price_rsd: 0,
  original_price_rsd: null,
  lead_time_days: '21-30 dana',
  badge: null,
  sizes: [],
  features: [],
  materials_composition: '',
  materials_origin: '',
  materials_care: [],
  model_info: '',
  images: [],
  thumbnail: '',
  featured: false,
  active: true,
};

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<DbProduct> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newCare, setNewCare] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const uploadedUrls: string[] = [];
    let uploadError = false;
    let urlFetchError = false;

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        uploadError = true;
        continue;
      }
      if (data) {
        const { data: urlData, error } = await supabase.storage
          .from('product-images')
          .getPublicUrl(data.path);
        if (error) {
          console.error('Get public URL error:', error);
          urlFetchError = true;
        } else {
          uploadedUrls.push(urlData.publicUrl);
        }
      }
    }

    if (uploadedUrls.length > 0) {
      setEditingProduct((prev) => {
        if (!prev) return prev;
        const currentImages = prev.images || [];
        return { ...prev, images: [...currentImages, ...uploadedUrls] };
      });
    } else if ((uploadError || urlFetchError) && uploadedUrls.length === 0) {
      alert('Greška prilikom uploadovanja slika. Proverite konekciju i dozvole za Supabase storage bucket "product-images".');
    }

    setUploading(false);
  };

  const handleSave = async () => {
    if (!editingProduct || !editingProduct.name_sr) return;
    setSaving(true);

    const productData = {
      ...editingProduct,
      thumbnail: editingProduct.images?.[0] || '',
    };

    if (editingProduct.id) {
      await supabase.from('products').update(productData).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert([productData]);
    }

    setEditingProduct(null);
    setIsCreating(false);
    await loadProducts();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) return;
    await supabase.from('products').delete().eq('id', id);
    await loadProducts();
  };

  const handleToggleActive = async (product: DbProduct) => {
    await supabase.from('products').update({ active: !product.active }).eq('id', product.id);
    await loadProducts();
  };

  const handleToggleFeatured = async (product: DbProduct) => {
    await supabase.from('products').update({ featured: !product.featured }).eq('id', product.id);
    await loadProducts();
  };

  const removeImage = (index: number) => {
    setEditingProduct((prev) => {
      if (!prev) return prev;
      const newImages = [...(prev.images || [])];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  if (editingProduct || isCreating) {
    return (
      <AdminProductForm
        product={editingProduct || (isCreating ? { ...EMPTY_PRODUCT } : null)}
        isNew={isCreating}
        uploading={uploading}
        saving={saving}
        newFeature={newFeature}
        setNewFeature={setNewFeature}
        newSize={newSize}
        setNewSize={setNewSize}
        newCare={newCare}
        setNewCare={setNewCare}
        onSave={handleSave}
        onCancel={() => { setEditingProduct(null); setIsCreating(false); }}
        onImageUpload={handleImageUpload}
        onChange={(p) => setEditingProduct(p)}
        onRemoveImage={removeImage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d4]">
      {/* Header */}
      <header className="bg-[#111111] border-b border-[#c9a96e]/20 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif-luxury text-xl text-[#c9a96e] tracking-[0.3em] uppercase">
            Admin Panel
          </h1>
          <p className="text-[10px] text-[#e8e0d4]/50 font-sans uppercase tracking-wider">
            Unikatno šiveno - Jelena Erić
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-[#0a0a0a] text-xs font-semibold uppercase tracking-wider hover:bg-[#e8d098] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novi proizvod
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-[#e8e0d4]/50 hover:text-[#c9a96e] transition-colors"
            title="Odjava"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Product List */}
      <div className="max-w-6xl mx-auto p-6">
        {loading ? (
          <div className="text-center py-20 text-[#e8e0d4]/50">Učitavanje...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-[#c9a96e]/20">
            <p className="text-[#e8e0d4]/60 mb-4">Nema proizvoda. Dodajte prvi!</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-6 py-2 bg-[#c9a96e] text-[#0a0a0a] text-xs font-semibold uppercase tracking-wider"
            >
              Dodaj proizvod
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#111111] border border-[#e8e0d4]/10 p-4 flex items-center gap-4 hover:border-[#c9a96e]/30 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-20 overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                  {product.thumbnail ? (
                    <img src={product.thumbnail} alt={product.name_sr} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#e8e0d4]/20">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif-luxury text-sm text-[#e8e0d4] truncate">{product.name_sr}</h3>
                  <p className="text-[10px] text-[#e8e0d4]/50 font-sans uppercase tracking-wider">
                    {product.category_label_sr} · {product.price_rsd.toLocaleString('sr-RS')} RSD
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleActive(product)}
                    className={`p-1.5 transition-colors ${product.active ? 'text-emerald-400' : 'text-[#e8e0d4]/20'}`}
                    title={product.active ? 'Aktivan' : 'Neaktivan'}
                  >
                    {product.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(product)}
                    className={`p-1.5 transition-colors ${product.featured ? 'text-[#c9a96e]' : 'text-[#e8e0d4]/20'}`}
                    title={product.featured ? 'Istaknut' : 'Nije istaknut'}
                  >
                    <Star className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="p-2 text-[#e8e0d4]/50 hover:text-[#c9a96e] transition-colors"
                    title="Izmeni"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-[#e8e0d4]/50 hover:text-red-400 transition-colors"
                    title="Obriši"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Product Form Component
interface AdminProductFormProps {
  product: Partial<DbProduct> | null;
  isNew: boolean;
  uploading: boolean;
  saving: boolean;
  newFeature: string;
  setNewFeature: (v: string) => void;
  newSize: string;
  setNewSize: (v: string) => void;
  newCare: string;
  setNewCare: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onImageUpload: (files: FileList | null) => void;
  onChange: (product: Partial<DbProduct> | null) => void;
  onRemoveImage: (index: number) => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  product,
  isNew,
  uploading,
  saving,
  newFeature,
  setNewFeature,
  newSize,
  setNewSize,
  newCare,
  setNewCare,
  onSave,
  onCancel,
  onImageUpload,
  onChange,
  onRemoveImage,
}) => {
  if (!product) return null;

  const update = (field: string, value: any) => {
    onChange({ ...product, [field]: value });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      update('features', [...(product.features || []), newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (i: number) => {
    const features = [...(product.features || [])];
    features.splice(i, 1);
    update('features', features);
  };

  const addSize = () => {
    if (newSize.trim()) {
      update('sizes', [...(product.sizes || []), newSize.trim()]);
      setNewSize('');
    }
  };

  const removeSize = (i: number) => {
    const sizes = [...(product.sizes || [])];
    sizes.splice(i, 1);
    update('sizes', sizes);
  };

  const addCare = () => {
    if (newCare.trim()) {
      update('materials_care', [...(product.materials_care || []), newCare.trim()]);
      setNewCare('');
    }
  };

  const removeCare = (i: number) => {
    const care = [...(product.materials_care || [])];
    care.splice(i, 1);
    update('materials_care', care);
  };

  const inputClass = "w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#e8e0d4]/15 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e] transition-colors";
  const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-[#e8e0d4]/60 font-sans mb-1.5";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d4]">
      {/* Form Header */}
      <header className="bg-[#111111] border-b border-[#c9a96e]/20 px-6 py-4 flex items-center justify-between">
        <h2 className="font-serif-luxury text-lg text-[#c9a96e]">
          {isNew ? 'Novi proizvod' : 'Izmena proizvoda'}
        </h2>
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-xs text-[#e8e0d4]/60 hover:text-[#e8e0d4] transition-colors">
            Otkaži
          </button>
          <button
            onClick={onSave}
            disabled={saving || !product.name_sr}
            className="flex items-center gap-2 px-6 py-2 bg-[#c9a96e] text-[#0a0a0a] text-xs font-semibold uppercase tracking-wider hover:bg-[#e8d098] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Čuvanje...' : 'Sačuvaj'}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Images */}
        <section>
          <label className={labelClass}>Slike proizvoda</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-3">
            {(product.images || []).map((img, i) => (
              <div key={i} className="relative aspect-[3/4] bg-[#111111] border border-[#e8e0d4]/10 overflow-hidden group">
                <img src={img} alt={`Slika ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => onRemoveImage(i)}
                  className="absolute top-1 right-1 p-1 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-[#c9a96e] text-[#0a0a0a] text-[8px] font-bold uppercase">
                    Glavna
                  </span>
                )}
              </div>
            ))}
            <label className="aspect-[3/4] border-2 border-dashed border-[#e8e0d4]/15 flex flex-col items-center justify-center cursor-pointer hover:border-[#c9a96e]/50 transition-colors">
              <Upload className="w-5 h-5 text-[#e8e0d4]/30 mb-1" />
              <span className="text-[9px] text-[#e8e0d4]/30 uppercase">Dodaj</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onImageUpload(e.target.files)}
                className="hidden"
              />
            </label>
          </div>
          {uploading && <p className="text-xs text-[#c9a96e]">Upload u toku...</p>}
        </section>

        {/* Basic Info */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Naziv proizvoda *</label>
            <input type="text" value={product.name_sr || ''} onChange={(e) => update('name_sr', e.target.value)} className={inputClass} placeholder="npr. Mikado Jakna" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Podnaslov</label>
            <input type="text" value={product.subtitle_sr || ''} onChange={(e) => update('subtitle_sr', e.target.value)} className={inputClass} placeholder="npr. Luksuzna jakna od prirodne svile" />
          </div>
          <div>
            <label className={labelClass}>Kategorija</label>
            <select value={product.category || ''} onChange={(e) => {
              update('category', e.target.value);
              update('category_label_sr', CATEGORIES.find(c => c.id === e.target.value)?.label || '');
            }} className={`${inputClass} appearance-none cursor-pointer`}>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Badge</label>
            <input type="text" value={product.badge || ''} onChange={(e) => update('badge', e.target.value || null)} className={inputClass} placeholder="npr. Novo, Limited" />
          </div>
          <div>
            <label className={labelClass}>Cena (RSD) *</label>
            <input type="number" value={product.price_rsd || ''} onChange={(e) => update('price_rsd', parseInt(e.target.value) || 0)} className={inputClass} placeholder="npr. 45000" />
          </div>
          <div>
            <label className={labelClass}>Stara cena (RSD)</label>
            <input type="number" value={product.original_price_rsd || ''} onChange={(e) => update('original_price_rsd', parseInt(e.target.value) || null)} className={inputClass} placeholder="Ostavite prazno ako nema" />
          </div>
          <div>
            <label className={labelClass}>Rok izrade</label>
            <input type="text" value={product.lead_time_days || ''} onChange={(e) => update('lead_time_days', e.target.value)} className={inputClass} placeholder="npr. 21-30 dana" />
          </div>
          <div>
            <label className={labelClass}>Info o modelu</label>
            <input type="text" value={product.model_info || ''} onChange={(e) => update('model_info', e.target.value)} className={inputClass} placeholder="npr. Model nosi veličinu S" />
          </div>
        </section>

        {/* Description & Story */}
        <section className="space-y-4">
          <div>
            <label className={labelClass}>Opis proizvoda</label>
            <textarea value={product.description_sr || ''} onChange={(e) => update('description_sr', e.target.value)} rows={4} className={`${inputClass} resize-none`} placeholder="Detaljan opis proizvoda..." />
          </div>
          <div>
            <label className={labelClass}>Priča / Inspirisano</label>
            <textarea value={product.story_sr || ''} onChange={(e) => update('story_sr', e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Priča iza ovog komada..." />
          </div>
        </section>

        {/* Sizes */}
        <section>
          <label className={labelClass}>Veličine</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(product.sizes || []).map((size, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 bg-[#111111] border border-[#e8e0d4]/15 text-xs">
                {size}
                <button onClick={() => removeSize(i)} className="text-[#e8e0d4]/40 hover:text-red-400"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newSize} onChange={(e) => setNewSize(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())} className={`${inputClass} flex-1`} placeholder="npr. XS (34), S (36), M (38), Po meri" />
            <button onClick={addSize} className="px-4 py-2 bg-[#1a1a1a] border border-[#e8e0d4]/15 text-xs hover:bg-[#c9a96e]/10 transition-colors">+</button>
          </div>
        </section>

        {/* Features */}
        <section>
          <label className={labelClass}>Karakteristike</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(product.features || []).map((feat, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 bg-[#111111] border border-[#e8e0d4]/15 text-xs">
                {feat}
                <button onClick={() => removeFeature(i)} className="text-[#e8e0d4]/40 hover:text-red-400"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} className={`${inputClass} flex-1`} placeholder="npr. 100% ručni rad" />
            <button onClick={addFeature} className="px-4 py-2 bg-[#1a1a1a] border border-[#e8e0d4]/15 text-xs hover:bg-[#c9a96e]/10 transition-colors">+</button>
          </div>
        </section>

        {/* Materials */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Sastav materijala</label>
            <input type="text" value={product.materials_composition || ''} onChange={(e) => update('materials_composition', e.target.value)} className={inputClass} placeholder="npr. 100% prirodna svila" />
          </div>
          <div>
            <label className={labelClass}>Poreklo materijala</label>
            <input type="text" value={product.materials_origin || ''} onChange={(e) => update('materials_origin', e.target.value)} className={inputClass} placeholder="npr. Italija, Japan" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Održavanje</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(product.materials_care || []).map((care, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-[#111111] border border-[#e8e0d4]/15 text-xs">
                  {care}
                  <button onClick={() => removeCare(i)} className="text-[#e8e0d4]/40 hover:text-red-400"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={newCare} onChange={(e) => setNewCare(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCare())} className={`${inputClass} flex-1`} placeholder="npr. Samo hemijsko čišćenje" />
              <button onClick={addCare} className="px-4 py-2 bg-[#1a1a1a] border border-[#e8e0d4]/15 text-xs hover:bg-[#c9a96e]/10 transition-colors">+</button>
            </div>
          </div>
        </section>

        {/* Toggles */}
        <section className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={product.active ?? true} onChange={(e) => update('active', e.target.checked)} className="w-4 h-4 accent-[#c9a96e]" />
            <span className="text-xs text-[#e8e0d4]/70">Aktivan (vidljiv na sajtu)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={product.featured ?? false} onChange={(e) => update('featured', e.target.checked)} className="w-4 h-4 accent-[#c9a96e]" />
            <span className="text-xs text-[#e8e0d4]/70">Istaknut</span>
          </label>
        </section>
      </div>
    </div>
  );
};
