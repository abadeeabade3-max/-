import React, { useState } from 'react';
import { 
  CreditCard, 
  Copy, 
  Check, 
  Facebook, 
  MessageCircle, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  QrCode, 
  HelpCircle,
  Clock,
  Send,
  Building2,
  FileCheck
} from 'lucide-react';
import { GYM_FACEBOOK_URL, COACH_NAME, COACH_FACEBOOK_URL, BANK_DETAILS } from '../data/gymData';
import confetti from 'canvas-confetti';

interface BankPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCoachModal?: () => void;
  onOpenManagementModal?: () => void;
}

export const BankPaymentModal: React.FC<BankPaymentModalProps> = ({
  isOpen,
  onClose,
  onOpenCoachModal,
  onOpenManagementModal
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('1-month');

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopied(false), 3000);
  };

  const planOptions = [
    { id: '1-month', name: 'اشتراك شهر كامل', desc: 'تدريب حديد ولياقة وأجهزة متكاملة' },
    { id: '3-months', name: 'اشتراك 3 أشهر', desc: 'متابعة شاملة وبرنامج تدريبي مخصص' },
    { id: '6-months', name: 'اشتراك 6 أشهر', desc: 'أفضل قيمة مع توفير ومتابعة دورية' },
    { id: '1-year', name: 'اشتراك سنوي VIP', desc: 'دخول غير محدود طوال العام' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      dir="rtl"
    >
      <div 
        className="relative w-full max-w-xl bg-neutral-900 border border-amber-500/40 rounded-3xl p-5 sm:p-7 text-neutral-100 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400">
                الدفع الإلكتروني والتحويل المالي
              </span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                تحويل مباشر معتمد
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              الدفع عبر تحويل مصرف شمال أفريقيا
            </h3>
          </div>
        </div>

        {/* Main Bank Account Box */}
        <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border-2 border-amber-500/50 rounded-2xl p-4 sm:p-5 shadow-inner mb-6 relative overflow-hidden">
          {/* Subtle Bank Brand Watermark */}
          <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs text-neutral-400 block font-medium">اسم المصرف:</span>
                <span className="text-sm font-black text-white">مصرف شمال أفريقيا (North Africa Bank)</span>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              تطبيق نافس (Nafes) 📱
            </span>
          </div>

          {/* Account Number Display */}
          <div className="mb-4">
            <span className="text-xs font-bold text-neutral-400 block mb-1">
              رقم الحساب المصرفي (Account Number):
            </span>
            <div className="flex items-center justify-between gap-2 p-3.5 rounded-xl bg-black/60 border border-amber-500/40">
              <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-amber-400 select-all" dir="ltr">
                {BANK_DETAILS.accountNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyAccount}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-black transition shadow-md cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-500 text-neutral-950 font-bold'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تم النسخ بنجاح!</span>
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

          {/* Supported Transfer Apps */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
            <span className="text-neutral-400">طرق التحويل المتاحة:</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">تطبيق نافس (Nafes)</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">تحويل بين حسابات شمال أفريقيا</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">إيداع نقدي بالفرع</span>
          </div>
        </div>

        {/* Step-by-Step Payment Instructions */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>خطوات إتمام وتفعيل الاشتراك:</span>
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                انسخ رقم الحساب <strong className="text-amber-400 font-mono" dir="ltr">{BANK_DETAILS.accountNumber}</strong> ثم افتح تطبيق نافس أو تطبيق مصرف شمال أفريقيا.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                قم بتحويل قيمة الاشتراك، واحتفظ بلقطة شاشة (Screenshot) أو إشعار التحويل المالي الناجح.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-neutral-950 font-black text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <p className="text-xs text-emerald-200 leading-relaxed">
                أرسل صورة الإيصال إلى <strong>صفحة فيسبوك الصالة الرسمية</strong> أو إلى الكوتش ليتم تفعيل اشتراكك وطباعة بطاقتك مباشرة!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Direct Facebook Page & Coach Contact */}
        <div className="space-y-2.5">
          <a
            href={GYM_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-black text-sm transition shadow-lg shadow-blue-500/20 cursor-pointer text-center group"
          >
            <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>إرسال إيصال التحويل عبر صفحة فيسبوك الصالة الرسمية</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenManagementModal) onOpenManagementModal();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold transition border border-blue-500/30 cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>تواصل مع إدارة الصالة 🏢</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenCoachModal) onOpenCoachModal();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold transition border border-amber-500/30 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل مع {COACH_NAME} 🏋️‍♂️</span>
            </button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            تحويل مصرفي آمن ومباشر
          </span>
          <span className="font-mono text-[10px] text-neutral-500">
            POWER GYM • NORTH AFRICA BANK
          </span>
        </div>
      </div>
    </div>
  );
};
