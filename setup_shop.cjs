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

async function setupShop() {
  try {
    console.log('开始创建商城数据...');
    
    // 创建商品分类
    console.log('创建商品分类...');
    const categories = [
      {
        name: JSON.stringify({"zh": "犬粮系列", "en": "Dog Food Series"}),
        description: JSON.stringify({"zh": "专为不同年龄段和体型的犬类设计的营养配方", "en": "Nutritional formulas designed for dogs of different ages and sizes"}),
        slug: 'dog-food',
        image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20dog%20food%20category%20banner%2C%20healthy%20dogs%20eating%2C%20modern%20packaging&image_size=landscape_16_9',
        sort_order: 1
      },
      {
        name: JSON.stringify({"zh": "猫粮系列", "en": "Cat Food Series"}),
        description: JSON.stringify({"zh": "为猫咪量身定制的营养均衡配方", "en": "Nutritionally balanced formulas tailored for cats"}),
        slug: 'cat-food',
        image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20cat%20food%20category%20banner%2C%20healthy%20cats%20eating%2C%20modern%20packaging&image_size=landscape_16_9',
        sort_order: 2
      },
      {
        name: JSON.stringify({"zh": "营养补充剂", "en": "Nutritional Supplements"}),
        description: JSON.stringify({"zh": "专业的宠物营养补充产品", "en": "Professional pet nutritional supplement products"}),
        slug: 'supplements',
        image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20nutritional%20supplements%20bottles%20and%20tablets%2C%20health%20focused%20design&image_size=landscape_16_9',
        sort_order: 3
      },
      {
        name: JSON.stringify({"zh": "功能性零食", "en": "Functional Treats"}),
        description: JSON.stringify({"zh": "美味与营养并重的宠物零食", "en": "Pet treats that combine taste and nutrition"}),
        slug: 'treats',
        image_url: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20pet%20treats%20and%20snacks%2C%20colorful%20packaging%2C%20happy%20pets&image_size=landscape_16_9',
        sort_order: 4
      }
    ];

    const { data: insertedCategories, error: catError } = await supabase
      .from('product_categories')
      .insert(categories)
      .select();

    if (catError) {
      console.log('创建分类错误:', catError);
      return;
    }
    
    console.log('分类创建成功:', insertedCategories.length, '个');
    
    // 获取分类ID
    const dogFoodCat = insertedCategories.find(cat => cat.slug === 'dog-food');
    const catFoodCat = insertedCategories.find(cat => cat.slug === 'cat-food');
    const supplementsCat = insertedCategories.find(cat => cat.slug === 'supplements');
    const treatsCat = insertedCategories.find(cat => cat.slug === 'treats');
    
    // 创建商品
    console.log('创建商品...');
    const products = [
      {
        name: JSON.stringify({"zh": "ASUPET AI智能营养配方 成犬粮", "en": "ASUPET AI Smart Nutrition Formula Adult Dog Food"}),
        description: JSON.stringify({"zh": "采用先进AI算法分析，为成年犬量身定制的营养配方。精选优质蛋白质，添加益生菌和Omega-3脂肪酸，支持消化健康和毛发光泽。无人工色素和防腐剂，天然健康。", "en": "Developed using advanced AI algorithms, this nutrition formula is tailored for adult dogs. Features premium protein sources, probiotics, and Omega-3 fatty acids to support digestive health and coat shine. No artificial colors or preservatives, naturally healthy."}),
        short_description: JSON.stringify({"zh": "AI智能配方，专为成犬设计的营养均衡犬粮", "en": "AI-powered formula, nutritionally balanced dog food designed for adult dogs"}),
        sku: 'ASUPET-DOG-ADULT-001',
        price: 299.00,
        compare_price: 399.00,
        weight: 3.0,
        category_id: dogFoodCat.id,
        tags: ['AI配方', '成犬', '营养均衡', '益生菌', 'AI formula', 'adult dog', 'balanced nutrition', 'probiotics'],
        images: JSON.stringify([
          {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20dog%20food%20bag%20ASUPET%20brand%2C%20AI%20technology%20elements%2C%20adult%20dog%20formula&image_size=square", "alt": "ASUPET AI智能营养配方 成犬粮", "sort": 1},
          {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20food%20kibbles%20close%20up%2C%20high%20quality%20ingredients%2C%20nutritious%20appearance&image_size=square", "alt": "犬粮颗粒特写", "sort": 2}
        ]),
        specifications: JSON.stringify({"zh": {"蛋白质": "28%", "脂肪": "15%", "纤维": "4%", "水分": "10%", "钙": "1.2%", "磷": "1.0%"}, "en": {"Protein": "28%", "Fat": "15%", "Fiber": "4%", "Moisture": "10%", "Calcium": "1.2%", "Phosphorus": "1.0%"}}),
        ingredients: JSON.stringify({"zh": ["去骨鸡肉", "糙米", "燕麦", "鱼油", "益生菌", "维生素E", "牛磺酸"], "en": ["Deboned Chicken", "Brown Rice", "Oats", "Fish Oil", "Probiotics", "Vitamin E", "Taurine"]}),
        feeding_guide: JSON.stringify({"zh": {"5-10kg": "80-120g/天", "10-20kg": "120-200g/天", "20-30kg": "200-280g/天", "30kg以上": "280g+/天"}, "en": {"5-10kg": "80-120g/day", "10-20kg": "120-200g/day", "20-30kg": "200-280g/day", "30kg+": "280g+/day"}}),
        nutritional_analysis: JSON.stringify({"zh": {"粗蛋白质": "≥28%", "粗脂肪": "≥15%", "粗纤维": "≤4%", "粗灰分": "≤8%", "水分": "≤10%", "钙": "1.0-1.5%", "总磷": "0.8-1.2%"}, "en": {"Crude Protein": "≥28%", "Crude Fat": "≥15%", "Crude Fiber": "≤4%", "Crude Ash": "≤8%", "Moisture": "≤10%", "Calcium": "1.0-1.5%", "Total Phosphorus": "0.8-1.2%"}}),
        stock_quantity: 150,
        is_featured: true
      },
      {
        name: JSON.stringify({"zh": "ASUPET 全阶段猫粮配方", "en": "ASUPET All Life Stages Cat Formula"}),
        description: JSON.stringify({"zh": "适合所有年龄段猫咪的全营养配方。以鱼肉为主要蛋白质来源，添加牛磺酸支持心脏健康，Omega-3和Omega-6维护皮毛健康。无谷物配方，减少过敏风险。", "en": "Complete nutrition formula suitable for cats of all ages. Fish as the main protein source, added taurine for heart health, Omega-3 and Omega-6 for coat health. Grain-free formula reduces allergy risks."}),
        short_description: JSON.stringify({"zh": "全阶段猫咪营养配方，无谷物设计", "en": "All life stages cat nutrition formula, grain-free design"}),
        sku: 'ASUPET-CAT-ALL-001',
        price: 259.00,
        compare_price: 339.00,
        weight: 2.0,
        category_id: catFoodCat.id,
        tags: ['全阶段', '无谷物', '牛磺酸', '鱼肉', 'all stages', 'grain-free', 'taurine', 'fish'],
        images: JSON.stringify([
          {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20cat%20food%20bag%20ASUPET%20brand%2C%20all%20life%20stages%2C%20fish%20formula&image_size=square", "alt": "ASUPET 全阶段猫粮配方", "sort": 1}
        ]),
        specifications: JSON.stringify({"zh": {"蛋白质": "35%", "脂肪": "16%", "纤维": "3%", "水分": "10%", "牛磺酸": "0.15%", "灰分": "7%"}, "en": {"Protein": "35%", "Fat": "16%", "Fiber": "3%", "Moisture": "10%", "Taurine": "0.15%", "Ash": "7%"}}),
        ingredients: JSON.stringify({"zh": ["去骨鱼肉", "鸡肉粉", "豌豆", "鱼油", "牛磺酸", "维生素E", "益生菌"], "en": ["Deboned Fish", "Chicken Meal", "Peas", "Fish Oil", "Taurine", "Vitamin E", "Probiotics"]}),
        feeding_guide: JSON.stringify({"zh": {"2-4kg": "30-50g/天", "4-6kg": "50-70g/天", "6kg以上": "70g+/天"}, "en": {"2-4kg": "30-50g/day", "4-6kg": "50-70g/day", "6kg+": "70g+/day"}}),
        nutritional_analysis: JSON.stringify({"zh": {"粗蛋白质": "≥35%", "粗脂肪": "≥16%", "粗纤维": "≤3%", "粗灰分": "≤7%", "水分": "≤10%", "牛磺酸": "≥0.15%"}, "en": {"Crude Protein": "≥35%", "Crude Fat": "≥16%", "Crude Fiber": "≤3%", "Crude Ash": "≤7%", "Moisture": "≤10%", "Taurine": "≥0.15%"}}),
        stock_quantity: 100,
        is_featured: true
      },
      {
        name: JSON.stringify({"zh": "ASUPET 关节护理胶囊", "en": "ASUPET Joint Care Capsules"}),
        description: JSON.stringify({"zh": "专为宠物关节健康设计的营养补充剂。含有葡萄糖胺、软骨素和MSM，有助于维护关节软骨健康，减缓关节磨损，提高活动能力。适合老年宠物和大型犬使用。", "en": "Nutritional supplement designed for pet joint health. Contains glucosamine, chondroitin, and MSM to help maintain joint cartilage health, reduce joint wear, and improve mobility. Suitable for senior pets and large dogs."}),
        short_description: JSON.stringify({"zh": "关节健康营养补充剂，含葡萄糖胺和软骨素", "en": "Joint health supplement with glucosamine and chondroitin"}),
        sku: 'ASUPET-SUPP-JOINT-001',
        price: 189.00,
        compare_price: 249.00,
        weight: 0.15,
        category_id: supplementsCat.id,
        tags: ['关节护理', '葡萄糖胺', '软骨素', '老年宠物', 'joint care', 'glucosamine', 'chondroitin', 'senior pets'],
        images: JSON.stringify([
          {"url": "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20joint%20supplement%20bottle%20ASUPET%20brand%2C%20capsules%20visible%2C%20health%20focused&image_size=square", "alt": "ASUPET 关节护理胶囊", "sort": 1}
        ]),
        specifications: JSON.stringify({"zh": {"葡萄糖胺": "500mg/粒", "软骨素": "400mg/粒", "MSM": "200mg/粒", "维生素C": "50mg/粒"}, "en": {"Glucosamine": "500mg/capsule", "Chondroitin": "400mg/capsule", "MSM": "200mg/capsule", "Vitamin C": "50mg/capsule"}}),
        ingredients: JSON.stringify({"zh": ["葡萄糖胺硫酸盐", "硫酸软骨素", "MSM", "维生素C", "明胶胶囊"], "en": ["Glucosamine Sulfate", "Chondroitin Sulfate", "MSM", "Vitamin C", "Gelatin Capsule"]}),
        feeding_guide: JSON.stringify({"zh": {"小型犬/猫": "1粒/天", "中型犬": "2粒/天", "大型犬": "3粒/天"}, "en": {"Small dogs/cats": "1 capsule/day", "Medium dogs": "2 capsules/day", "Large dogs": "3 capsules/day"}}),
        nutritional_analysis: JSON.stringify({"zh": {"每粒含量": "葡萄糖胺500mg，软骨素400mg，MSM200mg"}, "en": {"Per capsule": "Glucosamine 500mg, Chondroitin 400mg, MSM 200mg"}}),
        stock_quantity: 80
      }
    ];

    const { data: insertedProducts, error: prodError } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (prodError) {
      console.log('创建商品错误:', prodError);
      return;
    }
    
    console.log('商品创建成功:', insertedProducts.length, '个');
    
    // 验证数据
    console.log('\n=== 商城数据创建完成 ===');
    console.log('商品分类:');
    insertedCategories.forEach(cat => {
      console.log(`- ${JSON.parse(cat.name).zh} (${cat.slug})`);
    });
    
    console.log('\n商品列表:');
    insertedProducts.forEach(prod => {
      console.log(`- ${JSON.parse(prod.name).zh} - ¥${prod.price}`);
    });
    
    console.log('\n商城设置完成！');
    
  } catch (error) {
    console.error('设置失败:', error);
  }
}

setupShop();