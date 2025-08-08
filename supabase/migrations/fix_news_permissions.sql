-- 修复新闻相关表的权限问题
-- 确保anon和authenticated角色可以访问新闻数据

-- 为news表设置权限
GRANT SELECT ON public.news TO anon;
GRANT ALL PRIVILEGES ON public.news TO authenticated;

-- 为news_categories表设置权限
GRANT SELECT ON public.news_categories TO anon;
GRANT ALL PRIVILEGES ON public.news_categories TO authenticated;

-- 检查news_categories表的RLS策略
-- 如果RLS阻止了数据访问，我们需要创建适当的策略

-- 为anon角色创建SELECT策略（允许匿名用户查看新闻分类）
CREATE POLICY "Allow anon to read news_categories" ON public.news_categories
    FOR SELECT TO anon
    USING (true);

-- 为authenticated角色创建全权限策略
CREATE POLICY "Allow authenticated full access to news_categories" ON public.news_categories
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 检查是否有新闻数据，如果没有则插入一些示例数据
INSERT INTO public.news_categories (name_en, name_zh, description_en, description_zh, color)
VALUES 
    ('Company News', '公司新闻', 'Latest updates from ASUPET', 'ASUPET最新动态', '#8B5CF6'),
    ('Industry News', '行业新闻', 'Pet industry insights and trends', '宠物行业洞察与趋势', '#06B6D4'),
    ('Product Updates', '产品更新', 'New product releases and updates', '新产品发布与更新', '#10B981')
ON CONFLICT (name_en) DO NOTHING;

-- 插入一些示例新闻数据
INSERT INTO public.news (title, excerpt, content, category_id, publish_date, author)
SELECT 
    '{"zh": "ASUPET推出全新宠物营养配方", "en": "ASUPET Launches New Pet Nutrition Formula"}',
    '{"zh": "我们很高兴宣布推出全新的科学配方宠物食品，为您的爱宠提供更优质的营养。", "en": "We are excited to announce the launch of our new scientifically formulated pet food, providing superior nutrition for your beloved pets."}',
    '{"zh": "经过两年的研发，ASUPET团队成功开发出了这款革命性的宠物营养配方。该配方采用最新的营养科学技术，确保宠物获得均衡的营养。", "en": "After two years of research and development, the ASUPET team has successfully developed this revolutionary pet nutrition formula. The formula uses the latest nutritional science technology to ensure pets receive balanced nutrition."}',
    (SELECT id FROM public.news_categories WHERE name_en = 'Company News' LIMIT 1),
    NOW() - INTERVAL '1 day',
    'ASUPET Team'
WHERE NOT EXISTS (SELECT 1 FROM public.news LIMIT 1);

INSERT INTO public.news (title, excerpt, content, category_id, publish_date, author)
SELECT 
    '{"zh": "宠物行业2024年发展趋势报告", "en": "Pet Industry 2024 Development Trends Report"}',
    '{"zh": "深度分析宠物行业的最新发展趋势，为宠物主人和从业者提供有价值的洞察。", "en": "In-depth analysis of the latest development trends in the pet industry, providing valuable insights for pet owners and industry professionals."}',
    '{"zh": "根据最新的市场研究，宠物行业在2024年将继续保持强劲增长。消费者对高品质宠物产品的需求不断增加。", "en": "According to the latest market research, the pet industry will continue to maintain strong growth in 2024. Consumer demand for high-quality pet products continues to increase."}',
    (SELECT id FROM public.news_categories WHERE name_en = 'Industry News' LIMIT 1),
    NOW() - INTERVAL '2 days',
    'Industry Analyst'
WHERE NOT EXISTS (SELECT 1 FROM public.news WHERE title->>'zh' = '宠物行业2024年发展趋势报告');

INSERT INTO public.news (title, excerpt, content, category_id, publish_date, author)
SELECT 
    '{"zh": "智能宠物喂食器新功能上线", "en": "Smart Pet Feeder New Features Launch"}',
    '{"zh": "我们的智能宠物喂食器新增了健康监测和个性化喂食建议功能。", "en": "Our smart pet feeder now includes health monitoring and personalized feeding recommendation features."}',
    '{"zh": "最新版本的智能宠物喂食器集成了AI技术，可以根据宠物的年龄体重和活动水平提供个性化的喂食建议。", "en": "The latest version of our smart pet feeder integrates AI technology to provide personalized feeding recommendations based on your pet age weight and activity level."}',
    (SELECT id FROM public.news_categories WHERE name_en = 'Product Updates' LIMIT 1),
    NOW() - INTERVAL '3 days',
    'Product Team'
WHERE NOT EXISTS (SELECT 1 FROM public.news WHERE title->>'zh' = '智能宠物喂食器新功能上线');

-- 检查当前权限状态
SELECT 
    grantee, 
    table_name, 
    privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
    AND grantee IN ('anon', 'authenticated') 
    AND table_name IN ('news', 'news_categories')
ORDER BY table_name, grantee;