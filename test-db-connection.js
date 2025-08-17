// 测试数据库连接
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cguthchefshejanxsxlc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndXRoY2hlZnNoZWphbnhzeGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDM5NDAsImV4cCI6MjA2OTg3OTk0MH0.2ui9PLctw0Il8ZjYIQkIOco5ZeuImw262fMnqAyeIGA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // 测试基本连接
    const { data, error } = await supabase.from('news').select('count').limit(1);
    
    if (error) {
      console.log('Connection error:', error.message);
      console.log('Error details:', error);
    } else {
      console.log('Connection successful!');
      console.log('Data:', data);
    }
    
    // 尝试获取新闻数据
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .limit(3);
      
    if (newsError) {
      console.log('News fetch error:', newsError.message);
    } else {
      console.log('News data count:', newsData?.length || 0);
      if (newsData && newsData.length > 0) {
        console.log('Sample news:', newsData[0]);
      }
    }
    
  } catch (e) {
    console.log('Exception:', e.message);
  }
}

testConnection();
