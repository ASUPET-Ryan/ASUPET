import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { supabase, type News } from '../lib/supabase';
import i18n from '../i18n';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [article, setArticle] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      console.log('NewsDetail: Starting to fetch article with id:', id);
      if (!id) {
        console.error('NewsDetail: No id parameter found');
        return;
      }
      
      setLoading(true);
      try {
        console.log('NewsDetail: Fetching article from Supabase...');
        setError(null);
        // Fetch the main article
        const { data: articleData, error: articleError } = await supabase
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
          .eq('id', id)
          .single();

        if (articleError) {
          console.error('NewsDetail: Supabase error:', articleError);
          throw articleError;
        }
        
        console.log('NewsDetail: Article data received:', articleData);
        setArticle(articleData);

        // Fetch related articles
        if (articleData && articleData.category_id) {
          const { data: relatedData, error: relatedError } = await supabase
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
            .eq('category_id', articleData.category_id)
            .neq('id', id)
            .order('publish_date', { ascending: false })
            .limit(3);

          if (relatedError) {
            console.error('NewsDetail: Related news error:', relatedError);
          } else {
            console.log('NewsDetail: Related news data:', relatedData);
            setRelatedNews(relatedData || []);
          }
        }
      } catch (error) {
        console.error('NewsDetail: Error fetching article:', error);
        setError(error instanceof Error ? error.message : 'Failed to load article');
      } finally {
        setLoading(false);
        console.log('NewsDetail: Loading finished');
      }
    };

    fetchArticle();
  }, [id]);

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

  const shareUrl = window.location.href;
  const shareTitle = article ? (typeof article.title === 'string' ? article.title : article.title[i18n.language as 'zh' | 'en'] || article.title.zh) : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-2xl font-bold text-red-600 mb-4">
             {t('common.error') || 'Error'}
           </h1>
           <p className="text-gray-600 mb-6">{error}</p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button
               onClick={() => window.location.reload()}
               className="inline-flex items-center px-4 py-2 btn-primary transition-colors duration-200"
             >
               {t('common.retry') || 'Retry'}
             </button>
             <Link
               to="/news"
               className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
             >
               <ArrowLeft className="w-4 h-4 mr-2" />
               {t('news.detail.backToNews') || 'Back to News'}
             </Link>
           </div>
         </div>
       </div>
     );
   }

   if (!loading && !article) {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-2xl font-bold text-gray-800 mb-4">
             {t('news.detail.notFound') || 'Article Not Found'}
           </h1>
           <p className="text-gray-600 mb-6">
             {t('news.detail.notFoundMessage') || 'The article you are looking for does not exist or has been removed.'}
           </p>
           <Link
             to="/news"
             className="inline-flex items-center px-4 py-2 btn-primary transition-colors duration-200"
           >
             <ArrowLeft className="w-4 h-4 mr-2" />
             {t('news.detail.backToNews') || 'Back to News'}
           </Link>
         </div>
       </div>
     );
   }



  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('news.detail.backToNews')}
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            {article.news_categories && (
              <span 
                className="inline-block px-3 py-1 text-sm font-medium rounded-full"
                style={{
                  backgroundColor: `${article.news_categories.color}20`,
                  color: article.news_categories.color
                }}
              >
                {i18n.language === 'zh' ? article.news_categories.name_zh : article.news_categories.name_en}
              </span>
            )}
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(article.publish_date)}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {getReadingTime(typeof article.content === 'string' ? article.content : article.content[i18n.language as 'zh' | 'en'] || article.content.zh)} {t('news.readTime')}
            </div>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {typeof article.title === 'string' ? article.title : article.title[i18n.language as 'zh' | 'en'] || article.title.zh}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {typeof article.excerpt === 'string' ? article.excerpt : article.excerpt[i18n.language as 'zh' | 'en'] || article.excerpt.zh}
          </p>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              {t('news.detail.share')}
            </span>
            <div className="flex gap-2">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-blue-400 transition-colors duration-200"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-blue-700 transition-colors duration-200"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.featured_image_url && (
          <div className="mb-8">
            <img
              src={article.featured_image_url}
              alt={typeof article.title === 'string' ? article.title : article.title[i18n.language as 'zh' | 'en'] || article.title.zh}
              className="w-full h-64 lg:h-96 object-cover rounded-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(typeof article.title === 'string' ? article.title : article.title[i18n.language as 'zh' | 'en'] || article.title.zh)}&image_size=landscape_16_9`;
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {typeof article.content === 'string' ? article.content : article.content[i18n.language as 'zh' | 'en'] || article.content.zh}
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              {t('news.detail.tags')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Articles */}
      {relatedNews.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('news.detail.related')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedNews.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/news/${relatedArticle.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={relatedArticle.featured_image_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(typeof relatedArticle.title === 'string' ? relatedArticle.title : relatedArticle.title[i18n.language as 'zh' | 'en'] || relatedArticle.title.zh)}&image_size=landscape_16_9`}
                      alt={typeof relatedArticle.title === 'string' ? relatedArticle.title : relatedArticle.title[i18n.language as 'zh' | 'en'] || relatedArticle.title.zh}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20industry%20news%20${encodeURIComponent(typeof relatedArticle.title === 'string' ? relatedArticle.title : relatedArticle.title[i18n.language as 'zh' | 'en'] || relatedArticle.title.zh)}&image_size=landscape_16_9`;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {relatedArticle.news_categories && (
                        <span 
                          className="inline-block px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: `${relatedArticle.news_categories.color}20`,
                            color: relatedArticle.news_categories.color
                          }}
                        >
                          {i18n.language === 'zh' ? relatedArticle.news_categories.name_zh : relatedArticle.news_categories.name_en}
                        </span>
                      )}
                      <div className="flex items-center text-gray-500 text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(relatedArticle.publish_date)}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {typeof relatedArticle.title === 'string' ? relatedArticle.title : relatedArticle.title[i18n.language as 'zh' | 'en'] || relatedArticle.title.zh}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {typeof relatedArticle.excerpt === 'string' ? relatedArticle.excerpt : relatedArticle.excerpt[i18n.language as 'zh' | 'en'] || relatedArticle.excerpt.zh}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('news.detail.cta.title')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('news.detail.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 btn-primary font-medium transition-colors duration-200"
            >
              {t('news.detail.cta.contact')}
            </Link>
            <Link
              to="/news"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
            >
              {t('news.detail.cta.moreNews')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;