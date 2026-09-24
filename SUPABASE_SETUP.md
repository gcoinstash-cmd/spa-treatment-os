# SPA TREATMENT OS — Supabase Setup Guide
**Ghost Factory™ | Stage 3: Brain Gate | 3-Minute Setup**

## Step 1 — Create Supabase Project
1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Name: `spa-treatment-os` → **Create Project**
3. Copy **Project URL** and **anon public key** from Settings → API

## Step 2 — Run Schema
SQL Editor → paste `supabase/schema.sql` → **Run**
Creates: `reservations`, `therapists`, `treatments_menu`, `client_testimonials`

## Step 3 — Seed Data
SQL Editor → new tab → paste `supabase/seed.sql` → **Run**

## Step 4 — Env Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Admin Access
- **URL**: `https://spa-treatment-os.onrender.com/admin`
- **Passkey**: `spatreatment2026`
- **Demo Button**: `[ 1-CLICK DEMO AUTO-FILL: spatreatment2026 ]`

*Ghost Factory™ — Spa Treatment OS v1.0.0 | Medical/VIP Aesthetics Vault (7/50)*
