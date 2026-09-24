-- SPA TREATMENT OS — Seed Data
INSERT INTO therapists (name, specialty, bio, is_available) VALUES
('Camille Dubois', 'Stone Therapy & Bodywork', 'Certified in Swedish, deep tissue and hot stone modalities with 12 years of luxury spa experience.', true),
('Mei-Lin Sato', 'Botanical Facials & Skin Medicine', 'Advanced esthetician specializing in clinical-grade botanical treatments and cryo-firming.', true),
('Aaliyah Banks', 'Thermal Bath Rituals', 'Hydrotherapy specialist trained at European thermal spa institutes.', true),
('Sofia Voss', 'Breathwork & Guided Recovery', 'Certified breathwork facilitator and meditation guide with 8 years experience.', true)
ON CONFLICT DO NOTHING;

INSERT INTO client_testimonials (client_name, rating, body, treatment_name, verified) VALUES
('Isabelle Moreau', 5, 'The basalt stone ritual is unlike anything I have experienced. Complete nervous system reset. I leave a different person.', 'Warm Basalt Stone Restorative', true),
('Celeste Park', 5, 'Camille is extraordinarily gifted. My collagen facial transformed my skin texture in one session. Worth every dollar.', 'Aura Collagen Lift Therapy', true),
('Diana Reeves', 5, 'The hydrotherapy soak is transcendent. The mineral composition and temperature cycling is perfectly calibrated.', 'Mineral Rich Hydrotherapy Soak', true)
ON CONFLICT DO NOTHING;
