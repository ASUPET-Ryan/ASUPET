import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Shield, Zap, Users, Award, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Heart,
      title: t('about.care'),
      description: t('about.careDescription'),
    },
    {
      icon: Shield,
      title: t('about.professional'),
      description: t('about.professionalDescription'),
    },
    {
      icon: Zap,
      title: t('about.innovation'),
      description: t('about.innovationDescription'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 min-h-[60vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20pet%20care%20team%2C%20veterinarians%20and%20nutritionists%2C%20modern%20office%20environment%2C%20warm%20lighting%2C%20professional%20photography&image_size=landscape_16_9"
            alt="About Us Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-purple-800/75 to-indigo-900/85"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t('about.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              {t('about.heroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('about.brandStory')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.brandStoryDescription')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {t('about.ourMission')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.missionDescription1')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('about.missionDescription2')}
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {t('about.professionalTeam')}
                  </h4>
                  <p className="text-gray-600">
                    {t('about.teamDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('about.coreValues')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.valuesDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('about.contactUs')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.contactDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {t('contact.info.address.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('contact.info.address.content')}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {t('contact.info.phone.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('contact.info.phone.content')}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {t('contact.info.email.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('contact.info.email.content')}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {t('contact.info.hours.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('contact.info.hours.content')}
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@asupet.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                {t('about.sendEmail')}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                {t('about.onlineConsultation')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;