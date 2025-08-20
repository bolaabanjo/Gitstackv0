-- GitStack Database Schema
-- Create tables for users, projects, and AI features

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table for user repositories/projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fine-tuning jobs table
CREATE TABLE IF NOT EXISTS public.fine_tuning_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'training', 'completed', 'failed')),
  model_path TEXT,
  training_data_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Regex patterns table for saved regex patterns
CREATE TABLE IF NOT EXISTS public.regex_patterns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  pattern TEXT NOT NULL,
  test_string TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Repository queries table for Ask My Repo feature
CREATE TABLE IF NOT EXISTS public.repo_queries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  query TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fine_tuning_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regex_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repo_queries ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- Fine-tuning jobs policies
CREATE POLICY "Users can view own fine-tuning jobs" ON public.fine_tuning_jobs
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Users can create fine-tuning jobs" ON public.fine_tuning_jobs
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Users can update own fine-tuning jobs" ON public.fine_tuning_jobs
  FOR UPDATE USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

-- Regex patterns policies
CREATE POLICY "Users can view own regex patterns" ON public.regex_patterns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create regex patterns" ON public.regex_patterns
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own regex patterns" ON public.regex_patterns
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own regex patterns" ON public.regex_patterns
  FOR DELETE USING (auth.uid() = user_id);

-- Repo queries policies
CREATE POLICY "Users can view own repo queries" ON public.repo_queries
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Users can create repo queries" ON public.repo_queries
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM public.projects WHERE id = project_id));

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
