import React, { useState } from 'react';
import { Apple, Flame, TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle, Droplets, Moon } from 'lucide-react';
import { DIET_PLANS } from '../data/gymData';

interface DietPlansSectionProps {
  initialPlanType?: 'gain' | 'lose';
}

export const DietPlansSection: React.FC<DietPlansSectionProps> = ({ initialPlanType = 'gain' }) => {
  const [selectedPlanType, setSelectedPlanType] = useState<'gain' | 'lose'>(initialPlanType);

  const currentPlan = DIET_PLANS.find((p) => p.id === selectedPlanType) || DIET_PLANS[0];

  return (
    <div className="space-y-6">
      {/* Header and Switcher */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
              <Apple className="w-3.5 h-3.5" />
              <span>الأنظمة الغذائية الرياضية المعتمدة في باور جيم</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
              الأنظمة الغذائية لبناء الأجسام والرشاقة
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl">
              أنظمة متوازنة محسوبة السعرات والماكروز تعتمد على أطعمة طبيعية وصحية ومتاحة لدعم أهدافك الرياضية داخل الصالة.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setSelectedPlanType('gain')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                selectedPlanType === 'gain'
                  ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>نظام زيادة الوزن والضخامة 💪</span>
            </button>

            <button
              onClick={() => setSelectedPlanType('lose')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                selectedPlanType === 'lose'
                  ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>نظام إنقاص الوزن والتنشيف 🔥</span>
            </button>
          </div>
        </div>

        {/* Selected Plan Highlights */}
        <div className="mt-6 pt-6 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-xs text-neutral-400 block mb-1">الهدف الرئيسي:</span>
            <div className="font-bold text-white text-sm">
              {currentPlan.title}
            </div>
            <p className="text-xs text-neutral-400 mt-1">{currentPlan.targetDescription}</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-xs text-neutral-400 block mb-1">السعرات اليومية المستهدفة:</span>
            <div className="font-bold text-amber-400 text-sm">
              {currentPlan.dailyCaloriesHint}
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">تعدل بحسب وزنك ونشاطك من حاسبة السعرات</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1 text-xs">
            <span className="text-neutral-400 block">توزيع المغذيات الكبرى (Macros):</span>
            <div className="text-neutral-200"><strong className="text-amber-400">البروتين:</strong> {currentPlan.macrosBreakdown.protein}</div>
            <div className="text-neutral-200"><strong className="text-amber-400">الكاربوهيدرات:</strong> {currentPlan.macrosBreakdown.carbs}</div>
            <div className="text-neutral-200"><strong className="text-amber-400">الدهون الصحية:</strong> {currentPlan.macrosBreakdown.fats}</div>
          </div>
        </div>
      </div>

      {/* Golden Rules Callout */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 sm:p-6">
        <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-amber-400">★</span>
          <span>القواعد الذهبية لنجاح هذا النظام:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentPlan.goldenRules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Meals Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white font-heading">
            الجدول الغذائي اليومي المتكامل (الوجبات خطوة بخطوة)
          </h3>
          <span className="text-xs text-neutral-400">
            {currentPlan.meals.length} وجبات يومية موزعة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPlan.meals.map((meal) => (
            <div
              key={meal.mealNumber}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-neutral-700 transition"
            >
              <div>
                {/* Meal header */}
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center">
                      {meal.mealNumber}
                    </span>
                    <h4 className="font-bold text-white text-base">
                      {meal.title}
                    </h4>
                  </div>
                  <span className="text-xs text-neutral-400 bg-neutral-950 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {meal.time}
                  </span>
                </div>

                {/* Items list */}
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 mt-4 leading-relaxed">
                  {meal.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nutrition highlight */}
              <div className="pt-3 border-t border-neutral-800/80 text-[11px] text-amber-300/80 flex items-center gap-1.5 bg-neutral-950/40 p-2.5 rounded-xl">
                <span>💡</span>
                <span>{meal.nutritionHighlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
