import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.technology'), href: '/technology' },
    { name: t('nav.news'), href: '/news' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/asupet' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/asupet' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/asupet' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/asupet' },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    } catch (error) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus('idle'), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-500 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary-500 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-accent-500 rounded-full animate-bounce"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-32 h-32 flex items-center justify-center">
                <img 
                  src="/asupet-logo-02.svg" 
                  alt="ASUPET Logo" 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
            </div>
            <p className="text-neutral-300 mb-8 max-w-md text-lg leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-neutral-300 group hover:text-primary-300 transition-colors duration-300">
                <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-500/30 transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">{t('footer.address')}</span>
              </div>
              <div className="flex items-center text-neutral-300 group hover:text-primary-300 transition-colors duration-300">
                <div className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-secondary-500/30 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">{t('footer.phone')}</span>
              </div>
              <div className="flex items-center text-neutral-300 group hover:text-primary-300 transition-colors duration-300">
                <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-accent-500/30 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">{t('footer.email')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6 text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-neutral-300 hover:text-primary-300 transition-all duration-300 text-sm font-medium transform hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-6 text-white">{t('footer.followUs')}</h3>
            <div className="flex space-x-3 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-700/50 rounded-lg flex items-center justify-center text-neutral-300 hover:text-white hover:bg-primary-500 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <div>
              <h4 className="text-lg font-display font-medium mb-4 text-white">{t('footer.newsletter')}</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.emailPlaceholder')}
                    className="flex-1 px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                    disabled={isSubscribing}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubscribing || !email.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-neutral-600 disabled:to-neutral-600 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubscribing ? '...' : t('footer.subscribe')}
                  </button>
                </div>
                {subscriptionStatus === 'success' && (
                  <p className="text-success text-sm font-medium">订阅成功！感谢您的关注。</p>
                )}
                {subscriptionStatus === 'error' && (
                  <p className="text-error text-sm font-medium">订阅失败，请稍后重试。</p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0 font-medium">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-neutral-400 hover:text-primary-300 text-sm transition-all duration-300 font-medium transform hover:translate-y-[-1px]"
              >
                {t('footer.privacy')}
              </Link>
              <Link
                to="/terms"
                className="text-neutral-400 hover:text-primary-300 text-sm transition-all duration-300 font-medium transform hover:translate-y-[-1px]"
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;