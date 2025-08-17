-- Insert sample brand story data
INSERT INTO brand_story (title, content, timeline, created_at, updated_at) VALUES (
  '{
    "zh": "我们的故事",
    "en": "Our Story"
  }',
  '{
    "zh": "ASUPET成立于2010年，源于创始人对宠物健康的深切关注。我们相信每一只宠物都值得拥有最好的营养，因此致力于研发高品质、天然的宠物食品。从一个小型工作室开始，我们逐步发展成为行业领先的宠物食品品牌。我们的使命是为全球宠物提供最优质、最安全、最营养的食品，让每一只宠物都能健康快乐地成长。我们承诺使用最好的原料，采用最先进的工艺，确保每一粒粮食都承载着我们对宠物的爱。我们的愿景是成为全球最受信赖的宠物食品品牌，引领行业创新，推动宠物营养科学的发展，让人宠关系更加和谐美好。",
    "en": "ASUPET was founded in 2010, born from our founder''s deep concern for pet health. We believe every pet deserves the best nutrition, so we are committed to developing high-quality, natural pet food. Starting from a small workshop, we have gradually developed into a leading pet food brand in the industry. Our mission is to provide the highest quality, safest, and most nutritious food for pets worldwide, allowing every pet to grow up healthy and happy. We promise to use the best ingredients and the most advanced processes to ensure that every grain of food carries our love for pets. Our vision is to become the most trusted pet food brand globally, leading industry innovation, promoting the development of pet nutrition science, and making the human-pet relationship more harmonious and beautiful."
  }',
  '{
    "zh": [
      {"year": "2010", "event": "ASUPET成立，开始宠物食品研发之路"},
      {"year": "2015", "event": "获得国际宠物食品安全认证"},
      {"year": "2018", "event": "产品销往20多个国家和地区"},
      {"year": "2023", "event": "服务超过50万宠物家庭"}
    ],
    "en": [
      {"year": "2010", "event": "ASUPET was founded, starting the journey of pet food development"},
      {"year": "2015", "event": "Obtained international pet food safety certification"},
      {"year": "2018", "event": "Products sold to more than 20 countries and regions"},
      {"year": "2023", "event": "Serving more than 500,000 pet families"}
    ]
  }',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  timeline = EXCLUDED.timeline,
  updated_at = NOW();

-- Insert sample team members data
INSERT INTO team_members (name, position, bio, credentials, avatar_url, order_index, created_at, updated_at) VALUES 
(
  '{
    "zh": "张明",
    "en": "Ming Zhang"
  }',
  '{
    "zh": "创始人兼CEO",
    "en": "Founder & CEO"
  }',
  '{
    "zh": "拥有15年宠物食品行业经验，致力于为宠物提供最优质的营养解决方案。",
    "en": "With 15 years of experience in the pet food industry, dedicated to providing the highest quality nutritional solutions for pets."
  }',
  ARRAY['MBA工商管理硕士', '宠物营养师认证', '食品安全专家'],
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20businessman%20CEO%20portrait%2C%20confident%20smile%2C%20business%20suit%2C%20modern%20office%20background&image_size=square',
  1,
  NOW(),
  NOW()
),
(
  '{
    "zh": "李华",
    "en": "Hua Li"
  }',
  '{
    "zh": "首席技术官",
    "en": "Chief Technology Officer"
  }',
  '{
    "zh": "动物营养学博士，专注于宠物食品配方研发和营养科学研究。",
    "en": "PhD in Animal Nutrition, focusing on pet food formula development and nutritional science research."
  }',
  ARRAY['动物营养学博士', '食品科学硕士', 'AAFCO认证专家'],
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20woman%20scientist%20portrait%2C%20lab%20coat%2C%20confident%20expression%2C%20laboratory%20background&image_size=square',
  2,
  NOW(),
  NOW()
),
(
  '{
    "zh": "王强",
    "en": "Qiang Wang"
  }',
  '{
    "zh": "市场总监",
    "en": "Marketing Director"
  }',
  '{
    "zh": "拥有丰富的品牌营销经验，致力于传播ASUPET的品牌价值和理念。",
    "en": "Rich experience in brand marketing, dedicated to spreading ASUPET''s brand values and philosophy."
  }',
  ARRAY['市场营销硕士', '品牌管理专家', '数字营销认证'],
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20man%20marketing%20director%20portrait%2C%20business%20casual%2C%20friendly%20smile%2C%20modern%20office&image_size=square',
  3,
  NOW(),
  NOW()
);