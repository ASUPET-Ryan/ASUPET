-- Add category_id column to news table
ALTER TABLE news ADD COLUMN IF NOT EXISTS category_id UUID;

-- Add foreign key constraint (logical reference, not enforced)
COMMENT ON COLUMN news.category_id IS 'References news_categories.id';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_news_category_id ON news(category_id);

-- Update existing news to have a default category (Company News)
UPDATE news 
SET category_id = (
  SELECT id FROM news_categories WHERE name_en = 'Company News' LIMIT 1
)
WHERE category_id IS NULL;

-- Grant permissions for the updated news table
GRANT SELECT ON news TO anon;
GRANT ALL PRIVILEGES ON news TO authenticated;