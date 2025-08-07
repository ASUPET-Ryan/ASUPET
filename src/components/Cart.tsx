import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const { i18n } = useTranslation();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const getLocalizedText = (text: { zh: string; en: string }) => {
    return text[i18n.language as keyof typeof text] || text.zh;
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // 模拟结账过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('订单提交成功！我们将尽快为您处理。');
    clearCart();
    setIsCheckingOut(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* 购物车侧边栏 */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-display font-semibold text-neutral-900">购物车</h2>
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs px-2 py-1 rounded-full">
              {state.itemCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 购物车内容 */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500">
              <ShoppingBag className="w-16 h-16 mb-4 text-neutral-300" />
              <p className="text-lg mb-2 font-medium">购物车是空的</p>
              <p className="text-sm text-neutral-400">快去挑选您喜欢的商品吧！</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <img
                    src={item.image}
                    alt={getLocalizedText(item.name)}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2 text-neutral-900">
                      {getLocalizedText(item.name)}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-2">
                      ¥{item.price.toFixed(2)}
                    </p>
                    
                    {/* 数量控制 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-neutral-200 rounded-lg hover:bg-neutral-300 transition-colors duration-300"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-neutral-200 rounded-lg hover:bg-neutral-300 transition-colors duration-300"
                          disabled={item.quantity >= item.maxStock}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部结算 */}
        {state.items.length > 0 && (
          <div className="border-t border-neutral-200 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-display font-semibold text-neutral-900">总计:</span>
              <span className="text-xl font-display font-bold text-primary-600">
                ¥{state.total.toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isCheckingOut ? '处理中...' : '立即结算'}
              </button>
              
              <button
                onClick={clearCart}
                className="w-full bg-neutral-200 text-neutral-700 py-2 rounded-lg font-medium hover:bg-neutral-300 transition-colors duration-300"
              >
                清空购物车
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}