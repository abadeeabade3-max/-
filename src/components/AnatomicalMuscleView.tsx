import React, { useState } from 'react';
import { Sparkles, Eye, ShieldCheck, Activity, ChevronLeft, ChevronRight, Layers, Info } from 'lucide-react';
import { ExerciseItem } from '../types';

interface AnatomicalMuscleViewProps {
  exercise: ExerciseItem;
  className?: string;
}

export const AnatomicalMuscleView: React.FC<AnatomicalMuscleViewProps> = ({
  exercise,
  className = ''
}) => {
  const [viewAngle, setViewAngle] = useState<'front' | 'back'>('front');

  // Identify primary muscle group
  const targetLower = (exercise.targetMuscle || '').toLowerCase();
  const targetDetailLower = (exercise.targetMuscleDetail || '').toLowerCase();
  const nameLower = (exercise.name || '').toLowerCase();
  const fullText = `${targetLower} ${targetDetailLower} ${nameLower}`;

  const isChest = fullText.includes('صدر') || fullText.includes('chest');
  const isTriceps = fullText.includes('تراي') || fullText.includes('tricep') || fullText.includes('متوازي') || fullText.includes('زنود');
  const isBiceps = fullText.includes('باي') || fullText.includes('bicep');
  const isShoulders = fullText.includes('كتف') || fullText.includes('أكتاف') || fullText.includes('shoulder') || fullText.includes('دالية');
  const isBack = fullText.includes('ظهر') || fullText.includes('lat') || fullText.includes('عقلة') || fullText.includes('تجديف');
  const isLegs = fullText.includes('رجل') || fullText.includes('أرجل') || fullText.includes('فخذ') || fullText.includes('سكوات') || fullText.includes('quad');
  const isGlutes = fullText.includes('ألوية') || fullText.includes('مؤخرة') || fullText.includes('glute');
  const isCalves = fullText.includes('سمانة') || fullText.includes('بطات') || fullText.includes('calf');
  const isAbs = fullText.includes('بطن') || fullText.includes('abs') || fullText.includes('core');
  const isFreeDescent = fullText.includes('نزول حر') || fullText.includes('هبوط حر') || fullText.includes('متوازي') || fullText.includes('free descent');

  // Auto-set view angle based on muscle
  React.useEffect(() => {
    if (isBack || (isTriceps && !isChest) || isGlutes) {
      setViewAngle('back');
    } else {
      setViewAngle('front');
    }
  }, [exercise]);

  return (
    <div className={`rounded-2xl bg-neutral-950 border border-emerald-500/30 overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <span>المخطط التشريحي ثلاثي الأبعاد للعضلة المستهدفة 🧬</span>
              {isFreeDescent && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  تمرين النزول الحر 🎯
                </span>
              )}
            </h4>
            <p className="text-[10px] text-neutral-400">
              توضيح علمي دقيق لألياف العضلة الأساسية والمساعدة أثناء النزول والصعود
            </p>
          </div>
        </div>

        {/* View Switcher (Front / Back) */}
        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewAngle('front')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              viewAngle === 'front'
                ? 'bg-emerald-500 text-neutral-950 font-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>المنظر الأمامي</span>
          </button>
          <button
            type="button"
            onClick={() => setViewAngle('back')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              viewAngle === 'back'
                ? 'bg-emerald-500 text-neutral-950 font-black shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>المنظر الخلفي</span>
          </button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* SVG Anatomical Human Body with Glowing Muscle Highlights */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative bg-gradient-to-b from-neutral-900/90 to-neutral-950 rounded-2xl p-4 border border-neutral-800/80 min-h-[300px]">
          {/* Anatomical Body Silhouette Container */}
          <div className="relative w-48 h-72 sm:w-56 sm:h-80 flex items-center justify-center">
            <svg
              viewBox="0 0 200 320"
              className="w-full h-full filter drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow Filter for Active Muscle */}
                <filter id="muscleGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
                <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#262626" />
                  <stop offset="100%" stopColor="#171717" />
                </linearGradient>
              </defs>

              {/* Head & Neck */}
              <ellipse cx="100" cy="30" rx="16" ry="20" fill="url(#bodyGradient)" stroke="#404040" strokeWidth="1" />
              <path d="M92 48 L108 48 L111 60 L89 60 Z" fill="url(#bodyGradient)" stroke="#404040" strokeWidth="1" />

              {/* VIEW ANGLE: FRONT (ANTERIOR) */}
              {viewAngle === 'front' && (
                <g id="anterior-muscles">
                  {/* Torso Base */}
                  <path d="M70 65 L130 65 L124 145 L118 165 L82 165 L76 145 Z" fill="url(#bodyGradient)" stroke="#404040" strokeWidth="1" />

                  {/* Shoulders (Deltoids) */}
                  <g className="transition-all duration-500">
                    <path
                      d="M62 65 Q50 80 54 95 Q64 90 70 75 Z"
                      fill={isShoulders ? 'url(#activeGradient)' : (isChest || isTriceps ? 'url(#secondaryGradient)' : '#333333')}
                      filter={isShoulders ? 'url(#muscleGlow)' : undefined}
                      stroke={isShoulders ? '#6ee7b7' : '#525252'}
                      strokeWidth={isShoulders ? '2' : '0.5'}
                    />
                    <path
                      d="M138 65 Q150 80 146 95 Q136 90 130 75 Z"
                      fill={isShoulders ? 'url(#activeGradient)' : (isChest || isTriceps ? 'url(#secondaryGradient)' : '#333333')}
                      filter={isShoulders ? 'url(#muscleGlow)' : undefined}
                      stroke={isShoulders ? '#6ee7b7' : '#525252'}
                      strokeWidth={isShoulders ? '2' : '0.5'}
                    />
                  </g>

                  {/* Chest (Pectoralis Major) */}
                  <g className="transition-all duration-500">
                    {/* Left Pec */}
                    <path
                      d="M72 70 Q98 68 98 100 Q80 106 72 90 Z"
                      fill={isChest ? 'url(#activeGradient)' : (isTriceps && isFreeDescent ? 'url(#secondaryGradient)' : '#2b2b2b')}
                      filter={isChest ? 'url(#muscleGlow)' : undefined}
                      stroke={isChest ? '#6ee7b7' : '#525252'}
                      strokeWidth={isChest ? '2.5' : '1'}
                    />
                    {/* Right Pec */}
                    <path
                      d="M128 70 Q102 68 102 100 Q120 106 128 90 Z"
                      fill={isChest ? 'url(#activeGradient)' : (isTriceps && isFreeDescent ? 'url(#secondaryGradient)' : '#2b2b2b')}
                      filter={isChest ? 'url(#muscleGlow)' : undefined}
                      stroke={isChest ? '#6ee7b7' : '#525252'}
                      strokeWidth={isChest ? '2.5' : '1'}
                    />
                  </g>

                  {/* Biceps (Front Arm) */}
                  <g className="transition-all duration-500">
                    <ellipse
                      cx="53"
                      cy="112"
                      rx="7"
                      ry="15"
                      fill={isBiceps ? 'url(#activeGradient)' : '#2b2b2b'}
                      filter={isBiceps ? 'url(#muscleGlow)' : undefined}
                      stroke={isBiceps ? '#6ee7b7' : '#404040'}
                      strokeWidth={isBiceps ? '2' : '0.5'}
                    />
                    <ellipse
                      cx="147"
                      cy="112"
                      rx="7"
                      ry="15"
                      fill={isBiceps ? 'url(#activeGradient)' : '#2b2b2b'}
                      filter={isBiceps ? 'url(#muscleGlow)' : undefined}
                      stroke={isBiceps ? '#6ee7b7' : '#404040'}
                      strokeWidth={isBiceps ? '2' : '0.5'}
                    />
                  </g>

                  {/* Forearms */}
                  <path d="M46 128 L57 128 L54 165 L43 165 Z" fill="#2b2b2b" stroke="#404040" strokeWidth="0.5" />
                  <path d="M154 128 L143 128 L146 165 L157 165 Z" fill="#2b2b2b" stroke="#404040" strokeWidth="0.5" />

                  {/* Abdominals (Rectus Abdominis) */}
                  <g className="transition-all duration-500">
                    <rect
                      x="88"
                      y="105"
                      width="10"
                      height="12"
                      rx="2"
                      fill={isAbs ? 'url(#activeGradient)' : '#2a2a2a'}
                      stroke={isAbs ? '#6ee7b7' : '#444'}
                    />
                    <rect
                      x="102"
                      y="105"
                      width="10"
                      height="12"
                      rx="2"
                      fill={isAbs ? 'url(#activeGradient)' : '#2a2a2a'}
                      stroke={isAbs ? '#6ee7b7' : '#444'}
                    />
                    <rect
                      x="88"
                      y="120"
                      width="10"
                      height="12"
                      rx="2"
                      fill={isAbs ? 'url(#activeGradient)' : '#2a2a2a'}
                      stroke={isAbs ? '#6ee7b7' : '#444'}
                    />
                    <rect
                      x="102"
                      y="120"
                      width="10"
                      height="12"
                      rx="2"
                      fill={isAbs ? 'url(#activeGradient)' : '#2a2a2a'}
                      stroke={isAbs ? '#6ee7b7' : '#444'}
                    />
                    <rect
                      x="88"
                      y="135"
                      width="10"
                      height="12"
                      rx="2"
                      fill={isAbs ? 'url(#activeGradient)' : '#2a2a2a'}
                      stroke={isAbs ? '#6ee7b7' : '#444'}
                    />
                    <rect
                      x="102"
                      y="135"
                      width="10"
                      height="12"
                      rx="2"
                      fill={isAbs ? 'url(#activeGradient)' : '#2a2a2a'}
                      stroke={isAbs ? '#6ee7b7' : '#444'}
                    />
                  </g>

                  {/* Pelvis & Hips */}
                  <path d="M80 165 L120 165 L125 185 L75 185 Z" fill="#242424" stroke="#404040" strokeWidth="0.5" />

                  {/* Quadriceps (Thighs - Front) */}
                  <g className="transition-all duration-500">
                    <path
                      d="M74 186 Q67 220 78 245 L94 245 Q98 215 95 186 Z"
                      fill={isLegs ? 'url(#activeGradient)' : '#2d2d2d'}
                      filter={isLegs ? 'url(#muscleGlow)' : undefined}
                      stroke={isLegs ? '#6ee7b7' : '#525252'}
                      strokeWidth={isLegs ? '2.5' : '1'}
                    />
                    <path
                      d="M126 186 Q133 220 122 245 L106 245 Q102 215 105 186 Z"
                      fill={isLegs ? 'url(#activeGradient)' : '#2d2d2d'}
                      filter={isLegs ? 'url(#muscleGlow)' : undefined}
                      stroke={isLegs ? '#6ee7b7' : '#525252'}
                      strokeWidth={isLegs ? '2.5' : '1'}
                    />
                  </g>

                  {/* Calves (Front Shin / Tibialis) */}
                  <g className="transition-all duration-500">
                    <path
                      d="M77 252 Q72 278 81 305 L91 305 Q94 278 92 252 Z"
                      fill={isCalves ? 'url(#activeGradient)' : '#262626'}
                      stroke={isCalves ? '#6ee7b7' : '#404040'}
                    />
                    <path
                      d="M123 252 Q128 278 119 305 L109 305 Q106 278 108 252 Z"
                      fill={isCalves ? 'url(#activeGradient)' : '#262626'}
                      stroke={isCalves ? '#6ee7b7' : '#404040'}
                    />
                  </g>
                </g>
              )}

              {/* VIEW ANGLE: BACK (POSTERIOR) */}
              {viewAngle === 'back' && (
                <g id="posterior-muscles">
                  {/* Traps & Upper Back */}
                  <path
                    d="M85 58 L115 58 L130 80 L100 115 L70 80 Z"
                    fill={isBack ? 'url(#activeGradient)' : (isShoulders ? 'url(#secondaryGradient)' : '#2f2f2f')}
                    filter={isBack ? 'url(#muscleGlow)' : undefined}
                    stroke={isBack ? '#6ee7b7' : '#525252'}
                    strokeWidth={isBack ? '2' : '1'}
                  />

                  {/* Rear Delts */}
                  <path
                    d="M62 65 Q52 80 56 92 Q66 85 70 75 Z"
                    fill={isShoulders ? 'url(#activeGradient)' : '#333'}
                    stroke={isShoulders ? '#6ee7b7' : '#525252'}
                  />
                  <path
                    d="M138 65 Q148 80 144 92 Q134 85 130 75 Z"
                    fill={isShoulders ? 'url(#activeGradient)' : '#333'}
                    stroke={isShoulders ? '#6ee7b7' : '#525252'}
                  />

                  {/* Lats (Latissimus Dorsi) */}
                  <g className="transition-all duration-500">
                    <path
                      d="M68 85 L96 115 L85 155 L74 135 Q65 110 68 85 Z"
                      fill={isBack ? 'url(#activeGradient)' : '#2b2b2b'}
                      filter={isBack ? 'url(#muscleGlow)' : undefined}
                      stroke={isBack ? '#6ee7b7' : '#525252'}
                      strokeWidth={isBack ? '2.5' : '1'}
                    />
                    <path
                      d="M132 85 L104 115 L115 155 L126 135 Q135 110 132 85 Z"
                      fill={isBack ? 'url(#activeGradient)' : '#2b2b2b'}
                      filter={isBack ? 'url(#muscleGlow)' : undefined}
                      stroke={isBack ? '#6ee7b7' : '#525252'}
                      strokeWidth={isBack ? '2.5' : '1'}
                    />
                  </g>

                  {/* Triceps (Back of Arms) - HIGHLIGHTED FOR DIPS / TRICEPS */}
                  <g className="transition-all duration-500">
                    {/* Left Tricep */}
                    <path
                      d="M51 90 Q44 110 49 125 Q58 122 59 105 Z"
                      fill={isTriceps ? 'url(#activeGradient)' : (isChest ? 'url(#secondaryGradient)' : '#2e2e2e')}
                      filter={isTriceps ? 'url(#muscleGlow)' : undefined}
                      stroke={isTriceps ? '#6ee7b7' : '#525252'}
                      strokeWidth={isTriceps ? '2.5' : '1'}
                    />
                    {/* Right Tricep */}
                    <path
                      d="M149 90 Q156 110 151 125 Q142 122 141 105 Z"
                      fill={isTriceps ? 'url(#activeGradient)' : (isChest ? 'url(#secondaryGradient)' : '#2e2e2e')}
                      filter={isTriceps ? 'url(#muscleGlow)' : undefined}
                      stroke={isTriceps ? '#6ee7b7' : '#525252'}
                      strokeWidth={isTriceps ? '2.5' : '1'}
                    />
                  </g>

                  {/* Forearms Back */}
                  <path d="M46 128 L57 128 L54 165 L43 165 Z" fill="#2b2b2b" stroke="#404040" strokeWidth="0.5" />
                  <path d="M154 128 L143 128 L146 165 L157 165 Z" fill="#2b2b2b" stroke="#404040" strokeWidth="0.5" />

                  {/* Gluteus Maximus (Glutes / المؤخرة) */}
                  <g className="transition-all duration-500">
                    <path
                      d="M74 168 Q68 195 86 210 L98 185 L84 168 Z"
                      fill={isGlutes ? 'url(#activeGradient)' : (isLegs ? 'url(#secondaryGradient)' : '#2e2e2e')}
                      filter={isGlutes ? 'url(#muscleGlow)' : undefined}
                      stroke={isGlutes ? '#6ee7b7' : '#525252'}
                      strokeWidth={isGlutes ? '2.5' : '1'}
                    />
                    <path
                      d="M126 168 Q132 195 114 210 L102 185 L116 168 Z"
                      fill={isGlutes ? 'url(#activeGradient)' : (isLegs ? 'url(#secondaryGradient)' : '#2e2e2e')}
                      filter={isGlutes ? 'url(#muscleGlow)' : undefined}
                      stroke={isGlutes ? '#6ee7b7' : '#525252'}
                      strokeWidth={isGlutes ? '2.5' : '1'}
                    />
                  </g>

                  {/* Hamstrings (Back of Thighs) */}
                  <g className="transition-all duration-500">
                    <path
                      d="M76 212 Q70 235 79 248 L93 248 Q96 230 94 212 Z"
                      fill={isLegs && !isGlutes ? 'url(#activeGradient)' : '#2b2b2b'}
                      stroke={isLegs ? '#6ee7b7' : '#444'}
                      strokeWidth="1"
                    />
                    <path
                      d="M124 212 Q130 235 121 248 L107 248 Q104 230 106 212 Z"
                      fill={isLegs && !isGlutes ? 'url(#activeGradient)' : '#2b2b2b'}
                      stroke={isLegs ? '#6ee7b7' : '#444'}
                      strokeWidth="1"
                    />
                  </g>

                  {/* Gastrocnemius (Calves / بطات الساق) */}
                  <g className="transition-all duration-500">
                    <path
                      d="M77 252 Q69 275 80 305 L91 305 Q96 275 92 252 Z"
                      fill={isCalves ? 'url(#activeGradient)' : '#2b2b2b'}
                      filter={isCalves ? 'url(#muscleGlow)' : undefined}
                      stroke={isCalves ? '#6ee7b7' : '#444'}
                      strokeWidth={isCalves ? '2' : '0.5'}
                    />
                    <path
                      d="M123 252 Q131 275 120 305 L109 305 Q104 275 108 252 Z"
                      fill={isCalves ? 'url(#activeGradient)' : '#2b2b2b'}
                      filter={isCalves ? 'url(#muscleGlow)' : undefined}
                      stroke={isCalves ? '#6ee7b7' : '#444'}
                      strokeWidth={isCalves ? '2' : '0.5'}
                    />
                  </g>
                </g>
              )}
            </svg>

            {/* Target Muscle Floating Badge on the figure */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>العضلة المشتعلة</span>
              </div>
              <span className="font-mono text-neutral-300">
                {viewAngle === 'front' ? 'منظر أمامي (Anterior)' : 'منظر خلفي (Posterior)'}
              </span>
            </div>
          </div>
        </div>

        {/* Muscle Information & Free Descent Biomechanics Card */}
        <div className="md:col-span-7 space-y-3">
          {/* Target Muscle Card */}
          <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400">العضلة المستهدفة الأساسية (Primary):</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black">
                {exercise.targetMuscle}
              </span>
            </div>
            
            <p className="text-xs text-emerald-300 font-semibold leading-relaxed">
              {exercise.targetMuscleDetail || 'التركيز المباشر على الألياف العضلية الرئيسية مع أقصى تمدد وانقباض.'}
            </p>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">العضلات الثانوية المساعدة:</span>
              <span className="text-blue-400 font-medium">
                {exercise.secondaryMuscles || 'عضلات الجذع والتثبيت'}
              </span>
            </div>
          </div>

          {/* Biomechanics: Free Descent / Eccentric Phase Explanation */}
          <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2">
            <h5 className="text-xs font-black text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ميكانيكية النزول الحر والتمدد العضلي (Free Descent Phases):</span>
            </h5>

            <div className="grid grid-cols-3 gap-1.5 text-[11px] text-center">
              <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                <span className="text-amber-400 font-black block text-xs">1. النزول الحر ⬇️</span>
                <span className="text-[10px] text-neutral-300 block mt-0.5">3-4 ثوانٍ هبوط متحكم</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/40">
                <span className="text-emerald-400 font-black block text-xs">2. قاع التمدد ⚡</span>
                <span className="text-[10px] text-emerald-200 block mt-0.5">ثانية واحدة عصر عميق</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                <span className="text-blue-400 font-black block text-xs">3. الدفع الصاعد ⬆️</span>
                <span className="text-[10px] text-neutral-300 block mt-0.5">انفجارية بوزن الجسم</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed pt-1">
              💡 <strong>قاعدة كوتش باور جيم الذهبية:</strong> في تمارين النزول الحر (مثل المتوازي أو السكوات)، فإن مقاومة الجاذبية أثناء الهبوط البطيء هي المسؤولة عن تفعيل <strong>70% من إشارات التضخيم العضلي (Hypertrophy)</strong> وزيادة كثافة الألياف!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
