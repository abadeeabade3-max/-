import React, { useState } from 'react';
import { Calculator, Flame, Scale, TrendingUp, TrendingDown, Sparkles, Check, ArrowRight } from 'lucide-react';
import { CalorieResult } from '../types';
import { WorkoutBurnTimer } from './WorkoutBurnTimer';

interface CalorieSectionProps {
  onNavigateToDiet: (type: 'gain' | 'lose') => void;
}

export const CalorieSection: React.FC<CalorieSectionProps> = ({ onNavigateToDiet }) => {
  const [gender, setGender] = useState<'men' | 'women'>('men');
  const [age, setAge] = useState<number>(24);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [activityFactor, setActivityFactor] = useState<number>(1.55); // moderate exercise 3-5 days
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'burnTimer'>('burnTimer');

  // Calculate BMR using Mifflin-St Jeor Formula
  const calculateBmr = () => {
    if (gender === 'men') {
      return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  };

  const bmr = Math.round(calculateBmr());
  const tdee = Math.round(bmr * activityFactor);
  const loseWeightCalories = tdee - 500;
  const gainWeightCalories = tdee + 500;

  // Macros for gain (2g protein/kg, 25% fat, rest carbs)
  const gainProtein = Math.round(weightKg * 2.2); // grams
  const gainFats = Math.round((gainWeightCalories * 0.25) / 9); // grams
  const gainCarbs = Math.round((gainWeightCalories - (gainProtein * 4 + gainFats * 9)) / 4);

  // Macros for lose (2.4g protein/kg, 20% fat, rest carbs)
  const loseProtein = Math.round(weightKg * 2.2);
  const loseFats = Math.round((loseWeightCalories * 0.25) / 9);
  const loseCarbs = Math.round((loseWeightCalories - (loseProtein * 4 + loseFats * 9)) / 4);

  return (
    <div className="space-y-6">
      {/* Top Switcher: Calculator vs Active Workout Timer */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800">
          <button
            onClick={() => setActiveSubTab('burnTimer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
              activeSubTab === 'burnTimer'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>مؤقت حرق السعرات أثناء التمرين 🔥</span>
          </button>

          <button
            onClick={() => setActiveSubTab('calculator')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
              activeSubTab === 'calculator'
                ? 'bg-amber-500 text-neutral-950 shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>حاسبة الاحتياج اليومي (BMR & TDEE)</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'burnTimer' ? (
        <WorkoutBurnTimer />
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>حاسبة الطاقة والاحتياج الغذائي الدقيق</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              حاسبة السعرات الحرارية لزيادة الوزن وإنقاص الوزن
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              احسب معدل الأيض الأساسي (BMR) ومجموع استهلاك الطاقة اليومي (TDEE) لتحديد سعراتك للتضخيم أو التنشيف مع تفصيل الماكروز.
            </p>
          </div>

          {/* Calculator Inputs and Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Inputs (5 cols) */}
            <div className="lg:col-span-5 bg-neutral-950/80 p-5 sm:p-6 rounded-2xl border border-neutral-800 space-y-4">
              <h4 className="font-bold text-white text-sm border-b border-neutral-800 pb-3 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>بيانات الجسم ومستوى النشاط:</span>
              </h4>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1.5">الجنس:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('men')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                      gender === 'men'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    ذكر 🏋️‍♂️
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('women')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                      gender === 'women'
                        ? 'bg-pink-500 text-white'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    أنثى 🏋️‍♀️
                  </button>
                </div>
              </div>

              {/* Age & Height */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 mb-1">العمر (سنة):</label>
                  <input
                    type="number"
                    min={14}
                    max={80}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 mb-1">الطول (سم):</label>
                  <input
                    type="number"
                    min={120}
                    max={220}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">الوزن الحالي (كجم):</label>
                <input
                  type="number"
                  min={35}
                  max={200}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 mb-1">مستوى النشاط الأسبوعي:</label>
                <select
                  value={activityFactor}
                  onChange={(e) => setActivityFactor(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-amber-500 focus:outline-none cursor-pointer"
                >
                  <option value={1.2}>خامل (عمل مكتبي بدون تمارين)</option>
                  <option value={1.375}>نشاط خفيف (تمارين 1-3 أيام أسبوعياً)</option>
                  <option value={1.55}>نشاط متوسط (تمارين 3-5 أيام في باور جيم)</option>
                  <option value={1.725}>نشاط عالي (تمارين مكثفة 6-7 أيام أسبوعياً)</option>
                  <option value={1.9}>نشاط شاق جداً (تدريب مضاعف ورياضي محترف)</option>
                </select>
              </div>
            </div>

            {/* Results Callouts (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Top baseline numbers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">معدل الأيض الأساسي (BMR)</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    {bmr} <span className="text-xs font-normal text-neutral-400">سعرة/يوم</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    حرق جسمك في حالة الراحة التامة
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-xs text-neutral-400 block mb-1">إجمالي احتياج التثبيت (TDEE)</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {tdee} <span className="text-xs font-normal text-neutral-400">سعرة/يوم</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    للحفاظ على وزنك الحالي مع نشاطك
                  </span>
                </div>
              </div>

              {/* Weight Goal Cards: Gain vs Lose */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Weight Gain Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-neutral-950 border border-amber-500/40 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      زيادة الوزن والضخامة
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                      +500 سعرة
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl font-black text-white font-mono">
                      {gainWeightCalories} <span className="text-xs text-amber-400 font-normal">سعرة/يوم</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      لكسب كتلة عضلية نقية بمعدل 0.3 - 0.5 كجم أسبوعياً
                    </p>
                  </div>

                  {/* Macros */}
                  <div className="pt-2 border-t border-neutral-800/80 grid grid-cols-3 gap-1 text-center text-xs">
                    <div className="bg-neutral-900/80 p-1.5 rounded">
                      <span className="block text-[10px] text-neutral-400">بروتين</span>
                      <span className="font-bold text-white">{gainProtein}g</span>
                    </div>
                    <div className="bg-neutral-900/80 p-1.5 rounded">
                      <span className="block text-[10px] text-neutral-400">كارب</span>
                      <span className="font-bold text-white">{gainCarbs}g</span>
                    </div>
                    <div className="bg-neutral-900/80 p-1.5 rounded">
                      <span className="block text-[10px] text-neutral-400">دهون</span>
                      <span className="font-bold text-white">{gainFats}g</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToDiet('gain')}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>عرض جدول وجبات زيادة الوزن</span>
                    <ArrowRight className="w-3.5 h-3.5 -scale-x-100" />
                  </button>
                </div>

                {/* Weight Loss Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-neutral-950 border border-emerald-500/40 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      إنقاص الوزن والتنشيف
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                      -500 سعرة
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl font-black text-white font-mono">
                      {loseWeightCalories} <span className="text-xs text-emerald-400 font-normal">سعرة/يوم</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      لحرق الدهون العنيدة بمعدل 0.5 - 0.7 كجم دهون أسبوعياً
                    </p>
                  </div>

                  {/* Macros */}
                  <div className="pt-2 border-t border-neutral-800/80 grid grid-cols-3 gap-1 text-center text-xs">
                    <div className="bg-neutral-900/80 p-1.5 rounded">
                      <span className="block text-[10px] text-neutral-400">بروتين</span>
                      <span className="font-bold text-white">{loseProtein}g</span>
                    </div>
                    <div className="bg-neutral-900/80 p-1.5 rounded">
                      <span className="block text-[10px] text-neutral-400">كارب</span>
                      <span className="font-bold text-white">{loseCarbs}g</span>
                    </div>
                    <div className="bg-neutral-900/80 p-1.5 rounded">
                      <span className="block text-[10px] text-neutral-400">دهون</span>
                      <span className="font-bold text-white">{loseFats}g</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToDiet('lose')}
                    className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>عرض جدول وجبات إنقاص الوزن</span>
                    <ArrowRight className="w-3.5 h-3.5 -scale-x-100" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
