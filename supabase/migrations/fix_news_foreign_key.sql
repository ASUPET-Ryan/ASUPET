-- 修复news表和news_categories表之间的外键关系
-- 这将允许在查询中使用联合查询

-- 首先检查是否已经存在外键约束
DO $$
BEGIN
    -- 如果外键约束不存在，则添加它
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'news_category_id_fkey' 
        AND table_name = 'news'
    ) THEN
        -- 添加外键约束
        ALTER TABLE public.news 
        ADD CONSTRAINT news_category_id_fkey 
        FOREIGN KEY (category_id) 
        REFERENCES public.news_categories(id) 
        ON DELETE SET NULL;
        
        RAISE NOTICE '外键约束已添加: news.category_id -> news_categories.id';
    ELSE
        RAISE NOTICE '外键约束已存在，跳过添加';
    END IF;
END $$;

-- 更新现有的新闻数据，将category字段映射到category_id
-- 这将根据category字段的值设置正确的category_id

UPDATE public.news 
SET category_id = (
    SELECT id FROM public.news_categories 
    WHERE 
        (news.category = 'company' AND news_categories.name_en = 'Company News') OR
        (news.category = 'industry' AND news_categories.name_en = 'Industry News') OR
        (news.category = 'media' AND news_categories.name_en = 'Media Coverage')
    LIMIT 1
)
WHERE category_id IS NULL AND category IS NOT NULL;

-- 为没有匹配分类的新闻设置默认分类（公司新闻）
UPDATE public.news 
SET category_id = (
    SELECT id FROM public.news_categories 
    WHERE name_en = 'Company News'
    LIMIT 1
)
WHERE category_id IS NULL;

-- 启用news表的RLS（行级安全）
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- 创建允许所有用户读取新闻的策略
DROP POLICY IF EXISTS "Allow public read access to news" ON public.news;
CREATE POLICY "Allow public read access to news" 
ON public.news 
FOR SELECT 
TO public 
USING (true);

-- 确保anon和authenticated角色有正确的权限
GRANT SELECT ON public.news TO anon;
GRANT SELECT ON public.news TO authenticated;
GRANT SELECT ON public.news_categories TO anon;
GRANT SELECT ON public.news_categories TO authenticated;

-- 刷新schema缓存（这有助于PostgREST识别新的关系）
NOTIFY pgrst, 'reload schema';