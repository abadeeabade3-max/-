import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Send, 
  Facebook, 
  QrCode, 
  Sparkles, 
  Smartphone, 
  ExternalLink,
  Users,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  FileCode,
  Edit3,
  RefreshCw
} from 'lucide-react';
import { PowerGymLogo } from './PowerGymLogo';
import QRCode from 'qrcode';

interface ShareAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInstallModal?: () => void;
}

export const ShareAppModal: React.FC<ShareAppModalProps> = ({ 
  isOpen, 
  onClose, 
  onOpenInstallModal 
}) => {
  const defaultAisSharedUrl = 'https://ais-pre-3m2lygdv4xnzz5bz7rmwwr-39187155379.europe-west2.run.app';

  // Read saved custom URL if available, otherwise determine dynamic URL
  const [customUrl, setCustomUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('powergym_share_url');
      if (saved && saved.trim().startsWith('http')) return saved.trim();
    } catch {}

    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      // If deployed on custom host or github pages
      if (origin && !origin.includes('ais-dev-') && !origin.includes('localhost') && origin.startsWith('http')) {
        return window.location.href;
      }
    }
    return defaultAisSharedUrl;
  });

  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrlInput, setTempUrlInput] = useState(customUrl);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [activeUrlTab, setActiveUrlTab] = useState<'activate' | 'custom' | 'offline'>('activate');

  const shareTitle = 'تطبيق صالة باور جيم - Power Gym 🏋️‍♂️';
  const shareMessage = `السلام عليكم! 🏋️‍♂️ حمّل تطبيق صالة باور جيم (Power Gym) الرسمي: جداول تمارين، خطط النساء، حاسبة السعرات وتمرين النزول الحر. يمكنك فتحه وتثبيته مباشرة من الرابط التالي بدون الحاجة لأي حساب: ${customUrl}`;

  useEffect(() => {
    QRCode.toDataURL(customUrl, {
      margin: 1,
      width: 220,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }).then(url => {
      setQrCodeUrl(url);
    }).catch(() => {});
  }, [customUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(customUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSaveCustomUrl = () => {
    let clean = tempUrlInput.trim();
    if (!clean) {
      clean = defaultAisSharedUrl;
    }
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'https://' + clean;
    }
    setCustomUrl(clean);
    try {
      localStorage.setItem('powergym_share_url', clean);
    } catch {}
    setIsEditingUrl(false);
  };

  const handleResetToDefaultUrl = () => {
    setCustomUrl(defaultAisSharedUrl);
    setTempUrlInput(defaultAisSharedUrl);
    try {
      localStorage.removeItem('powergym_share_url');
    } catch {}
    setIsEditingUrl(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: customUrl
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(customUrl)}&text=${encodeURIComponent(shareTitle + '\n' + shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(customUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 text-right max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pr-1">
          <PowerGymLogo size="md" className="shrink-0" />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <Users className="w-3.5 h-3.5" />
              <span>مشاركة رابط التطبيق للأصدقاء 📲</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              رابط تطبيق باور جيم المباشر
            </h3>
            <p className="text-xs text-neutral-400">
              حل مشكلة «عنوان URL غير موجود» وطريقة تفعيل الرابط أو استخدام رابطك الخاص
            </p>
          </div>
        </div>

        {/* CRITICAL EXPLANATION: WHY "URL NOT FOUND (404)" APPEARS & HOW TO FIX IN 2 SECONDS */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500/60 text-neutral-200 text-xs space-y-2.5 shadow-lg shadow-amber-500/10">
          <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>لماذا تظهر رسالة «عنوان URL غير موجود (404)»؟ وكيف تحلها؟</span>
          </div>

          <p className="text-[11px] text-amber-200/90 leading-relaxed">
            الرابط المشترك العام لا يعمل عند أصدقائك حتى تقوم بالضغط على زر <strong className="text-white bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">Share (مشاركة)</strong> في شريط Google AI Studio العلوي لأول مرة!
          </p>

          <div className="space-y-1.5 pt-1 text-[11px] bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>طريقة تفعيل الرابط بنقرة واحدة الآن:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-neutral-300 pr-1">
              <li>انظر إلى <strong className="text-amber-300">الشريط العلوي</strong> في منصة Google AI Studio (أعلى الشاشة).</li>
              <li>اضغط على زر <strong className="text-white bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">Share</strong> أو <strong className="text-white bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">مشاركة</strong> الأزرق/الرمادي.</li>
              <li>اختر <strong className="text-emerald-400">Public (عام)</strong> أو مشاركة الرابط، واضغط <strong className="text-white">Save / Publish</strong>.</li>
              <li>فوراً سيتم تفعيل الرابط وسيعمل عند كافة أصدقائك بدون 404 وبدون تسجيل دخول!</li>
            </ol>
          </div>
        </div>

        {/* The Live URL Box with Edit and Test Options */}
        <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-300 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>عنوان URL المشارك حالياً:</span>
            </span>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 transition cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingUrl ? 'إلغاء' : 'تغيير الرابط'}</span>
              </button>

              <a
                href={customUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 transition cursor-pointer"
                title="افتح الرابط لتجربته وتتأكد إن كان يعمل"
              >
                <ExternalLink className="w-3 h-3" />
                <span>تجربة الرابط ↗</span>
              </a>
            </div>
          </div>

          {isEditingUrl ? (
            <div className="space-y-2 pt-1 animate-fadeIn">
              <p className="text-[10px] text-neutral-400">
                إذا رفعت التطبيق على GitHub Pages أو خادم خاص بك، الصق الرابط هنا ليتم تحديث رمز QR وروابط المشاركة تلقائياً:
              </p>
              <div className="flex items-center gap-1.5">
                <input
                  type="url"
                  value={tempUrlInput}
                  onChange={(e) => setTempUrlInput(e.target.value)}
                  placeholder="https://your-domain.com أو https://username.github.io/power-gym"
                  className="flex-1 bg-neutral-900 border border-neutral-700 text-white rounded-xl px-3 py-2 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  dir="ltr"
                />
                <button
                  onClick={handleSaveCustomUrl}
                  className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shrink-0 transition cursor-pointer"
                >
                  حفظ
                </button>
                <button
                  onClick={handleResetToDefaultUrl}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs shrink-0 transition cursor-pointer"
                  title="استعادة الرابط الافتراضي"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div 
                dir="ltr"
                className="flex-1 bg-neutral-900 px-3 py-2.5 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-200 truncate select-all"
              >
                {customUrl}
              </div>

              <button
                onClick={handleCopy}
                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/10'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ الرابط</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* 1-Click Social Share Buttons */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-neutral-300 block">إرسال فوري بنقرة واحدة:</span>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className="py-2.5 px-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>واتساب (WhatsApp)</span>
            </button>

            {/* Telegram */}
            <button
              onClick={handleTelegramShare}
              className="py-2.5 px-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-400 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Send className="w-5 h-5 text-sky-400" />
              <span>تليجرام (Telegram)</span>
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebookShare}
              className="py-2.5 px-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Facebook className="w-5 h-5 text-blue-400" />
              <span>فيسبوك (Facebook)</span>
            </button>

            {/* Native Mobile Share */}
            <button
              onClick={handleNativeShare}
              className="py-2.5 px-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Share2 className="w-5 h-5 text-amber-400" />
              <span>مشاركة الهاتف 📲</span>
            </button>
          </div>
        </div>

        {/* QR Code and How Friends Install */}
        <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center gap-3.5">
          {qrCodeUrl && (
            <div className="p-2 rounded-xl bg-white shrink-0 shadow-md">
              <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 sm:w-28 sm:h-28" />
            </div>
          )}

          <div className="space-y-1.5 text-xs text-neutral-300 text-center sm:text-right">
            <h4 className="font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>مسح الكود بكاميرا الهاتف:</span>
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              إذا كان صديقك بجوارك في الصالة، دعْه يفتح كاميرا هاتفه ويمسح رمز الاستجابة السريعة (QR)، وسيفتح التطبيق عنده مباشرة في ثانية واحدة!
            </p>
            <div className="pt-1 text-[10px] text-amber-400/90 font-medium">
              💡 بمجرد فتح الرابط، يضغط الصديق على (خيارات المتصفح ⋮) ثم «تثبيت التطبيق» ليصبح على شاشته الرئيسية.
            </div>
          </div>
        </div>

        {/* Alternative Option: Send Direct Offline File or APK Without Link */}
        <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>حل إضافي: إرسال ملف APK أو ملف الـ HTML مباشرة</span>
            </span>
            <p className="text-[11px] text-neutral-400">
              يمكنك إرسال ملف <code className="text-white">PowerGym.apk</code> أو <code className="text-white">powergym_single_file.html</code> لأصدقائك بالواتساب مباشرة ويفتحونه بدون إنترنت وبدون أي رابط!
            </p>
          </div>

          {onOpenInstallModal && (
            <button
              onClick={() => {
                onClose();
                onOpenInstallModal();
              }}
              className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 transition cursor-pointer"
            >
              تحميل الملفات 📥
            </button>
          )}
        </div>

        {/* Footer Navigation to Install & APK Modal */}
        <div className="pt-1 flex items-center justify-between gap-2 border-t border-neutral-800 text-xs">
          {onOpenInstallModal && (
            <button
              onClick={() => {
                onClose();
                onOpenInstallModal();
              }}
              className="text-neutral-400 hover:text-emerald-400 transition flex items-center gap-1 font-bold text-[11px] cursor-pointer"
            >
              <span>هل تريد تحميل ملف APK أو كود التطبيق كامل (ZIP)؟</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs cursor-pointer transition mr-auto"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
