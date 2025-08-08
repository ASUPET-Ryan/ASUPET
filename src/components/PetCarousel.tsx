import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: number;
  type: 'cat' | 'dog' | 'product';
  imageUrl: string;
  alt: string;
  title: string;
}

const PetCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      type: 'cat',
      imageUrl: `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent('beautiful realistic cat portrait, fluffy orange tabby cat with bright green eyes, professional pet photography, soft natural lighting, high quality')}&image_size=landscape_16_9`,
      alt: '可爱的橘猫，展现专业的宠物护理品质',
      title: '专业宠物护理'
    },
    {
      id: 2,
      type: 'dog',
      imageUrl: `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent('adorable realistic golden retriever puppy, happy expression, professional pet photography, warm lighting, high quality portrait')}&image_size=landscape_16_9`,
      alt: '可爱的金毛犬，体现专业宠物服务的温馨',
      title: '温馨宠物服务'
    },
    {
      id: 3,
      type: 'product',
      imageUrl: `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent('premium pet food and accessories display, modern pet products, high-end pet care items, professional product photography, clean background')}&image_size=landscape_16_9`,
      alt: '高端宠物用品展示',
      title: '优质宠物用品'
    },
    {
      id: 4,
      type: 'product',
      imageUrl: `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent('modern pet toys and treats collection, colorful pet accessories, premium pet care products, studio lighting, professional arrangement')}&image_size=landscape_16_9`,
      alt: '精选宠物玩具和零食',
      title: '精选宠物产品'
    }
  ];

  // 自动轮播逻辑
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
      }, 3500); // 3.5秒间隔

      return () => clearInterval(interval);
    }
  }, [isHovered, carouselItems.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div 
      className="relative w-full max-w-lg mx-auto lg:max-w-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 轮播容器 */}
      <div className="relative overflow-hidden w-full h-70 lg:h-80 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-100/50 to-purple-200/30 p-1 lg:p-1.5 shadow-2xl shadow-purple-500/20 animate-float">
        {/* 图片轮播 */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 relative">
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="w-full h-full object-cover rounded-xl lg:rounded-2xl"
                loading="lazy"
              />
              {/* 图片标题覆盖层 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* 左右箭头控制 */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center mt-4 space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 scale-110 shadow-lg shadow-purple-400/40' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>


    </div>
  );
};

export default PetCarousel;