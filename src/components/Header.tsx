import React from 'react';
import { Dumbbell, MapPin, Share2, Facebook, MessageCircle, Clock, ShieldCheck, Smartphone, Download, CreditCard, Building2, UserCheck, PhoneCall, Sparkles, FileCode } from 'lucide-react';
import { GYM_LOCATION_URL, GYM_FACEBOOK_URL, COACH_FACEBOOK_URL, COACH_NAME, BANK_DETAILS, GYM_NAME } from '../data/gymData';
import { CurrentStatusInfo, ExerciseItem } from '../types';
import { PowerGymLogo } from './PowerGymLogo';
import { GlobalSearchBar } from './GlobalSearchBar';
import { EXERCISE_DATABASE } from '../data/exerciseLibrary';

interface HeaderProps {
  currentStatus: CurrentStatusInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCoachModal: () => void;
  onOpenManagementModal: () => void;
  onOpenInstallModal?: () => void;
  onOpenShareModal?: () => void;
  onOpenBankPayment: () => void;
  onOpenExerciseModal: (exercise: ExerciseItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStatus,
  activeTab,
  setActiveTab,
  onOpenCoachModal,
  onOpenManagementModal,
  onOpenInstallModal,
  onOpenShareModal,
  onOpenBankPayment,
  onOpenExerciseModal
}) => {
  const tabs = [
    { id: 'home', label: 'الرئيسية والمواعيد', icon: '⏰' },
    { id: 'workouts', label: 'جداول التمارين', icon: '🏋️‍♂️' },
    { id: 'women', label: 'تمارين النساء 🌸', icon: '🌸' },
    { id: 'calories', label: 'حاسبة ومؤقت السعرات', icon: '🔥' },
    { id: 'diets', label: 'الأنظمة الغذائية', icon: '🥗' },
    { id: 'subscription', label: 'إدارة اشتراكي', icon: '🎫' },
    { id: 'gym-info', label: 'إدارة الصالة والقوانين', icon: '🏢' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 shadow-2xl">
      {/* Top Utility Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 text-xs sm:text-sm font-bold py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block animate-pulse">⚡</span>
            <span>نادي باور جيم — تحويل مصرف شمال أفريقيا متوفر: {BANK_DETAILS.accountNumber}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Share with Friends Button */}
            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                className="flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black px-2.5 py-0.5 rounded transition cursor-pointer shadow-sm"
                title="مشاركة رابط التطبيق المباشر للأصدقاء بدون Google AI Studio"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>مشاركة للأصدقاء 📲</span>
              </button>
            )}

            {/* Free Descent Exercise Selection Button */}
            <button
              onClick={() => {
                const ex = EXERCISE_DATABASE['free-descent-dips'];
                if (ex) onOpenExerciseModal(ex);
              }}
              className="flex items-center gap-1 text-xs bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-2 py-0.5 rounded transition cursor-pointer shadow-sm animate-pulse"
              title="اختيار تمرين النزول الحر مع صور تشريحية للعضلة المستهدفة"
            >
              <span>تمرين النزول الحر 🎯</span>
            </button>

            {/* North Africa Bank */}
            <button
              onClick={onOpenBankPayment}
              className="flex items-center gap-1 text-xs bg-black/25 hover:bg-black/40 text-neutral-950 font-black px-2 py-0.5 rounded transition cursor-pointer"
              title="رقم حساب مصرف شمال أفريقيا والدفع"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>شمال أفريقيا 💳</span>
            </button>

            {/* Single File HTML Quick Download Link */}
            <a
              href="/powergym.html"
              download="powergym.html"
              className="hidden md:flex items-center gap-1 text-xs bg-black/25 hover:bg-black/40 text-neutral-950 font-black px-2 py-0.5 rounded transition cursor-pointer"
              title="تحميل كود التطبيق كاملاً في ملف HTML واحد"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>ملف HTML 📄</span>
            </a>

            {/* Coach Abdulrahman */}
            <button
              onClick={onOpenCoachModal}
              className="flex items-center gap-1 text-xs bg-black/20 hover:bg-black/35 text-neutral-950 font-black px-2 py-0.5 rounded transition cursor-pointer"
              title="تواصل مع كوتش عبدالرحمن"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>كوتش عبدالرحمن 🏋️</span>
            </button>

            {/* Gym Management */}
            <button
              onClick={onOpenManagementModal}
              className="flex items-center gap-1 text-xs bg-black/20 hover:bg-black/35 text-neutral-950 font-black px-2 py-0.5 rounded transition cursor-pointer"
              title="تواصل مع إدارة الصالة"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>إدارة الصالة 🏢</span>
            </button>

            <a
              href={GYM_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 hover:underline text-xs bg-black/15 hover:bg-black/25 px-2 py-0.5 rounded transition"
              title="صفحة فيسبوك الرسمية"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span className="hidden md:inline">فيسبوك</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar with Logo, Universal Search, and Actions */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2.5 pb-2">
        <div className="flex items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <PowerGymLogo size="md" className="shrink-0" />

            <div className="hidden lg:block">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                  باور جيم
                </h1>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold px-1.5 py-0.5 bg-emerald-400/10 border border-emerald-400/30 rounded">
                  POWER GYM
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">صالة القوة واللياقة البدنية المتكاملة</p>
            </div>
          </div>

          {/* Universal Search Bar (Center / Prominent) */}
          <div className="flex-1 max-w-xl mx-1 sm:mx-2">
            <GlobalSearchBar 
              onSelectTab={setActiveTab}
              onOpenExerciseModal={onOpenExerciseModal}
              onOpenBankPayment={onOpenBankPayment}
              onOpenCoachModal={onOpenCoachModal}
              onOpenManagementModal={onOpenManagementModal}
            />
          </div>

          {/* Action Buttons: North Africa Bank, Coach Abdulrahman, Gym Management */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* North Africa Bank Payment Button */}
            <button
              onClick={onOpenBankPayment}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-400 text-xs font-black transition cursor-pointer shadow-sm group"
              title="رقم حساب مصرف شمال أفريقيا والدفع الإلكتروني"
            >
              <Building2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">مصرف شمال أفريقيا</span>
              <span className="xl:hidden">شمال أفريقيا 💳</span>
            </button>

            {/* Contact Coach Abdulrahman */}
            <button
              onClick={onOpenCoachModal}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-black transition cursor-pointer shadow-sm group"
              title="تواصل مع كوتش عبدالرحمن للاستشارات والجداول"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">كوتش عبدالرحمن</span>
              <span className="md:hidden">الكوتش 🏋️</span>
            </button>

            {/* Contact Gym Management */}
            <button
              onClick={onOpenManagementModal}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-400 text-xs font-black transition cursor-pointer shadow-sm group"
              title="تواصل مع إدارة الصالة الرسمية"
            >
              <Building2 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">إدارة الصالة</span>
              <span className="md:hidden">الإدارة 🏢</span>
            </button>

            {/* Share for Friends button */}
            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black transition cursor-pointer shadow-md shadow-amber-500/15"
                title="مشاركة التطبيق مع الأصدقاء برابط مباشر"
              >
                <Share2 className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">مشاركة للأصدقاء</span>
                <span className="sm:hidden">مشاركة</span>
              </button>
            )}

            {/* Single File HTML Direct Download Button */}
            <a
              href="/powergym.html"
              download="powergym.html"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition cursor-pointer"
              title="تحميل كود التطبيق كاملاً في ملف واحد HTML"
            >
              <FileCode className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ملف HTML 📄</span>
            </a>

            {/* Install / APK & GitHub button */}
            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold transition cursor-pointer"
                title="تثبيت التطبيق، حزمة GitHub، أو تحميل APK"
              >
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hidden xl:inline">تثبيت / APK</span>
                <span className="xl:hidden">APK</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 scrollbar-none border-t border-neutral-900 mt-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Interactive Quick Bar Underneath: North Africa Bank + Coach Abdulrahman + Gym Management */}
        <div className="pt-2 pb-1 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Box 1: North Africa Bank */}
            <button
              onClick={onOpenBankPayment}
              className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-amber-500/30 text-neutral-200 transition cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <Building2 className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] sm:text-xs">
                  مصرف شمال أفريقيا: <strong className="text-amber-400 font-mono font-bold" dir="ltr">{BANK_DETAILS.accountNumber}</strong>
                </span>
              </div>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500 text-neutral-950">
                نسخ / دفع 💳
              </span>
            </button>

            {/* Box 2: Contact Coach Abdulrahman */}
            <button
              onClick={onOpenCoachModal}
              className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-emerald-500/30 text-neutral-200 transition cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] sm:text-xs font-bold text-white">
                  تواصل مع {COACH_NAME}
                </span>
              </div>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                استشارات وجداول 🏋️‍♂️
              </span>
            </button>

            {/* Box 3: Contact Gym Management */}
            <button
              onClick={onOpenManagementModal}
              className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-blue-500/30 text-neutral-200 transition cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] sm:text-xs font-bold text-white">
                  تواصل مع إدارة الصالة
                </span>
              </div>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                اشتراكات ومواعيد 🏢
              </span>
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>خدمة المشتركين والمتابعة متاحة على مدار الساعة</span>
          </div>
        </div>
      </div>
    </header>
  );
};
