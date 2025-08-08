import React, { useState } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Review {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
}

// 模拟评价数据
const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '宠物爱好者',
    rating: 5,
    comment: '我家狗狗非常喜欢这款狗粮，营养丰富，毛发也变得更亮了。包装很好，没有破损。会继续购买！',
    createdAt: '2024-01-15',
    helpful: 12,
    verified: true
  },
  {
    id: '2',
    userId: 'user2',
    userName: '小猫咪的主人',
    rating: 4,
    comment: '质量不错，猫咪爱吃。就是价格稍微有点贵，但是考虑到营养价值还是值得的。',
    createdAt: '2024-01-10',
    helpful: 8,
    verified: true
  },
  {
    id: '3',
    userId: 'user3',
    userName: '新手铲屎官',
    rating: 5,
    comment: '第一次买这个牌子，朋友推荐的。狗狗很喜欢，吃完后精神状态很好。客服态度也很好，解答了很多问题。',
    createdAt: '2024-01-08',
    helpful: 15,
    verified: false
  }
];

export default function ProductReviews({ productId, reviews = mockReviews }: ProductReviewsProps) {
  const { i18n } = useTranslation();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'helpful'>('newest');

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加提交评价的逻辑
    alert('评价提交成功！感谢您的反馈。');
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 评价概览 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 平均评分 */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating), 'lg')}
            <div className="text-sm text-gray-600 mt-2">
              基于 {reviews.length} 条评价
            </div>
          </div>

          {/* 评分分布 */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2 text-sm">
                <span className="w-8">{rating}星</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">排序方式:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="newest">最新</option>
            <option value="oldest">最早</option>
            <option value="rating">评分最高</option>
            <option value="helpful">最有用</option>
          </select>
        </div>
        
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="btn-primary px-4 py-2 text-sm"
        >
          写评价
        </button>
      </div>

      {/* 写评价表单 */}
      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">写评价</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                评分
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 hover:text-yellow-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                评价内容
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="分享您的使用体验..."
                required
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="btn-primary px-6 py-2"
              >
                提交评价
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 评价列表 */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.userName} className="w-10 h-10 rounded-full" />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{review.userName}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      已验证购买
                    </span>
                  )}
                  <span className="text-sm text-gray-500">{review.createdAt}</span>
                </div>
                
                <div className="mb-3">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 mb-4">{review.comment}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" />
                    有用 ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}