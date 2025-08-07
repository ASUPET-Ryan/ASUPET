import { useTranslation } from 'react-i18next';
import { Brain, Database, Shield, Zap, Users, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

const Technology = () => {
  const { t } = useTranslation();

  const technologies = [
    {
      icon: Brain,
      title: t('technology.ai.title'),
      description: t('technology.ai.description'),
      features: [
        t('technology.ai.features.analysis'),
        t('technology.ai.features.recommendation'),
        t('technology.ai.features.monitoring'),
        t('technology.ai.features.optimization'),
      ],
    },
    {
      icon: Database,
      title: t('technology.data.title'),
      description: t('technology.data.description'),
      features: [
        t('technology.data.features.collection'),
        t('technology.data.features.processing'),
        t('technology.data.features.insights'),
        t('technology.data.features.prediction'),
      ],
    },
    {
      icon: Shield,
      title: t('technology.security.title'),
      description: t('technology.security.description'),
      features: [
        t('technology.security.features.encryption'),
        t('technology.security.features.privacy'),
        t('technology.security.features.compliance'),
        t('technology.security.features.backup'),
      ],
    },
  ];

  const services = [
    {
      icon: Users,
      title: t('technology.services.consultation.title'),
      description: t('technology.services.consultation.description'),
      benefits: [
        t('technology.services.consultation.benefits.expert'),
        t('technology.services.consultation.benefits.personalized'),
        t('technology.services.consultation.benefits.support'),
      ],
    },
    {
      icon: BarChart3,
      title: t('technology.services.monitoring.title'),
      description: t('technology.services.monitoring.description'),
      benefits: [
        t('technology.services.monitoring.benefits.realtime'),
        t('technology.services.monitoring.benefits.alerts'),
        t('technology.services.monitoring.benefits.reports'),
      ],
    },
    {
      icon: Zap,
      title: t('technology.services.optimization.title'),
      description: t('technology.services.optimization.description'),
      benefits: [
        t('technology.services.optimization.benefits.efficiency'),
        t('technology.services.optimization.benefits.cost'),
        t('technology.services.optimization.benefits.performance'),
      ],
    },
  ];

  const advantages = [
    {
      number: '99.9%',
      label: t('technology.advantages.accuracy'),
      description: t('technology.advantages.accuracyDesc'),
    },
    {
      number: '24/7',
      label: t('technology.advantages.availability'),
      description: t('technology.advantages.availabilityDesc'),
    },
    {
      number: '50%',
      label: t('technology.advantages.efficiency'),
      description: t('technology.advantages.efficiencyDesc'),
    },
    {
      number: '100+',
      label: t('technology.advantages.algorithms'),
      description: t('technology.advantages.algorithmsDesc'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 min-h-[60vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=advanced%20technology%2C%20AI%20artificial%20intelligence%2C%20data%20analytics%2C%20digital%20innovation%2C%20futuristic%20tech%20background%2C%20professional%20lighting&image_size=landscape_16_9"
            alt="Technology Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-purple-800/75 to-indigo-900/85"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t('technology.hero.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              {t('technology.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Core Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('technology.core.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('technology.core.subtitle')}
            </p>
          </div>
          <div className="space-y-16">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg mr-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {tech.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-8">
                      {tech.description}
                    </p>
                    <div className="space-y-3">
                      {tech.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={`https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=${tech.title.toLowerCase()}%20technology%20visualization%2C%20modern%20digital%20interface%2C%20professional%20tech%20illustration&image_size=landscape_4_3`}
                        alt={tech.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('technology.advantages.title')}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('technology.advantages.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {advantage.number}
                </div>
                <div className="text-xl font-semibold text-blue-100 mb-3">
                  {advantage.label}
                </div>
                <p className="text-blue-100 text-sm">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('technology.services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('technology.services.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('technology.process.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('technology.process.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: t('technology.process.research.title'),
                description: t('technology.process.research.description'),
              },
              {
                step: '02',
                title: t('technology.process.development.title'),
                description: t('technology.process.development.description'),
              },
              {
                step: '03',
                title: t('technology.process.testing.title'),
                description: t('technology.process.testing.description'),
              },
              {
                step: '04',
                title: t('technology.process.deployment.title'),
                description: t('technology.process.deployment.description'),
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full text-white font-bold text-lg mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-6 h-6 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {t('technology.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('technology.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {t('technology.cta.contact')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
            >
              {t('technology.cta.products')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;