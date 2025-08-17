-- 创建商品分类表
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name JSONB NOT NULL, -- {"zh": "犬粮系列", "en": "Dog Food Series"}
  description JSONB, -- {"zh": "描述", "en": "Description"}
  slug VARCHAR(100) UNIQUE NOT NULL,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建商品表
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name JSONB NOT NULL, -- {"zh": "商品名称", "en": "Product Name"}
  description JSONB, -- {"zh": "详细描述", "en": "Detailed Description"}
  short_description JSONB, -- {"zh": "简短描述", "en": "Short Description"}
  sku VARCHAR(100) UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2), -- 原价，用于显示折扣
  weight DECIMAL(8,3), -- 重量(kg)
  category_id UUID REFERENCES product_categories(id),
  tags TEXT[], -- 标签数组
  images JSONB, -- 图片数组 [{"url": "", "alt": "", "sort": 1}]
  specifications JSONB, -- 规格参数 {"zh": {"蛋白质": "28%"}, "en": {"Protein": "28%"}}
  ingredients JSONB, -- 成分列表 {"zh": ["鸡肉"], "en": ["Chicken"]}
  feeding_guide JSONB, -- 喂养指南
  nutritional_analysis JSONB, -- 营养分析
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建购物车表
CREATE TABLE IF NOT EXISTS shopping_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID, -- 用户ID，如果为NULL则为匿名购物车
  session_id VARCHAR(255), -- 会话ID，用于匿名用户
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建购物车商品表
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES shopping_carts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL, -- 添加时的价格，防止价格变动影响购物车
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cart_id, product_id) -- 同一购物车中同一商品只能有一条记录
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_shopping_carts_user_id ON shopping_carts(user_id);
CREATE INDEX IF NOT EXISTS idx_shopping_carts_session_id ON shopping_carts(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

-- 启用RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
-- 商品分类：所有人可读
CREATE POLICY "product_categories_select" ON product_categories FOR SELECT USING (true);

-- 商品：所有人可读活跃商品
CREATE POLICY "products_select" ON products FOR SELECT USING (is_active = true);

-- 购物车：用户只能访问自己的购物车或匿名购物车
CREATE POLICY "shopping_carts_select" ON shopping_carts FOR SELECT USING (
  auth.uid() = user_id OR user_id IS NULL
);
CREATE POLICY "shopping_carts_insert" ON shopping_carts FOR INSERT WITH CHECK (
  auth.uid() = user_id OR user_id IS NULL
);
CREATE POLICY "shopping_carts_update" ON shopping_carts FOR UPDATE USING (
  auth.uid() = user_id OR user_id IS NULL
);
CREATE POLICY "shopping_carts_delete" ON shopping_carts FOR DELETE USING (
  auth.uid() = user_id OR user_id IS NULL
);

-- 购物车商品：通过购物车关联控制访问
CREATE POLICY "cart_items_select" ON cart_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM shopping_carts 
    WHERE shopping_carts.id = cart_items.cart_id 
    AND (auth.uid() = shopping_carts.user_id OR shopping_carts.user_id IS NULL)
  )
);
CREATE POLICY "cart_items_insert" ON cart_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM shopping_carts 
    WHERE shopping_carts.id = cart_items.cart_id 
    AND (auth.uid() = shopping_carts.user_id OR shopping_carts.user_id IS NULL)
  )
);
CREATE POLICY "cart_items_update" ON cart_items FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM shopping_carts 
    WHERE shopping_carts.id = cart_items.cart_id 
    AND (auth.uid() = shopping_carts.user_id OR shopping_carts.user_id IS NULL)
  )
);
CREATE POLICY "cart_items_delete" ON cart_items FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM shopping_carts 
    WHERE shopping_carts.id = cart_items.cart_id 
    AND (auth.uid() = shopping_carts.user_id OR shopping_carts.user_id IS NULL)
  )
);

-- 授予权限
GRANT SELECT ON product_categories TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;
GRANT ALL ON shopping_carts TO anon, authenticated;
GRANT ALL ON cart_items TO anon, authenticated;

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为表添加更新时间触发器
CREATE TRIGGER update_product_categories_updated_at BEFORE UPDATE ON product_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shopping_carts_updated_at BEFORE UPDATE ON shopping_carts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();