import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Settings, 
  Smartphone, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ExternalLink,
  HelpCircle,
  Eye,
  Sliders,
  FolderArchive,
  Layers,
  Sparkles
} from 'lucide-react';

export const AndroidSecurityGuide: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<'samsung' | 'xiaomi' | 'huawei' | 'pixel'>('samsung');
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const toggleStep = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <div className="space-y-4 text-right animate-fadeIn" dir="rtl">
      {/* Intro Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-amber-950/40 border-2 border-red-500/50 text-xs text-neutral-200 space-y-2">
        <div className="flex items-center gap-2 text-red-400 font-black text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>دليل خطوة بخطوة: تخطي قيود أمان أندرويد وتثبيت الـ APK بنجاح 🛡️</span>
        </div>
        <p className="text-[11px] text-neutral-300 leading-relaxed">
          يقوم نظام أندرويد بحماية هاتفك افتراضياً عبر منع أي تطبيق خارجي من خارج متجر Google Play ويظهر رسائل تحذيرية مثل <strong className="text-amber-300">«تم حظر التطبيق بواسطة Play Protect»</strong> أو <strong className="text-amber-300">«مصادر غير معروفة»</strong>. هذا أمر طبيعي تماماً، واتّبع هذه الخطوات الأربع لتثبيت باور جيم في ثوانٍ:
        </p>
      </div>

      {/* Brand Selector for Custom Phone Instructions */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-neutral-400 font-bold px-1">
          <span>اختر نوع هاتفك لإرشادات مخصصة:</span>
          <span className="text-[10px] text-emerald-400">جميع إصدارات أندرويد</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {[
            { id: 'samsung', label: 'سامسونج (Samsung)', icon: '📱' },
            { id: 'xiaomi', label: 'شاومي / ريدمي', icon: '⚡' },
            { id: 'huawei', label: 'هواوي / هونر', icon: '🌸' },
            { id: 'pixel', label: 'أندرويد عام / بيكسل', icon: '🤖' }
          ].map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand.id as any)}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedBrand === brand.id
                  ? 'bg-amber-500 text-neutral-950 shadow-md font-black'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <span>{brand.icon}</span>
              <span>{brand.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1 */}
      <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden transition">
        <button
          onClick={() => toggleStep(1)}
          className="w-full p-3.5 flex items-center justify-between gap-3 text-left transition hover:bg-neutral-900/50 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div className="text-right">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                الخطوة 1: تنزيل ملف الـ APK الأصلي (تجنّب فك الضغط نهائياً)
              </h4>
              <p className="text-[11px] text-neutral-400">
                الملف القابل للتثبيت ينتهي بصيغة <code className="text-emerald-400 font-mono font-bold">.apk</code> فقط
              </p>
            </div>
          </div>
          {expandedStep === 1 ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedStep === 1 && (
          <div className="px-4 pb-4 pt-1 space-y-2.5 text-xs text-neutral-300 border-t border-neutral-900/80 bg-neutral-900/20">
            <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-[11px] leading-relaxed">
              ⚠️ <strong className="text-white">خطأ شائع جداً:</strong> بعض الهواتف تعرض ملف الـ APK كأنه ملف أرشيف وتظهر زر "استخراج" أو "فك الضغط". <strong className="text-white underline">لا تضغط على فك الضغط</strong>، بل اضغط على الملف نفسه ليفتحه الهاتف بـ <strong className="text-white">«أداة تثبيت الحزم» (Package Installer)</strong>.
            </div>

            <p className="text-[11px] leading-relaxed text-neutral-300">
              • اسم الملف الرسمي هو: <code className="text-amber-400 font-mono font-bold">PowerGym.apk</code> بحجم حوالي 17 ميجابايت.
            </p>

            <a
              href="/PowerGym.apk"
              download="PowerGym.apk"
              className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs transition cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>تحميل ملف PowerGym.apk المباشر الآن</span>
            </a>
          </div>
        )}
      </div>

      {/* STEP 2 */}
      <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden transition">
        <button
          onClick={() => toggleStep(2)}
          className="w-full p-3.5 flex items-center justify-between gap-3 text-left transition hover:bg-neutral-900/50 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 font-black text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div className="text-right">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                الخطوة 2: تفعيل «السماح بالتثبيت من مصادر غير معروفة»
              </h4>
              <p className="text-[11px] text-neutral-400">
                منح إذن التثبيت لمتصفح Chrome أو تطبيق «ملفاتي»
              </p>
            </div>
          </div>
          {expandedStep === 2 ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedStep === 2 && (
          <div className="px-4 pb-4 pt-1 space-y-2.5 text-xs text-neutral-300 border-t border-neutral-900/80 bg-neutral-900/20">
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              عند الضغط على ملف الـ APK بعد تحميله، ستظهر نافذة من نظام أندرويد تنص على: <br />
              <span className="italic text-neutral-400">«لأسباب أمنية، غير مسموح لهاتفك بتثبيت تطبيقات غير معروفة من هذا المصدر»</span>.
            </p>

            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Settings className="w-4 h-4" />
                <span>طريقة التفعيل في {selectedBrand === 'samsung' ? 'سامسونج' : selectedBrand === 'xiaomi' ? 'شاومي' : selectedBrand === 'huawei' ? 'هواوي' : 'أندرويد'}:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-neutral-300 pr-1">
                <li>اضغط على زر <strong className="text-white">«الإعدادات» (Settings)</strong> الظاهر في نفس رسالة التنبيه.</li>
                <li>ستفتح صفحة <strong className="text-white">«تثبيت التطبيقات غير المعروفة» (Install Unknown Apps)</strong>.</li>
                <li>قم بتفعيل مفتاح التبديل بجانب <strong className="text-emerald-400">«السماح بالتثبيت من هذا المصدر» (Allow from this source)</strong> ليصبح باللون الأزرق أو الأخضر.</li>
                <li>اضغط على زر الرجوع ⬅️ في هاتفك، واضغط فوراً على زر <strong className="text-white">«تثبيت» (Install)</strong>.</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* STEP 3 */}
      <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden transition">
        <button
          onClick={() => toggleStep(3)}
          className="w-full p-3.5 flex items-center justify-between gap-3 text-left transition hover:bg-neutral-900/50 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div className="text-right">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                الخطوة 3: تجاوز فحص Google Play Protect
              </h4>
              <p className="text-[11px] text-neutral-400">
                الضغط على «مزيد من التفاصيل» ثم «التثبيت على أي حال»
              </p>
            </div>
          </div>
          {expandedStep === 3 ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedStep === 3 && (
          <div className="px-4 pb-4 pt-1 space-y-2.5 text-xs text-neutral-300 border-t border-neutral-900/80 bg-neutral-900/20">
            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>كيفية تخطي شاشة Play Protect بالخطوات:</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                إذا ظهرت شاشة زرقاء أو رمادية من Google Play تفيد بأن: <strong className="text-amber-300">«تم حظر التطبيق بواسطة Play Protect»</strong> أو <strong className="text-amber-300">«مطور غير معروف»</strong>:
              </p>
              <div className="p-2.5 rounded-lg bg-black/40 border border-neutral-750 space-y-1 text-[11px]">
                <p>1️⃣ ابحث في أسفل الشاشة عن سهم أو كلمة: <strong className="text-blue-400 underline">«مزيد من التفاصيل» (More details)</strong> واضغط عليها.</p>
                <p>2️⃣ ستظهر جملة جديدة بالأسفل: <strong className="text-rose-300">«التثبيت على أي حال» (Install anyway)</strong> أو «التثبيت على أي حال (غير آمن)». اضغط عليها فوراً.</p>
                <p>3️⃣ سيكتمل التثبيت بنجاح وتظهر رسالة: <strong className="text-emerald-400">«تم تثبيت التطبيق بنجاح»</strong>!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STEP 4 */}
      <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden transition">
        <button
          onClick={() => toggleStep(4)}
          className="w-full p-3.5 flex items-center justify-between gap-3 text-left transition hover:bg-neutral-900/50 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-black text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <div className="text-right">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                الخطوة 4: تحديث إعدادات المتصفح وضمان ظهور الأيقونة على الشاشة الرئيسية
              </h4>
              <p className="text-[11px] text-neutral-400">
                إظهار أيقونة باور جيم الرسمية في شاشة هاتفك الرئيسية وتثبيتها
              </p>
            </div>
          </div>
          {expandedStep === 4 ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedStep === 4 && (
          <div className="px-4 pb-4 pt-1 space-y-2.5 text-xs text-neutral-300 border-t border-neutral-900/80 bg-neutral-900/20">
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              في بعض إصدارات أندرويد الحديثة، قد لا توضع الأيقونة تلقائياً في الشاشة الرئيسية بعد التثبيت، وتكون موجودة داخل "قائمة التطبيقات" (App Drawer). إليك الحل:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <strong className="text-amber-400 block font-bold">أ) من درج التطبيقات (App Drawer):</strong>
                <p className="text-neutral-400 leading-relaxed">
                  اسحب الشاشة من الأسفل للأعلى لفتح درج التطبيقات، ثم ابحث عن <strong className="text-white">Power Gym</strong>. اضغط مطولاً على الأيقونة واسحبها إلى الشاشة الرئيسية.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <strong className="text-blue-400 block font-bold">ب) من إعدادات متصفح Chrome:</strong>
                <p className="text-neutral-400 leading-relaxed">
                  ادخل إلى إعدادات الهاتف ⚙️ ➔ التطبيقات ➔ Chrome ➔ الأذونات ➔ تأكد من تفعيل صلاحية <strong className="text-white">«إنشاء اختصارات الشاشة الرئيسية»</strong>.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>الآن سيبقى التطبيق ثابتاً بشعاره الرسمي عالي الدقة ويعمل بدون إنترنت وفي وضع ملء الشاشة!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
