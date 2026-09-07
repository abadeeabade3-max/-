import React, { useState } from 'react';
import { X, Dumbbell, Flame, CheckCircle2, AlertTriangle, ChevronRight, ChevronLeft, Timer, Layers, Zap, Shuffle, Wrench, Sparkles, Activity } from 'lucide-react';
import { ExerciseItem, ExerciseAlternative } from '../types';
import { getAccurateExerciseImage } from '../utils/exerciseImages';
import { AnatomicalMuscleView } from './AnatomicalMuscleView';

interface ExerciseDetailModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
  onToggleComplete?: (id: string) => void;
  isCompleted?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  onSelectAlternative?: (exerciseId: string, altIndex: number | null) => void;
  selectedAltIndex?: number | null;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  onClose,
  onToggleComplete,
  isCompleted,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  onSelectAlternative,
  selectedAltIndex = null
}) => {
  const [modalTimer, setModalTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [activeAltIndex, setActiveAltIndex] = useState<number | null>(selectedAltIndex);

  React.useEffect(() => {
    setActiveAltIndex(selectedAltIndex);
  }, [selectedAltIndex, exercise]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && modalTimer > 0) {
      interval = setInterval(() => {
        setModalTimer((t) => t - 1);
      }, 1000);
    } else if (modalTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
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
    return () => clearInterval(interval);
  }, [isTimerRunning, modalTimer]);

  if (!exercise) return null;

  const currentAlternative: ExerciseAlternative | null = 
    activeAltIndex !== null && exercise.alternatives && exercise.alternatives[activeAltIndex]
      ? exercise.alternatives[activeAltIndex]
      : null;

  const displayName = currentAlternative ? currentAlternative.name : exercise.name;
  const displayEquipment = currentAlternative ? currentAlternative.equipment : exercise.equipment;
  const displayNotes = currentAlternative ? currentAlternative.notes : exercise.notes;

  const startTimer = (secs: number) => {
    setModalTimer(secs);
    setIsTimerRunning(true);
  };

  const handleSwitchAlternative = (idx: number | null) => {
    setActiveAltIndex(idx);
    if (onSelectAlternative) {
      onSelectAlternative(exercise.id, idx);
    }
  };

  const getTypeBadgeColor = (type?: string) => {
    switch (type) {
      case 'dumbbell':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'barbell':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'machine':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'cable':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'bodyweight':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400 font-bold block">
                  تمرين معتمد في باور جيم
                </span>
                {(exercise.id === 'free-descent-dips' || exercise.name.includes('النزول الحر')) && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-black border border-amber-500/50 flex items-center gap-1 animate-pulse">
                    <span>🎯 تمرين النزول الحر المعتمد</span>
                  </span>
                )}
                {currentAlternative && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    بديل مختار: {currentAlternative.typeLabel}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white font-heading truncate">
                {displayName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleComplete && (
              <button
                onClick={() => onToggleComplete(exercise.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-500 text-neutral-950'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'تم إنجازه ✓' : 'تحديد كمكتمل'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Alternatives & Variations Switcher Banner (User Requested: خيارات متعددة لنفس العضلة) */}
          {exercise.alternatives && exercise.alternatives.length > 0 && (
            <div className="p-4 rounded-2xl bg-neutral-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shuffle className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-black text-white">
                    خيارات وبدائل التمرين لنفس العضلة (دمبلز / بار / ماكينة / كيبل):
                  </span>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold">
                  اختر المعدة المتوفرة في صالتك
                </span>
              </div>

              {/* Option Selector Buttons with Illustrative Images */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Default Primary Exercise Card */}
                {(() => {
                  const primaryImg = getAccurateExerciseImage(exercise);
                  const isSelected = activeAltIndex === null;
                  return (
                    <button
                      type="button"
                      onClick={() => handleSwitchAlternative(null)}
                      className={`p-2.5 rounded-xl border text-right transition flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/30 text-white shadow-lg'
                          : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-850'
                      }`}
                    >
                      {/* Image Thumbnail Preview */}
                      <div className="w-full h-24 rounded-lg overflow-hidden relative mb-2 bg-neutral-950 border border-neutral-800">
                        <img
                          src={primaryImg}
                          alt={exercise.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                        <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-emerald-500 text-neutral-950 text-[10px] font-black shadow">
                          الخيار الأساسي ⭐
                        </span>
                        {isSelected && (
                          <span className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-emerald-400 text-neutral-950 flex items-center justify-center font-bold text-xs shadow">
                            ✓
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-neutral-200">الخيار الأساسي:</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                          {exercise.equipment || 'حر/ماكينة'}
                        </span>
                      </div>
                      <span className="text-xs font-black truncate block text-white">{exercise.name.split('(')[0]}</span>
                      <span className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {exercise.targetMuscle} • {exercise.equipment || 'المعدة الأصلية'}
                      </span>
                    </button>
                  );
                })()}

                {/* Alternatives List with Dedicated Images */}
                {exercise.alternatives.map((alt, idx) => {
                  const isSelected = activeAltIndex === idx;
                  const altImg = getAccurateExerciseImage({
                    name: alt.name,
                    targetMuscle: exercise.targetMuscle,
                    targetMuscleDetail: exercise.targetMuscleDetail,
                    equipment: alt.equipment,
                    type: alt.type,
                    animationUrl: alt.animationUrl,
                    imageUrl: alt.imageUrl
                  });

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSwitchAlternative(idx)}
                      className={`p-2.5 rounded-xl border text-right transition flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30 text-white shadow-lg'
                          : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-850'
                      }`}
                    >
                      {/* Image Thumbnail Preview for this alternative */}
                      <div className="w-full h-24 rounded-lg overflow-hidden relative mb-2 bg-neutral-950 border border-neutral-800">
                        <img
                          src={altImg}
                          alt={alt.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                        <span className={`absolute bottom-1.5 right-1.5 text-[10px] px-2 py-0.5 rounded border font-bold shadow ${getTypeBadgeColor(alt.type)}`}>
                          {alt.typeLabel || alt.type}
                        </span>
                        {isSelected && (
                          <span className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center font-bold text-xs shadow">
                            ✓
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-neutral-200">بديل {idx + 1}:</span>
                        <span className="text-[10px] text-neutral-400 truncate">
                          {alt.equipment}
                        </span>
                      </div>
                      <span className="text-xs font-black truncate block text-white">{alt.name.split('(')[0]}</span>
                      <span className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {exercise.targetMuscle} • {alt.equipment}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Alternative Explanation */}
              {currentAlternative && (
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                  <span className="font-bold text-emerald-400 shrink-0">✨ ميزة هذا البديل:</span>
                  <span>{currentAlternative.notes}</span>
                </div>
              )}
            </div>
          )}

          {/* Realistic Photograph of the Exercise (Primary or Selected Alternative) */}
          {(() => {
            const activeImageSrc = currentAlternative
              ? getAccurateExerciseImage({
                  name: currentAlternative.name,
                  targetMuscle: exercise.targetMuscle,
                  targetMuscleDetail: exercise.targetMuscleDetail,
                  equipment: currentAlternative.equipment,
                  type: currentAlternative.type,
                  animationUrl: currentAlternative.animationUrl,
                  imageUrl: currentAlternative.imageUrl
                })
              : getAccurateExerciseImage(exercise);

            return (
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-video group">
                <img
                  key={activeImageSrc}
                  src={activeImageSrc}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition duration-700 ${
                    imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'
                  }`}
                />
                
                {/* Dark overlay gradient for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

                {/* Top Badge showing whether primary or alternative is active */}
                <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-2 pointer-events-none">
                  {currentAlternative ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 text-neutral-950 font-black text-xs shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>صورة البديل المختار: {currentAlternative.typeLabel} ({currentAlternative.equipment})</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/90 text-neutral-950 font-black text-xs shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>صورة الخيار الأساسي المعتمد</span>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-neutral-900/90 border border-neutral-700 text-neutral-300 text-xs font-mono">
                    {displayEquipment}
                  </div>
                </div>

                {/* Target Muscle Visual Indicator overlay badge */}
                <div className="absolute bottom-3 right-3 left-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-emerald-500/50 shadow-lg text-xs sm:text-sm font-bold text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>العضلة المستهدفة: <strong className="text-emerald-400">{exercise.targetMuscle}</strong></span>
                    {exercise.targetMuscleDetail && (
                      <span className="text-neutral-400 text-xs hidden sm:inline">({exercise.targetMuscleDetail})</span>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500 text-neutral-950 font-black text-xs sm:text-sm shadow-lg">
                    <Flame className="w-4 h-4" />
                    <span>{exercise.sets}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-400 block mb-0.5">العضلة الأساسية:</span>
              <span className="font-bold text-emerald-400 text-sm">{exercise.targetMuscle}</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-400 block mb-0.5">العضلات المساعدة:</span>
              <span className="font-semibold text-neutral-200 truncate block">
                {exercise.secondaryMuscles || 'عضلات التثبيت'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-400 block mb-0.5">الجولات والعدات:</span>
              <span className="font-black text-orange-400 text-sm font-mono">{exercise.sets}</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-400 block mb-0.5">المعدة المختارة:</span>
              <span className="font-semibold text-neutral-200 truncate block">
                {displayEquipment || 'أوزان حرة / جهاز'}
              </span>
            </div>
          </div>

          {/* Full Illustrative Diagram of Targeted Muscle (User Requested: صور توضيحية بالكامل توضح العضلة المستهدفة) */}
          <AnatomicalMuscleView exercise={exercise} />

          {/* Step by Step Execution Instructions */}
          {exercise.executionSteps && exercise.executionSteps.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>طريقة الأداء الصحيحة خطوة بخطوة:</span>
              </h4>
              <div className="space-y-2 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
                {exercise.executionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes & Safety Warnings */}
          {exercise.commonMistakes && exercise.commonMistakes.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-sm font-bold text-orange-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span>أخطاء شائعة لتفادي الإصابة:</span>
              </h4>
              <div className="space-y-1.5 bg-orange-950/20 p-4 rounded-xl border border-orange-500/30">
                {exercise.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-orange-200">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coach's Golden Tip */}
          {displayNotes && (
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2.5">
              <span className="text-lg">💡</span>
              <div>
                <strong className="text-emerald-400 block mb-0.5">نصيحة كوتش باور جيم:</strong>
                <span>{displayNotes}</span>
              </div>
            </div>
          )}

          {/* In-Modal Rest Timer */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Timer className="w-4 h-4 text-orange-400" />
              <span className="font-semibold text-neutral-200">مؤقت الراحة بين الجولات:</span>
              {isTimerRunning && (
                <span className="font-mono font-bold text-orange-400 text-sm animate-pulse">
                  {Math.floor(modalTimer / 60)}:{(modalTimer % 60).toString().padStart(2, '0')}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => startTimer(45)}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-300 transition cursor-pointer"
              >
                45 ث
              </button>
              <button
                onClick={() => startTimer(60)}
                className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-neutral-950 transition cursor-pointer"
              >
                60 ث
              </button>
              <button
                onClick={() => startTimer(90)}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-300 transition cursor-pointer"
              >
                90 ث
              </button>
              {isTimerRunning && (
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className="px-2.5 py-1 rounded-lg bg-red-950 text-red-300 border border-red-500/40 text-xs font-bold transition cursor-pointer"
                >
                  إيقاف
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Footer Navigation (Previous / Next Exercise) */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-neutral-800 bg-neutral-950/80">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              hasPrev
                ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                : 'bg-neutral-900 text-neutral-600 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>التمرين السابق</span>
          </button>

          <span className="text-xs text-neutral-500">
            انقر في أي مكان خارج النافذة للإغلاق
          </span>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              hasNext
                ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold'
                : 'bg-neutral-900 text-neutral-600 cursor-not-allowed'
            }`}
          >
            <span>التمرين التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

