import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Heart, Shield, Zap, Users, Award, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { News } from '../lib/supabase';
import i18n from '../i18n';

const Home = () => {
  const { t } = useTranslation();
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('publish_date', { ascending: false })
          .limit(3);

        if (error) throw error;
        setLatestNews(data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const features = [
    {
      icon: Heart,
      title: t('home.features.nutrition.title'),
      description: t('home.features.nutrition.description'),
    },
    {
      icon: Shield,
      title: t('home.features.safety.title'),
      description: t('home.features.safety.description'),
    },
    {
      icon: Zap,
      title: t('home.features.technology.title'),
      description: t('home.features.technology.description'),
    },
  ];

  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: t('home.stats.customers'),
    },
    {
      icon: Award,
      number: '15+',
      label: t('home.stats.awards'),
    },
    {
      icon: TrendingUp,
      number: '98%',
      label: t('home.stats.satisfaction'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {t('home.hero.cta.primary')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t('home.hero.cta.secondary')}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20golden%20retriever%20dog%20eating%20premium%20pet%20food%20from%20modern%20bowl%2C%20bright%20kitchen%20setting%2C%20natural%20lighting%2C%20professional%20photography%2C%20warm%20colors&image_size=landscape_4_3"
                  alt={t('home.hero.imageAlt')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('home.stats.title')}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('home.stats.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 text-lg">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('home.news.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('home.news.subtitle')}
              </p>
            </div>
            <Link
              to="/news"
              className="hidden sm:inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('home.news.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={news.featured_image_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(typeof news.title === 'string' ? news.title : news.title[i18n.language as 'zh' | 'en'] || news.title.zh)}&image_size=landscape_16_9`}
                      alt={typeof news.title === 'string' ? news.title : news.title[i18n.language as 'zh' | 'en'] || news.title.zh}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-medium mb-2">
                      {typeof news.category === 'string' ? news.category : news.category[i18n.language as 'zh' | 'en'] || news.category.zh}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {typeof news.title === 'string' ? news.title : news.title[i18n.language as 'zh' | 'en'] || news.title.zh}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {typeof news.excerpt === 'string' ? news.excerpt : news.excerpt[i18n.language as 'zh' | 'en'] || news.excerpt.zh}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      {new Date(news.publish_date).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('home.news.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('home.cta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
          >
            {t('home.cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;