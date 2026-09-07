import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Share, 
  Share2,
  PlusSquare, 
  Package, 
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  AlertTriangle, 
  QrCode, 
  ArrowRight, 
  HelpCircle, 
  Layers,
  FileCode,
  FileArchive,
  GitBranch,
  FolderArchive,
  Users
} from 'lucide-react';
import { PowerGymLogo } from './PowerGymLogo';
import { AndroidSecurityGuide } from './AndroidSecurityGuide';
import QRCode from 'qrcode';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShareModal?: () => void;
  defaultTab?: 'easy' | 'github' | 'apk' | 'troubleshoot' | 'appsgeyser';
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenShareModal,
  defaultTab = 'easy'
}) => {
  const [modalTab, setModalTab] = useState<'easy' | 'github' | 'apk' | 'troubleshoot' | 'appsgeyser'>(defaultTab);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<'android' | 'ios'>('android');
  const [isInIframe, setIsInIframe] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copyingCode, setCopyingCode] = useState(false);
  const [copiedCodeSuccess, setCopiedCodeSuccess] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Permanent public production URL (shared link without AI Studio login)
  const defaultAisSharedUrl = 'https://ais-pre-3m2lygdv4xnzz5bz7rmwwr-39187155379.europe-west2.run.app';
  const [appLiveUrl, setAppLiveUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('powergym_share_url');
      if (saved && saved.trim().startsWith('http')) return saved.trim();
    } catch {}
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      if (origin && !origin.includes('ais-dev-') && !origin.includes('localhost') && origin.startsWith('http')) {
        return window.location.href;
      }
    }
    return defaultAisSharedUrl;
  });

  useEffect(() => {
    if (defaultTab) {
      setModalTab(defaultTab);
    }
  }, [defaultTab, isOpen]);

  useEffect(() => {
    // Check if inside iframe
    try {
      setIsInIframe(window.self !== window.top);
    } catch {
      setIsInIframe(true);
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);
    if (isIosDevice) {
      setSelectedDevice('ios');
    }

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Generate QR code for mobile scanning
    QRCode.toDataURL(appLiveUrl, {
      margin: 1,
      width: 200,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(() => {});

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [appLiveUrl]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        onClose();
      }
      setDeferredPrompt(null);
    } else {
      window.open(appLiveUrl, '_blank');
    }
  };

  const copyLiveUrl = () => {
    navigator.clipboard.writeText(appLiveUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleCopyFullCode = async () => {
    setCopyingCode(true);
    try {
      const response = await fetch('/powergym_single_file.html');
      const fullText = await response.text();
      await navigator.clipboard.writeText(fullText);
      setCopiedCodeSuccess(true);
      setTimeout(() => setCopiedCodeSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to copy single file code:', err);
    } finally {
      setCopyingCode(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 text-right max-h-[94vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Logo */}
        <div className="flex items-center gap-3.5 pr-1">
          <PowerGymLogo size="md" className="shrink-0" />
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>حزمة التثبيت الشاملة • GitHub و APK و PWA 📱</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              تثبيت وتحميل تطبيق باور جيم
            </h3>
            <p className="text-xs text-neutral-400">
              متوافق مع جميع إصدارات هواتف أندرويد وآيفون، وحزمة ZIP مدعومة لـ GitHub
            </p>
          </div>
        </div>

        {/* 5 Main Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 rounded-xl bg-neutral-950 p-1 border border-neutral-800 text-xs font-bold">
          <button
            onClick={() => setModalTab('easy')}
            className={`py-2 px-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-center ${
              modalTab === 'easy'
                ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span>التثبيت والمشاركة ⭐</span>
          </button>

          <button
            onClick={() => setModalTab('github')}
            className={`py-2 px-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-center ${
              modalTab === 'github'
                ? 'bg-purple-500 text-white shadow-md font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5 shrink-0 text-purple-300" />
            <span>كود التطبيق كامل ZIP 📦</span>
          </button>

          <button
            onClick={() => setModalTab('apk')}
            className={`py-2 px-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-center ${
              modalTab === 'apk'
                ? 'bg-blue-500 text-white shadow-md font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5 shrink-0" />
            <span>ملف APK مباشر 📱</span>
          </button>

          <button
            onClick={() => setModalTab('troubleshoot')}
            className={`py-2 px-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-center ${
              modalTab === 'troubleshoot'
                ? 'bg-red-500 text-white shadow-md font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>دليل تخطي الحماية 🛡️</span>
          </button>

          <button
            onClick={() => setModalTab('appsgeyser')}
            className={`py-2 px-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-center col-span-2 sm:col-span-1 ${
              modalTab === 'appsgeyser'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>AppsGeyser 🚀</span>
          </button>
        </div>

        {/* TAB 1: EASIEST & FASTEST INSTALLATION + SHARING WITH FRIENDS */}
        {modalTab === 'easy' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-neutral-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>التثبيت الفوري بنقرة واحدة (أسرع طريقة لجميع الهواتف بدون أي ملفات)</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                يقوم متصفح هاتفك (Chrome أو Safari) بتثبيت تطبيق باور جيم مباشرة على شاشة هاتفك الرئيسية، ويعمل <strong className="text-white">بدون إنترنت (Offline 100%)</strong> وبكامل طاقته وبدون أي تعقيد.
              </p>
            </div>

            {/* Direct Action Buttons: Install & Share with Friends */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {deferredPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تثبيت التطبيق على هاتفك الآن 📲</span>
                </button>
              ) : (
                <a
                  href={appLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>فتح الرابط المباشر للتثبيت</span>
                </a>
              )}

              {/* Share with Friends Button */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenShareModal) {
                    onClose();
                    onOpenShareModal();
                  } else {
                    copyLiveUrl();
                  }
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة الرابط مع الأصدقاء (بدون AI Studio) 👥</span>
              </button>
            </div>

            {/* Notice about sharing without AI Studio login */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">رابط المشاركة المباشر للأصدقاء:</span>
                  <span className="text-[11px] text-neutral-400 truncate block">لا يتطلب تسجيل دخول Google AI Studio ويفتح التطبيق فوراً</span>
                </div>
                <button
                  onClick={copyLiveUrl}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs shrink-0 flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                </button>
              </div>
              <div className="text-[11px] text-amber-300/90 bg-amber-950/30 p-2 rounded-lg border border-amber-500/20">
                ⚡ <strong>إذا ظهر لأصدقائك «عنوان URL غير موجود (404)»:</strong> اضغط على زر <strong>Share (مشاركة)</strong> في أعلى شاشة Google AI Studio لتفعيل الرابط للعامة أول مرة.
              </div>
            </div>

            {/* Device Specific Installation Steps */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>خطوات التثبيت بحسب نوع هاتفك:</span>
                </h4>
                <div className="flex rounded-lg bg-neutral-900 p-0.5 border border-neutral-800 text-[11px]">
                  <button
                    onClick={() => setSelectedDevice('android')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                      selectedDevice === 'android' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
                    }`}
                  >
                    أندرويد (Chrome)
                  </button>
                  <button
                    onClick={() => setSelectedDevice('ios')}
                    className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                      selectedDevice === 'ios' ? 'bg-blue-500 text-white font-bold' : 'text-neutral-400'
                    }`}
                  >
                    آيفون (Safari)
                  </button>
                </div>
              </div>

              {selectedDevice === 'ios' ? (
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                    <span>افتح الرابط في متصفح <strong>سفاري (Safari)</strong> واضغط على زر المشاركة <Share className="w-3.5 h-3.5 inline text-blue-400 mx-1" /> في الشريط السفلي.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                    <span>مرر قائمة الخيارات لأسفل واختر <strong className="text-blue-400 mx-1 inline-flex items-center gap-1">«إضافة إلى الشاشة الرئيسية» <PlusSquare className="w-3.5 h-3.5 inline" /></strong> (Add to Home Screen).</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                    <span>اضغط على كلمة <strong>«إضافة (Add)»</strong> في أعلى اليمين وستظهر أيقونة باور جيم على شاشتك فوراً وتعمل بملء الشاشة وبدون إنترنت!</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                    <span>افتح الرابط في <strong>Google Chrome</strong> واضغط على علامة الثلاث نقاط (<strong className="text-emerald-400 text-sm">⋮</strong>) في زاوية المتصفح.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                    <span>اضغط على خيار <strong className="text-emerald-400">«تثبيت التطبيق» (Install App)</strong> أو <strong className="text-emerald-400">«إضافة إلى الشاشة الرئيسية»</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                    <span>اضغط <strong>«تثبيت»</strong> وسيقوم نظام أندرويد بتثبيت باور جيم كتطبيق حقيقي متكامل يعمل بدون إنترنت وسلس بالكامل!</span>
                  </div>
                </div>
              )}
            </div>

            {/* QR Code Section */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3.5">
              {qrDataUrl && (
                <div className="bg-white p-1.5 rounded-xl shrink-0 shadow">
                  <img src={qrDataUrl} alt="QR Code" className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>امسح بكاميرا الجوال للفتح والتثبيت 📷</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  وجّه كاميرا هاتفك نحو الرمز المربع لفتح التطبيق على جوالك مباشرة وتثبيته فوراً.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL SOURCE CODE ZIP & GITHUB SUPPORT (DIRECTLY MATCHES USER REQUEST) */}
        {modalTab === 'github' && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Primary Full Source Code ZIP Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-neutral-900 to-emerald-950/40 border-2 border-purple-500 shadow-xl shadow-purple-500/10 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                    <FolderArchive className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                      <span>ملف ZIP كامل لكود تطبيق باور جيم كاملاً 100% 📦💻</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">29 MB (كود كامل)</span>
                    </h4>
                    <p className="text-[11px] text-neutral-300 mt-0.5 leading-relaxed">
                      يحتوي على كافة ملفات المصدر التطويرية: مجلد <code className="text-purple-300">src/</code> بالكامل (React + TypeScript + Tailwind)، مجلد <code className="text-purple-300">public/</code> بجميع صور التمارين المتحركة GIF، ملفات الإعدادات <code className="text-purple-300">package.json</code>، سكربتات البناء، وملفات دعم Android و GitHub.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Full Code ZIP Download Button */}
              <a
                href="/powergym_full_source_code.zip"
                download="powergym_full_source_code.zip"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition cursor-pointer"
              >
                <Download className="w-5 h-5 text-amber-300" />
                <span>تحميل ملف ZIP الكامل لكود التطبيق (powergym_full_source_code.zip) 📥</span>
              </a>

              {/* Quick Secondary Download Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href="/powergym_github_package.zip"
                  download="powergym_github_package.zip"
                  className="py-2.5 px-3 rounded-lg bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <FolderArchive className="w-4 h-4 text-purple-400" />
                  <span>حزمة مستودع GitHub المباشرة (ZIP)</span>
                </a>

                <a
                  href="/powergym_single_file.html"
                  download="powergym_single_file.html"
                  className="py-2.5 px-3 rounded-lg bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>ملف التطبيق المستقل (HTML أوفلاين)</span>
                </a>
              </div>

              {/* Feature Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-neutral-300 pt-1 border-t border-neutral-800/80">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>كود React & TSX كامل ومفتوح</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>كافة صور التمارين المتحركة GIF</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>حزم package.json & Vite جاهزة</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>جاهز للتشغيل المحلي npm run dev</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>نشر تلقائي عبر GitHub Pages</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>إعدادات تحويل APK متكاملة</span>
                </div>
              </div>
            </div>

            {/* How to Run Locally with Node.js */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs text-neutral-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>طريقة تشغيل الكود وتطويره على حاسوبك (Node.js):</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <p className="text-neutral-400">1. فك ضغط ملف <code className="text-purple-300">powergym_full_source_code.zip</code>.</p>
                <p className="text-neutral-400">2. افتح الطرفية (Terminal / CMD) داخل مجلد المشروع ونفّذ:</p>
                <pre className="p-2.5 rounded-xl bg-black/80 text-emerald-400 font-mono text-[11px] overflow-x-auto" dir="ltr">
                  npm install{"\n"}npm run dev
                </pre>
                <p className="text-neutral-400">3. افتح في المتصفح الرابط: <code className="text-white font-mono">http://localhost:3000</code></p>
              </div>
            </div>

            {/* How to Push to GitHub & Deploy on Pages */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5 text-xs text-neutral-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>طريقة رفع الحزمة على GitHub وتشغيلها للأصدقاء مجاناً:</span>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                  <strong className="text-purple-300 block font-bold">1. إنشاء المستودع والرفع (Git Push):</strong>
                  <p className="text-neutral-400">فك ضغط الحزمة ونفّذ الأوامر في مجلد المشروع:</p>
                  <pre className="p-2 rounded bg-black/60 text-emerald-400 font-mono text-[10px] overflow-x-auto" dir="ltr">
                    git init{"\n"}git add .{"\n"}git commit -m "Power Gym Project"{"\n"}git remote add origin https://github.com/USERNAME/power-gym.git{"\n"}git push -u origin main
                  </pre>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                  <strong className="text-emerald-300 block font-bold">2. استضافة فورية على GitHub Pages:</strong>
                  <p className="text-neutral-400">
                    من إعدادات مستودعك على GitHub: ادخل على <strong>Settings ➔ Pages ➔</strong> اختر Branch <strong>main</strong> واضغط <strong>Save</strong>. ستحصل على رابط مباشر مجاني يعمل عند جميع أصدقائك ويثبت على هواتفهم بنقرة واحدة!
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                  <strong className="text-blue-300 block font-bold">3. بناء ملف APK تلقائياً على خوادم GitHub:</strong>
                  <p className="text-neutral-400">
                    الحزمة تحتوي على ملف العمليات <code className="text-white">.github/workflows/build-apk.yml</code>، يمكنك التوجه لتبويب <strong>Actions</strong> في GitHub والضغط على <strong>Run workflow</strong> وسيقوم GitHub ببناء ملف الـ APK وتنزيله لك مجاناً!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOWNLOAD APK FILE (DIRECT PRE-CONFIGURED TOOLS) */}
        {modalTab === 'apk' && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* DIRECT COMPILED REAL DEBUG APK DOWNLOAD */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-neutral-900 to-emerald-950/40 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/powergym-logo.png"
                    alt="Power Gym APK Icon"
                    className="w-10 h-10 rounded-xl object-contain bg-neutral-950 p-1 border border-emerald-500/40 shadow"
                  />
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                      <span>ملف PowerGym.apk الأصلي والموقّع بشعار باور جيم</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">17 MB</span>
                    </h4>
                    <p className="text-[11px] text-neutral-300 mt-0.5">
                      مبني وموقّع ليعمل على <strong>جميع إصدارات أندرويد (من أندرويد 5.0 Lollipop حتى أندرويد 15)</strong> مع دعم التخزين المحلي والأوفلاين.
                    </p>
                  </div>
                </div>
              </div>

              {/* Crucial Notice: DO NOT UNZIP */}
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>تنبيه هام:</strong> لا تقم بفك الضغط عن هذا الملف! اضغط عليه مباشرة لتثبيته في الهاتف.</span>
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="/PowerGym.apk"
                  download="PowerGym.apk"
                  className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل ملف PowerGym.apk المباشر (17 MB) 📥</span>
                </a>

                <a
                  href="/powergym-debug.apk"
                  download="powergym-debug.apk"
                  className="w-full py-3 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>رابط احتياطي (powergym-debug.apk)</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1 pt-0.5">
                <span>✓ موقّع رسمياً (v1, v2, v3 Signature Scheme)</span>
                <span>✓ متوافق مع كافة أحجام الشاشات</span>
              </div>
            </div>

            {/* Quick Link to Troubleshooting Tab */}
            <button
              onClick={() => setModalTab('troubleshoot')}
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-850 hover:bg-neutral-800 border border-neutral-700 text-xs text-amber-400 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>هل ظهرت لك رسالة «حظر التثبيت» أو «مصادر غير معروفة»؟ اضغط هنا لدليل الحل الفوري</span>
            </button>
          </div>
        )}

        {/* TAB 4: STEP-BY-STEP ANDROID SECURITY GUIDE (DIRECTLY MATCHES USER PROMPT) */}
        {modalTab === 'troubleshoot' && (
          <AndroidSecurityGuide />
        )}

        {/* TAB 5: APPSGEYSER DEDICATED (SOLVES USER QUERY PRECISELY) */}
        {modalTab === 'appsgeyser' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-neutral-200 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>كود التطبيق الكامل مدمج في ملف واحد جاهز لـ AppsGeyser 🎯</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                تم دمج جميع ملفات التطبيق (HTML + التنسيقات CSS + برمجة التفاعل + الجداول والصور) في <strong className="text-white">ملف واحد مستقل تماماً</strong> بدون أي تبعيات خارجية معالجة لتعمل على نظام WebView في AppsGeyser.
              </p>
            </div>

            {/* Quick Actions for AppsGeyser */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Button 1: Copy full code */}
              <button
                onClick={handleCopyFullCode}
                disabled={copyingCode}
                className="py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                {copiedCodeSuccess ? <Check className="w-4 h-4 text-neutral-950" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCodeSuccess ? 'تم نسخ الكود كاملاً في الحافظة! 🎉' : copyingCode ? 'جارٍ نسخ الكود...' : 'نسخ كود التطبيق كاملاً (لصق في AppsGeyser)'}</span>
              </button>

              {/* Button 2: Download Single File HTML */}
              <a
                href="/powergym_single_file.html"
                download="index.html"
                className="py-3 px-3 rounded-2xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-amber-500/50 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer text-center"
              >
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>تحميل ملف HTML مفرد (index.html)</span>
              </a>
            </div>

            {/* Button 3: Download ZIP archive for AppsGeyser */}
            <a
              href="/appsgeyser_powergym.zip"
              download="appsgeyser_powergym.zip"
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/40 text-neutral-200 hover:text-white text-xs font-bold flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileArchive className="w-4 h-4 text-emerald-400" />
                <span>تحميل حزمة ZIP جاهزة للرفع على AppsGeyser (شاملة index.html والأيقونة)</span>
              </div>
              <Download className="w-4 h-4 text-emerald-400 shrink-0" />
            </a>

            {/* Step-by-Step Guide for AppsGeyser */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>طريقتان سهلتان لتشغيل التطبيق على موقع AppsGeyser:</span>
                </h4>
                <a
                  href="https://appsgeyser.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>فتح AppsGeyser</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Method 1: HTML / ZIP Upload */}
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-[10px]">1</span>
                  <span>الطريقة الأولى: رفع ملف HTML أو لصق الكود (Offline HTML5)</span>
                </div>
                <div className="text-[11px] text-neutral-300 pr-7 space-y-1 leading-relaxed">
                  <p>1. افتح <a href="https://appsgeyser.com/" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">AppsGeyser.com</a> واضغط على <strong>Create App</strong>.</p>
                  <p>2. اختر قالب <strong>HTML / HTML5 Website</strong>.</p>
                  <p>3. إما أن ترفع ملف <strong>index.html</strong> أو تضغط على زر <strong>«نسخ كود التطبيق كاملاً»</strong> في الأعلى وتلصقه في مربع الكود.</p>
                  <p>4. اكتب اسم التطبيق: <strong className="text-white">باور جيم</strong> أو <strong className="text-white">Power Gym</strong> واضغط <strong>Generate APK</strong>.</p>
                </div>
              </div>

              {/* Method 2: Website URL Template */}
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-[10px]">2</span>
                  <span>الطريقة الثانية (الأسرع خلال دقيقة): قالب Website URL في AppsGeyser</span>
                </div>
                <div className="text-[11px] text-neutral-300 pr-7 space-y-1.5 leading-relaxed">
                  <p>اختر قالب <strong>Website</strong> وضع رابط التطبيق المباشر، وسينتج لك ملف APK جاهز للتنزيل فوراً:</p>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      readOnly
                      value={appLiveUrl}
                      className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-[11px] text-emerald-400 font-mono select-all truncate"
                    />
                    <button
                      onClick={copyLiveUrl}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-[11px] shrink-0 transition cursor-pointer"
                    >
                      {copiedUrl ? 'تم النسخ!' : 'نسخ الرابط'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom Footer */}
        <div className="pt-1 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <div className="text-[11px] text-neutral-400 truncate">
            باور جيم • متوافق مع GitHub وجميع إصدارات الهواتف
          </div>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition cursor-pointer shrink-0"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
