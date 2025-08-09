import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Upload, X, Plus } from 'lucide-react';

interface Category {
  id: string;
  name: any;
  slug: string;
}

interface ProductFormData {
  name: {
    zh: string;
    'zh-TW': string;
    en: string;
  };
  description: {
    zh: string;
    'zh-TW': string;
    en: string;
  };
  short_description: {
    zh: string;
    'zh-TW': string;
    en: string;
  };
  sku: string;
  price: number;
  compare_price: number;
  weight: number;
  category_id: string;
  tags: string[];
  images: Array<{ url: string; alt: string; sort: number }>;
  specifications: {
    zh: string;
    'zh-TW': string;
    en: string;
  };
  ingredients: {
    zh: string;
    'zh-TW': string;
    en: string;
  };
  feeding_guide: {
    zh: string;
    'zh-TW': string;
    en: string;
  };
  nutritional_analysis: {
    zh: string;
    'zh-TW': string;
    en: string;
  };
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
}

const ProductCreate: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  const [formData, setFormData] = useState<ProductFormData>({
    name: { zh: '', 'zh-TW': '', en: '' },
    description: { zh: '', 'zh-TW': '', en: '' },
    short_description: { zh: '', 'zh-TW': '', en: '' },
    sku: '',
    price: 0,
    compare_price: 0,
    weight: 0,
    category_id: '',
    tags: [],
    images: [],
    specifications: { zh: '', 'zh-TW': '', en: '' },
    ingredients: { zh: '', 'zh-TW': '', en: '' },
    feeding_guide: { zh: '', 'zh-TW': '', en: '' },
    nutritional_analysis: { zh: '', 'zh-TW': '', en: '' },
    stock_quantity: 0,
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('id, name, slug')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('获取分类失败:', error);
    }
  };

  const handleInputChange = (field: string, value: any, lang?: string) => {
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...(prev[field as keyof ProductFormData] as any),
          [lang]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      const newImage = {
        url: newImageUrl.trim(),
        alt: newImageAlt.trim() || '商品图片',
        sort: formData.images.length + 1
      };
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
      setNewImageUrl('');
      setNewImageAlt('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 验证必填字段
      if (!formData.name.zh || !formData.sku || !formData.price) {
        alert('请填写必填字段：中文名称、SKU、价格');
        return;
      }

      // 检查用户认证状态
      const { data: { session } } = await supabase.auth.getSession();
      console.log('当前认证状态:', session ? '已认证' : '未认证');
      console.log('用户信息:', session?.user);
      
      if (!session) {
        alert('用户未认证，请重新登录');
        return;
      }

      // 准备插入数据
      const insertData = {
        name: formData.name,
        description: formData.description,
        short_description: formData.short_description,
        sku: formData.sku,
        price: formData.price,
        compare_price: formData.compare_price || null,
        weight: formData.weight || null,
        category_id: formData.category_id || null,
        tags: formData.tags.length > 0 ? formData.tags : null,
        images: formData.images.length > 0 ? formData.images : null,
        specifications: formData.specifications,
        ingredients: formData.ingredients,
        feeding_guide: formData.feeding_guide,
        nutritional_analysis: formData.nutritional_analysis,
        stock_quantity: formData.stock_quantity,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
      };
      
      console.log('准备插入的数据:', insertData);

      const { data, error } = await supabase
        .from('products')
        .insert([insertData])
        .select();

      if (error) {
        console.error('数据库错误详情:', error);
        console.error('错误代码:', error.code);
        console.error('错误消息:', error.message);
        console.error('错误详情:', error.details);
        console.error('错误提示:', error.hint);
        
        // 根据错误类型提供更具体的错误信息
        if (error.code === '42501') {
          alert('权限不足：无法创建商品。请确保已正确登录管理员账户。');
        } else if (error.code === '23505') {
          alert('SKU已存在，请使用不同的SKU。');
        } else {
          alert(`创建失败：${error.message}`);
        }
        return;
      }

      console.log('商品创建成功:', data);
      alert('商品创建成功！');
      navigate('/admin/products');
    } catch (error) {
      console.error('创建商品失败:', error);
      alert(`创建失败：${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedText = (text: any) => {
    if (typeof text === 'object' && text !== null) {
      return text[i18n.language] || text.zh || text.en || '';
    }
    return text || '';
  };

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">新建商品</h1>
          <p className="text-gray-600 mt-1">创建新的商品信息</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基本信息 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 商品名称 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商品名称 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="中文名称"
                  value={formData.name.zh}
                  onChange={(e) => handleInputChange('name', e.target.value, 'zh')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="繁体中文名称"
                  value={formData.name['zh-TW']}
                  onChange={(e) => handleInputChange('name', e.target.value, 'zh-TW')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="英文名称"
                  value={formData.name.en}
                  onChange={(e) => handleInputChange('name', e.target.value, 'en')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* 分类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商品分类
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => handleInputChange('category_id', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">请选择分类</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {getLocalizedText(category.name)}
                  </option>
                ))}
              </select>
            </div>

            {/* 价格 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                售价 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* 对比价格 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                对比价格
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.compare_price}
                onChange={(e) => handleInputChange('compare_price', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 重量 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                重量 (kg)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 库存 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                库存数量
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock_quantity}
                onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 简短描述 */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              简短描述
            </label>
            <div className="space-y-2">
              <textarea
                placeholder="中文简短描述"
                value={formData.short_description.zh}
                onChange={(e) => handleInputChange('short_description', e.target.value, 'zh')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="繁体中文简短描述"
                value={formData.short_description['zh-TW']}
                onChange={(e) => handleInputChange('short_description', e.target.value, 'zh-TW')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="英文简短描述"
                value={formData.short_description.en}
                onChange={(e) => handleInputChange('short_description', e.target.value, 'en')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 详细描述 */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              详细描述
            </label>
            <div className="space-y-2">
              <textarea
                placeholder="中文详细描述"
                value={formData.description.zh}
                onChange={(e) => handleInputChange('description', e.target.value, 'zh')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="繁体中文详细描述"
                value={formData.description['zh-TW']}
                onChange={(e) => handleInputChange('description', e.target.value, 'zh-TW')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="英文详细描述"
                value={formData.description.en}
                onChange={(e) => handleInputChange('description', e.target.value, 'en')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 标签管理 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">标签管理</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="添加标签"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 商品图片 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">商品图片</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative border rounded-lg p-2">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">{image.alt}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <input
              type="url"
              placeholder="图片URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="图片描述"
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addImage}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              添加图片
            </button>
          </div>
        </div>

        {/* 商品设置 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">商品设置</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => handleInputChange('is_active', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                商品上架
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">
                推荐商品
              </label>
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {loading ? '创建中...' : '创建商品'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;