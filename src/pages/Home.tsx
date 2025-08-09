import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Heart, Shield, Zap, Users, Award, TrendingUp, PawPrint, Sparkles, Star, Tag } from 'lucide-react';
import PetCarousel from '../components/PetCarousel';
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
          .select(`
            *,
            news_categories (
              id,
              name_en,
              name_zh,
              color
            )
          `)
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
      {/* Hero Section - 按照banner.json配置实现 */}
      <section 
        id="asupet-hero-banner" 
        className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
        style={{
          background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%)'
        }}
      >
        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-24 xl:px-32">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* 左侧内容区域 - 55%宽度 */}
            <div className="flex flex-col w-full lg:w-[55%] space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* 专业营养科学配比徽章 */}
              <div className="inline-flex items-center justify-center font-semibold bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm self-center lg:self-start">
                {t('home.banner.badge')}
              </div>

              {/* 主标题 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-purple-700 tracking-tight font-display">
                {t('home.banner.title')}
              </h1>

              {/* 副标题 */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('home.banner.subtitle')}
              </p>

              {/* CTA按钮组 */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-9 py-4 text-white font-bold rounded-lg bg-purple-700 hover:bg-purple-800 shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-0.5"
                  aria-label="立即体验ASUPET专业宠物服务"
                >
                  {t('home.banner.cta.primary')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 text-purple-700 font-semibold border-2 border-purple-700 rounded-lg bg-transparent hover:bg-purple-50 hover:border-purple-800 transition-all duration-300"
                  aria-label="了解更多关于ASUPET的信息"
                >
                  {t('home.banner.cta.secondary')}
                </Link>
              </div>

              {/* 统计数据 */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-10 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-display">
                    50万+
                  </div>
                  <div className="text-sm text-purple-600 mt-1">
                    {t('home.banner.stats.activeUsers')}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-display">
                    98%
                  </div>
                  <div className="text-sm text-purple-600 mt-1">
                    {t('home.banner.stats.satisfaction')}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-display">
                    1000+
                  </div>
                  <div className="text-sm text-purple-600 mt-1">
                    {t('home.banner.stats.products')}
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧视觉区域 - 45%宽度 */}
            <div className="relative w-full lg:w-[45%] mt-8 lg:mt-0">
              {/* 宠物轮播组件 */}
              <div className="group relative">
                <PetCarousel />
              </div>

              {/* 浮动装饰元素 */}
              <div className="absolute top-[15%] right-[20%] w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-700 text-white shadow-xl shadow-purple-500/30 animate-pulse">
                <Heart className="w-6 h-6" />
              </div>
              
              <div className="absolute top-[60%] left-[10%] w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-300 to-purple-600 text-white shadow-lg shadow-purple-400/30 animate-bounce">
                <Star className="w-5 h-5" />
              </div>
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
                      src={news.featured_image_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent((() => {
                        if (typeof news.title === 'string') {
                          try {
                            const parsed = JSON.parse(news.title);
                            if (parsed && typeof parsed === 'object' && (parsed.zh || parsed.en)) {
                              return parsed[i18n.language as 'zh' | 'en'] || parsed.zh || parsed.en;
                            }
                          } catch {
                            return news.title;
                          }
                          return news.title;
                        } else if (news.title && typeof news.title === 'object') {
                          return news.title[i18n.language as 'zh' | 'en'] || news.title.zh || news.title.en;
                        }
                        return 'pet news';
                      })())}&image_size=landscape_16_9`}
                      alt={(() => {
                        if (typeof news.title === 'string') {
                          try {
                            const parsed = JSON.parse(news.title);
                            if (parsed && typeof parsed === 'object' && (parsed.zh || parsed.en)) {
                              return parsed[i18n.language as 'zh' | 'en'] || parsed.zh || parsed.en;
                            }
                          } catch {
                            return news.title;
                          }
                          return news.title;
                        } else if (news.title && typeof news.title === 'object') {
                          return news.title[i18n.language as 'zh' | 'en'] || news.title.zh || news.title.en;
                        }
                        return 'News image';
                      })()}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border transition-all duration-200 hover:shadow-md mb-3"
                      style={{
                        backgroundColor: news.news_categories?.color ? `${news.news_categories.color}15` : 'rgb(83 69 136 / 0.1)',
                        borderColor: news.news_categories?.color || 'rgb(83 69 136)',
                        color: news.news_categories?.color || 'rgb(83 69 136)'
                      }}
                    >
                      <Tag className="w-3 h-3" />
                      {(() => {
                        // 优先使用news_categories表的多语言字段
                        if (news.news_categories) {
                          return i18n.language === 'zh' 
                            ? news.news_categories.name_zh 
                            : news.news_categories.name_en;
                        }
                        // 回退到原有的category字段处理逻辑
                        if (typeof news.category === 'string') {
                          try {
                            const parsed = JSON.parse(news.category);
                            if (parsed && typeof parsed === 'object' && (parsed.zh || parsed.en)) {
                              return parsed[i18n.language as 'zh' | 'en'] || parsed.zh || parsed.en;
                            }
                          } catch {
                            return news.category;
                          }
                          return news.category;
                        } else if (news.category && typeof news.category === 'object') {
                          return news.category[i18n.language as 'zh' | 'en'] || news.category.zh || news.category.en;
                        }
                        return i18n.language === 'zh' ? '新闻' : 'News';
                      })()} 
                    </div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                      {(() => {
                        // 处理title可能是字符串或对象的情况
                        if (typeof news.title === 'string') {
                          // 如果是字符串，检查是否是JSON格式
                          try {
                            const parsed = JSON.parse(news.title);
                            if (parsed && typeof parsed === 'object' && (parsed.zh || parsed.en)) {
                              return parsed[i18n.language as 'zh' | 'en'] || parsed.zh || parsed.en;
                            }
                          } catch {
                            // 如果解析失败，直接返回字符串
                            return news.title;
                          }
                          return news.title;
                        } else if (news.title && typeof news.title === 'object') {
                          // 如果是对象，按正常逻辑处理
                          return news.title[i18n.language as 'zh' | 'en'] || news.title.zh || news.title.en;
                        }
                        return 'Untitled';
                      })()} 
                    </h3>
                    <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
                      {(() => {
                        if (typeof news.excerpt === 'string') {
                          try {
                            const parsed = JSON.parse(news.excerpt);
                            if (parsed && typeof parsed === 'object' && (parsed.zh || parsed.en)) {
                              return parsed[i18n.language as 'zh' | 'en'] || parsed.zh || parsed.en;
                            }
                          } catch {
                            return news.excerpt;
                          }
                          return news.excerpt;
                        } else if (news.excerpt && typeof news.excerpt === 'object') {
                          return news.excerpt[i18n.language as 'zh' | 'en'] || news.excerpt.zh || news.excerpt.en;
                        }
                        return '';
                      })()} 
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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-purple-400 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-purple-300 rounded-full animate-pulse"></div>
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