-- ==============================================================================
-- RUN THIS FIX IN SUPABASE SQL EDITOR TO ALLOW FULL DASHBOARD WRITE ACCESS
-- ==============================================================================

-- 1. Projects
DROP POLICY IF EXISTS "Allow public read access on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow admin full access on projects" ON public.projects;
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

-- 2. Certifications
DROP POLICY IF EXISTS "Allow public read access on certifications" ON public.certifications;
DROP POLICY IF EXISTS "Allow admin full access on certifications" ON public.certifications;
CREATE POLICY "Allow all operations on certifications" ON public.certifications FOR ALL USING (true) WITH CHECK (true);

-- 3. Skills
DROP POLICY IF EXISTS "Allow public read access on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow admin full access on skills" ON public.skills;
CREATE POLICY "Allow all operations on skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);

-- 4. Outreach
DROP POLICY IF EXISTS "Allow public read access on outreach" ON public.outreach;
DROP POLICY IF EXISTS "Allow admin full access on outreach" ON public.outreach;
CREATE POLICY "Allow all operations on outreach" ON public.outreach FOR ALL USING (true) WITH CHECK (true);

-- 5. Hobbies
DROP POLICY IF EXISTS "Allow public read access on hobbies" ON public.hobbies;
DROP POLICY IF EXISTS "Allow admin full access on hobbies" ON public.hobbies;
CREATE POLICY "Allow all operations on hobbies" ON public.hobbies FOR ALL USING (true) WITH CHECK (true);
