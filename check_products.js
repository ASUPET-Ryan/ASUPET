import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cguthchefshejanxsxlc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndXRoY2hlZnNoZWphbnhzeGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDM5NDAsImV4cCI6MjA2OTg3OTk0MH0.2ui9PLctw0Il8ZjYIQkIOco5ZeuImw262fMnqAyeIGA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  try {
    console.log('Checking products table...');
    
    // 查询所有商品
    const { data: allProducts, error: allError } = await supabase
      .from('products')
      .select('id, name, sku, price, stock_quantity, is_active')
      .limit(10);
    
    if (allError) {
      console.error('Error fetching all products:', allError);
      return;
    }
    
    console.log('\n=== All Products ===');
    console.log(`Total products found: ${allProducts?.length || 0}`);
    if (allProducts && allProducts.length > 0) {
      allProducts.forEach(product => {
        console.log(`ID: ${product.id}`);
        console.log(`Name: ${JSON.stringify(product.name)}`);
        console.log(`SKU: ${product.sku}`);
        console.log(`Price: ${product.price}`);
        console.log(`Stock: ${product.stock_quantity}`);
        console.log(`Active: ${product.is_active}`);
        console.log('---');
      });
    }
    
    // 查询活跃商品
    const { data: activeProducts, error: activeError } = await supabase
      .from('products')
      .select('id, name, sku, price, stock_quantity, is_active')
      .eq('is_active', true)
      .limit(10);
    
    if (activeError) {
      console.error('Error fetching active products:', activeError);
      return;
    }
    
    console.log('\n=== Active Products (is_active = true) ===');
    console.log(`Active products found: ${activeProducts?.length || 0}`);
    if (activeProducts && activeProducts.length > 0) {
      activeProducts.forEach(product => {
        console.log(`ID: ${product.id}`);
        console.log(`Name: ${JSON.stringify(product.name)}`);
        console.log(`SKU: ${product.sku}`);
        console.log(`Price: ${product.price}`);
        console.log(`Stock: ${product.stock_quantity}`);
        console.log('---');
      });
    } else {
      console.log('No active products found!');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkProducts();