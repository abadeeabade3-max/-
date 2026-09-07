import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle, Sparkles, Moon, Sun, Users, Flame } from 'lucide-react';
import { getCurrentGymStatus } from '../data/gymData';
import { CurrentStatusInfo } from '../types';

interface LiveStatusBannerProps {
  currentStatus: CurrentStatusInfo;
  onNavigateToSchedule: () => void;
  onNavigateToWorkout: () => void;
}

// Helper to force Western / Latin digits (0-9) across all browsers
export const toWesternDigits = (str: string): string => {
  if (!str) return '';
  return str.replace(/[٠-٩]/g, (d) => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);
};

export const LiveStatusBanner: React.FC<LiveStatusBannerProps> = ({
  currentStatus,
  onNavigateToSchedule,
  onNavigateToWorkout
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const [customSimulatedStatus, setCustomSimulatedStatus] = useState<CurrentStatusInfo | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format with Latin numerals (0-9)
      const rawTime = now.toLocaleTimeString('ar-LY', {
        numberingSystem: 'latn',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const rawDate = now.toLocaleDateString('ar-LY', {
        numberingSystem: 'latn',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setTimeString(toWesternDigits(rawTime));
      setDateString(toWesternDigits(rawDate));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeStatus = customSimulatedStatus || currentStatus;

  // Simulator helper
  const simulateSession = (type: 'men' | 'women' | 'friday' | 'closed') => {
    const dummy = new Date();
    if (type === 'men') {
      // Set to Saturday 5:00 PM (Men's session)
      const dayDiff = (6 - dummy.getDay() + 7) % 7;
      dummy.setDate(dummy.getDate() + dayDiff);
      dummy.setHours(17, 0, 0, 0);
    } else if (type === 'women') {
      // Set to Saturday 10:00 AM (Women's session)
      const dayDiff = (6 - dummy.getDay() + 7) % 7;
      dummy.setDate(dummy.getDate() + dayDiff);
      dummy.setHours(10, 30, 0, 0);
    } else if (type === 'friday') {
      // Friday
      const dayDiff = (5 - dummy.getDay() + 7) % 7;
      dummy.setDate(dummy.getDate() + dayDiff);
      dummy.setHours(14, 0, 0, 0);
    } else {
      // Closed at night 3:00 AM
      dummy.setHours(3, 0, 0, 0);
    }
    setCustomSimulatedStatus(getCurrentGymStatus(dummy));
  };

  const resetToRealTime = () => {
    setCustomSimulatedStatus(null);
  };

  const isMen = activeStatus.currentSession === 'men';
  const isWomen = activeStatus.currentSession === 'women';
  const isClosed = !activeStatus.isOpen;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/90 shadow-2xl p-6 sm:p-8">
      {/* Background ambient glow according to active state */}
      <div 
        className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isMen ? 'bg-amber-500' : isWomen ? 'bg-pink-500' : 'bg-blue-600'
        }`}
      />
      <div 
        className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-15 ${
          isMen ? 'bg-amber-600' : isWomen ? 'bg-purple-600' : 'bg-neutral-600'
        }`}
      />

      <div className="relative z-10">
        
        {/* Top bar with live time and date */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-800/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-800 text-amber-400">
              <Clock className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">التوقيت المحلي المباشر للصالة:</div>
              <div className="text-base sm:text-lg font-bold text-white tracking-wide">
                {dateString} — <span className="text-amber-400 font-mono text-xl">{timeString}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {customSimulatedStatus && (
              <button
                onClick={resetToRealTime}
                className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg border border-neutral-700 transition cursor-pointer"
              >
                العودة للوقت الحقيقي ↺
              </button>
            )}
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              تحديث تلقائي لحظي
            </span>
          </div>
        </div>

        {/* Main Prominent Status Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Status badge & title */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-neutral-800 border border-neutral-700 text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>مؤشر الحالة اللحظية في الصالة</span>
            </div>

            {/* Huge Status Heading requested specifically by the user */}
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-2xl shrink-0 text-3xl sm:text-4xl shadow-lg ${
                isMen 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                  : isWomen
                  ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
              }`}>
                {isMen ? '🏋️‍♂️' : isWomen ? '🏋️‍♀️' : '🔒'}
              </div>

              <div>
                <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight ${
                  isMen ? 'text-amber-400' : isWomen ? 'text-pink-400' : 'text-neutral-200'
                }`}>
                  {toWesternDigits(activeStatus.statusText)}
                </h2>

                {activeStatus.timeRemaining && (
                  <p className="mt-2 text-sm sm:text-base text-neutral-300 font-medium flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                    {toWesternDigits(activeStatus.timeRemaining)}
                  </p>
                )}

                {activeStatus.nextSessionText && (
                  <p className="mt-2 text-sm text-neutral-400 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-neutral-500" />
                    {toWesternDigits(activeStatus.nextSessionText)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={onNavigateToSchedule}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>عرض جدول المواعيد بالكامل (رجال ونساء)</span>
            </button>

            <button
              onClick={onNavigateToWorkout}
              className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm transition border border-neutral-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>تمارين اليوم (4 أو 5 أو 3 أيام)</span>
            </button>
          </div>
        </div>

        {/* Quick Simulator Bar so the user can test the app at any time */}
        <div className="mt-6 pt-5 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 font-semibold">فحص ومحاكاة التوقيت:</span>
            <button
              onClick={() => simulateSession('men')}
              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 transition cursor-pointer"
            >
              تجربة توقيت الرجال 🏋️‍♂️
            </button>
            <button
              onClick={() => simulateSession('women')}
              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-pink-300 border border-neutral-700 transition cursor-pointer"
            >
              تجربة توقيت النساء 🏋️‍♀️
            </button>
            <button
              onClick={() => simulateSession('friday')}
              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-blue-300 border border-neutral-700 transition cursor-pointer"
            >
              تجربة يوم الجمعة (راحة) ☕
            </button>
          </div>

          <div className="text-neutral-500 text-[11px]">
            * يتطابق هذا المؤشر تلقائياً مع توقيت هاتفك أو جهازك
          </div>
        </div>

      </div>
    </div>
  );
};
