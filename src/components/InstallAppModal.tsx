import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Share, 
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
  FileArchive
} from 'lucide-react';
import { PowerGymLogo } from './PowerGymLogo';
import QRCode from 'qrcode';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const [modalTab, setModalTab] = useState<'easy' | 'appsgeyser' | 'apk' | 'troubleshoot'>('easy');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<'android' | 'ios'>('android');
  const [isInIframe, setIsInIframe] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copyingCode, setCopyingCode] = useState(false);
  const [copiedCodeSuccess, setCopiedCodeSuccess] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Always determine the best live URL
  const appLiveUrl = typeof window !== 'undefined'
    ? (window.location.origin && window.location.origin.startsWith('http') && !window.location.origin.includes('localhost') && !window.location.origin.includes('127.0.0.1')
        ? window.location.origin
        : 'https://ais-pre-3m2lygdv4xnzz5bz7rmwwr-39187155379.europe-west2.run.app')
    : 'https://ais-pre-3m2lygdv4xnzz5bz7rmwwr-39187155379.europe-west2.run.app';

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
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 text-right max-h-[94vh] overflow-y-auto">
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
              <span>كود وتثبيت AppsGeyser و APK 📱</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              تثبيت وبناء تطبيق باور جيم
            </h3>
            <p className="text-xs text-neutral-400">
              كود كامل في ملف واحد متوافق 100% مع موقع AppsGeyser وبناء APK
            </p>
          </div>
        </div>

        {/* 4 Main Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-xl bg-neutral-950 p-1 border border-neutral-800 text-xs font-bold">
          <button
            onClick={() => setModalTab('appsgeyser')}
            className={`py-2 px-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-center ${
              modalTab === 'appsgeyser'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>كود AppsGeyser 🚀</span>
          </button>

          <button
            onClick={() => setModalTab('easy')}
            className={`py-2 px-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-center ${
              modalTab === 'easy'
                ? 'bg-emerald-500 text-neutral-950 shadow-md font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span>التثبيت السريع ⭐</span>
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
            <span>توليد APK فوري 📦</span>
          </button>

          <button
            onClick={() => setModalTab('troubleshoot')}
            className={`py-2 px-1 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-center ${
              modalTab === 'troubleshoot'
                ? 'bg-red-500 text-white shadow-md font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>حل المشاكل 🛡️</span>
          </button>
        </div>

        {/* TAB: APPSGEYSER DEDICATED (SOLVES USER QUERY PRECISELY) */}
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

        {/* TAB 1: EASIEST & FASTEST INSTALLATION (NO APK HEADACHE) */}
        {modalTab === 'easy' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-neutral-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>أسهل طريقة: لا تحتاج لتحميل ملفات APK أو فك حظر الحماية!</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                يقوم متصفح هاتفك (جوجل كروم أو سفاري) بتثبيت تطبيق باور جيم مباشرة كأيقونة تطبيق رسمي كامل الشاشة على شاشة جوالك، ويعمل <strong className="text-white">بدون إنترنت (Offline)</strong> وبسرعة فائقة.
              </p>
            </div>

            {/* Direct Action Button */}
            {deferredPrompt ? (
              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-neutral-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>تثبيت التطبيق على جوالك فوراً بنقرة واحدة 📲</span>
              </button>
            ) : (
              <a
                href={appLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-neutral-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
              >
                <ExternalLink className="w-5 h-5" />
                <span>فتح الرابط في متصفح الهاتف لتثبيته بنقرة 🚀</span>
              </a>
            )}

            {/* Step-by-Step Illustrated Guide for Chrome & iPhone */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-neutral-800/80">
                <p className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>دليل التثبيت حسب نوع جهازك:</span>
                </p>

                {/* Device Selector Switcher */}
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setSelectedDevice('android')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      selectedDevice === 'android'
                        ? 'bg-emerald-500 text-neutral-950 shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>🤖 أندرويد (Android)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDevice('ios')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      selectedDevice === 'ios'
                        ? 'bg-blue-500 text-white shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>🍏 آيفون (iPhone/iPad)</span>
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

            {/* QR Code Section for scanning directly from phone */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3.5">
              {qrDataUrl && (
                <div className="bg-white p-1.5 rounded-xl shrink-0 shadow">
                  <img src={qrDataUrl} alt="QR Code" className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>امسح بكاميرا الجوال للفتح السريع 📷</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  وجّه كاميرا هاتفك نحو الرمز المربع لفتح التطبيق على هاتفك مباشرة وتثبيته فوراً.
                </p>
                <button
                  onClick={copyLiveUrl}
                  className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 cursor-pointer pt-1"
                >
                  {copiedUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUrl ? 'تم نسخ الرابط!' : 'أو اضغط هنا لنسخ رابط التطبيق'}</span>
                </button>
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
                      <span>ملف APK أصلي حقيقي وموقّع بشعار باور جيم</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">16 MB</span>
                    </h4>
                    <p className="text-[11px] text-neutral-300 mt-0.5">
                      تم تجميع وبرمجة ملف APK حقيقي مع شفرة الجافا، الأيقونة الرسمية، والعمل بدون إنترنت بالكامل.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="/powergym-debug.apk"
                download="powergym-debug.apk"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-neutral-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>تحميل ملف powergym-debug.apk المباشر (16 MB) 📥</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1 pt-0.5">
                <span>✓ موقّع ومتحقق رسمياً (v1, v2, v3 Signature)</span>
                <span>✓ يتضمن الشعار الرسمي وأيقونة التطبيق</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-950/25 border border-blue-500/30 text-xs text-neutral-300">
              <span className="font-bold text-blue-400 block mb-0.5">أو توليد حزمة سحابية عبر الأدوات البديلة:</span>
              يمكنك أيضاً استخدام المنصات السحابية لتوليد نسخ أخرى:
            </div>

            {/* Tool 1: PWABuilder Direct Link */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    PWA
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">منصة PWABuilder (المعتمدة من مايكروسوفت)</h4>
                    <p className="text-[10px] text-neutral-400">توليد حزمة APK أصلية للأندرويد جاهزة فوراً</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  تلقائي
                </span>
              </div>

              <a
                href={`https://www.pwabuilder.com/?url=${encodeURIComponent(appLiveUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow"
              >
                <span>فتح PWABuilder وتحميل ملف APK فوراً</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Tool 2: WebIntoApp Direct Link */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 transition space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    APK
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">موقع WebIntoApp (أسرع تحويل بدون تسجيل)</h4>
                    <p className="text-[10px] text-neutral-400">ضع الرابط واضغط Make App لتحميل APK فوري</p>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                  سريع جداً
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyLiveUrl}
                  className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition border border-neutral-700 shrink-0 cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'تم نسخ الرابط' : 'نسخ الرابط'}</span>
                </button>

                <a
                  href="https://www.webintoapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow"
                >
                  <span>فتح WebIntoApp والصق الرابط</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Link to Troubleshooting Tab */}
            <button
              onClick={() => setModalTab('troubleshoot')}
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-850 hover:bg-neutral-800 border border-neutral-700 text-xs text-amber-400 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>هل ظهرت لك رسالة «حظر التثبيت» أو «ملف ضار»؟ اضغط هنا للحل الفوري</span>
            </button>
          </div>
        )}

        {/* TAB 4: TROUBLESHOOTING APK INSTALLATION BLOCKS (SOLVES USER QUERY DIRECTLY) */}
        {modalTab === 'troubleshoot' && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Primary Explanation: ZIP vs APK */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-neutral-900 to-amber-950/50 border-2 border-red-500/70 text-xs text-neutral-200 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-red-400 font-black text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>السبب في «عدم ظهور التطبيق عند فك الأرشيف» والحل المباشر:</span>
              </div>
              <p className="text-[12px] text-neutral-200 leading-relaxed">
                <strong className="text-amber-300 font-bold">السبب:</strong> ملف الأرشيف المضغوط (<code className="text-white font-mono">.zip</code>) هو ملف حزمة كود ويب مخصصة لمنصات المطورين، ونظام أندرويد <strong className="text-rose-300 underline">لا يمكنه تثبيت ملفات ZIP كتطبيقات في الهاتف</strong>؛ فعند فك الضغط ستجد ملفات نصية وليس برنامجاً قابلاً للتشغيل!
              </p>
              <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-emerald-500/40 text-neutral-100 space-y-1.5">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                  <Check className="w-4 h-4" />
                  <span>الحل لتثبيت التطبيق على هاتفك فوراً (اختر الأسهل لك):</span>
                </div>
                <div className="text-[11px] text-neutral-300 space-y-1 pr-4">
                  <p>• <strong>الحل الأسرع بدون أي ملفات:</strong> انتقل إلى تبويب <strong className="text-emerald-400 cursor-pointer" onClick={() => setModalTab('easy')}>«التثبيت السريع ⭐»</strong> واضغط تثبيت التطبيق بنقرة واحدة من المتصفح مباشرة.</p>
                  <p>• <strong>الحل لملف الأندرويد:</strong> لا تقم بفك الضغط! حمّل ملف <code className="text-emerald-300 font-mono font-bold">powergym-debug.apk</code> من تبويب <strong className="text-blue-400 cursor-pointer" onClick={() => setModalTab('apk')}>«توليد APK فوري 📦»</strong> واضغط عليه مباشرة لتثبيته في الهاتف.</p>
                  <p>• <strong>إذا كنت تريد إصداره عبر AppsGeyser:</strong> لا ترفع ملف ZIP، بل اختر خيار <strong className="text-amber-400">Website</strong> وضع رابط التطبيق المباشر وسيتم إصدار الـ APK فوراً بنقرة واحدة.</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
              <div className="flex items-center gap-2 text-neutral-200 font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>تخطي رسائل أمان أندرويد أثناء تثبيت ملف الـ APK:</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                نظام أندرويد يحمي هاتفك افتراضياً بمنع التطبيقات الخارجية من خارج Google Play. إليك كيفية الموافقة في ثوانٍ:
              </p>
            </div>

            {/* Problem 1: "File might be harmful" */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px]">1</span>
                <span>رسالة: «قد يكون هذا الملف ضاراً» (File might be harmful)</span>
              </div>
              <p className="text-[11px] text-neutral-300 pr-7 leading-relaxed">
                <strong className="text-white">الحل:</strong> هذا تنبيه روتيني يظهر لأي ملف ينتهي بـ <code className="text-amber-300 font-mono">.apk</code>. فقط اضغط على زر <strong className="text-emerald-400">«تنزيل على أي حال» (Download anyway)</strong>.
              </p>
            </div>

            {/* Problem 2: "Install unknown apps blocked" */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[11px]">2</span>
                <span>رسالة: «للأمان، غير مسموح بتثبيت تطبيقات من هذا المصدر»</span>
              </div>
              <div className="text-[11px] text-neutral-300 pr-7 space-y-1 leading-relaxed">
                <p><strong className="text-white">الحل بخطوتين فقط:</strong></p>
                <div className="flex items-center gap-1 text-neutral-400">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 rotate-180" />
                  <span>اضغط على زر <strong>«الإعدادات» (Settings)</strong> في نافذة التنبيه.</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-400">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 rotate-180" />
                  <span>فعّل خيار <strong>«السماح بالتثبيت من هذا المصدر» (Allow from this source)</strong>.</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-400">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 rotate-180" />
                  <span>ارجع واضغط <strong>«تثبيت» (Install)</strong> وسيعمل التطبيق بنجاح تام!</span>
                </div>
              </div>
            </div>

            {/* Problem 3: Google Play Protect Block */}
            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[11px]">3</span>
                <span>شاشة حماية: «تم حظر التثبيت بواسطة Play Protect»</span>
              </div>
              <p className="text-[11px] text-neutral-300 pr-7 leading-relaxed">
                <strong className="text-white">الحل:</strong> اضغط على كلمة <strong className="text-amber-400">«مزيد من التفاصيل» (More details)</strong> الصغيرة أسفل الشاشة، ثم اضغط على <strong className="text-emerald-400">«التثبيت على أي حال» (Install anyway)</strong>.
              </p>
            </div>

            {/* Better Alternative Callout */}
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-1.5">
              <p className="text-xs font-bold text-emerald-400">
                💡 نصيحة تريحك من كل هذه الخطوات:
              </p>
              <p className="text-[11px] text-neutral-300">
                استخدم خيار <strong>«التثبيت السريع ⭐»</strong> من التبويب الثاني؛ فهو معتمد رسمياً من متصفحك ولا يُظهر أي رسائل حظر أمني نهائياً!
              </p>
              <button
                onClick={() => setModalTab('easy')}
                className="mt-1 py-1.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs transition cursor-pointer"
              >
                العودة إلى التثبيت السريع بنقرة واحدة
              </button>
            </div>
          </div>
        )}

        {/* Modal Bottom Footer */}
        <div className="pt-1 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <div className="text-[11px] text-neutral-400 truncate">
            باور جيم • متوافق 100% مع AppsGeyser وتحويل APK
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
