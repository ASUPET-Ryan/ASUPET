import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-orange-500 py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('terms.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('terms.subtitle')}
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
            {t('terms.backToHome')}
          </Link>

          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
            {/* Last Updated */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-500">
                {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.introduction.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('terms.introduction.content')}
              </p>
            </div>

            {/* Acceptance */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.acceptance.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('terms.acceptance.content')}
              </p>
            </div>

            {/* Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.services.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('terms.services.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('terms.services.nutrition')}</li>
                <li>{t('terms.services.recommendation')}</li>
                <li>{t('terms.services.consultation')}</li>
                <li>{t('terms.services.monitoring')}</li>
              </ul>
            </div>

            {/* User Responsibilities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.responsibilities.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('terms.responsibilities.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('terms.responsibilities.accurate')}</li>
                <li>{t('terms.responsibilities.lawful')}</li>
                <li>{t('terms.responsibilities.security')}</li>
                <li>{t('terms.responsibilities.respect')}</li>
              </ul>
            </div>

            {/* Prohibited Uses */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.prohibited.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('terms.prohibited.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('terms.prohibited.illegal')}</li>
                <li>{t('terms.prohibited.harmful')}</li>
                <li>{t('terms.prohibited.unauthorized')}</li>
                <li>{t('terms.prohibited.interference')}</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.intellectual.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('terms.intellectual.content')}
              </p>
            </div>

            {/* Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.disclaimers.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('terms.disclaimers.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{t('terms.disclaimers.accuracy')}</li>
                <li>{t('terms.disclaimers.availability')}</li>
                <li>{t('terms.disclaimers.medical')}</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.liability.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('terms.liability.content')}
              </p>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.termination.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('terms.termination.content')}
              </p>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.changes.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('terms.changes.content')}
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.governing.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('terms.governing.content')}
              </p>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('terms.contact.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('terms.contact.description')}
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>{t('terms.contact.email')}:</strong> legal@asupet.com
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>{t('terms.contact.address')}:</strong> {t('footer.address')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;