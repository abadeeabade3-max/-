import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, Shield, Users, Sparkles, AlertTriangle } from 'lucide-react';
import { WEEKLY_SCHEDULE } from '../data/gymData';
import { DaySchedule } from '../types';

export const ScheduleSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'both' | 'men' | 'women'>('both');
  const todayDayIndex = new Date().getDay();

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>المواعيد الرسمية المعتمدة لصالة باور جيم</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
            جدول أوقات الصالة الأسبوعي
          </h2>
          <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
            مواعيد منظمة بدقة بين فترات الرجال وفترات النساء لضمان الخصوصية والراحة التامة لجميع المتدربين. يوم الجمعة راحة عامة للصالة.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveFilter('both')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeFilter === 'both'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            الجدول الكامل 📋
          </button>
          <button
            onClick={() => setActiveFilter('men')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeFilter === 'men'
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            أوقات الرجال 🏋️‍♂️
          </button>
          <button
            onClick={() => setActiveFilter('women')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeFilter === 'women'
                ? 'bg-pink-500 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            أوقات النساء 🏋️‍♀️
          </button>
        </div>
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WEEKLY_SCHEDULE.map((day) => {
          const isToday = day.dayIndex === todayDayIndex;
          const isFriday = day.dayIndex === 5;

          return (
            <div
              key={day.dayName}
              className={`rounded-2xl border transition relative overflow-hidden flex flex-col justify-between ${
                isToday
                  ? 'border-amber-500/80 bg-neutral-900/95 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/40'
                  : isFriday
                  ? 'border-neutral-800 bg-neutral-950/70 opacity-90'
                  : 'border-neutral-800 bg-neutral-900/70 hover:border-neutral-700'
              }`}
            >
              {/* Today Tag */}
              {isToday && (
                <div className="bg-amber-500 text-neutral-950 text-xs font-black text-center py-1 px-3">
                  ★ اليوم الحالي في الصالة ★
                </div>
              )}

              <div className="p-5 space-y-4">
                {/* Day title */}
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      isFriday 
                        ? 'bg-neutral-800 text-neutral-400' 
                        : isToday 
                        ? 'bg-amber-500 text-neutral-950' 
                        : 'bg-neutral-800 text-amber-400'
                    }`}>
                      {day.dayName.charAt(0)}
                    </div>
                    <h3 className="text-lg font-black text-white font-heading">
                      {day.dayName}
                    </h3>
                  </div>

                  {isFriday ? (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/40 font-bold">
                      عطلة وراحة ☕
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-400">
                      مفتوح
                    </span>
                  )}
                </div>

                {isFriday ? (
                  <div className="py-6 text-center text-neutral-400 space-y-2">
                    <p className="font-bold text-neutral-300">يوم الجمعة راحة واستشفاء</p>
                    <p className="text-xs text-neutral-500">
                      الصالة مغلقة لإجراء الصيانة الدورية والنظافة والاستشفاء العضلي للرياضيين.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm">
                    {/* Women Schedule */}
                    {(activeFilter === 'both' || activeFilter === 'women') && (
                      <div className="bg-pink-950/20 border border-pink-900/30 rounded-xl p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-pink-400" />
                            مواعيد النساء 🏋️‍♀️
                          </span>
                          <span className="text-[11px] text-pink-300/70 font-semibold">فترة خاصة</span>
                        </div>
                        <div className="text-white font-semibold flex items-center gap-2 text-sm pt-1">
                          <Clock className="w-4 h-4 text-pink-400 shrink-0" />
                          <span>
                            {day.womenSlots.map((s) => `${s.start} إلى ${s.end}`).join(' | ')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Men Schedule */}
                    {(activeFilter === 'both' || activeFilter === 'men') && (
                      <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            مواعيد الرجال 🏋️‍♂️
                          </span>
                          <span className="text-[11px] text-amber-300/70 font-semibold">
                            {day.menSlots.length > 1 ? 'فترتان (نهار وليل)' : 'فترة مسائية'}
                          </span>
                        </div>
                        <div className="space-y-1 pt-1">
                          {day.menSlots.map((slot, idx) => (
                            <div key={idx} className="text-white font-semibold flex items-center justify-between gap-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>{slot.start} إلى {slot.end}</span>
                              </div>
                              <span className="text-[10px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded">
                                {slot.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Quick Notice */}
              <div className="px-5 py-2.5 bg-neutral-950/60 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
                <span>باور جيم - Power Gym</span>
                <span className="text-neutral-500">نظام المجموعات الاحترافي</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Reference Callout */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 border-l border-neutral-800 pl-0 md:pl-6">
          <h4 className="font-bold text-amber-400 flex items-center gap-2 text-base">
            <span>🏋️‍♂️</span> ملخص توقيتات الرجال
          </h4>
          <ul className="text-xs sm:text-sm text-neutral-300 space-y-1.5 leading-relaxed">
            <li>• <strong>السبت والاثنين والخميس:</strong> من 1:00 مساءً إلى 12:00 ليلاً (فترة مسائية متواصلة).</li>
            <li>• <strong>الأحد والثلاثاء والأربعاء:</strong> فترتان (من 10:00 صباحاً إلى 3:30 مساءً) و (من 6:30 مساءً إلى 12:00 ليلاً).</li>
            <li>• <strong>الجمعة:</strong> راحة تامة.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-pink-400 flex items-center gap-2 text-base">
            <span>🏋️‍♀️</span> ملخص توقيتات النساء
          </h4>
          <ul className="text-xs sm:text-sm text-neutral-300 space-y-1.5 leading-relaxed">
            <li>• <strong>السبت والاثنين والخميس:</strong> من 9:00 صباحاً إلى 1:00 مساءً (فترة صباحية هادئة).</li>
            <li>• <strong>الأحد والثلاثاء والأربعاء:</strong> من 4:00 مساءً إلى 6:30 مساءً (فترة العصر والمساء).</li>
            <li>• <strong>الجمعة:</strong> راحة تامة.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
