-- SPA TREATMENT OS — Supabase Schema | Ghost Factory™ Stage 3
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  treatment_name TEXT NOT NULL,
  therapist_name TEXT,
  duration_minutes INTEGER,
  price NUMERIC(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','in-session','completed','cancelled')),
  appointment_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read reservations" ON reservations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update reservations" ON reservations FOR UPDATE USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS therapists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  specialty TEXT,
  bio TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read therapists" ON therapists FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS treatments_menu (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  duration TEXT,
  price NUMERIC(10,2),
  description TEXT,
  is_active BOOLEAN DEFAULT true
);
ALTER TABLE treatments_menu ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read treatments" ON treatments_menu FOR SELECT USING (is_active = true);

CREATE TABLE IF NOT EXISTS client_testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  body TEXT,
  treatment_name TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE client_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read verified testimonials" ON client_testimonials FOR SELECT USING (verified = true);
