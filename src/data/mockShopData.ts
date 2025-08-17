// 模拟商城数据，用于展示商城功能
// Mock shop data for demonstrating shop functionality

export interface Product {
  id: string;
  name: any;
  description: any;
  short_description: any;
  sku: string;
  price: number;
  compare_price?: number;
  weight?: number;
  category_id: string;
  tags: string[];
  images: any;
  specifications: any;
  ingredients: any;
  feeding_guide: any;
  nutritional_analysis: any;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: any;
  description: any;
  slug: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: { zh: '犬粮系列', en: 'Dog Food Series' },
    description: { zh: '专为不同年龄段和体型的犬类设计的营养配方', en: 'Nutritional formulas designed for dogs of different ages and sizes' },
    slug: 'dog-food',
    image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20dog%20food%20category%20banner%2C%20healthy%20dogs%20eating%2C%20modern%20packaging&image_size=landscape_16_9',
    sort_order: 1,
    is_active: true
  },
  {
    id: '2',
    name: { zh: '猫粮系列', en: 'Cat Food Series' },
    description: { zh: '为猫咪量身定制的营养均衡配方', en: 'Nutritionally balanced formulas tailored for cats' },
    slug: 'cat-food',
    image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20cat%20food%20category%20banner%2C%20healthy%20cats%20eating%2C%20modern%20packaging&image_size=landscape_16_9',
    sort_order: 2,
    is_active: true
  },
  {
    id: '3',
    name: { zh: '营养补充剂', en: 'Nutritional Supplements' },
    description: { zh: '专业的宠物营养补充产品', en: 'Professional pet nutritional supplement products' },
    slug: 'supplements',
    image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20nutritional%20supplements%20bottles%20and%20tablets%2C%20health%20focused%20design&image_size=landscape_16_9',
    sort_order: 3,
    is_active: true
  },
  {
    id: '4',
    name: { zh: '功能性零食', en: 'Functional Treats' },
    description: { zh: '美味与营养并重的宠物零食', en: 'Pet treats that combine taste and nutrition' },
    slug: 'treats',
    image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20pet%20treats%20and%20snacks%2C%20colorful%20packaging%2C%20happy%20pets&image_size=landscape_16_9',
    sort_order: 4,
    is_active: true
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: { zh: 'ASUPET AI智能营养配方 成犬粮', en: 'ASUPET AI Smart Nutrition Formula Adult Dog Food' },
    description: { zh: '采用先进AI算法分析，为成年犬量身定制的营养配方。精选优质蛋白质，添加益生菌和Omega-3脂肪酸，支持消化健康和毛发光泽。无人工色素和防腐剂，天然健康。', en: 'Developed using advanced AI algorithms, this nutrition formula is tailored for adult dogs. Features premium protein sources, probiotics, and Omega-3 fatty acids to support digestive health and coat shine. No artificial colors or preservatives, naturally healthy.' },
    short_description: { zh: 'AI智能配方，专为成犬设计的营养均衡犬粮', en: 'AI-powered formula, nutritionally balanced dog food designed for adult dogs' },
    sku: 'ASUPET-DOG-ADULT-001',
    price: 299.00,
    compare_price: 399.00,
    weight: 3.0,
    category_id: '1',
    tags: ['AI配方', '成犬', '营养均衡', '益生菌', 'AI formula', 'adult dog', 'balanced nutrition', 'probiotics'],
    images: [
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20dog%20food%20bag%20ASUPET%20brand%2C%20AI%20technology%20elements%2C%20adult%20dog%20formula&image_size=square', alt: 'ASUPET AI智能营养配方 成犬粮', sort: 1 },
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20food%20kibbles%20close%20up%2C%20high%20quality%20ingredients%2C%20nutritious%20appearance&image_size=square', alt: '犬粮颗粒特写', sort: 2 }
    ],
    specifications: { zh: { '蛋白质': '28%', '脂肪': '15%', '纤维': '4%', '水分': '10%', '钙': '1.2%', '磷': '1.0%' }, en: { 'Protein': '28%', 'Fat': '15%', 'Fiber': '4%', 'Moisture': '10%', 'Calcium': '1.2%', 'Phosphorus': '1.0%' } },
    ingredients: { zh: ['去骨鸡肉', '糙米', '燕麦', '鱼油', '益生菌', '维生素E', '牛磺酸'], en: ['Deboned Chicken', 'Brown Rice', 'Oats', 'Fish Oil', 'Probiotics', 'Vitamin E', 'Taurine'] },
    feeding_guide: { zh: { '5-10kg': '80-120g/天', '10-20kg': '120-200g/天', '20-30kg': '200-280g/天', '30kg以上': '280g+/天' }, en: { '5-10kg': '80-120g/day', '10-20kg': '120-200g/day', '20-30kg': '200-280g/day', '30kg+': '280g+/day' } },
    nutritional_analysis: { zh: { '粗蛋白质': '≥28%', '粗脂肪': '≥15%', '粗纤维': '≤4%', '粗灰分': '≤8%', '水分': '≤10%', '钙': '1.0-1.5%', '总磷': '0.8-1.2%' }, en: { 'Crude Protein': '≥28%', 'Crude Fat': '≥15%', 'Crude Fiber': '≤4%', 'Crude Ash': '≤8%', 'Moisture': '≤10%', 'Calcium': '1.0-1.5%', 'Total Phosphorus': '0.8-1.2%' } },
    stock_quantity: 150,
    is_active: true,
    is_featured: true,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: { zh: 'ASUPET 幼犬成长配方', en: 'ASUPET Puppy Growth Formula' },
    description: { zh: '专为幼犬成长期设计的高营养密度配方。富含DHA促进大脑发育，高蛋白支持肌肉发育，添加钙质强化骨骼。小颗粒设计，易于幼犬咀嚼消化。', en: 'High-nutrition density formula designed for puppy growth period. Rich in DHA for brain development, high protein for muscle development, added calcium for bone strengthening. Small kibble design for easy chewing and digestion.' },
    short_description: { zh: '专为幼犬设计的高营养成长配方', en: 'High-nutrition growth formula designed for puppies' },
    sku: 'ASUPET-DOG-PUPPY-001',
    price: 329.00,
    compare_price: 429.00,
    weight: 2.5,
    category_id: '1',
    tags: ['幼犬', '成长配方', 'DHA', '高蛋白', 'puppy', 'growth formula', 'DHA', 'high protein'],
    images: [
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=puppy%20food%20bag%20ASUPET%20brand%2C%20growth%20formula%2C%20cute%20puppy%20design&image_size=square', alt: 'ASUPET 幼犬成长配方', sort: 1 },
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=small%20puppy%20kibbles%2C%20easy%20to%20chew%20size%2C%20nutritious%20appearance&image_size=square', alt: '幼犬粮颗粒', sort: 2 }
    ],
    specifications: { zh: { '蛋白质': '32%', '脂肪': '18%', '纤维': '3%', '水分': '10%', '钙': '1.5%', '磷': '1.2%', 'DHA': '0.1%' }, en: { 'Protein': '32%', 'Fat': '18%', 'Fiber': '3%', 'Moisture': '10%', 'Calcium': '1.5%', 'Phosphorus': '1.2%', 'DHA': '0.1%' } },
    ingredients: { zh: ['鸡肉粉', '鱼肉', '糙米', '鱼油', 'DHA', '益生菌', '维生素复合物'], en: ['Chicken Meal', 'Fish', 'Brown Rice', 'Fish Oil', 'DHA', 'Probiotics', 'Vitamin Complex'] },
    feeding_guide: { zh: { '2-5kg': '60-100g/天', '5-10kg': '100-150g/天', '10-15kg': '150-200g/天' }, en: { '2-5kg': '60-100g/day', '5-10kg': '100-150g/day', '10-15kg': '150-200g/day' } },
    nutritional_analysis: { zh: { '粗蛋白质': '≥32%', '粗脂肪': '≥18%', '粗纤维': '≤3%', '粗灰分': '≤8%', '水分': '≤10%', '钙': '1.2-1.8%', '总磷': '1.0-1.4%' }, en: { 'Crude Protein': '≥32%', 'Crude Fat': '≥18%', 'Crude Fiber': '≤3%', 'Crude Ash': '≤8%', 'Moisture': '≤10%', 'Calcium': '1.2-1.8%', 'Total Phosphorus': '1.0-1.4%' } },
    stock_quantity: 120,
    is_active: true,
    is_featured: true,
    created_at: '2024-01-14T10:00:00Z'
  },
  {
    id: '3',
    name: { zh: 'ASUPET 全阶段猫粮配方', en: 'ASUPET All Life Stages Cat Formula' },
    description: { zh: '适合所有年龄段猫咪的全营养配方。以鱼肉为主要蛋白质来源，添加牛磺酸支持心脏健康，Omega-3和Omega-6维护皮毛健康。无谷物配方，减少过敏风险。', en: 'Complete nutrition formula suitable for cats of all ages. Fish as the main protein source, added taurine for heart health, Omega-3 and Omega-6 for coat health. Grain-free formula reduces allergy risks.' },
    short_description: { zh: '全阶段猫咪营养配方，无谷物设计', en: 'All life stages cat nutrition formula, grain-free design' },
    sku: 'ASUPET-CAT-ALL-001',
    price: 259.00,
    compare_price: 339.00,
    weight: 2.0,
    category_id: '2',
    tags: ['全阶段', '无谷物', '牛磺酸', '鱼肉', 'all stages', 'grain-free', 'taurine', 'fish'],
    images: [
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20cat%20food%20bag%20ASUPET%20brand%2C%20all%20life%20stages%2C%20fish%20formula&image_size=square', alt: 'ASUPET 全阶段猫粮配方', sort: 1 },
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cat%20food%20kibbles%20with%20fish%20ingredients%2C%20grain%20free%20formula&image_size=square', alt: '猫粮颗粒特写', sort: 2 }
    ],
    specifications: { zh: { '蛋白质': '35%', '脂肪': '16%', '纤维': '3%', '水分': '10%', '牛磺酸': '0.15%', '灰分': '7%' }, en: { 'Protein': '35%', 'Fat': '16%', 'Fiber': '3%', 'Moisture': '10%', 'Taurine': '0.15%', 'Ash': '7%' } },
    ingredients: { zh: ['去骨鱼肉', '鸡肉粉', '豌豆', '鱼油', '牛磺酸', '维生素E', '益生菌'], en: ['Deboned Fish', 'Chicken Meal', 'Peas', 'Fish Oil', 'Taurine', 'Vitamin E', 'Probiotics'] },
    feeding_guide: { zh: { '2-4kg': '30-50g/天', '4-6kg': '50-70g/天', '6kg以上': '70g+/天' }, en: { '2-4kg': '30-50g/day', '4-6kg': '50-70g/day', '6kg+': '70g+/day' } },
    nutritional_analysis: { zh: { '粗蛋白质': '≥35%', '粗脂肪': '≥16%', '粗纤维': '≤3%', '粗灰分': '≤7%', '水分': '≤10%', '牛磺酸': '≥0.15%' }, en: { 'Crude Protein': '≥35%', 'Crude Fat': '≥16%', 'Crude Fiber': '≤3%', 'Crude Ash': '≤7%', 'Moisture': '≤10%', 'Taurine': '≥0.15%' } },
    stock_quantity: 100,
    is_active: true,
    is_featured: true,
    created_at: '2024-01-13T10:00:00Z'
  },
  {
    id: '4',
    name: { zh: 'ASUPET 关节护理胶囊', en: 'ASUPET Joint Care Capsules' },
    description: { zh: '专为宠物关节健康设计的营养补充剂。含有葡萄糖胺、软骨素和MSM，有助于维护关节软骨健康，减缓关节磨损，提高活动能力。适合老年宠物和大型犬使用。', en: 'Nutritional supplement designed for pet joint health. Contains glucosamine, chondroitin, and MSM to help maintain joint cartilage health, reduce joint wear, and improve mobility. Suitable for senior pets and large dogs.' },
    short_description: { zh: '关节健康营养补充剂，含葡萄糖胺和软骨素', en: 'Joint health supplement with glucosamine and chondroitin' },
    sku: 'ASUPET-SUPP-JOINT-001',
    price: 189.00,
    compare_price: 249.00,
    weight: 0.15,
    category_id: '3',
    tags: ['关节护理', '葡萄糖胺', '软骨素', '老年宠物', 'joint care', 'glucosamine', 'chondroitin', 'senior pets'],
    images: [
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20joint%20supplement%20bottle%20ASUPET%20brand%2C%20capsules%20visible%2C%20health%20focused&image_size=square', alt: 'ASUPET 关节护理胶囊', sort: 1 }
    ],
    specifications: { zh: { '葡萄糖胺': '500mg/粒', '软骨素': '400mg/粒', 'MSM': '200mg/粒', '维生素C': '50mg/粒' }, en: { 'Glucosamine': '500mg/capsule', 'Chondroitin': '400mg/capsule', 'MSM': '200mg/capsule', 'Vitamin C': '50mg/capsule' } },
    ingredients: { zh: ['葡萄糖胺硫酸盐', '硫酸软骨素', 'MSM', '维生素C', '明胶胶囊'], en: ['Glucosamine Sulfate', 'Chondroitin Sulfate', 'MSM', 'Vitamin C', 'Gelatin Capsule'] },
    feeding_guide: { zh: { '小型犬/猫': '1粒/天', '中型犬': '2粒/天', '大型犬': '3粒/天' }, en: { 'Small dogs/cats': '1 capsule/day', 'Medium dogs': '2 capsules/day', 'Large dogs': '3 capsules/day' } },
    nutritional_analysis: { zh: { '每粒含量': '葡萄糖胺500mg，软骨素400mg，MSM200mg' }, en: { 'Per capsule': 'Glucosamine 500mg, Chondroitin 400mg, MSM 200mg' } },
    stock_quantity: 80,
    is_active: true,
    is_featured: false,
    created_at: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    name: { zh: 'ASUPET 洁齿磨牙棒', en: 'ASUPET Dental Chew Sticks' },
    description: { zh: '美味与口腔护理并重的功能性零食。特殊纹理设计有助于清洁牙齿，减少牙垢堆积。添加薄荷提取物，保持口气清新。天然成分制作，安全健康。', en: 'Functional treats that combine taste with oral care. Special texture design helps clean teeth and reduce plaque buildup. Added mint extract keeps breath fresh. Made with natural ingredients, safe and healthy.' },
    short_description: { zh: '洁齿功能零食，清洁牙齿保持口气清新', en: 'Dental function treats, clean teeth and keep breath fresh' },
    sku: 'ASUPET-TREAT-DENTAL-001',
    price: 69.00,
    compare_price: 89.00,
    weight: 0.3,
    category_id: '4',
    tags: ['洁齿', '磨牙', '口腔护理', '薄荷', 'dental', 'chew', 'oral care', 'mint'],
    images: [
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20dental%20chew%20sticks%20ASUPET%20brand%2C%20mint%20green%20color%2C%20textured%20surface&image_size=square', alt: 'ASUPET 洁齿磨牙棒', sort: 1 }
    ],
    specifications: { zh: { '蛋白质': '15%', '脂肪': '3%', '纤维': '8%', '水分': '12%', '钙': '2%' }, en: { 'Protein': '15%', 'Fat': '3%', 'Fiber': '8%', 'Moisture': '12%', 'Calcium': '2%' } },
    ingredients: { zh: ['鸡肉', '玉米淀粉', '甘油', '薄荷提取物', '维生素E'], en: ['Chicken', 'Corn Starch', 'Glycerin', 'Mint Extract', 'Vitamin E'] },
    feeding_guide: { zh: { '小型犬': '1-2根/天', '中型犬': '2-3根/天', '大型犬': '3-4根/天' }, en: { 'Small dogs': '1-2 sticks/day', 'Medium dogs': '2-3 sticks/day', 'Large dogs': '3-4 sticks/day' } },
    nutritional_analysis: { zh: { '每100g含': '蛋白质15g，脂肪3g，纤维8g' }, en: { 'Per 100g': 'Protein 15g, Fat 3g, Fiber 8g' } },
    stock_quantity: 200,
    is_active: true,
    is_featured: false,
    created_at: '2024-01-11T10:00:00Z'
  },
  {
    id: '6',
    name: { zh: 'ASUPET 老年犬专用配方', en: 'ASUPET Senior Dog Formula' },
    description: { zh: '专为7岁以上老年犬设计的营养配方。降低蛋白质含量，减轻肾脏负担。添加关节保护成分，维护骨骼健康。易消化配方，适合老年犬的消化系统。', en: 'Nutrition formula designed for senior dogs over 7 years old. Reduced protein content to ease kidney burden. Added joint protection ingredients for bone health. Easy-to-digest formula suitable for senior dog digestive systems.' },
    short_description: { zh: '专为老年犬设计的营养配方', en: 'Nutrition formula designed for senior dogs' },
    sku: 'ASUPET-DOG-SENIOR-001',
    price: 279.00,
    compare_price: 359.00,
    weight: 3.0,
    category_id: '1',
    tags: ['老年犬', '关节保护', '易消化', '低蛋白', 'senior dog', 'joint protection', 'easy digest', 'low protein'],
    images: [
      { url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20dog%20food%20bag%20ASUPET%20brand%2C%20elderly%20dog%20care%2C%20gentle%20formula&image_size=square', alt: 'ASUPET 老年犬专用配方', sort: 1 }
    ],
    specifications: { zh: { '蛋白质': '22%', '脂肪': '12%', '纤维': '5%', '水分': '10%', '钙': '1.0%', '磷': '0.8%' }, en: { 'Protein': '22%', 'Fat': '12%', 'Fiber': '5%', 'Moisture': '10%', 'Calcium': '1.0%', 'Phosphorus': '0.8%' } },
    ingredients: { zh: ['鸡肉', '糙米', '燕麦', '葡萄糖胺', '软骨素', '维生素E'], en: ['Chicken', 'Brown Rice', 'Oats', 'Glucosamine', 'Chondroitin', 'Vitamin E'] },
    feeding_guide: { zh: { '5-10kg': '70-110g/天', '10-20kg': '110-180g/天', '20-30kg': '180-250g/天' }, en: { '5-10kg': '70-110g/day', '10-20kg': '110-180g/day', '20-30kg': '180-250g/day' } },
    nutritional_analysis: { zh: { '粗蛋白质': '≥22%', '粗脂肪': '≥12%', '粗纤维': '≤5%', '粗灰分': '≤8%', '水分': '≤10%' }, en: { 'Crude Protein': '≥22%', 'Crude Fat': '≥12%', 'Crude Fiber': '≤5%', 'Crude Ash': '≤8%', 'Moisture': '≤10%' } },
    stock_quantity: 90,
    is_active: true,
    is_featured: false,
    created_at: '2024-01-10T10:00:00Z'
  }
];