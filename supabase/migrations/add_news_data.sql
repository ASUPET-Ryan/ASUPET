-- 添加新闻动态数据
-- Add news articles data

INSERT INTO news (
  title,
  excerpt,
  content,
  category,
  publish_date,
  featured_image_url,
  tags,
  author
) VALUES

-- 产品发布新闻
(
  '{"zh": "ASUPET推出全新AI智能宠物营养配方系列", "en": "ASUPET Launches New AI-Powered Pet Nutrition Formula Series"}',
  '{"zh": "基于先进AI算法，为不同品种、年龄和健康状况的宠物提供个性化营养解决方案", "en": "Based on advanced AI algorithms, providing personalized nutrition solutions for pets of different breeds, ages, and health conditions"}',
  '{"zh": "ASUPET今日正式发布全新AI智能宠物营养配方系列，这是公司在宠物营养领域的重大突破。新产品系列采用最新的人工智能技术，能够根据宠物的品种、年龄、体重、活动水平和健康状况，为每只宠物量身定制最适合的营养配方。该系列产品经过两年的研发，结合了营养学专家的专业知识和AI算法的精准分析。", "en": "ASUPET officially launched its new AI-powered pet nutrition formula series today, marking a major breakthrough in the pet nutrition field. The new product line utilizes cutting-edge artificial intelligence technology to customize nutrition formulas for each pet. This product series has been under development for two years."}',
  'company',
  '2024-01-15 10:00:00+00',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20pet%20food%20packaging%20with%20AI%20technology%20elements%2C%20sleek%20design%2C%20premium%20quality&image_size=landscape_16_9',
  ARRAY['产品发布', 'AI技术', '宠物营养', 'product launch', 'AI technology', 'pet nutrition'],
  'ASUPET研发团队'
),

-- 公司动态新闻
(
  '{"zh": "ASUPET获得ISO 22000食品安全管理体系认证", "en": "ASUPET Achieves ISO 22000 Food Safety Management System Certification"}',
  '{"zh": "通过严格的审核流程，ASUPET成功获得国际食品安全管理标准认证，进一步保障产品质量", "en": "Through rigorous audit processes, ASUPET successfully obtained international food safety management standard certification, further ensuring product quality"}',
  '{"zh": "ASUPET宣布已成功通过ISO 22000食品安全管理体系认证，这一国际认证标志着公司在食品安全管理方面达到了世界先进水平。ISO 22000是国际标准化组织制定的食品安全管理体系标准，涵盖了从原料采购到产品交付的整个食品链。", "en": "ASUPET announced that it has successfully passed the ISO 22000 Food Safety Management System certification. This international certification marks the company achievement of world-class standards in food safety management."}',
  'company',
  '2024-01-10 14:30:00+00',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ISO%20certification%20certificate%20on%20modern%20office%20desk%2C%20professional%20business%20environment%2C%20quality%20assurance&image_size=landscape_16_9',
  ARRAY['ISO认证', '食品安全', '质量管理', 'ISO certification', 'food safety', 'quality management'],
  'ASUPET质量部'
),

-- 行业洞察新闻
(
  '{"zh": "2024年宠物营养行业趋势：个性化定制成为主流", "en": "2024 Pet Nutrition Industry Trends: Personalized Customization Becomes Mainstream"}',
  '{"zh": "最新行业报告显示，个性化宠物营养解决方案正在重塑整个宠物食品市场格局", "en": "Latest industry report shows that personalized pet nutrition solutions are reshaping the entire pet food market landscape"}',
  '{"zh": "根据最新发布的2024年全球宠物营养行业报告，个性化定制营养方案正成为宠物食品行业的主要发展趋势。报告指出，超过70%的宠物主人希望为自己的宠物提供量身定制的营养解决方案。", "en": "According to the newly released 2024 Global Pet Nutrition Industry Report, personalized customized nutrition plans are becoming the main development trend in the pet food industry. The report indicates that over 70% of pet owners want to provide tailored nutrition solutions for their pets."}',
  'industry',
  '2024-01-08 09:15:00+00',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20nutrition%20industry%20trends%20infographic%2C%20modern%20data%20visualization%2C%20colorful%20charts%20and%20graphs&image_size=landscape_16_9',
  ARRAY['行业趋势', '个性化营养', '市场分析', 'industry trends', 'personalized nutrition', 'market analysis'],
  'ASUPET市场研究部'
),

-- 技术进展新闻
(
  '{"zh": "ASUPET AI营养分析系统升级：准确率提升至98.5%", "en": "ASUPET AI Nutrition Analysis System Upgrade: Accuracy Improved to 98.5%"}',
  '{"zh": "最新版本的AI系统通过深度学习算法优化，能够更精确地分析宠物营养需求", "en": "The latest version of the AI system, optimized through deep learning algorithms, can more accurately analyze pet nutritional needs"}',
  '{"zh": "ASUPET技术团队宣布，公司自主研发的AI营养分析系统完成重大升级，营养需求分析准确率从原来的95.2%提升至98.5%，达到行业领先水平。新版本采用了更先进的神经网络架构，能够处理更复杂的宠物生理数据。", "en": "ASUPET technical team announced that the company self-developed AI nutrition analysis system has completed a major upgrade, with nutritional needs analysis accuracy improved from 95.2% to 98.5%, reaching industry-leading levels."}',
  'company',
  '2024-01-05 16:45:00+00',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20technology%20interface%20with%20pet%20nutrition%20data%2C%20futuristic%20dashboard%2C%20high-tech%20visualization&image_size=landscape_16_9',
  ARRAY['AI技术', '系统升级', '技术创新', 'AI technology', 'system upgrade', 'technical innovation'],
  'ASUPET技术部'
),

-- 媒体报道新闻
(
  '{"zh": "权威媒体报道：ASUPET引领宠物营养科技革命", "en": "Authoritative Media Report: ASUPET Leads Pet Nutrition Technology Revolution"}',
  '{"zh": "多家知名媒体聚焦ASUPET在宠物营养领域的创新成果，称其为行业变革的推动者", "en": "Multiple renowned media outlets focus on ASUPET innovative achievements in pet nutrition, calling it a driver of industry transformation"}',
  '{"zh": "近日，宠物行业周刊、科技创新日报等多家权威媒体相继报道了ASUPET在宠物营养科技领域的突破性进展，高度评价了公司在推动行业数字化转型方面的贡献。", "en": "Recently, multiple authoritative media outlets including Pet Industry Weekly and Technology Innovation Daily have successively reported on ASUPET breakthrough progress in pet nutrition technology."}',
  'media',
  '2024-01-03 11:20:00+00',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=newspaper%20headlines%20and%20media%20coverage%20about%20pet%20technology%2C%20professional%20journalism%20layout&image_size=landscape_16_9',
  ARRAY['媒体报道', '行业认可', '技术创新', 'media coverage', 'industry recognition', 'technology innovation'],
  'ASUPET公关部'
);

-- 检查权限并授予访问权限
GRANT SELECT ON news TO anon;
GRANT ALL PRIVILEGES ON news TO authenticated;