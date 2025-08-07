import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { News as NewsType } from '../lib/supabase';
import i18n from '../i18n';

const About = () => {
  const { t } = useTranslation();
  const [latestNews, setLatestNews] = useState<NewsType[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

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
        console.error('Error fetching latest news:', error);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  // 页面内导航
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="container-cute mx-auto text-center">
          <h1 className="heading-cute text-4xl md:text-6xl font-bold text-primary-600 mb-6">
            {t('about.title')}
          </h1>
          <p className="text-cute text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            {t('about.heroDescription')}
          </p>
          
          {/* 页面内导航 */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button 
              onClick={() => scrollToSection('brand-story')}
              className="btn-cute btn-outline px-6 py-3 text-sm hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              {t('about.brandIntroduction')}
            </button>
            <button 
              onClick={() => scrollToSection('latest-news')}
              className="btn-cute btn-outline px-6 py-3 text-sm hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              {t('about.latestNews')}
            </button>
            <button 
              onClick={() => scrollToSection('contact-us')}
              className="btn-cute btn-outline px-6 py-3 text-sm hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              {t('about.contactUs')}
            </button>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="brand-story" className="section-padding bg-white">
        <div className="container-cute mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-cute text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              {t('about.brandStory')}
            </h2>
            <p className="text-cute text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('about.brandStoryDescription')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="subheading-cute text-2xl font-semibold text-neutral-800">
                {t('about.ourMission')}
              </h3>
              <p className="text-cute text-neutral-600 leading-relaxed">
                {t('about.missionDescription1')}
              </p>
              <p className="text-cute text-neutral-600 leading-relaxed">
                {t('about.missionDescription2')}
              </p>
            </div>
            <div className="card-cute p-8 bg-gradient-to-br from-primary-100 to-secondary-100">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">🐾</span>
                </div>
                <h4 className="text-xl font-semibold text-neutral-800 mb-2">{t('about.professionalTeam')}</h4>
                <p className="text-neutral-600">{t('about.teamDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-cute mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-cute text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              {t('about.coreValues')}
            </h2>
            <p className="text-cute text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('about.valuesDescription')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-cute p-8 text-center bg-white hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-600 text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">{t('about.care')}</h3>
              <p className="text-neutral-600">{t('about.careDescription')}</p>
            </div>
            
            <div className="card-cute p-8 text-center bg-white hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-secondary-600 text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">{t('about.professional')}</h3>
              <p className="text-neutral-600">{t('about.professionalDescription')}</p>
            </div>
            
            <div className="card-cute p-8 text-center bg-white hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-accent-600 text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">{t('about.innovation')}</h3>
              <p className="text-neutral-600">{t('about.innovationDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="latest-news" className="section-padding bg-white">
        <div className="container-cute mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-cute text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              最新动态
            </h2>
            <p className="text-cute text-lg text-neutral-600 max-w-2xl mx-auto">
              了解我们的最新消息、产品发布和行业动态
            </p>
          </div>
          
          {newsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-cute p-6 bg-neutral-100 animate-pulse">
                  <div className="h-48 bg-neutral-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {latestNews.map((news) => {
                const title = news.title[i18n.language as 'zh' | 'en'] || news.title.zh || '';
                const excerpt = news.excerpt[i18n.language as 'zh' | 'en'] || news.excerpt.zh || '';
                
                return (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="card-cute p-6 bg-white hover:shadow-glow transition-all duration-300 group"
                  >
                    {news.featured_image_url && (
                       <div className="mb-4 overflow-hidden rounded-lg">
                         <img
                           src={news.featured_image_url}
                           alt={title}
                           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                         />
                      </div>
                    )}
                    <div className="flex items-center text-sm text-neutral-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(news.publish_date).toLocaleDateString('zh-CN')}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {excerpt}
                    </p>
                    <div className="flex items-center text-primary-600 font-medium group-hover:gap-3 transition-all duration-300">
                      查看详情
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/news"
              className="btn-cute btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              查看更多动态
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="section-padding bg-neutral-50">
        <div className="container-cute mx-auto text-center">
          <h2 className="heading-cute text-3xl md:text-4xl font-bold text-neutral-800 mb-8">
            联系我们
          </h2>
          <p className="text-cute text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            有任何问题或建议？我们很乐意听到您的声音
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="card-cute p-6 bg-white hover:shadow-glow transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4 mx-auto">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2 text-center">{t('contact.info.address.title')}</h3>
              <p className="text-neutral-600 text-center text-sm">{t('contact.info.address.content')}</p>
            </div>
            
            <div className="card-cute p-6 bg-white hover:shadow-glow transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-full mb-4 mx-auto">
                <Phone className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2 text-center">{t('contact.info.phone.title')}</h3>
              <p className="text-neutral-600 text-center text-sm">{t('contact.info.phone.content')}</p>
            </div>
            
            <div className="card-cute p-6 bg-white hover:shadow-glow transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full mb-4 mx-auto">
                <Mail className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2 text-center">{t('contact.info.email.title')}</h3>
              <p className="text-neutral-600 text-center text-sm">{t('contact.info.email.content')}</p>
            </div>
            
            <div className="card-cute p-6 bg-white hover:shadow-glow transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4 mx-auto">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2 text-center">{t('contact.info.hours.title')}</h3>
              <p className="text-neutral-600 text-center text-sm">{t('contact.info.hours.content')}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@asupet.com"
              className="btn-cute btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              发送邮件
              <Mail className="w-5 h-5" />
            </a>
            <Link
              to="/contact"
              className="btn-cute btn-outline inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              在线咨询
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;