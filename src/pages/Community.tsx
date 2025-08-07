import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, MessageCircle, Heart, Share2, Clock, Star, ArrowRight, Camera, Send, ThumbsUp } from 'lucide-react';

const Community = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('posts');
  const [newPost, setNewPost] = useState('');

  const communityPosts = [
    {
      id: 1,
      author: '猫奴小王',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cat%20owner%20avatar%2C%20cartoon%20style&image_size=square',
      time: '2小时前',
      content: '我家橘猫最近食欲不振，换了新的猫粮后明显改善了！ASUPET的营养配方真的很棒 👍',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20cat%20eating%20premium%20cat%20food%2C%20happy%20expression&image_size=landscape_4_3',
      likes: 24,
      comments: 8,
      tags: ['猫咪', '营养', '食欲']
    },
    {
      id: 2,
      author: '金毛妈妈',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20owner%20woman%20avatar%2C%20cartoon%20style&image_size=square',
      time: '4小时前',
      content: '分享一下我家金毛的减肥成功经验！配合ASUPET的体重管理配方，3个月减重5公斤，现在活力满满！',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20retriever%20before%20and%20after%20weight%20loss%2C%20healthy%20and%20active&image_size=landscape_4_3',
      likes: 56,
      comments: 15,
      tags: ['狗狗', '减肥', '健康']
    },
    {
      id: 3,
      author: '布偶控',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cat%20lover%20avatar%2C%20cartoon%20style&image_size=square',
      time: '6小时前',
      content: '新手养猫求助！布偶猫幼猫应该怎么选择猫粮？有经验的朋友们给点建议吧～',
      likes: 12,
      comments: 23,
      tags: ['新手', '布偶猫', '幼猫']
    },
    {
      id: 4,
      author: '哈士奇爸爸',
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=husky%20owner%20man%20avatar%2C%20cartoon%20style&image_size=square',
      time: '8小时前',
      content: '哈士奇的肠胃真的很敏感，试了很多品牌都不行，最后选择了ASUPET的敏感肠胃配方，终于不拉肚子了！',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=husky%20dog%20healthy%20and%20happy%2C%20eating%20dog%20food&image_size=landscape_4_3',
      likes: 31,
      comments: 12,
      tags: ['哈士奇', '肠胃敏感', '健康']
    }
  ];

  const expertAnswers = [
    {
      id: 1,
      question: '猫咪不爱喝水怎么办？',
      expert: '宠物营养师 - 李医生',
      answer: '可以尝试以下方法：1. 使用流动水源如饮水机 2. 在多个地方放置水碗 3. 选择湿粮增加水分摄入 4. 定期清洁水碗保持新鲜',
      time: '1天前',
      likes: 89
    },
    {
      id: 2,
      question: '狗狗换粮期间拉肚子正常吗？',
      expert: '兽医师 - 张医生',
      answer: '换粮期间轻微的肠胃不适是正常的，建议7-10天逐渐过渡。如果腹泻严重或持续超过3天，应立即就医检查。',
      time: '2天前',
      likes: 67
    },
    {
      id: 3,
      question: '老年猫需要特殊的营养配方吗？',
      expert: '宠物营养师 - 王医生',
      answer: '是的，老年猫（7岁以上）需要：1. 易消化的高质量蛋白质 2. 降低磷含量保护肾脏 3. 增加抗氧化剂 4. 添加关节保护成分',
      time: '3天前',
      likes: 45
    }
  ];

  const communityGroups = [
    {
      name: '猫咪营养交流群',
      members: 1248,
      description: '专业讨论猫咪营养、健康、护理等话题',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=cat%20nutrition%20group%20icon%2C%20cute%20cats%20eating&image_size=square',
      category: 'cats'
    },
    {
      name: '狗狗健康俱乐部',
      members: 2156,
      description: '分享狗狗健康管理、训练、营养等经验',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20health%20club%20icon%2C%20happy%20dogs&image_size=square',
      category: 'dogs'
    },
    {
      name: '新手养宠指导',
      members: 856,
      description: '新手养宠问题解答，经验分享',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20care%20beginner%20guide%20icon&image_size=square',
      category: 'beginner'
    },
    {
      name: '宠物摄影分享',
      members: 1567,
      description: '分享宠物美照，交流摄影技巧',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20photography%20group%20icon%2C%20camera%20and%20pets&image_size=square',
      category: 'photography'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-indigo-300 rounded-full animate-bounce-soft"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-xl">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('community.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('community.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'posts'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('community.tabs.posts')}
              </button>
              <button
                onClick={() => setActiveTab('experts')}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'experts'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Star className="w-5 h-5 mr-2" />
                {t('community.tabs.experts')}
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'groups'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Users className="w-5 h-5 mr-2" />
                {t('community.tabs.groups')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div>
              {/* Post Creation */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('community.posts.createTitle')}</h3>
                <div className="flex space-x-4">
                  <img
                    src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2C%20friendly%20pet%20owner&image_size=square"
                    alt="Your Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder={t('community.posts.placeholder')}
                      className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300">
                        <Camera className="w-5 h-5 mr-2" />
                        {t('community.posts.addImage')}
                      </button>
                      <button className="btn-primary flex items-center px-6 py-2">
                        <Send className="w-4 h-4 mr-2" />
                        {t('community.posts.publish')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{post.author}</h4>
                          <span className="text-gray-500 text-sm flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.time}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Post image"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                          />
                        )}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-6 text-gray-600">
                          <button className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-300">
                            <ThumbsUp className="w-5 h-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-purple-500 transition-colors duration-300">
                            <MessageCircle className="w-5 h-5" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
                            <Share2 className="w-5 h-5" />
                            <span>分享</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experts Tab */}
          {activeTab === 'experts' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('community.experts.title')}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('community.experts.subtitle')}
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t('community.experts.askTitle')}</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder={t('community.experts.questionPlaceholder')}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder={t('community.experts.detailPlaceholder')}
                    className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <button className="btn-primary px-6 py-2">
                      {t('community.experts.submit')}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {expertAnswers.map((qa) => (
                  <div key={qa.id} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{qa.question}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium text-purple-600">{qa.expert}</span>
                        <span>•</span>
                        <span>{qa.time}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700">{qa.answer}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-300">
                        <Heart className="w-5 h-5" />
                        <span>{qa.likes}</span>
                      </button>
                      <button className="text-purple-600 hover:text-purple-700 font-medium">
                        {t('community.experts.viewDetails')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === 'groups' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('community.groups.title')}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('community.groups.subtitle')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {communityGroups.map((group, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                      <p className="text-gray-600 mb-4">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-5 h-5 mr-2" />
                          <span>{t('community.groups.members', { count: group.members })}</span>
                        </div>
                        <button className="btn-primary px-4 py-2">
                          {t('community.groups.join')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('community.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('community.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold"
            >
              {t('community.cta.contactUs')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/shop"
              className="btn-secondary inline-flex items-center px-8 py-4 text-lg font-semibold"
            >
              {t('community.cta.shopProducts')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;