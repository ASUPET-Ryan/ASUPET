import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Lock,
  User,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  fee?: number;
}

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

export default function PaymentPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('alipay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'alipay',
      name: '支付宝',
      icon: <Wallet className="w-6 h-6 text-blue-600" />,
      description: '使用支付宝安全快捷支付'
    },
    {
      id: 'wechat',
      name: '微信支付',
      icon: <Smartphone className="w-6 h-6 text-green-600" />,
      description: '使用微信支付便捷付款'
    },
    {
      id: 'unionpay',
      name: '银联支付',
      icon: <CreditCard className="w-6 h-6 text-red-600" />,
      description: '支持各大银行卡支付'
    },
    {
      id: 'credit',
      name: '信用卡',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      description: '支持Visa、MasterCard等',
      fee: 0.6
    }
  ];

  const shippingAddresses: ShippingAddress[] = [
    {
      name: '张三',
      phone: '138****8888',
      address: '上海市浦东新区陆家嘴金融中心1号楼',
      isDefault: true
    },
    {
      name: '李四',
      phone: '139****9999',
      address: '北京市朝阳区三里屯太古里',
      isDefault: false
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // 模拟支付处理
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPaymentSuccess(true);
    setIsProcessing(false);
    
    // 清空购物车
    setTimeout(() => {
      clearCart();
      navigate('/user-center?tab=orders');
    }, 2000);
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.phone && newAddress.address) {
      // 这里应该调用API保存地址
      setShowAddressForm(false);
      setNewAddress({ name: '', phone: '', address: '' });
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">支付成功！</h2>
          <p className="text-gray-600 mb-6">您的订单已提交，我们将尽快为您处理</p>
          <div className="space-y-3">
            <Link
              to="/user-center?tab=orders"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              查看订单
            </Link>
            <Link
              to="/shop"
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              继续购物
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <AlertCircle className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">购物车为空</h2>
            <p className="text-gray-600 mb-8">请先添加商品到购物车</p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              去购物
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 头部 */}
        <div className="flex items-center mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回购物车
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">确认订单</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 收货地址 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">收货地址</h2>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  添加新地址
                </button>
              </div>
              
              {showAddressForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">添加新地址</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="收货人姓名"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="手机号码"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="详细地址"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={handleAddAddress}
                        className="px-4 py-2 btn-primary rounded-lg"
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 btn-secondary rounded-lg"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {shippingAddresses.map((address, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === index
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAddress(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                        selectedAddress === index
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{address.name}</span>
                          <span className="text-gray-600">{address.phone}</span>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded">默认</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{address.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 商品清单 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">商品清单</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name.zh}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name.zh}</h3>
                      <p className="text-sm text-gray-600">库存: {item.stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">¥{item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 支付方式 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">支付方式</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPaymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedPaymentMethod === method.id
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`} />
                      {method.icon}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{method.name}</span>
                          {method.fee && (
                            <span className="text-xs text-gray-500">手续费 {method.fee}%</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">您的支付信息将通过SSL加密传输，确保安全</span>
              </div>
            </div>
          </div>

          {/* 右侧订单摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">订单摘要</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">商品总计</span>
                  <span className="text-gray-900">¥{total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">运费</span>
                  <span className="text-gray-900">免费</span>
                </div>
                
                {selectedPaymentMethod === 'credit' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">手续费</span>
                    <span className="text-gray-900">¥{(total * 0.006).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">应付总额</span>
                    <span className="text-gray-900">
                      ¥{(total + (selectedPaymentMethod === 'credit' ? total * 0.006 : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full btn-primary py-3 px-4 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    处理中...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    立即支付
                  </>
                )}
              </button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                点击"立即支付"即表示您同意我们的
                <Link to="/terms" className="text-primary-600 hover:text-primary-700">服务条款</Link>
                和
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">隐私政策</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}