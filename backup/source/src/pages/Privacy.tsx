import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-orange-500 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('privacy.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('privacy.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('privacy.backToHome')}
          </Link>

          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
            {/* Last Updated */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-500">
                {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.introduction.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('privacy.introduction.content')}
              </p>
            </div>

            {/* Information Collection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.collection.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('privacy.collection.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('privacy.collection.personal')}</li>
                <li>{t('privacy.collection.pet')}</li>
                <li>{t('privacy.collection.usage')}</li>
                <li>{t('privacy.collection.device')}</li>
              </ul>
            </div>

            {/* Information Usage */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.usage.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('privacy.usage.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('privacy.usage.service')}</li>
                <li>{t('privacy.usage.recommendation')}</li>
                <li>{t('privacy.usage.communication')}</li>
                <li>{t('privacy.usage.improvement')}</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.sharing.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('privacy.sharing.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('privacy.sharing.partners')}</li>
                <li>{t('privacy.sharing.legal')}</li>
                <li>{t('privacy.sharing.consent')}</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.security.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('privacy.security.description')}
              </p>
            </div>

            {/* User Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.rights.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('privacy.rights.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('privacy.rights.access')}</li>
                <li>{t('privacy.rights.correction')}</li>
                <li>{t('privacy.rights.deletion')}</li>
                <li>{t('privacy.rights.portability')}</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.cookies.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('privacy.cookies.description')}
              </p>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('privacy.contact.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('privacy.contact.description')}
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>{t('privacy.contact.email')}:</strong> privacy@asupet.com
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>{t('privacy.contact.address')}:</strong> {t('footer.address')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;