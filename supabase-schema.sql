-- Run this in Supabase SQL Editor (https://supabase.com/dashboard -> SQL Editor)

-- Products table
CREATE TABLE products (
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

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can see products)
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);

-- Allow authenticated users full access (Jelena can do anything)
CREATE POLICY "Authenticated full access" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Create admin user in Supabase Auth
-- Go to Authentication -> Users -> Add user
-- Email: jelena@unikatnosiveno.com (or whatever she wants)
-- Password: whatever she chooses
-- Make sure to confirm the email
