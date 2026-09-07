import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Dumbbell, 
  Flame, 
  Apple, 
  CreditCard, 
  Clock, 
  Heart, 
  ChevronLeft, 
  Sparkles,
  Building2,
  Facebook,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { EXERCISE_DATABASE } from '../data/exerciseLibrary';
import { ROUTINE_PLANS, GYM_FACEBOOK_URL, BANK_DETAILS, GYM_RULES } from '../data/gymData';
import { WOMEN_3DAY_PROGRAMS } from '../data/womenData';
import { ExerciseItem } from '../types';
import { getAccurateExerciseImage } from '../utils/exerciseImages';

interface SearchResultItem {
  id: string;
  type: 'exercise' | 'plan' | 'diet' | 'payment' | 'info';
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  imageUrl?: string;
  targetTab?: string;
  exerciseData?: ExerciseItem;
  action?: 'exercise' | 'navigate' | 'payment' | 'facebook' | 'coach' | 'management';
}

interface GlobalSearchBarProps {
  onSelectTab: (tab: string) => void;
  onOpenExerciseModal: (exercise: ExerciseItem) => void;
  onOpenBankPayment: () => void;
  onOpenCoachModal?: () => void;
  onOpenManagementModal?: () => void;
  className?: string;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  onSelectTab,
  onOpenExerciseModal,
  onOpenBankPayment,
  onOpenCoachModal,
  onOpenManagementModal,
  className = ''
}) => {
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick filter suggestions
  const quickTags = [
    { label: 'تمرين النزول الحر 🎯', term: 'نزول حر' },
    { label: 'صدر', term: 'صدر' },
    { label: 'ظهر', term: 'ظهر' },
    { label: 'أكتاف', term: 'أكتاف' },
    { label: 'بايسبس', term: 'بايسبس' },
    { label: 'ترايسبس', term: 'ترايسبس' },
    { label: 'أرجل', term: 'أرجل' },
    { label: 'بطن', term: 'بطن' },
    { label: 'سيدات 🌸', term: 'سيدات' },
    { label: 'تحويل بنكي 💳', term: 'شمال افريقيا' },
    { label: 'فيسبوك 🌐', term: 'فيسبوك' },
  ];

  // Search Results aggregation
  const searchResults = useMemo<SearchResultItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // 0. Free Descent Search / تمرين النزول الحر
    if (
      q.includes('نزول') || 
      q.includes('حر') || 
      q.includes('هبوط') || 
      q.includes('متوازي') || 
      q.includes('ديبس') || 
      q.includes('dips') ||
      q.includes('descent')
    ) {
      const freeDips = EXERCISE_DATABASE['free-descent-dips'];
      if (freeDips) {
        results.push({
          id: 'free-descent-dips-search',
          type: 'exercise',
          title: 'تمرين النزول الحر بوزن الجسم 🎯 (Free Descent Dips)',
          subtitle: 'استهداف الترايسبس وأسفل الصدر مع صور تشريحية ثلاثية الأبعاد للعضلة المستهدفة ومسار الهبوط',
          category: 'تمارين النزول الحر المعتمدة',
          badge: 'تمرين النزول الحر 🎯',
          imageUrl: '/assets/images/free_descent_dips_anatomy.jpg',
          exerciseData: freeDips,
          action: 'exercise'
        });
      }
    }

    // 1. Bank & Payment Search
    if (
      q.includes('دفع') || 
      q.includes('بنك') || 
      q.includes('مصرف') || 
      q.includes('شمال') || 
      q.includes('افريقيا') || 
      q.includes('أفريقيا') || 
      q.includes('تحويل') || 
      q.includes('حساب') || 
      q.includes('نافس') || 
      q.includes('056') ||
      q.includes('اشتراك')
    ) {
      results.push({
        id: 'bank-payment',
        type: 'payment',
        title: 'تحويل مصرف شمال أفريقيا (056011402159017)',
        subtitle: 'الدفع الإلكتروني عبر تطبيق نافس أو تحويل الحساب لتفعيل الاشتراك',
        category: 'طرق الدفع',
        badge: 'مصرف شمال أفريقيا',
        action: 'payment'
      });
    }

    // 2. Coach Abdulrahman
    if (
      q.includes('كوتش') || 
      q.includes('عبد') || 
      q.includes('عبدالرحمن') || 
      q.includes('عبد الرحمن') || 
      q.includes('مدرب') || 
      q.includes('استشارة') ||
      q.includes('تواصل')
    ) {
      results.push({
        id: 'coach-abdulrahman',
        type: 'info',
        title: 'تواصل مع كوتش عبدالرحمن',
        subtitle: 'المدرب والمشرف الفني - استشارات تدريبية وغذائية ومتابعة التمارين',
        category: 'التدريب والاستشارات',
        badge: 'كوتش عبدالرحمن 🏋️',
        action: 'coach'
      });
    }

    // 3. Gym Management
    if (
      q.includes('ادارة') || 
      q.includes('إدارة') || 
      q.includes('صالة') || 
      q.includes('استقبال') || 
      q.includes('مسؤول') || 
      q.includes('تواصل')
    ) {
      results.push({
        id: 'gym-management',
        type: 'info',
        title: 'تواصل مع إدارة الصالة الرسمية',
        subtitle: 'الاشتراكات، الدفع، مواعيد الفترات، الاستفسارات والشكاوى',
        category: 'إدارة الصالة',
        badge: 'الإدارة 🏢',
        action: 'management'
      });
    }

    // 4. Facebook Page
    if (q.includes('فيس') || q.includes('فيسبوك') || q.includes('صفحة') || q.includes('تواصل') || q.includes('facebook')) {
      results.push({
        id: 'gym-facebook',
        type: 'info',
        title: 'صفحة باور جيم الرسمية على فيسبوك',
        subtitle: 'https://www.facebook.com/powergymly - إرسال الإيصالات والتواصل',
        category: 'التواصل الاجتماعي',
        badge: 'فيسبوك',
        action: 'facebook'
      });
    }

    // 3. Gym Schedule & Rules
    if (q.includes('موعد') || q.includes('مواعيد') || q.includes('ساعات') || q.includes('رجال') || q.includes('نساء') || q.includes('وقت') || q.includes('فتح')) {
      results.push({
        id: 'gym-schedule',
        type: 'info',
        title: 'مواعيد عمل صالة باور جيم وفترات الرجال والنساء',
        subtitle: 'جدول الأوقات الكاملة طوال أيام الأسبوع والحالة اللحظية',
        category: 'المواعيد والإدارة',
        badge: 'جدول الأوقات',
        targetTab: 'home',
        action: 'navigate'
      });
    }

    // 4. Workout Plans
    if (q.includes('جدول') || q.includes('خطة') || q.includes('5 ايام') || q.includes('4 ايام') || q.includes('3 ايام') || q.includes('تمرين') || q.includes('تمارين')) {
      results.push({
        id: 'plan-5days',
        type: 'plan',
        title: 'جدول تمارين 5 أيام (Push Pull Legs / Split)',
        subtitle: 'تقسيم احترافي للضخامة والقوة مع بدائل التمارين الحرة والأجهزة',
        category: 'جداول التدريب',
        badge: '5 أيام',
        targetTab: 'workouts',
        action: 'navigate'
      });

      results.push({
        id: 'plan-women',
        type: 'plan',
        title: 'دليل وبرامج تمارين النساء (3 أيام والتخسيس ونحت القوام)',
        subtitle: 'برامج الأرداف والألوية، التخسيس، ونحت الخصر مع نصائح الدورة الشهرية',
        category: 'تمارين نسائية',
        badge: 'قسم السيدات 🌸',
        targetTab: 'women',
        action: 'navigate'
      });
    }

    // 5. Diets & Nutrition
    if (q.includes('دايت') || q.includes('غذاء') || q.includes('تغذية') || q.includes('تضخيم') || q.includes('تنشيف') || q.includes('سعرات') || q.includes('رجيم') || q.includes('كارديو')) {
      results.push({
        id: 'diet-gain',
        type: 'diet',
        title: 'نظام التضخيم العضلي وزيادة الوزن الصحي',
        subtitle: 'وجبات محسوبة السعرات مع مصادر البروتين والكربوهيدرات الصحية',
        category: 'الأنظمة الغذائية',
        badge: 'تضخيم عضلات',
        targetTab: 'diets',
        action: 'navigate'
      });

      results.push({
        id: 'diet-calories',
        type: 'diet',
        title: 'حاسبة ومؤقت حرق السعرات الحرارية الرياضية',
        subtitle: 'حساب استهلاك السعرات بدقة بحسب الوزن والجهد المبذول',
        category: 'الأدوات الرياضية',
        badge: 'حاسبة السعرات',
        targetTab: 'calories',
        action: 'navigate'
      });
    }

    // 6. Exercises from EXERCISE_DATABASE
    Object.values(EXERCISE_DATABASE).forEach((ex) => {
      const matchName = ex.name.toLowerCase().includes(q);
      const matchMuscle = ex.targetMuscle.toLowerCase().includes(q);
      const matchDetail = (ex.targetMuscleDetail || '').toLowerCase().includes(q);
      const matchEquip = (ex.equipment || '').toLowerCase().includes(q);
      const matchAlt = (ex.alternatives || []).some(a => 
        a.name.toLowerCase().includes(q) || 
        a.equipment.toLowerCase().includes(q) ||
        (a.typeLabel || '').toLowerCase().includes(q)
      );

      if (matchName || matchMuscle || matchDetail || matchEquip || matchAlt) {
        results.push({
          id: `ex-${ex.id}`,
          type: 'exercise',
          title: ex.name,
          subtitle: `${ex.targetMuscle} ${ex.targetMuscleDetail ? `(${ex.targetMuscleDetail})` : ''} • ${ex.equipment || 'حر/ماكينة'} • ${ex.sets}`,
          category: 'تمارين الجيم',
          badge: ex.targetMuscle,
          imageUrl: getAccurateExerciseImage(ex),
          exerciseData: ex,
          action: 'exercise'
        });
      }
    });

    return results.slice(0, 15);
  }, [query]);

  const handleResultClick = (item: SearchResultItem) => {
    setIsFocused(false);
    setQuery('');

    if (item.action === 'exercise' && item.exerciseData) {
      onOpenExerciseModal(item.exerciseData);
    } else if (item.action === 'payment') {
      onOpenBankPayment();
    } else if (item.action === 'coach') {
      if (onOpenCoachModal) onOpenCoachModal();
    } else if (item.action === 'management') {
      if (onOpenManagementModal) onOpenManagementModal();
    } else if (item.action === 'facebook') {
      window.open(GYM_FACEBOOK_URL, '_blank');
    } else if (item.action === 'navigate' && item.targetTab) {
      onSelectTab(item.targetTab);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} dir="rtl">
      {/* Search Input Bar */}
      <div className={`relative flex items-center bg-neutral-900/95 border rounded-2xl transition-all duration-300 shadow-lg ${
        isFocused 
          ? 'border-amber-500 ring-2 ring-amber-500/30 bg-neutral-900' 
          : 'border-neutral-800 hover:border-neutral-700'
      }`}>
        <div className="flex items-center justify-center pr-3.5 pl-2 text-neutral-400">
          <Search className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isFocused ? 'text-amber-400' : 'text-neutral-400'}`} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="ابحث في التطبيق (تمارين، عضلات، جداول، تضخيم، حساب شمال أفريقيا، مواعيد...)"
          className="w-full py-2.5 sm:py-3 pr-1 pl-10 text-xs sm:text-sm text-white placeholder-neutral-400 bg-transparent outline-none font-medium"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="p-1.5 ml-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
            title="مسح البحث"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="hidden md:flex items-center gap-1 ml-3 text-[10px] text-neutral-500 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700 font-mono">
            <span>بحث فوري</span>
          </div>
        )}
      </div>

      {/* Dropdown / Modal Results Panel */}
      {isFocused && (
        <div className="absolute top-full right-0 left-0 mt-2 bg-neutral-950/98 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[75vh] flex flex-col animate-in fade-in-50 duration-200">
          
          {/* Quick Filter Tag Pills */}
          <div className="p-2.5 sm:p-3 bg-neutral-900/90 border-b border-neutral-800">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>اقتراحات سريعة للبحث:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => {
                    setQuery(tag.term);
                    inputRef.current?.focus();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-amber-500/20 hover:text-amber-300 border border-neutral-700 text-neutral-300 text-xs font-semibold transition cursor-pointer"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-2 space-y-1.5 divide-y divide-neutral-900">
            {query.trim() === '' ? (
              <div className="p-6 text-center text-neutral-400 space-y-2">
                <Search className="w-8 h-8 mx-auto text-neutral-600 mb-1" />
                <p className="text-xs sm:text-sm font-bold text-neutral-300">
                  اكتب اسم أي تمرين، عضلة، جدول تدريب، أو خدمة في الصالة
                </p>
                <p className="text-[11px] text-neutral-500">
                  مثال: بنش برس، سحب ظهر، بايسبس، جدول 5 أيام، تحويل شمال أفريقيا، مواعيد
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-6 text-center text-neutral-400 space-y-2">
                <p className="text-sm font-bold text-neutral-300">
                  لم يتم العثور على نتائج مطابقة لـ "{query}"
                </p>
                <p className="text-xs text-neutral-500">
                  جرّب البحث باسم العضلة مثل: (صدر، ظهر، أرجل، أكتاف، بطن) أو عن الدفع والمواعيد
                </p>
              </div>
            ) : (
              searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item)}
                  className="p-2.5 sm:p-3 rounded-xl hover:bg-neutral-900/90 border border-transparent hover:border-neutral-800 transition flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Thumbnail or Icon */}
                    {item.imageUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-neutral-800 bg-neutral-900">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                        item.type === 'payment'
                          ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                          : item.type === 'plan'
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                          : item.type === 'diet'
                          ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                          : 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                      }`}>
                        {item.type === 'payment' && <Building2 className="w-5 h-5" />}
                        {item.type === 'plan' && <Dumbbell className="w-5 h-5" />}
                        {item.type === 'diet' && <Apple className="w-5 h-5" />}
                        {item.type === 'info' && <Facebook className="w-5 h-5" />}
                      </div>
                    )}

                    {/* Text Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-black text-white truncate group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h4>
                        {item.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-bold shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Action Indicator */}
                  <div className="shrink-0 text-neutral-500 group-hover:text-amber-400 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Bank & Contacts Footer in Search Bar */}
          <div className="p-2.5 bg-neutral-900/90 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>مصرف شمال أفريقيا: <strong className="text-amber-400 font-mono" dir="ltr">{BANK_DETAILS.accountNumber}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsFocused(false);
                  onOpenBankPayment();
                }}
                className="text-xs text-amber-400 font-bold hover:underline cursor-pointer"
              >
                الدفع 💳
              </button>
              <span>•</span>
              {onOpenCoachModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsFocused(false);
                    onOpenCoachModal();
                  }}
                  className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  كوتش عبدالرحمن 🏋️
                </button>
              )}
              <span>•</span>
              {onOpenManagementModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsFocused(false);
                    onOpenManagementModal();
                  }}
                  className="text-xs text-blue-400 font-bold hover:underline cursor-pointer"
                >
                  إدارة الصالة 🏢
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
