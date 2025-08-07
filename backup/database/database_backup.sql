-- ASUPET Website Database Backup
-- Generated on: $(date)
-- Database: Supabase PostgreSQL
-- Project URL: https://cguthchefshejanxsxlc.supabase.co

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create brand_story table
CREATE TABLE IF NOT EXISTS public.brand_story (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title jsonb NOT NULL,
    content jsonb NOT NULL,
    timeline jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT brand_story_pkey PRIMARY KEY (id)
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name jsonb NOT NULL,
    position jsonb NOT NULL,
    bio jsonb,
    credentials text[],
    avatar_url text,
    order_index integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT team_members_pkey PRIMARY KEY (id)
);

-- Create product_series table
CREATE TABLE IF NOT EXISTS public.product_series (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name jsonb NOT NULL,
    description jsonb NOT NULL,
    features jsonb,
    target_pets text[],
    nutrition_highlights jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT product_series_pkey PRIMARY KEY (id)
);

-- Create news_categories table
CREATE TABLE IF NOT EXISTS public.news_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name_en character varying NOT NULL,
    name_zh character varying NOT NULL,
    description_en text,
    description_zh text,
    color character varying DEFAULT '#3B82F6'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT news_categories_pkey PRIMARY KEY (id),
    CONSTRAINT news_categories_name_en_key UNIQUE (name_en),
    CONSTRAINT news_categories_name_zh_key UNIQUE (name_zh)
);

-- Enable RLS on news_categories
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;

-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title jsonb NOT NULL,
    excerpt jsonb,
    content jsonb NOT NULL,
    category text,
    publish_date timestamp with time zone DEFAULT now(),
    featured_image_url text,
    tags text[],
    author text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    category_id uuid,
    CONSTRAINT news_pkey PRIMARY KEY (id),
    CONSTRAINT news_category_check CHECK ((category = ANY (ARRAY['company'::text, 'industry'::text, 'media'::text])))
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    company text,
    phone text,
    inquiry_type text,
    message text NOT NULL,
    preferred_language text,
    processed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT contact_submissions_pkey PRIMARY KEY (id),
    CONSTRAINT contact_submissions_inquiry_type_check CHECK ((inquiry_type = ANY (ARRAY['partnership'::text, 'media'::text, 'general'::text]))),
    CONSTRAINT contact_submissions_preferred_language_check CHECK ((preferred_language = ANY (ARRAY['zh'::text, 'en'::text])))
);

-- Create media_items table
CREATE TABLE IF NOT EXISTS public.media_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    url text NOT NULL,
    alt_text jsonb,
    caption jsonb,
    width integer,
    height integer,
    format text,
    entity_type text,
    entity_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT media_items_pkey PRIMARY KEY (id)
);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON public.brand_story TO anon;
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT ON public.product_series TO anon;
GRANT SELECT ON public.news TO anon;
GRANT SELECT ON public.news_categories TO anon;
GRANT INSERT ON public.contact_submissions TO anon;
GRANT SELECT ON public.media_items TO anon;

GRANT ALL PRIVILEGES ON public.brand_story TO authenticated;
GRANT ALL PRIVILEGES ON public.team_members TO authenticated;
GRANT ALL PRIVILEGES ON public.product_series TO authenticated;
GRANT ALL PRIVILEGES ON public.news TO authenticated;
GRANT ALL PRIVILEGES ON public.news_categories TO authenticated;
GRANT ALL PRIVILEGES ON public.contact_submissions TO authenticated;
GRANT ALL PRIVILEGES ON public.media_items TO authenticated;

-- Note: This backup contains the database structure.
-- To include actual data, you would need to export data using pg_dump or similar tools.
-- The current Supabase integration doesn't provide direct data export functionality.

-- Instructions for data export:
-- 1. Use Supabase Dashboard SQL Editor to export data
-- 2. Or use pg_dump with connection string:
--    pg_dump "postgresql://postgres:[password]@db.cguthchefshejanxsxlc.supabase.co:5432/postgres" > data_backup.sql
-- 3. Or use Supabase CLI: supabase db dump --data-only > data_backup.sql

-- End of backup file