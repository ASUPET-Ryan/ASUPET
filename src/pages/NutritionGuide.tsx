import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Cat, Dog, Heart, Shield, Star, ArrowRight, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NutritionGuide = () => {
  const { t } = useTranslation();
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState('cats');

  // 根据URL参数设置默认tab和滚动到对应内容
  useEffect(() => {
    if (category) {
      // 根据category参数确定应该显示哪个tab
      if (category === 'kitten' || category === 'adult-cat' || category === 'senior-cat') {
        setActiveTab('cats');
      } else if (category === 'puppy' || category === 'adult-dog' || category === 'senior-dog') {
        setActiveTab('dogs');
      }

      // 滚动到对应的内容区域
      setTimeout(() => {
        const element = document.getElementById('nutrition-guides');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [category]);

  const nutritionTips = {
    cats: {
      kitten: {
        title: t('nutritionGuide.cats.kitten.title'),
        description: t('nutritionGuide.cats.kitten.description'),
        tips: t('nutritionGuide.cats.kitten.tips', { returnObjects: true }) as string[],
        feeding: {
          [t('nutritionGuide.cats.kitten.feeding.2-4months').split(':')[0]]: t('nutritionGuide.cats.kitten.feeding.2-4months').split(':')[1],
          [t('nutritionGuide.cats.kitten.feeding.4-6months').split(':')[0]]: t('nutritionGuide.cats.kitten.feeding.4-6months').split(':')[1],
          [t('nutritionGuide.cats.kitten.feeding.6-12months').split(':')[0]]: t('nutritionGuide.cats.kitten.feeding.6-12months').split(':')[1]
        },
        warnings: t('nutritionGuide.cats.kitten.warnings.items', { returnObjects: true }) as string[]
      },
      adult: {
        title: t('nutritionGuide.cats.adult.title'),
        description: t('nutritionGuide.cats.adult.description'),
        tips: t('nutritionGuide.cats.adult.tips', { returnObjects: true }) as string[],
        feeding: {
          [t('nutritionGuide.common.indoorCat')]: t('nutritionGuide.cats.adult.feeding.indoor'),
          [t('nutritionGuide.common.outdoorCat')]: t('nutritionGuide.cats.adult.feeding.outdoor'),
          [t('nutritionGuide.common.neuteredCat')]: t('nutritionGuide.cats.adult.feeding.neutered')
        },
        warnings: t('nutritionGuide.cats.adult.warnings.items', { returnObjects: true }) as string[]
      },
      senior: {
        title: t('nutritionGuide.cats.senior.title'),
        description: t('nutritionGuide.cats.senior.description'),
        tips: t('nutritionGuide.cats.senior.tips', { returnObjects: true }) as string[],
        feeding: {
          [t('nutritionGuide.cats.senior.feeding.general').split(':')[0]]: t('nutritionGuide.cats.senior.feeding.general').split(':')[1],
          [t('nutritionGuide.cats.senior.feeding.special')]: ''
        },
        warnings: t('nutritionGuide.cats.senior.warnings.items', { returnObjects: true }) as string[]
      }
    },
    dogs: {
      puppy: {
        title: t('nutritionGuide.dogs.puppy.title'),
        description: t('nutritionGuide.dogs.puppy.description'),
        tips: t('nutritionGuide.dogs.puppy.tips', { returnObjects: true }) as string[],
        feeding: {
          [t('nutritionGuide.dogs.puppy.feeding.small')]: '',
          [t('nutritionGuide.dogs.puppy.feeding.medium')]: '',
          [t('nutritionGuide.dogs.puppy.feeding.large')]: ''
        },
        warnings: t('nutritionGuide.dogs.puppy.warnings.items', { returnObjects: true }) as string[]
      },
      adult: {
        title: t('nutritionGuide.dogs.adult.title'),
        description: t('nutritionGuide.dogs.adult.description'),
        tips: t('nutritionGuide.dogs.adult.tips', { returnObjects: true }) as string[],
        feeding: {
          [t('nutritionGuide.dogs.adult.feeding.small')]: '',
          [t('nutritionGuide.dogs.adult.feeding.medium')]: '',
          [t('nutritionGuide.dogs.adult.feeding.large')]: ''
        },
        warnings: t('nutritionGuide.dogs.adult.warnings.items', { returnObjects: true }) as string[]
      },
      senior: {
        title: t('nutritionGuide.dogs.senior.title'),
        description: t('nutritionGuide.dogs.senior.description'),
        tips: t('nutritionGuide.dogs.senior.tips', { returnObjects: true }) as string[],
        feeding: {
          [t('nutritionGuide.dogs.senior.feeding.general')]: '',
          [t('nutritionGuide.dogs.senior.feeding.special')]: ''
        },
        warnings: t('nutritionGuide.dogs.senior.warnings.items', { returnObjects: true }) as string[]
      }
    }
  };

  const commonMistakes = t('nutritionGuide.commonMistakes.mistakes', { returnObjects: true }) as Array<{
    mistake: string;
    description: string;
    solution: string;
    severity: string;
  }>;

  const currentGuide = nutritionTips[activeTab as keyof typeof nutritionTips];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-300 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-emerald-300 rounded-full animate-bounce-soft"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t('nutritionGuide.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('nutritionGuide.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('cats')}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'cats'
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <Cat className="w-5 h-5 mr-2" />
                {t('nutritionGuide.tabs.cats')}
              </button>
              <button
                onClick={() => setActiveTab('dogs')}
                className={`flex items-center px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === 'dogs'
                    ? 'bg-white text-orange-600 shadow-md'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <Dog className="w-5 h-5 mr-2" />
                {t('nutritionGuide.tabs.dogs')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Guides */}
      <section id="nutrition-guides" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(currentGuide).map(([stage, guide]) => {
              const stageIcons = {
                kitten: Heart,
                puppy: Heart,
                adult: Shield,
                senior: Star
              };
              const Icon = stageIcons[stage as keyof typeof stageIcons];
              const colors = {
                kitten: 'from-pink-500 to-rose-500',
                puppy: 'from-orange-500 to-red-500',
                adult: 'from-blue-500 to-cyan-500',
                senior: 'from-purple-500 to-indigo-500'
              };
              
              const guideData = guide as {
                title: string;
                description: string;
                tips: string[];
                feeding: Record<string, string>;
                warnings: string[];
              };

              return (
                <div
                  key={stage}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colors[stage as keyof typeof colors]} rounded-full mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {guideData.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {guideData.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">{t('nutritionGuide.common.nutritionTips')}</h4>
                    <ul className="space-y-2">
                      {guideData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">{t('nutritionGuide.common.feedingSchedule')}</h4>
                    <div className="space-y-2">
                      {Object.entries(guideData.feeding).map(([type, amount]) => (
                        <div key={type} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                          <span className="text-sm font-medium text-gray-700">{type}</span>
                          <span className="text-sm text-gray-600">{amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 text-amber-500 mr-2" />
                      {t('nutritionGuide.common.importantNotes')}
                    </h4>
                    <ul className="space-y-2">
                      {guideData.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-600 text-sm">{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('nutritionGuide.commonMistakes.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('nutritionGuide.commonMistakes.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commonMistakes.map((mistake, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    mistake.severity === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    <AlertCircle className={`w-6 h-6 ${
                      mistake.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {mistake.mistake}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {mistake.description}
                    </p>
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-semibold text-green-800 mb-1">{t('nutritionGuide.commonMistakes.correctApproach')}</h4>
                      <p className="text-green-700 text-sm">
                        {mistake.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('nutritionGuide.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('nutritionGuide.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold"
            >
              {t('nutritionGuide.cta.consultButton')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/shop"
              className="btn-secondary inline-flex items-center px-8 py-4 text-lg font-semibold"
            >
              {t('nutritionGuide.cta.shopButton')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NutritionGuide;