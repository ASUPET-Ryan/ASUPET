import React from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Product } from '../data/mockShopData';
import { useCart } from '../contexts/CartContext';

interface ProductComparisonProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
}

export default function ProductComparison({ 
  products, 
  isOpen, 
  onClose, 
  onRemoveProduct 
}: ProductComparisonProps) {
  const { i18n } = useTranslation();
  const { addToCart } = useCart();

  const getLocalizedText = (text: { zh: string; en: string }) => {
    return text[i18n.language as keyof typeof text] || text.zh;
  };

  const getProductImage = (images: string[] | string) => {
    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }
    if (typeof images === 'string') {
      return images;
    }
    return 'https://via.placeholder.com/300x200?text=No+Image';
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(product.images),
      maxStock: product.stock_quantity
    });
  };

  if (!isOpen || products.length === 0) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* 对比窗口 */}
      <div className="fixed inset-4 bg-white rounded-lg shadow-xl z-50 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">商品对比 ({products.length}/3)</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 对比内容 */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden">
                {/* 商品图片和移除按钮 */}
                <div className="relative">
                  <img
                    src={getProductImage(product.images)}
                    alt={getLocalizedText(product.name)}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 商品信息 */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">
                    {getLocalizedText(product.name)}
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">价格:</span>
                      <span className="font-semibold text-red-600">
                        ¥{product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    {product.compare_price && product.compare_price > product.price && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">原价:</span>
                        <span className="text-gray-500 line-through">
                          ¥{product.compare_price.toFixed(2)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">库存:</span>
                      <span className={product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock_quantity > 0 ? `${product.stock_quantity}件` : '缺货'}
                      </span>
                    </div>
                    
                    {product.weight && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">重量:</span>
                        <span>{product.weight}kg</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">评分:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>4.8</span>
                      </div>
                    </div>
                    
                    {product.is_featured && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">推荐:</span>
                        <span className="text-red-600 font-medium">是</span>
                      </div>
                    )}
                  </div>

                  {/* 商品描述 */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">商品描述:</h4>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {getLocalizedText(product.short_description)}
                    </p>
                  </div>

                  {/* 操作按钮 */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {product.stock_quantity > 0 ? '加入购物车' : '暂时缺货'}
                    </button>
                    
                    <button
                      onClick={() => window.open(`/product/${product.id}`, '_blank')}
                      className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300"
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="border-t p-4 text-center text-sm text-gray-600">
          最多可对比3个商品，点击商品卡片右上角的 × 可移除商品
        </div>
      </div>
    </>
  );
}