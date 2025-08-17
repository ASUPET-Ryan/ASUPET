import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
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
  Trash2,
  ShoppingCart,
  Heart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PetProfileForm from '../components/PetProfileForm';

export default function UserCenter() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPetForm, setShowPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  // TODO: 从API获取用户数据
  const userData = {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    memberLevel: '',
    points: 0,
    joinDate: ''
  };

  // TODO: 从API获取家长信息数据
  const parentInfo = {
    name: '',
    birthday: '',
    phone: '',
    email: '',
    address: ''
  };

  // TODO: 从API获取宠物信息数据
  const petInfo: any[] = [];

  // TODO: 从API获取订单数据
  const recentOrders: any[] = [];

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
  
  // TODO: 从API获取通知数据
  const notifications: any[] = [];

  const menuItems = [
    { id: 'overview', name: t('userCenter.overview'), icon: User },
    { id: 'orders', name: t('userCenter.myOrders'), icon: Package },

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