-- Add featured column to news table
ALTER TABLE news ADD COLUMN featured BOOLEAN DEFAULT false;

-- Update existing news records to set some as featured (optional)
-- You can customize this based on your business logic
UPDATE news SET featured = true WHERE id IN (
  SELECT id FROM news ORDER BY publish_date DESC LIMIT 3
);

-- Add comment to the column
COMMENT ON COLUMN news.featured IS 'Whether this news article is featured on the homepage';