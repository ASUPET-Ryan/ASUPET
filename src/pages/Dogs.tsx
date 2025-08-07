import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dog, Heart, Shield, Sparkles, Star, ArrowRight, Clock, Users, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

const Dogs = () => {
  const { t } = useTranslation();
  const [dogProducts, setDogProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .ilike('name', '%狗%')
          .limit(6);

        if (error) throw error;
        setDogProducts(data || []);
      } catch (error) {
        console.error('Error fetching dog products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogProducts();
  }, []);

  const dogCareGuides = [
    {
      title: '幼犬营养指南',
      description: '0-12个月幼犬的科学喂养方案',
      icon: Heart,
      color: 'from-orange-500 to-red-500',
      link: '/nutrition-guide/puppy'
    },
    {
      title: '成犬健康管理',
      description: '1-7岁成犬的日常护理要点',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      link: '/nutrition-guide/adult-dog'
    },
    {
      title: '老年犬特殊护理',
      description: '7岁以上老年犬的贴心照顾',
      icon: Star,
      color: 'from-purple-500 to-indigo-500',
      link: '/nutrition-guide/senior-dog'
    }
  ];

  const dogBreeds = [
    {
      key: 'goldenRetriever',
      name: '金毛寻回犬',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Golden%20Retriever%20dog%20portrait%2C%20friendly%20expression%2C%20golden%20fur%2C%20professional%20pet%20photography&image_size=square',
      traits: ['友善', '聪明', '活泼'],
      nutritionTips: '需要高蛋白食物支持活跃的运动量',
      size: '大型犬'
    },
    {
      key: 'labrador',
      name: '拉布拉多',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Labrador%20Retriever%20dog%20portrait%2C%20chocolate%20brown%20color%2C%20professional%20pet%20photography&image_size=square',
      traits: ['温顺', '忠诚', '易训练'],
      nutritionTips: '容易发胖，需要控制食量和规律运动',
      size: '大型犬'
    },
    {
      key: 'poodle',
      name: '泰迪犬',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Poodle%20dog%20portrait%2C%20curly%20fur%2C%20cute%20expression%2C%20professional%20pet%20photography&image_size=square',
      traits: ['聪明', '活泼', '不掉毛'],
      nutritionTips: '小型犬专用配方，少食多餐',
      size: '小型犬'
    }
  ];

  const dogSizes = [
    {
      key: 'small',
      size: '小型犬',
      weight: '< 10kg',
      examples: ['泰迪', '比熊', '博美'],
      features: ['新陈代谢快', '少食多餐', '营养密度高'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      key: 'medium',
      size: '中型犬',
      weight: '10-25kg',
      examples: ['柯基', '边牧', '哈士奇'],
      features: ['均衡营养', '适量运动', '关节保护'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'large',
      size: '大型犬',
      weight: '> 25kg',
      examples: ['金毛', '拉布拉多', '德牧'],
      features: ['高蛋白需求', '关节保护', '心脏健康'],
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-300 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-yellow-300 rounded-full animate-bounce-soft"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full shadow-xl">
                <Dog className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                {t('dogs.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('dogs.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop?category=dog"
                className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold"
              >
                {t('dogs.shopDogFood')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/nutrition-guide"
                className="btn-secondary inline-flex items-center px-8 py-4 text-lg font-semibold"
              >
                {t('dogs.nutritionGuide')}
                <Sparkles className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dog Size Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('dogs.sizeCategories.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('dogs.sizeCategories.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dogSizes.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t(`dogs.sizes.${category.key}.size`)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('dogs.sizeCategories.weight')}: {t(`dogs.sizes.${category.key}.weight`)}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('dogs.sizeCategories.examples')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const examples = t(`dogs.sizes.${category.key}.examples`, { returnObjects: true });
                      const examplesArray = Array.isArray(examples) ? examples : [];
                      return examplesArray.map((example, exampleIndex) => (
                        <span
                          key={exampleIndex}
                          className="px-3 py-1 bg-gradient-to-r from-orange-100 to-blue-100 text-orange-700 text-sm font-medium rounded-full"
                        >
                          {example}
                        </span>
                      ));
                    })()}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('dogs.sizeCategories.features')}</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {(() => {
                      const features = t(`dogs.sizes.${category.key}.features`, { returnObjects: true });
                      const featuresArray = Array.isArray(features) ? features : [];
                      return featuresArray.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ));
                    })()}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dog Care Guides */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('dogs.careGuides.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('dogs.careGuides.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dogCareGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={index}
                  to={guide.link}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${guide.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {t(`dogs.careGuides.${guide.title === '幼犬营养指南' ? 'puppy' : guide.title === '成犬健康管理' ? 'adult' : 'senior'}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`dogs.careGuides.${guide.title === '幼犬营养指南' ? 'puppy' : guide.title === '成犬健康管理' ? 'adult' : 'senior'}.description`)}
                  </p>
                  <div className="mt-6 flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                    {t('dogs.careGuides.learnMore')}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Dog Breeds */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('dogs.breeds.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('dogs.breeds.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dogBreeds.map((breed, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {t(`dogs.breeds.${breed.key}.name`)}
                    </h3>
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-blue-100 text-orange-700 text-sm font-medium rounded-full">
                      {t(`dogs.sizes.${breed.size === '大型犬' ? 'large' : breed.size === '中型犬' ? 'medium' : 'small'}.size`)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(() => {
                      const traits = t(`dogs.breeds.${breed.key}.traits`, { returnObjects: true });
                      const traitsArray = Array.isArray(traits) ? traits : [];
                      return traitsArray.map((trait, traitIndex) => (
                        <span
                          key={traitIndex}
                          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-sm font-medium rounded-full"
                        >
                          {trait}
                        </span>
                      ));
                    })()}
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('dogs.breeds.nutritionTips')}</h4>
                    <p className="text-gray-600 text-sm">
                      {t(`dogs.breeds.${breed.key}.nutritionTips`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dog Products */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('dogs.products.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('dogs.products.subtitle')}
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dogProducts.map((product: any) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={product.image_url || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20dog%20food%20package%2C%20modern%20design%2C%20high%20quality&image_size=square'}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        ¥{product.price}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/shop?category=dog"
              className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold"
            >
              {t('dogs.products.viewMore')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('dogs.community.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('dogs.community.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{t('dogs.community.group.title')}</h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t('dogs.community.group.description')}
              </p>
              <Link
                to="/community"
                className="btn-primary inline-flex items-center"
              >
                {t('dogs.community.group.join')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{t('dogs.community.consultation.title')}</h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t('dogs.community.consultation.description')}
              </p>
              <Link
                to="/contact"
                className="btn-secondary inline-flex items-center"
              >
                {t('dogs.community.consultation.consult')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dogs;