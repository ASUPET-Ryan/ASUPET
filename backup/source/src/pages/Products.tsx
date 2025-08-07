import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Shield, Heart, Star, Award, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ProductSeries } from '../lib/supabase';
import i18n from '../i18n';

const Products = () => {
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
      {/* Hero Section */}
      <section className="relative py-20 min-h-[60vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20pet%20food%20products%2C%20natural%20ingredients%2C%20healthy%20nutrition%2C%20professional%20product%20photography%2C%20warm%20lighting&image_size=landscape_16_9"
            alt="Products Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-blue-800/70 to-orange-600/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t('products.hero.title')}
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto drop-shadow-md">
              {t('products.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Product Philosophy Section */}
      <section className="py-20 bg-white">
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mb-6">
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

      {/* Product Series Section */}
      {productSeries.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('products.series.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('products.series.subtitle')}
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
                    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <Award className="w-6 h-6 text-orange-500 mr-2" />
                        <span className="text-sm font-medium text-orange-600 uppercase tracking-wide">
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
                        <h4 className="font-semibold text-gray-900">
                          {t('products.series.keyFeatures')}
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
                      <div className="mt-6">
                        <span className="text-sm text-gray-500">
                          {t('products.series.targetAge')}: {series.target_age || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={series.image_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20pet%20food%20${encodeURIComponent(typeof series.name === 'string' ? series.name : series.name[i18n.language as 'zh' | 'en'] || series.name.zh)}%20${encodeURIComponent(series.category || 'pet-food')}%20product%20photography%2C%20professional%20lighting&image_size=landscape_4_3`}
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

      {/* Nutrition Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t('products.nutrition.title')}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t('products.nutrition.subtitle')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20happy%20pets%20eating%20nutritious%20food%2C%20vibrant%20colors%2C%20natural%20ingredients%20background%2C%20professional%20photography&image_size=landscape_4_3"
                  alt={t('products.nutrition.imageAlt')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('products.quality.title')}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              {t('products.quality.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t('products.quality.certification.title')}
                </h3>
                <p className="text-blue-100">
                  {t('products.quality.certification.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t('products.quality.testing.title')}
                </h3>
                <p className="text-blue-100">
                  {t('products.quality.testing.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t('products.quality.satisfaction.title')}
                </h3>
                <p className="text-blue-100">
                  {t('products.quality.satisfaction.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {t('products.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('products.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {t('products.cta.contact')}
            </a>
            <a
              href="/technology"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
            >
              {t('products.cta.technology')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;