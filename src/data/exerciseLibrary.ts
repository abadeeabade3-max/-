import { ExerciseItem } from '../types';
import { getAccurateExerciseImage } from '../utils/exerciseImages';

export interface MuscleGroupCategory {
  id: string;
  name: string;
  arabicName: string;
  icon: string;
  color: string;
  description: string;
}

export const MUSCLE_GROUPS: MuscleGroupCategory[] = [
  { id: 'chest', name: 'Chest', arabicName: 'الصدر', icon: '🛡️', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', description: 'عضلات الصدر العلوية والوسطى والسفلية' },
  { id: 'back', name: 'Back', arabicName: 'الظهر', icon: '🦅', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30', description: 'اللاتس، الظهر الأوسط، وعضلات العمود الفقري' },
  { id: 'shoulders', name: 'Shoulders', arabicName: 'الأكتاف', icon: '⚡', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', description: 'الدالية الأمامية والجانبية والخلفية والترابيس' },
  { id: 'biceps', name: 'Biceps', arabicName: 'البايسبس', icon: '💪', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30', description: 'الرأس الطويل والقصير وعضلة البراكيلس' },
  { id: 'triceps', name: 'Triceps', arabicName: 'الترايسبس', icon: '🥊', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30', description: 'الرأس الطويل والجانبي والأوسط لذراع ضخمة' },
  { id: 'legs', name: 'Legs', arabicName: 'الأرجل', icon: '🦵', color: 'text-lime-400 bg-lime-500/10 border-lime-500/30', description: 'الفخذ الأمامي والخلفي والمؤخرة والسمانة' },
  { id: 'forearms', name: 'Forearms', arabicName: 'السواعد', icon: '✊', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', description: 'عضلات الساعد القابضة والباسطة وقوة القبضة' },
  { id: 'neck', name: 'Neck', arabicName: 'الرقبة', icon: '🛡️', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30', description: 'عضلات الرقبة والقصية الترقوية' }
];

export const EXERCISE_DATABASE: Record<string, ExerciseItem> = {
  // ================= CHEST =================
  'bench-press': {
    id: 'bench-press',
    name: 'بنش برس بالبار (مستوي)',
    targetMuscle: 'الصدر',
    targetMuscleDetail: 'ألياف الصدر الأوسط والأكبر (Pectoralis Major)',
    secondaryMuscles: 'الترايسبس، الدالية الأمامية',
    sets: '4×10',
    equipment: 'بار أولمبي + بنش مستوي',
    imageUrl: '/assets/exercises/chest-flat-barbell.gif',
    executionSteps: [
      'استلقِ على البنش مع تثبيت القدمين بإحكام على الأرض وسحب لوحي الكتف للخلف والأسفل.',
      'امسك البار بقبضة أوسع قليلاً من عرض الكتفين مع قفل الإبهام حول البار لحماية المعصم.',
      'أنزل البار ببطء وتحكم في مسار قوس خفيف حتى يلامس منتصف صدرك برفق.',
      'ادفع البار بقوة للأعلى بالاعتماد على عضلات الصدر مع تجنب قفل المرفقين تماماً في القمة.'
    ],
    commonMistakes: [
      'ارتطام البار بالصدر أو ارتداده بدلاً من التحكم في النزول.',
      'رفع المؤخرة عن البنش عند استخدام أوزان زائدة.'
    ],
    notes: 'تمرين الأساس الأول لبناء القوة والحجم العضلي الصدري.'
  },

  'incline-dumbbell-flyes': {
    id: 'incline-dumbbell-flyes',
    name: 'تفتيح دمبل مائل',
    targetMuscle: 'الصدر',
    targetMuscleDetail: 'ألياف الصدر العلوي (Clavicular Head)',
    secondaryMuscles: 'الكتف الأمامي',
    sets: '3×12',
    equipment: 'زوج دمبلز + بنش مائل (زاوية 30-45 درجة)',
    imageUrl: '/assets/exercises/chest-fly-dumbbell.gif',
    executionSteps: [
      'اجلس على بنش مائل بزاوية 30 إلى 45 درجة مع مسك الدمبلز للأعلى فوق الصدر.',
      'حافظ على انحناء طفيف وثابت في المرفقين طوال الحركة لحماية مفصل الكوع.',
      'افتح ذراعيك في قوس دائري واسع حتى تشعر بتمدد عميق ومريح في ألياف الصدر العلوي.',
      'اعصر عضلات الصدر لضم الدمبلز للأعلى مجدداً دون تصادمهما في القمة.'
    ],
    commonMistakes: [
      'ثني المرفقين بشدة أثناء النزول وتحويل التمرين إلى ضغط بالدمبل.',
      'المبالغة في عمق النزول مما يضع حملاً زائداً على أوتار الكتف.'
    ],
    notes: 'ركز على التمدد والتحكم الكامل أكثر من الوزن الثقيل.'
  },

  'incline-dumbbell-press': {
    id: 'incline-dumbbell-press',
    name: 'تجميع دمبل مائل علوي',
    targetMuscle: 'الصدر',
    targetMuscleDetail: 'الصدر العلوي مع مدى حركي حر ومستقل لكل يد',
    secondaryMuscles: 'الترايسبس، الكتف الأمامي',
    sets: '4×12',
    equipment: 'زوج دمبلز + بنش مائل',
    imageUrl: '/assets/exercises/chest-incline-dumbbell.gif',
    executionSteps: [
      'استند على بنش مائل وارفع الدمبلز بمستوى الكتفين مع سحب الكتف للخلف.',
      'ادفع الدمبلز للأعلى في مسار مائل خفيف للداخل مع الحفاظ على التوتر العضلي.',
      'أنزل الدمبلز ببطء حتى توازي مستوى أعلى الصدر للشعور بتمدد الألياف.',
      'كرر الحركة بسلاسة وتنفس منتظم.'
    ],
    commonMistakes: [
      'إسقاط الدمبلز للخارج بعيداً عن الجذع.',
      'عدم النزول لمدى حركي كامل.'
    ],
    notes: 'يساعد الدمبل على علاج أي عدم تناسق بين الجانبين الأيمن والأيسر.'
  },

  'incline-barbell-bench': {
    id: 'incline-barbell-bench',
    name: 'بنش برس بزاوية علوية (بالبار)',
    targetMuscle: 'الصدر',
    targetMuscleDetail: 'الرأس الترقوي للصدر العلوي لملء أعلى القفص الصدري',
    secondaryMuscles: 'الكتف الأمامي، الترايسبس',
    sets: '4×10',
    equipment: 'بنش مائل علوي + بار أولمبي',
    imageUrl: '/assets/exercises/chest-incline-barbell.gif',
    executionSteps: [
      'اضبط البنش بزاوية 30-45 درجة وامسك البار بقبضة مستقيمة متوازنة.',
      'أنزل البار ببطء تحت السيطرة حتى يلامس أعلى عظمة القص أسفل الرقبة بقليل.',
      'ادفع بقوة وثبات نحو الأعلى دون رفع رأسك عن المسند.'
    ],
    commonMistakes: ['اختيار زاوية شديدة الانحدار تنقل الحمل كله للكتف.'],
    notes: 'ممتاز لمنح الصدر مظهراً سميكاً وممتلئاً من الأعلى.'
  },

  'cable-crossover': {
    id: 'cable-crossover',
    name: 'كيبل كروس أوفر / ضغط صدر بالكيبل',
    targetMuscle: 'الصدر',
    targetMuscleDetail: 'عصر ألياف الصدر الداخلية والوسطى بتوتر مستمر',
    secondaryMuscles: 'الكتف الأمامي',
    sets: '3×15',
    equipment: 'جهاز الكيبل المزدوج (Dual Cable)',
    imageUrl: '/assets/exercises/chest-decline-cable.gif',
    executionSteps: [
      'امسك بمقابض الكيبل من الجهتين وتقدم خطوة للأمام مع تثبيت الجذع بميلان خفيف.',
      'حافظ على ثني خفيف وثابت في المرفقين واجمع يديك أمام صدرك كأنك تعانق برميلاً كبيراً.',
      'اعصر عضلات الصدر في نهاية الحركة لمدة ثانية كاملة.',
      'ارجع ببطء لمقاومة السحب والاستفادة من التمدد العضلي.'
    ],
    commonMistakes: ['استخدام عزم الجسم بدلاً من عزل عضلة الصدر.'],
    notes: 'الكيبل يوفر توتراً متواصلاً ومقاوماً حتى في ذروة الانقباض.'
  },

  // ================= SHOULDERS =================
  'military-press': {
    id: 'military-press',
    name: 'ضغط عسكري بالبار (أكتاف)',
    targetMuscle: 'الأكتاف',
    targetMuscleDetail: 'الدالية الأمامية والمتوسطة (Anterior & Medial Deltoid)',
    secondaryMuscles: 'الترايسبس، أعلى الصدر، عضلات الجذع والبطن',
    sets: '3×10',
    equipment: 'بار أولمبي (واقف أو جالس)',
    imageUrl: '/assets/exercises/shoulder-dumbbell-press.gif',
    executionSteps: [
      'قف مع مباعدة القدمين بعرض الكتفين مع شد عضلات البطن والأرداف لحماية الظهر.',
      'امسك البار عند مستوى عظمة الترقوة وأعلى الصدر.',
      'ادفع البار عمودياً لأعلى مع تمرير الرأس للأمام قليلاً بمجرد تجاوز البار لمستوى الجبين.',
      'أنزل البار بتحكم تام إلى وضع البداية.'
    ],
    commonMistakes: [
      'تقويس أسفل الظهر للخلف بشكل مفرط.',
      'دفع البار للأمام بدلاً من الدفع العمودي المستقيم.'
    ],
    notes: 'ملك تمارين الأكتاف لبناء القوة الصخرية والمظهر العريض.'
  },

  'seated-dumbbell-press': {
    id: 'seated-dumbbell-press',
    name: 'ضغط أكتاف دمبل جالس',
    targetMuscle: 'الأكتاف',
    targetMuscleDetail: 'الدالية الأمامية والجانبية بثبات كامل للجذع',
    secondaryMuscles: 'الترايسبس',
    sets: '4×10',
    equipment: 'زوج دمبلز + بنش عمودي بمسند ظهر',
    imageUrl: '/assets/exercises/shoulder-dumbbell-press.gif',
    executionSteps: [
      'اجلس مع إسناد ظهرك بالكامل على مسند البنش الرأسي.',
      'ارفع الدمبلز لمستوى الأذنين بحيث تكون راحة اليد متجهة للأمام.',
      'ادفع الدمبلز للأعلى حتى يتقاربا فوق رأسك دون تصادمهما.',
      'أنزل الدمبلز ببطء حتى يصل المرفقان إلى زاوية 90 درجة.'
    ],
    commonMistakes: ['النزول القصير جداً دون تحقيق المدى الحركي الكامل.'],
    notes: 'يوفر أماناً عالياً لأسفل الظهر بفضل مسند البنش.'
  },

  'lateral-raises': {
    id: 'lateral-raises',
    name: 'رفرفة جانبية دمبل',
    targetMuscle: 'الأكتاف',
    targetMuscleDetail: 'الدالية الجانبية (Lateral Deltoid) المسؤولة عن المظهر العريض الكروي',
    secondaryMuscles: 'الترابيس العليا (Trapezius)',
    sets: '3×15',
    equipment: 'زوج دمبلز خفيفة إلى متوسطة الوزن',
    imageUrl: '/assets/exercises/shoulder-lateral-raise.gif',
    executionSteps: [
      'قف باستقامة مع ميلان بسيط جداً للأمام وثني طفيف في الكوعين.',
      'ارفع الدمبلز جانبياً بقيادة الكوع (تخيل أنك تسكب إبريق ماء عند القمة).',
      'توقف عندما يصل المرفق لمستوى الكتف بالتوازي مع الأرض.',
      'أنزل الدمبلز ببطء في ثانيتين إلى 3 ثوان لمقاومة الجاذبية.'
    ],
    commonMistakes: [
      'استخدام وزن ثقيل والتأرجح بالظهر لرفعه.',
      'رفع الدمبلز أعلى من مستوى الكتف مما ينقل الحمل للترابيس.'
    ],
    notes: 'أهم تمرين على الإطلاق لبناء أكتاف ثلاثية الأبعاد وعريضة.'
  },

  'rear-delt-flyes': {
    id: 'rear-delt-flyes',
    name: 'رفرفة خلفية (Rear Delt)',
    targetMuscle: 'الأكتاف',
    targetMuscleDetail: 'الدالية الخلفية (Posterior Deltoid) وتوازن مفصل الكتف',
    secondaryMuscles: 'الترابيس الوسطى والعضلات المعينية',
    sets: '3×15',
    equipment: 'دمبلز خفيفة أو جهاز الفراشة الخلفي',
    imageUrl: '/assets/exercises/shoulder-lateral-raise.gif',
    executionSteps: [
      'انحنِ للأمام من مفصل الحوض حتى يوازي جذعك الأرض تقريباً مع ظهر مستقيم.',
      'احمل الدمبلز مع ثني طفيف في المرفقين ودع الذراعين تتدليان لأسفل.',
      'ارفع الذراعين للخارج والخلف بالاعتماد الحصري على عضلة الكتف الخلفي.',
      'اثبت في القمة لثانية ثم أنزل ببطء وتحكم.'
    ],
    commonMistakes: ['استخدام أوزان ثقيلة وتشغيل عضلات الظهر الكبيرة بدلاً من الكتف الخلفي.'],
    notes: 'ضروري جداً لحماية الكتف من الإصابات وتعديل انحناء الكتفين للأمام.'
  },

  'front-raises': {
    id: 'front-raises',
    name: 'رفع أمامي دمبل',
    targetMuscle: 'الأكتاف',
    targetMuscleDetail: 'الدالية الأمامية (Anterior Deltoid)',
    secondaryMuscles: 'أعلى الصدر',
    sets: '3×12',
    equipment: 'زوج دمبلز',
    imageUrl: '/assets/exercises/shoulder-lateral-raise.gif',
    executionSteps: [
      'قف مع حمل الدمبلز أمام فخذيك.',
      'ارفع ذراعاً للأمام باستقامة وتحكم حتى مستوى نظرك.',
      'أنزل ببطء ثم كرر باليد الأخرى أو ارفعهما معاً بتزامن متزن.'
    ],
    commonMistakes: ['التأرجح بالظهر لرمي الدمبلز للأعلى.'],
    notes: 'ركز على ثبات الجذع التام دون أي حركة مساعدة.'
  },

  'face-pull': {
    id: 'face-pull',
    name: 'فيس بول كيبل (Face Pull)',
    targetMuscle: 'الأكتاف',
    targetMuscleDetail: 'الكتف الخلفي، عضلات الكفة المدورة (Rotator Cuff)، والترابيس',
    secondaryMuscles: 'أعلى الظهر',
    sets: '3×15',
    equipment: 'كيبل بحبل مزدوج (Rope Attachment)',
    imageUrl: '/assets/exercises/shoulder-lateral-raise.gif',
    executionSteps: [
      'اضبط بكرة الكيبل عند مستوى الوجه أو أعلى قليلاً وامسك الحبل بقبضة إبهام للخلف.',
      'ارجع خطوة واسحب الحبل باتجاه وجهك وعينيك مع فتح المرفقين للخارج والأعلى.',
      'قم بتدوير المعصمين للخارج في نهاية الحركة لتقوية أوتار الكتف.',
      'اثبت في القمة لثانية ثم عد ببطء.'
    ],
    commonMistakes: ['السحب للأسفل باتجاه الصدر بدلاً من مستوى الوجه.'],
    notes: 'أفضل تمرين لصحة واستقامة مفصل الكتف وعلاج آلام التدريب.'
  },

  'shrugs': {
    id: 'shrugs',
    name: 'شراغز ترابيس دمبل أو بار',
    targetMuscle: 'الترابيس',
    targetMuscleDetail: 'عضلات الترابيس العليا (Upper Trapezius)',
    secondaryMuscles: 'عضلات الرقبة والقبضة',
    sets: '4×12',
    equipment: 'دمبلز ثقيلة أو بار أولمبي',
    imageUrl: '/assets/images/traps-shrugs.jpg',
    executionSteps: [
      'قف مستقيماً ممسكاً بالأوزان بجانب فخذيك مع فرد الذراعين.',
      'ارفع كتفيك للأعلى باتجاه أذنيك بأقصى مدى ممكن (حركة هز الكتف).',
      'اثبت لثانية في القمة للشعور بالانقباض الحاد للترابيس.',
      'أنزل الكتفين ببطء وتحكم كامل حتى أقصى تمدد.'
    ],
    commonMistakes: ['تدوير الكتفين في حلقة دائرية (حركة خطيرة وغير مجدية للغضاريف).'],
    notes: 'الحركة عمودية تماماً لأعلى ولأسفل بدون أي دوران.'
  },

  // ================= BACK =================
  'bent-over-row': {
    id: 'bent-over-row',
    name: 'تجديف بار منحني',
    targetMuscle: 'الظهر',
    targetMuscleDetail: 'العضلة العريضة الظهرية (Latissimus Dorsi) والترابيس الوسطى والقطنية',
    secondaryMuscles: 'البايسبس، الكتف الخلفي، أسفل الظهر',
    sets: '4×10',
    equipment: 'بار أولمبي محمل بالأوزان',
    imageUrl: '/assets/images/back-barbell-row.jpg',
    executionSteps: [
      'انحنِ بجذعك للأمام بزاوية 45 درجة مع ثني خفيف بالركبتين وظهر مستقيم ومشدود تماماً.',
      'امسك البار بقبضة أعرض قليلاً من الكتفين.',
      'اسحب البار باتجاه أسفل البطن والسرة بقيادة المرفقين للخلف والأعلى.',
      'اعصر عضلات الظهر في القمة ثم أنزل البار ببطء حتى يتمدد الظهر تماماً.'
    ],
    commonMistakes: [
      'تقوس العمود الفقري أو فقدان استقامة الظهر.',
      'رفع الجذع لأعلى أثناء السحب لتقليل المسافة.'
    ],
    notes: 'تمرين كلاسيكي لا غنى عنه لكثافة وسماكة عضلات الظهر.'
  },

  'lat-pulldown': {
    id: 'lat-pulldown',
    name: 'سحب أمامي كيبل (سحب ظهر واسع)',
    targetMuscle: 'الظهر',
    targetMuscleDetail: 'عضلة اللاتس العريضة لصنع شكل الـ V-Taper الأيقوني',
    secondaryMuscles: 'البايسبس، الكتف الخلفي، الترابيس السفلية',
    sets: '3×12',
    equipment: 'جهاز السحب العالي Lat Pulldown',
    imageUrl: '/assets/exercises/back-lat-pulldown.gif',
    executionSteps: [
      'اجلس مع تثبيت الفخذين بإحكام تحت وسادات التثبيت.',
      'امسك المقبض الواسع بقبضة عريضة مع ميلان طفيف جداً للجذع للخلف (10-15 درجة).',
      'اسحب البار لأسفل باتجاه أعلى صدرك مع توجيه المرفقين للأسفل والداخل.',
      'اصعد بالبار ببطء وتحكم لتمديد عضلات الظهر بالكامل.'
    ],
    commonMistakes: [
      'السحب خلف الرقبة (يسبب ضغطاً ضاراً على فقرات الرقبة والكتف).',
      'التأرجح العنيف للخلف واستخدام وزن الجسم في السحب.'
    ],
    notes: 'ركز على قيادة الحركة من المرفقين وليس سحب اليدين.'
  },

  'pull-ups': {
    id: 'pull-ups',
    name: 'عقلة (Pull-up)',
    targetMuscle: 'الظهر',
    targetMuscleDetail: 'عضلات الظهر العريضة وقوة الجزء العلوي الوظيفية',
    secondaryMuscles: 'البايسبس، عضلات الساعد والقبضة',
    sets: '4×8',
    equipment: 'بار العقلة المرتفع (Pull-up Bar)',
    imageUrl: '/assets/images/back-pullups.jpg',
    executionSteps: [
      'تعلق بالبار بقبضة واسعة تتجاوز عرض الكتفين وراحة اليد متجهة للأمام.',
      'اسحب صدرك للأعلى باتجاه البار بضم لوحي الكتف للخلف والأسفل.',
      'اصعد حتى يتجاوز ذقنك مستوى البار وتصل لأقصى انقباض في الظهر.',
      'أنزل جسمك ببطء وتحكم تام حتى تفرد ذراعيك بالكامل دون استرخاء المفصل.'
    ],
    commonMistakes: [
      'التأرجح واستخدام ركلات الساقين للصعود.',
      'عدم النزول للمدى الحركي الكامل.'
    ],
    notes: 'المعيار الذهبي لقوة الظهر وكتلته الصلبة.'
  },

  't-bar-row': {
    id: 't-bar-row',
    name: 'تجديف تي بار (T-Bar Row)',
    targetMuscle: 'الظهر',
    targetMuscleDetail: 'عمق وسماكة الظهر الأوسط والترابيس الوسطى والسفلية',
    secondaryMuscles: 'اللاتس، البايسبس، أسفل الظهر',
    sets: '3×10',
    equipment: 'جهاز T-Bar أو بار بأرضية محكمة ومقبض V',
    imageUrl: '/assets/images/back-barbell-row.jpg',
    executionSteps: [
      'قف فوق البار مع ثني الركبتين وميلان الجذع بزاوية 45 درجة مع ظهر مستقيم.',
      'امسك مقبض الـ V-Grip واسحبه بقوة باتجاه أسفل صدرك.',
      'اعصر لوحي الكتف معاً بقوة في القمة لثانية كاملة.',
      'أنزل الوزن بتحكم كامل للشعور بتمدد عضلات الظهر.'
    ],
    commonMistakes: ['رفع الجذع عمودياً أثناء السحب وضياع زاوية الاستهداف.'],
    notes: 'يمنحك زاوية قبضة مريحة لرفع أوزان قوية بأمان عالي.'
  },

  'one-arm-dumbbell-row': {
    id: 'one-arm-dumbbell-row',
    name: 'تجديف دمبل فردي (One Arm Row)',
    targetMuscle: 'الظهر',
    targetMuscleDetail: 'عضلة اللاتس لكل جانب باستقلالية وعزل عميق',
    secondaryMuscles: 'البايسبس، الكتف الخلفي',
    sets: '4×10',
    equipment: 'دمبل ثقيل + بنش مستوي للارتكاز',
    imageUrl: '/assets/images/back-barbell-row.jpg',
    executionSteps: [
      'ضع ركبة ويداً واحدة على البنش مع بقاء الظهر موازياً للأرض ومستقيماً.',
      'امسك الدمبل باليد الحرة مع تدلي الذراع لأسفل في تمدد كامل.',
      'اسحب الدمبل باتجاه جيب البنطال والمفصل الخلفي بقيادة المرفق.',
      'اعصر عضلات الظهر في القمة ثم أنزل ببطء.'
    ],
    commonMistakes: ['تدوير الجذع وفتحه للأعلى أثناء السحب.'],
    notes: 'ممتاز لزيادة المدى الحركي وعزل كل جانب من الظهر.'
  },

  'seated-cable-row': {
    id: 'seated-cable-row',
    name: 'سحب كيبل أرضي ضيق (Seated Cable Row)',
    targetMuscle: 'الظهر',
    targetMuscleDetail: 'الظهر الأوسط، المعينيات (Rhomboids)، والترابيس الوسطى',
    secondaryMuscles: 'البايسبس، الكتف الخلفي',
    sets: '3×12',
    equipment: 'جهاز السحب الأرضي + مقبض V ضيق',
    imageUrl: '/assets/exercises/back-seated-cable-row.gif',
    executionSteps: [
      'اجلس مع وضع القدمين على المساند وثني خفيف في الركبتين واستقامة الظهر.',
      'اسحب المقبض باتجاه السرة مع فتح الصدر للأمام ودفع الكتفين للخلف.',
      'اعصر لوحي الكتف معاً بشدة في القمة.',
      'أعد الوزن ببطء مع السماح للظهر بالتمدد دون تقوس العمود الفقري.'
    ],
    commonMistakes: ['الميل المفرط للأمام والخلف أثناء السحب.'],
    notes: 'تمرين رائع لإبراز تفاصيل عضلات الظهر الوسطى.'
  },

  // ================= BICEPS =================
  'barbell-curl': {
    id: 'barbell-curl',
    name: 'كيرل بار مستقيم / EZ',
    targetMuscle: 'الباي سبس',
    targetMuscleDetail: 'الرأس القصير والطويل للبايسبس (Biceps Brachii)',
    secondaryMuscles: 'عضلات الساعد (Brachioradialis)',
    sets: '3×12',
    equipment: 'بار أولمبي أو بار متعرج EZ',
    imageUrl: '/assets/exercises/arm-biceps-barbell.gif',
    executionSteps: [
      'قف باستقامة وثبّت المرفقين بجانب خصرك تماماً.',
      'امسك البار بقبضة تحتية بعرض الكتفين.',
      'ارفع البار للأعلى بقوة البايسبس حتى أقصى انقباض دون تحريك المرفقين للأمام.',
      'أنزل البار ببطء في ثانيتين إلى 3 ثوان حتى فرد الذراع بالكامل.'
    ],
    commonMistakes: [
      'تأرجح الخصر والظهر لمساعدة رفع البار.',
      'إسقاط البار بسرعة دون مقاومة النزول.'
    ],
    notes: 'الأساس الصلب لبناء ذراع وبايسبس ضخم وبارز.'
  },

  'concentration-curl': {
    id: 'concentration-curl',
    name: 'كيرل تركيز دمبل',
    targetMuscle: 'الباي سبس',
    targetMuscleDetail: 'عزل تام وقمة عضلة البايسبس (Bicep Peak)',
    secondaryMuscles: 'العضلة العضدية',
    sets: '3×12',
    equipment: 'دمبل + مقعد تدريب',
    imageUrl: '/assets/exercises/arm-biceps-hammer.gif',
    executionSteps: [
      'اجلس على طرف المقعد مع فتح الساقين بزاوية مريحة.',
      'ثبّت مرفقك في الجزء الداخلي من فخذك لمنع أي حركة مساعدة.',
      'ارفع الدمبل بتركيز شديد للأعلى باتجاه كتفك مع عصر البايسبس.',
      'اثبت في القمة لثانية ثم أنزل بتحكم كامل.'
    ],
    commonMistakes: ['رفع المرفق عن الفخذ أو الاستعانة بحركة الكتف.'],
    notes: 'من أفضل تمارين العزل التي استخدمها أبطال كمال الأجسام لبناء قمة البايسبس.'
  },

  'alternating-dumbbell-curl': {
    id: 'alternating-dumbbell-curl',
    name: 'كيرل دمبل تناوبي',
    targetMuscle: 'الباي سبس',
    targetMuscleDetail: 'البايسبس العضدي مع تدوير المعصم للقمة (Supination)',
    secondaryMuscles: 'السواعد',
    sets: '3×12',
    equipment: 'زوج دمبلز',
    imageUrl: '/assets/exercises/arm-biceps-barbell.gif',
    executionSteps: [
      'قف حاملاً الدمبلز بجانبك والراحة موجهة للداخل.',
      'ارفع ذراعاً واحدة مع تدوير المعصم للخارج تدريجياً لتواجه راحة يدك كتفك في القمة.',
      'اعصر البايسبس بشدة ثم أنزل ببطء وبدّل لليد الأخرى.'
    ],
    commonMistakes: ['التأرجح أو تحريك الكوعين للأمام.'],
    notes: 'تدوير المعصم يفعل أقصى انقباض تشريحي لعضلة البايسبس.'
  },

  'hammer-curls': {
    id: 'hammer-curls',
    name: 'كيرل هامر (المطرقة) دمبل',
    targetMuscle: 'الباي سبس',
    targetMuscleDetail: 'عضلة البراكيلس (Brachialis) لزيادة عرض وسماكة الذراع من الجانب',
    secondaryMuscles: 'عضلات الساعد الخارجية (Brachioradialis)',
    sets: '3×12',
    equipment: 'زوج دمبلز بقبضة محايدة',
    imageUrl: '/assets/exercises/arm-biceps-hammer.gif',
    executionSteps: [
      'قف مستقيماً ممسكاً بالدمبلز بقبضة محايدة (راحة اليد تواجه الأخرى كالمطرقة).',
      'ارفع الدمبلز للأعلى مع تثبيت المرفقين بجانب الجذع.',
      'اعصر عضلات الساعد والبراكيلس في القمة ثم أنزل ببطء.'
    ],
    commonMistakes: ['رفع المرفقين للأعلى أثناء الحركة.'],
    notes: 'يمنح الذراع مظهراً ثلاثي الأبعاد ويزيد من سمك الذراع عند ارتدائك للقميص.'
  },

  'preacher-curl': {
    id: 'preacher-curl',
    name: 'كيرل سكوت (Preacher Curl)',
    targetMuscle: 'الباي سبس',
    targetMuscleDetail: 'عزل الرأس القصير للبايسبس دون أي فرصة للغش أو المساعدة',
    secondaryMuscles: 'السواعد',
    sets: '3×12',
    equipment: 'بنش سكوت + بار EZ أو دمبل',
    imageUrl: '/assets/exercises/arm-biceps-barbell.gif',
    executionSteps: [
      'اجلس وثبّت الإبطين وأعلى الذراعين بإحكام على مسند بنش سكوت المائل.',
      'امسك البار بقبضة مريحة وارفع الوزن حتى انقباض البايسبس الكامل.',
      'أنزل البار ببطء شديد حتى يتبقى انحناء طفيف جداً لحماية أوتار الكوع.'
    ],
    commonMistakes: ['فرد الذراع بالكامل بعنف في الأسفل تحت أوزان ثقيلة.'],
    notes: 'عزل لا يرحم للبايسبس يعطيك ضخ دم أسطوري.'
  },

  // ================= TRICEPS =================
  'triceps-pushdown': {
    id: 'triceps-pushdown',
    name: 'بوش داون ترايسبس (كيبل)',
    targetMuscle: 'التراي سبس',
    targetMuscleDetail: 'الرأس الجانبي والخارجي للترايسبس (Lateral Head) لحذوة الحصان',
    secondaryMuscles: 'السواعد والقبضة',
    sets: '3×12',
    equipment: 'جهاز الكيبل + قبضة مستقيمة أو حبل (Rope)',
    imageUrl: '/assets/exercises/arm-triceps-pushdown.gif',
    executionSteps: [
      'قف أمام الكيبل مع ثبات الكوعين بمحاذاة خصرك وعدم تحريكهما مطلقاً.',
      'اضغط المقبض للأسفل بقوة الترايسبس حتى تفرد ذراعيك بالكامل.',
      'اعصر الترايسبس بقوة في الأسفل لثانية كاملة.',
      'عد للأعلى ببطء حتى تصل زاوية المرفق لـ 90 درجة فقط دون صعود الكوع.'
    ],
    commonMistakes: [
      'سماح الكوعين بالتحرك للأمام والخلف مع كل عدة.',
      'الانحناء الزائد بالجسم فوق الكيبل لدفعه بوزن الجسم.'
    ],
    notes: 'سر هذا التمرين هو ثبات المرفقين كالمسمار في جانبيك.'
  },

  'rope-pushdown': {
    id: 'rope-pushdown',
    name: 'بوش داون حبل كيبل',
    targetMuscle: 'التراي سبس',
    targetMuscleDetail: 'الرأس الجانبي والخارجي مع فتح الحبل في الأسفل لأقصى انقباض',
    secondaryMuscles: 'السواعد',
    sets: '4×12',
    equipment: 'جهاز الكيبل + ملحق الحبل (Rope Attachment)',
    imageUrl: '/assets/exercises/arm-triceps-pushdown.gif',
    executionSteps: [
      'امسك الحبل واضغط للأسفل مع تثبيت الكوعين بجانبك.',
      'افتح طرفي الحبل للخارج والأسفل في قاع الحركة لزيادة مدى الانقباض.',
      'اعصر الترايسبس بشدة ثم عد ببطء.'
    ],
    commonMistakes: ['إهمال فتح الحبل في الأسفل.'],
    notes: 'ملحق الحبل يسمح بحرية حركة مفصل الرسغ وعصر أعمق للألياف.'
  },

  'french-press': {
    id: 'french-press',
    name: 'مد ذراع خلفي بالدمبل (فرنش برس)',
    targetMuscle: 'التراي سبس',
    targetMuscleDetail: 'الرأس الطويل للترايسبس (Long Head) المسؤول عن ثلثي حجم الذراع',
    secondaryMuscles: 'أعلى الظهر والأكتاف كعضلات تثبيت',
    sets: '3×12',
    equipment: 'دمبل ثقيل بكلتا اليدين + مقعد بمسند',
    imageUrl: '/assets/exercises/arm-triceps-skullcrusher.gif',
    executionSteps: [
      'اجلس وارفع الدمبل فوق رأسك بكلتا اليدين تحت القرص العلوي للدمبل.',
      'ثبّت الكوعين موجهين للأعلى بالقرب من رأسك دون فتحهما للخارج.',
      'أنزل الدمبل ببطء خلف رأسك حتى تشعر بتمدد عميق في الرأس الطويل للترايسبس.',
      'ادفع الدمبل للأعلى بقوة الترايسبس حتى تفرد ذراعيك.'
    ],
    commonMistakes: ['فتح الكوعين للخارج بشكل مفرط مما يؤذي المفصل.'],
    notes: 'الرأس الطويل لا يتفعل بالكامل إلا عندما يكون الذراع مرفوعاً فوق الرأس.'
  },

  'overhead-cable-extension': {
    id: 'overhead-cable-extension',
    name: 'مد ترايسبس أوفر هيد بالكيبل',
    targetMuscle: 'التراي سبس',
    targetMuscleDetail: 'الرأس الطويل للترايسبس مع توتر مستمر وآمن على المفاصل',
    secondaryMuscles: 'السواعد',
    sets: '3×12',
    equipment: 'جهاز الكيبل بحبل أو بار مائل',
    imageUrl: '/assets/exercises/arm-triceps-pushdown.gif',
    executionSteps: [
      'امسك الحبل خلف رأسك وتقدم للأمام بجذع مائل قليلاً.',
      'افرد ذراعيك للأمام والأعلى حتى يكتمل انقباض الترايسبس.',
      'ارجع بالوزن ببطء للسماح بالتمدد الخلفي الكامل.'
    ],
    commonMistakes: ['تحريك المرفقين مع الحركة بدلاً من تثبيتهما.'],
    notes: 'أكثر أماناً على المرفقين مقارنة بالأوزان الحرة الخلفية.'
  },

  'free-descent-dips': {
    id: 'free-descent-dips',
    name: 'تمرين النزول الحر بوزن الجسم (Bodyweight Dips - النزول الحر)',
    targetMuscle: 'الترايسبس وأسفل الصدر',
    targetMuscleDetail: 'الرؤوس الثلاثة للترايسبس (Lateral, Long, Medial) وألياف الصدر السفلي',
    secondaryMuscles: 'الدالية الأمامية، عضلات الجذع والتثبيت، وعضلات لوح الكتف',
    sets: '4×10-12 (هبوط حر 3-4 ثوانٍ)',
    equipment: 'جهاز المتوازي (Parallel Bars) / وزن الجسم الحر',
    imageUrl: '/assets/images/free_descent_dips_anatomy.jpg',
    executionSteps: [
      'اصعد على عارضتي المتوازي وثبت جسمك بالكامل في الهواء مع استقامة الذراعين وسحب الكتفين للخلف والأسفل.',
      'ابدأ مرحلة "النزول الحر المتحكم به" (Eccentric Free Descent): اهبط بجسمك ببطء وسلاسة على مدار 3 إلى 4 ثوانٍ ضد الجاذبية.',
      'حافظ على انحناء خفيف في الجذع للأمام (15-20 درجة) لدمج الصدر السفلي، أو استقامة رأسية لعزل رؤوس الترايسبس.',
      'توقف لثانية واحدة عند وصول المرفقين لزاوية 90 درجة مع الشعور بأقصى تمدد عضلي آمن.',
      'ادفع بقوة للأعلى بالاعتماد على انقباض الترايسبس وعضلات الصدر حتى العودة لوضع البداية مع عصر العضلة في القمة دون قفل المرفقين بعنف.'
    ],
    commonMistakes: [
      'الهبوط السريع والارتطام في القاع بدون مقاومة النزول الحر مما يعرض أربطة الكتف للتمزق.',
      'النزول الزائد عن زاوية 90 درجة مما يضع حملاً سلبياً على محفظة الكتف.',
      'تأرجح الساقين واستخدام قوة الدفع الارتدادية بدلاً من التحكم العضلي النقي.'
    ],
    notes: 'تمرين النزول الحر (Dips) هو الأساس الأقوى لبناء الحجم العضلي الهائل للذراعين والصدر السفلي؛ مقاومة الهبوط لـ 3 ثوانٍ تحفز أكبر قدر ممكن من الوحدات الحركية.',
    alternatives: [
      {
        name: 'ديبس متوازي بمساعدة الماكينة (Assisted Dips)',
        equipment: 'ماكينة المتوازي بوزن مساعد',
        type: 'machine',
        typeLabel: 'ماكينة مساعدة',
        imageUrl: '/assets/exercises/arm-triceps-pushdown.gif',
        notes: 'خيار ممتاز للمبتدئين لضبط التكنيك والنزول الحر بوزن مخفف تدريجياً.'
      },
      {
        name: 'ديبس على البنش بالأوزان الحرة (Bench Dips)',
        equipment: 'بنش مستوي + وزن حر على الفخذين',
        type: 'dumbbell',
        typeLabel: 'بنش حر',
        imageUrl: '/assets/exercises/arm-triceps-skullcrusher.gif',
        notes: 'بديل رائع في حال انشغال جهاز المتوازي في الصالة، يعزل الترايسبس بقوة.'
      },
      {
        name: 'ترايسبس بوش داون بالكيبل (Cable Triceps Pushdown)',
        equipment: 'جهاز الكيبل بالحبل أو المسطرة',
        type: 'cable',
        typeLabel: 'كيبل مقاومة مستمرة',
        imageUrl: '/assets/exercises/arm-triceps-pushdown.gif',
        notes: 'يوفر توتراً عضلياً مستمراً طوال مدى الحركة ومناسب جداً للمفاصل الحساسة.'
      }
    ]
  },

  'tricep-dips': {
    id: 'tricep-dips',
    name: 'ديبس متوازي - تمرين النزول الحر (Triceps Dips)',
    targetMuscle: 'التراي سبس',
    targetMuscleDetail: 'الرؤوس الثلاثة للترايسبس بقوة وزن الجسم ومقاومة النزول الحر',
    secondaryMuscles: 'أسفل الصدر، الكتف الأمامي',
    sets: '4×12 (هبوط 3 ثوانٍ)',
    equipment: 'جهاز المتوازي (Parallel Bars)',
    imageUrl: '/assets/images/free_descent_dips_anatomy.jpg',
    executionSteps: [
      'احمل وزن جسمك على المتوازي مع إبقاء الجذع مستقيماً وعمودياً قدر الإمكان.',
      'أنزل ببطء وتحكم بمرحلة النزول الحر لـ 3 ثوانٍ حتى تصل لزاوية 90 درجة.',
      'ادفع بقوة للأعلى للتمدد والتقلص الكامل في الترايسبس مع عصر العضلة.'
    ],
    commonMistakes: [
      'الميل للأمام بشكل كبير (ينقل الحمل للصدر بدلاً من الترايسبس).',
      'النزول الزائد الذي يجهد أوتار الكتف.'
    ],
    notes: 'تمرين النزول الحر كلاسيكي وفعال للغاية لزيادة كتلة الذراعين وتفجير الترايسبس.',
    alternatives: [
      {
        name: 'ديبس متوازي بوزن الجسم الحر (Free Descent Dips)',
        equipment: 'جهاز المتوازي',
        type: 'bodyweight',
        typeLabel: 'وزن الجسم الحر',
        imageUrl: '/assets/images/free_descent_dips_anatomy.jpg',
        notes: 'تمرين النزول الحر الأصلي لأعلى تفعيل عصبي عضلي.'
      },
      {
        name: 'ترايسبس بوش داون بالكيبل',
        equipment: 'جهاز الكيبل',
        type: 'cable',
        typeLabel: 'كيبل',
        imageUrl: '/assets/exercises/arm-triceps-pushdown.gif',
        notes: 'مقاومة مستمرة وحماية للمفاصل.'
      }
    ]
  },

  // ================= LEGS =================
  'barbell-squat': {
    id: 'barbell-squat',
    name: 'سكوات بالبار الحر',
    targetMuscle: 'الأرجل',
    targetMuscleDetail: 'العضلات الرباعية للفخذ (Quads)، المؤخرة (Glutes)، وأوتار الركبة',
    secondaryMuscles: 'عضلات الجذع، أسفل الظهر، والسمانة',
    sets: '4×10',
    equipment: 'قفص السكوات Squat Rack + بار أولمبي',
    imageUrl: '/assets/exercises/leg-squat.gif',
    executionSteps: [
      'ضع البار على عضلات الترابيس العليا وقف بقدمين أوسع قليلاً من الكتفين مع توجيه أصابع القدم للخارج قليلاً.',
      'خذ نفساً عميقاً في بطنك واقفل عضلات الجذع لدعم أسفل الظهر.',
      'انزل للخلف والأسفل كأنك تجلس على كرسي منخفض حتى يوازي فخذاك الأرض.',
      'ادفع الأرض بكعبيك للعودة لوضع البداية بقوة وثبات مع زفير قوي.'
    ],
    commonMistakes: [
      'انهيار الركبتين للداخل أثناء الدفع للأعلى.',
      'رفع الكعبين عن الأرض أو تقوس الظهر للأمام.'
    ],
    notes: 'ملك تمارين الأرجل وإفراز هرمون التستوستيرون الطبيعي في الجسم.'
  },

  'leg-press': {
    id: 'leg-press',
    name: 'دفع رجلين (Leg Press)',
    targetMuscle: 'الأرجل',
    targetMuscleDetail: 'عضلات الفخذ الأمامية (Quadriceps) بأوزان عالية وبأمان تام',
    secondaryMuscles: 'المؤخرة والأوتار الخلفية',
    sets: '4×12',
    equipment: 'جهاز دفع الأرجل Leg Press Machine (زاوية 45 درجة)',
    imageUrl: '/assets/exercises/leg-press.gif',
    executionSteps: [
      'اجلس مع تثبيت ظهرك ومؤخرتك بإحكام على المسند الخلفي.',
      'ضع قدميك في منتصف المنصة بعرض الكتفين.',
      'افتح قفل الأمان وأنزل المنصة ببطء حتى تصبح ركبتاك بزاوية 90 درجة تقريباً.',
      'ادفع المنصة بقوة بكعبيك مع تجنب قفل الركبتين تماماً في القمة لحماية المفصل.'
    ],
    commonMistakes: [
      'قفل مفصل الركبة تماماً في القمة (خطأ كارثي قد يسبب كسر المفصل).',
      'رفع أسفل الظهر عن المسند أثناء النزول العميق.'
    ],
    notes: 'أداة جبارة لبناء عضلات فخذ ضخمة بأقل حمل على العمود الفقري.'
  },

  'romanian-deadlift': {
    id: 'romanian-deadlift',
    name: 'رومانيان ديدليفت',
    targetMuscle: 'الأرجل',
    targetMuscleDetail: 'أوتار الركبة والفخذ الخلفي (Hamstrings) وعضلات المؤخرة',
    secondaryMuscles: 'أسفل الظهر، الترابيس، وعضلات الساعد',
    sets: '3×10',
    equipment: 'بار أولمبي أو زوج دمبلز ثقيلة',
    imageUrl: '/assets/exercises/leg-romanian-deadlift.gif',
    executionSteps: [
      'قف باستقامة حاملاً البار عند فخذيك مع انحناء خفيف وثابت في الركبتين.',
      'ادفع الحوض والمؤخرة للخلف مع النزول بالبار بمحاذاة ساقيك وظهر مستقيم كالمسطرة.',
      'توقف عند الشعور بتمدد عميق في الفخذ الخلفي (عند منتصف الساق تقريباً).',
      'ادفع الحوض للأمام للعودة للوقوف مع عصر عضلات المؤخرة في القمة.'
    ],
    commonMistakes: [
      'تقوس العمود الفقري أثناء النزول بالوزن.',
      'ثني الركبتين الزائد وتحويل التمرين إلى سكوات.'
    ],
    notes: 'التمرين الأقوى لبناء فخذ خلفي سميك وحماية أوتار الركبة من التمزق.'
  },

  'leg-extension': {
    id: 'leg-extension',
    name: 'مد رجل أمامي (Leg Extension)',
    targetMuscle: 'الأرجل',
    targetMuscleDetail: 'عزل تام للفخذ الأمامي (Quadriceps) وإبراز خطوط العضلة',
    secondaryMuscles: 'أوتار الرضفة',
    sets: '3×15',
    equipment: 'جهاز مد الأرجل الأمامي',
    imageUrl: '/assets/exercises/leg-extension.gif',
    executionSteps: [
      'اجلس مع ضبط مسند الظهر ليكون مفصل ركبتك محاذياً لمحور دوران الجهاز.',
      'ضع الوسادة فوق كاحليك مباشرة.',
      'ارفع الساقين للأعلى حتى الاستقامة التامة مع عصر الفخذ الأمامي لثانية.',
      'أنزل الوزن ببطء وتحكم دون تركه يرتطم.'
    ],
    commonMistakes: ['استخدام نتر سريع للوزن بدلاً من التحكم العضلي.'],
    notes: 'ممتاز في نهاية يوم الأرجل لضخ الدم وعصر كل ما تبقى في الفخذ.'
  },

  'leg-curl': {
    id: 'leg-curl',
    name: 'ثني رجل خلفي جالس أو نائم',
    targetMuscle: 'الأرجل',
    targetMuscleDetail: 'عضلة الفخذ الخلفي ذات الرأسين (Biceps Femoris)',
    secondaryMuscles: 'السمانة',
    sets: '4×12',
    equipment: 'جهاز ثني الأرجل الخلفي (Lying or Seated Leg Curl)',
    imageUrl: '/assets/exercises/leg-curl.gif',
    executionSteps: [
      'استلقِ على الجهاز وضع الوسادة خلف كاحليك أسفل عضلة السمانة.',
      'اثنِ الساقين للأعلى بقوة الفخذ الخلفي حتى يقترب الكاحل من المؤخرة.',
      'اثبت في القمة لثانية للشعور بالانقباض الحاد.',
      'أنزل ببطء لمقاومة الوزن والشعور بالتمدد.'
    ],
    commonMistakes: ['رفع الحوض عن المقعد أثناء سحب الوزن.'],
    notes: 'ضروري لتحقيق التوازن بين عضلات الفخذ الأمامية والخلفية.'
  },

  'calf-raise': {
    id: 'calf-raise',
    name: 'رفع بطات واقف (Calf Raise)',
    targetMuscle: 'البطات (السمانة)',
    targetMuscleDetail: 'عضلات السمانة التوأمية والنعلية (Gastrocnemius & Soleus)',
    secondaryMuscles: 'أوتار الكاحل وقوس القدم',
    sets: '4×20',
    equipment: 'جهاز السمانة أو لوح رفع الكعبين بالدمبل',
    imageUrl: '/assets/exercises/leg-calf-raise.gif',
    executionSteps: [
      'قف بمشطي قدميك على حافة المنصة مع تدلي الكعبين للخارج.',
      'أنزل الكعبين لأسفل نقطة ممكنة للشعور بتمدد عميق في السمانة.',
      'ادفع بمشطي القدمين للأعلى بأقصى ارتفاع ممكن كأنك تقف على رؤوس أصابعك.',
      'اثبت في القمة لثانيتين مع عصر السمانة بشدة ثم أنزل ببطء.'
    ],
    commonMistakes: ['الارتداد السريع دون ثبات في القمة والتمدد في الأسفل.'],
    notes: 'السمانة عضلة قوية تحتاج إلى مدى حركي كامل وثبات في القمة لتستجيب للنمو.'
  },

  // ================= FOREARMS & NECK =================
  'wrist-curl': {
    id: 'wrist-curl',
    name: 'كيرل معصم بالبار (سواعد)',
    targetMuscle: 'السواعد',
    targetMuscleDetail: 'عضلات الساعد القابضة الداخلية وقوة قبضة اليد',
    secondaryMuscles: 'أصابع اليد ومفصل المعصم',
    sets: '3×15',
    equipment: 'بار مستقيم + بنش للارتكاز',
    imageUrl: '/assets/images/forearms-wrist-curl.jpg',
    executionSteps: [
      'اجلس مع تثبيت ساعديك على فخذيك مع تدلي المعصمين خارج الركبتين.',
      'امسك البار بقبضة سفلية (راحة اليد للأعلى).',
      'أنزل البار ببطء حتى أطراف الأصابع.',
      'اقفل الأصابع وارفع المعصم للأعلى بأقصى انقباض في الساعد.'
    ],
    commonMistakes: ['رفع الساعدين عن الفخذين أثناء الرفع.'],
    notes: 'يقوي قبضة اليد لرفع أوزان أثقل في الديدليفت والظهر.'
  },

  'reverse-wrist-curl': {
    id: 'reverse-wrist-curl',
    name: 'كيرل معصم عكسي',
    targetMuscle: 'السواعد',
    targetMuscleDetail: 'عضلات الساعد الباسطة الخارجية والعضدية الكعبرية',
    secondaryMuscles: 'أوتار المعصم',
    sets: '3×15',
    equipment: 'بار خفيف أو زوج دمبلز',
    imageUrl: '/assets/images/forearms-wrist-curl.jpg',
    executionSteps: [
      'ثبّت ساعديك على فخذيك بقبضة علوية (راحة اليد لأسفل).',
      'ارفع المعصمين للأعلى بالاعتماد على عضلات الساعد العلوية.',
      'اثبت ثانية في القمة ثم أنزل ببطء.'
    ],
    commonMistakes: ['استخدام وزن زائد يسبب إجهاداً لمفصل الرسغ.'],
    notes: 'يوازن عضلات الساعد ويحمي من آلام مرفق لاعب الجولف والتنس.'
  },

  'neck-flexion': {
    id: 'neck-flexion',
    name: 'رفع رقبة (Neck Flexion)',
    targetMuscle: 'الرقبة',
    targetMuscleDetail: 'عضلات الرقبة والقصية الترقوية الخشائية (Sternocleidomastoid)',
    secondaryMuscles: 'أعلى الترابيس',
    sets: '3×15',
    equipment: 'وزن خفيف جداً + منشفة واقية أو مقاومة اليدين',
    imageUrl: '/assets/images/traps-shrugs.jpg',
    executionSteps: [
      'استلقِ على بنش مستوي مع بروز رأسك خارج حافة البنش بحرية.',
      'ضع وزناً خفيفاً جداً فوق منشفة ناعمة على جبهتك وثبته بيديك بخفة.',
      'أنزل رأسك ببطء شديد للخلف لتحقيق التمدد الآمن.',
      'ارفع رأسك للأعلى ببطء لتقريب الذقن من الصدر ثم كرر.'
    ],
    commonMistakes: ['الحركات المفاجئة السريعة أو استخدام أوزان ثقيلة دون تدرج.'],
    notes: 'تمرين ممتاز لبناء رقبة قوية ومقاومة للصدمات والإصابات.'
  },

  // ================= SUPER-SETS =================
  'superset-arms-1': {
    id: 'superset-arms-1',
    name: 'سوبر سيت: بار مستقيم باي + بوش داون تراي',
    targetMuscle: 'الباي + التراي',
    targetMuscleDetail: 'ضخ دم مضاعف في كلا جانبي الذراع بالتناوب دون راحة',
    secondaryMuscles: 'السواعد',
    sets: '4×10',
    equipment: 'بار أولمبي + جهاز الكيبل',
    imageUrl: '/assets/exercises/arm-biceps-barbell.gif',
    executionSteps: [
      'قم بأداء جولة كيرل بالبار للبايسبس (10 عدات).',
      'انتقل مباشرة دون راحة لجهاز الكيبل وقم بأداء بوش داون للترايسبس (10 عدات).',
      'خذ راحة 60-90 ثانية بعد إنهاء كلا التمرينين ثم كرر.'
    ],
    commonMistakes: ['الراحة بين التمرينين داخل الجولة الواحدة.'],
    notes: 'سوبر سيت كلاسيكي يملأ الذراع بالدم ويحفز نمواً عضلياً سريعاً.'
  },

  'superset-arms-2': {
    id: 'superset-arms-2',
    name: 'سوبر سيت: دمبل مائل باي + متوازي ديبس',
    targetMuscle: 'الباي + التراي',
    targetMuscleDetail: 'تمدد عميق للبايسبس يليه ضغط جبار للترايسبس',
    secondaryMuscles: 'الصدر والكتف',
    sets: '3×12',
    equipment: 'دمبلز + بنش مائل + جهاز المتوازي',
    imageUrl: '/assets/exercises/arm-triceps-skullcrusher.gif',
    executionSteps: [
      'ابدأ بكيرل دمبل على بنش مائل (12 عدة) لتمديد ألياف البايسبس.',
      'انتقل فوراً لجهاز المتوازي وقم بأداء 12 عدة ديبس للترايسبس.',
      'استرح 90 ثانية قبل الجولة التالية.'
    ],
    commonMistakes: ['إهمال التكنيك من أجل السرعة.'],
    notes: 'يجمع بين التمدد الحركي الأقصى للباي وقوة وزن الجسم للتراي.'
  }
};

/**
 * Helper to get a rich ExerciseItem by exercise id or partial match
 */
export function getExerciseById(id: string, fallbackName?: string): ExerciseItem {
  let item: ExerciseItem;
  if (EXERCISE_DATABASE[id]) {
    item = { ...EXERCISE_DATABASE[id] };
  } else {
    // Look for match by name keywords
    const allExercises = Object.values(EXERCISE_DATABASE);
    const match = fallbackName
      ? allExercises.find((ex) => 
          fallbackName.includes(ex.name) || ex.name.includes(fallbackName) ||
          (ex.targetMuscle && fallbackName.includes(ex.targetMuscle))
        )
      : null;
    item = { ...(match || allExercises[0]) };
  }

  // Guarantee image accurately matches target muscle
  item.imageUrl = getAccurateExerciseImage(item);
  return item;
}
