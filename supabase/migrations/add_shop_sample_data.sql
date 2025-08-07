-- 添加商城示例数据
-- Add sample data for shop

-- 插入商品分类
INSERT INTO product_categories (name, description, slug, image_url, sort_order) VALUES
(
  '{"zh": "犬粮系列", "en": "Dog Food Series"}',
  '{"zh": "专为不同年龄段和体型的犬类设计的营养配方", "en": "Nutritional formulas designed for dogs of different ages and sizes"}',
  'dog-food',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20dog%20food%20category%20banner%2C%20healthy%20dogs%20eating%2C%20modern%20packaging&image_size=landscape_16_9',
  1
),
(
  '{"zh": "猫粮系列", "en": "Cat Food Series"}',
  '{"zh": "为猫咪量身定制的营养均衡配方", "en": "Nutritionally balanced formulas tailored for cats"}',
  'cat-food',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20cat%20food%20category%20banner%2C%20healthy%20cats%20eating%2C%20modern%20packaging&image_size=landscape_16_9',
  2
),
(
  '{"zh": "营养补充剂", "en": "Nutritional Supplements"}',
  '{"zh": "专业的宠物营养补充产品", "en": "Professional pet nutritional supplement products"}',
  'supplements',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20nutritional%20supplements%20bottles%20and%20tablets%2C%20health%20focused%20design&image_size=landscape_16_9',
  3
),
(
  '{"zh": "功能性零食", "en": "Functional Treats"}',
  '{"zh": "美味与营养并重的宠物零食", "en": "Pet treats that combine taste and nutrition"}',
  'treats',
  'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20pet%20treats%20and%20snacks%2C%20colorful%20packaging%2C%20happy%20pets&image_size=landscape_16_9',
  4
);

-- 获取分类ID（用于后续插入商品）
-- 插入犬粮商品
INSERT INTO products (
  name, 
  description, 
  short_description, 
  sku, 
  price, 
  compare_price, 
  weight, 
  category_id, 
  tags, 
  images, 
  specifications, 
  ingredients, 
  feeding_guide, 
  nutritional_analysis, 
  stock_quantity, 
  is_featured
) VALUES
(
  '{"zh": "ASUPET AI智能营养配方 成犬粮", "en": "ASUPET AI Smart Nutrition Formula Adult Dog Food"}',
  '{"zh": "采用先进AI算法分析，为成年犬量身定制的营养配方。精选优质蛋白质，添加益生菌和Omega-3脂肪酸，支持消化健康和毛发光泽。无人工色素和防腐剂，天然健康。", "en": "Developed using advanced AI algorithms, this nutrition formula is tailored for adult dogs. Features premium protein sources, probiotics, and Omega-3 fatty acids to support digestive health and coat shine. No artificial colors or preservatives, naturally healthy."}',
  '{"zh": "AI智能配方，专为成犬设计的营养均衡犬粮", "en": "AI-powered formula, nutritionally balanced dog food designed for adult dogs"}',
  'ASUPET-DOG-ADULT-001',
  299.00,
  399.00,
  3.0,
  (SELECT id FROM product_categories WHERE slug = 'dog-food' LIMIT 1),
  ARRAY['AI配方', '成犬', '营养均衡', '益生菌', 'AI formula', 'adult dog', 'balanced nutrition', 'probiotics'],
  '[
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20dog%20food%20bag%20ASUPET%20brand%2C%20AI%20technology%20elements%2C%20adult%20dog%20formula&image_size=square", "alt": "ASUPET AI智能营养配方 成犬粮", "sort": 1},
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20food%20kibbles%20close%20up%2C%20high%20quality%20ingredients%2C%20nutritious%20appearance&image_size=square", "alt": "犬粮颗粒特写", "sort": 2},
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20healthy%20adult%20dog%20eating%20from%20bowl%2C%20premium%20pet%20food%20scene&image_size=square", "alt": "健康成犬进食场景", "sort": 3}
  ]',
  '{"zh": {"蛋白质": "28%", "脂肪": "15%", "纤维": "4%", "水分": "10%", "钙": "1.2%", "磷": "1.0%"}, "en": {"Protein": "28%", "Fat": "15%", "Fiber": "4%", "Moisture": "10%", "Calcium": "1.2%", "Phosphorus": "1.0%"}}',
  '{"zh": ["去骨鸡肉", "糙米", "燕麦", "鱼油", "益生菌", "维生素E", "牛磺酸"], "en": ["Deboned Chicken", "Brown Rice", "Oats", "Fish Oil", "Probiotics", "Vitamin E", "Taurine"]}',
  '{"zh": {"5-10kg": "80-120g/天", "10-20kg": "120-200g/天", "20-30kg": "200-280g/天", "30kg以上": "280g+/天"}, "en": {"5-10kg": "80-120g/day", "10-20kg": "120-200g/day", "20-30kg": "200-280g/day", "30kg+": "280g+/day"}}',
  '{"zh": {"粗蛋白质": "≥28%", "粗脂肪": "≥15%", "粗纤维": "≤4%", "粗灰分": "≤8%", "水分": "≤10%", "钙": "1.0-1.5%", "总磷": "0.8-1.2%"}, "en": {"Crude Protein": "≥28%", "Crude Fat": "≥15%", "Crude Fiber": "≤4%", "Crude Ash": "≤8%", "Moisture": "≤10%", "Calcium": "1.0-1.5%", "Total Phosphorus": "0.8-1.2%"}}',
  150,
  true
),
(
  '{"zh": "ASUPET 幼犬成长配方", "en": "ASUPET Puppy Growth Formula"}',
  '{"zh": "专为幼犬成长期设计的高营养密度配方。富含DHA促进大脑发育，高蛋白支持肌肉发育，添加钙质强化骨骼。小颗粒设计，易于幼犬咀嚼消化。", "en": "High-nutrition density formula designed for puppy growth period. Rich in DHA for brain development, high protein for muscle development, added calcium for bone strengthening. Small kibble design for easy chewing and digestion."}',
  '{"zh": "专为幼犬设计的高营养成长配方", "en": "High-nutrition growth formula designed for puppies"}',
  'ASUPET-DOG-PUPPY-001',
  329.00,
  429.00,
  2.5,
  (SELECT id FROM product_categories WHERE slug = 'dog-food' LIMIT 1),
  ARRAY['幼犬', '成长配方', 'DHA', '高蛋白', 'puppy', 'growth formula', 'DHA', 'high protein'],
  '[
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=puppy%20food%20bag%20ASUPET%20brand%2C%20growth%20formula%2C%20cute%20puppy%20design&image_size=square", "alt": "ASUPET 幼犬成长配方", "sort": 1},
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=small%20puppy%20kibbles%2C%20easy%20to%20chew%20size%2C%20nutritious%20appearance&image_size=square", "alt": "幼犬粮颗粒", "sort": 2}
  ]',
  '{"zh": {"蛋白质": "32%", "脂肪": "18%", "纤维": "3%", "水分": "10%", "钙": "1.5%", "磷": "1.2%", "DHA": "0.1%"}, "en": {"Protein": "32%", "Fat": "18%", "Fiber": "3%", "Moisture": "10%", "Calcium": "1.5%", "Phosphorus": "1.2%", "DHA": "0.1%"}}',
  '{"zh": ["鸡肉粉", "鱼肉", "糙米", "鱼油", "DHA", "益生菌", "维生素复合物"], "en": ["Chicken Meal", "Fish", "Brown Rice", "Fish Oil", "DHA", "Probiotics", "Vitamin Complex"]}',
  '{"zh": {"2-5kg": "60-100g/天", "5-10kg": "100-150g/天", "10-15kg": "150-200g/天"}, "en": {"2-5kg": "60-100g/day", "5-10kg": "100-150g/day", "10-15kg": "150-200g/day"}}',
  '{"zh": {"粗蛋白质": "≥32%", "粗脂肪": "≥18%", "粗纤维": "≤3%", "粗灰分": "≤8%", "水分": "≤10%", "钙": "1.2-1.8%", "总磷": "1.0-1.4%"}, "en": {"Crude Protein": "≥32%", "Crude Fat": "≥18%", "Crude Fiber": "≤3%", "Crude Ash": "≤8%", "Moisture": "≤10%", "Calcium": "1.2-1.8%", "Total Phosphorus": "1.0-1.4%"}}',
  120,
  true
);

-- 插入猫粮商品
INSERT INTO products (
  name, 
  description, 
  short_description, 
  sku, 
  price, 
  compare_price, 
  weight, 
  category_id, 
  tags, 
  images, 
  specifications, 
  ingredients, 
  feeding_guide, 
  nutritional_analysis, 
  stock_quantity, 
  is_featured
) VALUES
(
  '{"zh": "ASUPET 全阶段猫粮配方", "en": "ASUPET All Life Stages Cat Formula"}',
  '{"zh": "适合所有年龄段猫咪的全营养配方。以鱼肉为主要蛋白质来源，添加牛磺酸支持心脏健康，Omega-3和Omega-6维护皮毛健康。无谷物配方，减少过敏风险。", "en": "Complete nutrition formula suitable for cats of all ages. Fish as the main protein source, added taurine for heart health, Omega-3 and Omega-6 for coat health. Grain-free formula reduces allergy risks."}',
  '{"zh": "全阶段猫咪营养配方，无谷物设计", "en": "All life stages cat nutrition formula, grain-free design"}',
  'ASUPET-CAT-ALL-001',
  259.00,
  339.00,
  2.0,
  (SELECT id FROM product_categories WHERE slug = 'cat-food' LIMIT 1),
  ARRAY['全阶段', '无谷物', '牛磺酸', '鱼肉', 'all stages', 'grain-free', 'taurine', 'fish'],
  '[
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20cat%20food%20bag%20ASUPET%20brand%2C%20all%20life%20stages%2C%20fish%20formula&image_size=square", "alt": "ASUPET 全阶段猫粮配方", "sort": 1},
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cat%20food%20kibbles%20with%20fish%20ingredients%2C%20grain%20free%20formula&image_size=square", "alt": "猫粮颗粒特写", "sort": 2}
  ]',
  '{"zh": {"蛋白质": "35%", "脂肪": "16%", "纤维": "3%", "水分": "10%", "牛磺酸": "0.15%", "灰分": "7%"}, "en": {"Protein": "35%", "Fat": "16%", "Fiber": "3%", "Moisture": "10%", "Taurine": "0.15%", "Ash": "7%"}}',
  '{"zh": ["去骨鱼肉", "鸡肉粉", "豌豆", "鱼油", "牛磺酸", "维生素E", "益生菌"], "en": ["Deboned Fish", "Chicken Meal", "Peas", "Fish Oil", "Taurine", "Vitamin E", "Probiotics"]}',
  '{"zh": {"2-4kg": "30-50g/天", "4-6kg": "50-70g/天", "6kg以上": "70g+/天"}, "en": {"2-4kg": "30-50g/day", "4-6kg": "50-70g/day", "6kg+": "70g+/day"}}',
  '{"zh": {"粗蛋白质": "≥35%", "粗脂肪": "≥16%", "粗纤维": "≤3%", "粗灰分": "≤7%", "水分": "≤10%", "牛磺酸": "≥0.15%"}, "en": {"Crude Protein": "≥35%", "Crude Fat": "≥16%", "Crude Fiber": "≤3%", "Crude Ash": "≤7%", "Moisture": "≤10%", "Taurine": "≥0.15%"}}',
  100,
  true
);

-- 插入营养补充剂
INSERT INTO products (
  name, 
  description, 
  short_description, 
  sku, 
  price, 
  compare_price, 
  weight, 
  category_id, 
  tags, 
  images, 
  specifications, 
  ingredients, 
  feeding_guide, 
  nutritional_analysis, 
  stock_quantity
) VALUES
(
  '{"zh": "ASUPET 关节护理胶囊", "en": "ASUPET Joint Care Capsules"}',
  '{"zh": "专为宠物关节健康设计的营养补充剂。含有葡萄糖胺、软骨素和MSM，有助于维护关节软骨健康，减缓关节磨损，提高活动能力。适合老年宠物和大型犬使用。", "en": "Nutritional supplement designed for pet joint health. Contains glucosamine, chondroitin, and MSM to help maintain joint cartilage health, reduce joint wear, and improve mobility. Suitable for senior pets and large dogs."}',
  '{"zh": "关节健康营养补充剂，含葡萄糖胺和软骨素", "en": "Joint health supplement with glucosamine and chondroitin"}',
  'ASUPET-SUPP-JOINT-001',
  189.00,
  249.00,
  0.15,
  (SELECT id FROM product_categories WHERE slug = 'supplements' LIMIT 1),
  ARRAY['关节护理', '葡萄糖胺', '软骨素', '老年宠物', 'joint care', 'glucosamine', 'chondroitin', 'senior pets'],
  '[
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20joint%20supplement%20bottle%20ASUPET%20brand%2C%20capsules%20visible%2C%20health%20focused&image_size=square", "alt": "ASUPET 关节护理胶囊", "sort": 1}
  ]',
  '{"zh": {"葡萄糖胺": "500mg/粒", "软骨素": "400mg/粒", "MSM": "200mg/粒", "维生素C": "50mg/粒"}, "en": {"Glucosamine": "500mg/capsule", "Chondroitin": "400mg/capsule", "MSM": "200mg/capsule", "Vitamin C": "50mg/capsule"}}',
  '{"zh": ["葡萄糖胺硫酸盐", "硫酸软骨素", "MSM", "维生素C", "明胶胶囊"], "en": ["Glucosamine Sulfate", "Chondroitin Sulfate", "MSM", "Vitamin C", "Gelatin Capsule"]}',
  '{"zh": {"小型犬/猫": "1粒/天", "中型犬": "2粒/天", "大型犬": "3粒/天"}, "en": {"Small dogs/cats": "1 capsule/day", "Medium dogs": "2 capsules/day", "Large dogs": "3 capsules/day"}}',
  '{"zh": {"每粒含量": "葡萄糖胺500mg，软骨素400mg，MSM200mg"}, "en": {"Per capsule": "Glucosamine 500mg, Chondroitin 400mg, MSM 200mg"}}',
  80
);

-- 插入功能性零食
INSERT INTO products (
  name, 
  description, 
  short_description, 
  sku, 
  price, 
  compare_price, 
  weight, 
  category_id, 
  tags, 
  images, 
  specifications, 
  ingredients, 
  feeding_guide, 
  nutritional_analysis, 
  stock_quantity
) VALUES
(
  '{"zh": "ASUPET 洁齿磨牙棒", "en": "ASUPET Dental Chew Sticks"}',
  '{"zh": "美味与口腔护理并重的功能性零食。特殊纹理设计有助于清洁牙齿，减少牙垢堆积。添加薄荷提取物，保持口气清新。天然成分制作，安全健康。", "en": "Functional treats that combine taste with oral care. Special texture design helps clean teeth and reduce plaque buildup. Added mint extract keeps breath fresh. Made with natural ingredients, safe and healthy."}',
  '{"zh": "洁齿功能零食，清洁牙齿保持口气清新", "en": "Dental function treats, clean teeth and keep breath fresh"}',
  'ASUPET-TREAT-DENTAL-001',
  69.00,
  89.00,
  0.3,
  (SELECT id FROM product_categories WHERE slug = 'treats' LIMIT 1),
  ARRAY['洁齿', '磨牙', '口腔护理', '薄荷', 'dental', 'chew', 'oral care', 'mint'],
  '[
    {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20dental%20chew%20sticks%20ASUPET%20brand%2C%20mint%20green%20color%2C%20textured%20surface&image_size=square", "alt": "ASUPET 洁齿磨牙棒", "sort": 1}
  ]',
  '{"zh": {"蛋白质": "15%", "脂肪": "3%", "纤维": "8%", "水分": "12%", "钙": "2%"}, "en": {"Protein": "15%", "Fat": "3%", "Fiber": "8%", "Moisture": "12%", "Calcium": "2%"}}',
  '{"zh": ["鸡肉", "玉米淀粉", "甘油", "薄荷提取物", "维生素E"], "en": ["Chicken", "Corn Starch", "Glycerin", "Mint Extract", "Vitamin E"]}',
  '{"zh": {"小型犬": "1-2根/天", "中型犬": "2-3根/天", "大型犬": "3-4根/天"}, "en": {"Small dogs": "1-2 sticks/day", "Medium dogs": "2-3 sticks/day", "Large dogs": "3-4 sticks/day"}}',
  '{"zh": {"每100g含": "蛋白质15g，脂肪3g，纤维8g"}, "en": {"Per 100g": "Protein 15g, Fat 3g, Fiber 8g"}}',
  200
);

-- 为主要商品添加变体（不同规格）
INSERT INTO product_variants (product_id, name, sku, price, compare_price, weight, stock_quantity, is_default, attributes) VALUES
-- ASUPET AI智能营养配方 成犬粮的变体
(
  (SELECT id FROM products WHERE sku = 'ASUPET-DOG-ADULT-001' LIMIT 1),
  '{"zh": "1.5kg装", "en": "1.5kg Pack"}',
  'ASUPET-DOG-ADULT-001-1.5KG',
  199.00,
  259.00,
  1.5,
  80,
  false,
  '{"size": "1.5kg", "package_type": "small"}'
),
(
  (SELECT id FROM products WHERE sku = 'ASUPET-DOG-ADULT-001' LIMIT 1),
  '{"zh": "3kg装", "en": "3kg Pack"}',
  'ASUPET-DOG-ADULT-001-3KG',
  299.00,
  399.00,
  3.0,
  150,
  true,
  '{"size": "3kg", "package_type": "standard"}'
),
(
  (SELECT id FROM products WHERE sku = 'ASUPET-DOG-ADULT-001' LIMIT 1),
  '{"zh": "7.5kg装", "en": "7.5kg Pack"}',
  'ASUPET-DOG-ADULT-001-7.5KG',
  599.00,
  799.00,
  7.5,
  60,
  false,
  '{"size": "7.5kg", "package_type": "large"}'
);

-- 添加一些商品评价示例
INSERT INTO product_reviews (product_id, customer_name, rating, title, content, is_verified, is_approved) VALUES
(
  (SELECT id FROM products WHERE sku = 'ASUPET-DOG-ADULT-001' LIMIT 1),
  '张女士',
  5,
  '我家狗狗很喜欢',
  '买了这款犬粮给我家金毛，它很喜欢吃，而且毛色变得更亮了。包装也很好，密封性不错。',
  true,
  true
),
(
  (SELECT id FROM products WHERE sku = 'ASUPET-DOG-ADULT-001' LIMIT 1),
  '李先生',
  4,
  '营养均衡，性价比高',
  '成分看起来很不错，狗狗吃了一个月，体重控制得很好，便便也正常。会继续购买。',
  true,
  true
),
(
  (SELECT id FROM products WHERE sku = 'ASUPET-CAT-ALL-001' LIMIT 1),
  '王小姐',
  5,
  '猫咪爱吃，无谷物很好',
  '我家猫咪肠胃敏感，这款无谷物配方很适合。吃了没有拉肚子，而且很爱吃。',
  true,
  true
);