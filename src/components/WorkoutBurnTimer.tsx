import React, { useState, useEffect, useRef } from 'react';
import { Flame, Play, Pause, RotateCcw, CheckCircle2, HeartPulse, Sparkles, Activity, History, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorkoutBurnSession } from '../types';

interface WorkoutBurnTimerProps {
  initialWorkoutTitle?: string;
}

export const WorkoutBurnTimer: React.FC<WorkoutBurnTimerProps> = ({ initialWorkoutTitle }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [workoutTitle, setWorkoutTitle] = useState<string>(initialWorkoutTitle || 'تمارين القوة والمقاومة - باور جيم');
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(75);
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'intense'>('moderate');
  const [history, setHistory] = useState<WorkoutBurnSession[]>(() => {
    try {
      const saved = localStorage.getItem('power_gym_workout_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update workout title if initial changes
  useEffect(() => {
    if (initialWorkoutTitle) {
      setWorkoutTitle(initialWorkoutTitle);
    }
  }, [initialWorkoutTitle]);

  // MET values for weight lifting
  const metValues = {
    light: 4.0,     // تمارين إحماء أو خفيفة
    moderate: 6.0,  // رفع أثقال كلاسيكي بين المجموعات
    intense: 8.0    // سوبر سيت / تدريب عالي الكثافة / أرجل مكثفة
  };

  // Calories formula: (MET * 3.5 * weightKg) / 200 * (secondsElapsed / 60)
  const currentMet = metValues[intensity];
  const caloriesBurned = Math.round(((currentMet * 3.5 * bodyWeightKg) / 200) * (secondsElapsed / 60));

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  
  const handleReset = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
  };

  const handleFinishWorkout = () => {
    if (secondsElapsed < 10) {
      alert('مدة التمرين قصيرة جداً (أقل من 10 ثوانٍ)!');
      return;
    }

    setIsRunning(false);

    const dateStr = new Date().toLocaleDateString('ar-LY', { numberingSystem: 'latn', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(/[٠-٩]/g, (d) => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);
    const newSession: WorkoutBurnSession = {
      id: Date.now().toString(),
      date: dateStr,
      durationSeconds: secondsElapsed,
      caloriesBurned,
      intensity,
      workoutName: workoutTitle
    };

    const updated = [newSession, ...history].slice(0, 10);
    setHistory(updated);
    try {
      localStorage.setItem('power_gym_workout_history', JSON.stringify(updated));
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('power_gym_workout_history');
    } catch {
      // ignore
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 border border-red-500/30 text-red-400 mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>مؤقت الحرق اللحظي أثناء التمرين</span>
          </div>
          <h3 className="text-2xl font-black text-white font-heading">
            احتساب السعرات الحرارية المحروقة أثناء التمرين
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            اضغط "بدء التمرين" عند انطلاق حصتك التدريبية لمتابعة حرق السعرات بالثواني بناءً على وزنك وشدة التدريب.
          </p>
        </div>

        {/* Workout Name Input */}
        <div className="w-full md:w-72">
          <label className="block text-xs font-bold text-neutral-400 mb-1">اسم الحصة / التمرين:</label>
          <input
            type="text"
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
            placeholder="مثال: تمرين صدر وترايسبس"
          />
        </div>
      </div>

      {/* Main Interactive Live Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left / Center: The Huge Counter Display */}
        <div className="lg:col-span-7 bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
          
          {/* Flame Ambient Glow */}
          <div className={`absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition duration-500 ${
            isRunning ? 'bg-red-500/20' : 'bg-neutral-700/10'
          }`} />

          <div className="space-y-6 relative z-10">
            {/* Live Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 border border-neutral-800 text-neutral-300">
              <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-ping' : 'bg-neutral-600'}`} />
              <span>{isRunning ? 'جاري التدريب والحرق النشط...' : secondsElapsed > 0 ? 'التمرين متوقف مؤقتاً' : 'جاهز للانطلاق'}</span>
            </div>

            {/* Time Display */}
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">وقت التمرين الفعلي</div>
              <div className="text-4xl sm:text-6xl font-black font-mono tracking-wider text-white">
                {formatTime(secondsElapsed)}
              </div>
            </div>

            {/* Calories Burned Callout */}
            <div className="py-4 px-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-amber-950/30 to-red-950/40 border border-red-500/30 inline-block max-w-sm mx-auto">
              <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-xs uppercase mb-1">
                <Flame className={`w-4 h-4 text-red-500 ${isRunning ? 'animate-bounce' : ''}`} />
                <span>السعرات الحرارية المحروقة</span>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono flex items-baseline justify-center gap-1">
                <span>{caloriesBurned}</span>
                <span className="text-base sm:text-lg font-bold text-amber-400">kcal</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                معدل الحرق التقديري: ~{Math.round((currentMet * 3.5 * bodyWeightKg) / 200 * 60)} سعرة / ساعة
              </div>
            </div>

            {/* Control Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-neutral-950 font-black text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{secondsElapsed > 0 ? 'استئناف التمرين' : 'بدء التمرين الآن'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition cursor-pointer"
                >
                  <Pause className="w-5 h-5 fill-current" />
                  <span>إيقاف مؤقت</span>
                </button>
              )}

              {secondsElapsed > 0 && (
                <>
                  <button
                    onClick={handleFinishWorkout}
                    className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-neutral-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>إنهاء وحفظ التمرين 🏆</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="p-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
                    title="تصفير العداد"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Settings & Parameters */}
        <div className="lg:col-span-5 space-y-5">
          {/* Weight setting */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-300">وزن جسمك الحالي:</label>
              <span className="text-sm font-bold text-amber-400 font-mono">{bodyWeightKg} كجم</span>
            </div>
            <input
              type="range"
              min={40}
              max={150}
              value={bodyWeightKg}
              onChange={(e) => setBodyWeightKg(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500">
              <span>40 كجم</span>
              <span>75 كجم</span>
              <span>150 كجم</span>
            </div>
          </div>

          {/* Intensity selector */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
            <label className="block text-xs font-bold text-neutral-300">شدة التمرين الميداني:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setIntensity('light')}
                className={`p-2.5 rounded-lg text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                  intensity === 'light'
                    ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                }`}
              >
                <span>خفيف</span>
                <span className="text-[10px] font-normal text-neutral-400">إحماء وتمارين</span>
              </button>

              <button
                type="button"
                onClick={() => setIntensity('moderate')}
                className={`p-2.5 rounded-lg text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                  intensity === 'moderate'
                    ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                }`}
              >
                <span>متوسط ⚡</span>
                <span className="text-[10px] font-normal text-neutral-400">رفع أثقال عام</span>
              </button>

              <button
                type="button"
                onClick={() => setIntensity('intense')}
                className={`p-2.5 rounded-lg text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                  intensity === 'intense'
                    ? 'bg-red-500/20 border border-red-500 text-red-400'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                }`}
              >
                <span>مكثف 🔥</span>
                <span className="text-[10px] font-normal text-neutral-400">سوبرسيت وأرجل</span>
              </button>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800/80 text-xs text-neutral-400 space-y-1">
            <div className="font-bold text-neutral-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>كيف يتم حساب السعرات؟</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              يعتمد الحساب على المكافئ الأيضي العالمي (MET) المقترن بوزن الرياضي ومدة الجلسة التدريبية في باور جيم.
            </p>
          </div>
        </div>
      </div>

      {/* Workout History Log */}
      {history.length > 0 && (
        <div className="pt-6 border-t border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white">سجل التمارين الأخيرة في الصالة:</h4>
            </div>
            <button
              onClick={clearHistory}
              className="text-xs text-neutral-500 hover:text-red-400 flex items-center gap-1 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>مسح السجل</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-200 truncate">{item.workoutName}</span>
                  <span className="font-black text-amber-400 font-mono">{item.caloriesBurned} kcal</span>
                </div>
                <div className="flex items-center justify-between text-neutral-500 text-[10px]">
                  <span>{item.date}</span>
                  <span>المدة: {formatTime(item.durationSeconds)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
