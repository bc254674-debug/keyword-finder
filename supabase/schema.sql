-- BlueOcean Keyword Finder Database Schema
-- Run this in your Supabase SQL Editor

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  keyword_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Keywords table
CREATE TABLE IF NOT EXISTS keywords (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  keyword TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'zh')),
  search_volume_estimate INTEGER DEFAULT 0,
  trend_direction TEXT DEFAULT 'stable' CHECK (trend_direction IN ('up', 'down', 'stable')),
  trend_score REAL DEFAULT 50,
  competition_score REAL DEFAULT 50,
  opportunity_score REAL DEFAULT 50,
  result_count BIGINT DEFAULT 0,
  top_domains JSONB DEFAULT '[]',
  content_suggestion TEXT DEFAULT '',
  related_keywords JSONB DEFAULT '[]',
  faq JSONB DEFAULT '[]',
  is_trending BOOLEAN DEFAULT false,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_keywords_opportunity ON keywords(opportunity_score DESC);
CREATE INDEX IF NOT EXISTS idx_keywords_category ON keywords(category_id);
CREATE INDEX IF NOT EXISTS idx_keywords_language ON keywords(language);
CREATE INDEX IF NOT EXISTS idx_keywords_trending ON keywords(is_trending) WHERE is_trending = true;
CREATE INDEX IF NOT EXISTS idx_keywords_slug ON keywords(slug);

-- Seed categories
INSERT INTO categories (slug, name, description, icon, keyword_count) VALUES
('pets', 'Pets', 'Pet care, training, food, and supplies keywords', 'pets', 2),
('health', 'Health & Fitness', 'Wellness, fitness, nutrition, and medical keywords', 'health', 1),
('finance', 'Finance', 'Investing, saving, credit, and money management', 'finance', 1),
('food', 'Food & Cooking', 'Recipes, cooking techniques, diets, and food reviews', 'food', 1),
('tech', 'Technology', 'Software, gadgets, AI tools, and programming', 'tech', 1),
('home', 'Home & DIY', 'Home improvement, decoration, and DIY projects', 'home', 1),
('travel', 'Travel', 'Destinations, tips, gear, and travel planning', 'travel', 1),
('education', 'Education', 'Online courses, learning resources, and study tips', 'education', 1),
('beauty', 'Beauty & Skincare', 'Skincare, makeup, hair care, and beauty reviews', 'beauty', 1),
('business', 'Business & Marketing', 'Entrepreneurship, marketing, and small business', 'business', 1),
('sports', 'Sports & Fitness', 'Training, gear, and sports performance', 'sports', 1),
('automotive', 'Automotive', 'Car maintenance, buying guides, and accessories', 'automotive', 1),
('gardening', 'Gardening', 'Plants, landscaping, and garden care', 'gardening', 1),
('parenting', 'Parenting', 'Baby care, child development, and family life', 'parenting', 1),
('fashion', 'Fashion', 'Style guides, trends, and clothing reviews', 'fashion', 1)
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security (optional, for future auth)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read on categories"
  ON categories FOR SELECT USING (true);

CREATE POLICY "Allow public read on keywords"
  ON keywords FOR SELECT USING (true);
