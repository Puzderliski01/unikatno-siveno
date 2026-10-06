-- Run this in Supabase SQL Editor (https://supabase.com/dashboard -> SQL Editor)
-- Recenzije i komentari (utisci). Skriptu možeš pokretati više puta — sve je
-- "IF NOT EXISTS", pa ne može da pokvari postojeće tabele.
--
-- Kako radi:
--   * Svako (i gost i prijavljeni korisnik) može da pošalje komentar.
--   * Komentar ulazi sa statusom 'pending' i vidi se tek kad ga odobriš u
--     Admin panel → kartica "Recenzije".
--   * product_id = NULL znači opšti utisak o ateljeu (prikazuje se na početnoj
--     strani u sekciji "Utisci"), inače je komentar vezan za konkretan model.

CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  city TEXT DEFAULT '',
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT DEFAULT '',
  comment TEXT NOT NULL CHECK (char_length(comment) BETWEEN 10 AND 2000),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Indeksi za brzo učitavanje (odobrene recenzije po proizvodu)
CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews (product_id, status);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON product_reviews (status, created_at DESC);

ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- 1) Javno čitanje ISKLJUČIVO odobrenih recenzija
DO $$ BEGIN
  CREATE POLICY "public_read_approved_reviews" ON product_reviews
    FOR SELECT TO anon, authenticated
    USING (status = 'approved');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2) Sme da se ubaci SAMO neodobrena recenzija (status = 'pending'), pa ona
--    mora proći kroz moderaciju u admin panelu. Spam se tako ne vidi javno.
DO $$ BEGIN
  CREATE POLICY "insert_pending_review" ON product_reviews
    FOR INSERT TO anon, authenticated
    WITH CHECK (
      status = 'pending'
      AND char_length(author_name) BETWEEN 2 AND 80
      AND char_length(comment) BETWEEN 10 AND 2000
      AND (user_id IS NULL OR user_id = auth.uid())
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 3) Prijavljeni korisnici (tvoj admin nalog) upravljaju svim recenzijama —
--    odobravanje, odbijanje, izmena i brisanje.
DO $$ BEGIN
  CREATE POLICY "authenticated_full_access_reviews" ON product_reviews
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
