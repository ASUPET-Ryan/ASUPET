import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import cartService, { CartItem as ServiceCartItem, Product } from '../services/cartService';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

// 购物车商品接口（前端使用）
export interface CartItem {
  id: string;
  productId: string;
  name: { zh: string; en: string };
  price: number;
  quantity: number;
  image: string;
  stock: number;
  sku: string;
}

// 购物车状态接口
export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  loading: boolean;
  error: string | null;
}

// 购物车操作类型
export type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_CART_SUCCESS'; payload: CartItem[] }
  | { type: 'ADD_TO_CART_SUCCESS'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY_SUCCESS'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART_SUCCESS'; payload: string }
  | { type: 'CLEAR_CART_SUCCESS' };

const CartContext = createContext<{
  items: CartItem[];
  total: number;
  itemCount: number;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
} | null>(null);

// 购物车reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
    case 'LOAD_CART_SUCCESS': {
      const { itemCount, total } = calculateTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        itemCount,
        total,
        loading: false,
        error: null,
      };
    }
    
    case 'ADD_TO_CART_SUCCESS': {
      const existingItemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // 更新现有商品数量
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      } else {
        // 添加新商品
        newItems = [...state.items, action.payload];
      }
      
      const { itemCount, total } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        itemCount,
        total,
        loading: false,
        error: null,
      };
    }
    
    case 'UPDATE_QUANTITY_SUCCESS': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const { itemCount, total } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        itemCount,
        total,
        loading: false,
        error: null,
      };
    }
    
    case 'REMOVE_FROM_CART_SUCCESS': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { itemCount, total } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        itemCount,
        total,
        loading: false,
        error: null,
      };
    }
    
    case 'CLEAR_CART_SUCCESS': {
      return {
        ...state,
        items: [],
        itemCount: 0,
        total: 0,
        loading: false,
        error: null,
      };
    }
    
    default:
      return state;
  }
};

// 计算购物车总计
const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { itemCount, total };
};

// 转换服务层数据到前端格式
const convertServiceItemToCartItem = (serviceItem: ServiceCartItem): CartItem | null => {
  const product = serviceItem.product as Product;
  
  // 检查产品数据是否存在
  if (!product) {
    console.warn('Product data missing for cart item:', serviceItem.id);
    return null;
  }
  
  return {
    id: serviceItem.id,
    productId: serviceItem.product_id,
    name: product.name || { zh: '未知商品', en: 'Unknown Product' },
    price: serviceItem.price,
    quantity: serviceItem.quantity,
    image: product.images?.[0]?.url || '',
    stock: product.stock_quantity || 0,
    sku: product.sku || '',
  };
};

// 初始状态
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { t } = useTranslation();

  // 加载购物车数据
  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const serviceItems = await cartService.getCartItems();
      const cartItems = serviceItems
        .map(convertServiceItemToCartItem)
        .filter((item): item is CartItem => item !== null);
      dispatch({ type: 'LOAD_CART_SUCCESS', payload: cartItems });
    } catch (error) {
      console.error('Failed to load cart:', error);
      dispatch({ type: 'SET_ERROR', payload: t('cart.loadError', '加载购物车失败') });
    }
  };

  // 初始化时加载购物车
  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const serviceItem = await cartService.addToCart(productId, quantity);
      
      // 重新获取完整的商品信息
      const items = await cartService.getCartItems();
      const updatedItem = items.find(item => item.id === serviceItem.id);
      
      if (updatedItem) {
        const cartItem = convertServiceItemToCartItem(updatedItem);
        if (cartItem) {
          dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: cartItem });
          toast.success(t('cart.addSuccess', '商品已添加到购物车'));
        } else {
          throw new Error('商品数据不完整');
        }
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      const errorMessage = error instanceof Error ? error.message : t('cart.addError', '添加到购物车失败');
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartService.removeFromCart(itemId);
      dispatch({ type: 'REMOVE_FROM_CART_SUCCESS', payload: itemId });
      toast.success(t('cart.removeSuccess', '商品已从购物车移除'));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      const errorMessage = error instanceof Error ? error.message : t('cart.removeError', '移除商品失败');
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartService.updateQuantity(itemId, quantity);
      dispatch({ type: 'UPDATE_QUANTITY_SUCCESS', payload: { id: itemId, quantity } });
    } catch (error) {
      console.error('Failed to update quantity:', error);
      const errorMessage = error instanceof Error ? error.message : t('cart.updateError', '更新数量失败');
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartService.clearCart();
      dispatch({ type: 'CLEAR_CART_SUCCESS' });
      toast.success(t('cart.clearSuccess', '购物车已清空'));
    } catch (error) {
      console.error('Failed to clear cart:', error);
      const errorMessage = error instanceof Error ? error.message : t('cart.clearError', '清空购物车失败');
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      total: state.total,
      itemCount: state.itemCount,
      loading: state.loading,
      error: state.error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart: loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}