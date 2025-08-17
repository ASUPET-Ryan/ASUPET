-- 创建品牌故事表 (brand_story)
CREATE TABLE brand_story (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title JSONB NOT NULL, -- {"zh": "中文标题", "en": "English Title"}
    content JSONB NOT NULL, -- {"zh": "中文内容", "en": "English Content"}
    timeline JSONB, -- 时间轴数据
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_brand_story_updated_at ON brand_story(updated_at DESC);

-- 权限设置
GRANT SELECT ON brand_story TO anon;
GRANT ALL PRIVILEGES ON brand_story TO authenticated;

-- 创建团队成员表 (team_members)
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name JSONB NOT NULL,
    position JSONB NOT NULL,
    bio JSONB,
    credentials TEXT[],
    avatar_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_team_members_order ON team_members(order_index ASC);

-- 权限设置
GRANT SELECT ON team_members TO anon;
GRANT ALL PRIVILEGES ON team_members TO authenticated;

-- 创建产品系列表 (product_series)
CREATE TABLE product_series (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name JSONB NOT NULL,
    description JSONB NOT NULL,
    features JSONB,
    target_pets TEXT[],
    nutrition_highlights JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 权限设置
GRANT SELECT ON product_series TO anon;
GRANT ALL PRIVILEGES ON product_series TO authenticated;

-- 创建新闻表 (news)
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title JSONB NOT NULL,
    excerpt JSONB,
    content JSONB NOT NULL,
    category TEXT CHECK (category IN ('company', 'industry', 'media')),
    publish_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    featured_image_url TEXT,
    tags TEXT[],
    author TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_news_publish_date ON news(publish_date DESC);
CREATE INDEX idx_news_category ON news(category);

-- 权限设置
GRANT SELECT ON news TO anon;
GRANT ALL PRIVILEGES ON news TO authenticated;

-- 创建联系表单提交表 (contact_submissions)
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    inquiry_type TEXT CHECK (inquiry_type IN ('partnership', 'media', 'general')),
    message TEXT NOT NULL,
    preferred_language TEXT CHECK (preferred_language IN ('zh', 'en')),
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_processed ON contact_submissions(processed);

-- 权限设置
GRANT INSERT ON contact_submissions TO anon;
GRANT ALL PRIVILEGES ON contact_submissions TO authenticated;

-- 创建媒体资源表 (media_items)
CREATE TABLE media_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    alt_text JSONB,
    caption JSONB,
    width INTEGER,
    height INTEGER,
    format TEXT,
    entity_type TEXT,
    entity_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_media_items_entity ON media_items(entity_type, entity_id);

-- 权限设置
GRANT SELECT ON media_items TO anon;
GRANT ALL PRIVILEGES ON media_items TO authenticated;

-- 插入示例品牌故事
INSERT INTO brand_story (title, content, timeline) VALUES (
    '{"zh": "ASUPET品牌故事", "en": "ASUPET Brand Story"}',
    '{"zh": "ASUPET致力于通过科技创新为宠物提供个性化营养解决方案，我们相信每只宠物都是独一无二的，因此需要量身定制的营养方案。通过AI技术和专业营养师团队的结合，我们为宠物主人提供最优质的服务体验。", "en": "ASUPET is committed to providing personalized nutrition solutions for pets through technological innovation. We believe every pet is unique and requires customized nutrition plans. Through the combination of AI technology and professional nutritionist teams, we provide pet owners with the highest quality service experience."}',
    '[{"year": "2020", "event": {"zh": "公司成立，开始宠物营养研究", "en": "Company founded, started pet nutrition research"}}, {"year": "2021", "event": {"zh": "AI技术研发突破", "en": "AI technology development breakthrough"}}, {"year": "2022", "event": {"zh": "推出个性化营养方案", "en": "Launched personalized nutrition plans"}}, {"year": "2023", "event": {"zh": "获得行业认证", "en": "Obtained industry certification"}}]'
);

-- 插入示例团队成员
INSERT INTO team_members (name, position, bio, credentials, order_index) VALUES 
('{"zh": "张博士", "en": "Dr. Zhang"}', '{"zh": "首席营养师", "en": "Chief Nutritionist"}', '{"zh": "拥有10年宠物营养研究经验，专注于宠物个性化营养方案的开发", "en": "10 years of experience in pet nutrition research, focusing on developing personalized nutrition plans for pets"}', ARRAY['博士学位', '注册营养师', 'AAFCO认证'], 1),
('{"zh": "李工程师", "en": "Engineer Li"}', '{"zh": "技术总监", "en": "Technical Director"}', '{"zh": "AI算法专家，专注个性化推荐系统的研发和优化", "en": "AI algorithm expert, focusing on the development and optimization of personalized recommendation systems"}', ARRAY['硕士学位', 'AI认证', '机器学习专家'], 2),
('{"zh": "王经理", "en": "Manager Wang"}', '{"zh": "产品经理", "en": "Product Manager"}', '{"zh": "负责产品规划和用户体验设计，确保产品满足用户需求", "en": "Responsible for product planning and user experience design, ensuring products meet user needs"}', ARRAY['MBA学位', '产品管理认证'], 3);

-- 插入示例产品系列
INSERT INTO product_series (name, description, features, target_pets, nutrition_highlights) VALUES 
('{"zh": "幼宠成长系列", "en": "Puppy Growth Series"}', '{"zh": "专为幼宠设计的营养方案，支持健康成长发育", "en": "Nutrition plan designed specifically for young pets, supporting healthy growth and development"}', '{"zh": ["高蛋白配方", "易消化", "免疫力增强"], "en": ["High protein formula", "Easy to digest", "Immune system boost"]}', ARRAY['puppy', 'kitten'], '{"zh": {"protein": "28%", "fat": "15%", "fiber": "3%"}, "en": {"protein": "28%", "fat": "15%", "fiber": "3%"}}'),
('{"zh": "成年宠物维护系列", "en": "Adult Pet Maintenance Series"}', '{"zh": "为成年宠物提供均衡营养，维持最佳健康状态", "en": "Provides balanced nutrition for adult pets, maintaining optimal health"}', '{"zh": ["营养均衡", "体重管理", "毛发亮泽"], "en": ["Balanced nutrition", "Weight management", "Shiny coat"]}', ARRAY['adult_dog', 'adult_cat'], '{"zh": {"protein": "24%", "fat": "12%", "fiber": "4%"}, "en": {"protein": "24%", "fat": "12%", "fiber": "4%"}}'),
('{"zh": "老年宠物关爱系列", "en": "Senior Pet Care Series"}', '{"zh": "针对老年宠物的特殊营养需求，延缓衰老过程", "en": "Addresses special nutritional needs of senior pets, slowing the aging process"}', '{"zh": ["关节保护", "心脏健康", "认知支持"], "en": ["Joint protection", "Heart health", "Cognitive support"]}', ARRAY['senior_dog', 'senior_cat'], '{"zh": {"protein": "22%", "fat": "10%", "fiber": "5%"}, "en": {"protein": "22%", "fat": "10%", "fiber": "5%"}}');

-- 插入示例新闻
INSERT INTO news (title, excerpt, content, category, author, tags) VALUES 
('{"zh": "ASUPET获得宠物营养行业认证", "en": "ASUPET Receives Pet Nutrition Industry Certification"}', '{"zh": "我们很高兴宣布ASUPET获得了权威宠物营养行业认证", "en": "We are pleased to announce that ASUPET has received authoritative pet nutrition industry certification"}', '{"zh": "经过严格的审核和评估，ASUPET正式获得了国际宠物营养协会的认证。这一认证标志着我们在宠物营养领域的专业性和可靠性得到了权威机构的认可。", "en": "After rigorous review and evaluation, ASUPET has officially received certification from the International Pet Nutrition Association. This certification marks the recognition of our professionalism and reliability in the pet nutrition field by authoritative institutions."}', 'company', 'ASUPET Team', ARRAY['认证', '里程碑', '专业性']),
('{"zh": "AI技术在宠物营养中的应用前景", "en": "Application Prospects of AI Technology in Pet Nutrition"}', '{"zh": "探讨人工智能如何革命性地改变宠物营养行业", "en": "Exploring how artificial intelligence is revolutionizing the pet nutrition industry"}', '{"zh": "随着人工智能技术的快速发展，宠物营养行业正迎来前所未有的变革。通过大数据分析和机器学习算法，我们能够为每只宠物提供更加精准的营养建议。", "en": "With the rapid development of artificial intelligence technology, the pet nutrition industry is experiencing unprecedented transformation. Through big data analysis and machine learning algorithms, we can provide more precise nutritional recommendations for each pet."}', 'industry', 'Dr. Zhang', ARRAY['AI', '技术', '创新']),
('{"zh": "媒体报道：ASUPET引领宠物营养新趋势", "en": "Media Report: ASUPET Leads New Trends in Pet Nutrition"}', '{"zh": "知名宠物杂志专访ASUPET创始团队", "en": "Famous pet magazine interviews ASUPET founding team"}', '{"zh": "近日，知名宠物行业杂志《宠物世界》对ASUPET进行了专访，深入了解了我们的创新理念和技术优势。报道中特别提到了我们的AI个性化推荐系统。", "en": "Recently, the well-known pet industry magazine Pet World conducted an exclusive interview with ASUPET, gaining deep insights into our innovative concepts and technological advantages. The report particularly highlighted our AI personalized recommendation system."}', 'media', 'Pet World Magazine', ARRAY['媒体', '专访', '报道']);