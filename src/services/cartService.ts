import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

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

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product?: Product;
  // 为了向后兼容，添加直接属性
  name?: { zh: string; en: string };
  image?: string;
  stock?: number;
}

export interface ShoppingCart {
  id: string;
  user_id?: string;
  session_id?: string;
  created_at: string;
  updated_at: string;
  items?: CartItem[];
}

class CartService {
  private sessionId: string;

  constructor() {
    // 获取或创建会话ID
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem('asupet_session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('asupet_session_id', sessionId);
    }
    return sessionId;
  }

  // 获取当前用户ID（如果已登录）
  private async getCurrentUserId(): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  }

  // 获取或创建购物车
  async getOrCreateCart(): Promise<ShoppingCart> {
    const userId = await this.getCurrentUserId();
    
    // 首先尝试查找现有购物车
    let query = supabase
      .from('shopping_carts')
      .select('*');
    
    if (userId) {
      // 如果用户已登录，查找用户购物车
      query = query.eq('user_id', userId);
    } else {
      // 如果用户未登录，查找会话购物车
      query = query.eq('session_id', this.sessionId).is('user_id', null);
    }
    
    let { data: cart, error } = await query.single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching cart:', error);
      throw error;
    }

    // 如果没有找到购物车，创建新的
    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('shopping_carts')
        .insert({
          user_id: userId,
          session_id: userId ? null : this.sessionId, // 如果用户已登录，不需要session_id
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating cart:', createError);
        throw createError;
      }

      cart = newCart;
    }

    return cart;
  }

  // 获取购物车商品
  async getCartItems(): Promise<CartItem[]> {
    const cart = await this.getOrCreateCart();
    
    const { data: items, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(
          id,
          name,
          description,
          short_description,
          sku,
          price,
          compare_price,
          weight,
          category_id,
          tags,
          images,
          specifications,
          ingredients,
          feeding_guide,
          nutritional_analysis,
          stock_quantity,
          is_active,
          is_featured,
          created_at
        )
      `)
      .eq('cart_id', cart.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }

    return items || [];
  }

  // 添加商品到购物车
  async addToCart(productId: string, quantity: number = 1): Promise<CartItem> {
    const cart = await this.getOrCreateCart();
    
    // 获取商品信息
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('is_active', true)
      .single();

    if (productError || !product) {
      throw new Error('商品不存在或已下架');
    }

    // 检查库存
    if (product.stock_quantity < quantity) {
      throw new Error('库存不足');
    }

    // 检查是否已存在该商品
    const { data: existingItem, error: existingError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Error checking existing item:', existingError);
      throw existingError;
    }

    if (existingItem) {
      // 更新数量
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock_quantity) {
        throw new Error('库存不足');
      }

      const { data: updatedItem, error: updateError } = await supabase
        .from('cart_items')
        .update({ 
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating cart item:', updateError);
        throw updateError;
      }

      return updatedItem;
    } else {
      // 添加新商品
      const { data: newItem, error: insertError } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id: productId,
          quantity,
          price: product.price, // 记录添加时的价格
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error adding cart item:', insertError);
        throw insertError;
      }

      return newItem;
    }
  }

  // 更新商品数量
  async updateQuantity(itemId: string, quantity: number): Promise<CartItem> {
    if (quantity <= 0) {
      throw new Error('数量必须大于0');
    }

    // 获取商品信息检查库存
    const { data: item, error: itemError } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(stock_quantity)
      `)
      .eq('id', itemId)
      .single();

    if (itemError || !item) {
      throw new Error('购物车商品不存在');
    }

    if (quantity > (item.product as any).stock_quantity) {
      throw new Error('库存不足');
    }

    const { data: updatedItem, error: updateError } = await supabase
      .from('cart_items')
      .update({ 
        quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', itemId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating quantity:', updateError);
      throw updateError;
    }

    return updatedItem;
  }

  // 删除购物车商品
  async removeFromCart(itemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  }

  // 清空购物车
  async clearCart(): Promise<void> {
    const cart = await this.getOrCreateCart();
    
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  // 获取购物车统计信息
  async getCartSummary(): Promise<{ itemCount: number; total: number }> {
    const items = await this.getCartItems();
    
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return { itemCount, total };
  }

  // 合并匿名购物车到用户购物车（用户登录时调用）
  async mergeAnonymousCart(userId: string): Promise<void> {
    // 获取匿名购物车
    const { data: anonymousCart, error: anonymousError } = await supabase
      .from('shopping_carts')
      .select('*')
      .eq('session_id', this.sessionId)
      .is('user_id', null)
      .single();

    if (anonymousError || !anonymousCart) {
      return; // 没有匿名购物车，直接返回
    }

    // 获取或创建用户购物车
    let { data: userCart, error: userCartError } = await supabase
      .from('shopping_carts')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (userCartError && userCartError.code !== 'PGRST116') {
      throw userCartError;
    }

    if (!userCart) {
      // 将匿名购物车转换为用户购物车
      const { data: updatedCart, error: updateError } = await supabase
        .from('shopping_carts')
        .update({ 
          user_id: userId,
          session_id: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', anonymousCart.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      userCart = updatedCart;
    } else {
      // 合并购物车商品
      const { data: anonymousItems, error: itemsError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', anonymousCart.id);

      if (itemsError) {
        throw itemsError;
      }

      // 将匿名购物车的商品移动到用户购物车
      for (const item of anonymousItems || []) {
        await this.addToCart(item.product_id, item.quantity);
      }

      // 删除匿名购物车
      await supabase
        .from('shopping_carts')
        .delete()
        .eq('id', anonymousCart.id);
    }
  }
}

export const cartService = new CartService();
export default cartService;