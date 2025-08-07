import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Heart, Shield, Zap, Users, Award, TrendingUp, PawPrint, Sparkles, Star } from 'lucide-react';
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
      icon: PawPrint,
      title: t('home.features.nutrition.title'),
      description: t('home.features.nutrition.description'),
    },
    {
      icon: Heart,
      title: t('home.features.safety.title'),
      description: t('home.features.safety.description'),
    },
    {
      icon: Sparkles,
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
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
        {/* 装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* 专业营养标识 */}
          <div className="absolute top-20 left-10 bg-white p-6 rounded-xl shadow-lg transform rotate-6 animate-float">
            <div className="w-6 h-6 mb-2 bg-primary-500 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="text-primary-700 font-semibold text-lg mb-2">专业营养</div>
            <div className="text-primary-600 text-sm">科学配比 · 优质制作</div>
          </div>

          {/* 装饰卡片 */}
          <div className="absolute top-32 right-20 transform -rotate-3 animate-float">
            <div className="w-48 h-32 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
              <PawPrint className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* 装饰卡片 */}
          <div className="absolute bottom-40 left-20 transform rotate-2 animate-float">
            <div className="w-52 h-36 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-secondary-400 to-primary-400 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* 品质保证标识 */}
          <div className="absolute bottom-20 right-16 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
            <div className="text-center">
              <div className="w-5 h-5 mx-auto mb-1 bg-primary-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <div className="text-primary-700 font-bold text-xs mb-1">PREMIUM</div>
              <div className="text-primary-600 text-xs leading-tight">
                优质产品<br/>专业品质
              </div>
            </div>
          </div>

          {/* 几何装饰元素 */}
          <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-primary-200/60 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-20 h-20 bg-secondary-200/40 rounded-full animate-pulse-slow opacity-50"></div>
          <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-primary-300/50 transform rotate-45 animate-float opacity-70"></div>
          <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-secondary-300/40 rounded-full animate-float opacity-60"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6 animate-scale-in">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed max-w-2xl">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/feeding-report"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-display font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group flex items-center justify-center border-2 border-orange-400"
                >
                  🐾 宝贝的科学喂养报告
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/shop"
                  className="btn-primary group"
                >
                  {t('home.hero.cta.primary')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/about"
                  className="btn-outline"
                >
                  {t('home.hero.cta.secondary')}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <div className="text-center">
                    <PawPrint className="w-16 h-16 text-white mx-auto mb-4 animate-float" />
                    <Sparkles className="w-12 h-12 text-white mx-auto animate-pulse-slow" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-secondary-300/30 rounded-full animate-pulse-slow"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-300/30 transform rotate-45 animate-float"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              {t('home.features.title')}
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card text-center p-8 group animate-scale-in transition-all duration-300 hover:shadow-xl"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-24 h-24 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white rounded-full animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              {t('home.stats.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {t('home.stats.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group bg-white/10 backdrop-blur-sm p-8 rounded-xl animate-scale-in border border-white/20" style={{animationDelay: `${index * 0.3}s`}}>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl mb-6 group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-display font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white/95 text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
                {t('home.news.title')}
              </h2>
              <p className="text-lg md:text-xl text-neutral-600">
                {t('home.news.subtitle')}
              </p>
            </div>
            <Link
              to="/news"
              className="hidden sm:inline-flex items-center btn-primary"
            >
              {t('home.news.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-48 bg-neutral-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="card overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src={news.featured_image_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(typeof news.title === 'string' ? news.title : news.title[i18n.language as 'zh' | 'en'] || news.title.zh)}&image_size=landscape_16_9`}
                      alt={typeof news.title === 'string' ? news.title : news.title[i18n.language as 'zh' | 'en'] || news.title.zh}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="badge mb-3">
                      {typeof news.category === 'string' ? news.category : news.category[i18n.language as 'zh' | 'en'] || news.category.zh}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                      {typeof news.title === 'string' ? news.title : news.title[i18n.language as 'zh' | 'en'] || news.title.zh}
                    </h3>
                    <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
                      {typeof news.excerpt === 'string' ? news.excerpt : news.excerpt[i18n.language as 'zh' | 'en'] || news.excerpt.zh}
                    </p>
                    <div className="text-sm text-neutral-500">
                      {new Date(news.publish_date).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12 sm:hidden">
            <Link
              to="/news"
              className="btn-primary inline-flex items-center"
            >
              {t('home.news.viewAll')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 bg-primary-400 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-secondary-400 rounded-full animate-pulse-slow"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 mb-12">
            {t('home.cta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center justify-center px-10 py-4 text-lg"
          >
            {t('home.cta.button')}
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;