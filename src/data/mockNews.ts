// 模拟新闻数据
export const mockNews = [
  {
    id: '1',
    title: {
      zh: 'ASUPET推出全新AI宠物营养分析系统',
      en: 'ASUPET Launches New AI Pet Nutrition Analysis System'
    },
    excerpt: {
      zh: '我们很高兴地宣布推出全新的AI宠物营养分析系统，该系统能够根据宠物的品种、年龄、体重等因素，为每只宠物提供个性化的营养建议。',
      en: 'We are excited to announce the launch of our new AI Pet Nutrition Analysis System, which provides personalized nutrition recommendations for each pet based on breed, age, weight, and other factors.'
    },
    content: {
      zh: '详细内容...',
      en: 'Detailed content...'
    },
    category: { zh: '产品发布', en: 'Product Launch' },
    publish_date: '2024-01-15',
    featured_image_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    tags: ['AI', '营养', '创新'],
    author: 'ASUPET团队',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: {
      zh: '宠物营养科学研究新突破',
      en: 'New Breakthrough in Pet Nutrition Science Research'
    },
    excerpt: {
      zh: 'ASUPET研发团队在宠物营养科学领域取得重大突破，发现了影响宠物健康的关键营养因子，为宠物食品配方优化提供了科学依据。',
      en: 'ASUPET research team has made a major breakthrough in pet nutrition science, discovering key nutritional factors that affect pet health, providing scientific basis for pet food formula optimization.'
    },
    content: {
      zh: '详细内容...',
      en: 'Detailed content...'
    },
    category: { zh: '科研成果', en: 'Research Results' },
    publish_date: '2024-01-10',
    featured_image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop',
    tags: ['科研', '营养', '健康'],
    author: 'ASUPET研发团队',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    title: {
      zh: 'ASUPET荣获2024年度宠物行业创新奖',
      en: 'ASUPET Wins 2024 Pet Industry Innovation Award'
    },
    excerpt: {
      zh: '在刚刚结束的2024年度宠物行业大会上，ASUPET凭借其创新的AI驱动宠物营养解决方案，荣获了年度创新奖，这是对我们技术实力的认可。',
      en: 'At the recently concluded 2024 Pet Industry Conference, ASUPET won the Annual Innovation Award for its innovative AI-driven pet nutrition solutions, recognizing our technical expertise.'
    },
    content: {
      zh: '详细内容...',
      en: 'Detailed content...'
    },
    category: { zh: '公司新闻', en: 'Company News' },
    publish_date: '2024-01-05',
    featured_image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop',
    tags: ['获奖', '创新', '行业认可'],
    author: 'ASUPET',
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  },
  {
    id: '4',
    title: {
      zh: '宠物健康管理新趋势：个性化营养方案',
      en: 'New Trends in Pet Health Management: Personalized Nutrition Plans'
    },
    excerpt: {
      zh: '随着宠物主人对宠物健康关注度的提高，个性化营养方案正成为宠物健康管理的新趋势。ASUPET分享最新的行业洞察和发展方向。',
      en: 'As pet owners pay more attention to pet health, personalized nutrition plans are becoming a new trend in pet health management. ASUPET shares the latest industry insights and development directions.'
    },
    content: {
      zh: '详细内容...',
      en: 'Detailed content...'
    },
    category: { zh: '行业洞察', en: 'Industry Insights' },
    publish_date: '2024-01-01',
    featured_image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
    tags: ['趋势', '健康管理', '个性化'],
    author: 'ASUPET专家团队',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '5',
    title: {
      zh: 'ASUPET与知名宠物医院达成战略合作',
      en: 'ASUPET Partners with Leading Pet Hospitals'
    },
    excerpt: {
      zh: 'ASUPET宣布与多家知名宠物医院达成战略合作协议，将为更多宠物提供专业的营养咨询和健康管理服务。',
      en: 'ASUPET announces strategic partnerships with several leading pet hospitals to provide professional nutrition consulting and health management services to more pets.'
    },
    content: {
      zh: '详细内容...',
      en: 'Detailed content...'
    },
    category: { zh: '合作伙伴', en: 'Partnerships' },
    publish_date: '2023-12-28',
    featured_image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=600&fit=crop',
    tags: ['合作', '医院', '服务扩展'],
    author: 'ASUPET',
    created_at: '2023-12-28T10:00:00Z',
    updated_at: '2023-12-28T10:00:00Z'
  },
  {
    id: '6',
    title: {
      zh: '春节宠物护理指南：让爱宠健康过年',
      en: 'Chinese New Year Pet Care Guide: Keep Your Pets Healthy During the Holidays'
    },
    excerpt: {
      zh: '春节期间，宠物的饮食和生活习惯可能会发生变化。ASUPET为您提供专业的春节宠物护理指南，确保您的爱宠健康快乐地度过节日。',
      en: 'During Chinese New Year, pets\' diet and lifestyle may change. ASUPET provides professional holiday pet care guidelines to ensure your beloved pets stay healthy and happy during the festivities.'
    },
    content: {
      zh: '详细内容...',
      en: 'Detailed content...'
    },
    category: { zh: '护理指南', en: 'Care Guide' },
    publish_date: '2023-12-25',
    featured_image_url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&h=600&fit=crop',
    tags: ['护理', '节日', '健康'],
    author: 'ASUPET护理专家',
    created_at: '2023-12-25T10:00:00Z',
    updated_at: '2023-12-25T10:00:00Z'
  }
];
