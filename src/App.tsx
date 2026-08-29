import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { fetchProducts } from './lib/supabase';

const ProductDetailModal = lazy(() =>
  import('./components/ProductDetailModal').then((m) => ({ default: m.ProductDetailModal }))
);
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
const AdminPage = lazy(() =>
  import('./admin/AdminPage').then((m) => ({ default: m.AdminPage }))
);

function isAdminRoute() {
  return window.location.pathname.startsWith('/admin');
}

export default function App() {
  // Products from Supabase (fallback to hardcoded)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    fetchProducts().then((dbProducts) => {
      if (dbProducts.length > 0) setProducts(dbProducts);
    });
  }, []);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Modal / Drawer visibility states
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
      addToast('Uklonjeno iz liste želja', `${product.nameSr} je uklonjen.`, 'info');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      addToast('Dodato u listu želja', `${product.nameSr} je sačuvan za kasnije.`, 'wishlist');
    }
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, product.sizes[1] || product.sizes[0]);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
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
      
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Main Header & Navigation */}
      <Header
        cartCount={cartTotalCount}
        cartTotal={cartTotalAmount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Full Bleed Luxury Hero Section */}
      <Hero
        onExploreClick={scrollToGallery}
      />

      {/* Main Collection Gallery Grid */}
      <ProductGrid
        products={products}
        wishlistIds={wishlistIds}
        onOpenDetails={handleOpenDetails}
        onOpenZoom={handleOpenZoom}
        onQuickAddToCart={handleQuickAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* About & Slow Fashion Craftsmanship Section */}
      <AboutSection />

      {/* Contact, Atelier Salon & FAQ Section */}
      <ContactSection
        onShowToast={addToast}
      />

      {/* Luxury Footer */}
      <Footer
        onShowToast={addToast}
      />

      {/* Lazy-loaded Modals */}
      <Suspense fallback={null}>
        {/* Product Detail Modal */}
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
        />

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
