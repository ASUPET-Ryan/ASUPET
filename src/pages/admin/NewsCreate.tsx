import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  Save, 
  Eye, 
  Upload, 
  X, 
  Calendar,
  Star,
  Globe,
  ArrowLeft
} from 'lucide-react';

interface NewsFormData {
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  content_en: string;
  content_zh: string;
  category_id: string;
  publish_date: string;
  featured: boolean;
  featured_image_url?: string;
}

interface Category {
  id: string;
  name_en: string;
  name_zh: string;
  color: string;
}

const NewsCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<NewsFormData>({
    title_en: '',
    title_zh: '',
    excerpt_en: '',
    excerpt_zh: '',
    content_en: '',
    content_zh: '',
    category_id: '',
    publish_date: new Date().toISOString().split('T')[0],
    featured: false,
    featured_image_url: ''
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('news_categories')
        .select('*')
        .order('name_en');

      if (error) throw error;
      
      setCategories(data || []);
      
      // Set default category if available
      if (data && data.length > 0 && !formData.category_id) {
        setFormData(prev => ({
          ...prev,
          category_id: data[0].id
        }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (field: keyof NewsFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setImageUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `news-${Date.now()}.${fileExt}`;
      const filePath = `news-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        featured_image_url: publicUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featured_image_url: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title_en.trim() || !formData.title_zh.trim()) {
      alert('Please provide titles in both languages');
      return;
    }
    
    if (!formData.content_en.trim() || !formData.content_zh.trim()) {
      alert('Please provide content in both languages');
      return;
    }

    setLoading(true);

    try {
      // Transform form data to match database schema
      const newsData = {
        id: crypto.randomUUID(),
        title: {
          en: formData.title_en,
          zh: formData.title_zh
        },
        excerpt: {
          en: formData.excerpt_en,
          zh: formData.excerpt_zh
        },
        content: {
          en: formData.content_en,
          zh: formData.content_zh
        },
        category_id: formData.category_id,
        publish_date: formData.publish_date,
        featured: formData.featured,
        featured_image_url: formData.featured_image_url,
        author: 'Admin',
        tags: []
      };

      const { error } = await supabase
        .from('news')
        .insert([newsData])
        .select()
        .single();

      if (error) throw error;

      navigate('/admin/news');
    } catch (error) {
      console.error('Error creating news:', error);
      alert('Failed to create news article');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    // Find selected category
    const selectedCategory = categories.find(cat => cat.id === formData.category_id);
    
    // Transform form data to preview format
    const previewData = {
      title: { zh: formData.title_zh, en: formData.title_en },
      excerpt: { zh: formData.excerpt_zh, en: formData.excerpt_en },
      content: { zh: formData.content_zh, en: formData.content_en },
      category: { 
        zh: selectedCategory?.name_zh || 'Unknown Category', 
        en: selectedCategory?.name_en || 'Unknown Category' 
      },
      featured_image_url: formData.featured_image_url,
      publish_date: formData.publish_date,
      featured: formData.featured,
      author: 'Admin',
      tags: []
    };
    
    // Store preview data in sessionStorage
    sessionStorage.setItem('newsPreviewData', JSON.stringify(previewData));
    window.open('/admin/news/preview', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/news')}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create News Article</h1>
            <p className="mt-1 text-sm text-gray-600">
              Create a new news article with multilingual content
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handlePreview}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Eye className="-ml-1 mr-2 h-4 w-4" />
            Preview
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => handleInputChange('category_id', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name_en} / {category.name_zh}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publish Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.publish_date}
                  onChange={(e) => handleInputChange('publish_date', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 flex items-center text-sm text-gray-700">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                Mark as featured news
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
          
          {formData.featured_image_url ? (
            <div className="relative">
              <img
                src={formData.featured_image_url}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-gray-300 border-dashed rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      {imageUploading ? 'Uploading...' : 'Upload an image'}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* English Content */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">English Content</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title (English) *
              </label>
              <input
                type="text"
                value={formData.title_en}
                onChange={(e) => handleInputChange('title_en', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter English title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt (English)
              </label>
              <textarea
                value={formData.excerpt_en}
                onChange={(e) => handleInputChange('excerpt_en', e.target.value)}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description in English"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content (English) *
              </label>
              <textarea
                value={formData.content_en}
                onChange={(e) => handleInputChange('content_en', e.target.value)}
                rows={10}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Full article content in English"
                required
              />
            </div>
          </div>
        </div>

        {/* Chinese Content */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Chinese Content</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title (Chinese) *
              </label>
              <input
                type="text"
                value={formData.title_zh}
                onChange={(e) => handleInputChange('title_zh', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入中文标题"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt (Chinese)
              </label>
              <textarea
                value={formData.excerpt_zh}
                onChange={(e) => handleInputChange('excerpt_zh', e.target.value)}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="中文简介"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content (Chinese) *
              </label>
              <textarea
                value={formData.content_zh}
                onChange={(e) => handleInputChange('content_zh', e.target.value)}
                rows={10}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="中文正文内容"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/news')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium btn-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </div>
            ) : (
              <>
                <Save className="-ml-1 mr-2 h-4 w-4" />
                Create News
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsCreate;