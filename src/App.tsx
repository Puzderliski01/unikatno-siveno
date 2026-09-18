import React, { useState, Suspense, lazy, useEffect, useCallback, useRef } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS, FORMAT_RSD } from './data/products';
import { Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductGrid } from './components/ProductGrid';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { fetchProducts } from './lib/supabase';
import { UserProfile } from './components/UserProfile';
import { VIPBenefitsModal } from './components/VIPBenefitsModal';
import { BlogSection } from './components/BlogSection';
import { NotificationBell } from './components/NotificationBell';
import { AuthModal } from './components/AuthModal';
import { AuthProvider, useAuth } from './lib/auth';
import { RecentlyViewed } from './components/RecentlyViewed';
import { FloatingActionBar } from './components/FloatingActionBar';
import { OutfitBuilder } from './components/OutfitBuilder';
import { LuxuryLoadingScreen } from './components/LuxuryLoadingScreen';
import { CursorEffects } from './components/CursorEffects';
import { PersonalizedRecommendations } from './components/PersonalizedRecommendations';
import { usePersonalization } from './hooks/usePersonalization';
import { useRealtimeStock } from './hooks/useRealtimeStock';
import { useScrollSwing } from './hooks/useScrollSwing';

const CartDrawer = lazy(() =>
  import('./components/CartDrawer').then((m) => ({ default: m.CartDrawer }))
);
const CheckoutModal = lazy(() =>
  import('./components/CheckoutModal').then((m) => ({ default: m.CheckoutModal }))
);
const WishlistModal = lazy(() =>
  import('./components/WishlistModal').then((m) => ({ default: m.WishlistModal }))
);
const ImageLightbox = lazy(() =>
  import('./components/ImageLightbox').then((m) => ({ default: m.ImageLightbox }))
);
const FittingBookingModal = lazy(() =>
  import('./components/FittingBookingModal').then((m) => ({ default: m.FittingBookingModal }))
);
const AdminPage = lazy(() =>
  import('./admin/AdminPage').then((m) => ({ default: m.AdminPage }))
);

function isAdminRoute() {
  return window.location.pathname.startsWith('/admin');
}

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const openLogin = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  // Products from Supabase (fallback to hardcoded)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    fetchProducts().then((dbProducts) => {
      const validProducts = dbProducts.filter(p => p.images && p.images.length > 0 && p.images[0]);
      if (validProducts.length > 0) setProducts(validProducts);
    });
  }, []);

  // Personalization
  const {
    trackView: trackProductView,
    trackWishlist: trackWishlistBehavior,
    trackCart: trackCartBehavior,
    trackSize: trackSizeBehavior,
    getRecommended,
    hasBehavior,
  } = usePersonalization(products);

  // Real-time stock from Supabase
  const { getStock } = useRealtimeStock(products);

  // Scroll velocity → swing CSS variable
  useScrollSwing();

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Recently viewed products
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    } catch { return []; }
  });

  // Outfit builder state
  const [outfitItems, setOutfitItems] = useState<Product[]>([]);
  const [isOutfitOpen, setIsOutfitOpen] = useState(false);

  // Modal / Drawer visibility states
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isVipOpen, setIsVipOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Image Lightbox zoom state
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Loading screen
  const [isLoading, setIsLoading] = useState(true);

  // Theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Update meta theme-color for mobile browser chrome
    const meta = document.getElementById('theme-color-meta') as HTMLMetaElement | null;
    if (meta) meta.content = theme === 'light' ? '#f5f0e8' : '#0a0a0a';
  }, [theme]);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const addToast = (title: string, description: string, type: 'cart' | 'wishlist' | 'booking' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Track recently viewed
  const trackRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 12);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, customMeasurements?: any) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.size === size && !customMeasurements
    );

    if (existingIndex > -1 && !customMeasurements) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${Date.now()}`,
        product,
        size,
        quantity: 1,
        customMeasurements,
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    addToast(
      'Dodato u korpu',
      `${product.nameSr} (Veličina: ${size}) se nalazi u vašoj korpi.`,
      'cart'
    );
    trackCartBehavior(product);
  };

  const handleQuickAddToCart = (product: Product, size: string) => {
    handleAddToCart(product, size);
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    addToast('Uklonjeno iz korpe', 'Artikal je uspešno uklonjen.', 'info');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      trackWishlistBehavior(product.id, false);
      addToast('Uklonjeno iz liste želja', `${product.nameSr} je uklonjen.`, 'info');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      trackWishlistBehavior(product.id, true);
      addToast('Dodato u listu želja', `${product.nameSr} je sačuvan za kasnije.`, 'wishlist');
    }
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[1] || product.sizes[0]);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // User Profile Handler
  const handleOpenUserProfile = () => {
    setIsUserProfileOpen(true);
  };

  // VIP Benefits Handler
  const handleOpenVIPBenefits = () => {
    setIsVipOpen(true);
  };

  // Zoom / Lightbox Handlers
  const handleOpenZoom = (product: Product, index: number = 0) => {
    setLightboxImages(product.images);
    setLightboxIndex(index);
    setLightboxAlt(product.nameSr);
    setIsLightboxOpen(true);
  };

  // Product Detail Modal
  const handleOpenDetails = (product: Product) => {
    setSelectedProductForDetail(product);
    setIsDetailOpen(true);
    trackRecentlyViewed(product.id);
    trackProductView(product);
  };

  const scrollToGallery = () => {
    const el = document.getElementById('kolekcija');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Outfit Builder handlers
  const handleAddToOutfit = (product: Product) => {
    if (outfitItems.find((p) => p.id === product.id)) {
      setOutfitItems((prev) => prev.filter((p) => p.id !== product.id));
      addToast('Uklonjeno iz outfita', `${product.nameSr} je uklonjen.`, 'info');
    } else {
      setOutfitItems((prev) => [...prev, product]);
      addToast('Dodato u outfit', `${product.nameSr} je dodat u vaš outfit builder.`, 'info');
    }
  };

  const handleRemoveFromOutfit = (productId: string) => {
    setOutfitItems((prev) => prev.filter((p) => p.id !== productId));
  };

  // WhatsApp cart recovery message
  const handleWhatsAppRecovery = () => {
    if (cartItems.length === 0) return;
    const items = cartItems.map((i) => `• ${i.product.nameSr} (${i.size})`).join('%0A');
    const total = FORMAT_RSD(cartTotalAmount);
    const msg = `Zdravo, zanima me kupovina:%0A%0A${items}%0A%0AUkupno: ${total}%0A%0AHvala!`;
    window.open(`https://wa.me/38163616071?text=${msg}`, '_blank');
  };

  const cartTotalAmount = cartItems.reduce((acc, i) => acc + i.product.priceRSD * i.quantity, 0);
  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Admin route
  if (isAdminRoute()) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#e8e0d4]/50">Učitavanje...</div>}>
        <AdminPage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d4] selection:bg-[#c9a96e]/30 selection:text-[#e8e0d4]">
      
      {/* Atmospheric vignette — always-on cinematic border darkening */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.45) 100%)' }}
      />

      {/* Luxury Loading Screen */}
      <LuxuryLoadingScreen isLoading={isLoading} />

      {/* Cursor Effects (spotlight + trail + custom cursor) */}
      <CursorEffects />

      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Theme Toggle - integrated in FloatingActionBar */}

      {/* Main Header & Navigation */}
      <Header
        cartCount={cartTotalCount}
        cartTotal={cartTotalAmount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenUserProfile={user ? handleOpenUserProfile : openLogin}
        onOpenVIPBenefits={handleOpenVIPBenefits}
        onOpenLogin={openLogin}
        onOpenSignup={openSignup}
      />

      {/* Full Bleed Luxury Hero Section */}
      <Hero
        onExploreClick={scrollToGallery}
      />

      {/* Personalized Recommendations or Login Prompt */}
      {!user ? (
        <section className="py-12 bg-[#0a0a0a] text-[#e8e0d4] relative border-b border-[#c9a96e]/20">
          <div className="max-w-xl mx-auto px-4 text-center">
            <Sparkles className="w-5 h-5 text-[#c9a96e] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#e8e0d4] mb-2">Personalizovano iskustvo</h3>
            <p className="text-xs text-[#e8e0d4]/60 mb-5 font-sans">Prijavite se ili kreirajte nalog da biste dobili personalizovane preporuke na osnovu vaših preferencija.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => { setAuthModalMode('login'); setAuthModalOpen(true); }}
                className="px-6 py-2.5 bg-[#c9a96e] text-[#0a0a0a] text-xs font-semibold uppercase tracking-wider hover:bg-[#e8d098] transition-colors font-sans"
              >
                Prijavi se
              </button>
              <button
                onClick={() => { setAuthModalMode('signup'); setAuthModalOpen(true); }}
                className="px-6 py-2.5 border border-[#c9a96e]/40 text-[#c9a96e] text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a96e]/10 transition-colors font-sans"
              >
                Registruj se
              </button>
            </div>
          </div>
        </section>
      ) : hasBehavior && (
        <PersonalizedRecommendations
          products={getRecommended()}
          onOpenDetails={handleOpenDetails}
        />
      )}

      {/* Main Collection Gallery Grid */}
      <ProductGrid
        products={products}
        wishlistIds={wishlistIds}
        onOpenDetails={handleOpenDetails}
        onOpenZoom={handleOpenZoom}
        onQuickAddToCart={handleQuickAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onAddToOutfit={handleAddToOutfit}
        outfitIds={outfitItems.map(p => p.id)}
        getStock={getStock}
      />

      {/* Recently Viewed Products */}
      <RecentlyViewed
        productIds={recentlyViewedIds}
        allProducts={products}
        onOpenDetails={handleOpenDetails}
      />

      {/* Blog Section */}
      <BlogSection />

      {/* About & Slow Fashion Craftsmanship Section */}
      <AboutSection />

      {/* Gift Registry Banner */}
      <section className="py-16 bg-[#0a0a0a] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gift-registry-banner p-8 sm:p-12 text-center relative z-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-sans font-medium mb-3">
              <span>✨</span>
              <span>Liste za Venčanja</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#e8e0d4] mb-3 font-normal">
              Vaša lista želja za poseban dan
            </h3>
            <p className="text-xs sm:text-sm text-[#e8e0d4]/70 mb-6 max-w-lg mx-auto leading-relaxed">
              Kreirajte personalizovanu listu želja za venčanje i podelite je sa gostima. Svaki komad je ručno šiven sa ljubavlju.
            </p>
            <button
              type="button"
              onClick={() => addToast('Uskoro dostupno', 'Funkcija listi za venčanja će uskoro biti dostupna.', 'info')}
              className="shine-btn px-8 py-3 bg-transparent border border-[#c9a96e] text-[#c9a96e] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#c9a96e]/10 transition-colors"
            >
              Saznajte više
            </button>
          </div>
        </div>
      </section>

      {/* Contact, Atelier Salon & FAQ Section */}
      <ContactSection
        onShowToast={addToast}
      />

      {/* Luxury Footer */}
      <Footer
        onShowToast={addToast}
      />

      {/* Floating Action Button */}
      <FloatingActionBar
        onWhatsApp={handleWhatsAppRecovery}
        onCall={() => window.open('tel:+38163616071', '_blank')}
        onBooking={() => addToast('Zakazivanje', 'Kontaktirajte nas putem WhatsApp-a za zakazivanje termina.', 'info')}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      />

      {/* Outfit Builder */}
      <OutfitBuilder
        isOpen={isOutfitOpen}
        onToggle={() => setIsOutfitOpen(!isOutfitOpen)}
        outfitItems={outfitItems}
        onRemove={handleRemoveFromOutfit}
        onOpenDetails={handleOpenDetails}
        onAddToCart={handleQuickAddToCart}
      />

      {/* Product Detail Modal (eager-loaded) */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={isDetailOpen}
        isWishlisted={selectedProductForDetail ? wishlistIds.includes(selectedProductForDetail.id) : false}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedProductForDetail(null);
        }}
        onAddToCart={handleAddToCart}
        onOpenZoom={handleOpenZoom}
        onToggleWishlist={handleToggleWishlist}
        onAddToOutfit={handleAddToOutfit}
        isInOutfit={selectedProductForDetail ? outfitItems.some(p => p.id === selectedProductForDetail.id) : false}
      />

      {/* Lazy-loaded Modals */}
      <Suspense fallback={null}>
        {/* Mini-Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateCartQty}
          onRemoveItem={handleRemoveCartItem}
          onProceedToCheckout={() => setIsCheckoutOpen(true)}
          onExploreCollection={scrollToGallery}
        />

        {/* Checkout Flow Modal (Serbia Exclusive) */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          cartItems={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderCompleted={(orderId) => {
            setCartItems([]);
            addToast(
              'Porudžbina uspešna',
              `Vaša porudžbina #${orderId} je zabeležena. Hvala vam na poverenju!`,
              'info'
            );
          }}
        />

        {/* Wishlist Modal */}
        <WishlistModal
          isOpen={isWishlistOpen}
          wishlistProducts={wishlistProducts}
          onClose={() => setIsWishlistOpen(false)}
          onRemoveFromWishlist={handleToggleWishlist}
          onMoveToCart={handleMoveWishlistToCart}
          onOpenDetails={handleOpenDetails}
        />

        {/* User Profile Modal */}
        <UserProfile
          isOpen={isUserProfileOpen}
          onClose={() => setIsUserProfileOpen(false)}
        />

        {/* VIP Benefits Modal */}
        <VIPBenefitsModal
          isOpen={isVipOpen}
          onClose={() => setIsVipOpen(false)}
        />

        {/* Auth Modal (Login/Signup) */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
        />

        {/* High-Resolution Image Lightbox Zoom */}
        <ImageLightbox
          isOpen={isLightboxOpen}
          images={lightboxImages}
          currentIndex={lightboxIndex}
          altText={lightboxAlt}
          onClose={() => setIsLightboxOpen(false)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
          onSelectIndex={(idx) => setLightboxIndex(idx)}
        />
      </Suspense>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
