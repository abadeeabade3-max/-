import React, { useState } from 'react';
import { Dumbbell, Flame, CheckCircle2, Timer, Trophy, Coffee, RefreshCw, Eye, Sparkles, LayoutGrid, List, ChevronLeft, ChevronRight, AlertTriangle, ShieldCheck, Shuffle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ROUTINE_PLANS } from '../data/gymData';
import { EXERCISE_DATABASE } from '../data/exerciseLibrary';
import { WorkoutDayPlan, ExerciseItem } from '../types';
import { getAccurateExerciseImage } from '../utils/exerciseImages';
import { ExerciseDetailModal } from './ExerciseDetailModal';

interface WorkoutPlansSectionProps {
  onStartWorkoutBurnTimer: (workoutTitle: string) => void;
}

export const WorkoutPlansSection: React.FC<WorkoutPlansSectionProps> = ({
  onStartWorkoutBurnTimer
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'4-days' | '5-days' | '3-days'>('5-days');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [selectedAlternatives, setSelectedAlternatives] = useState<Record<string, number | null>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Modal for detailed exercise instructions & realistic photos
  const [activeModalExercise, setActiveModalExercise] = useState<ExerciseItem | null>(null);

  // Rest Timer state
  const [restSeconds, setRestSeconds] = useState<number>(0);
  const [isRestTimerActive, setIsRestTimerActive] = useState<boolean>(false);

  const currentPlan = ROUTINE_PLANS.find((p) => p.id === selectedPlanId) || ROUTINE_PLANS[0];
  const currentDay: WorkoutDayPlan = currentPlan.days[selectedDayIndex] || currentPlan.days[0];

  const toggleExercise = (exerciseId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedExercises((prev) => {
      const newState = { ...prev, [exerciseId]: !prev[exerciseId] };
      
      // Check if all exercises for the day are completed
      const allDone = currentDay.exercises.every((ex) => newState[ex.id]);
      if (allDone && currentDay.exercises.length > 0 && !prev[exerciseId]) {
        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // fallback
        }
      }
      return newState;
    });
  };

  const resetDayProgress = () => {
    setCompletedExercises((prev) => {
      const copy = { ...prev };
      currentDay.exercises.forEach((ex) => {
        delete copy[ex.id];
      });
      return copy;
    });
  };

  const startRestTimer = (seconds: number) => {
    setRestSeconds(seconds);
    setIsRestTimerActive(true);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRestTimerActive && restSeconds > 0) {
      timer = setInterval(() => {
        setRestSeconds((prev) => prev - 1);
      }, 1000);
    } else if (restSeconds === 0 && isRestTimerActive) {
      setIsRestTimerActive(false);
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch {
        // ignore
      }
    }
    return () => clearInterval(timer);
  }, [isRestTimerActive, restSeconds]);

  const completedCount = currentDay.exercises.filter((ex) => completedExercises[ex.id]).length;
  const totalCount = currentDay.exercises.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Modal navigation helpers
  const currentModalIndex = activeModalExercise 
    ? currentDay.exercises.findIndex((ex) => ex.id === activeModalExercise.id) 
    : -1;
  const hasNextExercise = currentModalIndex >= 0 && currentModalIndex < currentDay.exercises.length - 1;
  const hasPrevExercise = currentModalIndex > 0;

  const handleNextExercise = () => {
    if (hasNextExercise) {
      setActiveModalExercise(currentDay.exercises[currentModalIndex + 1]);
    }
  };

  const handlePrevExercise = () => {
    if (hasPrevExercise) {
      setActiveModalExercise(currentDay.exercises[currentModalIndex - 1]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Plan Selector */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>جداول تدريبية معتمدة بصور واقعية توضيحية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
              جداول التمارين الرياضية المتخصصة
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
              تمارين مصورة بدقة عالية مع توضيح العضلات المستهدفة وطريقة الأداء الصحيحة خطوة بخطوة وتفادي الإصابات.
            </p>
          </div>

          {/* Routine Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800">
            {ROUTINE_PLANS.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  id={`btn-plan-${plan.id}`}
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    setSelectedDayIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/20'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span>{plan.daysCount} أيام</span>
                  <span className="text-[10px] py-0.5 px-1.5 rounded bg-black/20">
                    {plan.id === '4-days' ? 'Push-Pull' : plan.id === '5-days' ? 'معدل' : 'شامل'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Plan Details Card */}
        <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-emerald-400">{currentPlan.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-semibold border border-orange-500/30">
                {currentPlan.badge}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">{currentPlan.description}</p>
          </div>

          <button
            onClick={() => onStartWorkoutBurnTimer(`${currentPlan.title} - ${currentDay.dayName}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition cursor-pointer"
          >
            <Flame className="w-4 h-4" />
            <span>بدء تمرين اليوم وحساب السعرات 🔥</span>
          </button>
        </div>
      </div>

      {/* Dedicated Free Descent Exercise Showcase Banner (User Requested: اختيار التمرين الذي يتضمن النزول الحر مع صور توضيحية) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-950 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/50 text-amber-400 flex items-center justify-center text-xl font-black shrink-0 shadow-inner">
            🎯
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-white font-heading">
                تمرين النزول الحر المعتمد: ديبس المتوازي بوزن الجسم
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                مخطط تشريحي كامل 🧬
              </span>
            </div>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              تم اختيار تمرين المتوازي والنزول الحر بوزن الجسم لاستهداف <strong className="text-amber-300">الترايسبس وأسفل الصدر</strong> مع صور تشريحية ثلاثية الأبعاد توضح زوايا الهبوط ومراحل الشد والانقباض.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveModalExercise(EXERCISE_DATABASE['free-descent-dips'] || null)}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>اختيار وعرض تمرين النزول الحر 🎯</span>
        </button>
      </div>

      {/* Days Tabs for Current Plan */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {currentPlan.days.map((day, idx) => {
          const isDaySelected = selectedDayIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition flex items-center gap-2 cursor-pointer ${
                isDaySelected
                  ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/50 shadow-md'
                  : 'bg-neutral-900/60 text-neutral-400 hover:bg-neutral-900 border border-neutral-800'
              }`}
            >
              <span>{day.dayName}</span>
              {day.isRestDay ? (
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300">راحة</span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300">
                  {day.exercises.length} تمارين
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Rest Timer Floating Bar */}
      {isRestTimerActive && (
        <div className="sticky top-28 z-40 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between animate-bounce-subtle">
          <div className="flex items-center gap-3">
            <Timer className="w-6 h-6 animate-spin" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-200">مؤقت الراحة بين المجموعات:</div>
              <div className="text-2xl font-black font-mono">
                {Math.floor(restSeconds / 60)}:{(restSeconds % 60).toString().padStart(2, '0')} ثانية
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRestSeconds((s) => s + 30)}
              className="px-3 py-1.5 rounded-lg bg-black/30 hover:bg-black/40 font-bold text-xs transition cursor-pointer"
            >
              +30 ث
            </button>
            <button
              onClick={() => setIsRestTimerActive(false)}
              className="px-3 py-1.5 rounded-lg bg-neutral-950 text-white font-bold text-xs transition cursor-pointer"
            >
              إيقاف
            </button>
          </div>
        </div>
      )}

      {/* Daily Content: Rest Day OR Exercises List/Grid */}
      {currentDay.isRestDay ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto text-2xl">
            <Coffee className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white font-heading">
            {currentDay.title} ({currentDay.dayName})
          </h3>
          <p className="text-neutral-300 max-w-xl mx-auto leading-relaxed text-sm">
            {currentDay.restDescription}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
            <span>💧 نصيحة الكوتش: اشرب ما لا يقل عن 3 لترات ماء، ونم 8 ساعات لتجديد ألياف العضلات.</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Day Header Bar */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>العضلات المستهدفة: {currentDay.targetMuscles}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                {currentDay.title}
              </h3>
            </div>

            {/* View Mode Switcher and Progress */}
            <div className="flex items-center gap-3">
              {/* Grid / List view toggle */}
              <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setViewMode('grid')}
                  title="عرض شبكي غني بالصور"
                  className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    viewMode === 'grid' ? 'bg-neutral-800 text-emerald-400' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">صور واقعية</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title="عرض قائمة سريع"
                  className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    viewMode === 'list' ? 'bg-neutral-800 text-emerald-400' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">قائمة</span>
                </button>
              </div>

              {/* Progress counter */}
              <div className="text-left">
                <div className="text-xs text-neutral-400">الإنجاز:</div>
                <div className="text-sm font-bold text-emerald-400">
                  {completedCount} من {totalCount} ({progressPercent}%)
                </div>
              </div>

              {completedCount > 0 && (
                <button
                  onClick={resetDayProgress}
                  title="إعادة تعيين التقدم"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Rest Timer preset bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-orange-400" />
              <span className="font-semibold text-neutral-300">مؤقت الراحة بين الجولات:</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => startRestTimer(45)}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition cursor-pointer"
              >
                45 ثانية
              </button>
              <button
                onClick={() => startRestTimer(60)}
                className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 font-bold transition cursor-pointer"
              >
                60 ثانية
              </button>
              <button
                onClick={() => startRestTimer(90)}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition cursor-pointer"
              >
                90 ثانية
              </button>
              <button
                onClick={() => startRestTimer(120)}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition cursor-pointer"
              >
                دقيقتين
              </button>
            </div>
          </div>

          {/* Realistic Photo Grid View (Primary & Requested by User) */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentDay.exercises.map((exercise, index) => {
                const isCompleted = !!completedExercises[exercise.id];
                const selectedAltIdx = selectedAlternatives[exercise.id] ?? null;
                const activeAlt = (selectedAltIdx !== null && exercise.alternatives && exercise.alternatives[selectedAltIdx])
                  ? exercise.alternatives[selectedAltIdx]
                  : null;
                const displayName = activeAlt ? activeAlt.name : exercise.name;
                const displayEquipment = activeAlt ? activeAlt.equipment : exercise.equipment;

                return (
                  <div
                    key={exercise.id}
                    id={`exercise-card-grid-${exercise.id}`}
                    onClick={() => setActiveModalExercise(exercise)}
                    className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col cursor-pointer ${
                      isCompleted
                        ? 'bg-neutral-900/50 border-emerald-500/40 opacity-80'
                        : 'bg-neutral-900 border-neutral-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5'
                    }`}
                  >
                    {/* Realistic Photo Header with Badges */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                      <img
                        src={getAccurateExerciseImage(activeAlt ? {
                          name: activeAlt.name,
                          targetMuscle: exercise.targetMuscle,
                          targetMuscleDetail: exercise.targetMuscleDetail,
                          equipment: activeAlt.equipment,
                          type: activeAlt.type,
                          animationUrl: activeAlt.animationUrl,
                          imageUrl: activeAlt.imageUrl
                        } : exercise)}
                        alt={displayName}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                          isCompleted ? 'grayscale' : ''
                        }`}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                      {/* Exercise Number & Completed Status */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                        <button
                          onClick={(e) => toggleExercise(exercise.id, e)}
                          title={isCompleted ? 'إلغاء التحديد' : 'تحديد كمكتمل'}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition backdrop-blur-md cursor-pointer ${
                            isCompleted
                              ? 'bg-emerald-500 text-neutral-950 shadow-lg'
                              : 'bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : (index + 1)}
                        </button>
                      </div>

                      {/* Sets & Reps floating chip */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-orange-500 text-neutral-950 font-black text-xs shadow-lg font-mono">
                          {exercise.sets}
                        </span>
                        {activeAlt && (
                          <span className="px-2 py-1 rounded-lg bg-emerald-500/90 text-neutral-950 font-bold text-xs shadow-lg">
                            {activeAlt.typeLabel}
                          </span>
                        )}
                      </div>

                      {/* Targeted Muscle Anatomical Indicator Badge */}
                      <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-emerald-500/40 text-xs font-bold text-white shadow-md">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>العضلة المستهدفة: <strong className="text-emerald-400">{exercise.targetMuscle}</strong></span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] text-neutral-300 bg-neutral-900/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-neutral-700">
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>تفاصيل التمرين</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <h4 className={`text-lg font-black font-heading transition ${
                            isCompleted ? 'text-neutral-400 line-through' : 'text-white group-hover:text-emerald-400'
                          }`}>
                            {displayName}
                          </h4>
                        </div>

                        {exercise.targetMuscleDetail && (
                          <div className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{exercise.targetMuscleDetail}</span>
                          </div>
                        )}

                        {/* Interactive Alternatives Quick-Switcher Pills (Direct user request: أكثر من خيار لنفس العضلة) */}
                        {exercise.alternatives && exercise.alternatives.length > 0 && (
                          <div
                            className="mt-2.5 p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-wrap items-center gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                              <Shuffle className="w-3 h-3 text-emerald-400" />
                              الخيارات:
                            </span>
                            <button
                              type="button"
                              onClick={() => setSelectedAlternatives((prev) => ({ ...prev, [exercise.id]: null }))}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                                selectedAltIdx === null
                                  ? 'bg-emerald-500 text-neutral-950 font-black shadow-sm'
                                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                              }`}
                            >
                              الأساسي
                            </button>
                            {exercise.alternatives.map((alt, aIdx) => (
                              <button
                                key={aIdx}
                                type="button"
                                onClick={() => setSelectedAlternatives((prev) => ({ ...prev, [exercise.id]: aIdx }))}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                                  selectedAltIdx === aIdx
                                    ? 'bg-emerald-500 text-neutral-950 font-black shadow-sm'
                                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                                }`}
                              >
                                {alt.typeLabel || alt.type}
                              </button>
                            ))}
                          </div>
                        )}

                        {activeAlt && activeAlt.notes ? (
                          <p className="text-xs text-emerald-300 mt-2 line-clamp-2 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/30">
                            ✨ {activeAlt.notes}
                          </p>
                        ) : exercise.notes ? (
                          <p className="text-xs text-neutral-400 mt-2 line-clamp-2 bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800">
                            💡 {exercise.notes}
                          </p>
                        ) : null}
                      </div>

                      {/* Equipment & Interactive Actions */}
                      <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                        <span className="text-neutral-400 truncate max-w-[180px]">
                          {displayEquipment || 'أوزان صالة باور جيم'}
                        </span>

                        <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-[-2px] transition">
                          <span>طريقة الأداء والصور</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Compact List View */
            <div className="space-y-3">
              {currentDay.exercises.map((exercise, index) => {
                const isCompleted = !!completedExercises[exercise.id];
                const selectedAltIdx = selectedAlternatives[exercise.id] ?? null;
                const activeAlt = (selectedAltIdx !== null && exercise.alternatives && exercise.alternatives[selectedAltIdx])
                  ? exercise.alternatives[selectedAltIdx]
                  : null;
                const displayName = activeAlt ? activeAlt.name : exercise.name;

                return (
                  <div
                    key={exercise.id}
                    id={`exercise-card-list-${exercise.id}`}
                    onClick={() => setActiveModalExercise(exercise)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition cursor-pointer flex items-center justify-between gap-4 group ${
                      isCompleted
                        ? 'bg-neutral-900/40 border-emerald-500/40 opacity-75'
                        : 'bg-neutral-900 border-neutral-800 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Checkbox */}
                      <button
                        onClick={(e) => toggleExercise(exercise.id, e)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition shrink-0 cursor-pointer ${
                          isCompleted 
                            ? 'bg-emerald-500 text-neutral-950 font-black' 
                            : 'bg-neutral-800 border border-neutral-700 text-neutral-400 hover:border-emerald-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                      </button>

                      {/* Realistic Thumbnail Photo */}
                      <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-neutral-800 bg-neutral-950">
                        <img
                          src={getAccurateExerciseImage(activeAlt ? {
                            name: activeAlt.name,
                            targetMuscle: exercise.targetMuscle,
                            targetMuscleDetail: exercise.targetMuscleDetail,
                            equipment: activeAlt.equipment,
                            type: activeAlt.type,
                            animationUrl: activeAlt.animationUrl,
                            imageUrl: activeAlt.imageUrl
                          } : exercise)}
                          alt={displayName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>

                      {/* Title & Muscle */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className={`text-sm sm:text-base font-bold truncate ${
                            isCompleted ? 'text-neutral-400 line-through' : 'text-white'
                          }`}>
                            {displayName}
                          </h4>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                            {exercise.targetMuscle}
                          </span>
                          {activeAlt && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                              {activeAlt.typeLabel}
                            </span>
                          )}
                        </div>
                        {exercise.targetMuscleDetail && (
                          <p className="text-xs text-neutral-400 truncate mt-0.5">
                            {exercise.targetMuscleDetail}
                          </p>
                        )}
                        {/* List view alternatives toggle */}
                        {exercise.alternatives && exercise.alternatives.length > 0 && (
                          <div
                            className="mt-1 flex flex-wrap items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-[10px] text-neutral-500">الخيارات:</span>
                            <button
                              type="button"
                              onClick={() => setSelectedAlternatives((prev) => ({ ...prev, [exercise.id]: null }))}
                              className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                selectedAltIdx === null
                                  ? 'bg-emerald-500 text-neutral-950'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              الأساسي
                            </button>
                            {exercise.alternatives.map((alt, aIdx) => (
                              <button
                                key={aIdx}
                                type="button"
                                onClick={() => setSelectedAlternatives((prev) => ({ ...prev, [exercise.id]: aIdx }))}
                                className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                  selectedAltIdx === aIdx
                                    ? 'bg-emerald-500 text-neutral-950'
                                    : 'bg-neutral-800 text-neutral-400'
                                }`}
                              >
                                {alt.typeLabel || alt.type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sets Badge */}
                    <div className="text-left shrink-0">
                      <span className="inline-block px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 font-black text-xs sm:text-sm font-mono">
                        {exercise.sets}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Completion Celebration Message */}
          {progressPercent === 100 && (
            <div className="bg-gradient-to-r from-emerald-950 via-neutral-900 to-emerald-950 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2 animate-fade-in">
              <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">عاش يا بطل! أنهيت تمارين اليوم بنجاح 💪</h4>
              <p className="text-sm text-neutral-300">
                لا تنسَ تناول وجبة ما بعد التمرين وشرب الماء الكافي لتعويض السوائل وتحفيز الاستشفاء العضلي.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Realistic Exercise Photography & Instructions Modal */}
      {activeModalExercise && (
        <ExerciseDetailModal
          exercise={activeModalExercise}
          onClose={() => setActiveModalExercise(null)}
          onToggleComplete={(id) => toggleExercise(id)}
          isCompleted={!!completedExercises[activeModalExercise.id]}
          onNext={handleNextExercise}
          onPrev={handlePrevExercise}
          hasNext={hasNextExercise}
          hasPrev={hasPrevExercise}
          onSelectAlternative={(exerciseId, altIndex) =>
            setSelectedAlternatives((prev) => ({ ...prev, [exerciseId]: altIndex }))
          }
          selectedAltIndex={selectedAlternatives[activeModalExercise.id] ?? null}
        />
      )}
    </div>
  );
};
