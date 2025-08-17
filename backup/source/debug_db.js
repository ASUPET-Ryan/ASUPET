import { createClient } from '@supabase/supabase-js';

// 从环境变量或直接获取Supabase配置
const supabaseUrl = 'https://cguthchefshejanxsxlc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndXRoY2hlZnNoZWphbnhzeGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDM5NDAsImV4cCI6MjA2OTg3OTk0MH0.2ui9PLctw0Il8ZjYIQkIOco5ZeuImw262fMnqAyeIGA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugDatabase() {
  console.log('=== 检查新闻表数据结构 ===');
  
  // 查询新闻数据
  const { data: newsData, error: newsError } = await supabase
    .from('news')
    .select('*')
    .limit(3);
    
  if (newsError) {
    console.error('查询新闻数据错误:', newsError);
  } else {
    console.log('新闻数据:', JSON.stringify(newsData, null, 2));
  }
  
  // 查询分类数据
  const { data: categoriesData, error: categoriesError } = await supabase
    .from('news_categories')
    .select('*')
    .limit(5);
    
  if (categoriesError) {
    console.error('查询分类数据错误:', categoriesError);
  } else {
    console.log('分类数据:', JSON.stringify(categoriesData, null, 2));
  }
}

debugDatabase().catch(console.error);