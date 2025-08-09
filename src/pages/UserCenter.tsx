import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Heart, 
  ShoppingCart, 
  Package, 
  Settings, 
  Bell, 
  MapPin,
  Phone,
  Mail,
  Edit3,
  ArrowRight,
  Star,
  Clock,
  Users,
  PawPrint,
  Calendar,
  Plus,
  Gift,
  Crown,
  Trash2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import PetProfileForm from '../components/PetProfileForm';

export default function UserCenter() {
  const { t, i18n } = useTranslation();
  const { itemCount } = useCart();
  const { state: favoritesState } = useFavorites();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPetForm, setShowPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  // 模拟用户数据
  const userData = {
    name: '张小宠',
    email: 'zhangxiaochong@example.com',
    phone: '+86 138 0013 8000',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0zMCAxMjBDMzAgMTA0IDQzIDkwIDc1IDkwUzEyMCAxMDQgMTIwIDEyMFYxNTBIMzBWMTIwWiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4K',
    memberLevel: 'VIP',
    points: 2580,
    joinDate: '2023-06-15'
  };

  // 模拟家长信息数据
  const parentInfo = {
    name: '张小明',
    birthday: '1990-05-15',
    phone: '138****8888',
    email: 'zhangxiaoming@example.com',
    address: '上海市浦东新区张江高科技园区'
  };

  // 模拟宝贝信息数据
  const petInfo = [
    {
      id: 1,
      name: '小白',
      breed: '金毛寻回犬',
      birthday: '2022-03-10',
      gender: '公',
      photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJtOSA5IDMgM0wyMCA0Ii8+CjxwYXRoIGQ9Im0yMSAxNS0zLTMtMyAzIi8+CjxwYXRoIGQ9Ik0yMCAxMmgtOCIvPgo8cGF0aCBkPSJtMyA5IDMgMyAzLTMiLz4KPHN2Zz4KPC9zdmc+',
      weight: '25kg',
      color: '金黄色'
    },
    {
      id: 2,
      name: '咪咪',
      breed: '英国短毛猫',
      birthday: '2021-08-22',
      gender: '母',
      photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiMzNzM3MzciLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJtOSA5IDMgM0wyMCA0Ii8+CjxwYXRoIGQ9Im0yMSAxNS0zLTMtMyAzIi8+CjxwYXRoIGQ9Ik0yMCAxMmgtOCIvPgo8cGF0aCBkPSJtMyA5IDMgMyAzLTMiLz4KPHN2Zz4KPC9zdmc+',
      weight: '4.5kg',
      color: '银渐层'
    }
  ];

  // 模拟订单数据
  const recentOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.00,
      items: 3,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iIzM0RDM5OSIvPgo8c3ZnIHg9IjIwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIGQ9Ik0xNiAxNmw0LTQtNC00Ii8+CjxwYXRoIGQ9Im0yMCAxMi04Ii8+CjxwYXRoIGQ9Ik04IDZIDE0gNCA0IDAgMCAwLTQgNHY0YTQgNCAwIDAgMCA0IDRoNGEiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMiIvPgo8L3N2Zz4KPC9zdmc+'
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'shipping',
      total: 156.00,
      items: 2,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0ZCQkYyNCIvPgo8c3ZnIHg9IjIwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIGQ9Im0xMiAzLTEuOTEyIDUuODEzYTIgMiAwIDAgMS0xLjI5NSAxLjI5NUwzIDEybDUuODEzIDEuOTEyYTIgMiAwIDAgMSAxLjI5NSAxLjI5NUwxMiAyMWwxLjkxMi01LjgxM2EyIDIgMCAwIDEgMS4yOTUtMS4yOTVMMjEgMTJsLTUuODEzLTEuOTEyYTIgMiAwIDAgMS0xLjI5NS0xLjI5NVoiLz4KPC9zdmc+Cjwvc3ZnPg=='
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      status: 'processing',
      total: 89.00,
      items: 1,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iIzk5RjZFNCIvPgo8c3ZnIHg9IjIwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwNzI0MiIgc3Ryb2tlLXdpZHRoPSIyIj4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMDcyNDIiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIGQ9Im0xMiAzLTEuOTEyIDUuODEzYTIgMiAwIDAgMS0xLjI5NSAxLjI5NUwzIDEybDUuODEzIDEuOTEyYTIgMiAwIDAgMSAxLjI5NSAxLjI5NUwxMiAyMWwxLjkxMi01LjgxM2EyIDIgMCAwIDEgMS4yOTUtMS4yOTVMMjEgMTJsLTUuODEzLTEuOTEyYTIgMiAwIDAgMS0xLjI5NS0xLjI5NVoiLz4KPC9zdmc+Cjwvc3ZnPg=='
    }
  ];

  const getStatusText = (status: string) => {
    return t(`userCenter.orderStatus.${status}`) || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap = {
      'delivered': 'text-success-600 bg-success-100',
      'shipping': 'text-primary-600 bg-primary-100',
      'processing': 'text-warning-600 bg-warning-100',
      'cancelled': 'text-error-600 bg-error-100'
    };
    return colorMap[status as keyof typeof colorMap] || 'text-neutral-600 bg-neutral-100';
  };

  // 语言切换状态
  // const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  // 通知数据
  const notifications = [
    {
      id: 1,
      type: 'orderUpdate',
      title: t('userCenter.notificationDetails.orderUpdate'),
      message: t('userCenter.notificationDetails.orderUpdateMessage'),
      time: t('userCenter.notificationDetails.hoursAgo', { count: 2 }),
      read: false
    },
    {
      id: 2,
      type: 'promotion',
      title: t('userCenter.notificationDetails.promotion'),
      message: t('userCenter.notificationDetails.promotionMessage'),
      time: t('userCenter.notificationDetails.daysAgo', { count: 1 }),
      read: false
    },
    {
      id: 3,
      type: 'petCare',
      title: t('userCenter.notificationDetails.petCare'),
      message: t('userCenter.notificationDetails.petCareMessage'),
      time: t('userCenter.notificationDetails.daysAgo', { count: 3 }),
      read: true
    }
  ];

  const menuItems = [
    { id: 'overview', name: t('userCenter.overview'), icon: User },
    { id: 'orders', name: t('userCenter.myOrders'), icon: Package },
    { id: 'favorites', name: t('userCenter.myFavorites'), icon: Heart },
    { id: 'parent', name: t('userCenter.parentInfo'), icon: Users },
    { id: 'pets', name: t('userCenter.petInfo'), icon: PawPrint },
    { id: 'addresses', name: t('userCenter.addresses'), icon: MapPin },
    { id: 'notifications', name: t('userCenter.notifications'), icon: Bell },
    { id: 'memberBenefits', name: t('userCenter.memberBenefits'), icon: Crown },
    { id: 'settings', name: t('userCenter.settings'), icon: Settings }
  ];

  // 语言切换函数
  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng);
  //   setShowLanguageDropdown(false);
  // };

  // 获取当前语言显示名称
  // const getCurrentLanguageName = () => {
  //   switch (i18n.language) {
  //     case 'zh': return t('userCenter.languageSettings.chinese');
  //     case 'zh-TW': return t('userCenter.languageSettings.traditionalChinese');
  //     case 'en': return t('userCenter.languageSettings.english');
  //     default: return t('userCenter.languageSettings.chinese');
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6">
            <div className="flex items-center space-x-6">
              {/* 家长头像 */}
              <div className="relative cursor-pointer group" onClick={() => alert('编辑家长资料')}>
                <img
                  src={userData.avatar}
                  alt={parentInfo.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-cute group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute -bottom-1 -right-1 bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-cute">
                  {userData.memberLevel}
                </div>
                <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* 宠物头像们 */}
              <div className="flex space-x-3">
                {petInfo.map((pet) => (
                  <div key={pet.id} className="relative cursor-pointer group" onClick={() => alert(`编辑${pet.name}的资料`)}>
                    <img
                      src={pet.photo}
                      alt={pet.name}
                      className="w-16 h-16 rounded-full border-3 border-white shadow-cute group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white text-primary-600 text-xs px-1.5 py-0.5 rounded-full font-medium shadow-cute">
                      {pet.name}
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Edit3 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">
                  專屬「{parentInfo.name}」和「{petInfo.map(pet => pet.name).join('、')}」的空間
                </h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{userData.points} {t('userCenter.points')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{t('userCenter.joinDate')} {userData.joinDate}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏菜单 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">{t('userCenter.title')}</h2>
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-cute text-left transition-all duration-300 ${
                          activeTab === item.id
                            ? 'bg-primary-100 text-primary-700 shadow-soft'
                            : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* 快速统计 */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <Link
                to="/cart"
                className="bg-white rounded-xl shadow-soft border border-neutral-100 p-4 hover:shadow-glow transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">{t('userCenter.cart')}</p>
                    <p className="text-2xl font-bold text-neutral-900">{itemCount}</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-primary-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </Link>
              
              <Link
                to="/favorites"
                className="bg-white rounded-xl shadow-soft border border-neutral-100 p-4 hover:shadow-glow transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">{t('userCenter.favorites')}</p>
                    <p className="text-2xl font-bold text-neutral-900">{favoritesState.items?.length || 0}</p>
                  </div>
                  <Heart className="w-8 h-8 text-accent-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </div>

          {/* 主内容区域 */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 最近订单 */}
                <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-neutral-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-neutral-900">{t('userCenter.recentOrders')}</h3>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>{t('userCenter.viewAll')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.slice(0, 3).map((order) => (
                          <div key={order.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-300">
                            <img
                              src={order.image}
                              alt="订单商品"
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-neutral-900">订单 {order.id}</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {getStatusText(order.status)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm text-neutral-600">
                                <span>{order.date} · {order.items} 件商品</span>
                                <span className="font-semibold text-neutral-900">¥{order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                        <p className="text-neutral-600">暂无订单记录</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 快速操作 */}
                <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-neutral-100">
                    <h3 className="text-lg font-semibold text-neutral-900">{t('userCenter.quickActions')}</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Link
                        to="/shop"
                        className="flex flex-col items-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl hover:shadow-soft transition-all duration-300 group"
                      >
                        <ShoppingCart className="w-8 h-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-medium text-primary-700">{t('userCenter.continueShopping')}</span>
                      </Link>
                      
                      <button
                        onClick={() => setActiveTab('favorites')}
                        className="flex flex-col items-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl hover:shadow-soft transition-all duration-300 group"
                      >
                        <Heart className="w-8 h-8 text-accent-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-medium text-accent-700">{t('userCenter.myFavorites')}</span>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('addresses')}
                        className="flex flex-col items-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl hover:shadow-soft transition-all duration-300 group"
                      >
                        <MapPin className="w-8 h-8 text-secondary-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-medium text-secondary-700">{t('userCenter.addresses')}</span>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('settings')}
                        className="flex flex-col items-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl hover:shadow-soft transition-all duration-300 group"
                      >
                        <Settings className="w-8 h-8 text-neutral-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-medium text-neutral-700">{t('userCenter.settings')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-100">
                  <h3 className="text-lg font-semibold text-neutral-900">我的订单</h3>
                </div>
                <div className="p-6">
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border border-neutral-200 rounded-xl p-6 hover:shadow-soft transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={order.image}
                                alt="订单商品"
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-semibold text-neutral-900 text-lg">订单 {order.id}</p>
                                <p className="text-neutral-600">{order.date} · {order.items} 件商品</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-neutral-900">¥{order.total.toFixed(2)}</p>
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3">
                            <button className="btn-secondary px-4 py-2 rounded-cute">
                              查看详情
                            </button>
                            {order.status === 'delivered' && (
                              <button className="btn-primary px-4 py-2 rounded-cute">
                                再次购买
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Package className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">暂无订单</h3>
                      <p className="text-neutral-600 mb-6">您还没有任何订单记录</p>
                      <Link
                        to="/shop"
                        className="btn-primary px-6 py-3 rounded-cute inline-flex items-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>开始购物</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">我的收藏</h3>
                    <Link
                      to="/favorites"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <span>查看全部</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center py-16">
                    <Heart className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">暂无收藏</h3>
                    <p className="text-neutral-600 mb-6">收藏您喜欢的商品，方便下次查看</p>
                    <Link
                      to="/shop"
                      className="btn-primary px-6 py-3 rounded-cute inline-flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>去购物</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">收货地址</h3>
                    <button className="btn-primary px-4 py-2 rounded-cute">
                      添加地址
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center py-16">
                    <MapPin className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">暂无收货地址</h3>
                    <p className="text-neutral-600 mb-6">添加收货地址，让购物更便捷</p>
                    <button className="btn-primary px-6 py-3 rounded-cute">
                      添加地址
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'parent' && (
               <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                 <div className="px-6 py-4 border-b border-neutral-100">
                   <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold text-neutral-900">{t('userCenter.parent.title')}</h3>
                     <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1">
                       <Edit3 className="w-4 h-4" />
                       <span>{t('userCenter.parent.edit')}</span>
                     </button>
                   </div>
                 </div>
                 <div className="p-6">
                   <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <User className="w-5 h-5 text-neutral-600" />
                         <div>
                           <p className="font-medium text-neutral-900">{t('userCenter.parent.name')}</p>
                           <p className="text-sm text-neutral-600">{parentInfo.name}</p>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <Calendar className="w-5 h-5 text-neutral-600" />
                         <div>
                           <p className="font-medium text-neutral-900">{t('userCenter.parent.birthday')}</p>
                           <p className="text-sm text-neutral-600">{parentInfo.birthday}</p>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <Phone className="w-5 h-5 text-neutral-600" />
                         <div>
                           <p className="font-medium text-neutral-900">{t('userCenter.parent.phone')}</p>
                           <p className="text-sm text-neutral-600">{parentInfo.phone}</p>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <Mail className="w-5 h-5 text-neutral-600" />
                         <div>
                           <p className="font-medium text-neutral-900">{t('userCenter.parent.email')}</p>
                           <p className="text-sm text-neutral-600">{parentInfo.email}</p>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <MapPin className="w-5 h-5 text-neutral-600" />
                         <div>
                           <p className="font-medium text-neutral-900">{t('userCenter.parent.address')}</p>
                           <p className="text-sm text-neutral-600">{parentInfo.address}</p>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             )}

            {activeTab === 'pets' && (
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">{t('userCenter.pets.title')}</h3>
                    <button 
                      onClick={() => {
                        setEditingPet(null);
                        setShowPetForm(true);
                      }}
                      className="btn-primary px-4 py-2 rounded-cute flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t('userCenter.pets.add')}</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {petInfo.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {petInfo.map((pet) => (
                        <div key={pet.id} className="border border-neutral-200 rounded-xl p-6 hover:shadow-soft transition-all duration-300">
                          <div className="flex items-start space-x-4">
                            <img
                              src={pet.photo}
                              alt={pet.name}
                              className="w-20 h-20 rounded-full object-cover border-4 border-primary-100"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-semibold text-neutral-900">{pet.name}</h4>
                                <button 
                                  onClick={() => {
                                    setEditingPet(pet);
                                    setShowPetForm(true);
                                  }}
                                  className="text-primary-600 hover:text-primary-700"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="space-y-2 text-sm text-neutral-600">
                                <p><span className="font-medium">{t('userCenter.pets.breed')}：</span>{pet.breed}</p>
                                <p><span className="font-medium">{t('userCenter.pets.birthday')}：</span>{pet.birthday}</p>
                                <p><span className="font-medium">{t('userCenter.pets.gender')}：</span>{pet.gender}</p>
                                <p><span className="font-medium">{t('userCenter.pets.weight')}：</span>{pet.weight}</p>
                                <p><span className="font-medium">{t('userCenter.pets.color')}：</span>{pet.color}</p>
                              </div>
                              <div className="mt-4 pt-4 border-t border-neutral-100">
                                <button 
                                  onClick={() => {
                                    navigate(`/feeding-report/${pet.id}`);
                                  }}
                                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-cute hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <span>{t('userCenter.pets.feedingReport')}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <PawPrint className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{t('userCenter.pets.noPets')}</h3>
                      <p className="text-neutral-600 mb-6">{t('userCenter.pets.noPetsDesc')}</p>
                      <button 
                        onClick={() => {
                          setEditingPet(null);
                          setShowPetForm(true);
                        }}
                        className="btn-primary px-6 py-3 rounded-cute flex items-center space-x-2 mx-auto"
                      >
                        <Plus className="w-5 h-5" />
                        <span>{t('userCenter.pets.add')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
               <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                 <div className="px-6 py-4 border-b border-neutral-100">
                   <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold text-neutral-900">{t('userCenter.notificationDetails.title')}</h3>
                     <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                       {t('userCenter.notificationDetails.markAllRead')}
                     </button>
                   </div>
                 </div>
                 <div className="p-6">
                   <div className="space-y-4">
                     {notifications.map((notification) => (
                       <div key={notification.id} className={`p-4 rounded-xl border ${
                         notification.read ? 'bg-neutral-50 border-neutral-200' : 'bg-blue-50 border-blue-200'
                       }`}>
                         <div className="flex items-start justify-between">
                           <div className="flex items-start space-x-3">
                             <div className={`w-2 h-2 rounded-full mt-2 ${
                               notification.read ? 'bg-neutral-400' : 'bg-blue-500'
                             }`}></div>
                             <div className="flex-1">
                               <h4 className="font-medium text-neutral-900">{notification.title}</h4>
                               <p className="text-sm text-neutral-600 mt-1">{notification.message}</p>
                               <p className="text-xs text-neutral-500 mt-2">{notification.time}</p>
                             </div>
                           </div>
                           <button className="text-neutral-400 hover:text-neutral-600">
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             )}

            {activeTab === 'memberBenefits' && (
               <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                 <div className="px-6 py-4 border-b border-neutral-100">
                   <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold text-neutral-900">{t('userCenter.benefits.title')}</h3>
                     <div className="flex items-center space-x-2">
                       <Crown className="w-5 h-5 text-yellow-500" />
                       <span className="text-sm font-medium text-yellow-600">{userData.memberLevel}</span>
                     </div>
                   </div>
                 </div>
                 <div className="p-6">
                   <div className="space-y-6">
                     <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                       <div className="flex items-center space-x-3 mb-4">
                         <Crown className="w-8 h-8 text-yellow-500" />
                         <div>
                           <h4 className="text-lg font-semibold text-neutral-900">{t('userCenter.benefits.currentLevel')}: {userData.memberLevel}</h4>
                           <p className="text-sm text-neutral-600">{t('userCenter.benefits.levelDesc')}</p>
                         </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="text-center">
                           <p className="text-2xl font-bold text-yellow-600">15%</p>
                           <p className="text-sm text-neutral-600">{t('userCenter.benefits.discount')}</p>
                         </div>
                         <div className="text-center">
                           <p className="text-2xl font-bold text-yellow-600">2x</p>
                           <p className="text-sm text-neutral-600">{t('userCenter.benefits.points')}</p>
                         </div>
                       </div>
                     </div>
                     
                     <div className="space-y-4">
                       <h4 className="font-semibold text-neutral-900">{t('userCenter.benefits.exclusive')}</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="p-4 bg-neutral-50 rounded-xl">
                           <div className="flex items-center space-x-3">
                             <Gift className="w-6 h-6 text-primary-600" />
                             <div>
                               <p className="font-medium text-neutral-900">{t('userCenter.benefits.freeShipping')}</p>
                               <p className="text-sm text-neutral-600">{t('userCenter.benefits.freeShippingDesc')}</p>
                             </div>
                           </div>
                         </div>
                         <div className="p-4 bg-neutral-50 rounded-xl">
                           <div className="flex items-center space-x-3">
                             <Star className="w-6 h-6 text-primary-600" />
                             <div>
                               <p className="font-medium text-neutral-900">{t('userCenter.benefits.earlyAccess')}</p>
                               <p className="text-sm text-neutral-600">{t('userCenter.benefits.earlyAccessDesc')}</p>
                             </div>
                           </div>
                         </div>
                         <div className="p-4 bg-neutral-50 rounded-xl">
                           <div className="flex items-center space-x-3">
                             <Heart className="w-6 h-6 text-primary-600" />
                             <div>
                               <p className="font-medium text-neutral-900">{t('userCenter.benefits.birthday')}</p>
                               <p className="text-sm text-neutral-600">{t('userCenter.benefits.birthdayDesc')}</p>
                             </div>
                           </div>
                         </div>
                         <div className="p-4 bg-neutral-50 rounded-xl">
                           <div className="flex items-center space-x-3">
                             <Crown className="w-6 h-6 text-primary-600" />
                             <div>
                               <p className="font-medium text-neutral-900">{t('userCenter.benefits.support')}</p>
                               <p className="text-sm text-neutral-600">{t('userCenter.benefits.supportDesc')}</p>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-100">
                  <h3 className="text-lg font-semibold text-neutral-900">{t('userCenter.settings')}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {/* 基本信息 */}
                    <div>
                      <h4 className="text-md font-semibold text-neutral-900 mb-4">{t('userCenter.basicInfo')}</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-neutral-600" />
                            <div>
                              <p className="font-medium text-neutral-900">{t('userCenter.name')}</p>
                              <p className="text-sm text-neutral-600">{userData.name}</p>
                            </div>
                          </div>
                          <button className="text-primary-600 hover:text-primary-700">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-neutral-600" />
                            <div>
                              <p className="font-medium text-neutral-900">{t('userCenter.email')}</p>
                              <p className="text-sm text-neutral-600">{userData.email}</p>
                            </div>
                          </div>
                          <button className="text-primary-600 hover:text-primary-700">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-neutral-600" />
                            <div>
                              <p className="font-medium text-neutral-900">{t('userCenter.phone')}</p>
                              <p className="text-sm text-neutral-600">{userData.phone}</p>
                            </div>
                          </div>
                          <button className="text-primary-600 hover:text-primary-700">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 安全设置 */}
                    <div>
                      <h4 className="text-md font-semibold text-neutral-900 mb-4">{t('userCenter.securitySettings')}</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                          <div>
                            <p className="font-medium text-neutral-900">{t('userCenter.changePassword')}</p>
                            <p className="text-sm text-neutral-600">{t('userCenter.changePasswordDesc')}</p>
                          </div>
                          <button className="bg-primary-600 text-white px-4 py-2 rounded-cute hover:bg-primary-700 transition-colors duration-300">
                            {t('userCenter.modify')}
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                          <div>
                            <p className="font-medium text-neutral-900">{t('userCenter.twoFactorAuth')}</p>
                            <p className="text-sm text-neutral-600">{t('userCenter.twoFactorAuthDesc')}</p>
                          </div>
                          <button className="border border-neutral-300 text-neutral-700 px-4 py-2 rounded-cute hover:bg-neutral-100 transition-colors duration-300">
                            {t('userCenter.setup')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 宠物档案表单弹窗 */}
       <PetProfileForm
         isOpen={showPetForm}
         initialData={editingPet}
         onClose={() => {
           setShowPetForm(false);
           setEditingPet(null);
         }}
         onSave={(petData) => {
           // 这里可以添加保存逻辑
           console.log('保存宠物信息:', petData);
           setShowPetForm(false);
           setEditingPet(null);
         }}
       />
    </div>
  );
}