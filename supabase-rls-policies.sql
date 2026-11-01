-- ==========================================
-- RLS Policies untuk Admin CRUD
-- Jalankan di Supabase SQL Editor
-- ==========================================

-- Policies untuk INSERT, UPDATE, DELETE (hanya authenticated users)

-- personal_info
CREATE POLICY "Admin insert" ON personal_info FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update" ON personal_info FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete" ON personal_info FOR DELETE TO authenticated USING (true);

-- skills
CREATE POLICY "Admin insert" ON skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update" ON skills FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete" ON skills FOR DELETE TO authenticated USING (true);

-- projects
CREATE POLICY "Admin insert" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update" ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete" ON projects FOR DELETE TO authenticated USING (true);

-- experiences
CREATE POLICY "Admin insert" ON experiences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update" ON experiences FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete" ON experiences FOR DELETE TO authenticated USING (true);

-- education
CREATE POLICY "Admin insert" ON education FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update" ON education FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete" ON education FOR DELETE TO authenticated USING (true);

-- about
CREATE POLICY "Admin insert" ON about FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update" ON about FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete" ON about FOR DELETE TO authenticated USING (true);

-- nav_links
CREATE POLICY "Admin insert" ON nav_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update" ON nav_links FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete" ON nav_links FOR DELETE TO authenticated USING (true);
