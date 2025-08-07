-- 创建商城相关数据表
-- Create shop-related database tables

-- 创建商品分类表
CREATE TABLE IF NOT EXISTS public.product_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name jsonb NOT NULL, -- {"zh": "干粮", "en": "Dry Food"}
    description jsonb, -- {"zh": "营养均衡的干粮系列", "en": "Nutritionally balanced dry food series"}
    slug text NOT NULL UNIQUE, -- URL友好的标识符，如 "dry-food"
    image_url text,
    parent_id uuid, -- 支持分类层级
    sort_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT product_categories_pkey PRIMARY KEY (id),
    CONSTRAINT product_categories_parent_fkey FOREIGN KEY (parent_id) REFERENCES public.product_categories(id)
);

-- 创建商品表
CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name jsonb NOT NULL, -- {"zh": "ASUPET AI智能营养配方 成犬粮", "en": "ASUPET AI Smart Nutrition Formula Adult Dog Food"}
    description jsonb, -- 商品描述
    short_description jsonb, -- 简短描述
    sku text NOT NULL UNIQUE, -- 商品编码
    price decimal(10,2) NOT NULL, -- 价格
    compare_price decimal(10,2), -- 对比价格（原价）
    cost_price decimal(10,2), -- 成本价
    weight decimal(8,2), -- 重量（kg）
    dimensions jsonb, -- 尺寸 {"length": 30, "width": 20, "height": 10}
    category_id uuid NOT NULL,
    brand text DEFAULT 'ASUPET',
    tags text[], -- 标签数组
    images jsonb, -- 图片数组 [{"url": "...", "alt": "...", "sort": 1}]
    specifications jsonb, -- 规格参数 {"protein": "28%", "fat": "15%", "fiber": "4%"}
    ingredients jsonb, -- 成分列表
    feeding_guide jsonb, -- 喂养指南
    nutritional_analysis jsonb, -- 营养分析
    stock_quantity integer DEFAULT 0,
    min_stock_level integer DEFAULT 5,
    track_inventory boolean DEFAULT true,
    is_active boolean DEFAULT true,
    is_featured boolean DEFAULT false,
    meta_title jsonb, -- SEO标题
    meta_description jsonb, -- SEO描述
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT products_category_fkey FOREIGN KEY (category_id) REFERENCES public.product_categories(id),
    CONSTRAINT products_price_check CHECK (price >= 0),
    CONSTRAINT products_stock_check CHECK (stock_quantity >= 0)
);

-- 创建商品变体表（用于不同规格的商品）
CREATE TABLE IF NOT EXISTS public.product_variants (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    product_id uuid NOT NULL,
    name jsonb NOT NULL, -- {"zh": "2.5kg装", "en": "2.5kg Pack"}
    sku text NOT NULL UNIQUE,
    price decimal(10,2) NOT NULL,
    compare_price decimal(10,2),
    weight decimal(8,2),
    stock_quantity integer DEFAULT 0,
    is_default boolean DEFAULT false,
    attributes jsonb, -- 变体属性 {"size": "2.5kg", "flavor": "chicken"}
    image_url text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT product_variants_pkey PRIMARY KEY (id),
    CONSTRAINT product_variants_product_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
    CONSTRAINT product_variants_price_check CHECK (price >= 0),
    CONSTRAINT product_variants_stock_check CHECK (stock_quantity >= 0)
);

-- 创建购物车表
CREATE TABLE IF NOT EXISTS public.cart_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id text NOT NULL, -- 用于匿名用户的会话ID
    user_id uuid, -- 注册用户ID（如果有用户系统）
    product_id uuid NOT NULL,
    variant_id uuid, -- 商品变体ID（可选）
    quantity integer NOT NULL DEFAULT 1,
    price decimal(10,2) NOT NULL, -- 添加时的价格
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT cart_items_pkey PRIMARY KEY (id),
    CONSTRAINT cart_items_product_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
    CONSTRAINT cart_items_variant_fkey FOREIGN KEY (variant_id) REFERENCES public.product_variants(id) ON DELETE CASCADE,
    CONSTRAINT cart_items_quantity_check CHECK (quantity > 0),
    CONSTRAINT cart_items_price_check CHECK (price >= 0)
);

-- 创建订单表
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_number text NOT NULL UNIQUE,
    customer_name text NOT NULL,
    customer_email text NOT NULL,
    customer_phone text,
    shipping_address jsonb NOT NULL, -- 配送地址
    billing_address jsonb, -- 账单地址
    subtotal decimal(10,2) NOT NULL,
    shipping_cost decimal(10,2) DEFAULT 0,
    tax_amount decimal(10,2) DEFAULT 0,
    total_amount decimal(10,2) NOT NULL,
    currency text DEFAULT 'CNY',
    status text DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
    payment_status text DEFAULT 'pending', -- pending, paid, failed, refunded
    payment_method text, -- 支付方式
    notes text, -- 订单备注
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_status_check CHECK (status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'processing'::text, 'shipped'::text, 'delivered'::text, 'cancelled'::text])),
    CONSTRAINT orders_payment_status_check CHECK (payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'failed'::text, 'refunded'::text]))
);

-- 创建订单项表
CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid NOT NULL,
    product_id uuid NOT NULL,
    variant_id uuid,
    product_name jsonb NOT NULL, -- 下单时的商品名称
    product_sku text NOT NULL, -- 下单时的商品SKU
    quantity integer NOT NULL,
    unit_price decimal(10,2) NOT NULL,
    total_price decimal(10,2) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT order_items_pkey PRIMARY KEY (id),
    CONSTRAINT order_items_order_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE,
    CONSTRAINT order_items_product_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
    CONSTRAINT order_items_variant_fkey FOREIGN KEY (variant_id) REFERENCES public.product_variants(id),
    CONSTRAINT order_items_quantity_check CHECK (quantity > 0),
    CONSTRAINT order_items_price_check CHECK (unit_price >= 0 AND total_price >= 0)
);

-- 创建商品评价表
CREATE TABLE IF NOT EXISTS public.product_reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    product_id uuid NOT NULL,
    customer_name text NOT NULL,
    customer_email text,
    rating integer NOT NULL, -- 1-5星评分
    title text,
    content text,
    is_verified boolean DEFAULT false, -- 是否为验证购买
    is_approved boolean DEFAULT false, -- 是否已审核通过
    helpful_count integer DEFAULT 0, -- 有用计数
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT product_reviews_pkey PRIMARY KEY (id),
    CONSTRAINT product_reviews_product_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
    CONSTRAINT product_reviews_rating_check CHECK (rating >= 1 AND rating <= 5)
);

-- 启用行级安全策略
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
-- 商品分类：所有人可读，认证用户可写
CREATE POLICY "product_categories_select" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "product_categories_insert" ON public.product_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "product_categories_update" ON public.product_categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "product_categories_delete" ON public.product_categories FOR DELETE USING (auth.role() = 'authenticated');

-- 商品：所有人可读活跃商品，认证用户可写
CREATE POLICY "products_select" ON public.products FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "products_insert" ON public.products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "products_update" ON public.products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "products_delete" ON public.products FOR DELETE USING (auth.role() = 'authenticated');

-- 商品变体：所有人可读活跃变体，认证用户可写
CREATE POLICY "product_variants_select" ON public.product_variants FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "product_variants_insert" ON public.product_variants FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "product_variants_update" ON public.product_variants FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "product_variants_delete" ON public.product_variants FOR DELETE USING (auth.role() = 'authenticated');

-- 购物车：匿名用户可操作自己的购物车
CREATE POLICY "cart_items_select" ON public.cart_items FOR SELECT USING (true);
CREATE POLICY "cart_items_insert" ON public.cart_items FOR INSERT WITH CHECK (true);
CREATE POLICY "cart_items_update" ON public.cart_items FOR UPDATE USING (true);
CREATE POLICY "cart_items_delete" ON public.cart_items FOR DELETE USING (true);

-- 订单：认证用户可管理
CREATE POLICY "orders_select" ON public.orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "orders_insert" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_update" ON public.orders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "orders_delete" ON public.orders FOR DELETE USING (auth.role() = 'authenticated');

-- 订单项：认证用户可管理
CREATE POLICY "order_items_select" ON public.order_items FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "order_items_insert" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "order_items_update" ON public.order_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "order_items_delete" ON public.order_items FOR DELETE USING (auth.role() = 'authenticated');

-- 商品评价：所有人可读已审核评价，认证用户可管理
CREATE POLICY "product_reviews_select" ON public.product_reviews FOR SELECT USING (is_approved = true OR auth.role() = 'authenticated');
CREATE POLICY "product_reviews_insert" ON public.product_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "product_reviews_update" ON public.product_reviews FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "product_reviews_delete" ON public.product_reviews FOR DELETE USING (auth.role() = 'authenticated');

-- 授予权限
GRANT SELECT ON public.product_categories TO anon;
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.product_variants TO anon;
GRANT ALL ON public.cart_items TO anon;
GRANT INSERT ON public.orders TO anon;
GRANT INSERT ON public.order_items TO anon;
GRANT SELECT, INSERT ON public.product_reviews TO anon;

GRANT ALL PRIVILEGES ON public.product_categories TO authenticated;
GRANT ALL PRIVILEGES ON public.products TO authenticated;
GRANT ALL PRIVILEGES ON public.product_variants TO authenticated;
GRANT ALL PRIVILEGES ON public.cart_items TO authenticated;
GRANT ALL PRIVILEGES ON public.orders TO authenticated;
GRANT ALL PRIVILEGES ON public.order_items TO authenticated;
GRANT ALL PRIVILEGES ON public.product_reviews TO authenticated;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session_id ON public.cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_is_approved ON public.product_reviews(is_approved);