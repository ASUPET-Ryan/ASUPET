import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { News as NewsType } from '../lib/supabase';
import i18n from '../i18n';

const News = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('publish_date', { ascending: false });

        if (error) throw error;
        
        const newsData = data || [];
        setNews(newsData);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(newsData.map(item => item.category).filter(Boolean))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const itemTitle = item.title[i18n.language as 'zh' | 'en'] || item.title.zh || '';
    const itemExcerpt = item.excerpt[i18n.language as 'zh' | 'en'] || item.excerpt.zh || '';
    const itemCategory = item.category || '';
    const matchesSearch = itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         itemExcerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || itemCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

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
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=news%20media%20journalism%2C%20modern%20newsroom%2C%20digital%20publishing%2C%20information%20technology%2C%20professional%20news%20background&image_size=landscape_16_9"
            alt="News Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-blue-800/75 to-gray-900/85"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t('news.hero.title')}
            </h1>
            <p className="text-xl text-slate-100 max-w-3xl mx-auto drop-shadow-md">
              {t('news.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('news.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('news.filter.all')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm || selectedCategory !== 'all' 
                  ? t('news.noResults') 
                  : t('news.noNews')
                }
              </p>
            </div>
          ) : (
            <>
              {/* Featured News */}
              {filteredNews.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {t('news.featured.title')}
                  </h2>
                  <Link
                    to={`/news/${filteredNews[0].id}`}
                    className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="aspect-w-16 aspect-h-9 lg:aspect-h-12">
                        <img
                          src={filteredNews[0].featured_image_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(filteredNews[0].title[i18n.language as 'zh' | 'en'] || filteredNews[0].title.zh)}&image_size=landscape_16_9`}
                          alt={filteredNews[0].title[i18n.language as 'zh' | 'en'] || filteredNews[0].title.zh}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(filteredNews[0].title[i18n.language as 'zh' | 'en'] || filteredNews[0].title.zh)}&image_size=landscape_16_9`;
                          }}
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            {typeof filteredNews[0].category === 'string' ? filteredNews[0].category : filteredNews[0].category[i18n.language as 'zh' | 'en'] || filteredNews[0].category.zh}
                          </span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(filteredNews[0].publish_date)}
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                          {filteredNews[0].title[i18n.language as 'zh' | 'en'] || filteredNews[0].title.zh}
                        </h3>
                        <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                          {filteredNews[0].excerpt[i18n.language as 'zh' | 'en'] || filteredNews[0].excerpt.zh}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {getReadingTime(filteredNews[0].content[i18n.language as 'zh' | 'en'] || filteredNews[0].content.zh)} {t('news.readTime')}
                          </div>
                          <div className="flex items-center text-blue-600 font-medium">
                            {t('news.readMore')}
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* News Grid */}
              {filteredNews.length > 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {t('news.latest.title')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.slice(1).map((article) => (
                      <Link
                        key={article.id}
                        to={`/news/${article.id}`}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={article.featured_image_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(article.title[i18n.language as 'zh' | 'en'] || article.title.zh)}&image_size=landscape_16_9`}
                            alt={article.title[i18n.language as 'zh' | 'en'] || article.title.zh}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(article.title[i18n.language as 'zh' | 'en'] || article.title.zh)}&image_size=landscape_16_9`;
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {typeof article.category === 'string' ? article.category : article.category[i18n.language as 'zh' | 'en'] || article.category.zh}
                            </span>
                            <div className="flex items-center text-gray-500 text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(article.publish_date)}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                            {article.title[i18n.language as 'zh' | 'en'] || article.title.zh}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {article.excerpt[i18n.language as 'zh' | 'en'] || article.excerpt.zh}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {getReadingTime(article.content[i18n.language as 'zh' | 'en'] || article.content.zh)} {t('news.readTime')}
                            </div>
                            <div className="flex items-center text-blue-600 text-sm font-medium">
                              {t('news.readMore')}
                              <ArrowRight className="ml-1 w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {t('news.newsletter.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('news.newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('news.newsletter.placeholder')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="btn-primary px-8 py-3 font-medium">
              {t('news.newsletter.subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;