import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testPermissions() {
  console.log('🔐 测试数据库权限...');
  
  try {
    // 测试读取权限
    console.log('\n1. 测试读取权限...');
    
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (productsError) {
      console.log('❌ 读取products表失败:', productsError.message);
    } else {
      console.log('✅ 读取products表成功');
    }
    
    const { data: carts, error: cartsError } = await supabase
      .from('shopping_carts')
      .select('*')
      .limit(1);
    
    if (cartsError) {
      console.log('❌ 读取shopping_carts表失败:', cartsError.message);
    } else {
      console.log('✅ 读取shopping_carts表成功');
    }
    
    const { data: items, error: itemsError } = await supabase
      .from('cart_items')
      .select('*')
      .limit(1);
    
    if (itemsError) {
      console.log('❌ 读取cart_items表失败:', itemsError.message);
    } else {
      console.log('✅ 读取cart_items表成功');
    }
    
    // 测试写入权限
    console.log('\n2. 测试写入权限...');
    
    const testSessionId = 'permission-test-' + Date.now();
    
    const { data: cart, error: cartError } = await supabase
      .from('shopping_carts')
      .insert({
        session_id: testSessionId,
        user_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (cartError) {
      console.log('❌ 创建购物车失败:', cartError.message);
      console.log('错误详情:', cartError);
    } else {
      console.log('✅ 创建购物车成功，ID:', cart.id);
      
      // 清理测试数据
      await supabase
        .from('shopping_carts')
        .delete()
        .eq('id', cart.id);
      
      console.log('✅ 测试数据已清理');
    }
    
  } catch (error) {
    console.error('❌ 权限测试失败:', error.message);
    console.error('错误详情:', error);
  }
}

testPermissions();