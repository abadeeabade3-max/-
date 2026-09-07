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
  ShieldCheck, 
  Smartphone, 
  ExternalLink,
  Users,
  CheckCircle2,
  ArrowLeft
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
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // The permanent production shared URL that does not require Google AI Studio login
  const publicShareUrl = 'https://ais-pre-3m2lygdv4xnzz5bz7rmwwr-39187155379.europe-west2.run.app';

  const shareTitle = 'تطبيق صالة باور جيم - Power Gym 🏋️‍♂️';
  const shareMessage = `السلام عليكم! 🏋️‍♂️ حمّل تطبيق صالة باور جيم (Power Gym) الرسمي: جداول تمارين احترافية، تمارين النساء، حاسبة السعرات، وتمرين النزول الحر. يمكنك فتحه وتثبيته مباشرة من الرابط التالي بدون الحاجة لأي حساب: ${publicShareUrl}`;

  useEffect(() => {
    QRCode.toDataURL(publicShareUrl, {
      margin: 1,
      width: 220,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }).then(url => {
      setQrCodeUrl(url);
    }).catch(() => {});
  }, [publicShareUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: publicShareUrl
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
    const url = `https://t.me/share/url?url=${encodeURIComponent(publicShareUrl)}&text=${encodeURIComponent(shareTitle + '\n' + shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicShareUrl)}`;
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
              <span>مشاركة سريعة ومباشرة للأصدقاء 📲</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              مشاركة تطبيق باور جيم
            </h3>
            <p className="text-xs text-neutral-400">
              رابط مباشر يفتح فوراً عند أصدقائك ويثبت على هواتفهم بنقرة واحدة
            </p>
          </div>
        </div>

        {/* Vital Notice: No Google AI Studio Required */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-neutral-200 text-xs space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>رابط نظيف ومباشر 100% (بدون الدخول إلى Google AI Studio)</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            عندما ترسل هذا الرابط لأي شخص، سيفتح التطبيق عنده مباشرة في المتصفح كما لو كان تطبيقاً حقيقياً، دون أن يطلب منه تسجيل الدخول بحساب جوجل أو الدخول إلى منصة AI Studio.
          </p>
        </div>

        {/* The Public Link Card with Copy Button */}
        <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-bold text-neutral-300">الرابط المباشر للتطبيق:</span>
            <span className="text-[10px] text-emerald-400 font-medium">جاهز للإرسال</span>
          </div>

          <div className="flex items-center gap-2">
            <div 
              dir="ltr"
              className="flex-1 bg-neutral-900 px-3 py-2.5 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-300 truncate select-all"
            >
              {publicShareUrl}
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
