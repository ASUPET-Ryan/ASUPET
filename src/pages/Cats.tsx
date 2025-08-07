import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cat, Heart, Shield, Sparkles, Star, ArrowRight, Clock, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

const Cats = () => {
  const { t } = useTranslation();
  const [catProducts, setCatProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .ilike('name', '%猫%')
          .limit(6);

        if (error) throw error;
        setCatProducts(data || []);
      } catch (error) {
        console.error('Error fetching cat products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatProducts();
  }, []);

  const catCareGuides = [
    {
      title: '幼猫营养指南',
      description: '0-12个月幼猫的科学喂养方案',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      link: '/nutrition-guide/kitten'
    },
    {
      title: '成猫健康管理',
      description: '1-7岁成猫的日常护理要点',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      link: '/nutrition-guide/adult-cat'
    },
    {
      title: '老年猫特殊护理',
      description: '7岁以上老年猫的贴心照顾',
      icon: Star,
      color: 'from-purple-500 to-indigo-500',
      link: '/nutrition-guide/senior-cat'
    }
  ];

  const catBreeds = [
    {
      key: 'britishShorthair',
      name: '英国短毛猫',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=British%20Shorthair%20cat%20portrait%2C%20cute%20and%20fluffy%2C%20professional%20pet%20photography&image_size=square',
      traits: ['温顺', '易护理', '适应性强'],
      nutritionTips: '需要控制体重，选择低脂肪高蛋白食物'
    },
    {
      key: 'ragdoll',
      name: '布偶猫',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Ragdoll%20cat%20portrait%2C%20blue%20eyes%2C%20long%20fur%2C%20professional%20pet%20photography&image_size=square',
      traits: ['温柔', '亲人', '毛发丰厚'],
      nutritionTips: '需要美毛营养，注意毛球问题预防'
    },
    {
      key: 'americanShorthair',
      name: '美国短毛猫',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=American%20Shorthair%20cat%20portrait%2C%20tabby%20pattern%2C%20professional%20pet%20photography&image_size=square',
      traits: ['活泼', '健康', '适应性强'],
      nutritionTips: '均衡营养即可，注意运动量配合'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300 rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-rose-300 rounded-full animate-bounce-soft"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl">
                <Cat className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {t('cats.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('cats.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop?category=cat"
                className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold"
              >
                {t('cats.shopCatFood')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/nutrition-guide"
                className="btn-secondary inline-flex items-center px-8 py-4 text-lg font-semibold"
              >
                {t('cats.nutritionGuide')}
                <Sparkles className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cat Care Guides */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('cats.careGuides.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cats.careGuides.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {catCareGuides.map((guide, index) => {
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
                    {t(`cats.careGuides.${guide.title === '幼猫营养指南' ? 'kitten' : guide.title === '成猫健康管理' ? 'adult' : 'senior'}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`cats.careGuides.${guide.title === '幼猫营养指南' ? 'kitten' : guide.title === '成猫健康管理' ? 'adult' : 'senior'}.description`)}
                  </p>
                  <div className="mt-6 flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                    {t('cats.careGuides.learnMore')}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Cat Breeds */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('cats.breeds.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cats.breeds.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {catBreeds.map((breed, index) => (
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t(`cats.breeds.${breed.key}.name`)}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(t(`cats.breeds.${breed.key}.traits`, { returnObjects: true }) as string[]).map((trait, traitIndex) => (
                      <span
                        key={traitIndex}
                        className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-medium rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('cats.breeds.nutritionTips')}</h4>
                    <p className="text-gray-600 text-sm">
                      {t(`cats.breeds.${breed.key}.nutritionTips`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cat Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('cats.products.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cats.products.subtitle')}
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catProducts.map((product: any) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={product.image_url || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20cat%20food%20package%2C%20modern%20design%2C%20high%20quality&image_size=square'}
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
              to="/shop?category=cat"
              className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold"
            >
              {t('cats.products.viewMore')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('cats.community.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cats.community.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-pink-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{t('cats.community.group.title')}</h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t('cats.community.group.description')}
              </p>
              <Link
                to="/community"
                className="btn-primary inline-flex items-center"
              >
                {t('cats.community.group.join')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{t('cats.community.consultation.title')}</h3>
              </div>
              <p className="text-gray-600 mb-6">
                {t('cats.community.consultation.description')}
              </p>
              <Link
                to="/contact"
                className="btn-secondary inline-flex items-center"
              >
                {t('cats.community.consultation.consult')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cats;