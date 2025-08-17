import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = 'https://cguthchefshejanxsxlc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndXRoY2hlZnNoZWphbnhzeGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDM5NDAsImV4cCI6MjA2OTg3OTk0MH0.2ui9PLctw0Il8ZjYIQkIOco5ZeuImw262fMnqAyeIGA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCartFunctionality() {
  try {
    console.log('Testing cart functionality...');
    
    // 1. 测试获取商品
    const productId = '550e8400-e29b-41d4-a716-446655440011'; // 第一个商品的ID
    console.log('\n=== Step 1: Testing product fetch ===');
    
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('is_active', true)
      .single();
    
    if (productError) {
      console.error('Product fetch error:', productError);
      return;
    }
    
    console.log('Product found:', {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock_quantity,
      active: product.is_active
    });
    
    // 2. 测试创建购物车
    console.log('\n=== Step 2: Testing cart creation ===');
    const sessionId = uuidv4();
    
    const { data: cart, error: cartError } = await supabase
      .from('shopping_carts')
      .insert({
        session_id: sessionId,
        user_id: null
      })
      .select()
      .single();
    
    if (cartError) {
      console.error('Cart creation error:', cartError);
      return;
    }
    
    console.log('Cart created:', {
      id: cart.id,
      session_id: cart.session_id
    });
    
    // 3. 测试添加商品到购物车
    console.log('\n=== Step 3: Testing add to cart ===');
    
    const { data: cartItem, error: cartItemError } = await supabase
      .from('cart_items')
      .insert({
        cart_id: cart.id,
        product_id: productId,
        quantity: 1,
        price: product.price
      })
      .select()
      .single();
    
    if (cartItemError) {
      console.error('Cart item creation error:', cartItemError);
      return;
    }
    
    console.log('Cart item created:', {
      id: cartItem.id,
      cart_id: cartItem.cart_id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      price: cartItem.price
    });
    
    // 4. 测试获取购物车商品
    console.log('\n=== Step 4: Testing cart items fetch ===');
    
    const { data: items, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(
          id,
          name,
          price,
          stock_quantity,
          is_active
        )
      `)
      .eq('cart_id', cart.id);
    
    if (itemsError) {
      console.error('Cart items fetch error:', itemsError);
      return;
    }
    
    console.log('Cart items:', items);
    
    // 5. 清理测试数据
    console.log('\n=== Step 5: Cleaning up test data ===');
    
    await supabase.from('cart_items').delete().eq('cart_id', cart.id);
    await supabase.from('shopping_carts').delete().eq('id', cart.id);
    
    console.log('Test completed successfully!');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testCartFunctionality();