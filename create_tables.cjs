const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

function parseEnvFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  });
  return env;
}

const env = parseEnvFile('.env.local');
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function createTables() {
  try {
    console.log('开始创建商城表结构...');
    
    // 创建商品分类表
    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS product_categories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name JSONB NOT NULL,
        description JSONB,
        slug VARCHAR(100) UNIQUE NOT NULL,
        image_url TEXT,
        parent_id UUID REFERENCES product_categories(id),
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    const { error: catTableError } = await supabase.rpc('sql', { query: createCategoriesTable });
    if (catTableError) {
      console.log('创建分类表错误:', catTableError);
    } else {
      console.log('分类表创建成功');
    }
    
    // 创建商品表
    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name JSONB NOT NULL,
        description JSONB,
        short_description JSONB,
        sku VARCHAR(100) UNIQUE NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        compare_price DECIMAL(10,2),
        weight DECIMAL(8,3),
        category_id UUID REFERENCES product_categories(id),
        tags TEXT[],
        images JSONB,
        specifications JSONB,
        ingredients JSONB,
        feeding_guide JSONB,
        nutritional_analysis JSONB,
        stock_quantity INTEGER DEFAULT 0,
        min_stock_level INTEGER DEFAULT 5,
        is_active BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        CONSTRAINT positive_price CHECK (price > 0),
        CONSTRAINT positive_stock CHECK (stock_quantity >= 0)
      );
    `;
    
    const { error: prodTableError } = await supabase.rpc('sql', { query: createProductsTable });
    if (prodTableError) {
      console.log('创建商品表错误:', prodTableError);
    } else {
      console.log('商品表创建成功');
    }
    
    // 设置权限
    const setPermissions = `
      ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY IF NOT EXISTS "Anyone can view active categories" ON product_categories
        FOR SELECT USING (is_active = true);
      
      CREATE POLICY IF NOT EXISTS "Anyone can view active products" ON products
        FOR SELECT USING (is_active = true);
      
      GRANT SELECT ON product_categories TO anon, authenticated;
      GRANT ALL ON product_categories TO authenticated;
      GRANT SELECT ON products TO anon, authenticated;
      GRANT ALL ON products TO authenticated;
    `;
    
    const { error: permError } = await supabase.rpc('sql', { query: setPermissions });
    if (permError) {
      console.log('设置权限错误:', permError);
    } else {
      console.log('权限设置成功');
    }
    
    console.log('表结构创建完成！');
    
  } catch (error) {
    console.error('创建表失败:', error);
  }
}

createTables();