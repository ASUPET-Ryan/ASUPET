import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save, Camera, Plus, Trash2 } from 'lucide-react';

interface PetProfile {
  id?: string;
  name: string;
  breed: string;
  birthday: string;
  gender: 'male' | 'female' | 'unknown';
  weight: string;
  color: string;
  isNeutered: 'yes' | 'no' | 'unknown';
  bodyCondition: 'underweight' | 'normal' | 'overweight' | 'obese';
  activityLevel: 'low' | 'moderate' | 'high' | 'veryHigh';
  foodPreference: string[];
  pickinessLevel: 'notPicky' | 'slightlyPicky' | 'moderatelyPicky' | 'veryPicky';
  allergies: string;
  healthIssues: string;
  dailyTreats: 'none' | 'minimal' | 'moderate' | 'frequent' | 'excessive';
  photo?: string;
}

interface PetProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: PetProfile) => void;
  initialData?: PetProfile;
}

export default function PetProfileForm({ isOpen, onClose, onSave, initialData }: PetProfileFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<PetProfile>({
    name: '',
    breed: '',
    birthday: '',
    gender: 'unknown',
    weight: '',
    color: '',
    isNeutered: 'unknown',
    bodyCondition: 'normal',
    activityLevel: 'moderate',
    foodPreference: [],
    pickinessLevel: 'notPicky',
    allergies: '',
    healthIssues: '',
    dailyTreats: 'moderate',
    ...initialData
  });

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : []
  );

  const [selectedHealthIssues, setSelectedHealthIssues] = useState<string[]>(
    formData.healthIssues ? formData.healthIssues.split(',').map(h => h.trim()) : []
  );

  if (!isOpen) return null;

  const handleInputChange = (field: keyof PetProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFoodPreferenceToggle = (preference: string) => {
    const updated = formData.foodPreference.includes(preference)
      ? formData.foodPreference.filter(p => p !== preference)
      : [...formData.foodPreference, preference];
    handleInputChange('foodPreference', updated);
  };

  const handleAllergyToggle = (allergy: string) => {
    const updated = selectedAllergies.includes(allergy)
      ? selectedAllergies.filter(a => a !== allergy)
      : [...selectedAllergies, allergy];
    setSelectedAllergies(updated);
    handleInputChange('allergies', updated.join(', '));
  };

  const handleHealthIssueToggle = (issue: string) => {
    const updated = selectedHealthIssues.includes(issue)
      ? selectedHealthIssues.filter(h => h !== issue)
      : [...selectedHealthIssues, issue];
    setSelectedHealthIssues(updated);
    handleInputChange('healthIssues', updated.join(', '));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const commonAllergies = [
    'chicken', 'beef', 'dairy', 'wheat', 'corn', 'soy', 'fish', 'eggs', 'lamb', 'rice'
  ];

  const commonHealthIssues = [
    'diabetes', 'kidneyDisease', 'heartDisease', 'arthritis', 'allergies',
    'digestiveIssues', 'skinConditions', 'dental', 'obesity', 'anxiety'
  ];

  const foodPreferences = [
    'kibble', 'baked', 'freezeDried', 'frozenRaw', 'frozenCooked', 'homemade'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">
            {initialData ? t('petProfile.actions.edit') : t('petProfile.actions.addNew')}
          </h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* 基本信息 */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">{t('petProfile.basicInfo')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={t('petProfile.placeholders.name')}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.breed')}
                </label>
                <input
                  type="text"
                  value={formData.breed}
                  onChange={(e) => handleInputChange('breed', e.target.value)}
                  placeholder={t('petProfile.placeholders.breed')}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.birthday')}
                </label>
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleInputChange('birthday', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.gender')}
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="male">{t('petProfile.options.gender.male')}</option>
                  <option value="female">{t('petProfile.options.gender.female')}</option>
                  <option value="unknown">{t('petProfile.options.gender.unknown')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.weight')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder={t('petProfile.placeholders.weight')}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.color')}
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder={t('petProfile.placeholders.color')}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 健康信息 */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">{t('petProfile.healthInfo')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.isNeutered')}
                </label>
                <select
                  value={formData.isNeutered}
                  onChange={(e) => handleInputChange('isNeutered', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="yes">{t('petProfile.options.neutered.yes')}</option>
                  <option value="no">{t('petProfile.options.neutered.no')}</option>
                  <option value="unknown">{t('petProfile.options.neutered.unknown')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.bodyCondition')}
                </label>
                <select
                  value={formData.bodyCondition}
                  onChange={(e) => handleInputChange('bodyCondition', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="underweight">{t('petProfile.options.bodyCondition.underweight')}</option>
                  <option value="normal">{t('petProfile.options.bodyCondition.normal')}</option>
                  <option value="overweight">{t('petProfile.options.bodyCondition.overweight')}</option>
                  <option value="obese">{t('petProfile.options.bodyCondition.obese')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.activityLevel')}
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="low">{t('petProfile.options.activityLevel.low')}</option>
                  <option value="moderate">{t('petProfile.options.activityLevel.moderate')}</option>
                  <option value="high">{t('petProfile.options.activityLevel.high')}</option>
                  <option value="veryHigh">{t('petProfile.options.activityLevel.veryHigh')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('petProfile.fields.dailyTreats')}
                </label>
                <select
                  value={formData.dailyTreats}
                  onChange={(e) => handleInputChange('dailyTreats', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="none">{t('petProfile.options.dailyTreats.none')}</option>
                  <option value="minimal">{t('petProfile.options.dailyTreats.minimal')}</option>
                  <option value="moderate">{t('petProfile.options.dailyTreats.moderate')}</option>
                  <option value="frequent">{t('petProfile.options.dailyTreats.frequent')}</option>
                  <option value="excessive">{t('petProfile.options.dailyTreats.excessive')}</option>
                </select>
              </div>
            </div>

            {/* 常见健康问题 */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                {t('petProfile.commonHealthIssues.title')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonHealthIssues.map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => handleHealthIssueToggle(t(`petProfile.commonHealthIssues.${issue}`))}
                    className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                      selectedHealthIssues.includes(t(`petProfile.commonHealthIssues.${issue}`))
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:border-primary-300'
                    }`}
                  >
                    {t(`petProfile.commonHealthIssues.${issue}`)}
                  </button>
                ))}
              </div>
              <textarea
                value={formData.healthIssues}
                onChange={(e) => handleInputChange('healthIssues', e.target.value)}
                placeholder={t('petProfile.placeholders.healthIssues')}
                className="w-full mt-3 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>

          {/* 饮食信息 */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">{t('petProfile.dietInfo')}</h3>
            
            {/* 食物偏好 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                {t('petProfile.fields.foodPreference')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {foodPreferences.map((preference) => (
                  <button
                    key={preference}
                    type="button"
                    onClick={() => handleFoodPreferenceToggle(preference)}
                    className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                      formData.foodPreference.includes(preference)
                        ? 'bg-primary-100 border-primary-300 text-primary-700'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:border-primary-300'
                    }`}
                  >
                    {t(`petProfile.options.foodPreference.${preference}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* 挑食程度 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('petProfile.fields.pickinessLevel')}
              </label>
              <select
                value={formData.pickinessLevel}
                onChange={(e) => handleInputChange('pickinessLevel', e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="notPicky">{t('petProfile.options.pickinessLevel.notPicky')}</option>
                <option value="slightlyPicky">{t('petProfile.options.pickinessLevel.slightlyPicky')}</option>
                <option value="moderatelyPicky">{t('petProfile.options.pickinessLevel.moderatelyPicky')}</option>
                <option value="veryPicky">{t('petProfile.options.pickinessLevel.veryPicky')}</option>
              </select>
            </div>

            {/* 过敏源 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                {t('petProfile.commonAllergies.title')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonAllergies.map((allergy) => (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => handleAllergyToggle(t(`petProfile.commonAllergies.${allergy}`))}
                    className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                      selectedAllergies.includes(t(`petProfile.commonAllergies.${allergy}`))
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:border-red-300'
                    }`}
                  >
                    {t(`petProfile.commonAllergies.${allergy}`)}
                  </button>
                ))}
              </div>
              <textarea
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                placeholder={t('petProfile.placeholders.allergies')}
                className="w-full mt-3 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{t('petProfile.actions.save')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}