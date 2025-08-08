import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Globe, Calendar, User, Tag, Star } from 'lucide-react';

interface NewsPreviewData {
  title: { zh: string; en: string };
  excerpt: { zh: string; en: string };
  content: { zh: string; en: string };
  category: { zh: string; en: string };
  featured_image?: File | null;
  featured_image_url?: string;
  publish_date: string;
  featured: boolean;
  author?: string;
  tags?: string[];
}

const NewsPreview: React.FC = () => {
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState<NewsPreviewData | null>(null);
  const [currentLang, setCurrentLang] = useState<'zh' | 'en'>('zh');
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    // 从 sessionStorage 获取预览数据
    const data = sessionStorage.getItem('newsPreviewData');
    if (data) {
      const parsedData = JSON.parse(data);
      setPreviewData(parsedData);
      
      // 如果有图片文件，创建预览URL
      if (parsedData.featured_image) {
        const url = URL.createObjectURL(parsedData.featured_image);
        setImageUrl(url);
        return () => URL.revokeObjectURL(url);
      } else if (parsedData.featured_image_url) {
        setImageUrl(parsedData.featured_image_url);
      }
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(-1);
  };

  if (!previewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">无预览数据</h2>
          <p className="text-gray-600 mb-6">请先在编辑页面保存草稿后再预览</p>
          <button
            onClick={handleBack}
            className="btn-primary px-6 py-2 transition-colors"
          >
            返回编辑
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 预览工具栏 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回编辑
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <span className="text-sm text-gray-500">预览模式</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* 语言切换 */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value as 'zh' | 'en')}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="zh">中文</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <button
                onClick={handleEdit}
                className="flex items-center btn-primary px-4 py-2 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                编辑
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 新闻内容预览 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* 特色图片 */}
          {imageUrl && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={imageUrl}
                alt={previewData.title[currentLang]}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            {/* 文章元信息 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(previewData.publish_date).toLocaleDateString(currentLang === 'zh' ? 'zh' : 'en-US')}
              </div>
              
              {previewData.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {previewData.author}
                </div>
              )}
              
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                {previewData.category[currentLang]}
              </div>
              
              {previewData.featured && (
                <div className="flex items-center text-yellow-600">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  精选
                </div>
              )}
            </div>
            
            {/* 标题 */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {previewData.title[currentLang]}
            </h1>
            
            {/* 摘要 */}
            <div className="text-lg text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-500 pl-4">
              {previewData.excerpt[currentLang]}
            </div>
            
            {/* 正文内容 */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {previewData.content[currentLang]}
              </div>
            </div>
            
            {/* 标签 */}
            {previewData.tags && previewData.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {previewData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        {/* 预览提示 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <strong>预览提示：</strong> 这是新闻文章的预览效果。实际发布后的样式可能会有细微差异。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPreview;