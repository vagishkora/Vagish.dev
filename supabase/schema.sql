-- ==============================================================================
-- SUPABASE SCHEMA & SEED DATA FOR VAGISH.DEV PORTFOLIO
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  badge TEXT NOT NULL DEFAULT 'FEATURED',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  link TEXT,
  tags TEXT[] DEFAULT '{}',
  accent TEXT DEFAULT 'indigo',
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
  id SERIAL PRIMARY KEY,
  cert_id TEXT,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  key TEXT NOT NULL,
  vertical BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'ISSUED',
  view_link TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SKILLS (TECHNICAL ARSENAL) TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. OUTREACH & LEADERSHIP TABLE
CREATE TABLE IF NOT EXISTS public.outreach (
  id TEXT PRIMARY KEY,
  badge TEXT NOT NULL,
  title TEXT NOT NULL,
  role TEXT NOT NULL,
  org TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  accent TEXT DEFAULT 'cyan',
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. HOBBIES (PERSONAL INTERESTS) TABLE
CREATE TABLE IF NOT EXISTS public.hobbies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hobbies ENABLE ROW LEVEL SECURITY;

-- Allow all operations for public & authenticated (Dashboard write + Portfolio read)
DROP POLICY IF EXISTS "Allow all operations on projects" ON public.projects;
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on certifications" ON public.certifications;
CREATE POLICY "Allow all operations on certifications" ON public.certifications FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on skills" ON public.skills;
CREATE POLICY "Allow all operations on skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on outreach" ON public.outreach;
CREATE POLICY "Allow all operations on outreach" ON public.outreach FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on hobbies" ON public.hobbies;
CREATE POLICY "Allow all operations on hobbies" ON public.hobbies FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- SEED DATA (INITIAL POPULATION)
-- ==============================================================================

-- Clean previous seed if re-running
TRUNCATE TABLE public.projects, public.certifications, public.skills, public.outreach, public.hobbies;

-- Seed: Projects
INSERT INTO public.projects (id, badge, title, description, image, link, tags, accent, order_index) VALUES
('PROJ-WEB-000', 'INTERACTIVE EXP', 'Birthday Site', 'High-performance interactive web experience featuring 60fps canvas particles, 3D holographic tilt-cards, dynamic sound integration, and a gamified constellation puzzle.', '/Vagish.dev/assets/Birthday.webp', 'https://github.com/vagishkora/Birthday-template', ARRAY['Vanilla JS', 'HTML5 Canvas', 'Web Audio', 'Interactive 3D'], 'indigo', 0),
('PROJ-FIN-000', 'AI FINTECH PWA', 'Wealth Nest — AI Finance', 'Intelligent financial assistant and Progressive Web App for tracking equities, mutual funds, automated portfolio rebalancing, and smart budget analytics with real-time telemetry.', '/Vagish.dev/assets/Wealthnest.webp', 'https://github.com/vagishkora/WealthNest', ARRAY['Next.js', 'LIVE PWA', 'Tailwind CSS', 'Financial AI'], 'emerald', 1),
('PROJ-SEC-001', 'CYBER SECURITY', 'AI for Identifying Threats', 'Deep dive into dynamic and static malware analysis techniques in sandboxed environments, utilizing machine learning models for automated heuristic threat detection.', '/Vagish.dev/assets/cybersecurity.webp', 'https://github.com/vagishkora/-AI-for-Identifying-Cybersecurity-Threats', ARRAY['Security', 'Reverse Engineering', 'Threat Modeling', 'Python'], 'cyan', 2),
('PROJ-AI-002', 'COMPUTER VISION', 'Face Recognition Biometrics', 'Real-time edge biometric surveillance and identity verification system using OpenCV computer vision pipelines and deep neural network embeddings.', '/Vagish.dev/assets/face-recognition.webp', 'https://github.com/vagishkora', ARRAY['Python', 'OpenCV', 'Deep Learning', 'Biometrics'], 'indigo', 3);

-- Seed: Certifications
INSERT INTO public.certifications (cert_id, title, issuer, key, vertical, status, view_link, order_index) VALUES
('CERT-001', 'Ethical Hacking Workshop', 'Ethical Edufabrica Pvt Ltd', '/Vagish.dev/certificates/iicsbanglore.webp', false, 'ISSUED', '/Vagish.dev/certificates/iicsbanglore.webp', 0),
('CERT-002', 'Cybersecurity Job Simulation', 'Mastercard', '/Vagish.dev/certificates/Cybersecurity Job Simulation Mastercard_page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/Cybersecurity Job Simulation Mastercard_page-0001.webp', 1),
('CERT-003', 'Cybersecurity Analyst', 'Tata', '/Vagish.dev/certificates/Cybersecurity Analyst Job Simulation TATA - Forage_page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/Cybersecurity Analyst Job Simulation TATA - Forage_page-0001.webp', 2),
('CERT-004', 'AI & Data Analytics', 'AICTE', '/Vagish.dev/certificates/Vagish N Kora_AICTE_Certificate_page-0001.webp', true, 'ISSUED', '/Vagish.dev/certificates/Vagish N Kora_AICTE_Certificate_page-0001.webp', 3),
('CERT-005', 'Internship Completion', 'Karunadu Tech', '/Vagish.dev/certificates/karunadu internship certificate_page-0001.webp', true, 'ISSUED', '/Vagish.dev/certificates/karunadu internship certificate_page-0001.webp', 4),
('CERT-006', 'Data Visualization', 'Accenture', '/Vagish.dev/certificates/accenture data_visulatization_completion_certificate_page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/accenture data_visulatization_completion_certificate_page-0001.webp', 5),
('CERT-007', 'Data Plus Overview', 'TCS', '/Vagish.dev/certificates/TSC Data Plus Overview Course_page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/TSC Data Plus Overview Course_page-0001.webp', 6),
('CERT-008', 'Hashgraph Developer', 'Hedera', '/Vagish.dev/certificates/Vagish_Kora_Hashgraph Developer Course_certificate_page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/Vagish_Kora_Hashgraph Developer Course_certificate_page-0001.webp', 7),
('CERT-009', 'Career Edge', 'TCS', '/Vagish.dev/certificates/Tcs Certificate._page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/Tcs Certificate._page-0001.webp', 8),
('CERT-010', 'Fundamentals of AI & ML', 'Course Completion', '/Vagish.dev/certificates/Fundamentals of AI&ML certification_page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/Fundamentals of AI&ML certification_page-0001.webp', 9),
('CERT-011', 'AI for Metaverse', 'Metaverse Cert', '/Vagish.dev/certificates/Introduction to AI For Metaverse Certification_page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/Introduction to AI For Metaverse Certification_page-0001.webp', 10),
('CERT-012', 'Info & Cyber Security', 'Fundamentals', '/Vagish.dev/certificates/Fundamentals of Information Security-Cyber Security_page-0001.webp', false, 'ISSUED', '/Vagish.dev/certificates/Fundamentals of Information Security-Cyber Security_page-0001.webp', 11);

-- Seed: Skills
INSERT INTO public.skills (id, name, icon, category, order_index) VALUES
('SYS_01', 'Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'Languages', 0),
('SYS_02', 'C Programming', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', 'Languages', 1),
('SYS_03', 'Java', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'Languages', 2),
('SYS_04', 'JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'Languages', 3),
('SYS_05', 'ReactJS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'Frameworks', 4),
('SYS_06', 'Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'Backend', 5),
('SYS_07', 'HTML5 / CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'Frontend', 6),
('SYS_08', 'MySQL', 'https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg', 'Databases', 7),
('SYS_09', 'Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 'DevOps', 8),
('SYS_10', 'Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'Tools', 9),
('SYS_11', 'Linux', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', 'Operating Systems', 10),
('SYS_12', 'Wireshark', 'https://www.vectorlogo.zone/logos/wireshark/wireshark-icon.svg', 'Security', 11),
('SYS_13', 'SQL Injection', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqldeveloper/sqldeveloper-original.svg', 'Security', 12),
('SYS_14', 'PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 'Databases', 13),
('SYS_15', 'Supabase', 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg', 'Cloud Database', 14);

-- Seed: Outreach
INSERT INTO public.outreach (id, badge, title, role, org, location, date, image, description, skills, accent, order_index) VALUES
('LEAD-ACM-01', 'CORE LEADERSHIP', 'Technical Co-Head', 'Tech Co-Head', 'ACM Student Chapter • NMAMIT', 'Nitte, Karnataka', '2025 — PRESENT', '/Vagish.dev/assets/acm_team.jpg', 'Spearheading the technical vision and engineering operations for the official ACM student chapter. Architecting campus-wide hackathons, leading CTFs, and mentoring 200+ student developers across cybersecurity and modern distributed software systems.', ARRAY['Technical Leadership', 'Hackathons & CTFs', 'Workshop Architecture', 'Peer Mentorship'], 'cyan', 0),
('SPK-SEC-02', 'KEYNOTE SPEAKER', 'Cyber Awareness Speaker', 'Keynote Speaker', 'Belman PU College', 'Karkala, Karnataka', '30th Oct 2025', '/Vagish.dev/assets/speaking.webp', 'Delivered live interactive cybersecurity keynotes to 150+ students. Demystified real-world social engineering vectors, phishing attack surfaces, identity defense, and digital hygiene practices for young internet users.', ARRAY['Keynote Speaker', 'Social Engineering', 'Scam Detection', 'Digital Hygiene'], 'emerald', 1),
('WRK-IIS-03', 'WORKSHOP DELEGATE', 'Ethical Hacking Intensive', 'Delegate • Pravega', 'Ethical Edufabrica @ Pravega, IISc Bangalore', 'IISc Bangalore', '15th & 16th Nov 2025', '/Vagish.dev/assets/IISc_Banglore.webp', 'Completed an intensive hands-on security workshop at IISc Bangalore exploring defensive security counter-measures, sandboxed penetration testing, virtual machine isolation, and vulnerability assessment.', ARRAY['Kali Linux', 'Threat Methodologies', 'VM Security', 'Sandboxed Testing'], 'indigo', 2);

-- Seed: Hobbies
INSERT INTO public.hobbies (id, name, icon_name, order_index) VALUES
('HB-001', 'Automobiles', 'Car', 0),
('HB-002', 'Music', 'Music', 1),
('HB-003', 'Travelling', 'Plane', 2),
('HB-004', 'Hardware Mods', 'Cpu', 3),
('HB-005', 'Coding', 'Code2', 4);
