import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';

export default function Favorites() {
  const { t, i18n } = useTranslation();
  const { state: favoritesState, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  const getLocalizedText = (text: { zh: string; en: string }) => {
    return text[i18n.language as keyof typeof text] || text.zh;
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      maxStock: 100 // 默认库存
    });
  };

  if (favoritesState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 返回按钮 */}
          <Link
            to="/shop"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回商城
          </Link>

          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('favorites.emptyFavorites')}</h2>
            <p className="text-gray-600 mb-8">去商城发现更多精彩商品吧！</p>
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t('favorites.startShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/shop"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mr-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('favorites.backToShop')}
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('favorites.title')}</h1>
              <p className="text-gray-600 mt-1">{t('favorites.itemCount', { count: favoritesState.items.length })}</p>
            </div>
          </div>
          
          {favoritesState.items.length > 0 && (
            <button
              onClick={clearFavorites}
              className="text-red-600 hover:text-red-700 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {t('favorites.clearFavorites')}
            </button>
          )}
        </div>

        {/* 收藏商品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoritesState.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link to={`/product/${item.id}`} className="block">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={getLocalizedText(item.name)}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {getLocalizedText(item.name)}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-red-600">
                      ¥{item.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.addedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
              
              {/* 操作按钮 */}
              <div className="p-4 pt-0 flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {t('favorites.addToCart')}
                </button>
                
                <button
                  onClick={() => removeFromFavorites(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  title={t('favorites.removeFavorite')}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}