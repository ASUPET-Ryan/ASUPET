import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { itemCount } = useCart();
  const { state: favoritesState } = useFavorites();

  const cartItemsCount = itemCount;

  const navigation = [
    { name: t('header.nav.home'), href: '/' },
    { name: t('header.nav.cats'), href: '/cats' },
    { name: t('header.nav.dogs'), href: '/dogs' },
    { name: t('header.nav.nutrition'), href: '/nutrition-guide' },
    { name: t('header.nav.shop'), href: '/shop' },
    { name: t('header.nav.community'), href: '/community' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'zh', name: '简体中文' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img 
                src="/asupet-logo-02.svg" 
                alt="ASUPET Logo" 
                className="h-24 sm:h-28 w-auto transition-all duration-300 group-hover:scale-110"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart, Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-all duration-300">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            {/* Favorites */}
             <Link to="/favorites" className="relative p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-all duration-300">
               <Heart className={`w-6 h-6 ${favoritesState.items?.length > 0 ? 'fill-current text-red-500' : ''} transition-colors duration-300`} />
               {favoritesState.items?.length > 0 && (
                 <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                   {favoritesState.items.length}
                 </span>
               )}
             </Link>
            {/* User Center */}
             <Link to="/user-center" className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-all duration-300">
               <User className="w-6 h-6" />
             </Link>
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-all duration-300"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {i18n.language === 'zh' ? 'ZH' : i18n.language === 'zh-TW' ? '繁中' : 'EN'}
                </span>
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`block w-full text-left px-4 py-2 text-sm font-medium transition-all duration-300 ${
                          i18n.language === lang.code
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-1 bg-white/95 backdrop-blur-md border-t border-neutral-200">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      

    </header>
  );
};

export default Header;