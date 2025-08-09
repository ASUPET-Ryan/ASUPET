import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockCategories, Category } from '../data/mockShopData';
import { ShoppingCart, Filter, Search, Star, Heart, BarChart3 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import ProductComparison from '../components/ProductComparison';
import { useCurrency } from '../utils/currency';
import { supabase } from '../lib/supabase';

// 从Supabase获取的商品接口
export interface Product {
  id: string;
  name: { zh: string; en: string };
  description?: { zh: string; en: string };
  short_description?: { zh: string; en: string };
  sku: string;
  price: number;
  compare_price?: number;
  weight?: number;
  category_id: string;
  tags: string[];
  images: Array<{ url: string; alt: string; sort: number }>;
  specifications?: { zh: Record<string, string>; en: Record<string, string> };
  ingredients?: { zh: string[]; en: string[] };
  feeding_guide?: { zh: Record<string, string>; en: Record<string, string> };
  nutritional_analysis?: { zh: Record<string, string>; en: Record<string, string> };
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
}



const Shop: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { convertPrice } = useCurrency();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // 从Supabase获取商品数据
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('Error fetching products:', fetchError);
        setError('获取商品数据失败');
        return;
      }
      
      setProducts(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('获取商品数据时发生错误');
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时获取商品数据
  useEffect(() => {
    fetchProducts();
  }, []);

  // 过滤和排序商品
  const filteredProducts = React.useMemo(() => {
    let filtered = products;
    
    // 分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }
    
    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const name = typeof product.name === 'object' ? product.name.zh || product.name.en : product.name;
        const description = typeof product.description === 'object' ? product.description.zh || product.description.en : product.description;
        return name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      });
    }
    
    // 排序
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price_low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        break;
    }
    
    return sorted;
  }, [products, selectedCategory, searchTerm, sortBy]);



  const getLocalizedText = (text: any) => {
    if (typeof text === 'object' && text !== null) {
      return text[i18n.language] || text.zh || text.en || '';
    }
    return text || '';
  };



  const getProductImage = (images: any) => {
    if (Array.isArray(images) && images.length > 0) {
      return images[0].url;
    }
    return 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20food%20product%20placeholder&image_size=square';
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleToggleFavorite = (product: Product) => {
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
  };

  const handleAddToCompare = (product: Product) => {
    if (compareProducts.length < 3 && !compareProducts.find(p => p.id === product.id)) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">商城暂时无法访问</h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <p className="text-sm text-neutral-500">我们正在努力为您准备精彩的商品，请稍后再试。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-cute font-bold mb-4">{t('shop.title')}</h1>
            <p className="text-xl opacity-90">{t('shop.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索和筛选 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('shop.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-cute"
              />
            </div>
            
            {/* 分类筛选 */}
            <div className="flex items-center gap-2">
              <Filter className="text-neutral-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-cute"
              >
                <option value="all">{t('shop.search.allCategories')}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {getLocalizedText(category.name)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* 排序 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-cute"
            >
              <option value="featured">{t('shop.sort.featured')}</option>
              <option value="newest">{t('shop.sort.newest')}</option>
              <option value="price_low">{t('shop.sort.priceLow')}</option>
              <option value="price_high">{t('shop.sort.priceHigh')}</option>
            </select>
          </div>
        </div>

        {/* 商品网格 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <ShoppingCart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('shop.empty.title')}</h3>
            <p className="text-gray-600">{t('shop.empty.description')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link to={`/product/${product.id}`} className="block">
                  {/* 商品图片 */}
                  <div className="relative">
                    <img
                      src={getProductImage(product.images)}
                      alt={getLocalizedText(product.name)}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20pet%20food%20product%20placeholder&image_size=square';
                      }}
                    />
                    {product.is_featured && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {t('shop.product.featured')}
                      </div>
                    )}
                    {product.compare_price && product.compare_price > product.price && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {t('shop.product.sale')}
                      </div>
                    )}
                  </div>
                  
                  {/* 商品信息 */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {getLocalizedText(product.name)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {getLocalizedText(product.short_description)}
                    </p>
                    
                    {/* 价格 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">{convertPrice(product.price).formatted}</span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-sm text-gray-500 line-through">{convertPrice(product.compare_price).formatted}</span>
                        )}
                      </div>
                      {product.weight && (
                        <span className="text-sm text-gray-500">{t('shop.product.weight', { weight: product.weight })}</span>
                      )}
                    </div>
                    
                    {/* 库存状态 */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm ${
                        product.stock_quantity > 10 ? 'text-green-600' :
                        product.stock_quantity > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {product.stock_quantity > 10 ? t('shop.product.inStock') :
                         product.stock_quantity > 0 ? t('shop.product.lowStock', { count: product.stock_quantity }) : t('shop.product.outOfStock')}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* 添加到购物车按钮 */}
                <div className="px-4 pb-4">
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      product.stock_quantity > 0
                        ? 'btn-primary'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={product.stock_quantity === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    {product.stock_quantity > 0 ? (
                      <div className="flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        {t('shop.product.addToCart')}
                      </div>
                    ) : (
                      t('shop.product.outOfStock')
                    )}
                  </button>
                </div>
                
                {/* 收藏和对比按钮 */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleFavorite(product);
                    }}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  </button>
                  <button 
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCompare(product);
                    }}
                    disabled={compareProducts.length >= 3 || compareProducts.find(p => p.id === product.id) !== undefined}
                  >
                    <BarChart3 className={`w-4 h-4 ${compareProducts.find(p => p.id === product.id) ? 'text-blue-500' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* 商品对比 */}
        {compareProducts.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{t('shop.comparison.title')} {t('shop.comparison.count', { current: compareProducts.length, max: 3 })}</h3>
              <button
                onClick={() => setShowComparison(true)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                {t('shop.comparison.viewComparison')}
              </button>
            </div>
            <div className="flex gap-2">
              {compareProducts.map((product) => (
                <div key={product.id} className="relative">
                  <img
                    src={getProductImage(product.images)}
                    alt={getLocalizedText(product.name)}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveFromCompare(product.id)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 商品对比弹窗 */}
        <ProductComparison
          products={compareProducts}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
          onRemoveProduct={handleRemoveFromCompare}
        />
      </div>
    </div>
  );
};

export default Shop;