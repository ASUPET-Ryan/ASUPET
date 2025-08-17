import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Target, Eye, Users, Award, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BrandStory, TeamMember } from '../lib/supabase';
import i18n from '../i18n';

const About = () => {
  const { t } = useTranslation();
  const [brandStory, setBrandStory] = useState<BrandStory | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch brand story
        const { data: storyData, error: storyError } = await supabase
          .from('brand_story')
          .select('*')
          .single();

        if (storyError && storyError.code !== 'PGRST116') {
          console.error('Error fetching brand story:', storyError);
        } else {
          setBrandStory(storyData);
        }

        // Fetch team members
        const { data: teamData, error: teamError } = await supabase
          .from('team_members')
          .select('*')
          .order('order_index', { ascending: true });

        if (teamError) {
          console.error('Error fetching team members:', teamError);
        } else {
          setTeamMembers(teamData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const values = [
    {
      icon: Heart,
      title: t('about.values.love.title'),
      description: t('about.values.love.description'),
    },
    {
      icon: Target,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description'),
    },
    {
      icon: Eye,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
    },
  ];

  const achievements = [
    {
      icon: Users,
      number: '50,000+',
      label: t('about.achievements.customers'),
    },
    {
      icon: Award,
      number: '15+',
      label: t('about.achievements.awards'),
    },
    {
      icon: Globe,
      number: '20+',
      label: t('about.achievements.countries'),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 min-h-[60vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20pets%20with%20their%20owners%2C%20warm%20family%20atmosphere%2C%20natural%20lighting%2C%20professional%20photography%2C%20pet%20care%20company%20about%20us&image_size=landscape_16_9"
            alt="About Us Background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-orange-600/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      {brandStory && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {t('about.story.title')}
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-6">{typeof brandStory.content === 'string' ? brandStory.content : brandStory.content[i18n.language as 'zh' | 'en'] || brandStory.content.zh}</p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20pet%20food%20manufacturing%20facility%2C%20clean%20and%20professional%20environment%2C%20quality%20control%2C%20natural%20lighting&image_size=landscape_4_3"
                    alt={t('about.story.imageAlt')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('about.achievements.title')}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('about.achievements.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-blue-100 text-lg">
                    {achievement.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('about.team.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.team.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="text-center bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                    <img
                      src={member.avatar_url || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20${encodeURIComponent(typeof member.name === 'string' ? member.name : member.name[i18n.language as 'zh' | 'en'] || member.name.zh)}%20${encodeURIComponent(typeof member.position === 'string' ? member.position : member.position[i18n.language as 'zh' | 'en'] || member.position.zh)}&image_size=square`}
                      alt={typeof member.name === 'string' ? member.name : member.name[i18n.language as 'zh' | 'en'] || member.name.zh}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {typeof member.name === 'string' ? member.name : member.name[i18n.language as 'zh' | 'en'] || member.name.zh}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {typeof member.position === 'string' ? member.position : member.position[i18n.language as 'zh' | 'en'] || member.position.zh}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {typeof member.bio === 'string' ? member.bio : member.bio[i18n.language as 'zh' | 'en'] || member.bio.zh}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {t('about.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {t('about.cta.products')}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
            >
              {t('about.cta.contact')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;