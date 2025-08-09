import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield, Award, Minus, Plus, RotateCcw } from 'lucide-react';
import { mockProducts, Product } from '../data/mockShopData';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import ProductReviews from '../components/ProductReviews';
import { useCurrency } from '../utils/currency';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { convertPrice } = useCurrency();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  const getLocalizedText = (text: any) => {
    if (typeof text === 'object' && text !== null) {
      return text[i18n.language] || text.zh || text.en || '';
    }
    return text || '';
  };

  const getProductImage = (imagesObj: any) => {
    if (Array.isArray(imagesObj) && imagesObj.length > 0) {
      return imagesObj[0].url;
    }
    return 'https://via.placeholder.com/400x400?text=No+Image';
  };

  const getAllImages = (imagesObj: any) => {
    if (Array.isArray(imagesObj) && imagesObj.length > 0) {
      return imagesObj;
    }
    return [{ url: 'https://via.placeholder.com/400x400?text=No+Image', alt: 'Product Image' }];
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">商品未找到</h2>
          <Link to="/shop" className="text-blue-600 hover:text-blue-800">
            返回商城
          </Link>
        </div>
      </div>
    );
  }

  const images = getAllImages(product.images);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">首页</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-blue-600">严选商品</Link>
            <span>/</span>
            <span className="text-gray-900">{getLocalizedText(product.name)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按钮 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          返回
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* 商品图片 */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[selectedImage]?.url || getProductImage(product.images)}
                  alt={getLocalizedText(product.name)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                  }}
                />
              </div>
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 商品信息 */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {getLocalizedText(product.name)}
                </h1>
                <p className="text-gray-600">
                  {getLocalizedText(product.short_description)}
                </p>
              </div>

              {/* 价格 */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-red-600">
                  {convertPrice(product.price).formatted}
                </span>
                {product.compare_price && product.compare_price > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {convertPrice(product.compare_price).formatted}
                  </span>
                )}
              </div>

              {/* SKU和库存 */}
              <div className="space-y-2 text-sm text-gray-600">
                <div>SKU: {product.sku}</div>
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  {product.stock_quantity > 0 ? `库存: ${product.stock_quantity}` : '缺货'}
                </div>
              </div>

              {/* 数量选择 */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">数量:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-4">
                  <button
                     onClick={async () => {
                       setIsAddingToCart(true);
                       try {
                         await addToCart(product.id, quantity);
                       } catch (error) {
                         console.error('Failed to add to cart:', error);
                       } finally {
                         setIsAddingToCart(false);
                       }
                     }}
                     disabled={product.stock_quantity === 0 || isAddingToCart}
                     className="flex-1 btn-primary px-6 py-3 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                   >
                     <ShoppingCart className="h-5 w-5 mr-2" />
                     {isAddingToCart ? '添加中...' : '加入购物车'}
                   </button>
                   <button 
                     onClick={() => {
                       if (isFavorite(product.id)) {
                         removeFromFavorites(product.id);
                       } else {
                         addToFavorites({
                           id: product.id,
                           name: product.name,
                           price: product.price,
                           image: getProductImage(product.images)
                         });
                       }
                     }}
                     className={`px-6 py-3 border rounded-lg flex items-center justify-center ${
                       isFavorite(product.id)
                         ? 'border-red-300 text-red-600 bg-red-50 hover:bg-red-100'
                         : 'btn-secondary'
                     }`}
                   >
                     <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                   </button>
                </div>
              </div>

              {/* 服务保障 */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">服务保障</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>免费配送</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>品质保证</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span>7天退换</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 详细信息标签页 */}
          <div className="border-t">
            <div className="flex border-b">
              {[
                { key: 'description', label: '商品详情' },
                { key: 'specifications', label: '规格参数' },
                { key: 'ingredients', label: '成分配料' },
                { key: 'feeding', label: '喂养指南' },
                { key: 'reviews', label: '用户评价' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {getLocalizedText(product.description)}
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications && Object.entries(getLocalizedText(product.specifications) || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  {product.ingredients && (
                    <div className="space-y-2">
                      {(getLocalizedText(product.ingredients) as string[])?.map((ingredient, index) => (
                        <span key={index} className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 mr-2 mb-2">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'feeding' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.feeding_guide && Object.entries(getLocalizedText(product.feeding_guide) || {}).map(([weight, amount]) => (
                    <div key={weight} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">{weight}:</span>
                      <span className="font-medium">{amount as string}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <ProductReviews productId={product.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;