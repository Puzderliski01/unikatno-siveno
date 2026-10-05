-- Run this in Supabase SQL Editor (https://supabase.com/dashboard -> SQL Editor)
-- Tabela za prijave na bilten (newsletter). Skriptu možeš pokretati više puta —
-- sve je "IF NOT EXISTS", pa ne može da pokvari postojeće tabele.

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  email TEXT NOT NULL UNIQUE
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Posetioci (anon) smeju samo da se prijave
DO $$ BEGIN
  CREATE POLICY "subscribers_insert_anon" ON subscribers
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Samo prijavljeni korisnici (tvoj admin nalog) smeju da čitaju listu prijava
DO $$ BEGIN
  CREATE POLICY "subscribers_select_admin" ON subscribers
    FOR SELECT TO authenticated
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
