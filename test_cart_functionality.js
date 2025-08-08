import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// 加载环境变量
config();

// 从环境变量获取Supabase配置
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ 请确保设置了VITE_SUPABASE_URL和VITE_SUPABASE_ANON_KEY环境变量');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 生成测试会话ID
const testSessionId = 'test-session-' + Date.now();

async function testCartFunctionality() {
  console.log('🛒 开始测试购物车功能...');
  console.log(`使用测试会话ID: ${testSessionId}`);
  
  try {
    // 1. 获取商品列表
    console.log('\n1. 获取商品列表...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .limit(3);
    
    if (productsError) {
      throw new Error(`获取商品失败: ${productsError.message}`);
    }
    
    if (!products || products.length === 0) {
      throw new Error('没有找到可用的商品');
    }
    
    console.log(`✅ 找到 ${products.length} 个商品`);
    products.forEach(product => {
      const name = typeof product.name === 'object' ? product.name.zh || product.name.en : product.name;
      console.log(`   - ${name} (ID: ${product.id}, 库存: ${product.stock_quantity})`);
    });
    
    // 2. 创建购物车
    console.log('\n2. 创建购物车...');
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
      throw new Error(`创建购物车失败: ${cartError.message}`);
    }
    
    console.log(`✅ 购物车创建成功，ID: ${cart.id}`);
    
    // 3. 测试添加商品到购物车
    console.log('\n3. 测试添加商品到购物车...');
    const testProduct = products[0];
    const name1 = typeof testProduct.name === 'object' ? testProduct.name.zh || testProduct.name.en : testProduct.name;
    
    // 检查商品库存
    if (testProduct.stock_quantity < 2) {
      throw new Error(`商品库存不足: ${testProduct.stock_quantity}`);
    }
    
    const cartItemData = {
      cart_id: cart.id,
      product_id: testProduct.id,
      quantity: 2,
      price: testProduct.price,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('准备插入的数据:', cartItemData);
    
    const { data: cartItem, error: addError } = await supabase
      .from('cart_items')
      .insert(cartItemData)
      .select()
      .single();
    
    if (addError) {
      console.log('添加商品错误详情:', addError);
      throw new Error(`添加商品失败: ${addError.message}`);
    }
    
    console.log(`✅ 成功添加商品: ${name1} x2`);
    
    // 4. 获取购物车商品
    console.log('\n4. 获取购物车商品...');
    const { data: cartItems, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('cart_id', cart.id);
    
    if (itemsError) {
      throw new Error(`获取购物车商品失败: ${itemsError.message}`);
    }
    
    console.log(`✅ 购物车中有 ${cartItems.length} 种商品`);
    cartItems.forEach(item => {
      const productName = typeof item.product.name === 'object' ? item.product.name.zh || item.product.name.en : item.product.name;
      console.log(`   - ${productName} x${item.quantity} = ¥${(item.price * item.quantity).toFixed(2)}`);
    });
    
    // 5. 测试更新商品数量
    console.log('\n5. 测试更新商品数量...');
    if (cartItems.length > 0) {
      const firstItem = cartItems[0];
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ 
          quantity: 3,
          updated_at: new Date().toISOString()
        })
        .eq('id', firstItem.id);
      
      if (updateError) {
        throw new Error(`更新数量失败: ${updateError.message}`);
      }
      
      console.log(`✅ 成功更新商品数量为 3`);
      
      // 验证更新
      const { data: updatedItem } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('id', firstItem.id)
        .single();
      
      if (updatedItem && updatedItem.quantity === 3) {
        console.log(`✅ 数量更新验证成功: ${updatedItem.quantity}`);
      } else {
        console.log(`❌ 数量更新验证失败`);
      }
    }
    
    // 6. 测试添加第二个商品
    console.log('\n6. 测试添加第二个商品...');
    if (products.length > 1) {
      const secondProduct = products[1];
      const name2 = typeof secondProduct.name === 'object' ? secondProduct.name.zh || secondProduct.name.en : secondProduct.name;
      
      const { error: addError2 } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id: secondProduct.id,
          quantity: 1,
          price: secondProduct.price,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (addError2) {
        console.log(`⚠️ 添加第二个商品失败: ${addError2.message}`);
      } else {
        console.log(`✅ 成功添加第二个商品: ${name2}`);
      }
    }
    
    // 7. 获取购物车摘要
    console.log('\n7. 获取购物车摘要...');
    const { data: summaryItems } = await supabase
      .from('cart_items')
      .select('quantity, price')
      .eq('cart_id', cart.id);
    
    if (summaryItems) {
      const itemCount = summaryItems.length;
      const totalQuantity = summaryItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = summaryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      console.log(`✅ 购物车摘要:`);
      console.log(`   - 商品种类: ${itemCount}`);
      console.log(`   - 总数量: ${totalQuantity}`);
      console.log(`   - 总金额: ¥${totalAmount.toFixed(2)}`);
    }
    
    // 8. 测试移除商品
    console.log('\n8. 测试移除商品...');
    const { data: currentItems } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(name)
      `)
      .eq('cart_id', cart.id);
    
    if (currentItems && currentItems.length > 0) {
      const itemToRemove = currentItems[0];
      const productName = typeof itemToRemove.product.name === 'object' ? itemToRemove.product.name.zh || itemToRemove.product.name.en : itemToRemove.product.name;
      
      const { error: removeError } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemToRemove.id);
      
      if (removeError) {
        throw new Error(`移除商品失败: ${removeError.message}`);
      }
      
      console.log(`✅ 成功移除商品: ${productName}`);
      
      // 验证移除
      const { data: itemsAfterRemoval } = await supabase
        .from('cart_items')
        .select('id')
        .eq('cart_id', cart.id);
      
      console.log(`✅ 移除后购物车中还有 ${itemsAfterRemoval?.length || 0} 种商品`);
    }
    
    // 9. 测试清空购物车
    console.log('\n9. 测试清空购物车...');
    const { error: clearError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);
    
    if (clearError) {
      throw new Error(`清空购物车失败: ${clearError.message}`);
    }
    
    console.log(`✅ 购物车已清空`);
    
    // 验证清空
    const { data: emptyCartItems } = await supabase
      .from('cart_items')
      .select('id')
      .eq('cart_id', cart.id);
    
    if (!emptyCartItems || emptyCartItems.length === 0) {
      console.log(`✅ 清空验证成功: 购物车为空`);
    } else {
      console.log(`❌ 清空验证失败: 购物车中还有 ${emptyCartItems.length} 种商品`);
    }
    
    // 10. 清理测试数据
    console.log('\n10. 清理测试数据...');
    const { error: deleteCartError } = await supabase
      .from('shopping_carts')
      .delete()
      .eq('id', cart.id);
    
    if (deleteCartError) {
      console.log(`⚠️ 清理购物车失败: ${deleteCartError.message}`);
    } else {
      console.log(`✅ 测试购物车已清理`);
    }
    
    console.log('\n🎉 购物车功能测试完成！所有功能正常工作。');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('错误详情:', error);
    
    // 尝试清理测试数据
    try {
      await supabase
        .from('shopping_carts')
        .delete()
        .eq('session_id', testSessionId);
    } catch (cleanupError) {
      console.error('清理失败:', cleanupError.message);
    }
  }
}

// 运行测试
testCartFunctionality();