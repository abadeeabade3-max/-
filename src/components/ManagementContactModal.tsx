import React from 'react';
import { 
  Building2, 
  Facebook, 
  MapPin, 
  Clock, 
  Phone, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  MessageSquare, 
  Copy,
  Check,
  CreditCard,
  Sparkles
} from 'lucide-react';
import { GYM_FACEBOOK_URL, GYM_LOCATION_URL, GYM_NAME, BANK_DETAILS, COACH_NAME } from '../data/gymData';

interface ManagementContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCoachModal?: () => void;
  onOpenBankPayment?: () => void;
}

export const ManagementContactModal: React.FC<ManagementContactModalProps> = ({
  isOpen,
  onClose,
  onOpenCoachModal,
  onOpenBankPayment
}) => {
  const [copiedLink, setCopiedLink] = React.useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyFb = () => {
    navigator.clipboard.writeText(GYM_FACEBOOK_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      dir="rtl"
    >
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-blue-500/40 rounded-3xl p-5 sm:p-7 text-neutral-100 shadow-2xl my-8 animate-in fade-in-50 zoom-in-95 duration-200"
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

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
                إدارة الصالة الرسمية
              </span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                مكتب الاستقبال والإدارة
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              تواصل مع إدارة {GYM_NAME}
            </h3>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 space-y-3 mb-5">
          <p className="text-xs text-neutral-300 leading-relaxed">
            فريق إدارة الصالة في خدمتكم للإجابة عن استفساراتكم بشأن <strong>الاشتراكات، الدفع المصرفي، مواعيد الفترات الرجالية والنسائية، والشكاوى والاقتراحات</strong>.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-400 block">فترة الرجال:</span>
                <span className="font-bold text-white text-[11px]">متاحة يومياً</span>
              </div>
            </div>

            <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-400 block">فترة السيدات:</span>
                <span className="font-bold text-white text-[11px]">أيام مخصصة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-3 mb-6">
          {/* Official Facebook Page Direct Button */}
          <a
            href={GYM_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-black text-sm transition shadow-lg shadow-blue-500/20 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="block text-sm font-black">مراسلة إدارة الصالة عبر فيسبوك</span>
                <span className="block text-[11px] font-normal text-blue-100">facebook.com/powergymly</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-90 group-hover:translate-x-[-2px] transition-transform" />
          </a>

          {/* Location & Directions Button */}
          <a
            href={GYM_LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500/40 text-neutral-200 transition cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="block text-sm font-bold text-white">موقع الصالة على خرائط جوجل</span>
                <span className="block text-[11px] text-neutral-400">زيارة مقر الصالة والاستقبال</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
          </a>

          {/* Quick Bank Details Action */}
          {onOpenBankPayment && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBankPayment();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 text-amber-400 transition cursor-pointer text-right group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-amber-300">تحويل مصرف شمال أفريقيا</span>
                  <span className="block text-[11px] text-neutral-400 font-mono" dir="ltr">{BANK_DETAILS.accountNumber}</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded bg-amber-500 text-neutral-950 shadow">
                عرض الحساب ←
              </span>
            </button>
          )}

          {/* Quick Coach Contact Link */}
          {onOpenCoachModal && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCoachModal();
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition cursor-pointer text-right"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🏋️‍♂️</span>
                <div>
                  <span className="block text-xs font-bold text-white">تريد استشارة فنية أو جدول تمارين؟</span>
                  <span className="block text-[11px] text-neutral-400">تواصل مباشرة مع {COACH_NAME}</span>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-bold">
                مراسلة الكوتش ←
              </span>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <button
            type="button"
            onClick={handleCopyFb}
            className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:underline cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'تم نسخ رابط الصفحة!' : 'نسخ رابط فيسبوك الصالة'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
