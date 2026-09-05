-- Run this in Supabase SQL Editor (https://supabase.com/dashboard -> SQL Editor)
-- This schema includes products, user profiles, orders, wishlists, and auth

-- ============================================
-- PRODUCTS TABLE (existing)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name_sr TEXT NOT NULL,
  subtitle_sr TEXT DEFAULT '',
  description_sr TEXT DEFAULT '',
  story_sr TEXT DEFAULT '',
  category TEXT NOT NULL,
  category_label_sr TEXT DEFAULT '',
  price_rsd INTEGER NOT NULL,
  original_price_rsd INTEGER,
  lead_time_days TEXT DEFAULT '21-30 dana',
  badge TEXT,
  sizes TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  materials_composition TEXT DEFAULT '',
  materials_origin TEXT DEFAULT '',
  materials_care TEXT[] DEFAULT '{}',
  model_info TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true
);

-- ============================================
-- USER PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  loyalty_points INTEGER DEFAULT 0,
  vip_level TEXT DEFAULT 'none' CHECK (vip_level IN ('none', 'silver', 'gold', 'platinum')),
  total_spent INTEGER DEFAULT 0,
  order_count INTEGER DEFAULT 0,
  avatar_url TEXT DEFAULT ''
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  address TEXT NOT NULL,
  apartment TEXT DEFAULT '',
  note TEXT DEFAULT '',
  shipping_method TEXT NOT NULL DEFAULT 'post_express',
  payment_method TEXT NOT NULL DEFAULT 'pouzece',
  is_gift_wrap BOOLEAN DEFAULT false,
  gift_note TEXT DEFAULT '',
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount INTEGER NOT NULL DEFAULT 0,
  items JSONB NOT NULL DEFAULT '[]'
);

-- ============================================
-- WISHLISTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(user_id, product_id)
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PRODUCTS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Public read access" ON products;
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated full access" ON products;
CREATE POLICY "Authenticated full access" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- USER PROFILES POLICIES
-- ============================================
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- ORDERS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own orders" ON orders;
CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin full access on orders" ON orders;
CREATE POLICY "Admin full access on orders" ON orders
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- WISHLISTS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Users can view own wishlist" ON wishlists;
CREATE POLICY "Users can view own wishlist" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own wishlist" ON wishlists;
CREATE POLICY "Users can manage own wishlist" ON wishlists
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- AUTO-CREATE USER PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STORAGE POLICIES
-- ============================================
DROP POLICY IF EXISTS "Public read access for images" ON storage.objects;
CREATE POLICY "Public read access for images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Authenticated upload access" ON storage.objects;
CREATE POLICY "Authenticated upload access" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated delete access" ON storage.objects;
CREATE POLICY "Authenticated delete access" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
