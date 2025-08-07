import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, Share2, Calendar, Weight, Activity, Heart, AlertTriangle, CheckCircle, Info, Clock, TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface PetData {
  id: string;
  name: string;
  breed: string;
  birthday: string;
  gender: string;
  weight: string;
  color: string;
  photo: string;
}

interface FeedingRecommendation {
  category: string;
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
  tips: string[];
}

interface HistoricalReport {
  id: string;
  date: string;
  petWeight: string;
  petAge: number;
  recommendations: FeedingRecommendation[];
  notes?: string;
}

interface RecommendationChange {
  category: string;
  changeType: 'increased' | 'decreased' | 'unchanged' | 'new';
  description: string;
  previousValue?: string;
  currentValue?: string;
}

const FeedingReport: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pet, setPet] = useState<PetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [historicalReports, setHistoricalReports] = useState<HistoricalReport[]>([]);
  const [selectedHistoryReport, setSelectedHistoryReport] = useState<HistoricalReport | null>(null);
  const [recommendationChanges, setRecommendationChanges] = useState<RecommendationChange[]>([]);

  // Mock pet data - in real app, this would come from API
  const mockPetData: PetData[] = [
    {
      id: '1',
      name: '小白',
      breed: '金毛寻回犬',
      birthday: '2022-03-10',
      gender: '公',
      weight: '25kg',
      color: '金黄色',
      photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJtOSA5IDMgM0wyMCA0Ii8+CjxwYXRoIGQ9Im0yMSAxNS0zLTMtMyAzIi8+CjxwYXRoIGQ9Ik0yMCAxMmgtOCIvPgo8cGF0aCBkPSJtMyA5IDMgMyAzLTMiLz4KPHN2Zz4KPC9zdmc+'
    },
    {
      id: '2',
      name: '小花',
      breed: '英国短毛猫',
      birthday: '2021-08-15',
      gender: '母',
      weight: '4.5kg',
      color: '银渐层',
      photo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJtOSA5IDMgM0wyMCA0Ii8+CjxwYXRoIGQ9Im0yMSAxNS0zLTMtMyAzIi8+CjxwYXRoIGQ9Ik0yMCAxMmgtOCIvPgo8cGF0aCBkPSJtMyA5IDMgMyAzLTMiLz4KPHN2Zz4KPC9zdmc+'
    }
  ];

  // Generate mock historical reports
  const generateHistoricalReports = (petData: PetData): HistoricalReport[] => {
    const reports: HistoricalReport[] = [];
    const currentDate = new Date();
    
    // Generate 6 months of historical data
    for (let i = 5; i >= 0; i--) {
      const reportDate = new Date(currentDate);
      reportDate.setMonth(reportDate.getMonth() - i);
      
      const weightVariation = Math.random() * 2 - 1; // ±1kg variation
      const baseWeight = parseFloat(petData.weight.replace('kg', ''));
      const historicalWeight = Math.max(0.5, baseWeight + weightVariation * i * 0.2);
      
      const ageAtTime = new Date().getFullYear() - new Date(petData.birthday).getFullYear() - (i > 0 ? 1 : 0);
      
      const mockPetForHistory = {
        ...petData,
        weight: `${historicalWeight.toFixed(1)}kg`
      };
      
      reports.push({
        id: `report-${i}`,
        date: reportDate.toLocaleDateString('zh-CN'),
        petWeight: `${historicalWeight.toFixed(1)}kg`,
        petAge: ageAtTime,
        recommendations: generateRecommendations(mockPetForHistory),
        notes: i === 0 ? '最新报告' : i === 5 ? '首次建档' : `第${6-i}次营养评估`
      });
    }
    
    return reports.reverse(); // Most recent first
  };

  // Mock feeding recommendations based on pet data
  const generateRecommendations = (petData: PetData): FeedingRecommendation[] => {
    const age = new Date().getFullYear() - new Date(petData.birthday).getFullYear();
    const isDog = petData.breed.includes('犬') || petData.breed.includes('狗');
    
    return [
      {
        category: '基础营养需求',
        title: `${petData.name}的每日营养配比建议`,
        description: `根据${petData.name}的品种、年龄和体重，为您制定个性化营养方案`,
        importance: 'high',
        tips: [
          `蛋白质：${isDog ? '25-30%' : '30-35%'}（优质动物蛋白为主）`,
          `脂肪：${isDog ? '12-18%' : '15-20%'}（含必需脂肪酸）`,
          `碳水化合物：${isDog ? '30-50%' : '25-40%'}（易消化谷物）`,
          `纤维：3-5%（促进肠道健康）`,
          `水分：每日需水量约${isDog ? '50-60ml/kg' : '60-70ml/kg'}体重`
        ]
      },
      {
        category: '喂食频次与分量',
        title: '科学喂食时间表',
        description: `${age}岁的${petData.name}适合的喂食安排`,
        importance: 'high',
        tips: [
          age < 1 ? '幼年期：每日3-4次，少量多餐' : age < 7 ? '成年期：每日2次，定时定量' : '老年期：每日2-3次，易消化食物',
          `每餐建议量：${isDog ? '根据体重计算，约' + (parseInt(petData.weight) * 20) + 'g' : '约80-120g'}`,
          '固定喂食时间：建议早晚各一次，间隔12小时',
          '饭后休息：进食后避免剧烈运动，休息30-60分钟'
        ]
      },
      {
        category: '特殊营养补充',
        title: '针对性营养强化',
        description: `基于${petData.name}的品种特点的营养建议`,
        importance: 'medium',
        tips: [
          isDog && petData.breed.includes('金毛') ? 'Omega-3脂肪酸：支持毛发光泽和关节健康' : '牛磺酸：维护心脏和视力健康',
          '钙磷比例：1.2:1，支持骨骼发育',
          '维生素E：抗氧化，增强免疫力',
          '益生菌：维护肠道菌群平衡'
        ]
      },
      {
        category: '饮食注意事项',
        title: '安全饮食指南',
        description: '确保宠物饮食安全的重要提醒',
        importance: 'high',
        tips: [
          '禁食清单：巧克力、洋葱、大蒜、葡萄、木糖醇等',
          '温度控制：食物温度接近体温，避免过热或过冷',
          '新鲜度：每日更换新鲜食物和水',
          '过敏监测：注意观察食物过敏反应，如皮肤红疹、腹泻等'
        ]
      },
      {
        category: '健康监测',
        title: '营养状况评估',
        description: '定期评估营养摄入效果的指标',
        importance: 'medium',
        tips: [
          '体重监测：每周称重，维持理想体重范围',
          '毛发状况：光泽度和柔软度反映营养状况',
          '精神状态：活跃度和食欲是健康的重要指标',
          '排便情况：正常的排便频次和形状'
        ]
      }
    ];
  };

  // Compare current recommendations with previous report
  const compareWithPreviousReport = (currentRecs: FeedingRecommendation[], previousRecs: FeedingRecommendation[], currentWeight: string, previousWeight: string): RecommendationChange[] => {
    const changes: RecommendationChange[] = [];
    
    // Weight change analysis
    const currentWeightNum = parseFloat(currentWeight.replace('kg', ''));
    const previousWeightNum = parseFloat(previousWeight.replace('kg', ''));
    const weightDiff = currentWeightNum - previousWeightNum;
    
    if (Math.abs(weightDiff) > 0.1) {
      changes.push({
        category: '体重变化',
        changeType: weightDiff > 0 ? 'increased' : 'decreased',
        description: `体重${weightDiff > 0 ? '增加' : '减少'}了${Math.abs(weightDiff).toFixed(1)}kg`,
        previousValue: previousWeight,
        currentValue: currentWeight
      });
    }
    
    // Compare each recommendation category
    currentRecs.forEach(currentRec => {
      const previousRec = previousRecs.find(prev => prev.category === currentRec.category);
      
      if (!previousRec) {
        changes.push({
          category: currentRec.category,
          changeType: 'new',
          description: '新增营养建议'
        });
        return;
      }
      
      // Analyze changes based on category
      let changeDetected = false;
      let changeDescription = '';
      
      switch (currentRec.category) {
        case '基础营养需求':
          // Check if protein/fat percentages changed
          const currentProtein = currentRec.tips[0];
          const previousProtein = previousRec.tips[0];
          if (currentProtein !== previousProtein) {
            changeDetected = true;
            changeDescription = '蛋白质配比已调整';
          }
          break;
          
        case '喂食频次与分量':
          // Check feeding amount changes
          const currentAmount = currentRec.tips.find(tip => tip.includes('每餐建议量'));
          const previousAmount = previousRec.tips.find(tip => tip.includes('每餐建议量'));
          if (currentAmount !== previousAmount) {
            changeDetected = true;
            changeDescription = '喂食分量已调整';
          }
          break;
          
        case '特殊营养补充':
          if (currentRec.tips.length !== previousRec.tips.length) {
            changeDetected = true;
            changeDescription = '营养补充方案已更新';
          }
          break;
          
        case '健康监测':
          // Always show as updated for monitoring
          changeDetected = true;
          changeDescription = '监测指标已更新';
          break;
      }
      
      if (changeDetected) {
        // Determine change type based on weight trend and category
        let changeType: 'increased' | 'decreased' | 'unchanged' = 'unchanged';
        
        if (currentRec.category === '喂食频次与分量') {
          changeType = weightDiff > 0.2 ? 'increased' : weightDiff < -0.2 ? 'decreased' : 'unchanged';
        } else if (currentRec.category === '基础营养需求') {
          changeType = weightDiff > 0 ? 'increased' : 'decreased';
        } else {
          changeType = 'increased'; // Default for new recommendations
        }
        
        changes.push({
          category: currentRec.category,
          changeType,
          description: changeDescription
        });
      }
    });
    
    return changes;
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundPet = mockPetData.find(p => p.id === petId);
      if (foundPet) {
        setPet(foundPet);
        const reports = generateHistoricalReports(foundPet);
        setHistoricalReports(reports);
        
        // Calculate changes compared to previous report
        if (reports.length > 1) {
          const currentRecs = generateRecommendations(foundPet);
          const previousReport = reports[1]; // Second most recent (first is current)
          const changes = compareWithPreviousReport(
            currentRecs,
            previousReport.recommendations,
            foundPet.weight,
            previousReport.petWeight
          );
          setRecommendationChanges(changes);
        }
      } else {
        setPet(null);
      }
      setLoading(false);
    }, 1000);
  }, [petId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">正在生成科学喂养建议报告...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">未找到宠物信息</h2>
          <p className="text-neutral-600 mb-6">请检查宠物ID是否正确</p>
          <button 
            onClick={() => navigate('/user-center')}
            className="bg-primary-600 text-white px-6 py-3 rounded-cute hover:bg-primary-700 transition-colors duration-300"
          >
            返回个人中心
          </button>
        </div>
      </div>
    );
  }

  const recommendations = generateRecommendations(pet);
  const currentDate = new Date().toLocaleDateString('zh-CN');

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increased': return <ArrowUp className="w-3 h-3" />;
      case 'decreased': return <ArrowDown className="w-3 h-3" />;
      case 'unchanged': return <Minus className="w-3 h-3" />;
      case 'new': return <TrendingUp className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increased': return 'text-green-600 bg-green-50 border-green-200';
      case 'decreased': return 'text-red-600 bg-red-50 border-red-200';
      case 'unchanged': return 'text-neutral-600 bg-neutral-50 border-neutral-200';
      case 'new': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const renderChangeIndicator = (category: string) => {
    const change = recommendationChanges.find(c => c.category === category);
    if (!change) return null;

    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ml-2 ${getChangeColor(change.changeType)}`}>
        {getChangeIcon(change.changeType)}
        <span>{change.description}</span>
      </div>
    );
  };

  const renderCurrentReport = () => {
    return (
      <div>
        {/* Pet Info Card */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="flex items-center space-x-6">
            <img 
              src={pet.photo} 
              alt={pet.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">{pet.name}的营养档案</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary-600" />
                  <span className="text-neutral-600">品种：{pet.breed}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Weight className="w-4 h-4 text-primary-600" />
                  <span className="text-neutral-600">体重：{pet.weight}</span>
                  {renderChangeIndicator('体重变化')}
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-primary-600" />
                  <span className="text-neutral-600">性别：{pet.gender}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-primary-600" />
                  <span className="text-neutral-600">年龄：{new Date().getFullYear() - new Date(pet.birthday).getFullYear()}岁</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-500">报告生成日期</p>
              <p className="text-lg font-semibold text-neutral-900">{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-neutral-900">{rec.title}</h3>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getImportanceColor(rec.importance)}`}>
                        {getImportanceIcon(rec.importance)}
                        <span>{rec.importance === 'high' ? '重要' : rec.importance === 'medium' ? '建议' : '提示'}</span>
                      </span>
                      {renderChangeIndicator(rec.category)}
                    </div>
                    <p className="text-neutral-600 mb-4">{rec.description}</p>
                  </div>
                </div>
                
                <div className="bg-neutral-50 rounded-xl p-4">
                  <h4 className="font-semibold text-neutral-900 mb-3 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                    <span>{rec.category}</span>
                  </h4>
                  <ul className="space-y-2">
                    {rec.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mt-8 text-white">
          <div className="flex items-start space-x-4">
            <Info className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">重要提醒</h3>
              <p className="text-primary-100 leading-relaxed">
                本报告基于{pet.name}的基本信息生成，仅供参考。每只宠物的具体需求可能因健康状况、活动量等因素而异。
                如有特殊健康问题或营养需求，建议咨询专业兽医师。定期体检和营养评估有助于确保宠物的健康成长。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHistoryReport = () => {
    return (
      <div className="space-y-6">
        {/* Historical Reports List */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center space-x-3">
            <Clock className="w-6 h-6 text-primary-600" />
            <span>{pet.name}的营养报告历史</span>
          </h2>
          
          <div className="grid gap-4">
            {historicalReports.map((report) => (
              <div 
                key={report.id}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedHistoryReport?.id === report.id 
                    ? 'border-primary-600 bg-primary-50' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
                onClick={() => setSelectedHistoryReport(selectedHistoryReport?.id === report.id ? null : report)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{report.date}</h3>
                      <p className="text-sm text-neutral-600">{report.notes}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-sm text-neutral-600">
                      <div className="flex items-center space-x-1">
                        <Weight className="w-4 h-4" />
                        <span>{report.petWeight}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{report.petAge}岁</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedHistoryReport?.id === report.id && (
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="space-y-4">
                      {report.recommendations.map((rec, index) => (
                        <div key={index} className="bg-white rounded-xl border border-neutral-200 p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-neutral-900">{rec.title}</h4>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getImportanceColor(rec.importance)}`}>
                              {getImportanceIcon(rec.importance)}
                              <span>{rec.importance === 'high' ? '重要' : rec.importance === 'medium' ? '建议' : '提示'}</span>
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 mb-3">{rec.description}</p>
                          <div className="bg-neutral-50 rounded-lg p-3">
                            <h5 className="font-medium text-neutral-900 mb-2">{rec.category}</h5>
                            <ul className="space-y-1">
                              {rec.tips.slice(0, 3).map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                                  <div className="w-1 h-1 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-neutral-700">{tip}</span>
                                </li>
                              ))}
                              {rec.tips.length > 3 && (
                                <li className="text-xs text-neutral-500 ml-3">...还有{rec.tips.length - 3}条建议</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {historicalReports.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">暂无历史报告</h3>
              <p className="text-neutral-600">随着时间推移，这里将显示{pet.name}的营养报告历史记录</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/user-center')}
                className="p-2 hover:bg-neutral-100 rounded-cute transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">科学喂养建议报告</h1>
                <p className="text-neutral-600">为{pet.name}量身定制的营养方案</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-cute transition-colors duration-200">
                <Share2 className="w-4 h-4" />
                <span>分享</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-cute transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>下载PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('current')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'current'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>当前报告</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'history'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>历史报告 ({historicalReports.length})</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'current' && renderCurrentReport()}
        {activeTab === 'history' && renderHistoryReport()}
      </div>
    </div>
  );
};

export default FeedingReport;