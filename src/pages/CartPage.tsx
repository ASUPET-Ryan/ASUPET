import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { state: cartState, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const getLocalizedText = (text: { zh: string; en: string }) => {
    return text[i18n.language as keyof typeof text] || text.zh;
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  if (cartState.items.length === 0) {
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
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('cart.emptyCart')}</h2>
            <p className="text-gray-600 mb-8">还没有添加任何商品，快去挑选您喜欢的商品吧！</p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t('cart.startShopping')}
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
              {t('cart.backToShop')}
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('cart.title')}</h1>
              <p className="text-gray-600 mt-1">{t('cart.itemCount', { count: cartState.itemCount })}</p>
            </div>
          </div>
          
          {cartState.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {t('cart.clearCart')}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 购物车商品列表 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('cart.productList')}</h2>
                
                <div className="space-y-4">
                  {cartState.items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={getLocalizedText(item.name)}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                          }}
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`} className="block">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {getLocalizedText(item.name)}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {t('cart.unitPrice')}: ¥{item.price.toFixed(2)}
                        </p>
                      </div>
                      
                      {/* 数量控制 */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* 小计 */}
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ¥{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      {/* 删除按钮 */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        title={t('cart.removeItem')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* 订单摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('cart.orderSummary')}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="text-gray-900">¥{cartState.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span className="text-gray-900">{t('cart.freeShipping')}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">{t('cart.total')}</span>
                    <span className="text-gray-900">¥{cartState.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cartState.items.length === 0}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {isCheckingOut ? t('cart.processing') : t('cart.checkout')}
              </button>
              
              <Link
                to="/shop"
                className="block w-full text-center text-blue-600 hover:text-blue-700 mt-4 py-2"
              >
                {t('cart.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}