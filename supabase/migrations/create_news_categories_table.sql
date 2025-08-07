-- Create news_categories table
CREATE TABLE IF NOT EXISTS news_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(100) NOT NULL,
  name_zh VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_zh TEXT,
  color VARCHAR(7) NOT NULL DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint on English and Chinese names
ALTER TABLE news_categories ADD CONSTRAINT unique_category_name_en UNIQUE (name_en);
ALTER TABLE news_categories ADD CONSTRAINT unique_category_name_zh UNIQUE (name_zh);

-- Create index for better performance
CREATE INDEX idx_news_categories_created_at ON news_categories(created_at);

-- Insert default categories
INSERT INTO news_categories (name_en, name_zh, description_en, description_zh, color) VALUES
('Company News', '公司新闻', 'Official company announcements and updates', '公司官方公告和更新', '#3B82F6'),
('Industry Insights', '行业洞察', 'Analysis and trends in the pet industry', '宠物行业分析和趋势', '#10B981'),
('Product Updates', '产品更新', 'New product releases and feature updates', '新产品发布和功能更新', '#F59E0B'),
('Research & Development', '研发动态', 'Latest research findings and development progress', '最新研究成果和开发进展', '#8B5CF6'),
('Media Coverage', '媒体报道', 'Press releases and media mentions', '新闻稿和媒体报道', '#EC4899');

-- Enable RLS (Row Level Security)
ALTER TABLE news_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for news_categories
CREATE POLICY "Allow public read access to news_categories" ON news_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage news_categories" ON news_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT SELECT ON news_categories TO anon;
GRANT ALL PRIVILEGES ON news_categories TO authenticated;