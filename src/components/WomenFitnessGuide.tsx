import React, { useState } from 'react';
import { 
  WOMEN_3DAY_PROGRAMS, 
  WOMEN_WEIGHT_LOSS_PLAN, 
  WOMEN_WEIGHT_GAIN_PLAN, 
  WOMEN_NUTRITION_DATA, 
  MENSTRUAL_CYCLE_GUIDE 
} from '../data/womenData';
import { WomenWorkoutDay, WomenExercise, WomenProgramOption, CyclePhaseInfo } from '../types';
import { getAccurateExerciseImage } from '../utils/exerciseImages';
import { 
  Sparkles, 
  Dumbbell, 
  Apple, 
  Flame, 
  Heart, 
  Calendar, 
  Info, 
  Coffee, 
  ShieldCheck, 
  Award,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Droplets,
  Layers,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check
} from 'lucide-react';

interface WomenFitnessGuideProps {
  onSelectExerciseDetail?: (exercise: any) => void;
}

export const WomenFitnessGuide: React.FC<WomenFitnessGuideProps> = ({ onSelectExerciseDetail }) => {
  // Navigation tabs
  const [activeSection, setActiveSection] = useState<'workout' | 'cycle' | 'weight-loss' | 'weight-gain' | 'nutrition'>('workout');
  
  // Programs State: multiple 3-day options
  const [selectedProgramId, setSelectedProgramId] = useState<string>(WOMEN_3DAY_PROGRAMS[0].id);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Menstrual Cycle state
  const [selectedCyclePhase, setSelectedCyclePhase] = useState<string>('menstrual');
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [calculatedPhase, setCalculatedPhase] = useState<string | null>(null);
  const [dayOfCycle, setDayOfCycle] = useState<number | null>(null);

  const calculatePhase = () => {
    if (!lastPeriodDate) return;
    const start = new Date(lastPeriodDate);
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    if (diffTime < 0) return;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const currentDay = (diffDays % cycleLength) + 1;
    setDayOfCycle(currentDay);

    if (currentDay >= 1 && currentDay <= 5) {
      setCalculatedPhase('menstrual');
      setSelectedCyclePhase('menstrual');
    } else if (currentDay >= 6 && currentDay <= 13) {
      setCalculatedPhase('follicular');
      setSelectedCyclePhase('follicular');
    } else if (currentDay >= 14 && currentDay <= 16) {
      setCalculatedPhase('ovulation');
      setSelectedCyclePhase('ovulation');
    } else {
      setCalculatedPhase('luteal');
      setSelectedCyclePhase('luteal');
    }
  };

  const currentProgram = WOMEN_3DAY_PROGRAMS.find(p => p.id === selectedProgramId) || WOMEN_3DAY_PROGRAMS[0];
  const currentWorkoutDay = currentProgram.days[selectedDayIndex] || currentProgram.days[0];
  const currentCycleInfo = MENSTRUAL_CYCLE_GUIDE.find(p => p.phaseId === selectedCyclePhase) || MENSTRUAL_CYCLE_GUIDE[0];

  return (
    <div className="space-y-8" dir="rtl">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-neutral-900 to-neutral-950 border border-rose-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>قسم السيدات الشامل • جداول 3 أيام وتغذية متخصصة</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              تمارين النساء ونحت القوام 🌸
            </h1>
            <p className="text-sm sm:text-base text-rose-100/80 leading-relaxed">
              جداول تدريب 3 أيام بالأسبوع بأكثر من خيار لاحتياجك (نحت الألوية والخصر، حرق الدهون، أو زيادة الوزن وبناء المنحنيات)، مع نصائح تغذية علمية وقت الدورة الشهرية وأنظمة مخصصة لنزول أو زيادة الوزن.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/90 border border-rose-500/20 text-center min-w-[200px]">
            <div className="text-xs text-rose-300 font-semibold mb-1">البرنامج المعتمد</div>
            <div className="text-lg font-black text-white">3 أيام في الأسبوع</div>
            <div className="text-xs text-neutral-400 mt-1">راحة 4 أيام لاستشفاء الهرمونات</div>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-rose-500/20">
          <button
            onClick={() => setActiveSection('workout')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSection === 'workout'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>تمارين النساء (جداول 3 أيام)</span>
          </button>

          <button
            onClick={() => setActiveSection('cycle')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSection === 'cycle'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <Droplets className="w-4 h-4 text-rose-400" />
            <span>نصائح الدورة الشهرية 🩸</span>
          </button>

          <button
            onClick={() => setActiveSection('weight-loss')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSection === 'weight-loss'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span>إنقاص الوزن وحرق الدهون 🔥</span>
          </button>

          <button
            onClick={() => setActiveSection('weight-gain')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSection === 'weight-gain'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>زيادة الوزن والمنحنيات 🥑</span>
          </button>

          <button
            onClick={() => setActiveSection('nutrition')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSection === 'nutrition'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>التغذية العامة والمغذيات 🥗</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. قسم تمارين النساء (3 أيام بخيارات متعددة) */}
      {/* ============================================================== */}
      {activeSection === 'workout' && (
        <div className="space-y-6">
          {/* Track / Option Selector Header */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-rose-400 tracking-wider">اختاري هدفك من التدريب</span>
                <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                  جدول تمارين النساء 3 أيام (3 خيارات متخصصة)
                </h2>
              </div>
              <div className="text-xs text-neutral-400 bg-neutral-800/80 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                {currentProgram.frequency}
              </div>
            </div>

            {/* Program Track Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {WOMEN_3DAY_PROGRAMS.map((prog, idx) => {
                const isSelected = prog.id === selectedProgramId;
                return (
                  <button
                    key={prog.id}
                    onClick={() => {
                      setSelectedProgramId(prog.id);
                      setSelectedDayIndex(0);
                    }}
                    className={`p-4 rounded-2xl border text-right transition cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-rose-500/10 border-rose-500 text-white ring-1 ring-rose-500/40 shadow-lg shadow-rose-500/10'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-rose-500 text-white' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          الخيار {idx + 1}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-rose-400" />}
                      </div>
                      <h3 className="text-sm font-black text-white leading-tight">
                        {prog.name.split(':')[1]?.trim() || prog.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                        {prog.description}
                      </p>
                    </div>

                    <div className="text-[11px] text-rose-300/90 font-medium pt-2 border-t border-neutral-800/60">
                      مناسب لـ: {prog.idealFor}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Days of the Selected Program */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {currentProgram.days.map((day, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`flex-1 min-w-[170px] p-3.5 rounded-2xl border text-right transition cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-rose-500/20 to-neutral-900 border-rose-500 text-white shadow-md'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-[11px] font-bold text-rose-400">{day.dayName}</div>
                  <div className="text-xs font-black text-white truncate mt-0.5">{day.title}</div>
                  <div className="text-[10px] text-neutral-400 mt-1">{day.badge}</div>
                </button>
              );
            })}
          </div>

          {/* Active Day Detail Header */}
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-rose-950/40 border border-neutral-800 rounded-3xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-2">
                  {currentWorkoutDay.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentWorkoutDay.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                  {currentWorkoutDay.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-950/80 px-4 py-2 rounded-2xl border border-neutral-800 self-start sm:self-auto">
                <Dumbbell className="w-4 h-4 text-rose-400" />
                <span>{currentWorkoutDay.exercises.length} تمارين مدروسة</span>
              </div>
            </div>
          </div>

          {/* Exercises List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentWorkoutDay.exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="bg-neutral-900/90 border border-neutral-800 hover:border-rose-500/50 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                {/* Media Preview (GIF or Image) */}
                <div className="relative h-52 bg-neutral-950 overflow-hidden flex items-center justify-center">
                  {exercise.animationUrl ? (
                    <img
                      src={exercise.animationUrl}
                      alt={exercise.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={getAccurateExerciseImage(exercise)}
                      alt={exercise.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-900/90 text-white border border-neutral-700 text-xs font-black">
                      #{index + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/90 text-white text-xs font-bold">
                      {exercise.category === 'machine' ? 'ماكينة' : exercise.category === 'free' ? 'حر بالدمبل/بار' : 'وزن الجسم'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 left-3">
                    <span className="text-[11px] font-bold text-rose-300">
                      {exercise.targetMuscle}
                    </span>
                    <h4 className="text-base font-black text-white leading-snug">
                      {exercise.name}
                    </h4>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800">
                      <span className="text-neutral-400 font-medium">المجموعات والتكرارات:</span>
                      <span className="text-rose-400 font-bold">{exercise.sets}</span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-800/60">
                      <strong className="text-rose-300">التأثير والهدف: </strong>
                      {exercise.targetMuscleDetail}
                    </p>

                    {/* Execution Steps */}
                    {exercise.executionSteps && exercise.executionSteps.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold text-neutral-400">خطوات الأداء السليم:</div>
                        <ul className="text-xs text-neutral-300 space-y-1 pr-2">
                          {exercise.executionSteps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5 leading-relaxed">
                              <span className="text-rose-400 font-bold text-xs shrink-0">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Coach Tip */}
                    {exercise.tips && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300">نصيحة الكوتش: </strong>
                          {exercise.tips}
                        </div>
                      </div>
                    )}

                    {/* Alternatives */}
                    {exercise.alternatives && exercise.alternatives.length > 0 && (
                      <div className="pt-2 border-t border-neutral-800/80">
                        <div className="text-[11px] font-bold text-neutral-400 mb-1.5">بدائل متوفرة في صالة باور جيم:</div>
                        <div className="space-y-1.5">
                          {exercise.alternatives.map((alt, aIdx) => (
                            <div key={aIdx} className="text-xs bg-neutral-950 p-2 rounded-xl border border-neutral-800 flex items-center justify-between">
                              <span className="text-neutral-200 font-medium">{alt.name}</span>
                              <span className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                {alt.typeLabel}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. قسم نصائح الدورة الشهرية والتغذية والتدريب الهرموني */}
      {/* ============================================================== */}
      {activeSection === 'cycle' && (
        <div className="space-y-8">
          {/* Top Alert & Direct Menstrual Nutrition Guide */}
          <div className="bg-gradient-to-r from-rose-950/60 via-neutral-900 to-neutral-950 border border-rose-500/40 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-300">دليل التغذية الهرمونية المتخصص</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  نصائح غذائية هامة عند الدورة الشهرية 🩸
                </h2>
              </div>
            </div>

            {/* 4 Essential Menstrual Nutrition Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Coffee className="w-4 h-4" />
                  <span>المشروبات الساخنة المسكنة</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  مغلي <strong>الزنجبيل الطازج</strong> يسكن تقلصات الرحم بمفعول يضاهي المسكنات. مغلي <strong>القرفة والبابونج</strong> لتهدئة المغص والنفخة والقولون.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Heart className="w-4 h-4" />
                  <span>تعويض فاقد الحديد</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  تناولي الكبدة، اللحم البقري الصافي، العدس والسبانخ مع <strong>عصرة ليمون</strong> (فيتامين C لرفع امتصاص الحديد 3 أضعاف) لمنع الدوخة والإجهاد.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>المغنيسيوم لفك التشنج</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  المغنيسيوم يرخي عضلات الرحم المشدودة ويحسن المزاج. مصدره الرائع: <strong>الشوكولاتة الداكنة (85%+)</strong>، اللوز، الموز، وبذور الشيا.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>قائمة الممنوعات وقت الدورة</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  تجنبي <strong>الملح الزائد والمخللات</strong> (تسبب انتفاخاً وتورماً)، قللي الكافيين الحاد، وابتعدي عن المقليات التي ترفع الالتهاب والمغص.
                </p>
              </div>
            </div>

            {/* Smart Craving Management Box */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-rose-200">حل ذكي لشراهة السكريات والشوكولاتة أثناء الدورة 🍫</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  ارتفاع رغبة السكريات ناتج عن طلب الجسم لطاقة ومغنيسيوم؛ البديل المثالي هو: مربعان شوكولاتة داكنة 85%+، أو تمرتان محشوتان بزبدة فول سوداني ورشة قرفة.
                </p>
              </div>
              <span className="text-xs font-black text-rose-400 bg-rose-950/80 px-3 py-1.5 rounded-xl border border-rose-500/30 whitespace-nowrap self-start sm:self-auto">
                طاقة نقية بدون تأنيب ضمير
              </span>
            </div>
          </div>

          {/* Interactive Period Calculator Card */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-rose-400">حاسبة الطور الهرموني اليومي</span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  أين أنتِ اليوم في دورتكِ الشهرية؟ (Cycle Syncing)
                </h3>
              </div>
              <span className="text-xs text-neutral-400">تزامن التغذية والتدريب مع إيقاعك البيولوجي</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2">
                  تاريخ أول يوم في آخر دورة شهرية:
                </label>
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2">
                  متوسط طول دورتكِ (بالأيام):
                </label>
                <select
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  {[24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map(days => (
                    <option key={days} value={days}>{days} يوماً (الافتراضي 28)</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={calculatePhase}
                  disabled={!lastPeriodDate}
                  className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>تحديد الطور الحالي والنصائح فوراً</span>
                </button>
              </div>
            </div>

            {dayOfCycle && calculatedPhase && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-sm">
                    {dayOfCycle}
                  </div>
                  <div>
                    <div className="text-xs text-rose-300">أنتِ اليوم في اليوم {dayOfCycle} من الدورة:</div>
                    <div className="text-sm font-black text-white">
                      {MENSTRUAL_CYCLE_GUIDE.find(p => p.phaseId === calculatedPhase)?.nameAr}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-400 bg-rose-950 px-3 py-1 rounded-full border border-rose-500/30">
                  تم تحديث النصائح أدناه
                </span>
              </div>
            )}
          </div>

          {/* 4 Phases Detailed Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white">
              الأطوار الأربعة: خطة التغذية والتمارين طوال الشهر
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MENSTRUAL_CYCLE_GUIDE.map((phase) => (
                <button
                  key={phase.phaseId}
                  onClick={() => setSelectedCyclePhase(phase.phaseId)}
                  className={`p-3 rounded-2xl border text-right transition cursor-pointer ${
                    selectedCyclePhase === phase.phaseId
                      ? 'bg-rose-500/20 border-rose-500 text-white shadow-md'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-[11px] font-bold text-rose-400">{phase.daysRange}</div>
                  <div className="text-xs font-black text-white truncate mt-1">{phase.nameAr.split('.')[1] || phase.nameAr}</div>
                  <div className="text-[10px] text-neutral-400 mt-1">طاقة: {phase.energyLevel}</div>
                </button>
              ))}
            </div>

            {/* Active Phase Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-xs font-bold text-rose-400">{currentCycleInfo.daysRange}</span>
                  <h4 className="text-xl font-black text-white mt-1">{currentCycleInfo.nameAr}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 text-neutral-300">
                    مستوى الطاقة: <strong className="text-rose-400">{currentCycleInfo.energyLevel}</strong>
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950 text-xs text-neutral-300 leading-relaxed border border-neutral-800/80">
                <strong className="text-rose-300">الحالة الهرمونية في هذا الطور: </strong>
                {currentCycleInfo.hormoneStatus}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Training Column */}
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <Dumbbell className="w-4 h-4" />
                    <span>تمارين موصى بها في هذا الطور</span>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {currentCycleInfo.trainingAdvice.recommended.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-neutral-800">
                    <div className="text-[11px] font-bold text-rose-400 mb-2">تجنبي في هذا الطور:</div>
                    <ul className="space-y-1.5 text-xs text-neutral-400">
                      {currentCycleInfo.trainingAdvice.avoid.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
                    <strong>رسالة الكوتش: </strong> {currentCycleInfo.trainingAdvice.coachNote}
                  </div>
                </div>

                {/* Nutrition Column */}
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <Apple className="w-4 h-4" />
                    <span>تغذية وأطعمة هذا الطور</span>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-neutral-400 mb-1.5">العناصر الغذائية المفتاحية:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentCycleInfo.nutritionAdvice.keyNutrients.map((n, idx) => (
                        <span key={idx} className="text-xs bg-rose-500/10 text-rose-300 px-2.5 py-0.5 rounded-lg border border-rose-500/20">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-300">
                    {currentCycleInfo.nutritionAdvice.recommendedFoods.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-neutral-800">
                    <div className="text-[11px] font-bold text-neutral-400 mb-2">مشروبات دافئة موصى بها:</div>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {currentCycleInfo.nutritionAdvice.warmDrinks.map((drink, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Coffee className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{drink}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
                    <strong className="text-amber-300">نصيحة شراهة الطعام: </strong> {currentCycleInfo.nutritionAdvice.cravingTips}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. قسم إنقاص الوزن وحرق الدهون للنساء */}
      {/* ============================================================== */}
      {activeSection === 'weight-loss' && (
        <div className="space-y-8">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 tracking-wider">خطة حرق الدهون ونحت القوام</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {WOMEN_WEIGHT_LOSS_PLAN.title}
                </h2>
              </div>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {WOMEN_WEIGHT_LOSS_PLAN.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-emerald-500/20">
                <div className="text-xs text-emerald-400 font-bold mb-1">عجز السعرات الذكي (Deficit)</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {WOMEN_WEIGHT_LOSS_PLAN.targetCaloriesNote}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-emerald-500/20">
                <div className="text-xs text-emerald-400 font-bold mb-1">قاعدة البروتين ونحت الألوية</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {WOMEN_WEIGHT_LOSS_PLAN.proteinRule}
                </div>
              </div>
            </div>
          </div>

          {/* Key Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WOMEN_WEIGHT_LOSS_PLAN.keyPrinciples.map((item, idx) => (
              <div key={idx} className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Special Recipe: Green Fat Burner Smoothie */}
          {WOMEN_WEIGHT_LOSS_PLAN.specialRecipe && (
            <div className="bg-gradient-to-r from-neutral-900 via-emerald-950/20 to-neutral-900 border border-emerald-500/30 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400">وصفة سحرية سريعة التحضير</span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {WOMEN_WEIGHT_LOSS_PLAN.specialRecipe.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800 space-y-2">
                  <div className="text-xs font-bold text-neutral-300">المكونات:</div>
                  <ul className="text-xs text-neutral-300 space-y-1">
                    {WOMEN_WEIGHT_LOSS_PLAN.specialRecipe.ingredients.map((ing, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-neutral-300">طريقة الاستخدام:</div>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      {WOMEN_WEIGHT_LOSS_PLAN.specialRecipe.prep}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200">
                    <strong>الفائدة: </strong> {WOMEN_WEIGHT_LOSS_PLAN.specialRecipe.benefit}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Day Sample Meal Plan */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white">
              نموذج يومي متكامل لوجبات إنقاص الوزن (~1400 سعرة)
            </h3>

            <div className="space-y-3">
              {WOMEN_WEIGHT_LOSS_PLAN.sampleDayMeals.map((meal, mIdx) => (
                <div key={mIdx} className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                        #{mIdx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{meal.mealName}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {meal.time}
                      </span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {meal.calories}
                      </span>
                    </div>
                  </div>

                  <ul className="text-xs text-neutral-300 space-y-1.5 pr-2">
                    {meal.items.map((item, itIdx) => (
                      <li key={itIdx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300">سر الكوتش: </strong>
                      {meal.coachTip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foods to Focus / Limit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>أطعمة ذكية ركزي عليها لتسريع الحرق</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1.5">
                {WOMEN_WEIGHT_LOSS_PLAN.foodsToFocus.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>أطعمة احذري منها تعطل نزول الوزن</span>
              </div>
              <ul className="text-xs text-neutral-400 space-y-1.5">
                {WOMEN_WEIGHT_LOSS_PLAN.foodsToLimit.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. قسم زيادة الوزن وبناء المنحنيات للنساء */}
      {/* ============================================================== */}
      {activeSection === 'weight-gain' && (
        <div className="space-y-8">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 tracking-wider">خطة إنهاء النحافة وبناء القوام الأنثوي</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {WOMEN_WEIGHT_GAIN_PLAN.title}
                </h2>
              </div>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {WOMEN_WEIGHT_GAIN_PLAN.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-amber-500/20">
                <div className="text-xs text-amber-400 font-bold mb-1">الفائض الصحي النقي (Clean Surplus)</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {WOMEN_WEIGHT_GAIN_PLAN.targetCaloriesNote}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-amber-500/20">
                <div className="text-xs text-amber-400 font-bold mb-1">قاعدة البروتين وبناء الكتلة</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {WOMEN_WEIGHT_GAIN_PLAN.proteinRule}
                </div>
              </div>
            </div>
          </div>

          {/* Key Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WOMEN_WEIGHT_GAIN_PLAN.keyPrinciples.map((item, idx) => (
              <div key={idx} className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Special Recipe: Curves Builder Smoothie 650+ kcal */}
          {WOMEN_WEIGHT_GAIN_PLAN.specialRecipe && (
            <div className="bg-gradient-to-r from-neutral-900 via-amber-950/30 to-neutral-900 border border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400">قنبلة السعرات الصحية اللذيذة (+650 سعرة)</span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {WOMEN_WEIGHT_GAIN_PLAN.specialRecipe.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800 space-y-2">
                  <div className="text-xs font-bold text-neutral-300">المكونات المتوفرة في كل منزل:</div>
                  <ul className="text-xs text-neutral-300 space-y-1">
                    {WOMEN_WEIGHT_GAIN_PLAN.specialRecipe.ingredients.map((ing, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-neutral-300">طريقة التحضير والشرب:</div>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      {WOMEN_WEIGHT_GAIN_PLAN.specialRecipe.prep}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <strong>النتيجة السحرية: </strong> {WOMEN_WEIGHT_GAIN_PLAN.specialRecipe.benefit}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Day Sample Meal Plan for Weight Gain */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white">
              نموذج يومي متكامل لزيادة الوزن وبناء المنحنيات (~2400 سعرة)
            </h3>

            <div className="space-y-3">
              {WOMEN_WEIGHT_GAIN_PLAN.sampleDayMeals.map((meal, mIdx) => (
                <div key={mIdx} className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                        #{mIdx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{meal.mealName}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {meal.time}
                      </span>
                      <span className="text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        {meal.calories}
                      </span>
                    </div>
                  </div>

                  <ul className="text-xs text-neutral-300 space-y-1.5 pr-2">
                    {meal.items.map((item, itIdx) => (
                      <li key={itIdx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">سر التكبير: </strong>
                      {meal.coachTip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foods to Focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>أطعمة كثيفة السعرات وسهلة الأكل</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1.5">
                {WOMEN_WEIGHT_GAIN_PLAN.foodsToFocus.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>أخطاء شائعة تسبب الكرش بدلاً من المنحنيات</span>
              </div>
              <ul className="text-xs text-neutral-400 space-y-1.5">
                {WOMEN_WEIGHT_GAIN_PLAN.foodsToLimit.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. قسم التغذية العامة والمغذيات الحيوية */}
      {/* ============================================================== */}
      {activeSection === 'nutrition' && (
        <div className="space-y-6">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{WOMEN_NUTRITION_DATA.title}</h3>
                <p className="text-xs text-neutral-400">{WOMEN_NUTRITION_DATA.subtitle}</p>
              </div>
            </div>

            {/* Macro Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-1">
                <div className="text-xs font-bold text-rose-400">البروتين النقي</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {WOMEN_NUTRITION_DATA.macroGuidelines.protein}
                </div>
              </div>
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-1">
                <div className="text-xs font-bold text-amber-400">الدهون الصحية (ضرورة هرمونية)</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {WOMEN_NUTRITION_DATA.macroGuidelines.healthyFats}
                </div>
              </div>
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-1">
                <div className="text-xs font-bold text-emerald-400">الكربوهيدرات المعقدة</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {WOMEN_NUTRITION_DATA.macroGuidelines.carbs}
                </div>
              </div>
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-1">
                <div className="text-xs font-bold text-blue-400">الماء النقي والترطيب</div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {WOMEN_NUTRITION_DATA.macroGuidelines.water}
                </div>
              </div>
            </div>
          </div>

          {/* Essential Micronutrients for Women */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white">
              المغذيات الأربعة الأكثر حيوية لصحة ورشاقة المرأة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WOMEN_NUTRITION_DATA.essentialMicroNutrients.map((item, idx) => (
                <div key={idx} className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    <strong className="text-white">الفائدة الحيوية: </strong>
                    {item.benefit}
                  </p>
                  <p className="text-xs text-neutral-400">
                    <strong className="text-rose-300">أفضل المصادر: </strong>
                    {item.sources}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
