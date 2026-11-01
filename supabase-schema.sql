-- ==========================================
-- Supabase Schema for Portfolio
-- Run this in Supabase SQL Editor
-- ==========================================

-- Personal Info (single row)
CREATE TABLE personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_text TEXT NOT NULL,
  role TEXT NOT NULL,
  tagline TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  github TEXT NOT NULL DEFAULT '',
  linkedin TEXT NOT NULL DEFAULT '',
  profile_image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Skills (items stored as JSONB array)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  github TEXT NOT NULL DEFAULT '',
  live_demo TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('backend', 'fullstack', 'api')),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Experiences
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_used TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Education
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  period TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- About (single row, stats & bento items as JSONB)
CREATE TABLE about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  stats JSONB NOT NULL DEFAULT '[]',
  bento_items JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Nav Links
CREATE TABLE nav_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- Enable Row Level Security (read-only public)
-- ==========================================
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read" ON education FOR SELECT USING (true);
CREATE POLICY "Public read" ON about FOR SELECT USING (true);
CREATE POLICY "Public read" ON nav_links FOR SELECT USING (true);

-- ==========================================
-- Seed data (from current portfolio.ts)
-- ==========================================

INSERT INTO personal_info (name, logo_text, role, tagline, email, location, github, linkedin, profile_image)
VALUES (
  'BACK END',
  'portfolio.',
  'Backend Developer',
  'Backend developer yang fokus membangun API yang scalable dan reliable dengan clean architecture dan system design.',
  'danillabert03@gmail.com',
  'Jakarta, Indonesia',
  'https://github.com/danieldaudalberthus',
  'https://www.linkedin.com/in/danieldaudalberthus/',
  '/images/daniel_porto.png'
);

INSERT INTO about (description, stats, bento_items)
VALUES (
  'Saya adalah seorang Backend Developer dengan passion dalam membangun sistem yang scalable, reliable, dan maintainable. Berpengalaman dalam merancang RESTful API, microservices architecture, dan mengelola database baik SQL maupun NoSQL. Saya percaya bahwa kode yang baik bukan hanya tentang fungsionalitas, tetapi juga tentang clean architecture dan developer experience.',
  '[{"label":"Tahun Pengalaman","value":1,"suffix":"+"},{"label":"Project Selesai","value":10,"suffix":"+"},{"label":"Tech Stack","value":5,"suffix":"+"},{"label":"Cup of Coffee","value":999,"suffix":"+"}]',
  '[{"title":"API Development","description":"Membangun RESTful API yang robust dengan authentication, rate limiting, dan comprehensive documentation.","icon":"server","className":"md:col-span-2"},{"title":"Database Design","description":"Merancang schema database yang efisien, query optimization, dan implementasi caching strategy.","icon":"database"},{"title":"Design System","description":"Membangun design system yang konsisten dan reusable untuk aplikasi web.","icon":"palette"},{"title":"Tools Favorit","description":"Tech stack yang sering saya gunakan sehari-hari.","items":["VS Code","Postman","TablePlus","Terminal","Git"],"icon":"wrench","className":"md:col-span-2"},{"title":"Fun Facts","description":"Di luar coding, saya suka eksplorasi hal baru.","items":["Coffee Enthusiast","Open Source Contributor","Tech Blog Reader","Night Owl Coder"],"icon":"sparkles"}]'
);

INSERT INTO skills (category, icon, items, sort_order) VALUES
('Languages', 'code', '[{"name":"JavaScript","level":"Intermediate"},{"name":"TypeScript","level":"Intermediate"},{"name":"PHP","level":"Expert"}]', 0),
('Frameworks', 'layers', '[{"name":"Laravel","level":"Expert"},{"name":"FastAPI","level":"Intermediate"}]', 1),
('Database', 'database', '[{"name":"MySQL","level":"Advanced"}]', 2),
('Other Tools', 'terminal', '[{"name":"Git","level":"Expert"}]', 3);

INSERT INTO projects (title, description, tech_stack, github, live_demo, image, category, sort_order) VALUES
('E-Commerce REST API', 'RESTful API untuk platform e-commerce dengan fitur authentication, product management, cart, dan payment gateway integration. Dibangun dengan clean architecture pattern.', ARRAY['Node.js','Express.js','TypeScript','PostgreSQL','Redis'], 'https://github.com/[USERNAME]/ecommerce-api', '', '/images/projects/ecommerce-api.jpg', 'api', 0),
('Task Management App', 'Fullstack task management application dengan real-time updates menggunakan WebSocket. Mendukung team collaboration, task assignment, dan deadline tracking.', ARRAY['NestJS','TypeScript','PostgreSQL','React','Socket.io'], 'https://github.com/[USERNAME]/task-management', 'https://task-app.example.com', '/images/projects/task-management.jpg', 'fullstack', 1),
('URL Shortener Service', 'High-performance URL shortener dengan analytics dashboard. Menggunakan Redis untuk caching dan rate limiting, mampu handle ribuan request per detik.', ARRAY['Go','Gin','Redis','PostgreSQL','Docker'], 'https://github.com/[USERNAME]/url-shortener', 'https://short.example.com', '/images/projects/url-shortener.jpg', 'backend', 2),
('Blog CMS API', 'Headless CMS untuk blog dengan fitur rich text editor, image upload ke S3, tagging system, dan SEO optimization. Dilengkapi admin dashboard.', ARRAY['Laravel','PHP','MySQL','AWS S3','Vue.js'], 'https://github.com/[USERNAME]/blog-cms', '', '/images/projects/blog-cms.jpg', 'fullstack', 3),
('Authentication Microservice', 'Standalone auth service dengan JWT, refresh token rotation, OAuth2 (Google & GitHub), dan role-based access control. Siap dipakai sebagai shared service.', ARRAY['Node.js','TypeScript','Express.js','MongoDB','Docker'], 'https://github.com/[USERNAME]/auth-service', '', '/images/projects/auth-service.jpg', 'api', 4),
('Real-time Chat API', 'Backend untuk chat application dengan WebSocket, mendukung private message, group chat, typing indicator, dan message history dengan pagination.', ARRAY['FastAPI','Python','WebSocket','MongoDB','Redis'], 'https://github.com/[USERNAME]/chat-api', '', '/images/projects/chat-api.jpg', 'backend', 5);

INSERT INTO experiences (company, role, period, description, tech_used, sort_order) VALUES
('Montoon', 'Freelance Customer Service', 'Jun 2022 - Sekarang', 'Melayani pelanggan dan membantu menyelesaikan masalah yang mereka hadapi pada game Mobile Legends.', ARRAY['Technical Support','Customer Service','Client Service','Service Work'], 0),
('Vinix7', 'Junior Web Developer', 'Jun 2025 - Sep 2025', 'Membangun website untuk sistem. Kolaborasi dengan tim frontend untuk integrasi API. Menulis unit test dan integration test untuk memastikan code quality.', ARRAY['Laravel','PHP','MySQL','Tailwind'], 1);

INSERT INTO education (institution, degree, period, sort_order) VALUES
('Universitas Pancasila', 'S1 Teknik Informatika', '2022 - 2026', 0);

INSERT INTO nav_links (label, href, sort_order) VALUES
('Home', '#home', 0),
('About', '#about', 1),
('Projects', '#projects', 2),
('Skills', '#skills', 3),
('Experience', '#experience', 4),
('Contact', '#contact', 5);
