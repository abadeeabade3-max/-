import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveStatusBanner } from './components/LiveStatusBanner';
import { ScheduleSection } from './components/ScheduleSection';
import { WorkoutPlansSection } from './components/WorkoutPlansSection';
import { CalorieSection } from './components/CalorieSection';
import { DietPlansSection } from './components/DietPlansSection';
import { SubscriptionSection } from './components/SubscriptionSection';
import { WomenFitnessGuide } from './components/WomenFitnessGuide';
import { PowerGymLogo } from './components/PowerGymLogo';
import { InstallAppModal } from './components/InstallAppModal';
import { ShareAppModal } from './components/ShareAppModal';
import { BankPaymentModal } from './components/BankPaymentModal';
import { ManagementContactModal } from './components/ManagementContactModal';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { getCurrentGymStatus, GYM_NAME, GYM_LOCATION_URL, GYM_FACEBOOK_URL, COACH_FACEBOOK_URL, COACH_NAME, GYM_RULES, BANK_DETAILS } from './data/gymData';
import { CurrentStatusInfo, ExerciseItem } from './types';
import { 
  Dumbbell, 
  Clock, 
  Calendar, 
  Flame, 
  Apple, 
  CreditCard, 
  MapPin, 
  Facebook, 
  MessageCircle, 
  ShieldCheck, 
  Info, 
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X,
  Smartphone,
  Download,
  Heart,
  Building2,
  Share2,
  FolderArchive
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentStatus, setCurrentStatus] = useState<CurrentStatusInfo>(getCurrentGymStatus());
  const [dietPlanType, setDietPlanType] = useState<'gain' | 'lose'>('gain');
  const [isCoachModalOpen, setIsCoachModalOpen] = useState<boolean>(false);
  const [isManagementModalOpen, setIsManagementModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isBankPaymentModalOpen, setIsBankPaymentModalOpen] = useState<boolean>(false);
  const [exerciseForModal, setExerciseForModal] = useState<ExerciseItem | null>(null);
  const [showBottomBanner, setShowBottomBanner] = useState<boolean>(true);

  // Update gym open/close status every 30 seconds
  useEffect(() => {
    const update = () => setCurrentStatus(getCurrentGymStatus());
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStartWorkoutBurnTimer = (workoutTitle: string) => {
    setActiveTab('calories');
  };

  const handleNavigateToDiet = (type: 'gain' | 'lose') => {
    setDietPlanType(type);
    setActiveTab('diets');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-emerald-500 selection:text-neutral-950 font-sans pb-16 sm:pb-0" dir="rtl">
      {/* Header */}
      <Header
        currentStatus={currentStatus}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCoachModal={() => setIsCoachModalOpen(true)}
        onOpenManagementModal={() => setIsManagementModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenBankPayment={() => setIsBankPaymentModalOpen(true)}
        onOpenExerciseModal={(ex) => setExerciseForModal(ex)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Navigation Tabs Bar for Mobile and Quick Switching */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-800/80">
          {[
            { id: 'home', label: 'الرئيسية والمواعيد', icon: Clock },
            { id: 'workouts', label: 'جداول التمارين (رجال/عام)', icon: Dumbbell, highlight: true },
            { id: 'women', label: 'تمارين النساء 🌸', icon: Heart, highlight: true, isRose: true },
            { id: 'calories', label: 'حاسبة ومؤقت السعرات', icon: Flame },
            { id: 'diets', label: 'الأنظمة الغذائية', icon: Apple },
            { id: 'subscription', label: 'إدارة اشتراكي', icon: CreditCard },
            { id: 'gym-info', label: 'قوانين ومعلومات الصالة', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? tab.isRose
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/20'
                    : tab.isRose
                    ? 'bg-rose-950/40 text-rose-300 hover:text-white hover:bg-rose-900/60 border border-rose-800/40'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850 border border-neutral-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${tab.isRose ? 'text-rose-400' : ''}`} />
                <span>{tab.label}</span>
                {tab.highlight && !isActive && (
                  <span className={`w-2 h-2 rounded-full animate-pulse ${tab.isRose ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Live Gym Open/Close Status */}
            <LiveStatusBanner
              currentStatus={currentStatus}
              onNavigateToSchedule={() => setActiveTab('home')}
              onNavigateToWorkout={() => setActiveTab('workouts')}
            />

            {/* Direct APK, GitHub ZIP & Easy Install Helper Banner */}
            <div 
              onClick={() => setIsInstallModalOpen(true)}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 via-neutral-900 to-emerald-950/40 border border-purple-500/40 hover:border-purple-400 transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-purple-500/5 group"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition">
                  <FolderArchive className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm sm:text-base font-black text-white group-hover:text-purple-300 transition">
                      حزمة GitHub وملف الـ ZIP الشامل • مع ملف APK مباشر 🐙📦
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      دعم جميع إصدارات الهواتف ⚡
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      مشاركة مباشرة للأصدقاء 📲
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    حزمة ZIP جاهزة لمستودع GitHub مع نشر فوري على GitHub Pages، وبناء APK تلقائياً عبر GitHub Actions يعمل على كافة هواتف أندرويد وآيفون، بالإضافة إلى دليل خطوة بخطوة لتجاوز حظر أمان أندرويد (Play Protect).
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsInstallModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تثبيت وتحميل الحزمة (ZIP & APK) 📦</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsShareModalOpen(true);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/15 cursor-pointer"
                  title="مشاركة رابط التطبيق المباشر مع الأصدقاء بدون Google AI Studio"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة للأصدقاء 📲</span>
                </button>
              </div>
            </div>

            {/* Quick Action Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Workouts with Real Photos */}
              <div 
                onClick={() => setActiveTab('workouts')}
                className="bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 p-6 rounded-2xl transition cursor-pointer group hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 mb-2">
                  صور واقعية طبيعية 📸
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
                  جداول التمارين المصورة
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  برامج 4 أيام (Push-Pull) و5 أيام و3 أيام مع صور واقعية وعضلات مستهدفة وشرح الأداء.
                </p>
              </div>

              {/* Card 2: Diet Plans */}
              <div 
                onClick={() => setActiveTab('diets')}
                className="bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 p-6 rounded-2xl transition cursor-pointer group hover:shadow-xl hover:shadow-orange-500/5"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition">
                  <Apple className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 mb-2">
                  زيادة وتنشيف 🥗
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition">
                  الأنظمة الغذائية الرياضية
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  نظام زيادة الوزن والضخامة النظيفة ونظام إنقاص الوزن وحرق الدهون ونحت القوام.
                </p>
              </div>

              {/* Card 3: Calories & Workout Timer */}
              <div 
                onClick={() => setActiveTab('calories')}
                className="bg-neutral-900 border border-neutral-800 hover:border-red-500/50 p-6 rounded-2xl transition cursor-pointer group hover:shadow-xl hover:shadow-red-500/5"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition">
                  <Flame className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 mb-2">
                  حاسبة دقيقة + مؤقت 🔥
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">
                  حساب وحرق السعرات
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  احسب احتياجك اليومي من السعرات ومؤقت زمني لحساب السعرات أثناء التمارين الحية.
                </p>
              </div>

              {/* Card 4: Women's Special Section */}
              <div 
                onClick={() => setActiveTab('women')}
                className="bg-neutral-900 border border-rose-500/30 hover:border-rose-500 p-6 rounded-2xl transition cursor-pointer group hover:shadow-xl hover:shadow-rose-500/10 relative overflow-hidden"
              >
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 mb-2">
                  تمارين النساء • 3 أيام • تغذية ودورة 🌸
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition">
                  تمارين النساء ونحت القوام
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  جداول 3 أيام بخيارات متعددة، نصائح غذائية وقت الدورة الشهرية، وخطط إنقاص أو زيادة الوزن.
                </p>
              </div>

              {/* Card 5: Subscription Card */}
              <div 
                onClick={() => setActiveTab('subscription')}
                className="bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 p-6 rounded-2xl transition cursor-pointer group hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 mb-2">
                  بطاقة المتدرب 🎫
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                  إدارة ومتابعة الاشتراكات
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  تتبع تاريخ انتهاء الاشتراك، الأيام المتبقية، وتنبيهات التجديد وطباعة البطاقة.
                </p>
              </div>
            </div>

            {/* Weekly Schedule Section */}
            <ScheduleSection />
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === 'workouts' && (
          <WorkoutPlansSection onStartWorkoutBurnTimer={handleStartWorkoutBurnTimer} />
        )}

        {/* Women Fitness & Menstrual Cycle Guide Tab */}
        {activeTab === 'women' && (
          <WomenFitnessGuide />
        )}

        {/* Calories Tab */}
        {activeTab === 'calories' && (
          <CalorieSection onNavigateToDiet={handleNavigateToDiet} />
        )}

        {/* Diets Tab */}
        {activeTab === 'diets' && (
          <DietPlansSection initialPlanType={dietPlanType} />
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <SubscriptionSection
            onOpenCoachModal={() => setIsCoachModalOpen(true)}
            onOpenManagementModal={() => setIsManagementModalOpen(true)}
          />
        )}

        {/* Gym Info & Rules Tab */}
        {activeTab === 'gym-info' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <PowerGymLogo size="lg" className="shrink-0" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    {GYM_NAME}
                  </h2>
                  <p className="text-neutral-300 text-sm mt-1 leading-relaxed">
                    صالة القوة واللياقة البدنية الأولى، مجهزة بأحدث الآلات الرياضية وأوزان متنوعة ومدربين معتمدين لمساعدتك على تحقيق أهدافك البدنية والرياضية.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <a
                      href={GYM_LOCATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm transition"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>موقع الصالة على خرائط جوجل</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={GYM_FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>صفحة الصالة على فيسبوك</span>
                    </a>
                    <a
                      href={COACH_FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs sm:text-sm border border-neutral-700 transition"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>تواصل مع {COACH_NAME}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Gym Rules Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white">
                  القوانين والتعليمات الداخلية لصالة باور جيم
                </h3>
              </div>
              <p className="text-xs text-neutral-400">
                حرصاً منا على توفير بيئة رياضية نظيفة وآمنة ومحترمة لجميع المتدربين، يرجى الالتزام الصارم بالتعليمات التالية:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {GYM_RULES.map((rule, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                      {rule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* North Africa Bank Card in Gym Info */}
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border border-amber-500/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>خدمات الدفع والتحويل المصرفي</span>
                </div>
                <h4 className="text-xl font-black text-white font-heading">
                  مصرف شمال أفريقيا — رقم الحساب: {BANK_DETAILS.accountNumber}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
                  يمكنك تسديد قيمة اشتراكك وتجديد بطاقتك مباشرة عبر تطبيق نافس أو تحويل الحساب وإرسال الإيصال لصفحة فيسبوك الصالة.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsBankPaymentModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs sm:text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  فتح تفاصيل التحويل والنسخ 💳
                </button>
                <a
                  href={GYM_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm transition shadow"
                >
                  صفحة فيسبوك 🔗
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-8 px-4 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <PowerGymLogo size="sm" />
            <span className="text-neutral-400 font-bold">باور جيم - POWER GYM</span>
            <span>•</span>
            <span>جميع الحقوق محفوظة {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsBankPaymentModalOpen(true)}
              className="text-amber-400 hover:underline font-bold transition cursor-pointer"
            >
              حساب شمال أفريقيا ({BANK_DETAILS.accountNumber}) 💳
            </button>
            <button
              onClick={() => setIsCoachModalOpen(true)}
              className="text-emerald-400 hover:underline font-bold transition cursor-pointer"
            >
              تواصل مع كوتش عبدالرحمن 🏋️
            </button>
            <button
              onClick={() => setIsManagementModalOpen(true)}
              className="text-blue-400 hover:underline font-bold transition cursor-pointer"
            >
              تواصل مع إدارة الصالة 🏢
            </button>
            <a
              href={GYM_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-400 transition"
            >
              فيسبوك الصالة
            </a>
            <a
              href={GYM_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-emerald-400 transition"
            >
              الموقع
            </a>
          </div>
        </div>
      </footer>

      {/* North Africa Bank Payment Modal */}
      <BankPaymentModal
        isOpen={isBankPaymentModalOpen}
        onClose={() => setIsBankPaymentModalOpen(false)}
        onOpenCoachModal={() => setIsCoachModalOpen(true)}
        onOpenManagementModal={() => setIsManagementModalOpen(true)}
      />

      {/* Management Contact Modal */}
      <ManagementContactModal
        isOpen={isManagementModalOpen}
        onClose={() => setIsManagementModalOpen(false)}
        onOpenCoachModal={() => setIsCoachModalOpen(true)}
        onOpenBankPayment={() => setIsBankPaymentModalOpen(true)}
      />

      {/* Global Exercise Detail Modal (Triggered by Search or Exercise selection) */}
      {exerciseForModal && (
        <ExerciseDetailModal
          isOpen={true}
          exercise={exerciseForModal}
          onClose={() => setExerciseForModal(null)}
        />
      )}

      {/* Coach Contact Modal */}
      {isCoachModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xl">
                  🏋️
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{COACH_NAME}</h3>
                  <p className="text-xs text-neutral-400">المدرب والمشرف الفني لصالة باور جيم</p>
                </div>
              </div>
              <button
                onClick={() => setIsCoachModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              للاستفسار عن جداول التمارين، الاشتراكات الشهرية، أو طلب استشارة تدريبية أو غذائية خاصة، يمكنك التواصل مباشرة مع الكوتش عبر حسابه الشخصي على فيسبوك.
            </p>

            <div className="space-y-2.5">
              <a
                href={COACH_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition"
              >
                <Facebook className="w-4 h-4" />
                <span>مراسلة الكوتش على فيسبوك</span>
                <ExternalLink className="w-3.5 h-3.5 mr-auto" />
              </a>

              <a
                href={GYM_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-sm border border-neutral-700 transition"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>عرض موقع الصالة والاتجاهات</span>
                <ExternalLink className="w-3.5 h-3.5 mr-auto" />
              </a>
            </div>

            <button
              onClick={() => setIsCoachModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-xs font-semibold text-neutral-400 hover:text-white transition cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Quick Install Bar on Mobile */}
      {showBottomBanner && (
        <div className="fixed bottom-3 inset-x-3 sm:hidden z-40 bg-neutral-900/95 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 animate-fadeIn">
          <div 
            onClick={() => setIsInstallModalOpen(true)}
            className="flex items-center gap-2.5 overflow-hidden cursor-pointer flex-1"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-neutral-950 font-black text-sm shrink-0 shadow">
              📱
            </div>
            <div className="truncate">
              <p className="text-xs font-black text-white truncate">تثبيت باور جيم / تحميل APK</p>
              <p className="text-[10px] text-emerald-400 truncate">تثبيت سهل ومضمون على هاتفك ⚡</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 text-neutral-950 font-black text-xs hover:bg-emerald-400 transition cursor-pointer shadow-md"
            >
              فتح
            </button>
            <button
              onClick={() => setShowBottomBanner(false)}
              className="p-1.5 text-neutral-400 hover:text-white transition cursor-pointer"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Install App Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Share App Modal for Friends */}
      <ShareAppModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />
    </div>
  );
}
