import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Leaf, Shield, Heart, Star, Award, CheckCircle, 
  Brain, Database, Zap, Users, BarChart3, ArrowRight 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ProductSeries } from '../lib/supabase';
import i18n from '../i18n';

const ProductTechnology = () => {
  const { t } = useTranslation();
  const [productSeries, setProductSeries] = useState<ProductSeries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductSeries = async () => {
      try {
        const { data, error } = await supabase
          .from('product_series')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setProductSeries(data || []);
      } catch (error) {
        console.error('Error fetching product series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductSeries();
  }, []);

  const principles = [
    {
      icon: Leaf,
      title: t('products.principles.natural.title'),
      description: t('products.principles.natural.description'),
    },
    {
      icon: Shield,
      title: t('products.principles.safety.title'),
      description: t('products.principles.safety.description'),
    },
    {
      icon: Heart,
      title: t('products.principles.nutrition.title'),
      description: t('products.principles.nutrition.description'),
    },
    {
      icon: Star,
      title: t('products.principles.quality.title'),
      description: t('products.principles.quality.description'),
    },
  ];

  const technologies = [
    {
      icon: Brain,
      title: t('technology.ai.title'),
      description: t('technology.ai.description'),
      features: [
        t('technology.ai.features.analysis'),
        t('technology.ai.features.recommendation'),
        t('technology.ai.features.monitoring'),
        t('technology.ai.features.optimization'),
      ],
    },
    {
      icon: Database,
      title: t('technology.data.title'),
      description: t('technology.data.description'),
      features: [
        t('technology.data.features.collection'),
        t('technology.data.features.processing'),
        t('technology.data.features.insights'),
        t('technology.data.features.prediction'),
      ],
    },
    {
      icon: Shield,
      title: t('technology.security.title'),
      description: t('technology.security.description'),
      features: [
        t('technology.security.features.encryption'),
        t('technology.security.features.privacy'),
        t('technology.security.features.compliance'),
        t('technology.security.features.backup'),
      ],
    },
  ];

  const advantages = [
    {
      number: '99.9%',
      label: t('technology.advantages.accuracy'),
      description: t('technology.advantages.accuracyDesc'),
    },
    {
      number: '24/7',
      label: t('technology.advantages.availability'),
      description: t('technology.advantages.availabilityDesc'),
    },
    {
      number: '50%',
      label: t('technology.advantages.efficiency'),
      description: t('technology.advantages.efficiencyDesc'),
    },
    {
      number: '100+',
      label: t('technology.advantages.algorithms'),
      description: t('technology.advantages.algorithmsDesc'),
    },
  ];

  const benefits = [
    t('products.benefits.digestibility'),
    t('products.benefits.immunity'),
    t('products.benefits.coat'),
    t('products.benefits.energy'),
    t('products.benefits.dental'),
    t('products.benefits.weight'),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - 融合产品与技术 */}
      <section className="relative py-20 min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20pet%20food%20with%20advanced%20technology%2C%20AI%20innovation%2C%20natural%20ingredients%2C%20digital%20interface%2C%20modern%20laboratory%2C%20professional%20photography&image_size=landscape_16_9"
            alt="Product Technology Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-blue-800/75 to-purple-900/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              产品理念与技术创新
            </h1>
            <p className="text-xl text-green-100 max-w-4xl mx-auto drop-shadow-md mb-8">
              将自然营养与先进科技完美融合，为宠物提供最优质的健康解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#products"
                className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                了解产品理念
              </a>
              <a
                href="#technology"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                探索技术优势
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Philosophy Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('products.philosophy.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('products.philosophy.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Integration Section */}
      <section id="technology" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              技术驱动的产品创新
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              运用前沿科技，确保每一款产品都达到最高标准
            </p>
          </div>
          <div className="space-y-16">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-500 rounded-lg mr-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {tech.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-8">
                      {tech.description}
                    </p>
                    <div className="space-y-3">
                      {tech.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={(() => {
                          const techPrompts = {
                            'AI智能营养分析': 'artificial intelligence brain network analyzing pet nutrition data, futuristic AI interface, neural networks, data visualization, blue and purple tech colors, professional laboratory setting',
                            '数据管理平台': 'modern data management dashboard for pet nutrition, cloud computing interface, data analytics charts, digital transformation, clean tech design, professional business environment',
                            '数据安全保障': 'cybersecurity shield protecting pet data, encrypted data streams, secure cloud infrastructure, digital security locks, professional tech illustration, blue and green security colors'
                          };
                          const prompt = techPrompts[tech.title] || `${tech.title.toLowerCase()} technology in pet food production, modern laboratory, digital interface, professional tech illustration`;
                          return `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=landscape_4_3`;
                        })()} 
                        alt={tech.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Series with Technology Integration */}
      {productSeries.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                科技赋能的产品系列
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                每个产品系列都融入了最新的科技成果，确保营养价值最大化
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {productSeries.map((series, index) => (
                <div
                  key={series.id}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <Award className="w-6 h-6 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                          {series.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {typeof series.name === 'string' ? series.name : series.name[i18n.language as 'zh' | 'en'] || series.name.zh}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {typeof series.description === 'string' ? series.description : series.description[i18n.language as 'zh' | 'en'] || series.description.zh}
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <Brain className="w-4 h-4 text-blue-500 mr-2" />
                          科技特色
                        </h4>
                        <ul className="space-y-2">
                          {series.key_features?.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{feature}</span>
                            </li>
                          )) || []}
                        </ul>
                      </div>
                      <div className="mt-6 p-3 bg-blue-100 rounded-lg">
                        <span className="text-sm text-blue-800 font-medium">
                          适用年龄: {series.target_age || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={series.image_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20pet%20food%20${encodeURIComponent(typeof series.name === 'string' ? series.name : series.name[i18n.language as 'zh' | 'en'] || series.name.zh)}%20with%20technology%20elements%2C%20modern%20packaging%2C%20professional%20product%20photography&image_size=landscape_4_3`}
                        alt={typeof series.name === 'string' ? series.name : series.name[i18n.language as 'zh' | 'en'] || series.name.zh}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technology Advantages */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              技术优势数据
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              用数据说话，展现我们在宠物营养科技领域的领先地位
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {advantage.number}
                </div>
                <div className="text-xl font-semibold text-blue-100 mb-3">
                  {advantage.label}
                </div>
                <p className="text-blue-100 text-sm">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Benefits with Technology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                科技驱动的营养效果
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                通过先进的营养分析技术和个性化配方，为宠物提供精准营养
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                <div className="flex items-center mb-3">
                  <Brain className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">AI智能配方</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  基于大数据分析和机器学习算法，为每只宠物量身定制最适合的营养方案
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20happy%20pets%20with%20AI%20technology%20interface%2C%20nutrition%20analysis%20dashboard%2C%20modern%20digital%20health%20monitoring%2C%20professional%20photography&image_size=landscape_4_3"
                  alt="Technology Enhanced Nutrition"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              产品创新流程
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              从理念到产品，每一步都融入科技创新
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: '营养研究',
                description: '基于宠物生理学和营养学的深度研究',
                icon: Brain,
              },
              {
                step: '02',
                title: '科技开发',
                description: '运用AI和大数据技术优化配方',
                icon: Database,
              },
              {
                step: '03',
                title: '严格测试',
                description: '多重质量检测确保产品安全性',
                icon: Shield,
              },
              {
                step: '04',
                title: '智能生产',
                description: '自动化生产线保证品质一致性',
                icon: Zap,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-full text-white font-bold text-lg mb-6">
                    {item.step}
                  </div>
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-blue-600 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                  {index < 3 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-4 w-6 h-6 text-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Assurance with Technology */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              科技保障品质
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-12">
              运用最先进的技术手段，确保每一份产品都达到最高标准
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  智能检测系统
                </h3>
                <p className="text-green-100">
                  AI驱动的质量检测，确保每批产品都符合最高标准
                </p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  数据追溯系统
                </h3>
                <p className="text-green-100">
                  全程数字化追溯，从原料到成品的完整记录
                </p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  个性化服务
                </h3>
                <p className="text-green-100">
                  基于宠物个体数据的定制化营养解决方案
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            体验科技与自然的完美结合
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            让我们为您的宠物提供最先进的营养解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              立即购买
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
            >
              咨询专家
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductTechnology;