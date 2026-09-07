import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, AlertTriangle, CheckCircle2, Clock, User, Bell, RefreshCw, PlusCircle, Trash2, Award, Printer, Building2, Copy, Check, Facebook, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MemberSubscription, SubscriptionDuration } from '../types';
import { BANK_DETAILS, GYM_FACEBOOK_URL, COACH_NAME } from '../data/gymData';

interface SubscriptionSectionProps {
  onOpenCoachModal?: () => void;
  onOpenManagementModal?: () => void;
}

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  onOpenCoachModal,
  onOpenManagementModal
}) => {
  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<MemberSubscription[]>(() => {
    try {
      const saved = localStorage.getItem('power_gym_subscriptions');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default demo subscription for immediate user preview
    const today = new Date();
    const startDateStr = today.toISOString().split('T')[0];
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 1);
    const endDateStr = endDate.toISOString().split('T')[0];

    return [
      {
        id: 'default-sub',
        memberName: 'محمد علي',
        phone: '0912345678',
        startDate: startDateStr,
        duration: '1-month',
        endDate: endDateStr,
        createdAt: new Date().toISOString(),
        notes: 'اشتراك صالة وتدريب حديد'
      }
    ];
  });

  const [activeSubId, setActiveSubId] = useState<string>(subscriptions[0]?.id || '');
  
  // Form State
  const [nameInput, setNameInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [startDateInput, setStartDateInput] = useState<string>(new Date().toISOString().split('T')[0]);
  const [durationInput, setDurationInput] = useState<SubscriptionDuration>('1-month');
  const [notesInput, setNotesInput] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('power_gym_subscriptions', JSON.stringify(subscriptions));
    } catch {
      // ignore
    }
  }, [subscriptions]);

  // Calculate End Date helper
  const calculateEndDate = (start: string, duration: SubscriptionDuration): string => {
    const d = new Date(start);
    if (duration === '1-month') {
      d.setMonth(d.getMonth() + 1);
    } else if (duration === '3-months') {
      d.setMonth(d.getMonth() + 3);
    } else if (duration === '6-months') {
      d.setMonth(d.getMonth() + 6);
    } else if (duration === '1-year') {
      d.setFullYear(d.getFullYear() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      alert('يرجى كتابة اسم المشترك');
      return;
    }

    const calculatedEnd = calculateEndDate(startDateInput, durationInput);
    const newSub: MemberSubscription = {
      id: Date.now().toString(),
      memberName: nameInput.trim(),
      phone: phoneInput.trim(),
      startDate: startDateInput,
      duration: durationInput,
      endDate: calculatedEnd,
      createdAt: new Date().toISOString(),
      notes: notesInput.trim()
    };

    const updated = [newSub, ...subscriptions];
    setSubscriptions(updated);
    setActiveSubId(newSub.id);
    setNameInput('');
    setPhoneInput('');
    setNotesInput('');
    setIsAddingNew(false);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleRenewSubscription = (subId: string) => {
    const sub = subscriptions.find((s) => s.id === subId);
    if (!sub) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const newEnd = calculateEndDate(todayStr, sub.duration);

    const updated = subscriptions.map((s) => {
      if (s.id === subId) {
        return {
          ...s,
          startDate: todayStr,
          endDate: newEnd
        };
      }
      return s;
    });

    setSubscriptions(updated);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const handleDeleteSubscription = (subId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الاشتراك؟')) {
      const updated = subscriptions.filter((s) => s.id !== subId);
      setSubscriptions(updated);
      if (activeSubId === subId && updated.length > 0) {
        setActiveSubId(updated[0].id);
      }
    }
  };

  const currentSub = subscriptions.find((s) => s.id === activeSubId) || subscriptions[0];

  // Subscription Status computation
  const getSubStatus = (sub: MemberSubscription) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const end = new Date(sub.endDate);
    end.setHours(0, 0, 0, 0);
    const start = new Date(sub.startDate);
    start.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const elapsedDays = totalDays - diffDays;
    const progress = Math.min(100, Math.max(0, Math.round((elapsedDays / totalDays) * 100)));

    if (diffDays < 0) {
      return {
        status: 'expired' as const,
        diffDays,
        progress: 100,
        label: 'منتهي الصلاحية',
        colorClass: 'text-red-400 bg-red-950/40 border-red-500/40'
      };
    } else if (diffDays <= 5) {
      return {
        status: 'expiring_soon' as const,
        diffDays,
        progress,
        label: `شارف على الانتهاء (متبقي ${diffDays} يوم)`,
        colorClass: 'text-amber-400 bg-amber-950/40 border-amber-500/40'
      };
    } else {
      return {
        status: 'active' as const,
        diffDays,
        progress,
        label: `ساري ونشط (متبقي ${diffDays} يوم)`,
        colorClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40'
      };
    }
  };

  const durationLabels: Record<SubscriptionDuration, string> = {
    '1-month': 'شهر واحد (1 شهر)',
    '3-months': '3 أشهر (ربع سنوي)',
    '6-months': '6 أشهر (نصف سنوي)',
    '1-year': 'سنة كاملة (12 شهر)'
  };

  const statusInfo = currentSub ? getSubStatus(currentSub) : null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>نظام بطاقات المشتركين والتنبيهات الذكية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
            إدارة اشتراك المشترك وتنبيهات الانتهاء
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-2xl">
            سجل بيانات اشتراكك في نادي باور جيم، وحدد تاريخ البدء ونوع الاشتراك (شهر، 3 أشهر، 6 أشهر، أو سنة) لتلقي إشعار فوري عند انتهاء الاشتراك.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/20 shrink-0 self-start md:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isAddingNew ? 'إخفاء نموذج الإضافة' : 'تسجيل اشتراك جديد +'}</span>
        </button>
      </div>

      {/* Expiry Urgent Alert Banner when expired (Prompt Requirement) */}
      {statusInfo?.status === 'expired' && (
        <div className="bg-gradient-to-r from-red-950 via-red-900/60 to-red-950 border-2 border-red-500 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-4 text-center sm:text-right">
            <div className="p-3 bg-red-500 text-neutral-950 rounded-2xl shrink-0 font-bold">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                ⚠️ إشعار هام: اشتراكك انتهى!
              </h3>
              <p className="text-xs sm:text-sm text-red-200 mt-1">
                عزيزي المشترك <strong className="text-white underline">{currentSub?.memberName}</strong>، لقد انتهت صلاحية اشتراكك في صالة باور جيم بتاريخ ({currentSub?.endDate}). يرجى التوجه لإدارة الصالة لتجديد الاشتراك ومواصلة تمارينك.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleRenewSubscription(currentSub.id)}
            className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-100 text-red-950 font-black text-sm shadow-xl transition whitespace-nowrap cursor-pointer"
          >
            تجديد الاشتراك الآن ↺
          </button>
        </div>
      )}

      {/* Expiring Soon Notice */}
      {statusInfo?.status === 'expiring_soon' && (
        <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-amber-400 text-base">
                تنبيه: اقتراب موعد انتهاء الاشتراك!
              </h4>
              <p className="text-xs text-neutral-300 mt-0.5">
                متبقي فقط <strong>{statusInfo.diffDays} أيام</strong> على نهاية اشتراكك ({currentSub?.endDate}). يرجى الاستعداد للتجديد.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleRenewSubscription(currentSub.id)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition cursor-pointer shrink-0"
          >
            تجديد مبكر
          </button>
        </div>
      )}

      {/* Add New Subscription Form Modal/Drawer */}
      {isAddingNew && (
        <form
          onSubmit={handleAddSubscription}
          className="bg-neutral-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-amber-400" />
              <span>تسجيل بطاقة اشتراك رياضي جديدة</span>
            </h3>
            <span className="text-xs text-neutral-400">نادي باور جيم الرسمي</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Member Name */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                اسم المشترك بالكامل *:
              </label>
              <input
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="مثال: أحمد عبدالسلام"
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                رقم الهاتف (اختياري):
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="091xxxxxxx"
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                تاريخ بداية الاشتراك *:
              </label>
              <input
                type="date"
                required
                value={startDateInput}
                onChange={(e) => setStartDateInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                نوع الاشتراك والمدة *:
              </label>
              <select
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value as SubscriptionDuration)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:outline-none cursor-pointer"
              >
                <option value="1-month">شهر واحد (1 شهر)</option>
                <option value="3-months">3 أشهر</option>
                <option value="6-months">6 أشهر</option>
                <option value="1-year">سنة كاملة (12 شهر)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">ملاحظات إضافية:</label>
            <input
              type="text"
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="مثال: باقة لياقة + كمال أجسام أو تدريب خاص"
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs font-bold transition cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              حفظ الاشتراك وإصدار البطاقة
            </button>
          </div>
        </form>
      )}

      {/* Main Grid: Card & List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Member Digital Gym Card (8 cols) */}
        {currentSub ? (
          <div className="lg:col-span-8 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            
            {/* Ambient Gold accent glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-start justify-between border-b border-neutral-800/80 pb-5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-xl">
                  {currentSub.memberName.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                    بطاقة اشتراك عضوية باور جيم
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    {currentSub.memberName}
                  </h3>
                  {currentSub.phone && (
                    <span className="text-xs text-neutral-400 font-mono">{currentSub.phone}</span>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-3.5 py-1.5 rounded-full border text-xs font-bold ${statusInfo?.colorClass}`}>
                {statusInfo?.label}
              </div>
            </div>

            {/* Progress Bar of Subscription */}
            <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-neutral-400">استهلاك فترة الاشتراك:</span>
                <span className={statusInfo?.status === 'expired' ? 'text-red-400' : 'text-amber-400'}>
                  {statusInfo?.progress}% ({statusInfo?.diffDays && statusInfo.diffDays > 0 ? `متبقي ${statusInfo.diffDays} يوم` : 'انتهت الفترة'})
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-neutral-950 border border-neutral-800 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    statusInfo?.status === 'expired'
                      ? 'bg-red-500'
                      : statusInfo?.status === 'expiring_soon'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${statusInfo?.progress}%` }}
                />
              </div>
            </div>

            {/* Subscription Key Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 relative z-10">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-0.5">نوع الاشتراك:</span>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{durationLabels[currentSub.duration]}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-0.5">تاريخ البداية:</span>
                <div className="font-bold text-neutral-200 text-sm flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>{currentSub.startDate}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block mb-0.5">تاريخ الانتهاء:</span>
                <div className={`font-black text-sm flex items-center gap-1.5 font-mono ${
                  statusInfo?.status === 'expired' ? 'text-red-400' : 'text-amber-400'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{currentSub.endDate}</span>
                </div>
              </div>
            </div>

            {currentSub.notes && (
              <div className="text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                <strong>ملاحظات العضوية:</strong> {currentSub.notes}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-800 relative z-10">
              <button
                onClick={() => handleRenewSubscription(currentSub.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-bold text-xs transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>تجديد هذا الاشتراك دورة جديدة</span>
              </button>

              <button
                onClick={() => handleDeleteSubscription(currentSub.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-neutral-500 hover:text-red-400 hover:bg-red-950/20 text-xs transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف البطاقة</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center space-y-4">
            <p className="text-neutral-400">لا يوجد اشتراك مسجل حالياً.</p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
            >
              تسجيل اشتراك جديد
            </button>
          </div>
        )}

        {/* Saved Subscriptions List (4 cols) */}
        <div className="lg:col-span-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>المشتركون المسجلون ({subscriptions.length})</span>
            </h4>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {subscriptions.map((sub) => {
              const subStat = getSubStatus(sub);
              const isSelected = sub.id === activeSubId;

              return (
                <div
                  key={sub.id}
                  onClick={() => setActiveSubId(sub.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-neutral-800 border-amber-500/50 shadow-md'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-bold text-white text-xs sm:text-sm truncate">
                      {sub.memberName}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      ينتهي: {sub.endDate}
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 border ${subStat.colorClass}`}>
                    {subStat.status === 'expired' ? 'منتهي ⚠️' : subStat.status === 'expiring_soon' ? 'قريب ⏳' : 'نشط ✓'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* North Africa Bank Payment & Facebook Transfer Confirmation Section */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400">
                  الدفع الإلكتروني المباشر
                </span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  حساب مصرفي رسمي معتمد
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
                الدفع عبر تحويل مصرف شمال أفريقيا
              </h3>
            </div>
          </div>

          <a
            href={GYM_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-blue-500/20 shrink-0"
          >
            <Facebook className="w-4 h-4" />
            <span>صفحة باور جيم على فيسبوك</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Account Info Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-neutral-950/80 border border-amber-500/40 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-bold">اسم المصرف:</span>
              <span className="text-xs font-black text-amber-400">تطبيق نافس (Nafes) متاح 📱</span>
            </div>
            <div className="text-sm sm:text-base font-black text-white">
              مصرف شمال أفريقيا (North Africa Bank)
            </div>

            <div>
              <span className="text-xs text-neutral-400 block mb-1.5 font-bold">
                رقم الحساب المصرفي (Account Number):
              </span>
              <div className="flex items-center justify-between gap-2 p-3.5 rounded-xl bg-black/80 border border-amber-500/30">
                <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-amber-400 select-all" dir="ltr">
                  {BANK_DETAILS.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
                    setCopiedBank(true);
                    try {
                      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                    } catch {
                      // ignore
                    }
                    setTimeout(() => setCopiedBank(false), 3000);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-black transition cursor-pointer shadow shrink-0 ${
                    copiedBank
                      ? 'bg-emerald-500 text-neutral-950 font-bold'
                      : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                  }`}
                >
                  {copiedBank ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>نسخ الرقم</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed">
              يمكنك التحويل بسهولة عبر تطبيق نافس الخاص بمصرف شمال أفريقيا، أو التحويل المباشر بين الحسابات، أو الإيداع النقدي في فرع المصرف.
            </p>
          </div>

          <div className="md:col-span-5 bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-3 flex flex-col justify-between">
            <h4 className="text-xs font-black text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>خطوات تأكيد وتفعيل الاشتراك:</span>
            </h4>
            <ol className="space-y-2 text-xs text-neutral-300 list-decimal list-inside leading-relaxed">
              <li>انسخ رقم الحساب وحوّل قيمة اشتراكك.</li>
              <li>التقط صورة أو لقطة شاشة لإيصال التحويل الناجح.</li>
              <li>أرسل صورة الإيصال لصفحة الصالة على فيسبوك.</li>
              <li>سيتم تفعيل وتجديد بطاقتك فوراً في الصالة!</li>
            </ol>

            <a
              href={GYM_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition shadow-md text-center cursor-pointer mt-2"
            >
              <Facebook className="w-4 h-4" />
              <span>إرسال إيصال الدفع عبر فيسبوك ↗</span>
            </a>

            {(onOpenCoachModal || onOpenManagementModal) && (
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-800/80 mt-1">
                {onOpenManagementModal && (
                  <button
                    type="button"
                    onClick={onOpenManagementModal}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-bold transition cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>إدارة الصالة 🏢</span>
                  </button>
                )}
                {onOpenCoachModal && (
                  <button
                    type="button"
                    onClick={onOpenCoachModal}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition cursor-pointer"
                  >
                    <span>كوتش {COACH_NAME} 🏋️</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
