import { DaySchedule, RoutinePlan, TimeSlot, CurrentStatusInfo } from '../types';
import { EXERCISE_DATABASE } from './exerciseLibrary';

export const GYM_NAME = 'باور جيم - POWER GYM';
export const GYM_LOCATION_URL = 'https://maps.app.goo.gl/xdSJEzuqiCHUsYp89';
export const GYM_FACEBOOK_URL = 'https://www.facebook.com/powergymly';
export const COACH_FACEBOOK_URL = 'https://www.facebook.com/abade.abadee.94';
export const COACH_NAME = 'كوتش عبدالرحمن';

export const BANK_DETAILS = {
  bankName: 'مصرف شمال أفريقيا (North Africa Bank)',
  accountNumber: '056011402159017',
  appService: 'تطبيق نافس (Nafes) / تحويل مصرف شمال أفريقيا',
  gymFacebookUrl: 'https://www.facebook.com/powergymly',
  notes: 'يرجى نسخ رقم الحساب والتحويل، ثم إرسال لقطة شاشة للإيصال إلى صفحة فيسبوك الصالة لتأكيد الاشتراك وتفعيله فوراً.'
};

export const GYM_RULES = [
  'يرجى استعمال المنشفة الخاصة بك ومزيل العرق حفاظاً على النظافة العامة.',
  'الالتزام بارتداء ملابس وأحذية رياضية لائقة ومخصصة للتمارين.',
  'يرجى عدم التدخل في شؤون الرياضيين الآخرين أو تصويرهم بدون إذنهم.',
  'إعادة الأوزان والأثقال والدمبلز إلى أماكنها المخصصة بعد الانتهاء من كل تمرين.',
  'المحافظة على نظافة الأجهزة والمعدات وسلامة الصالة العامة.'
];

// Weekly Schedule
// Men's & Women's Hours:
// السبت (Sat, 6):
//   Men: 13:00 - 24:00 (1 مساء إلى 12 ليلاً)
//   Women: 09:00 - 13:00 (9 صباحاً إلى 1 مساء)
// الأحد (Sun, 0):
//   Men: 10:00 - 15:30 (10 صباحاً إلى 3:30 مساء) & 18:30 - 24:00 (6:30 مساء إلى 12 ليلاً)
//   Women: 16:00 - 18:30 (4 مساء إلى 6:30 مساء)
// الاثنين (Mon, 1):
//   Men: 13:00 - 24:00 (1 مساء إلى 12 ليلاً)
//   Women: 09:00 - 13:00 (9 صباحاً إلى 1 مساء)
// الثلاثاء (Tue, 2):
//   Men: 10:00 - 15:30 (10 صباحاً إلى 3:30 مساء) & 18:30 - 24:00 (6:30 مساء إلى 12 ليلاً)
//   Women: 16:00 - 18:30 (4 مساء إلى 6:30 مساء)
// الأربعاء (Wed, 3):
//   Men: 10:00 - 15:30 (10 صباحاً إلى 3:30 مساء) & 18:30 - 24:00 (6:30 مساء إلى 12 ليلاً)
//   Women: 16:00 - 18:30 (4 مساء إلى 6:30 مساء)
// الخميس (Thu, 4):
//   Men: 13:00 - 24:00 (1 مساء إلى 12 ليلاً)
//   Women: 09:00 - 13:00 (9 صباحاً إلى 1 مساء)
// الجمعة (Fri, 5):
//   راحة كاملة للصالة

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    dayName: 'السبت',
    dayIndex: 6,
    menSlots: [
      { start: '1:00 م', end: '12:00 ليلاً', startHour: 13, startMinute: 0, endHour: 24, endMinute: 0, label: 'فترة مسائية' }
    ],
    womenSlots: [
      { start: '9:00 ص', end: '1:00 م', startHour: 9, startMinute: 0, endHour: 13, endMinute: 0, label: 'فترة صباحية' }
    ]
  },
  {
    dayName: 'الأحد',
    dayIndex: 0,
    menSlots: [
      { start: '10:00 ص', end: '3:30 م', startHour: 10, startMinute: 0, endHour: 15, endMinute: 30, label: 'فترة نهارية' },
      { start: '6:30 م', end: '12:00 ليلاً', startHour: 18, startMinute: 30, endHour: 24, endMinute: 0, label: 'فترة ليلية' }
    ],
    womenSlots: [
      { start: '4:00 م', end: '6:30 م', startHour: 16, startMinute: 0, endHour: 18, endMinute: 30, label: 'فترة مسائية' }
    ]
  },
  {
    dayName: 'الاثنين',
    dayIndex: 1,
    menSlots: [
      { start: '1:00 م', end: '12:00 ليلاً', startHour: 13, startMinute: 0, endHour: 24, endMinute: 0, label: 'فترة مسائية' }
    ],
    womenSlots: [
      { start: '9:00 ص', end: '1:00 م', startHour: 9, startMinute: 0, endHour: 13, endMinute: 0, label: 'فترة صباحية' }
    ]
  },
  {
    dayName: 'الثلاثاء',
    dayIndex: 2,
    menSlots: [
      { start: '10:00 ص', end: '3:30 م', startHour: 10, startMinute: 0, endHour: 15, endMinute: 30, label: 'فترة نهارية' },
      { start: '6:30 م', end: '12:00 ليلاً', startHour: 18, startMinute: 30, endHour: 24, endMinute: 0, label: 'فترة ليلية' }
    ],
    womenSlots: [
      { start: '4:00 م', end: '6:30 م', startHour: 16, startMinute: 0, endHour: 18, endMinute: 30, label: 'فترة مسائية' }
    ]
  },
  {
    dayName: 'الأربعاء',
    dayIndex: 3,
    menSlots: [
      { start: '10:00 ص', end: '3:30 م', startHour: 10, startMinute: 0, endHour: 15, endMinute: 30, label: 'فترة نهارية' },
      { start: '6:30 م', end: '12:00 ليلاً', startHour: 18, startMinute: 30, endHour: 24, endMinute: 0, label: 'فترة ليلية' }
    ],
    womenSlots: [
      { start: '4:00 م', end: '6:30 م', startHour: 16, startMinute: 0, endHour: 18, endMinute: 30, label: 'فترة مسائية' }
    ]
  },
  {
    dayName: 'الخميس',
    dayIndex: 4,
    menSlots: [
      { start: '1:00 م', end: '12:00 ليلاً', startHour: 13, startMinute: 0, endHour: 24, endMinute: 0, label: 'فترة مسائية' }
    ],
    womenSlots: [
      { start: '9:00 ص', end: '1:00 م', startHour: 9, startMinute: 0, endHour: 13, endMinute: 0, label: 'فترة صباحية' }
    ]
  },
  {
    dayName: 'الجمعة',
    dayIndex: 5,
    menSlots: [],
    womenSlots: [],
    isClosed: true,
    notes: 'يوم الجمعة راحة واستشفاء عام للصالة'
  }
];

function isTimeInSlot(currentMinutes: number, slot: TimeSlot): boolean {
  const slotStartMinutes = slot.startHour * 60 + slot.startMinute;
  const slotEndMinutes = slot.endHour === 24 ? 24 * 60 : slot.endHour * 60 + slot.endMinute;
  return currentMinutes >= slotStartMinutes && currentMinutes < slotEndMinutes;
}

export function getCurrentGymStatus(testDate?: Date): CurrentStatusInfo {
  const now = testDate || new Date();
  const dayIndex = now.getDay();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const currentTotalMin = currentHour * 60 + currentMin;

  const todaySchedule = WEEKLY_SCHEDULE.find((d) => d.dayIndex === dayIndex);

  if (!todaySchedule || todaySchedule.isClosed || dayIndex === 5) {
    return {
      isOpen: false,
      currentSession: 'none',
      statusText: 'الصالة مغلقة اليوم (جمعة مباركة - يوم راحة)',
      isFridayRest: true,
      nextSessionText: 'الفترة القادمة: يوم السبت الساعة 9:00 ص (فترة النساء)'
    };
  }

  // Check Men slots
  for (const slot of todaySchedule.menSlots) {
    if (isTimeInSlot(currentTotalMin, slot)) {
      const endMins = slot.endHour === 24 ? 24 * 60 : slot.endHour * 60 + slot.endMinute;
      const remMins = endMins - currentTotalMin;
      const remHours = Math.floor(remMins / 60);
      const remLeftMins = remMins % 60;
      const timeRemaining = remHours > 0 ? `${remHours} س و ${remLeftMins} د` : `${remLeftMins} دقيقة`;
      return {
        isOpen: true,
        currentSession: 'men',
        statusText: 'توقيت الرجال الآن 🏋️‍♂️',
        timeRemaining: `متبقي على نهاية الفترة: ${timeRemaining} (تنتهي ${slot.end})`,
        isFridayRest: false
      };
    }
  }

  // Check Women slots
  for (const slot of todaySchedule.womenSlots) {
    if (isTimeInSlot(currentTotalMin, slot)) {
      const endMins = slot.endHour === 24 ? 24 * 60 : slot.endHour * 60 + slot.endMinute;
      const remMins = endMins - currentTotalMin;
      const remHours = Math.floor(remMins / 60);
      const remLeftMins = remMins % 60;
      const timeRemaining = remHours > 0 ? `${remHours} س و ${remLeftMins} د` : `${remLeftMins} دقيقة`;
      return {
        isOpen: true,
        currentSession: 'women',
        statusText: 'توقيت النساء الآن 🏋️‍♀️',
        timeRemaining: `متبقي على نهاية الفترة: ${timeRemaining} (تنتهي ${slot.end})`,
        isFridayRest: false
      };
    }
  }

  // Closed right now, find next session today or tomorrow
  const upcomingSlots: Array<{ session: 'men' | 'women'; slot: TimeSlot; startMinutes: number }> = [];
  todaySchedule.menSlots.forEach((s) => {
    const sMin = s.startHour * 60 + s.startMinute;
    if (sMin > currentTotalMin) {
      upcomingSlots.push({ session: 'men', slot: s, startMinutes: sMin });
    }
  });
  todaySchedule.womenSlots.forEach((s) => {
    const sMin = s.startHour * 60 + s.startMinute;
    if (sMin > currentTotalMin) {
      upcomingSlots.push({ session: 'women', slot: s, startMinutes: sMin });
    }
  });

  upcomingSlots.sort((a, b) => a.startMinutes - b.startMinutes);

  if (upcomingSlots.length > 0) {
    const next = upcomingSlots[0];
    const targetLabel = next.session === 'men' ? 'فترة الرجال' : 'فترة النساء';
    return {
      isOpen: false,
      currentSession: 'none',
      statusText: 'الصالة مغلقة حالياً (بين الفترات)',
      isFridayRest: false,
      nextSessionText: `الفترة القادمة اليوم: ${targetLabel} في تمام ${next.slot.start}`
    };
  }

  return {
    isOpen: false,
    currentSession: 'none',
    statusText: 'انتهت مواعيد اليوم - الصالة مغلقة',
    isFridayRest: false,
    nextSessionText: 'موعد الافتتاح غداً حسب الجدول المعتمد'
  };
}

// Workout Plans
export const ROUTINE_PLANS: RoutinePlan[] = [
  {
    id: '4-days',
    title: 'جدول تمارين 4 أيام (Push - Pull - Legs)',
    daysCount: 4,
    subtitle: 'البرنامج الاحترافي الشامل (دفع - سحب - أرجل)',
    badge: 'الأكثر طلباً وتفصيلاً ⭐',
    description: 'تقسيم مثالي لبناء القوة والكتلة العضلية مع أيام استشفاء محسوبة بدقة لتفادي الإجهاد.',
    days: [
      {
        dayName: 'السبت',
        title: 'صدر + أكتاف أمامي وجانبي + تراي سبس',
        targetMuscles: 'الصدر، الأكتاف (أمامي وجانبي)، الترايسبس',
        isRestDay: false,
        exercises: [
          {
            id: '4d-1',
            name: 'بنش برس بالبار (Barbell Bench Press)',
            targetMuscle: 'الصدر (Pectoralis)',
            targetMuscleDetail: 'ألياف الصدر الأوسط والكبير',
            secondaryMuscles: 'الترايسبس، الكتف الأمامي',
            equipment: 'بار أولمبي + بنش مستوي',
            sets: '4×10',
            imageUrl: '/assets/images/chest-bench-press.jpg',
            executionSteps: [
              'استلقِ على البنش مع تثبيت القدمين بإحكام على الأرض وضبط تقوس طبيعي في أسفل الظهر.',
              'أمسك البار بقبضة أوسع قليلاً من عرض الكتفين مع إرجاع لوحي الكتف للخلف.',
              'أنزل البار بتحكم وسلاسة حتى يلامس منتصف عظمة الصدر بدون ارتطام.',
              'ادفع البار بقوة للأعلى مع عصر الصدر في القمة دون قفل المرفقين تماماً.'
            ],
            commonMistakes: [
              'ارتطام البار بالقفص الصدري.',
              'فتح المرفقين بزاوية 90 درجة مما يسبب ضغطاً خطيراً على أوتار الكتف (اجعل الزاوية 45-70 درجة).',
              'رفع المؤخرة عن مقعد البنش أثناء الدفع.'
            ],
            notes: 'تمرين أساسي لبناء القوة والحجم الكلي للصدر الأوسط.'
          },
          {
            id: '4d-2',
            name: 'تفتيح دمبل مائل (Incline Dumbbell Fly)',
            targetMuscle: 'الصدر (Upper Chest)',
            targetMuscleDetail: 'ألياف الصدر العلوية الترقوية',
            secondaryMuscles: 'الكتف الأمامي',
            equipment: 'دمبلز + بنش مائل بزاوية 30-45 درجة',
            sets: '3×12',
            imageUrl: '/assets/images/chest-incline-press.jpg',
            executionSteps: [
              'اضبط البنش بزاوية 30 إلى 45 درجة واستند بظهرك بالكامل.',
              'ارفع الدمبلين للأعلى فوق الصدر مع انحناء خفيف جداً وثابت في المرفقين.',
              'افتح ذراعيك بحركة قوسية عريضة حتى تشعر بتمدد عميق ومريح في عضلات الصدر العلوي.',
              'اعصر الصدر العلوي أثناء إعادة الدمبلين للأعلى بنمط دائري محكم.'
            ],
            commonMistakes: [
              'ثني المرفقين بشكل مفرط وتحويل الحركة إلى تمرين ضغط بدل تفتيح.',
              'النزول الزائد عن الحد مما يجهد محفظة مفصل الكتف.',
              'استخدام أوزان ثقيلة تمنع العزل الصحيح.'
            ],
            notes: 'عزل ممتاز لتفجير الصدر العلوي وإعطاء المظهر الممتلئ للقفص الصدري.'
          },
          {
            id: '4d-3',
            name: 'ضغط عسكري بالبار (Military Overhead Press)',
            targetMuscle: 'الأكتاف (Deltoids)',
            targetMuscleDetail: 'الرأس الأمامي والأوسط للكتف',
            secondaryMuscles: 'الترايسبس، الترابيس، عضلات البطن والجذع',
            equipment: 'بار أولمبي واقف أو جالس',
            sets: '3×10',
            imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'قف مع مباعدة القدمين بعرض الكتفين مع شد عضلات البطن والأرداف.',
              'احمل البار عند مستوى الترقوة وأمام الذقن بقبضة بعرض الكتفين.',
              'ادفع البار عمودياً فوق الرأس حتى استقامة الذراعين مع تمرير الرأس للأمام قليلاً في القمة.',
              'أنزل البار ببطء وتحكم إلى نقطة البداية.'
            ],
            commonMistakes: [
              'تقويس أسفل الظهر بشكل مفرط أثناء الدفع.',
              'عدم إحكام قبضة المعصم مما يسبب التواء المفصل.'
            ],
            notes: 'أقوى تمرين لبناء عتاقة وقوة الأكتاف وتوسيع الإطار العلوي للجسم.'
          },
          {
            id: '4d-4',
            name: 'رفرفة جانبية دمبل (Lateral Dumbbell Raise)',
            targetMuscle: 'الأكتاف (Lateral Deltoid)',
            targetMuscleDetail: 'الرأس الجانبي للكتف (عرض الكتف الكروي)',
            secondaryMuscles: 'الترابيس العلوية',
            equipment: 'دمبلز خفيف إلى متوسط',
            sets: '3×15',
            imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'قف باستقامة مع ميلان خفيف جداً للجذع للأمام وثني بسيط في المرفقين.',
              'ارفع الدمبلين إلى الجانبين بحركة تصاعدية حتى مستوى الكتف.',
              'اجعل الكوع يقود الحركة وكأنك تسكب الماء من إبريق في قمة الرفرفة.',
              'توقف لجزء من الثانية في القمة ثم أنزل ببطء لمدة ثانيتين.'
            ],
            commonMistakes: [
              'أرجحة الجذع واستخدام عزم الاندفاع بدلاً من قوة الكتف.',
              'رفع اليدين أعلى من مستوى الأكتاف مما ينقل الحمل للترابيس.'
            ],
            notes: 'سر الكتف العريض ثلاثي الأبعاد 3D. ركز على التكنيك العالي وتجنب الأوزان العشوائية.'
          },
          {
            id: '4d-5',
            name: 'بوش داون ترايسبس بالكيبل (Cable Triceps Pushdown)',
            targetMuscle: 'التراي سبس (Triceps)',
            targetMuscleDetail: 'الرأس الخارجي والجانبي للترايسبس',
            secondaryMuscles: 'السواعد',
            equipment: 'جهاز الكيبل + بار مستقيم أو حبل',
            sets: '3×12',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            executionSteps: [
              'ثبّت الكوعين بجانب خصرك تماماً دون أن يتحركا للأمام أو الخلف.',
              'أمسك البار أو الحبل واضغط للأسفل بقوة حتى فرد الذراع بالكامل.',
              'اعصر عضلة الترايسبس بشدة عند أقصى نزول لمدة ثانية.',
              'عد بالبار للأعلى حتى زاوية 90 درجة فقط للمحافظة على التوتر العضلي.'
            ],
            commonMistakes: [
              'ترك الكوعين يتحركان للأمام والخلف واستخدام وزن الجسم.',
              'عدم استكمال مدى الفرد الكامل في الأسفل.'
            ],
            notes: 'ركز على ثبات الكوعين في جانبي الجذع لعزل الرأس الخارجي للتراي.'
          }
        ]
      },
      {
        dayName: 'الأحد',
        title: 'ظهر + أكتاف خلفي + باي سبس',
        targetMuscles: 'الظهر، الأكتاف (الخلفي Rear Delt)، البايسبس',
        isRestDay: false,
        exercises: [
          {
            id: '4d-6',
            name: 'تجديف بار منحني (Barbell Bent-Over Row)',
            targetMuscle: 'الظهر (Mid Back & Lats)',
            targetMuscleDetail: 'عضلات الظهر الأوسط واللاتس والقطنية',
            secondaryMuscles: 'البايسبس، الكتف الخلفي، أوتار الركبة',
            equipment: 'بار أولمبي',
            sets: '4×10',
            imageUrl: '/assets/images/back-barbell-row.jpg',
            executionSteps: [
              'قف مع ثني الركبتين قليلاً وثني الجذع بزاوية 45 درجة مع الحفاظ على ظهرك مستقيماً تماماً.',
              'أمسك البار بقبضة واسعة واسحب البار باتجاه أسفل البطن / السرة.',
              'اعصر لوحي الكتف معاً في القمة مع سحب الكوعين للخلف وللأعلى.',
              'أنزل البار ببطء وتحكم دون تقويس فقرات الظهر.'
            ],
            commonMistakes: [
              'تقويس الظهر مما يعرض الفقرات القطنية للإصابة.',
              'الوقوف بشكل مستقيم جداً أثناء السحب وتحويله إلى ترابيس.'
            ],
            notes: 'التمرين الذهبي لكثافة وسماكة الظهر وبناء الهيبة الرياضية.'
          },
          {
            id: '4d-7',
            name: 'سحب أمامي كيبل (Lat Pulldown)',
            targetMuscle: 'الظهر (Latissimus Dorsi)',
            targetMuscleDetail: 'العضلة العريضة للظهر (عرض الظهر V-Taper)',
            secondaryMuscles: 'البايسبس، الكتف الخلفي',
            equipment: 'جهاز السحب العالي بالكيبل',
            sets: '3×12',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            executionSteps: [
              'اجلس على المقعد مع تثبيت الفخذين أسفل الوسائد المخصصة.',
              'أمسك القضيب بقبضة واسعة واسحب البار للأسفل باتجاه أعلى عظمة الصدر.',
              'ارفع صدرك للأعلى مع سحب الأكواع للأسفل والداخل.',
              'اترك البار يصعد ببطء مع شعور بتمدد كامل لعضلات الظهر العريضة.'
            ],
            commonMistakes: [
              'الميلان الشديد للخلف والأرجحة بجذع الجسم.',
              'السحب خلف الرقبة (يسبب ضغطاً ضاراً على فقرات الرقبة والكتف).'
            ],
            notes: 'بناء عرض الظهر ورسم حرف V الممشوق.'
          },
          {
            id: '4d-8',
            name: 'رفرفة خلفية (Rear Delt Dumbbell Fly)',
            targetMuscle: 'الأكتاف (Rear Deltoid)',
            targetMuscleDetail: 'الرأس الخلفي للكتف والظهر العلوي',
            secondaryMuscles: 'عضلات الترابيزيوس والرومبويد',
            equipment: 'دمبلز خفيف',
            sets: '3×15',
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'انحنِ للأمام من الوركين حتى يوازي جذعك الأرض تقريباً مع ظهر مستقيم.',
              'احمل الدمبلين مع ذراعين متدليتين وثني بسيط في المرفقين.',
              'ارفع الدمبلين للخارج وللأعلى حتى مستوى الظهر مع التركيز على عصر خلفية الكتف.',
              'أنزل ببطء لتحقيق أقصى مقاومة سلبية.'
            ],
            commonMistakes: [
              'استخدام أوزان ثقيلة تؤدي لسحب الوزن بالظهر الأوسط والترابيس بدل الكتف الخلفي.'
            ],
            notes: 'يحمي مفصل الكتف من الإصابات ويصحح انحناء الأكتاف للأمام.'
          },
          {
            id: '4d-9',
            name: 'كيرل بار مستقيم / EZ (Barbell Bicep Curl)',
            targetMuscle: 'الباي سبس (Biceps Brachii)',
            targetMuscleDetail: 'الرأس الطويل والقصير للبايسبس',
            secondaryMuscles: 'عضلات الساعد والقبضة',
            equipment: 'بار أولمبي أو بار متعرج EZ',
            sets: '3×12',
            imageUrl: '/assets/images/biceps-curl.jpg',
            executionSteps: [
              'قف مستقيماً مع مسك البار بقبضة بعرض الكتفين وثبات الكوعين بجانب الجسم.',
              'اثنِ الذراعين وارفع البار باتجاه الصدر مع انقباض قوي للبايسبس.',
              'تجنب رمي الكوعين للأمام للمحافظة على التوتر العضلي التام.',
              'أنزل البار بنزول بطيء لمدة ثانيتين إلى 3 ثوان.'
            ],
            commonMistakes: [
              'أرجحة الظهر واستخدام الاندفاع.',
              'تحريك الكوعين للأمام في قمة الحركة مما يريح البايسبس.'
            ],
            notes: 'التمرين الأساسي الأول لبناء كتلة وحجم الذراع.'
          },
          {
            id: '4d-10',
            name: 'كيرل تركيز دمبل (Concentration Curl)',
            targetMuscle: 'الباي سبس (Bicep Peak)',
            targetMuscleDetail: 'قمة وعزل كرة البايسبس',
            secondaryMuscles: 'العضلة العضدية Brachialis',
            equipment: 'دمبل + بنش تدريب',
            sets: '3×12',
            imageUrl: '/assets/images/biceps-curl.jpg',
            executionSteps: [
              'اجلس على طرف البنش وضع كوع ذراعك المتمرنة على الفخذ الداخلي لنفس الجهة.',
              'ارفع الدمبل بتركيز تام باتجاه الوجه مع لف المعصم للخارج قليلاً في القمة.',
              'اعصر البايسبس لأقصى درجة في الأعلى قبل النزول التدريجي.'
            ],
            commonMistakes: [
              'تحريك الكتف أو مساعدة الذراع باليد الأخرى أثناء الرفع.'
            ],
            notes: 'عزل جراحي دقيق لارتفاع قمة البايسبس peak.'
          }
        ]
      },
      {
        dayName: 'الاثنين',
        title: 'أرجل + رقبة + سواعد',
        targetMuscles: 'الأرجل، الرقبة، السواعد',
        isRestDay: false,
        exercises: [
          {
            id: '4d-11',
            name: 'سكوات بالبار (Barbell Back Squat)',
            targetMuscle: 'الأرجل (Quadriceps & Glutes)',
            targetMuscleDetail: 'الفخذ الأمامي، المؤخرة، وعضلات الحوض',
            secondaryMuscles: 'الفخذ الخلفي، أوتار الركبة، عضلات أسفل الظهر',
            equipment: 'راك السكوات + بار أولمبي',
            sets: '4×10',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'ضع البار على عضلات الترابيزيوس العلوية مع مباعدة القدمين باتساع الكتفين وتوجيه أصابع القدم للخارج قليلاً.',
              'خذ نفساً عميقاً واحبسه في البطن مع ثني الركبتين ودفع الوركين للخلف كالجلوس على كرسي.',
              'انزل حتى يصبح الفخذ موازياً للأرض مع ثبات الركبتين باتجاه أصابع القدمين.',
              'ادفع بكعبي القدمين بقوة للعودة إلى وضع الوقوف.'
            ],
            commonMistakes: [
              'سقوط الركبتين للداخل أثناء الصعود (Knee caving).',
              'رفع الكعبين عن الأرض أو انحناء الظهر الشديد للأمام.'
            ],
            notes: 'ملك تمارين كمال الأجسام والقوة البدنية. يعزز إفراز هرمونات النمو والتستوستيرون الطبيعي.'
          },
          {
            id: '4d-12',
            name: 'دفع أرجل بالماكينة (Leg Press Machine)',
            targetMuscle: 'الأرجل (Quadriceps Focus)',
            targetMuscleDetail: 'رؤوس الفخذ الأمامية الأربعة',
            secondaryMuscles: 'المؤخرة، السمانة',
            equipment: 'جهاز Leg Press زاوية 45',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'اجلس مع تثبيت ظهرك ومؤخرتك بإحكام على المقعد المريح.',
              'ضع قدميك في منتصف المنصة بعرض الكتفين.',
              'حرر الأمان وأنزل الوزن ببطء حتى تشكل الركبتان زاوية 90 درجة.',
              'ادفع المنصة بقوة دون قفل مفصل الركبة بشكل مستقيم في الأعلى.'
            ],
            commonMistakes: [
              'قفل مفصل الركبة تماماً في القمة مما يضع وزناً مدمراً على المفصل.',
              'رفع أسفل الظهر عن المقعد أثناء النزول العميق.'
            ],
            notes: 'تحميل أوزان بأمان تام مع تركيز عضلي هائل على الفخذ الأمامي.'
          },
          {
            id: '4d-13',
            name: 'رومانيان ديدليفت (Romanian Deadlift - RDL)',
            targetMuscle: 'الأرجل (Hamstrings & Glutes)',
            targetMuscleDetail: 'الفخذ الخلفي وأوتار الركبة والمؤخرة',
            secondaryMuscles: 'أسفل الظهر، عضلات الجذع',
            equipment: 'بار أولمبي أو دمبلز',
            sets: '3×10',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'قف مستقيماً مع مسك البار بفخذين متوازيين وثني طفيف جداً في الركبتين.',
              'ادفع الحوض والوركين للخلف مع النزول بالبار بمحاذاة الساقين مع ظهر مستقيم تماماً.',
              'توقف عندما تشعر بتمدد قوي في أوتار الفخذ الخلفية (تحت الركبة بقليل).',
              'ادفع بالحوض للأمام واعتصر عضلات المؤخرة والفخذ الخلفي للعودة للأعلى.'
            ],
            commonMistakes: [
              'تقويس الظهر أثناء النزول.',
              'ثني الركبتين بشكل زائد وتحويله لسكوات تقليدي.'
            ],
            notes: 'التمرين رقم 1 لنحت وتكبير عضلات الفخذ الخلفية وحماية الركبة.'
          },
          {
            id: '4d-14',
            name: 'تقوية الرقبة بحذر (Neck Flexion & Extension)',
            targetMuscle: 'الرقبة (Neck Muscles)',
            targetMuscleDetail: 'العضلة القصية الترقوية الخشائية (Sternocleidomastoid)',
            secondaryMuscles: 'الترابيزيوس العليا',
            equipment: 'وزن خفيف جداً أو مقاومة اليد مع منشفة',
            sets: '3×15',
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'استلقِ على ظهرك على بنش مستوٍ مع تدلي الرأس قليلاً عن الحافة.',
              'ضع وزناً خفيفاً جداً فوق منشفة ناعمة على الجبهة وثبته بيدك.',
              'أنزل الرأس ببطء وتحكم ثم ارفعه للأعلى برفق مع شد عضلات الرقبة.',
              'كرر الأمر بحركات بطيئة وتجنب الحركات المفاجئة.'
            ],
            commonMistakes: [
              'استخدام أوزان ثقيلة أو حركات سريعة مفاجئة تسبب شداً عنقياً.'
            ],
            notes: 'يعطي مظهراً رياضياً قوياً ويحمي الرقبة والعمود الفقري.'
          },
          {
            id: '4d-15',
            name: 'كيرل معصم بالبار للسواعد (Wrist Forearm Curl)',
            targetMuscle: 'السواعد (Forearms)',
            targetMuscleDetail: 'العضلات القابضة للساعد والقبضة',
            secondaryMuscles: 'عضلات كف اليد',
            equipment: 'بار مستقيم مع الاستناد على بنش',
            sets: '3×15',
            imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'أسند ساعديك على فخذيك أو على حافة البنش مع تدلي المعصمين للخارج.',
              'أنزل البار حتى أطراف الأصابع ببطء ثم ارفعه بالمعصمين لأقصى ارتفاع ممكن.',
              'اعصر السواعد بقوة في القمة لمدة ثانية.'
            ],
            commonMistakes: [
              'تحريك المرفقين أو استخدام أوزان تمنع الحركة الكاملة للمعصم.'
            ],
            notes: 'بناء قبضة يد حديدية وسواعد بارزة كالمحترفين.'
          }
        ]
      },
      {
        dayName: 'الثلاثاء',
        title: 'يوم راحة واستشفاء',
        targetMuscles: 'استشفاء كامل',
        isRestDay: true,
        restDescription: 'يوم راحة — استشفاء العضلات وتجديد مخازن الجليكوجين قبل الجولة القادمة. اشرب كميات كافية من الماء ونم جيداً.',
        exercises: []
      },
      {
        dayName: 'الأربعاء',
        title: 'صدر + أكتاف أمامي وجانبي + تراي سبس',
        targetMuscles: 'الصدر، الأكتاف (أمامي وجانبي)، الترايسبس',
        isRestDay: false,
        exercises: [
          {
            id: '4d-16',
            name: 'بنش برس مائل بالبار (Incline Barbell Bench)',
            targetMuscle: 'الصدر (Upper Pectoralis)',
            targetMuscleDetail: 'الصدر العلوي والترقوي',
            secondaryMuscles: 'الكتف الأمامي، الترايسبس',
            equipment: 'بنش مائل + بار أولمبي',
            sets: '4×10',
            imageUrl: '/assets/images/chest-incline-press.jpg',
            executionSteps: [
              'استلقِ على بنش مائل بزاوية 30-45 درجة.',
              'أنزل البار بنظام وهدوء حتى يلامس أعلى الصدر مباشرة تحت الرقبة.',
              'ادفع للأعلى مع تفجير ألياف الصدر العلوي.'
            ],
            commonMistakes: ['زاوية ميلان شديدة تتجاوز 45 درجة فتحول التمرين للكتف بالكامل.'],
            notes: 'ضروري لملء الفراغ بين عظام الترقوة وأعلى الصدر.'
          },
          {
            id: '4d-17',
            name: 'ضغط صدر بالكيبل أو فراشة (Cable Crossover)',
            targetMuscle: 'الصدر (Chest Squeeze)',
            targetMuscleDetail: 'الصدر الأوسط والألياف الداخلية',
            secondaryMuscles: 'الكتف الأمامي',
            equipment: 'جهاز الكيبل كروس',
            sets: '3×12',
            imageUrl: '/assets/images/chest-incline-press.jpg',
            executionSteps: [
              'قف في منتصف جهاز الكيبل مع تقدم خطوة واحدة للأمام وميل خفيف في الجذع.',
              'اجمع المقبضين للأمام وللأسفل بحركة نصف دائرية كأنك تعانق شجرة كبيرة.',
              'اعصر عضلات الصدر في المنتصف لمدة ثانية مع تقاطع خفيف لليدين.'
            ],
            commonMistakes: ['ثني المرفقين وتحويل الحركة لدفع.'],
            notes: 'توتر عضلي مستمر طوال المدى الحركي وعصر مجهر للألياف.'
          },
          {
            id: '4d-18',
            name: 'رفع أمامي دمبل (Front Dumbbell Raise)',
            targetMuscle: 'الأكتاف (Anterior Deltoid)',
            targetMuscleDetail: 'الرأس الأمامي لعضلة الكتف',
            secondaryMuscles: 'الصدر العلوي',
            equipment: 'دمبلز',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'قف مستقيماً مع مسك الدمبلين أمام الفخذين.',
              'ارفع ذراعاً تلو الأخرى للأمام حتى مستوى العينين بدون أرجحة.',
              'أنزل ببطء وتحكم تام.'
            ],
            commonMistakes: ['الميلان للخلف لرفع الوزن.'],
            notes: 'عزل مباشر لمقدمة الكتف.'
          },
          {
            id: '4d-19',
            name: 'رفرفة جانبية كيبل (Cable Lateral Raise)',
            targetMuscle: 'الأكتاف (Lateral Deltoid)',
            targetMuscleDetail: 'الكتف الجانبي بتوتر مستمر',
            secondaryMuscles: 'الترابيس',
            equipment: 'بكرة الكيبل السفلية',
            sets: '3×15',
            imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'قف بجانب الكيبل وامسك المقبض بيدك البعيدة خلف الظهر أو من الأمام.',
              'ارفع الذراع للجانب حتى موازاة الكتف مع ثبات الجذع.',
              'أنزل ببطء لمقاومة السحب المستمر للكيبل.'
            ],
            commonMistakes: ['الميلان مع حركة الكيبل.'],
            notes: 'الكيبل يوفر مقاومة ثابتة حتى في أسفل نقطة من الحركة.'
          },
          {
            id: '4d-20',
            name: 'تمرين النزول الحر على المتوازي (Triceps Free Descent Dips)',
            targetMuscle: 'التراي سبس وأسفل الصدر',
            targetMuscleDetail: 'رؤوس الترايسبس الثلاثة مع ألياف الصدر السفلي والكتف الأمامي',
            secondaryMuscles: 'الأكتاف الأمامية وعضلات الجذع',
            equipment: 'جهاز المتوازي (Dip Station) / وزن الجسم الحر',
            sets: '4×10-12 (هبوط حر 3 ثوانٍ)',
            imageUrl: '/assets/images/free_descent_dips_anatomy.jpg',
            executionSteps: [
              'امسك بقضباني المتوازي وارفع جسمك في الهواء مع استقامة الجذع والكتفين للأسفل.',
              'ابدأ مرحلة النزول الحر المتحكم: اهبط ببطء شديد على مدى 3 ثوانٍ ضد الجاذبية حتى زاوية 90 درجة.',
              'توقف لثانية واحدة عند أقصى تمدد آمن للألياف العضلية بدون إجهاد محفظة الكتف.',
              'ادفع للأعلى بقوة وانفجارية بالاعتماد على الترايسبس والصدر مع عصر العضلة في القمة.'
            ],
            commonMistakes: [
              'الهبوط السريع والمفاجئ دون السيطرة على النزول الحر.',
              'الميلان للأمام بشكل مفرط (يحول التركيز للصدر بالكامل).',
              'النزول شديد العمق الذي يضر أوتار الكتف.'
            ],
            notes: 'تمرين النزول الحر الكلاسيكي الأقوى لبناء كتلة ضخمة للذراعين والصدر السفلي.'
          }
        ]
      },
      {
        dayName: 'الخميس',
        title: 'ظهر + أكتاف خلفي + باي سبس + سواعد',
        targetMuscles: 'الظهر، الأكتاف (الخلفي)، البايسبس، السواعد',
        isRestDay: false,
        exercises: [
          {
            id: '4d-21',
            name: 'عقلة قبضة واسعة (Wide Grip Pull-up)',
            targetMuscle: 'الظهر (Upper Lats)',
            targetMuscleDetail: 'العضلة العريضة والظهر العلوي',
            secondaryMuscles: 'البايسبس، السواعد، الكتف الخلفي',
            equipment: 'بار العقلة',
            sets: '4×8',
            imageUrl: '/assets/images/back-pullups.jpg',
            executionSteps: [
              'تعلق بالبار بقبضة واسعة تتجاوز عرض الكتفين.',
              'اسحب صدرك للأعلى باتجاه البار مع توجيه الكوعين لأسفل وللخلف.',
              'توقف عندما يصبح ذقنك فوق البار ثم انزل ببطء للوضع الابتدائي.'
            ],
            commonMistakes: ['التأرجح أو الركل بالأرجل للمساعدة في الصعود.'],
            notes: 'المقياس الحقيقي لقوة الجزء العلوي وعرض الظهر.'
          },
          {
            id: '4d-22',
            name: 'تجديف تي بار (T-Bar Row)',
            targetMuscle: 'الظهر (Mid Back Density)',
            targetMuscleDetail: 'كثافة وسماكة الظهر الأوسط واللوحين',
            secondaryMuscles: 'البايسبس، عضلات أسفل الظهر',
            equipment: 'جهاز T-Bar أو بار حر بزاوية',
            sets: '3×10',
            imageUrl: '/assets/images/back-barbell-row.jpg',
            executionSteps: [
              'قف فوق البار مع ثني الركبتين وإسناد الصدر أو الحفاظ على انحناء الجذع 45 درجة.',
              'اسحب المقبض بقوة نحو أسفل القفص الصدري مع عصر اللوحين معاً.',
              'أنزل ببطء حتى تتمدد عضلات الظهر تماماً.'
            ],
            commonMistakes: ['استخدام الظهر السفلي لرفع الوزن.'],
            notes: 'يعطي سماكة ملحوظة للظهر عند النظر من الجانب.'
          },
          {
            id: '4d-23',
            name: 'رفرفة خلفية بجهاز الفراشة (Reverse Pec Deck)',
            targetMuscle: 'الأكتاف (Rear Delts)',
            targetMuscleDetail: 'الكتف الخلفي وعضلات الرومبويد',
            secondaryMuscles: 'الترابيزيوس الوسطى',
            equipment: 'جهاز الفراشة العكسي',
            sets: '3×15',
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'اجلس بمواجهة الجهاز مع ضبط المقعد بحيث تكون المقابض بمستوى الكتفين.',
              'ادفع الذراعين للخلف بحركة عريضة مع ثني طفيف في المرفقين.',
              'اعصر خلفية الكتف في نهاية الحركة وعد ببطء.'
            ],
            commonMistakes: ['استخدام عضلات الرقبة والترابيس بدل عزل الكتف الخلفي.'],
            notes: 'عزل نقي ومريح لمفصل الكتف.'
          },
          {
            id: '4d-24',
            name: 'كيرل دمبل تناوبي جالس (Incline Dumbbell Curl)',
            targetMuscle: 'الباي سبس (Biceps Long Head)',
            targetMuscleDetail: 'الرأس الطويل للبايسبس مع تمدد عميق',
            secondaryMuscles: 'السواعد',
            equipment: 'بنش مائل 60 درجة + دمبلز',
            sets: '3×12',
            imageUrl: '/assets/images/biceps-curl.jpg',
            executionSteps: [
              'اجلس على بنش مائل مع تدلي الذراعين للخلف خلف الجذع.',
              'ارفع الدمبل مع تدوير المعصم للخارج للأعلى للحصول على أقصى انقباض.',
              'أنزل ببطء لتحقيق تمدد كامل ونادر للرأس الطويل.'
            ],
            commonMistakes: ['رفع الكوع للأمام أثناء الرفع.'],
            notes: 'واحد من أفضل تمارين تكبير حجم البايسبس بفضل التمدد الاستثنائي.'
          },
          {
            id: '4d-25',
            name: 'كيرل معصم عكسي بالبار (Reverse Wrist Curl)',
            targetMuscle: 'السواعد (Extensors & Brachioradialis)',
            targetMuscleDetail: 'العضلات الباسطة للساعد والساعد العلوي',
            secondaryMuscles: 'القبضة والمعصم',
            equipment: 'بار مستقيم',
            sets: '3×15',
            imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
            executionSteps: [
              'أمسك البار بقبضة من الأعلى (الكف للأسفل) واستند بساعديك على فخذيك.',
              'ارفع البار بثني المعصم للأعلى لأقصى حد ثم أنزل ببطء.'
            ],
            commonMistakes: ['استخدام وزن ثقيل يمنع المدى الحركي الكامل.'],
            notes: 'يكمل مظهر الساعد البارز والصلب.'
          }
        ]
      },
      {
        dayName: 'الجمعة',
        title: 'يوم راحة أسبوعية',
        targetMuscles: 'راحة عامة',
        isRestDay: true,
        restDescription: 'يوم الجمعة راحة عامة واستشفاء للعضلات والمفاصل.',
        exercises: []
      }
    ]
  },
  {
    id: '5-days',
    title: 'جدول تمارين 5 أيام (المعدل)',
    daysCount: 5,
    subtitle: 'نظام التقسيم العضلي المكثف للمتقدمين',
    badge: 'كثافة عالية وتركيز ⚡',
    description: 'جدول مخصص لتدريب كل مجموعة عضلية بأقصى تركيز وتفجير للألياف مع يومين راحة (الاثنين والجمعة).',
    days: [
      {
        dayName: 'السبت',
        title: 'صدر (4 مناطق عضلية) + تراي سبس (تمرينين)',
        targetMuscles: 'الصدر (الأوسط، العلوي، السفلي، والتفتيح) + الترايسبس (خياران لكل عضلة: حر أو جهاز)',
        isRestDay: false,
        exercises: [
          {
            id: '5d-1',
            name: 'بنش برس مستوي بالبار (Flat Barbell Bench Press)',
            targetMuscle: 'الصدر الأوسط والعام (Mid Chest)',
            targetMuscleDetail: 'عضلة الصدر الأوسط وبناء الكتلة الأساسية والقوة الانفجارية',
            secondaryMuscles: 'الترايسبس، الكتف الأمامي',
            equipment: 'بنش مستوٍ + بار أولمبي',
            category: 'free',
            sets: '4×10',
            imageUrl: '/assets/images/chest-bench-press.jpg',
            animationUrl: '/assets/exercises/chest-flat-barbell.gif',
            executionSteps: ['ثبت القدمين بإحكام في الأرض، اسحب لوحي الكتف للخلف، أنزل البار حتى منتصف الصدر ثم ادفع بقوة.'],
            commonMistakes: ['ارتطام البار بالصدر أو فتح المرفقين بزاوية 90 درجة حادة.'],
            notes: 'تمرين 1 (الصدر الأوسط): اختر بين الوزن الحر (بار/دمبلز) أو جهاز ماكينة الصدر.',
            alternatives: [
              {
                name: 'تجميع دمبل مستوٍ (Flat Dumbbell Press)',
                type: 'dumbbell',
                typeLabel: 'دمبلز (حر)',
                category: 'free',
                equipment: 'زوج دمبلز + بنش مستوٍ',
                animationUrl: '/assets/exercises/chest-flat-dumbbell.gif',
                notes: 'مدى حركي أوسع وحرية تامة للمفاصل ومعالجة أي فرق قوة بين الجانبين'
              },
              {
                name: 'جهاز ضغط الصدر ماكينة (Chest Press Machine)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                category: 'machine',
                equipment: 'ماكينة ضغط الصدر بالأوزان',
                animationUrl: '/assets/exercises/chest-press-machine.gif',
                notes: 'أمان فائق ومسار حركة ميكانيكي ثابت لعزل ألياف الصدر دون إجهاد التوازن'
              }
            ]
          },
          {
            id: '5d-2',
            name: 'تجميع دمبل مائل علوي (Incline Dumbbell Press)',
            targetMuscle: 'الصدر العلوي (Upper Chest)',
            targetMuscleDetail: 'ألياف الصدر العلوية لملء أعلى القفص الصدري ومنح الصدر مظهراً ممتلئاً ومرتفعاً',
            secondaryMuscles: 'الكتف الأمامي، الترايسبس',
            equipment: 'دمبلز + بنش مائل 30-45 درجة',
            category: 'free',
            sets: '4×12',
            imageUrl: '/assets/images/chest-incline-press.jpg',
            animationUrl: '/assets/exercises/chest-incline-dumbbell.gif',
            executionSteps: ['اضبط البنش على زاوية 30-45 درجة وادفع الدمبلين للأعلى مع عصر الصدر في القمة ونزول محكوم.'],
            commonMistakes: ['النزول الزائد عن الحد المريح للمفصل أو المبالغة في زاوية البنش.'],
            notes: 'تمرين 2 (الصدر العلوي): اختر تجميع الدمبل الحر أو جهاز سميث / ماكينة الصدر العلوي.',
            alternatives: [
              {
                name: 'ضغط صدر مائل على جهاز سميث (Incline Smith Machine Press)',
                type: 'machine',
                typeLabel: 'ماكينة / سميث',
                category: 'machine',
                equipment: 'جهاز سميث + بنش مائل 30°',
                animationUrl: '/assets/exercises/chest-incline-smith.gif',
                notes: 'مسار مستقر يتيح لك التركيز التام على عصر الصدر العلوي بأوزان عالية وبأمان تام'
              },
              {
                name: 'بنش برس مائل بالبار الأولمبي (Incline Barbell Bench)',
                type: 'barbell',
                typeLabel: 'بار أولمبي (حر)',
                category: 'free',
                equipment: 'بار أولمبي + بنش مائل 30°',
                animationUrl: '/assets/exercises/chest-incline-barbell.gif',
                notes: 'تمرين القوة الكلاسيكي لتحميل أوزان ثقيلة على أعلى الصدر'
              }
            ]
          },
          {
            id: '5d-3',
            name: 'تجميع دمبل مائل سفلي (Decline Dumbbell Press)',
            targetMuscle: 'الصدر السفلي (Lower Chest)',
            targetMuscleDetail: 'ألياف الصدر السفلي لتحديد ورسم الخط السفلي للصدر وفصله بوضوح عن عضلات البطن',
            secondaryMuscles: 'الترايسبس، الكتف الأمامي السفلي',
            equipment: 'دمبلز + بنش مائل لأسفل (Decline Bench)',
            category: 'free',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/chest-decline-dumbbell.gif',
            executionSteps: ['استلقِ على البنش المائل لأسفل مع تثبيت الساقين، ادفع الدمبلين للأعلى فوق أسفل الصدر مع عصر قوي ثم النزول بتحكم.'],
            commonMistakes: ['عدم تثبيت الساقين جيداً أو الإنزال باتجاه الرقبة بدلاً من أسفل الصدر.'],
            notes: 'تمرين 3 (الصدر السفلي): تمرين مخصص للصدر السفلي لنحت الخط الفاصل (يمكنك اختيار الكيبل كبديل جهاز).',
            alternatives: [
              {
                name: 'سحب كيبل للصدر السفلي (High-to-Low Cable Fly)',
                type: 'cable',
                typeLabel: 'ماكينة / كيبل',
                category: 'machine',
                equipment: 'جهاز كيبل مزدوج من البكرات العلوية',
                animationUrl: '/assets/exercises/chest-decline-cable.gif',
                notes: 'سحب الكيبل من الأعلى للأسفل يضع حملاً متواصلاً وعصراً خارقاً على خط الصدر السفلي'
              },
              {
                name: 'متوازي الصدر بقبضة واسعة (Chest Dips)',
                type: 'bodyweight',
                typeLabel: 'وزن الجسم (حر)',
                category: 'free',
                equipment: 'جهاز المتوازي (Dip Station)',
                notes: 'انحنِ بالجذع للأمام 30 درجة لتوجيه كامل الثقل على عضلات الصدر السفلي'
              }
            ]
          },
          {
            id: '5d-4',
            name: 'تفتيح دمبل مستوٍ عزل (Flat Dumbbell Flyes)',
            targetMuscle: 'تفتيح وعزل الصدر (Chest Isolation Fly)',
            targetMuscleDetail: 'تمديد وعزل ألياف الصدر وتوسيع القفص الصدري وضخ الدم في كامل الصدر الداخلي والخارجي',
            secondaryMuscles: 'الكتف الأمامي للتثبيت',
            equipment: 'دمبلز + بنش مستوٍ',
            category: 'free',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/chest-fly-dumbbell.gif',
            executionSteps: ['افتح الذراعين بقوس واسع مع انحناء خفيف وثابت في الكوع للشعور بتمدد كامل في الصدر، ثم اضم اليدين معاً كأنك تحتضن شجرة.'],
            commonMistakes: ['ثني الكوعين بشدة مما يقلل مدى التمدد ويحوله لتمرين ضغط.'],
            notes: 'تمرين 4 (تفتيح الصدر): اختر التفتيح بالدمبل الحر أو ماكينة الفراشة بيك ديك لراحة الأكتاف.',
            alternatives: [
              {
                name: 'جهاز الفراشة للصدر (Pec Deck Machine)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                category: 'machine',
                equipment: 'ماكينة الفراشة بيك ديك Pec Deck',
                animationUrl: '/assets/exercises/chest-fly-machine.gif',
                notes: 'عزل فائق وأمان كامل لمفصل الكتف مع ثبات الحمل والمقاومة على مدار الحركة بالكامل'
              },
              {
                name: 'تفتيح بالكيبل المتقاطع (Cable Crossover Fly)',
                type: 'cable',
                typeLabel: 'كيبل',
                category: 'machine',
                equipment: 'جهاز الكيبل المزدوج',
                animationUrl: '/assets/exercises/chest-decline-cable.gif',
                notes: 'مقاومة مستمرة حتى منتصف الصدر مع إمكانية تقاطع اليدين لزيادة مدى الانقباض'
              }
            ]
          },
          {
            id: '5d-5',
            name: 'بوش داون حبل كيبل (Rope Triceps Pushdown)',
            targetMuscle: 'التراي سبس (Triceps Lateral Head)',
            targetMuscleDetail: 'الرأس الجانبي والخارجي للترايسبس لتعريض الذراع من الجانب وإبراز حدوة الحصان',
            secondaryMuscles: 'السواعد',
            equipment: 'جهاز كيبل بحبل',
            category: 'machine',
            sets: '4×12',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
            executionSteps: ['اضغط بالحبل لأسفل وافتحه للخارج عند القمة السفلية مع تثبيت الكوعين بجانب الجذع.'],
            commonMistakes: ['أرجحة الجسم وتحريك الكوعين للأمام والخلف.'],
            notes: 'تمرين 1 للتراي: فتح طرفي الحبل في الأسفل لعصر الرأس الخارجي للترايسبس.',
            alternatives: [
              {
                name: 'بوش داون بمسطرة مستقيمة (Straight Bar Pushdown)',
                type: 'cable',
                typeLabel: 'كيبل مسطرة',
                category: 'machine',
                equipment: 'جهاز كيبل مع بار مستقيم',
                animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
                notes: 'إمكانية رفع أوزان أثقل لزيادة القوة الإجمالية للترايسبس'
              },
              {
                name: 'كسر الجمجمة بالدمبلز (Dumbbell Skull Crushers)',
                type: 'dumbbell',
                typeLabel: 'دمبلز (حر)',
                category: 'free',
                equipment: 'زوج دمبلز + بنش مستوٍ',
                animationUrl: '/assets/exercises/arm-triceps-skullcrusher.gif',
                notes: 'عزل مباشر للترايسبس مع حرية كاملة لمعصمي اليدين'
              }
            ]
          },
          {
            id: '5d-6',
            name: 'كسر الجمجمة أو مد خلف الرأس (Lying Triceps Skullcrushers)',
            targetMuscle: 'التراي سبس (Triceps Long Head)',
            targetMuscleDetail: 'الرأس الطويل للترايسبس المسؤول عن 60% من حجم الذراع العضلي',
            secondaryMuscles: 'الأكتاف للتثبيت',
            equipment: 'بار متعرج EZ أو دمبلز + بنش مستوٍ',
            category: 'free',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/arm-triceps-skullcrusher.gif',
            executionSteps: ['استلقِ على البنش وثبت الكوعين مشيرين للأعلى، أنزل الوزن ببطء باتجاه الجبهة ثم افرده للأعلى بعصر التراي.'],
            commonMistakes: ['تحريك الكوعين للأمام والخلف مما ينقل الحمل لعضلات الكتف.'],
            notes: 'تمرين 2 للتراي: اختر بين البار/الدمبلز الحر أو جهاز الكيبل خلف الرأس.',
            alternatives: [
              {
                name: 'مد ترايسبس أوفر هيد بالحبل كيبل (Cable Overhead Extension)',
                type: 'cable',
                typeLabel: 'ماكينة / كيبل',
                category: 'machine',
                equipment: 'جهاز كيبل بحبل من أسفل أو أعلى',
                animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
                notes: 'شد ومقاومة مستمرة لا تنقطع حتى في أقصى نقطة تمدد للترايسبس'
              },
              {
                name: 'مد ذراع بالدمبل جالس (Seated Overhead Dumbbell Extension)',
                type: 'dumbbell',
                typeLabel: 'دمبل (حر)',
                category: 'free',
                equipment: 'دمبل ثقيل مقبوض بكلتا اليدين جالس',
                animationUrl: '/assets/exercises/arm-triceps-skullcrusher.gif',
                notes: 'تمدد عميق للألياف العضلية للرأس الطويل للترايسبس'
              }
            ]
          }
        ]
      },
      {
        dayName: 'الأحد',
        title: 'ظهر (5 أجهزة ماكينات) + باي سبس (تمرينين)',
        targetMuscles: 'عضلات الظهر أجهزة وماكينات حصراً (5) والبايسبس (2)',
        isRestDay: false,
        exercises: [
          {
            id: '5d-7',
            name: 'جهاز سحب ظهر أمامي واسع (Wide Lat Pulldown Machine)',
            targetMuscle: 'الظهر (Lats)',
            targetMuscleDetail: 'العضلة العريضة وعرض الظهر (V-Taper)',
            secondaryMuscles: 'البايسبس، الكتف الخلفي',
            equipment: 'جهاز السحب العالي بالكيبل (ماكينة)',
            sets: '4×10',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            executionSteps: ['اجلس وثبت الفخذين تحت الوسائد، اسحب البار باتجاه أعلى الصدر مع إرجاع الكتفين وسحب الكوعين للأسفل.'],
            commonMistakes: ['الميلان المفرط للخلف أو استخدام المرجحة لإنزال الوزن.'],
            notes: 'جهاز 1 للظهر: ماكينة أساسية لعرض وتوسيع عضلات الظهر بأمان كامل.',
            alternatives: [
              {
                name: 'سحب عالي بقبضة محايدة متوازية (Neutral Grip Pulldown)',
                type: 'machine',
                typeLabel: 'ماكينة قبضة محايدة',
                equipment: 'جهاز سحب عالي بمقبض متوازي',
                notes: 'مدى حركي أعمق وراحة فائقة لأوتار ومفاصل الكتف'
              },
              {
                name: 'ماكينة السحب العالي إيزو-لاتيرال (Iso-Lateral Lat Machine)',
                type: 'machine',
                typeLabel: 'ماكينة أوزان حرة',
                equipment: 'ماكينة سحب عالي بمقابض مستقلة',
                notes: 'حركة بيوميكانيكية مستقلة لكل ذراع لضمان تماثل الجانبين'
              }
            ]
          },
          {
            id: '5d-8',
            name: 'جهاز سحب كيبل أرضي ضيق - تجديف جالس (Seated Cable Row Machine)',
            targetMuscle: 'الظهر (Middle Traps & Rhomboids)',
            targetMuscleDetail: 'الظهر الأوسط وسماكة اللوحين بين عضلات الظهر',
            secondaryMuscles: 'البايسبس، السواعد',
            equipment: 'جهاز السحب الأرضي بقبضة V (ماكينة كيبل)',
            sets: '4×10',
            imageUrl: '/assets/images/back-barbell-row.jpg',
            executionSteps: ['اجلس بظهر مستقيم تماماً واسحب المقبض باتجاه السرة مع عصر لوحي الكتف معاً وثانية ثبات.'],
            commonMistakes: ['تقويس أسفل الظهر أو إرجاع الجذع للخلف.'],
            notes: 'جهاز 2 للظهر: ماكينة لبناء سماكة وكثافة منتصف الظهر.',
            alternatives: [
              {
                name: 'سحب أرضي بقبضة واسعة (Wide-Grip Cable Row)',
                type: 'machine',
                typeLabel: 'ماكينة قبضة واسعة',
                equipment: 'جهاز سحب أرضي ببار واسع مستقيم',
                notes: 'استهداف مكثف لأعلى الظهر والكتف الخلفي والرومبويدز'
              },
              {
                name: 'جهاز تجديف جالس ماكينة ميكانيكية (Seated Row Machine)',
                type: 'machine',
                typeLabel: 'ماكينة تجديف',
                equipment: 'ماكينة تجديف بمسند قدمين وثقل مباشر',
                notes: 'ثبات تام للجذع مع تركيز بنسبة 100% على عضلات الظهر'
              }
            ]
          },
          {
            id: '5d-9',
            name: 'جهاز تجديف الظهر ماكينة بمسند صدر (Chest-Supported Machine Row)',
            targetMuscle: 'الظهر (Upper & Mid Back Machine)',
            targetMuscleDetail: 'عزل عضلات الظهر وتفريغ الحمل تماماً عن القطنية',
            secondaryMuscles: 'البايسبس، الكتف الخلفي',
            equipment: 'ماكينة تجديف الظهر ذات مسند الصدر (أجهزة)',
            sets: '4×10',
            imageUrl: '/assets/images/back-barbell-row.jpg',
            executionSteps: ['ثبت الصدر على المسند واسحب المقابض للخلف مع عصر عضلات الظهر بقوة دون رفع الصدر عن المسند.'],
            commonMistakes: ['الابتعاد عن مسند الصدر أثناء الشد.'],
            notes: 'جهاز 3 للظهر: عزل تام بدون أي إجهاد على الفقرات القطنية وأسفل الظهر.',
            alternatives: [
              {
                name: 'ماكينة تي بار بمسند صدر (Chest-Supported T-Bar Machine)',
                type: 'machine',
                typeLabel: 'ماكينة T-Bar',
                equipment: 'ماكينة تي بار مائلة بمسند',
                notes: 'أفضل تمرين لبناء سماكة الظهر الجبارة بدون أي ضغط على الظهر السفلي'
              },
              {
                name: 'ماكينة هامر سترينث تجديف منخفض (Hammer Strength Low Row)',
                type: 'machine',
                typeLabel: 'ماكينة Hammer',
                equipment: 'ماكينة هامر سترينث بمقابض مستقلة',
                notes: 'مسار قوسي مريح يتبع الحركة الطبيعية للوح الكتف'
              }
            ]
          },
          {
            id: '5d-10',
            name: 'جهاز سحب عالي قبضة مقلوبة / ضيقة (Reverse/Close Grip Lat Pulldown)',
            targetMuscle: 'الظهر (Lower Lats Machine)',
            targetMuscleDetail: 'ألياف أسفل اللاتس وبناء عمق الظهر السفلي',
            secondaryMuscles: 'البايسبس',
            equipment: 'جهاز السحب العالي بقبضة مقلوبة أو ضيقة V',
            sets: '3×12',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            executionSteps: ['اسحب المقبض لأسفل الصدر مع إبقاء الكوعين قريبين من الجذع وعصر أسفل الظهر العريض.'],
            commonMistakes: ['أرجحة الجذع للأمام والخلف أو الإمساك بقبضة غير مريحة.'],
            notes: 'جهاز 4 للظهر: تركيز استثنائي على أسفل اللاتس.',
            alternatives: [
              {
                name: 'سحب عالي بقبضة V مزدوجة (Close-Grip V-Bar Pulldown)',
                type: 'machine',
                typeLabel: 'ماكينة قبضة V',
                equipment: 'جهاز السحب العالي مع مقبض مثلث V',
                notes: 'تمدد مذهل لألياف اللاتس السفلية مع تحفيز عالي للبايسبس'
              },
              {
                name: 'سحب لات بول داون بذراع واحدة بالكيبل (Single Arm Lat Pulldown)',
                type: 'machine',
                typeLabel: 'ماكينة فردية',
                equipment: 'بكرة كيبل علوية مع مقبض فردي',
                notes: 'تركيز استثنائي وعزل عضلي كامل وتمدد عميق لكل جانب'
              }
            ]
          },
          {
            id: '5d-11',
            name: 'جهاز سحب كيبل مستقيم للظهر واقف - بول أوفر كيبل (Straight-Arm Cable Pulldown)',
            targetMuscle: 'الظهر (Lats Isolation Machine)',
            targetMuscleDetail: 'عزل تام لعضلة المجنص (اللاتس) بدون إشراك البايسبس',
            secondaryMuscles: 'الكتف الخلفي، عضلات البطن للتثبيت',
            equipment: 'جهاز الكيبل العلوي مع بار مستقيم أو حبل',
            sets: '3×15',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            executionSteps: ['قف بانحناء خفيف 30 درجة مع ذراعين شبه مفرودتين، واسحب البار بقوس للأسفل حتى يلامس الفخذين باللاتس فقط.'],
            commonMistakes: ['ثني الكوعين وتحويله لتمرين بوش داون ترايسبس.'],
            notes: 'جهاز 5 للظهر: عزل نقي بنسبة 100% لعضلات الظهر العريضة.',
            alternatives: [
              {
                name: 'بول أوفر كيبل بحبل للظهر (Rope Straight-Arm Pulldown)',
                type: 'cable',
                typeLabel: 'كيبل حبل',
                equipment: 'كيبل علوي مع حبل طويل',
                notes: 'مدى حركي أبعد للوراء وانقباض أعمق خلف الوركين'
              },
              {
                name: 'ماكينة بول أوفر جالس (Machine Pullover)',
                type: 'machine',
                typeLabel: 'ماكينة بول أوفر',
                equipment: 'ماكينة البول أوفر المتخصصة',
                notes: 'التمرين الذهبي الأسطوري لعزل عضلات المجنص بكامل مداها'
              }
            ]
          },
          {
            id: '5d-12',
            name: 'كيرل بايسبس بالبار EZ أو الكيبل (EZ-Bar Bicep Curl)',
            targetMuscle: 'الباي سبس (Biceps)',
            targetMuscleDetail: 'رأسي البايسبس مع راحة المعصمين',
            secondaryMuscles: 'السواعد',
            equipment: 'بار متعرج EZ أو جهاز الكيبل',
            sets: '4×10',
            imageUrl: '/assets/images/biceps-curl.jpg',
            executionSteps: ['ارفع البار مع ثبات الكوعين بجانب الجسم وانقباض قوي في القمة.'],
            commonMistakes: ['أرجحة الجذع أو رفع الكوعين للأعلى.'],
            notes: 'تمرين 1 للباي: حماية المرفقين وبناء سمك وكتلة الذراع.',
            alternatives: [
              {
                name: 'كيرل دمبل جالس بتدوير المعصم (Seated Incline Dumbbell Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبلز',
                equipment: 'بنش مائل 45° + دمبلز',
                notes: 'أقصى تمدد للرأس الطويل مع تدوير المعصم للخارج في القمة'
              },
              {
                name: 'كيرل بايسبس بالكيبل السفلي (Cable Bicep Curl)',
                type: 'cable',
                typeLabel: 'كيبل',
                equipment: 'بكرة كيبل سفلية ببار مستقيم أو EZ',
                notes: 'توتر ومقاومة متواصلة لا تنخفض طوال مسار الحركة'
              }
            ]
          },
          {
            id: '5d-13',
            name: 'كيرل هامر (المطرقة) دمبل (Dumbbell Hammer Curl)',
            targetMuscle: 'الباي سبس (Brachialis & Forearms)',
            targetMuscleDetail: 'عضلة البراكيلس وسماكة الذراع الجانبية وقوة القبضة',
            secondaryMuscles: 'السواعد والقبضة',
            equipment: 'دمبلز',
            sets: '3×12',
            imageUrl: '/assets/images/biceps-curl.jpg',
            executionSteps: ['أمسك الدمبلين بوضعية المطرقة (الكفان متقابلان) وارفع للأعلى بتحكم كامل.'],
            commonMistakes: ['تحريك الكوعين للأمام أو التسرع في النزول.'],
            notes: 'تمرين 2 للباي: تقوية البراكيلس وعرض البايسبس وقوة القبضة.',
            alternatives: [
              {
                name: 'كيرل هامر بحبل الكيبل (Cable Rope Hammer Curl)',
                type: 'cable',
                typeLabel: 'كيبل حبل',
                equipment: 'بكرة كيبل سفلية بحبل سميك',
                notes: 'توتر دائم في قاع وأعلى الحركة لزيادة كثافة الذراع الخارجية'
              },
              {
                name: 'كيرل هامر جالس على بنش سكوت (Preacher Hammer Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبل سكوت',
                equipment: 'بنش سكوت + دمبلز',
                notes: 'عزل تام وتفريغ كامل لأي حركة تأرجح من الجسم'
              }
            ]
          }
        ]
      },
      {
        dayName: 'الاثنين',
        title: 'يوم راحة واستشفاء',
        targetMuscles: 'راحة واستشفاء وتجديد الطاقة',
        isRestDay: true,
        restDescription: 'يوم راحة مخصص للاستشفاء وإعادة بناء الألياف العضلية بعد يومي الصدر والظهر المكثفين.',
        exercises: []
      },
      {
        dayName: 'الثلاثاء',
        title: 'أذرع متكاملة: تراي سبس (3) + باي سبس (3) + سواعد (2)',
        targetMuscles: 'عضلات الذراعين بالكامل (3 تراي + 3 باي + 2 سواعد = 8 تمارين)',
        isRestDay: false,
        exercises: [
          {
            id: '5d-14',
            name: 'بوش داون حبل كيبل للترايسبس (Cable Rope Triceps Pushdown)',
            targetMuscle: 'التراي سبس (Triceps Lateral Head)',
            targetMuscleDetail: 'الرأس الجانبي للترايسبس لعرض الذراع من الجانب',
            secondaryMuscles: 'السواعد',
            equipment: 'جهاز الكيبل مع حبل تراي',
            sets: '4×10',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            executionSteps: ['قف بثبات مع تثبيت الكوعين بجانب الأضلاع، اضغط بالحبل للأسفل وافتحه في القاع مع عصر الترايسبس.'],
            commonMistakes: ['تحريك الكوعين للأمام والخلف أو استخدام وزن مفرط.'],
            notes: 'تمرين 1 ترايسبس: عصر وضخ دم في الرأس الخارجي.',
            alternatives: [
              {
                name: 'بوش داون ببار مستقيم أو مسطرة (Straight Bar Pushdown)',
                type: 'cable',
                typeLabel: 'كيبل مسطرة',
                equipment: 'جهاز كيبل + بار مسطرة',
                notes: 'إمكانية رفع أوزان أكبر لزيادة القوة الإجمالية للتراي'
              },
              {
                name: 'بوش داون مقبض V (V-Bar Pushdown)',
                type: 'cable',
                typeLabel: 'كيبل بار V',
                equipment: 'جهاز كيبل + مقبض V',
                notes: 'وضعية مريحة لمعصم اليد مع تركيز قوي'
              }
            ]
          },
          {
            id: '5d-15',
            name: 'مد فرنسي فوق الرأس بالدمبل أو الكيبل (Overhead French Press)',
            targetMuscle: 'التراي سبس (Triceps Long Head)',
            targetMuscleDetail: 'الرأس الطويل للترايسبس لبناء كثافة الذراع من الخلف',
            secondaryMuscles: 'الأكتاف للتثبيت',
            equipment: 'دمبل ثقيل مقبوض بكلتا اليدين أو كيبل بحبل',
            sets: '4×10',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            executionSteps: ['امسك الدمبل فوق الرأس بكلتا اليدين، أنزل ببطء خلف الرأس لتمدد كامل ثم ادفع للأعلى بعصر التراي.'],
            commonMistakes: ['فتح المرفقين للخارج كثيراً أو تقويس الظهر.'],
            notes: 'تمرين 2 ترايسبس: تفجير وتمديد الرأس الطويل.',
            alternatives: [
              {
                name: 'مد فرنسي بالبار EZ جالس (EZ-Bar Overhead Extension)',
                type: 'barbell',
                typeLabel: 'بار EZ',
                equipment: 'بار EZ متعرج + بنش',
                notes: 'تحكم ممتاز وثبات لمفصل الكوعين'
              },
              {
                name: 'مد ترايسبس أوفر هيد بالكيبل بحبل (Cable Overhead Triceps)',
                type: 'cable',
                typeLabel: 'كيبل حبل',
                equipment: 'جهاز كيبل علوي أو سفلي مع حبل',
                notes: 'مقاومة وتوتر مستمر أثناء النزول والصعود'
              }
            ]
          },
          {
            id: '5d-16',
            name: 'سكل كراشر بنش مستوي بار EZ أو ديبس متوازي (Skull Crusher / Dips)',
            targetMuscle: 'التراي سبس (Triceps Medial & Long Head)',
            targetMuscleDetail: 'الرأس المتوسط والطويل للترايسبس وقوة الدفع',
            secondaryMuscles: 'الصدر والكتف الأمامي',
            equipment: 'بار متعرج EZ + بنش مستوٍ أو جهاز المتوازي',
            sets: '3×12',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            executionSteps: ['استلقِ على البنش مع مسك بار EZ، أنزل البار ببطء باتجاه الجبهة أو خلف الرأس ثم ادفع بقوة التراي فقط.'],
            commonMistakes: ['تحريك الذراعين من الكتف بدلاً من مفصل المرفق.'],
            notes: 'تمرين 3 ترايسبس: بناء كتلة التراي الكلية.',
            alternatives: [
              {
                name: 'ديبس متوازي للترايسبس (Triceps Dips)',
                type: 'bodyweight',
                typeLabel: 'متوازي وزن الجسم',
                equipment: 'جهاز المتوازي للذراعين',
                notes: 'تمرين وزن جسم كلاسيكي جبار لصلابة وقوة الترايسبس'
              },
              {
                name: 'بنش برس بقبضة ضيقة بالبار (Close-Grip Bench Press)',
                type: 'barbell',
                typeLabel: 'بار مستوي',
                equipment: 'بار أولمبي + بنش مستوٍ',
                notes: 'رفع أوزان هائلة لبناء أضخم كتلة ترايسبس ممكنة'
              }
            ]
          },
          {
            id: '5d-17',
            name: 'كيرل بايسبس بالبار المستقيم أو EZ (Barbell Bicep Curl)',
            targetMuscle: 'الباي سبس (Biceps)',
            targetMuscleDetail: 'الكتلة الشاملة للبايسبس والرأسين الداخلي والخارجي',
            secondaryMuscles: 'السواعد',
            equipment: 'بار أولمبي مستقيم أو بار EZ',
            sets: '4×10',
            imageUrl: '/assets/images/biceps-curl.jpg',
            executionSteps: ['قف باستقامة مع ثبات الكوعين على جانبي الخصر، ارفع البار بحركة قوسية مع عصر البايسبس في القمة ونزول بطيء.'],
            commonMistakes: ['أرجحة الجذع للخلف لتسهيل رفع الوزن.'],
            notes: 'تمرين 1 بايسبس: أساس بناء قوة وحجم البايسبس.',
            alternatives: [
              {
                name: 'كيرل دمبلز تناوبي واقف (Standing Alternating Dumbbell Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبلز',
                equipment: 'زوج دمبلز',
                notes: 'تدوير المعصم للخارج في القمة وتطوير كل ذراع باستقلالية'
              },
              {
                name: 'كيرل بايسبس بالكيبل ببار مستقيم (Cable Bicep Curl)',
                type: 'cable',
                typeLabel: 'كيبل',
                equipment: 'جهاز كيبل من البكرة السفلية',
                notes: 'شد دائم ومقاومة مستمرة تمنع الراحة في قمة أو قاع الحركة'
              }
            ]
          },
          {
            id: '5d-18',
            name: 'كيرل دمبل جالس على بنش مائل (Incline Dumbbell Curl)',
            targetMuscle: 'الباي سبس (Long Head Peak)',
            targetMuscleDetail: 'الرأس الطويل للبايسبس المسؤول عن قمة البايسبس (Peak)',
            secondaryMuscles: 'السواعد',
            equipment: 'بنش مائل بزاوية 45-60 درجة + دمبلز',
            sets: '3×12',
            imageUrl: '/assets/images/biceps-curl.jpg',
            executionSteps: ['اجلس على البنش المائل مع تدلي الذراعين للخلف لتمدد كامل، ارفع الدمبلين للأعلى مع عصر البايسبس.'],
            commonMistakes: ['رفع الكتفين للأعلى أو تحريك الكوعين للأمام أثناء الصعود.'],
            notes: 'تمرين 2 بايسبس: تمديد عميق لعضلة البايسبس وبناء القمة الجبلية.',
            alternatives: [
              {
                name: 'كيرل على بنش سكوت (Preacher Curl)',
                type: 'machine',
                typeLabel: 'ماكينة / سكوت',
                equipment: 'بنش سكوت + بار EZ أو ماكينة سكوت',
                notes: 'عزل صارم ومستحيل الأرجحة فيه، يركز على الرأس القصير'
              },
              {
                name: 'كيرل دمبل على بنش عنكبوتي (Spider Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبل سبايدر',
                equipment: 'بنش مائل مع الاستناد بالصدر + دمبلز',
                notes: 'أقصى انقباض في قمة الحركة بدون أي مساعدة من الكتف'
              }
            ]
          },
          {
            id: '5d-19',
            name: 'كيرل هامر (المطرقة) دمبل أو كيبل (Dumbbell/Cable Hammer Curl)',
            targetMuscle: 'الباي سبس (Brachialis & Forearms)',
            targetMuscleDetail: 'عضلة البراكيلس وسماكة الذراع الجانبية',
            secondaryMuscles: 'السواعد وعضلة Brachioradialis',
            equipment: 'دمبلز بقبضة محايدة أو حبل الكيبل',
            sets: '3×12',
            imageUrl: '/assets/images/biceps-curl.jpg',
            executionSteps: ['أمسك الدمبلين بحيث تكون راحة اليدين متقابلتين، ارفع الدمبل للأعلى بحركة محكومة واهبط ببطء.'],
            commonMistakes: ['مرجحة الجسم أو فتح الكوعين للخارج.'],
            notes: 'تمرين 3 بايسبس: دفع البايسبس للخارج لزيادة محيط وعرض الذراع.',
            alternatives: [
              {
                name: 'كيرل هامر بحبل الكيبل (Cable Rope Hammer Curl)',
                type: 'cable',
                typeLabel: 'كيبل حبل',
                equipment: 'بكرة كيبل سفلية مع حبل',
                notes: 'توتر دائم في قاع الحركة وأعلاها'
              },
              {
                name: 'كيرل تركيز دمبل جالس (Concentration Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبل تركيز',
                equipment: 'دمبل + مقعد بنش',
                notes: 'عزل فائق لذروة البايسبس مع تثبيت الكوع داخل الفخذ'
              }
            ]
          },
          {
            id: '5d-20',
            name: 'كيرل معصم سواعد جالس بالبار أو الدمبل (Seated Wrist Curls)',
            targetMuscle: 'السواعد (Forearm Flexors)',
            targetMuscleDetail: 'عضلات الساعد القابضة والقبضة الحديدية',
            secondaryMuscles: 'أوتار المعصم والأصابع',
            equipment: 'بار مستقيم أو زوج دمبلز + بنش',
            sets: '4×15',
            imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['ضع الساعدين على بنش مستوٍ بحيث تتدلى المعاصم للخارج، أنزل البار حتى أطراف الأصابع ثم لفه للأعلى بأقصى انقباض.'],
            commonMistakes: ['استخدام أوزان ثقيلة جداً تضغط على المعصم بشكل خاطئ.'],
            notes: 'تمرين 1 سواعد: بناء قبضة فولاذية وعضلات سواعد سميكة.',
            alternatives: [
              {
                name: 'كيرل معصم خلف الظهر بالبار واقف (Behind-the-Back Wrist Curl)',
                type: 'barbell',
                typeLabel: 'بار خلف الظهر',
                equipment: 'بار أولمبي خلف الظهر واقف',
                notes: 'وضعية مريحة جداً تسمح بتحميل أوزان أثقل وأمان عالي للمفاصل'
              },
              {
                name: 'كيرل معصم بالكيبل (Cable Wrist Curl)',
                type: 'cable',
                typeLabel: 'كيبل',
                equipment: 'بكرة كيبل سفلية ببار مستقيم',
                notes: 'توتر مستمر على السواعد طوال مدى الحركة'
              }
            ]
          },
          {
            id: '5d-21',
            name: 'كيرل عكسي بالبار EZ للسواعد (Reverse EZ-Bar Forearm Curl)',
            targetMuscle: 'السواعد (Brachioradialis & Extensors)',
            targetMuscleDetail: 'عضلة البراكيو-رادياليس وأعلى الساعد الخارجي',
            secondaryMuscles: 'البايسبس وعضلات القبضة',
            equipment: 'بار متعرج EZ بقبضة علوية مقلوبة',
            sets: '3×15',
            imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['أمسك بار EZ من الأعلى (راحة اليد لأسفل)، ارفع البار مع ثبات الكوعين لتركيز الجهد كاملاً على أعلى الساعدين.'],
            commonMistakes: ['رفع الكوعين للأمام أو أرجحة الظهر.'],
            notes: 'تمرين 2 سواعد: ملء أعلى الساعد وإبراز تفاصيل الذراع عند لبس التيشيرت.',
            alternatives: [
              {
                name: 'كيرل عكسي بالكيبل (Cable Reverse Curl)',
                type: 'cable',
                typeLabel: 'كيبل عكسي',
                equipment: 'بكرة كيبل سفلية ببار مسطرة',
                notes: 'شد مستمر لا ينقطع يعطي حرقاناً عضلياً استثنائياً'
              },
              {
                name: 'مشية المزارع بالدمبلز الثقيل (Heavy Dumbbell Farmer\'s Walk)',
                type: 'dumbbell',
                typeLabel: 'دمبلز حمل ثقيل',
                equipment: 'زوج دمبلز ثقيل',
                notes: 'المشي بخطوات ثابتة لمدة 45 ثانية لتفجير قوة القبضة والترابيس والسواعد'
              }
            ]
          }
        ]
      },
      {
        dayName: 'الأربعاء',
        title: 'أكتاف وترابيس كاملة (6 تمارين)',
        targetMuscles: 'عضلات الكتف بكافة رؤوسها (أمامي، جانبي، خلفي) والترابيس (6 تمارين)',
        isRestDay: false,
        exercises: [
          {
            id: '5d-22',
            name: 'ضغط أكتاف دمبل جالس (Seated Dumbbell Shoulder Press)',
            targetMuscle: 'الأكتاف (Anterior & Lateral Deltoids)',
            targetMuscleDetail: 'الكتف الأمامي والمتوسط لبناء حجم الأكتاف وقوتها',
            secondaryMuscles: 'الترايسبس، الترابيس العليا',
            equipment: 'بنش بمسند ظهر 90 درجة + زوج دمبلز',
            sets: '4×10',
            imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['ادفع الدمبلين عمودياً للأعلى فوق الرأس حتى يتقاربا بدون تلامس، ثم أنزل ببطء حتى مستوى الأذنين.'],
            commonMistakes: ['تقويس أسفل الظهر أو إنزال الدمبلز لمدى منخفض جداً يجهد الأوتار.'],
            notes: 'تمرين 1 أكتاف: التمرين الأساسي لبناء ضخامة الكتف وقوته.',
            alternatives: [
              {
                name: 'ضغط أكتاف بالبار الأولمبي واقف (Overhead Barbell Press)',
                type: 'barbell',
                typeLabel: 'بار واقف',
                equipment: 'بار أولمبي + راك',
                notes: 'تمرين القوة الكلاسيكي (Military Press) لبناء القوة العامة وثبات الجذع'
              },
              {
                name: 'ماكينة ضغط الأكتاف (Shoulder Press Machine)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                equipment: 'ماكينة ضغط الأكتاف بالوزن',
                notes: 'أمان كامل ومسار ثابت يعزل الأكتاف تماماً بدون قلق التوازن'
              }
            ]
          },
          {
            id: '5d-23',
            name: 'رفرفة جانبي دمبل واقف (Standing Lateral Raise)',
            targetMuscle: 'الأكتاف (Lateral Deltoid)',
            targetMuscleDetail: 'عضلة الكتف الجانبية المسؤولة عن عرض الأكتاف (شكل الـ V)',
            secondaryMuscles: 'الترابيس',
            equipment: 'زوج دمبلز بوزن معتدل',
            sets: '4×15',
            imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['ارفع الدمبلين للجانبين بارتفاع موازٍ للأكتاف مع ثبات المرفقين ونزول بطيء لمدة ثانيتين.'],
            commonMistakes: ['أرجحة الجسم واستخدام وزن مفرط ينقل الحمل للترابيس.'],
            notes: 'تمرين 2 أكتاف: سر الحصول على أكتاف عريضة ممتلئة.',
            alternatives: [
              {
                name: 'رفرفة جانبي بالكيبل فردي (Single Arm Cable Lateral Raise)',
                type: 'cable',
                typeLabel: 'كيبل فردي',
                equipment: 'بكرة كيبل سفلية بمقبض فردي',
                notes: 'شد مستمر لا ينخفض حتى في أدنى نقطة يمنح الكتف الجانبي نمواً قياسياً'
              },
              {
                name: 'ماكينة رفرفة الأكتاف الجانبية (Lateral Raise Machine)',
                type: 'machine',
                typeLabel: 'ماكينة رفرفة',
                equipment: 'ماكينة عزل الكتف الجانبي',
                notes: 'تفريغ المعصم تماماً والتركيز على مفصل الكتف مباشرة'
              }
            ]
          },
          {
            id: '5d-24',
            name: 'فيس بول كيبل بحبل (Cable Face Pull)',
            targetMuscle: 'الأكتاف (Rear Deltoid & Rotator Cuff)',
            targetMuscleDetail: 'الكتف الخلفي والروتاتور كف وأعلى الظهر والوقاية من الإصابات',
            secondaryMuscles: 'الترابيس الوسطى والرومبويد',
            equipment: 'جهاز كيبل بحبل عند مستوى العينين',
            sets: '4×15',
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['اسحب الحبل باتجاه جانبي الوجه مع تدوير المرفقين للخارج وللأعلى وعصر الكتف الخلفي لثانية كاملة.'],
            commonMistakes: ['سحب الحبل للصدر بدلاً من الوجه أو استخدام وزن ثقيل يمنع تدوير الكتف.'],
            notes: 'تمرين 3 أكتاف: تمرين ذهبي لصحة وتناسق مفصل الكتف وفتح الصدر.',
            alternatives: [
              {
                name: 'سحب حبل عالي للكتف الخلفي (High Rope Pull to Forehead)',
                type: 'cable',
                typeLabel: 'كيبل جبهة',
                equipment: 'كيبل عالي مع حبل طويل',
                notes: 'تركيز فائق على ألياف الكتف الخلفي العليا'
              },
              {
                name: 'شد الحبل المطاطي بالأيدي (Band Pull-Apart)',
                type: 'bodyweight',
                typeLabel: 'شريط مقاومة',
                equipment: 'شريط مطاطي مقاوم',
                notes: 'ممتاز للإحماء وتنشيط عضلات التثبيت الخلفية'
              }
            ]
          },
          {
            id: '5d-25',
            name: 'رفرفة خلفي دمبل منحني أو فراشة عكسية (Bent-Over Rear Delt Fly / Reverse Pec Deck)',
            targetMuscle: 'الأكتاف (Rear Delts)',
            targetMuscleDetail: 'الرأس الخلفي للكتف لرسم كرة الكتف ثلاثية الأبعاد 3D',
            secondaryMuscles: 'الترابيس والرومبويد',
            equipment: 'زوج دمبلز أو ماكينة الفراشة العكسية',
            sets: '4×12',
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['انحنِ للأمام 60 درجة بظهر مستوٍ، ارفع الدمبلين للجانبين مع انحناء خفيف في الكوع وعصر الكتف الخلفي.'],
            commonMistakes: ['رفع الجذع للأعلى أو ضم لوحي الكتف أكثر من اللازم.'],
            notes: 'تمرين 4 أكتاف: عزل مباشر للرأس الخلفي للكتف.',
            alternatives: [
              {
                name: 'ماكينة الفراشة العكسية (Reverse Pec Deck Fly)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                equipment: 'ماكينة الفراشة مع الجلوس مقلوباً',
                notes: 'أسهل وأدق تمرين لعزل الكتف الخلفي دون تحميل أسفل الظهر'
              },
              {
                name: 'رفرفة خلفي بالكيبل المتقاطع (Cable Rear Delt Crossover)',
                type: 'cable',
                typeLabel: 'كيبل متقاطع',
                equipment: 'جهاز كيبل متقاطع من البكرات العلوية',
                notes: 'توتر دائم لا ينخفض وعزل كامل للرأس الخلفي'
              }
            ]
          },
          {
            id: '5d-26',
            name: 'رفرفة كتف أمامي دمبل أو بار (Front Dumbbell / Barbell Raise)',
            targetMuscle: 'الأكتاف (Anterior Deltoid)',
            targetMuscleDetail: 'الرأس الأمامي للكتف وفصله عن عضلات الصدر العلوية',
            secondaryMuscles: 'أعلى الصدر والترابيس',
            equipment: 'زوج دمبلز أو بار مستقيم أولمبي أو قرص وزن',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['قف باستقامة، ارفع الدمبل للأمام حتى مستوى العينين بتحكم كامل ثم اهبط ببطء شديد.'],
            commonMistakes: ['أرجحة الجذع للخلف لتوليد عزم.'],
            notes: 'تمرين 5 أكتاف: عزل ونحت الرأس الأمامي للكتف.',
            alternatives: [
              {
                name: 'رفرفة أمامي بقرص الوزن (Weight Plate Front Raise)',
                type: 'barbell',
                typeLabel: 'قرص وزن',
                equipment: 'قرص وزن أولمبي 10-20 كجم',
                notes: 'مسك القرص من الطرفين وتدويره قليلاً في القمة لتركيز مضاعف'
              },
              {
                name: 'رفرفة كتف أمامي بالكيبل بحبل (Cable Front Raise)',
                type: 'cable',
                typeLabel: 'كيبل حبل',
                equipment: 'بكرة كيبل سفلية مع حبل بين القدمين',
                notes: 'مقاومة ساحبة للأسفل تزيد من صعوبة التمرين وتفعيله'
              }
            ]
          },
          {
            id: '5d-27',
            name: 'شراغز ترابيس دمبل أو بار أولمبي (Dumbbell / Barbell Shrugs)',
            targetMuscle: 'الترابيس (Upper Trapezius)',
            targetMuscleDetail: 'عضلة الترابيزيوس العليا لملء الرقبة وأعلى الظهر',
            secondaryMuscles: 'القبضة والساعدين',
            equipment: 'زوج دمبلز ثقيل أو بار أولمبي أو جهاز سميث',
            sets: '4×12',
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['ارفع الكتفين للأعلى عمودياً باتجاه الأذنين مع ثبات ثانية كاملة في القمة، ثم أنزل ببطء لتمدد كامل.'],
            commonMistakes: ['تدوير الأكتاف دائرياً (خطأ شائع يضر بالمفصل، ارفع عمودياً للأعلى والأسفل فقط).'],
            notes: 'تمرين 6 أكتاف: بناء ترابيس ضخمة وقوية كالصخر.',
            alternatives: [
              {
                name: 'شراغز على جهاز سميث من الأمام أو الخلف (Smith Machine Shrugs)',
                type: 'machine',
                typeLabel: 'ماكينة سميث',
                equipment: 'جهاز سميث',
                notes: 'مسار ثابت يتيح حمل أوزان ضخمة جداً بأمان تام'
              },
              {
                name: 'شراغز بالكيبل المزدوج (Cable Shrugs)',
                type: 'cable',
                typeLabel: 'كيبل مزدوج',
                equipment: 'بكرتا كيبل سفليتان بمقابض فردية',
                notes: 'زاوية سحب مائلة للخارج تتبع خطوط ألياف الترابيس التشريحية'
              }
            ]
          }
        ]
      },
      {
        dayName: 'الخميس',
        title: 'أرجل كاملة (6 تمارين) + سواعد (تمرينين)',
        targetMuscles: 'عضلات الأرجل كاملة (أمامي، خلفي، بطات) + السواعد (8 تمارين)',
        isRestDay: false,
        exercises: [
          {
            id: '5d-28',
            name: 'سكوات بالبار الحر أو جهاز سميث (Barbell / Smith Squat)',
            targetMuscle: 'الأرجل (Quadriceps & Glutes)',
            targetMuscleDetail: 'الفخذ الأمامي والمؤخرة وعضلات القوة الجذعية',
            secondaryMuscles: 'أوتار الركبة، أسفل الظهر',
            equipment: 'بار أولمبي + راك سكوات أو جهاز سميث',
            sets: '4×10',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['انزل بمؤخرتك للأسفل والخلف حتى يوازي الفخذ الأرض مع دفع الأرض بكعبي القدمين والصعود بقوة.'],
            commonMistakes: ['رفع الكعبين عن الأرض أو انحناء وتقويس الظهر.'],
            notes: 'تمرين 1 رجلين: ملك تمارين كمال الأجسام لبناء القوة والهرمونات العضلية.',
            alternatives: [
              {
                name: 'هاك سكوات ماكينة (Hack Squat Machine)',
                type: 'machine',
                typeLabel: 'ماكينة هاك',
                equipment: 'ماكينة Hack Squat المائلة',
                notes: 'عزل فتاك للفخذ الأمامي مع مسند ظهر يحمي العمود الفقري تماماً'
              },
              {
                name: 'جوبلت سكوات بالدمبل الثقيل (Dumbbell Goblet Squat)',
                type: 'dumbbell',
                typeLabel: 'دمبل جوبلت',
                equipment: 'دمبل ثقيل مقبوض عند الصدر',
                notes: 'ممتاز لمرونة الحوض والعمق السليم دون ضغط على الظهر'
              }
            ]
          },
          {
            id: '5d-29',
            name: 'دفع رجلين Leg Press (ماكينة 45 درجة)',
            targetMuscle: 'الأرجل (Leg Press)',
            targetMuscleDetail: 'رؤوس الفخذ الأمامية الأربعة مع إمكانية تحميل أوزان ثقيلة بأمان',
            secondaryMuscles: 'المؤخرة وأوتار الركبة',
            equipment: 'ماكينة دفع الأرجل Leg Press',
            sets: '4×12',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['ضع القدمين بمنتصف المنصة باتساع الكتفين، أنزل المنصة لزاوية 90 درجة ثم ادفع دون قفل الركبة في القمة.'],
            commonMistakes: ['قفل الركبتين بعنف في القمة (خطير جداً للمفصل) أو رفع أسفل الظهر عن المقعد.'],
            notes: 'تمرين 2 رجلين: تضخيم رؤوس الفخذ بأمان وقوة هائلة.',
            alternatives: [
              {
                name: 'دفع رجلين أفقي ماكينة (Horizontal Seated Leg Press)',
                type: 'machine',
                typeLabel: 'ماكينة أفقية',
                equipment: 'ماكينة دفع الأرجل ذات المسار الأفقي',
                notes: 'مسار مريح جداً لأسفل الظهر وسهل الضبط'
              },
              {
                name: 'دفع رجلين فردي بقدم واحدة (Single Leg Press)',
                type: 'machine',
                typeLabel: 'ماكينة فردية',
                equipment: 'ماكينة Leg Press بقدم واحدة',
                notes: 'معالجة فروق القوة والحجم بين الساق اليمنى واليسرى'
              }
            ]
          },
          {
            id: '5d-30',
            name: 'مد رجل أمامي جهاز (Leg Extension Machine)',
            targetMuscle: 'الأرجل (Quadriceps Isolation)',
            targetMuscleDetail: 'عزل تام للفخذ الأمامي وتفصيل وتقسيم العضلات فوق الركبة',
            secondaryMuscles: 'أوتار الركبة للتثبيت',
            equipment: 'جهاز Leg Extension',
            sets: '4×15',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['ارفع الساقين للأعلى حتى استقامتهما مع عصر الفخذ الأمامي لثانية كاملة ثم انزل ببطء شديد.'],
            commonMistakes: ['استخدام وزن ثقيل يؤدي لأرجحة الساقين بدون ثبات في القمة.'],
            notes: 'تمرين 3 رجلين: رسم خطوط عضلات الفخذ الأمامية (Tear-drop muscle).',
            alternatives: [
              {
                name: 'سيسي سكوات بوزن الجسم (Sissy Squat)',
                type: 'bodyweight',
                typeLabel: 'وزن الجسم',
                equipment: 'منصة سيسي سكوات أو بنش',
                notes: 'تمدد وانقباض خارق للعادة لعضلة الفخذ الأمامية'
              },
              {
                name: 'مد رجل أمامي فردي بالساق الواحدة (Single Leg Extension)',
                type: 'machine',
                typeLabel: 'ماكينة فردية',
                equipment: 'جهاز Leg Extension بساق واحدة',
                notes: 'تركيز نقي على كل فخذ لمنع الجانب الأقوى من مساعدة الضعيف'
              }
            ]
          },
          {
            id: '5d-31',
            name: 'ثني رجل خلفي جالس أو نائم (Lying/Seated Hamstring Leg Curl)',
            targetMuscle: 'الأرجل (Hamstrings)',
            targetMuscleDetail: 'عضلات الفخذ الخلفية وأوتار الركبة لمنع الإصابات',
            secondaryMuscles: 'السمانة والمؤخرة',
            equipment: 'جهاز ثني الأرجل Hamstring Curl',
            sets: '4×12',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['اثنِ الساقين باتجاه المؤخرة مع ثبات الحوض على المقعد، واعصر الفخذ الخلفي ثانية ثم اهبط ببطء.'],
            commonMistakes: ['رفع الوركين عن المقعد أثناء الثني أو النزول السريع.'],
            notes: 'تمرين 4 رجلين: التوازن بين الفخذ الأمامي والخلفي لحماية الركبة.',
            alternatives: [
              {
                name: 'ديدلفت روماني بالدمبلز أو البار (Romanian Deadlift - RDL)',
                type: 'dumbbell',
                typeLabel: 'دمبلز / بار',
                equipment: 'زوج دمبلز أو بار أولمبي',
                notes: 'أعظم تمرين لإطالة وتكثيف أوتار الفخذ الخلفية والمؤخرة'
              },
              {
                name: 'ثني رجل خلفي واقف فردي (Standing Single Leg Curl)',
                type: 'machine',
                typeLabel: 'ماكينة فردية',
                equipment: 'ماكينة ثني الأرجل بالوقوف',
                notes: 'عزل فائق لكل ساق بشكل مستقل تماماً'
              }
            ]
          },
          {
            id: '5d-32',
            name: 'طعنات دمبل للمشي أو بلغاريان سبليت سكوات (Walking Lunges / Bulgarian Split Squat)',
            targetMuscle: 'الأرجل (Glutes, Quads & Hamstrings)',
            targetMuscleDetail: 'المؤخرة والفخذ الشامل واستقرار الحوض والتوازن الحركي',
            secondaryMuscles: 'الجذع والسمانة',
            equipment: 'زوج دمبلز + مساحة للمشي أو بنش',
            sets: '3×12 لكل ساق',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['تقدم للأمام بخطوة واسعة وانزل بالركبة الخلفية حتى تقترب من الأرض ثم ادفع بالكعب للأمام.'],
            commonMistakes: ['تجاوز الركبة الأمامية لأصابع القدم بشكل حاد أو عدم توازن الجسم.'],
            notes: 'تمرين 5 رجلين: نحت وتفصيل الفخذ والمؤخرة مع حرق سعرات هائل.',
            alternatives: [
              {
                name: 'سكوات بلغاري بالدمبلز (Bulgarian Split Squat)',
                type: 'dumbbell',
                typeLabel: 'دمبل بنش',
                equipment: 'بنش + زوج دمبلز',
                notes: 'تمرين جبار لعزل كل فخذ ومؤخرة وزيادة المرونة'
              },
              {
                name: 'صعود الدرج أو الصندوق بالدمبلز (Dumbbell Step-Ups)',
                type: 'dumbbell',
                typeLabel: 'صندوق / درج',
                equipment: 'صندوق خشبي أو بنش + دمبلز',
                notes: 'بناء قوة دافعة انفرادية وتنشيط مباشر لعضلات المؤخرة'
              }
            ]
          },
          {
            id: '5d-33',
            name: 'رفع بطات / سمانة واقف أو جالس (Calf Raises)',
            targetMuscle: 'البطات (Gastrocnemius & Soleus)',
            targetMuscleDetail: 'عضلة السمانة Gastrocnemius و Soleus لتكبير الساق السفلية',
            secondaryMuscles: 'القدمين والكاحل',
            equipment: 'جهاز السمانة واقف أو ماكينة سميث',
            sets: '4×20',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['اصعد على مشطي القدمين لأعلى نقطة ممكنة واثبت ثانية كاملة، ثم انزل ببطء لتمدد كامل.'],
            commonMistakes: ['الارتداد السريع (النط) دون ثبات في القمة.'],
            notes: 'تمرين 6 رجلين: تكرارات عالية مع توقف كامل لنمو عضلة السمانة العنيدة.',
            alternatives: [
              {
                name: 'رفع سمانة على ماكينة Leg Press (Leg Press Calf Raise)',
                type: 'machine',
                typeLabel: 'ماكينة Leg Press',
                equipment: 'ماكينة Leg Press بمشط القدم',
                notes: 'تحميل وزن مريح مع مدى حركي واسع جداً'
              },
              {
                name: 'رفع سمانة جالس بالماكينة (Seated Calf Raise Machine)',
                type: 'machine',
                typeLabel: 'ماكينة جالس',
                equipment: 'جهاز السمانة جالس',
                notes: 'عزل عضلة Soleus المسؤولة عن عرض السمانة من الخلف'
              }
            ]
          },
          {
            id: '5d-34',
            name: 'كيرل معصم سواعد بالكيبل أو البار العكسي (Cable / Barbell Reverse Wrist Curl)',
            targetMuscle: 'السواعد (Forearms)',
            targetMuscleDetail: 'عضلات الساعد الباسطة والمعصم والقبضة',
            secondaryMuscles: 'أوتار اليد',
            equipment: 'كيبل أو بار أولمبي مستقيم',
            sets: '4×15',
            imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['اسند الساعدين على الفخذين أو بنش، ارفع البار بحركة المعصم للأعلى بانقباض محكوم وثابت.'],
            commonMistakes: ['استخدام وزن ثقيل يمنع إكمال مدى الحركة.'],
            notes: 'تمرين 1 سواعد (مع الأرجل): ترسيخ قوة القبضة وتحمل الساعدين.',
            alternatives: [
              {
                name: 'كيرل معصم فردي بالدمبل (Single Dumbbell Wrist Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبل فردي',
                equipment: 'دمبل واحد',
                notes: 'تركيز دقيق على معصم كل يد لعلاج أي عدم تكافؤ'
              },
              {
                name: 'لفافة السواعد بالحبل والوزن (Wrist Roller)',
                type: 'bodyweight',
                typeLabel: 'أسطوانة السواعد',
                equipment: 'عصا السواعد بحبل وقرص وزن',
                notes: 'أقسى تمرين لحرق وتضخيم عضلات الساعد بالكامل'
              }
            ]
          },
          {
            id: '5d-35',
            name: 'تعليق حر على العقلة أو مشية المزارع بالدمبلز الثقيل (Dead Hang / Heavy Farmer\'s Walk)',
            targetMuscle: 'السواعد والقبضة (Grip Strength)',
            targetMuscleDetail: 'قوة الأعصاب وعضلات الأصابع والقبضة الحديدية والكتف',
            secondaryMuscles: 'الترابيس والجذع',
            equipment: 'بار العقلة أو زوج دمبلز ثقيل',
            sets: '3 جولات حتى الفشل أو 45 ثانية مشي',
            imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
            executionSteps: ['تعلق على بار العقلة بذراعين مفرودتين وثبت جسمك دون تأرجح لأطول فترة ممكنة لتحدي قوة القبضة.'],
            commonMistakes: ['الاستسلام مبكراً، حاول المقاومة حتى آخر ثانية.'],
            notes: 'تمرين 2 سواعد: فك الضغط عن فقرات الظهر بعد السكوات وتقوية القبضة كالفولاذ.',
            alternatives: [
              {
                name: 'مشية المزارع بالدمبلز الثقيل (Heavy Farmer\'s Walk)',
                type: 'dumbbell',
                typeLabel: 'دمبلز ثقيل',
                equipment: 'زوج دمبلز أثقل ما تستطيع حمله',
                notes: 'المشي بثبات لـ 60 ثانية لتطوير قوة التحمل العضلي'
              },
              {
                name: 'عصر مقابض اليد الحديدية (Hand Gripper Squeezes)',
                type: 'bodyweight',
                typeLabel: 'مقبض يد',
                equipment: 'مقبض يد حديدي مقاوم للضغط',
                notes: 'تطوير قوة الضغط المباشرة للأصابع والكف'
              }
            ]
          }
        ]
      },
      {
        dayName: 'الجمعة',
        title: 'راحة أسبوعية واستشفاء',
        targetMuscles: 'راحة عامة واستشفاء',
        isRestDay: true,
        restDescription: 'يوم الجمعة راحة الصالة وصلاة الجمعة واستشفاء تام لكافة عضلات الجسم.',
        exercises: []
      }
    ]
  },
  {
    id: '3-days',
    title: 'جدول تمارين 3 أيام كلاسيكي',
    daysCount: 3,
    subtitle: 'البرنامج الثلاثي الذهبي لأعلى كفاءة واستشفاء',
    badge: '3 أيام قوية ومرنة ⚡',
    description: 'تقسيم أسبوعي عالي الكفاءة يغطي عضلات الجسم بالكامل: السبت (صدر وباي)، الاثنين (ظهر وتراي)، والأربعاء (أرجل وأكتاف)، مع أيام راحة بينية للاستشفاء العضلي التام.',
    days: [
      {
        dayName: 'السبت',
        title: 'صدر (4 مناطق عضلية) + باي سبس (3 تمارين)',
        targetMuscles: 'الصدر الشامل (أوسط، علوي، سفلي، تفتيح) + البايسبس والبراكيلس (3 تمارين)',
        isRestDay: false,
        exercises: [
          {
            id: '3d-1',
            name: 'بنش برس مستوي بالبار الأولمبي (Flat Barbell Bench Press)',
            targetMuscle: 'الصدر الأوسط والعام (Mid Chest)',
            targetMuscleDetail: 'عضلة الصدر الأوسط وبناء الكتلة العضلية الأساسية والقوة',
            secondaryMuscles: 'الترايسبس، الكتف الأمامي',
            equipment: 'بار أولمبي + بنش مستوٍ',
            category: 'free',
            sets: '4×10',
            imageUrl: '/assets/images/chest-bench-press.jpg',
            animationUrl: '/assets/exercises/chest-flat-barbell.gif',
            executionSteps: ['استلقِ على البنش مع ثبات القدمين في الأرض، اسحب لوحي الكتف للخلف وأنزل البار لمنتصف الصدر ثم ادفع بقوة.'],
            commonMistakes: ['ارتطام البار بالصدر أو فتح الكوعين بزاوية حادة 90 درجة.'],
            notes: 'تمرين 1 للصدر: أساس بناء الصدر (خيارات: بار حر، دمبلز، أو جهاز ماكينة).',
            alternatives: [
              {
                name: 'تجميع دمبل مستوٍ (Flat Dumbbell Press)',
                type: 'dumbbell',
                typeLabel: 'دمبلز (حر)',
                category: 'free',
                equipment: 'زوج دمبلز + بنش مستوٍ',
                animationUrl: '/assets/exercises/chest-flat-dumbbell.gif',
                notes: 'مدى حركي أوسع وحرية أكبر للمفاصل وعلاج عدم تكافؤ القوة بين الجانبين'
              },
              {
                name: 'جهاز ضغط الصدر ماكينة (Chest Press Machine)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                category: 'machine',
                equipment: 'ماكينة ضغط الصدر بالأوزان',
                animationUrl: '/assets/exercises/chest-press-machine.gif',
                notes: 'أمان فائق ومسار حركة ميكانيكي ثابت يركز 100% على ألياف الصدر'
              }
            ]
          },
          {
            id: '3d-2',
            name: 'تجميع دمبل مائل علوي (Incline Dumbbell Press)',
            targetMuscle: 'الصدر العلوي (Upper Chest)',
            targetMuscleDetail: 'ألياف الصدر العلوي لملء أعلى القفص الصدري ومنح الصدر مظهراً ممتلئاً ومرتفعاً',
            secondaryMuscles: 'الكتف الأمامي، الترايسبس',
            equipment: 'دمبلز + بنش مائل 30-45 درجة',
            category: 'free',
            sets: '4×12',
            imageUrl: '/assets/images/chest-incline-press.jpg',
            animationUrl: '/assets/exercises/chest-incline-dumbbell.gif',
            executionSteps: ['اضبط البنش على زاوية 30-45 درجة، ادفع الدمبلين للأعلى مع عصر الصدر في القمة ونزول محكوم.'],
            commonMistakes: ['المبالغة في زاوية البنش مما ينقل الجهد لعضلات الأكتاف.'],
            notes: 'تمرين 2 للصدر: تفجير ألياف الصدر العلوية (حر بالدمبل أو ماكينة سميث).',
            alternatives: [
              {
                name: 'ضغط صدر مائل على جهاز سميث (Incline Smith Machine)',
                type: 'machine',
                typeLabel: 'ماكينة / سميث',
                category: 'machine',
                equipment: 'جهاز سميث + بنش مائل 30°',
                animationUrl: '/assets/exercises/chest-incline-smith.gif',
                notes: 'مسار مستقر يتيح تحميل أوزان قوية بأمان كامل وتركيز نقي على أعلى الصدر'
              },
              {
                name: 'بنش برس مائل بالبار الأولمبي (Incline Barbell Bench)',
                type: 'barbell',
                typeLabel: 'بار (حر)',
                category: 'free',
                equipment: 'بار أولمبي + بنش مائل 30°',
                animationUrl: '/assets/exercises/chest-incline-barbell.gif',
                notes: 'بناء القوة الانفجارية لكتلة الصدر العلوية'
              }
            ]
          },
          {
            id: '3d-3',
            name: 'تجميع دمبل مائل سفلي (Decline Dumbbell Press)',
            targetMuscle: 'الصدر السفلي (Lower Chest)',
            targetMuscleDetail: 'ألياف الصدر السفلي لتحديد ورسم الخط السفلي للصدر وفصله بوضوح عن عضلات البطن',
            secondaryMuscles: 'الترايسبس، الكتف الأمامي',
            equipment: 'دمبلز + بنش مائل لأسفل Decline',
            category: 'free',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/chest-decline-dumbbell.gif',
            executionSteps: ['استلقِ على البنش المائل لأسفل وثبت الساقين، ادفع الدمبلين فوق أسفل الصدر مع عصر قوي ثم انزل ببطء.'],
            commonMistakes: ['الإنزال باتجاه الحلق أو الرقبة بدلاً من أسفل الصدر.'],
            notes: 'تمرين 3 للصدر: نحت الخط السفلي للصدر (بديل حر أو كيبل/ماكينة).',
            alternatives: [
              {
                name: 'سحب كيبل للصدر السفلي (High-to-Low Cable Fly)',
                type: 'cable',
                typeLabel: 'ماكينة / كيبل',
                category: 'machine',
                equipment: 'جهاز كيبل مزدوج من البكرات العلوية',
                animationUrl: '/assets/exercises/chest-decline-cable.gif',
                notes: 'عصر متواصل وضغط ناري على خط الصدر السفلي والداخلي'
              },
              {
                name: 'متوازي الصدر بقبضة واسعة (Chest Dips)',
                type: 'bodyweight',
                typeLabel: 'وزن الجسم (حر)',
                category: 'free',
                equipment: 'جهاز المتوازي',
                notes: 'انحنِ بالجذع للأمام 30 درجة لتوجيه كامل الثقل على الصدر السفلي'
              }
            ]
          },
          {
            id: '3d-4',
            name: 'تفتيح دمبل مستوٍ عزل (Flat Dumbbell Flyes)',
            targetMuscle: 'تفتيح وعزل الصدر (Chest Isolation Fly)',
            targetMuscleDetail: 'تمديد وعزل ألياف الصدر وتوسيع القفص الصدري وضخ الدم في كامل الصدر الداخلي والخارجي',
            secondaryMuscles: 'الكتف الأمامي للتثبيت',
            equipment: 'دمبلز + بنش مستوٍ',
            category: 'free',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/chest-fly-dumbbell.gif',
            executionSteps: ['افتح الذراعين بقوس واسع مع انحناء خفيف وثابت في الكوع للشعور بتمدد كامل، ثم اضم اليدين معاً كأنك تحتضن شجرة.'],
            commonMistakes: ['ثني الكوعين بشدة مما يقلل المدى ويحوله لتمرين ضغط.'],
            notes: 'تمرين 4 للصدر: تفتيح وتمديد الألياف (حر بالدمبل أو ماكينة الفراشة بيك ديك).',
            alternatives: [
              {
                name: 'جهاز الفراشة للصدر (Pec Deck Fly Machine)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                category: 'machine',
                equipment: 'ماكينة الفراشة بيك ديك Pec Deck',
                animationUrl: '/assets/exercises/chest-fly-machine.gif',
                notes: 'عزل فائق وأمان كامل لمفصل الكتف مع ثبات المقاومة طوال مسار الحركة'
              },
              {
                name: 'تفتيح بالكيبل المتقاطع (Cable Crossover)',
                type: 'cable',
                typeLabel: 'كيبل',
                category: 'machine',
                equipment: 'جهاز الكيبل المزدوج',
                animationUrl: '/assets/exercises/chest-decline-cable.gif',
                notes: 'توتر ومقاومة متواصلة حتى أقصى نقطة تقاطع في منتصف الصدر'
              }
            ]
          },
          {
            id: '3d-5',
            name: 'كيرل بايسبس بالبار الأولمبي أو EZ (Barbell Bicep Curl)',
            targetMuscle: 'الباي سبس (Biceps Brachii)',
            targetMuscleDetail: 'الكتلة الشاملة للبايسبس والرأسين الداخلي والخارجي',
            secondaryMuscles: 'السواعد',
            equipment: 'بار أولمبي مستقيم أو بار EZ',
            category: 'free',
            sets: '4×10',
            imageUrl: '/assets/images/biceps-curl.jpg',
            animationUrl: '/assets/exercises/arm-biceps-barbell.gif',
            executionSteps: ['قف باستقامة مع ثبات الكوعين على جانبي الخصر، ارفع البار بحركة قوسية مع عصر البايسبس في القمة ونزول بطيء.'],
            commonMistakes: ['أرجحة الجذع للخلف لتسهيل رفع الوزن.'],
            notes: 'تمرين 1 للباي: أساس بناء حجم وقوة البايسبس.',
            alternatives: [
              {
                name: 'كيرل بايسبس بالكيبل السفلي (Cable Bicep Curl)',
                type: 'cable',
                typeLabel: 'ماكينة / كيبل',
                category: 'machine',
                equipment: 'بكرة كيبل سفلية ببار مستقيم',
                animationUrl: '/assets/exercises/arm-biceps-barbell.gif',
                notes: 'مقاومة مستمرة تمنع الراحة في قمة أو قاع الحركة'
              },
              {
                name: 'كيرل دمبلز تناوبي واقف (Dumbbell Alternating Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبلز (حر)',
                category: 'free',
                equipment: 'زوج دمبلز',
                animationUrl: '/assets/exercises/arm-biceps-barbell.gif',
                notes: 'تدوير المعصم للخارج في القمة لبناء قمة البايسبس'
              }
            ]
          },
          {
            id: '3d-6',
            name: 'كيرل هامر (المطرقة) دمبل (Dumbbell Hammer Curl)',
            targetMuscle: 'الباي سبس والساعد (Brachialis & Forearms)',
            targetMuscleDetail: 'عضلة البراكيلس وسماكة الذراع الجانبية وقوة القبضة',
            secondaryMuscles: 'عضلات الساعد',
            equipment: 'دمبلز',
            category: 'free',
            sets: '3×12',
            imageUrl: '/assets/images/biceps-curl.jpg',
            animationUrl: '/assets/exercises/arm-biceps-hammer.gif',
            executionSteps: ['أمسك الدمبلين بوضعية المطرقة (الكفان متقابلان) وارفع للأعلى بتحكم كامل دون تحريك الكوعين للأمام.'],
            commonMistakes: ['أرجحة الجسم لرفع أوزان زائدة.'],
            notes: 'تمرين 2 للباي: تكثيف عرض الذراع من الجانب وقوة القبضة.',
            alternatives: [
              {
                name: 'كيرل هامر بحبل الكيبل (Cable Rope Hammer Curl)',
                type: 'cable',
                typeLabel: 'ماكينة / كيبل',
                category: 'machine',
                equipment: 'بكرة كيبل سفلية بحبل سميك',
                animationUrl: '/assets/exercises/arm-biceps-hammer.gif',
                notes: 'توتر دائم في قاع وأعلى الحركة لزيادة كثافة الذراع الخارجية'
              },
              {
                name: 'كيرل هامر جالس على بنش سكوت (Preacher Hammer Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبل سكوت (حر)',
                category: 'free',
                equipment: 'بنش سكوت + دمبلز',
                animationUrl: '/assets/exercises/arm-biceps-hammer.gif',
                notes: 'عزل تام وتفريغ كامل لأي حركة تأرجح من الجسم'
              }
            ]
          },
          {
            id: '3d-7',
            name: 'كيرل على بنش سكوت أو دمبل بنش مائل (Preacher Curl / Incline Curl)',
            targetMuscle: 'الباي سبس (Biceps Peak & Short Head)',
            targetMuscleDetail: 'عزل الرأس القصير وبناء قمة البايسبس وتمديد كامل للألياف',
            secondaryMuscles: 'السواعد',
            equipment: 'بنش سكوت + بار EZ أو بنش مائل + دمبلز',
            category: 'free',
            sets: '3×12',
            imageUrl: '/assets/images/biceps-curl.jpg',
            animationUrl: '/assets/exercises/arm-biceps-barbell.gif',
            executionSteps: ['ثبت الذراعين بإحكام على مسند السكوت، ارفع البار بعصر مركز للبايسبس مع نزول محكوم وبطيء.'],
            commonMistakes: ['فرد الذراع بنسبة 100% بشكل عنيف مما يجهد أوتار المرفق.'],
            notes: 'تمرين 3 للباي: عزل جبار مستحيل الغش فيه.',
            alternatives: [
              {
                name: 'جهاز ماكينة كيرل سكوت (Preacher Machine Curl)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                category: 'machine',
                equipment: 'ماكينة البايسبس سكوت المتخصصة',
                animationUrl: '/assets/exercises/arm-biceps-barbell.gif',
                notes: 'مسار ميكانيكي آمن جداً للمفاصل مع ضغط دم هائل في الألياف'
              },
              {
                name: 'كيرل دمبل جالس على بنش مائل (Incline Dumbbell Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبل مائل (حر)',
                category: 'free',
                equipment: 'بنش مائل 45° + دمبلز',
                animationUrl: '/assets/exercises/arm-biceps-barbell.gif',
                notes: 'تمديد عميق لألياف الرأس الطويل لبناء قمة البايسبس المرتفعة'
              }
            ]
          }
        ]
      },
      {
        dayName: 'الأحد',
        title: 'يوم راحة واستشفاء',
        targetMuscles: 'استشفاء وتجديد ألياف الصدر والذراعين',
        isRestDay: true,
        restDescription: 'يوم راحة مخصص للاستشفاء العضلي بعد يوم الصدر والبايسبس المكثف. احرص على شرب 3 لترات ماء وتناول وجباتك البروتينية.',
        exercises: []
      },
      {
        dayName: 'الاثنين',
        title: 'ظهر (5 أجهزة وتمارين) + تراي سبس (3 تمارين)',
        targetMuscles: 'عضلات الظهر الشاملة (عريضة، وسط، وسفلي) + الترايسبس بالكامل (3 رؤوس)',
        isRestDay: false,
        exercises: [
          {
            id: '3d-8',
            name: 'سحب ظهر أمامي عالي واسع (Wide Lat Pulldown)',
            targetMuscle: 'الظهر (Lats & V-Taper)',
            targetMuscleDetail: 'العضلة العريضة (المجنص) وبناء عرض الظهر والشكل الجمالي V-Taper',
            secondaryMuscles: 'البايسبس، الكتف الخلفي',
            equipment: 'جهاز السحب العالي بالكيبل (ماكينة)',
            category: 'machine',
            sets: '4×10',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            animationUrl: '/assets/exercises/back-lat-pulldown.gif',
            executionSteps: ['اجلس وثبت الفخذين تحت الوسائد، اسحب البار باتجاه أعلى الصدر مع إرجاع الكتفين وسحب الكوعين للأسفل.'],
            commonMistakes: ['الميلان المفرط للخلف أو استخدام المرجحة لإنزال الوزن.'],
            notes: 'تمرين 1 للظهر: عرض الظهر وتوسيعه بأمان كامل.',
            alternatives: [
              {
                name: 'عقلة بوزن الجسم قبضة واسعة (Wide Pull-Ups)',
                type: 'bodyweight',
                typeLabel: 'وزن الجسم (حر)',
                category: 'free',
                equipment: 'بار العقلة',
                animationUrl: '/assets/exercises/back-lat-pulldown.gif',
                notes: 'تمرين القوة الكلاسيكي الأعظم لعضلات الظهر العريضة'
              },
              {
                name: 'سحب عالي بقبضة محايدة متوازية (Neutral Grip Pulldown)',
                type: 'machine',
                typeLabel: 'ماكينة قبضة محايدة',
                category: 'machine',
                equipment: 'جهاز سحب عالي بمقبض متوازي',
                animationUrl: '/assets/exercises/back-lat-pulldown.gif',
                notes: 'مدى حركي أعمق وراحة فائقة لأوتار ومفاصل الكتف'
              }
            ]
          },
          {
            id: '3d-9',
            name: 'سحب أرضي كيبل ضيق - تجديف جالس (Seated Cable Row)',
            targetMuscle: 'الظهر الأوسط واللوحين (Middle Traps & Rhomboids)',
            targetMuscleDetail: 'سماكة اللوحين بين عضلات الظهر وتكثيف عمق منتصف الظهر',
            secondaryMuscles: 'البايسبس، السواعد',
            equipment: 'جهاز السحب الأرضي بقبضة V (ماكينة كيبل)',
            category: 'machine',
            sets: '4×10',
            imageUrl: '/assets/images/back-barbell-row.jpg',
            animationUrl: '/assets/exercises/back-seated-cable-row.gif',
            executionSteps: ['اجلس بظهر مستقيم تماماً واسحب المقبض باتجاه السرة مع عصر لوحي الكتف معاً وثانية ثبات.'],
            commonMistakes: ['تقويس أسفل الظهر أو إرجاع الجذع للخلف أثناء الشد.'],
            notes: 'تمرين 2 للظهر: بناء سماكة وكثافة منتصف الظهر.',
            alternatives: [
              {
                name: 'تجديف بالبار منحني (Bent-Over Barbell Row)',
                type: 'barbell',
                typeLabel: 'بار أولمبي (حر)',
                category: 'free',
                equipment: 'بار أولمبي مستقيم',
                animationUrl: '/assets/exercises/back-seated-cable-row.gif',
                notes: 'بناء القوة الكلاسيكية وسماكة الظهر والقطنية'
              },
              {
                name: 'تجديف دمبل بذراع واحدة (Single-Arm Dumbbell Row)',
                type: 'dumbbell',
                typeLabel: 'دمبل (حر)',
                category: 'free',
                equipment: 'بنش مستوٍ + دمبل ثقيل',
                animationUrl: '/assets/exercises/back-seated-cable-row.gif',
                notes: 'مدى حركي عميق جداً وتطوير كل جانب من الظهر باستقلالية'
              }
            ]
          },
          {
            id: '3d-10',
            name: 'تجديف الظهر ماكينة بمسند صدر (Chest-Supported Machine Row)',
            targetMuscle: 'الظهر العلوي والأوسط (Upper & Mid Back)',
            targetMuscleDetail: 'عزل عضلات الظهر وتفريغ الحمل تماماً عن الفقرات القطنية وأسفل الظهر',
            secondaryMuscles: 'الكتف الخلفي، البايسبس',
            equipment: 'ماكينة تجديف بمسند صدر',
            category: 'machine',
            sets: '4×10',
            imageUrl: '/assets/images/back-barbell-row.jpg',
            animationUrl: '/assets/exercises/back-seated-cable-row.gif',
            executionSteps: ['ثبت الصدر على المسند واسحب المقابض للخلف مع عصر عضلات الظهر بقوة دون رفع الصدر عن المسند.'],
            commonMistakes: ['الابتعاد عن مسند الصدر أثناء الشد.'],
            notes: 'تمرين 3 للظهر: عزل تام بدون أي إجهاد على الفقرات القطنية.',
            alternatives: [
              {
                name: 'ماكينة تي بار بمسند صدر (Chest-Supported T-Bar)',
                type: 'machine',
                typeLabel: 'ماكينة T-Bar',
                category: 'machine',
                equipment: 'ماكينة تي بار مائلة بمسند',
                animationUrl: '/assets/exercises/back-seated-cable-row.gif',
                notes: 'أفضل تمرين لسماكة الظهر الجبارة بدون ضغط على أسفل الظهر'
              },
              {
                name: 'ماكينة هامر سترينث تجديف منخفض (Hammer Low Row)',
                type: 'machine',
                typeLabel: 'ماكينة Hammer',
                category: 'machine',
                equipment: 'ماكينة هامر سترينث بمقابض مستقلة',
                animationUrl: '/assets/exercises/back-seated-cable-row.gif',
                notes: 'مسار قوسي مريح يتبع الحركة الطبيعية للوح الكتف'
              }
            ]
          },
          {
            id: '3d-11',
            name: 'سحب عالي بقبضة مقلوبة أو ضيقة (Reverse/Close Grip Lat Pulldown)',
            targetMuscle: 'أسفل الظهر العريض (Lower Lats)',
            targetMuscleDetail: 'ألياف أسفل اللاتس القريبة من الخصر وبناء عمق الظهر السفلي',
            secondaryMuscles: 'البايسبس',
            equipment: 'جهاز السحب العالي بقبضة مقلوبة أو مقبض V',
            category: 'machine',
            sets: '3×12',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            animationUrl: '/assets/exercises/back-lat-pulldown.gif',
            executionSteps: ['اسحب المقبض لأسفل الصدر مع إبقاء الكوعين قريبين من الجذع وعصر أسفل الظهر العريض.'],
            commonMistakes: ['أرجحة الجذع للأمام والخلف.'],
            notes: 'تمرين 4 للظهر: تركيز استثنائي على أسفل اللاتس.',
            alternatives: [
              {
                name: 'سحب عالي بمقبض V مزدوج (Close-Grip V-Bar Pulldown)',
                type: 'machine',
                typeLabel: 'ماكينة قبضة V',
                category: 'machine',
                equipment: 'جهاز السحب العالي مع مقبض مثلث V',
                animationUrl: '/assets/exercises/back-lat-pulldown.gif',
                notes: 'تمدد مذهل لألياف اللاتس السفلية مع تحفيز عالي للبايسبس'
              },
              {
                name: 'سحب فردي بذراع واحدة بالكيبل (Single Arm Lat Pulldown)',
                type: 'machine',
                typeLabel: 'ماكينة فردية',
                category: 'machine',
                equipment: 'بكرة كيبل علوية بمقبض فردي',
                animationUrl: '/assets/exercises/back-lat-pulldown.gif',
                notes: 'تركيز استثنائي وعزل عضلي كامل وتمدد عميق لكل جانب'
              }
            ]
          },
          {
            id: '3d-12',
            name: 'سحب كيبل بذراعين مفرودتين - بول أوفر كيبل (Straight-Arm Cable Pulldown)',
            targetMuscle: 'عزل اللاتس التام (Lats Isolation)',
            targetMuscleDetail: 'عزل تام لعضلة المجنص (اللاتس) بدون إشراك البايسبس في السحب',
            secondaryMuscles: 'الكتف الخلفي، عضلات البطن للتثبيت',
            equipment: 'جهاز الكيبل العلوي مع بار مستقيم أو حبل',
            category: 'machine',
            sets: '3×15',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            animationUrl: '/assets/exercises/back-straight-arm-pulldown.gif',
            executionSteps: ['قف بانحناء خفيف 30 درجة مع ذراعين شبه مفرودتين، واسحب البار بقوس للأسفل حتى يلامس الفخذين باللاتس فقط.'],
            commonMistakes: ['ثني الكوعين وتحويله لتمرين بوش داون ترايسبس.'],
            notes: 'تمرين 5 للظهر: عزل نقي 100% للمجنص وضخ دم فوري.',
            alternatives: [
              {
                name: 'بول أوفر كيبل بحبل للظهر (Rope Straight-Arm Pulldown)',
                type: 'cable',
                typeLabel: 'كيبل حبل',
                category: 'machine',
                equipment: 'كيبل علوي مع حبل طويل',
                animationUrl: '/assets/exercises/back-straight-arm-pulldown.gif',
                notes: 'مدى حركي أبعد للوراء وانقباض أعمق خلف الوركين'
              },
              {
                name: 'بول أوفر بالدمبل على بنش مستوٍ (Dumbbell Pullover)',
                type: 'dumbbell',
                typeLabel: 'دمبل (حر)',
                category: 'free',
                equipment: 'دمبل ثقيل + بنش مستوٍ',
                animationUrl: '/assets/exercises/back-straight-arm-pulldown.gif',
                notes: 'توسيع القفص الصدري وإطالة عضلات الظهر العريضة'
              }
            ]
          },
          {
            id: '3d-13',
            name: 'بوش داون حبل كيبل (Rope Triceps Pushdown)',
            targetMuscle: 'التراي سبس (Triceps Lateral Head)',
            targetMuscleDetail: 'الرأس الجانبي والخارجي للترايسبس لعرض الذراع وإبراز حدوة الحصان',
            secondaryMuscles: 'السواعد',
            equipment: 'جهاز كيبل بحبل',
            category: 'machine',
            sets: '4×12',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
            executionSteps: ['اضغط بالحبل لأسفل وافتحه للخارج عند القمة السفلية مع تثبيت الكوعين بجانب الجذع.'],
            commonMistakes: ['أرجحة الجسم وتحريك الكوعين للأمام والخلف.'],
            notes: 'تمرين 1 للتراي: فتح طرفي الحبل في الأسفل لعصر الرأس الخارجي.',
            alternatives: [
              {
                name: 'بوش داون بمسطرة مستقيمة (Straight Bar Pushdown)',
                type: 'cable',
                typeLabel: 'كيبل مسطرة',
                category: 'machine',
                equipment: 'جهاز كيبل مع بار مستقيم',
                animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
                notes: 'إمكانية رفع أوزان أثقل لزيادة القوة الإجمالية للترايسبس'
              },
              {
                name: 'بوش داون قبضة V (V-Bar Pushdown)',
                type: 'cable',
                typeLabel: 'كيبل بار V',
                category: 'machine',
                equipment: 'جهاز كيبل مع مقبض V',
                animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
                notes: 'زاوية مريحة جداً لأوتار المعصمين'
              }
            ]
          },
          {
            id: '3d-14',
            name: 'كسر الجمجمة بالبار المتعرج EZ أو دمبلز (Lying Skull Crushers)',
            targetMuscle: 'التراي سبس (Triceps Long & Medial Head)',
            targetMuscleDetail: 'الرأس الطويل والمتوسط للترايسبس وبناء كثافة الذراع الإجمالية',
            secondaryMuscles: 'الصدر والكتف للتثبيت',
            equipment: 'بار متعرج EZ أو دمبلز + بنش مستوٍ',
            category: 'free',
            sets: '4×10',
            imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/arm-triceps-skullcrusher.gif',
            executionSteps: ['استلقِ على البنش مع تثبيت الكوعين للأعلى، أنزل البار ببطء باتجاه الجبهة ثم ادفع بقوة التراي فقط.'],
            commonMistakes: ['تحريك الذراعين من مفصل الكتف بدلاً من المرفق.'],
            notes: 'تمرين 2 للتراي: بناء كتلة الترايسبس الكلية.',
            alternatives: [
              {
                name: 'كسر الجمجمة بزوج دمبلز (Dumbbell Skull Crushers)',
                type: 'dumbbell',
                typeLabel: 'دمبلز (حر)',
                category: 'free',
                equipment: 'زوج دمبلز + بنش مستوٍ',
                animationUrl: '/assets/exercises/arm-triceps-skullcrusher.gif',
                notes: 'عزل مباشر للترايسبس مع حرية كاملة لمعصمي اليدين'
              },
              {
                name: 'بنش برس بقبضة ضيقة (Close-Grip Bench Press)',
                type: 'barbell',
                typeLabel: 'بار أولمبي (حر)',
                category: 'free',
                equipment: 'بار أولمبي + بنش مستوٍ',
                animationUrl: '/assets/exercises/chest-flat-barbell.gif',
                notes: 'رفع أوزان ثقيلة لبناء أضخم كتلة تراي وقوة دفع'
              }
            ]
          },
          {
            id: '3d-15',
            name: 'مد ترايسبس فوق الرأس بالدمبل أو الكيبل (Overhead Triceps Extension)',
            targetMuscle: 'التراي سبس (Triceps Long Head)',
            targetMuscleDetail: 'الرأس الطويل للترايسبس المسؤول عن ثلثي حجم الذراع العضلي',
            secondaryMuscles: 'الأكتاف للتثبيت',
            equipment: 'دمبل ثقيل بكلتا اليدين جالس أو كيبل بحبل',
            category: 'free',
            sets: '3×12',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
            executionSteps: ['امسك الدمبل فوق الرأس بكلتا اليدين، أنزل ببطء خلف الرقبة لتمدد كامل ثم ادفع للأعلى بعصر التراي.'],
            commonMistakes: ['فتح المرفقين للخارج كثيراً أو تقويس الظهر.'],
            notes: 'تمرين 3 للتراي: تمديد وتضخيم الرأس الطويل للترايسبس.',
            alternatives: [
              {
                name: 'مد ترايسبس أوفر هيد بالحبل كيبل (Cable Overhead Extension)',
                type: 'cable',
                typeLabel: 'ماكينة / كيبل',
                category: 'machine',
                equipment: 'جهاز كيبل بحبل من أسفل أو أعلى',
                animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
                notes: 'شد ومقاومة مستمرة لا تنقطع طوال مسار الحركة'
              },
              {
                name: 'ديبس متوازي للترايسبس (Triceps Dips)',
                type: 'bodyweight',
                typeLabel: 'وزن الجسم (حر)',
                category: 'free',
                equipment: 'جهاز المتوازي للذراعين',
                animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
                notes: 'تمرين وزن جسم كلاسيكي جبار لصلابة وقوة الترايسبس'
              }
            ]
          }
        ]
      },
      {
        dayName: 'الثلاثاء',
        title: 'يوم راحة واستشفاء',
        targetMuscles: 'استشفاء وتغذية ألياف الظهر والترايسبس',
        isRestDay: true,
        restDescription: 'يوم راحة مخصص للاستشفاء وإعادة بناء الألياف العضلية قبل تمرين الأرجل والأكتاف الشامل غداً.',
        exercises: []
      },
      {
        dayName: 'الأربعاء',
        title: 'أرجل شاملة (6 تمارين) + أكتاف (4 تمارين)',
        targetMuscles: 'عضلات الأرجل بالكامل (6 تمارين) + الأكتاف والترابيس (4 تمارين = 10 تمارين متوازنة)',
        isRestDay: false,
        exercises: [
          {
            id: '3d-16',
            name: 'سكوات حر بالبار الأولمبي (Barbell Back Squat)',
            targetMuscle: 'الأرجل الشاملة (Quads, Glutes & Hamstrings)',
            targetMuscleDetail: 'ملك تمارين كمال الأجسام لبناء عضلات الفخذ الأمامي والمؤخرة والقوة الشاملة',
            secondaryMuscles: 'الفخذ الخلفي، أسفل الظهر، الجذع',
            equipment: 'بار أولمبي + قفص السكوات Squat Rack',
            category: 'free',
            sets: '4×10',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-squat.gif',
            executionSteps: ['قف بعرض الكتفين مع توجيه المشطين للخارج قليلاً، انزل بمحاذاة الفخذين للأرض مع استقامة الظهر ثم ادفع بالكعبين بقوة.'],
            commonMistakes: ['انحناء الظهر للأمام أو سقوط الركبتين للداخل أثناء الصعود.'],
            notes: 'تمرين 1 أرجل: أساس قوة وكتلة الجزء السفلي (يمكن التبديل لجهاز سميث أو دمبلز).',
            alternatives: [
              {
                name: 'سكوات على جهاز سميث (Smith Machine Squat)',
                type: 'machine',
                typeLabel: 'ماكينة / سميث',
                category: 'machine',
                equipment: 'جهاز سميث ببار ثابت',
                animationUrl: '/assets/exercises/leg-squat.gif',
                notes: 'أمان فائق ومسار عمودي محكوم يحمي أسفل الظهر'
              },
              {
                name: 'سكوات بالدمبلز جوبلت (Dumbbell Goblet Squat)',
                type: 'dumbbell',
                typeLabel: 'دمبل (حر)',
                category: 'free',
                equipment: 'دمبل ثقيل محمول أمام الصدر',
                animationUrl: '/assets/exercises/leg-squat.gif',
                notes: 'سهل ومريح جداً للمبتدئين ويضمن استقامة الظهر التامة'
              }
            ]
          },
          {
            id: '3d-17',
            name: 'دفع رجلين مائل ماكينة (45° Leg Press Machine)',
            targetMuscle: 'الفخذ الأمامي والشامل (Quadriceps)',
            targetMuscleDetail: 'كتلة وضخامة عضلات الفخذ الأمامية الأربعة مع تخفيف الضغط عن الظهر',
            secondaryMuscles: 'المؤخرة، الفخذ الخلفي',
            equipment: 'جهاز Leg Press بزاوية 45 درجة',
            category: 'machine',
            sets: '4×10',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-press.gif',
            executionSteps: ['ضع القدمين في منتصف اللوح بعرض الكتفين، انزل بالوزن حتى زاوية 90 درجة بالركبتين ثم ادفع دون قفل الركبة في القمة.'],
            commonMistakes: ['قفل مفصل الركبة تماماً في القمة أو رفع أسفل الظهر عن المقعد.'],
            notes: 'تمرين 2 أرجل: تحميل أوزان ثقيلة بأمان لعضلات الفخذ الأمامية.',
            alternatives: [
              {
                name: 'هاك سكوات ماكينة (Hack Squat Machine)',
                type: 'machine',
                typeLabel: 'ماكينة Hack',
                category: 'machine',
                equipment: 'جهاز هاك سكوات المائل',
                animationUrl: '/assets/exercises/leg-press.gif',
                notes: 'تركيز استثنائي مدمر على عضلات الفخذ الأمامية فوق الركبة مباشرة'
              },
              {
                name: 'دفع رجلين أفقي جالس (Seated Horizontal Leg Press)',
                type: 'machine',
                typeLabel: 'ماكينة أفقية',
                category: 'machine',
                equipment: 'ماكينة دفع الأرجل الأفقية بالكيبل',
                animationUrl: '/assets/exercises/leg-press.gif',
                notes: 'حركة سلسلة جداً ومريحة لأوتار الركبتين وأسفل الظهر'
              }
            ]
          },
          {
            id: '3d-18',
            name: 'فرد أرجل أمامي ماكينة (Leg Extension Machine)',
            targetMuscle: 'الفخذ الأمامي العازل (Quads Isolation)',
            targetMuscleDetail: 'رسم وتحديد ألياف الفخذ الأمامية وعضلة الدمعة (Vastus Medialis) فوق الركبة',
            secondaryMuscles: 'أوتار الركبة للتثبيت',
            equipment: 'جهاز مد الأرجل Leg Extension',
            category: 'machine',
            sets: '3×12',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-extension.gif',
            executionSteps: ['ارفع الساقين للأعلى حتى استقامتهما مع عصر الفخذ الأمامي لثانية كاملة ثم انزل ببطء شديد.'],
            commonMistakes: ['استخدام وزن ثقيل يؤدي لأرجحة الساقين بدون ثبات في القمة.'],
            notes: 'تمرين 3 أرجل: رسم خطوط عضلات الفخذ الأمامية.',
            alternatives: [
              {
                name: 'سيسي سكوات بوزن الجسم (Sissy Squat)',
                type: 'bodyweight',
                typeLabel: 'وزن الجسم (حر)',
                category: 'free',
                equipment: 'منصة سيسي سكوات أو بنش',
                animationUrl: '/assets/exercises/leg-extension.gif',
                notes: 'تمدد وانقباض خارق للعادة لعضلة الفخذ الأمامية'
              },
              {
                name: 'مد رجل أمامي فردي بالساق الواحدة (Single Leg Extension)',
                type: 'machine',
                typeLabel: 'ماكينة فردية',
                category: 'machine',
                equipment: 'جهاز Leg Extension بساق واحدة',
                animationUrl: '/assets/exercises/leg-extension.gif',
                notes: 'علاج أي فرق قوة بين الساقين'
              }
            ]
          },
          {
            id: '3d-19',
            name: 'ثني رجل خلفي جالس أو نائم (Hamstring Leg Curl Machine)',
            targetMuscle: 'الفخذ الخلفي (Hamstrings)',
            targetMuscleDetail: 'عضلات الفخذ الخلفية وأوتار الركبة لمنع الإصابات وتحقيق توازن الساق',
            secondaryMuscles: 'السمانة والمؤخرة',
            equipment: 'جهاز ثني الأرجل Hamstring Curl',
            category: 'machine',
            sets: '4×12',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-curl.gif',
            executionSteps: ['اثنِ الساقين باتجاه المؤخرة مع ثبات الحوض على المقعد، واعصر الفخذ الخلفي ثانية ثم اهبط ببطء.'],
            commonMistakes: ['رفع الوركين عن المقعد أثناء الثني أو النزول السريع.'],
            notes: 'تمرين 4 أرجل: توازن القوة بين الفخذ الأمامي والخلفي لحماية الركبة.',
            alternatives: [
              {
                name: 'ثني رجل خلفي واقف فردي (Standing Single Leg Curl)',
                type: 'machine',
                typeLabel: 'ماكينة فردية',
                category: 'machine',
                equipment: 'ماكينة ثني الأرجل بالوقوف',
                animationUrl: '/assets/exercises/leg-curl.gif',
                notes: 'عزل فائق لكل ساق بشكل مستقل تماماً'
              },
              {
                name: 'ثني رجل خلفي بالدمبل مستلقياً (Dumbbell Leg Curl)',
                type: 'dumbbell',
                typeLabel: 'دمبل (حر)',
                category: 'free',
                equipment: 'بنش مستوٍ + دمبل بين القدمين',
                animationUrl: '/assets/exercises/leg-curl.gif',
                notes: 'عصر متواصل للفخذ الخلفي بدون أجهزة'
              }
            ]
          },
          {
            id: '3d-20',
            name: 'ديدلفت روماني بالدمبلز أو البار (Romanian Deadlift - RDL)',
            targetMuscle: 'الفخذ الخلفي والمؤخرة (Hamstrings & Glutes)',
            targetMuscleDetail: 'أعظم تمرين لإطالة وتكثيف أوتار الفخذ الخلفية والمؤخرة وأسفل الظهر',
            secondaryMuscles: 'القطنية والجذع والقبضة',
            equipment: 'زوج دمبلز أو بار أولمبي',
            category: 'free',
            sets: '3×10',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-romanian-deadlift.gif',
            executionSteps: ['قف باستقامة مع مسك الدمبلين، ادفع المؤخرة للخلف مع انحناء خفيف بالركبتين وظل الظهر مستقيماً تماماً حتى أسفل الركبة ثم ارجع.'],
            commonMistakes: ['تقويس الظهر مما يسبب إجهاداً خطيراً على القطنية.'],
            notes: 'تمرين 5 أرجل: تمديد عميق لعضلات السلسلة الخلفية (Posterior Chain).',
            alternatives: [
              {
                name: 'طعنات دمبل للمشي (Walking Lunges)',
                type: 'dumbbell',
                typeLabel: 'دمبلز للمشي (حر)',
                category: 'free',
                equipment: 'زوج دمبلز + مساحة للمشي',
                animationUrl: '/assets/exercises/leg-romanian-deadlift.gif',
                notes: 'نحت وتفصيل الفخذ والمؤخرة مع حرق سعرات هائل'
              },
              {
                name: 'ديدلفت روماني على جهاز سميث (Smith Romanian Deadlift)',
                type: 'machine',
                typeLabel: 'ماكينة سميث',
                category: 'machine',
                equipment: 'جهاز سميث',
                animationUrl: '/assets/exercises/leg-romanian-deadlift.gif',
                notes: 'مسار ثابت لحماية أسفل الظهر وضمان العزل التام'
              }
            ]
          },
          {
            id: '3d-21',
            name: 'رفع سمانة / بطات واقف أو جالس (Calf Raises)',
            targetMuscle: 'البطات (Gastrocnemius & Soleus)',
            targetMuscleDetail: 'عضلة السمانة لتكبير الساق السفلية وزيادة القوة الدافعة',
            secondaryMuscles: 'القدمين والكاحل',
            equipment: 'جهاز السمانة واقف أو ماكينة سميث',
            category: 'machine',
            sets: '4×20',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-calf-raise.gif',
            executionSteps: ['اصعد على مشطي القدمين لأعلى نقطة ممكنة واثبت ثانية كاملة، ثم انزل ببطء لتمدد كامل.'],
            commonMistakes: ['الارتداد السريع (النط) دون ثبات في القمة.'],
            notes: 'تمرين 6 أرجل: تكرارات عالية مع توقف كامل لنمو عضلة السمانة.',
            alternatives: [
              {
                name: 'رفع سمانة على ماكينة Leg Press (Leg Press Calf Raise)',
                type: 'machine',
                typeLabel: 'ماكينة Leg Press',
                category: 'machine',
                equipment: 'ماكينة Leg Press بمشط القدم',
                animationUrl: '/assets/exercises/leg-calf-raise.gif',
                notes: 'تحميل وزن مريح مع مدى حركي واسع جداً'
              },
              {
                name: 'رفع سمانة جالس بالماكينة (Seated Calf Raise)',
                type: 'machine',
                typeLabel: 'ماكينة جالس',
                category: 'machine',
                equipment: 'جهاز السمانة جالس',
                animationUrl: '/assets/exercises/leg-calf-raise.gif',
                notes: 'عزل عضلة Soleus المسؤولة عن عرض السمانة'
              }
            ]
          },
          {
            id: '3d-22',
            name: 'ضغط أكتاف دمبل جالس أو ماكينة (Seated Dumbbell Shoulder Press)',
            targetMuscle: 'الكتف الأمامي والشامل (Anterior & Lateral Deltoids)',
            targetMuscleDetail: 'بناء الكتلة الشاملة للأكتاف والقوة العلوية للشكل العريض',
            secondaryMuscles: 'الترايسبس، الترابيس العلوية',
            equipment: 'بنش بمسند مستقيم + دمبلز',
            category: 'free',
            sets: '4×10',
            imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/shoulder-dumbbell-press.gif',
            executionSteps: ['اجلس مع استناد الظهر تماماً، ادفع الدمبلين للأعلى حتى تلتقيان فوق الرأس دون قفل المرفقين ونزول محكوم لمستوى الأذن.'],
            commonMistakes: ['تقويس أسفل الظهر ورفعه عن المسند أو النزول غير الكافي.'],
            notes: 'تمرين 1 أكتاف: بناء كتلة وقوة الأكتاف (حر بالدمبل أو ماكينة ضغط الأكتاف).',
            alternatives: [
              {
                name: 'جهاز ضغط أكتاف ماكينة (Shoulder Press Machine)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                category: 'machine',
                equipment: 'ماكينة ضغط الأكتاف بالأوزان',
                animationUrl: '/assets/exercises/shoulder-dumbbell-press.gif',
                notes: 'أمان كامل لمفصل الكتف وثبات مسار الحركة للتركيز على العضلة'
              },
              {
                name: 'ضغط أكتاف عسكري بالبار واقف أو جالس (Barbell Overhead Press)',
                type: 'barbell',
                typeLabel: 'بار أولمبي (حر)',
                category: 'free',
                equipment: 'بار أولمبي مستقيم',
                animationUrl: '/assets/exercises/shoulder-dumbbell-press.gif',
                notes: 'تمرين القوة الكلاسيكي للجزء العلوي من الجسم'
              }
            ]
          },
          {
            id: '3d-23',
            name: 'رفرفة جانبي دمبل للكتف الجانبي (Dumbbell Lateral Raise)',
            targetMuscle: 'الكتف الجانبي (Lateral Deltoids)',
            targetMuscleDetail: 'الرأس الجانبي للكتف المسؤول بنسبة 100% عن تعريض الأكتاف والشكل المثلث V-Taper',
            secondaryMuscles: 'الترابيس للتثبيت',
            equipment: 'زوج دمبلز بوزن خفيف إلى متوسط',
            category: 'free',
            sets: '4×12',
            imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/shoulder-lateral-raise.gif',
            executionSteps: ['قف باستقامة مع ميل خفيف للأمام، ارفع الدمبلين جانباً حتى مستوى الكتف مع توجيه الكوعين للأعلى قليلاً ونزول بطيء.'],
            commonMistakes: ['أرجحة الجسم واستخدام وزن ثقيل ينقل الجهد لعضلات الترابيس.'],
            notes: 'تمرين 2 أكتاف: عزل الكتف الجانبي لتعريض الكتفين (حر بالدمبل أو كيبل جانبي).',
            alternatives: [
              {
                name: 'رفرفة جانبي بالكيبل السفلي (Cable Lateral Raise)',
                type: 'cable',
                typeLabel: 'ماكينة / كيبل',
                category: 'machine',
                equipment: 'بكرة كيبل سفلية بمقبض فردي',
                animationUrl: '/assets/exercises/shoulder-lateral-raise.gif',
                notes: 'توتر ومقاومة متواصلة تمنع العضلة من الراحة في قاع الحركة'
              },
              {
                name: 'جهاز رفرفة جانبي ماكينة (Lateral Raise Machine)',
                type: 'machine',
                typeLabel: 'ماكينة / جهاز',
                category: 'machine',
                equipment: 'ماكينة الرفرفة الجانبية',
                animationUrl: '/assets/exercises/shoulder-lateral-raise.gif',
                notes: 'عزل فائق بدون أي إجهاد على مفصل الرسغ والمعصم'
              }
            ]
          },
          {
            id: '3d-24',
            name: 'رفرفة خلفي ماكينة فراشة معكوسة أو دمبل (Reverse Pec Deck / Rear Delt Fly)',
            targetMuscle: 'الكتف الخلفي (Posterior Deltoids)',
            targetMuscleDetail: 'الرأس الخلفي للكتف لتكوين التكور ثلاثي الأبعاد 3D ومنع تحدب الأكتاف',
            secondaryMuscles: 'الظهر العلوي واللوحين',
            equipment: 'ماكينة الفراشة المعكوسة أو زوج دمبلز منحني',
            category: 'machine',
            sets: '4×12',
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/shoulder-lateral-raise.gif',
            executionSteps: ['اجلس موجهاً صدرك للمسند، ادفع المقبضين للخارج وللخلف بقوس واسع بعصر الكتف الخلفي لثانية كاملة.'],
            commonMistakes: ['سحب المقابض بالذراعين بدلاً من عصر الكتف الخلفي.'],
            notes: 'تمرين 3 أكتاف: حماية مفصل الكتف وتدوير الكتف للخلف بشكل ثلاثي الأبعاد.',
            alternatives: [
              {
                name: 'فيس بول كيبل بحبل للكتف الخلفي (Face Pull)',
                type: 'cable',
                typeLabel: 'ماكينة / كيبل',
                category: 'machine',
                equipment: 'جهاز كيبل علوي مع حبل طويل',
                animationUrl: '/assets/exercises/shoulder-lateral-raise.gif',
                notes: 'التمرين الأفضل عالمياً لصحة مفصل الروتايتور كف والكتف الخلفي'
              },
              {
                name: 'رفرفة خلفي بالدمبلز منحنياً (Bent-Over Dumbbell Rear Fly)',
                type: 'dumbbell',
                typeLabel: 'دمبلز منحنٍ (حر)',
                category: 'free',
                equipment: 'زوج دمبلز خفيف + بنش أو وقوف',
                animationUrl: '/assets/exercises/shoulder-lateral-raise.gif',
                notes: 'عزل نقي للكتف الخلفي مع إمكانية إسناد الرأس على بنش'
              }
            ]
          },
          {
            id: '3d-25',
            name: 'شراغز ترابيس بالبار أو الدمبل (Barbell / Dumbbell Shrugs)',
            targetMuscle: 'الترابيس العلوية (Upper Trapezius)',
            targetMuscleDetail: 'بناء سمك وقوة الرقبة والترابيس العلوية وإبراز المظهر العضلي القوي',
            secondaryMuscles: 'السواعد والرقبة',
            equipment: 'بار أولمبي أو زوج دمبلز ثقيل',
            category: 'free',
            sets: '4×12',
            imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/shoulder-dumbbell-press.gif',
            executionSteps: ['ارفع الكتفين للأعلى باتجاه الأذنين كأنك تقول "لا أعلم"، اثبت في القمة لثانية كاملة ثم انزل ببطء لتحت.'],
            commonMistakes: ['تدوير الكتفين في حركة دائرية (خطأ يسبب تلف مفصل الكتف)، الحركة عمودية لأعلى وأسفل فقط.'],
            notes: 'تمرين 4 أكتاف: تكثيف عضلات الترابيس (حر بالبار/دمبلز أو جهاز سميث).',
            alternatives: [
              {
                name: 'شراغز ترابيس على جهاز سميث (Smith Machine Shrugs)',
                type: 'machine',
                typeLabel: 'ماكينة سميث',
                category: 'machine',
                equipment: 'جهاز سميث ببار ثابت',
                animationUrl: '/assets/exercises/shoulder-dumbbell-press.gif',
                notes: 'مسار عمودي مستقيم يضمن حركة آمنة تماماً لأعلى ولأسفل'
              },
              {
                name: 'شراغز بالدمبلز الثقيل (Heavy Dumbbell Shrugs)',
                type: 'dumbbell',
                typeLabel: 'دمبلز ثقيل (حر)',
                category: 'free',
                equipment: 'زوج دمبلز ثقيل',
                animationUrl: '/assets/exercises/shoulder-dumbbell-press.gif',
                notes: 'حرية كاملة لموضع اليدين بجانب الجسم لتقليل الضغط على الأوتار'
              }
            ]
          }
        ]
      },
      {
        dayName: 'الخميس',
        title: 'يوم راحة واستشفاء',
        targetMuscles: 'استشفاء عضلات الأرجل والأكتاف',
        isRestDay: true,
        restDescription: 'يوم راحة مخصص لإعادة شحن الطاقة وترميم ألياف الأرجل والأكتاف بعد تمرين الأربعاء القوي.',
        exercises: []
      },
      {
        dayName: 'الجمعة',
        title: 'راحة أسبوعية',
        targetMuscles: 'راحة عامة واستشفاء روحي وبدني',
        isRestDay: true,
        restDescription: 'يوم الجمعة راحة الصالة وصلاة الجمعة وقضاء الوقت مع العائلة وتناول وجبة متوازنة استعداداً لأسبوع تدريبي جديد.',
        exercises: []
      }
    ]
  }
];

// Diet Plans for Weight Gain and Weight Loss
export interface DietPlan {
  id: 'gain' | 'lose';
  title: string;
  badge: string;
  targetDescription: string;
  dailyCaloriesHint: string;
  macrosBreakdown: { protein: string; carbs: string; fats: string };
  goldenRules: string[];
  meals: Array<{
    mealNumber: number;
    title: string;
    time: string;
    items: string[];
    nutritionHighlight: string;
  }>;
}

export const DIET_PLANS: DietPlan[] = [
  {
    id: 'gain',
    title: 'نظام غذائي لزيادة الوزن والكتلة العضلية (ضخامة نظيفة - Clean Bulking)',
    badge: 'بناء العضلات والضخامة 💪',
    targetDescription: 'مخصص للرياضيين الراغبين في زيادة الوزن بطريقة صحية ونقية ترتكز على كسب الكتلة العضلية وتقليل الدهون الزائدة.',
    dailyCaloriesHint: '+400 إلى +600 سعرة حرارية فوق احتياجك اليومي',
    macrosBreakdown: {
      protein: '25% - 30% (حوالي 2 جرام لكل كجم من وزن الجسم)',
      carbs: '50% - 55% (كربوهيدرات معقدة لمد الجسم بالطاقة المستمرة)',
      fats: '20% - 25% (دهون صحية غير مشبعة لدعم الهرمونات)'
    },
    goldenRules: [
      'تناول 5 إلى 6 وجبات موزعة على مدار اليوم كل 3 ساعات تقريباً.',
      'الاعتماد على مصادر كربوهيدرات معقدة كالشوفان، الأرز البسمتي، البطاطا الحلوة، والمكرونة.',
      'إدخال السعرات السائلة عالية القيمة: سموذي الشوفان والموز والحليب وزبدة الفول السوداني.',
      'شرب ما لا يقل عن 3.5 إلى 4 لتر من الماء يومياً لنقل المغذيات.',
      'النوم العميق لمدة 7 إلى 8 ساعات ليلاً حيث تتم عمليات البناء والنمو العضلي.'
    ],
    meals: [
      {
        mealNumber: 1,
        title: 'وجبة الفطور (انطلاقة الطاقة)',
        time: '8:00 صباحاً',
        items: [
          '4 إلى 5 بيضات (3 بياض + 2 كاملة) مجهزة بزيت الزيتون.',
          '80-100 جرام شوفان مطبوخ بالحليب كامل الدسم.',
          'ملعقة كبيرة زبدة فول سوداني طبيعية.',
          'حبة موز أو قبضة تمر مع رشة قرفة.'
        ],
        nutritionHighlight: 'بروتين عالي + كربوهيدرات بطيئة الهضم تدوم طوال الصباح'
      },
      {
        mealNumber: 2,
        title: 'وجبة خفيفة (سناك صباحي)',
        time: '11:00 صباحاً',
        items: [
          'كوب زبادي يوناني أو لبن رايب كامل الدسم.',
          'حفنة مكسرات مشكلة (لوز، جوز، كاجو) بحجم قبضة اليد.',
          'تفاحة أو حبة فاكهة موسمية.'
        ],
        nutritionHighlight: 'دهون صحية وأحماض أوميغا 3 لتعزيز الطاقة'
      },
      {
        mealNumber: 3,
        title: 'وجبة الغداء الرئيسية',
        time: '2:30 ظهراً',
        items: [
          '180-200 جرام صدر دجاج مشوي أو لحم بقري مفروم قليل الدهن.',
          '200-250 جرام أرز مطبوخ أو مكرونة قمح كامل.',
          'صحن سلطة خضراء طازجة مضاف إليها ملعقة زيت زيتون بكر.',
          'شوربة خضار أو مرق خفيف.'
        ],
        nutritionHighlight: 'كتلة بروتينية رئيسية وكربوهيدرات لشحن مخازن الجليكوجين'
      },
      {
        mealNumber: 4,
        title: 'وجبة ما قبل التمرين (بنزين العضلات)',
        time: 'قبل التمرين بساعة إلى ساعة ونصف',
        items: [
          'حبة بطاطا مسلوقة أو بطاطا حلوة متوسطة الحجم.',
          'علبة تونة مصفاة من الزيت أو شريحة جبن قريش.',
          'فنجان قهوة سوداء لتحفيز التركيز ونشاط الجهاز العصبي.'
        ],
        nutritionHighlight: 'كربوهيدرات سريعة الامتصاص لضخ الطاقة في التمارين'
      },
      {
        mealNumber: 5,
        title: 'وجبة ما بعد التمرين (نافذة الاستشفاء)',
        time: 'خلال 45 دقيقة بعد انتهاء التمرين',
        items: [
          'مشروب بروتين أو 150 جرام صدر دجاج / سمك فيليه.',
          '250 جرام أرز أبيض أو بطاطس مسلوقة مهروسة.',
          '3 حبات تمر أو موزة لرفع الإنسولين وتسريع تغذية العضلات.'
        ],
        nutritionHighlight: 'امتصاص سريع لإصلاح الألياف العضلية التالفة'
      },
      {
        mealNumber: 6,
        title: 'وجبة العشاء وقبل النوم',
        time: 'قبل النوم بساعة',
        items: [
          '150-200 جرام جبنة قريش (غنية ببروتين الكازين بطيء الامتصاص).',
          'رغيف خبز بلدي أو 2 توست بني.',
          'شرائح خيار وطماطم وخس.',
          'كوب حليب دافئ خالي أو قليل السكر.'
        ],
        nutritionHighlight: 'تغذية مستمرة للألياف العضلية طوال ساعات النوم'
      }
    ]
  },
  {
    id: 'lose',
    title: 'نظام غذائي لإنقاص الوزن وحرق الدهون (تنشيف ونحت العضلات - Cutting)',
    badge: 'حرق الدهون والرشاقة 🔥',
    targetDescription: 'خطة غذائية متوازنة لإشعال حرق الدهون المخزنة مع الحفاظ الصارم على الكتلة العضلية ومنع الترهلات والجوع الشديد.',
    dailyCaloriesHint: '-400 إلى -600 سعرة حرارية من احتياجك اليومي',
    macrosBreakdown: {
      protein: '35% - 40% (بروتين مرتفع لمنع هدم العضلات وزيادة الشبع)',
      carbs: '30% - 35% (ألياف خضراء وكربوهيدرات بطيئة مؤشر جلايسيمي منخفض)',
      fats: '20% - 25% (دهون مفيدة غير مشبعة بكميات محسوبة)'
    },
    goldenRules: [
      'الاعتماد على الأطعمة ذات الكثافة الحجمية العالية والسعرات المنخفضة (خضروات، ورقيات).',
      'قطع السكريات المكررة والمشروبات الغازية والزيوت المهدرجة تماماً.',
      'بدء كل وجبة بكوب ماء كبير ثم السلطة الخضراء، ثم البروتين، وأخيراً النشويات.',
      'شرب ما لا يقل عن 3 إلى 4 لترات ماء يومياً لتعزيز التمثيل الغذائي وطرد السوائل المحتبسة.',
      'ممارسة تمارين المقاومة لرفع معدل الأيض الأساسي وحرق الدهون على مدار 24 ساعة.'
    ],
    meals: [
      {
        mealNumber: 1,
        title: 'وجبة الفطور الصحي (بدء حرق الدهون)',
        time: '8:30 صباحاً',
        items: [
          '4 بيضات (3 بياض بيض + 1 بيضة كاملة مسلوقة أو أومليت بدون زيت).',
          '40-50 جرام شوفان مطبوخ بالماء أو حليب قليل الدسم.',
          'شرائح خيار وخس وطماطم ورقية.',
          'شاي أخضر أو قهوة بدون سكر.'
        ],
        nutritionHighlight: 'شبع يدوم لساعات مع إشعال عمليات الأيض'
      },
      {
        mealNumber: 2,
        title: 'سناك بين الوجبات',
        time: '12:00 ظهراً',
        items: [
          'كوب زبادي طبيعي لايت خالي الدسم.',
          '10 حبات لوز نيء غير مملح.',
          'شريحة جريب فروت أو تفاح أخضر.'
        ],
        nutritionHighlight: 'ألياف ومضادات أكسدة لقمع الرغبة في السكريات'
      },
      {
        mealNumber: 3,
        title: 'وجبة الغداء الرئيسية المشبعة',
        time: '3:00 مساءً',
        items: [
          '180 جرام صدر دجاج مسحب مشوي أو علبة تونة مصفاة بالليمون أو سمك مشوي.',
          '100-120 جرام أرز بني أو بطاطا مسلوقة متوسطة الحجم.',
          'صحن سلطة خضراء عملاق (خس، جرجير، فجل، خيار، طماطم، ليمون، خل تفاح).',
          'طبق فاصولياء خضراء أو كوسا مسلوقة (سوتيه).'
        ],
        nutritionHighlight: 'حجم وجبة ضخم ومشبع بسعرات حرارية مدروسة'
      },
      {
        mealNumber: 4,
        title: 'وجبة خفيفة قبل التمرين',
        time: 'قبل التمرين بساعة',
        items: [
          'حبة موزة صغيرة أو تفاحة خضراء.',
          'قهوة سوداء أو إسبريسو بدون سكر (لتحفيز أكسدة الدهون أثناء الحركة).'
        ],
        nutritionHighlight: 'طاقة نقية تدعم الشدة العالية في التمرين'
      },
      {
        mealNumber: 5,
        title: 'وجبة العشاء الخفيفة (بروتين نقي)',
        time: '8:00 مساءً',
        items: [
          '150 جرام جبن قريش بلدي مع ملعقة صغيرة زيت حبة البركة أو زعتر.',
          'صحن سلطة خضراء ورقية غني بالجرجير والخيار.',
          'علبة زبادي لايت مع رشة قرفة وعصرة نصف ليمونة.'
        ],
        nutritionHighlight: 'استشفاء عضلي ليلي بدون تراكم دهون'
      }
    ]
  }
];
