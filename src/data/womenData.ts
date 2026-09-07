import { WomenWorkoutDay, WomenProgramOption, WomenWeightGoalPlan, CyclePhaseInfo } from '../types';

// ==========================================
// 1. برامج تمارين النساء 3 أيام (أكثر من خيار)
// ==========================================

export const WOMEN_3DAY_PROGRAMS: WomenProgramOption[] = [
  {
    id: 'hourglass-sculpt',
    name: 'الخيار الأول: نحت الألوية والخصر وقوام الساعة الرملية (Hourglass Sculpt)',
    badge: 'الأكثر طلباً • نحت وشد الألوية والخصر ⏳',
    description: 'برنامج تدريبي مخصص 3 أيام بالأسبوع (مثلاً: السبت - الإثنين - الأربعاء)، يركز بشكل مكثف على رفع وشد الألوية، تنحيف ونحت محيط الخصر، وشد ترهلات الظهر والذراعين بدون تضخيم غير مرغوب.',
    idealFor: 'البنات والسيدات الراغبات في شد الترهلات، رسم وبروز المؤخرة، وتصغير محيط الخصر.',
    frequency: '3 أيام تدريب + 4 أيام راحة (مثال: سبت - إثنين - أربعاء أو أحد - ثلاثاء - خميس)',
    days: [
      {
        dayName: 'اليوم الأول (السبت أو الأحد)',
        title: 'نحت وبروز الألوية والفخذ الخلفي (Glutes & Hamstrings Focus)',
        focusArea: 'المؤخرة، الألوية العلوية، خط الفصل أسفل المؤخرة، وأوتار الركبة',
        badge: 'تركيز أقصى على الجزء السفلي 🍑',
        description: 'تمارين عزل ومركبة مختارة بعناية لتحفيز عضلات الألوية الثلاثية بدون زيادة حجم غير مرغوب في الفخذ الأمامي.',
        exercises: [
          {
            id: 'w1-1',
            name: 'هيب ثرست بالبار أو شريط المقاومة (Barbell / Band Hip Thrust)',
            targetMuscle: 'المؤخرة والألوية (Gluteus Maximus)',
            targetMuscleDetail: 'التمرين رقم #1 عالمياً لرفع وشد عضلات الألوية وبروز القوام المتناسق',
            sets: '4 مجموعات × 12 تكرار (ثبات ثانية في القمة)',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/women-hip-thrust.gif',
            equipment: 'بنش مبطن + بار مبطن أو حزام مقاومة',
            category: 'free',
            executionSteps: [
              'اسندي أعلى ظهرك (تحت لوحي الكتف) على حافة البنش، وضعي البار أو الوزن فوق عظام الحوض مع وسادة حماية.',
              'اثبتي القدمين بعرض الحوض وادفعي بكعبي القدمين للأعلى حتى يصبح الفخذان والجذع في خط مستقيم.',
              'اعصري عضلات المؤخرة بقوة في القمة لمدة ثانية كاملة، ثم انزلي ببطء وتحكم.'
            ],
            tips: 'لا تقوّسي أسفل ظهرك، اجعلي الحركة تأتي بالكامل من مفصل الحوض وعصر الألوية.',
            alternatives: [
              {
                name: 'جسر الحوض الأرضي بالأوزان (Glute Bridge)',
                type: 'free' as any,
                typeLabel: 'أرضي بالدمبل / بار',
                category: 'free',
                equipment: 'مات أرضية + دمبل أو بار',
                animationUrl: '/assets/exercises/women-glute-bridge.gif',
                notes: 'أسهل على الظهر وممتاز جداً للمبتدئات'
              },
              {
                name: 'هيب ثرست على جهاز سميث (Smith Machine Hip Thrust)',
                type: 'machine' as any,
                typeLabel: 'ماكينة سميث',
                category: 'machine',
                equipment: 'جهاز سميث ببار محكوم',
                animationUrl: '/assets/exercises/women-hip-thrust.gif',
                notes: 'أمان وثبات فائق للتركيز على العصر العضلي'
              }
            ]
          },
          {
            id: 'w1-2',
            name: 'ديدلفت روماني بالدمبلز (Dumbbell Romanian Deadlift - RDL)',
            targetMuscle: 'أوتار الفخذ الخلفي وأسفل المؤخرة (Hamstrings & Glute Tie-in)',
            targetMuscleDetail: 'شد الفخذ من الخلف ورفع خط المؤخرة وفصل العضلة لمظهر مشدود وأنيق',
            sets: '3 مجموعات × 12 تكرار',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-romanian-deadlift.gif',
            equipment: 'زوج دمبلز بوزن معتدل',
            category: 'free',
            executionSteps: [
              'قفي باستقامة مع فتح القدمين بعرض الحوض والإمساك بالدمبلين أمام الفخذين.',
              'ادفعي المؤخرة للخلف مع ثني خفيف جداً في الركبتين، وتمرير الدمبلين ملاصقين للساقين حتى منتصف القصبة.',
              'اشعري بتمدد قوي في أوتار الفخذ الخلفية ثم ارجعي للأعلى بدفع الحوض للأمام.'
            ],
            tips: 'حافظي على استقامة الظهر وعينيك للأمام والأسفل، وتجنبي انحناء العمود الفقري.',
            alternatives: [
              {
                name: 'ديدلفت روماني بساق واحدة (Single Leg RDL)',
                type: 'dumbbell' as any,
                typeLabel: 'دمبل فردي',
                category: 'free',
                equipment: 'دمبل واحد + تركيز على التوازن',
                animationUrl: '/assets/exercises/leg-romanian-deadlift.gif',
                notes: 'تحسين التوازن ونحت كل ساق وألوية بشكل منفصل'
              }
            ]
          },
          {
            id: 'w1-3',
            name: 'ركلات المؤخرة بالكيبل للخلف (Cable Glute Kickbacks)',
            targetMuscle: 'أعلى المؤخرة والجوانب (Glute Isolation)',
            targetMuscleDetail: 'عزل تام للجزء العلوي من المؤخرة للحصول على قوام مستدير وممتلئ بدون إشراك الفخذ',
            sets: '3 مجموعات × 15 تكرار لكل ساق',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/women-cable-kickback.gif',
            equipment: 'جهاز الكيبل السفلي مع حزام الكاحل',
            category: 'machine',
            executionSteps: [
              'ثبتي الحزام حول الكاحل ووصّليه بالبكرة السفلية، ثم ميلي بالجذع للأمام 45 درجة مع التمسك بالعمود.',
              'اركلي الساق للخلف وللأعلى بزاوية خفيفة للخارج مع عصر المؤخرة بقوة في القمة.',
              'ارجعي ببطء وتحكم تام دون أرجحة الجذع.'
            ],
            tips: 'لا تبالغي في رفع الساق لدرجة تقويس الظهر، التركيز فقط على عصر الألوية.',
            alternatives: [
              {
                name: 'ركلات دونكي بالأوزان أو شريط المقاومة (Donkey Kicks)',
                type: 'bodyweight' as any,
                typeLabel: 'أرضي بحزام مقاومة',
                category: 'bodyweight',
                equipment: 'مات أرضية + حلقة مطاطية',
                animationUrl: '/assets/exercises/women-cable-kickback.gif',
                notes: 'تمرين كلاسيكي رائع وسهل التطبيق في أي وقت'
              }
            ]
          },
          {
            id: 'w1-4',
            name: 'سكوات بلغاري بالدمبلز (Bulgarian Split Squat)',
            targetMuscle: 'الألوية والفخذ المندمج (Glutes & Quad Integration)',
            targetMuscleDetail: 'نحت عميق وتفصيل لكل ساق على حدة وتصحيح التناسق العضلي وشد الترهلات',
            sets: '3 مجموعات × 10 تكرارات لكل ساق',
            imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-squat.gif',
            equipment: 'بنش + زوج دمبلز خفيف',
            category: 'free',
            executionSteps: [
              'ضعي مشط القدم الخلفية على البنش، وقدمي الساق الأمامية بمسافة كافية للأمام.',
              'انزلي بالركبة الخلفية نحو الأرض مع ميل خفيف بالجذع للأمام لزيادة الحمل على المؤخرة.',
              'ادفعي بكعب القدم الأمامية للعودة للأعلى.'
            ],
            tips: 'الميل للأمام قليلاً ينقل الجهد من الفخذ الأمامي إلى عضلات المؤخرة بامتياز.',
            alternatives: []
          },
          {
            id: 'w1-5',
            name: 'جهاز إبعاد الفخذين لشد الجوانب (Seated Hip Abduction Machine)',
            targetMuscle: 'المؤخرة الجانبية وعضلة الخفسة (Gluteus Medius)',
            targetMuscleDetail: 'ملء زوايا الحوض الجانبية وشد المنطقة المحيطة بعظام الحوض والتخلص من مظهر الخفسة',
            sets: '4 مجموعات × 15 تكرار (مع ثبات ثانيتين عند الفتح)',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-extension.gif',
            equipment: 'جهاز إبعاد الفخذين Abductor Machine',
            category: 'machine',
            executionSteps: [
              'اجلسي على الجهاز مع إرجاع الظهر للخلف أو الميل للأمام قليلاً لاستهداف زاوية مختلفة.',
              'افتحي الساقين للخارج بأقصى مدى حركي واثبتي ثانيتين عند أقصى اتساع.',
              'اغلقي الساقين ببطء شديد تحت مقاومة الأوزان.'
            ],
            tips: 'يمكنك أداء مجموعتين بظهر مستند ومجموعتين مع الميل للأمام لاستهداف ألياف المؤخرة بالكامل.',
            alternatives: []
          }
        ]
      },
      {
        dayName: 'اليوم الثاني (الإثنين أو الثلاثاء)',
        title: 'شد الجزء العلوي، نحت الخصر وتصحيح القوام (Upper Body & Waist)',
        focusArea: 'الظهر، ترهلات الذراعين والزنود، الصدر الخفيف، والبطن المسطح',
        badge: 'قوام ممشوق ومشدود 💃',
        description: 'تمارين مصممة خصيصاً للمرأة لمنح الظهر مظهراً أنيقاً ومشدوداً، شد ترهلات الذراعين والزنود، وتصحيح انحناء الأكتاف بدون أي تضخيم غير مرغوب فيه.',
        exercises: [
          {
            id: 'w1-6',
            name: 'سحب ظهر عالي ماكينة بقبضة واسعة (Lat Pulldown Machine)',
            targetMuscle: 'عضلات الظهر العلوية وتحسين القوام (Upper Back & Lats)',
            targetMuscleDetail: 'شد ترهلات الظهر الجانبية وإبراز الخصر بشكل أضيق وأرشق (V-Taper أنثوي ناعم)',
            sets: '3 مجموعات × 12 تكرار',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            animationUrl: '/assets/exercises/back-lat-pulldown.gif',
            equipment: 'جهاز السحب العالي بالكيبل',
            category: 'machine',
            executionSteps: [
              'اجلسي وثبتي الفخذين تحت المسند، امسكي البار بقبضة أوسع من الكتفين قليلاً.',
              'اسحبي البار باتجاه أعلى الصدر مع إرجاع الكتفين للخلف وسحب لوحي الكتف معاً.',
              'اصعدي بالبار للأعلى ببطء لتحصلي على تمدد كامل للظهر.'
            ],
            tips: 'تخيلي أنك تسحبين الكوعين باتجاه جيوب بنطالك الخلفية وليس بالذراعين.',
            alternatives: []
          },
          {
            id: 'w1-7',
            name: 'سحب أرضي كيبل بمسند صدر أو تجديف جالس (Seated Cable Row)',
            targetMuscle: 'الظهر الأوسط واللوحين (Mid Back & Posture)',
            targetMuscleDetail: 'محاربة انحناء وتحدب الكتفين الناتج عن الجلوس الطويل والموبايل وشد منتصف الظهر',
            sets: '3 مجموعات × 12 تكرار',
            imageUrl: '/assets/images/back-barbell-row.jpg',
            animationUrl: '/assets/exercises/back-seated-cable-row.gif',
            equipment: 'جهاز التجديف الأرضي أو ماكينة بمسند صدر',
            category: 'machine',
            executionSteps: [
              'اجلسي بظهر مستقيم تماماً مع ثني خفيف في الركبتين.',
              'اسحبي المقبض نحو أسفل السرة مع ضم لوحي الكتف للخلف وثبات ثانية.',
              'ارجعي ببطء مع الحفاظ على استقامة العمود الفقري.'
            ],
            tips: 'حافظي على صدرك مرفوعاً وكتفيك بعيدين عن أذنيك طوال الحركة.',
            alternatives: []
          },
          {
            id: 'w1-8',
            name: 'بوش داون حبل كيبل لشد ترهلات الذراعين والزنود (Cable Triceps Pushdown)',
            targetMuscle: 'الترايسبس والزنود (Triceps Toning)',
            targetMuscleDetail: 'التخلص النهائي من ترهلات الذراع الخلفية (الزنود) والحصول على ذراعين مشدودتين',
            sets: '3 مجموعات × 15 تكرار',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
            equipment: 'جهاز كيبل بحبل',
            category: 'machine',
            executionSteps: [
              'قفي بثبات وثبتي الكوعين ملاصقين لجانبي الخصر تماماً.',
              'اضغطي بالحبل للأسفل مع فتح طرفي الحبل في القاع لعصر الترايسبس.',
              'ارجعي للأعلى حتى زاوية 90 درجة فقط بالتحكم.'
            ],
            tips: 'ثبات الكوعين هو السر لمنع مساعدة الأكتاف وتوجيه كل الضغط لعضلة الذراع الخلفية.',
            alternatives: []
          },
          {
            id: 'w1-9',
            name: 'بلانك وثبات الجذع للبطن المسطح (Core Plank Hold)',
            targetMuscle: 'عضلات البطن العميقة والخصر (Transverse Abdominis)',
            targetMuscleDetail: 'شفط البطن للداخل ونحت الخصر وتقوية حزام البطن الطبيعي لمنع بروز الكرش',
            sets: '3 جولات × 40-50 ثانية ثبات',
            imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/women-glute-bridge.gif',
            equipment: 'مات أرضية',
            category: 'bodyweight',
            executionSteps: [
              'استندي على الساعدين وأطراف أصابع القدمين مع جعل الجسم في خط مستقيم كاللوح الخشبي.',
              'اشفطي السرة نحو العمود الفقري واعصري عضلات البطن والمؤخرة معاً.',
              'تنفسي بانتظام دون إسقاط الحوض أو رفعه للأعلى.'
            ],
            tips: 'التركيز على شد السرة للداخل هو ما يشد العضلة العميقة المسؤولة عن البطن المسطح.',
            alternatives: []
          },
          {
            id: 'w1-10',
            name: 'التفاف روسي للخصر (Russian Twists)',
            targetMuscle: 'عضلات الخصر والبطن المائلة (Obliques & Waistline)',
            targetMuscleDetail: 'شد جانبي البطن وتصغير محيط الخصر بدون أوزان ثقيلة',
            sets: '3 مجموعات × 20 تكرار (10 لكل جهة)',
            imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
            equipment: 'مات أرضية',
            category: 'bodyweight',
            executionSteps: [
              'اجلسي على الأرض مع ثني الركبتين ورفع القدمين قليلاً عن الأرض وميل الجذع للخلف 45 درجة.',
              'قومي بتدوير الجذع من جانب لآخر ببطء ولمس الأرض بكلتا اليدين مع عصر عضلات الخصر.'
            ],
            tips: 'الحركة يجب أن تكون من منطقة الصدر والخصر وليس مجرد تحريك الذراعين.',
            alternatives: []
          }
        ]
      },
      {
        dayName: 'اليوم الثالث (الأربعاء أو الخميس)',
        title: 'شد الفخذ الأمامي، المؤخرة وحرق السيلوليت (Quads, Glutes & Cellulite Burn)',
        focusArea: 'الفخذين، المؤخرة الشاملة، حرق السعرات وشد السيلوليت',
        badge: 'حرق وشد شامل 🔥',
        description: 'يوم تدريبي عالي الكثافة لشد ألياف الفخذين الأمامية والداخلية، تنشيط الدورة الدموية ومحاربة السيلوليت، وحرق مئات السعرات الحرارية.',
        exercises: [
          {
            id: 'w1-11',
            name: 'سكوات جوبلت بالدمبل أو الكيتل بيل (Dumbbell Goblet Squat)',
            targetMuscle: 'الفخذ الأمامي والمؤخرة (Quads & Glutes)',
            targetMuscleDetail: 'شد وتفصيل الفخذين ورفع المؤخرة وحرق دهون الساقين',
            sets: '4 مجموعات × 12 تكرار',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-squat.gif',
            equipment: 'دمبل واحد أو كيتل بيل أمام الصدر',
            category: 'free',
            executionSteps: [
              'أمسكي دمبل بوضع عمودي أمام الصدر بكلتا اليدين مع مباعدة القدمين أوسع من الكتفين قليلاً.',
              'انزلي بالحوض للخلف والأسفل كأنك تجلسين على كرسي منخفض مع استقامة الظهر.',
              'ادفعي بالأرض بكعبي القدمين للعودة للأعلى مع عصر المؤخرة.'
            ],
            tips: 'حافظي على ركبتيك في اتجاه أصابع القدمين ولا تدعيهما تتقاربان للداخل.',
            alternatives: []
          },
          {
            id: 'w1-12',
            name: 'دفع رجلين مائل ماكينة (45° Leg Press Machine)',
            targetMuscle: 'الفخذين والشامل (Overall Leg Tone)',
            targetMuscleDetail: 'شد عضلات الساقين بالكامل بأمان تام دون أي إجهاد لأسفل الظهر',
            sets: '3 مجموعات × 12 تكرار',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-press.gif',
            equipment: 'ماكينة Leg Press 45',
            category: 'machine',
            executionSteps: [
              'ضعي القدمين في منتصف اللوح أو أعلى اللوح قليلاً لزيادة التركيز على المؤخرة.',
              'انزلي بالمنصة حتى زاوية 90 درجة بالركبة مع الحفاظ على الحوض ملتصقاً بالمقعد.',
              'ادفعي المنصة للأعلى بدون قفل مفصل الركبة في القمة.'
            ],
            tips: 'وضع القدمين في أعلى اللوحة يقلل الضغط على الركبة ويزيد من تفعيل الألوية والفخذ الخلفي.',
            alternatives: []
          },
          {
            id: 'w1-13',
            name: 'مد أرجل أمامي ماكينة (Leg Extension Machine)',
            targetMuscle: 'الفخذ الأمامي العازل (Quads Definition)',
            targetMuscleDetail: 'رسم ملامح الفخذ الأمامية فوق الركبة لشد الجلد المترهل ومظهر ساقين مشدودتين',
            sets: '3 مجموعات × 12-15 تكرار',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-extension.gif',
            equipment: 'جهاز مد الأرجل Leg Extension',
            category: 'machine',
            executionSteps: [
              'اجلسي على المقعد مع وضع وسادة الساقين فوق الكاحل مباشرة.',
              'ارفعي الساقين حتى الاستقامة مع عصر الفخذ الأمامي لثانية كاملة.',
              'انزلي ببطء مع التحكم في الوزن.'
            ],
            tips: 'لا تستخدمي وزناً ثقيلاً جداً، بل ركزي على تكرارات نقية مع عصر العضلة في القمة.',
            alternatives: []
          },
          {
            id: 'w1-14',
            name: 'رفع سمانة واقف أو على الجهاز (Standing Calf Raises)',
            targetMuscle: 'عضلات السمانة والبطات (Calves)',
            targetMuscleDetail: 'رسم رشاقة الساق السفلية وتنشيط المضخة العضلية لتقليل احتباس السوائل وتورم القدمين',
            sets: '3 مجموعات × 20 تكرار',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-calf-raise.gif',
            equipment: 'حافة منصة أو ماكينة السمانة',
            category: 'machine',
            executionSteps: [
              'قفي على مشطي القدمين على حافة الدرجة مع تدلي الكعبين.',
              'اصعدي لأعلى نقطة ممكنة واثبتي لثانية كاملة ثم انزلي ببطء لتحصلي على تمدد عميق.'
            ],
            tips: 'السمانة تعمل كمضخة وريدية ثانية في الجسم لطرد السوائل الراكدة في الساقين.',
            alternatives: []
          },
          {
            id: 'w1-15',
            name: 'كارديو حرق الدهون عالي الشدة / مشي مائل (Incline Treadmill Walk)',
            targetMuscle: 'القلب وحرق السعرات الشامل (Cardiovascular & Fat Loss)',
            targetMuscleDetail: 'حرق الدهون العنيدة وتسريع الأيض بدون فقدان الكتلة العضلية المكتسبة',
            sets: '15 إلى 20 دقيقة (انحدار 10-12% وسرعة 4.8 كم/س)',
            imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80',
            equipment: 'جهاز السير الكهربائي Treadmill',
            category: 'machine',
            executionSteps: [
              'اضبطي انحدار السير على درجة 10-12% وسرعة مشي مريحة بين 4.5 و 5.5 كم/ساعة.',
              'امشي بخطى ثابتة وقومي بتحريك الذراعين دون التمسك بمقابض الجهاز لزيادة استهلاك السعرات.'
            ],
            tips: 'المشي على منحدر يحافظ على عضلات الألوية مشدودة ويحرق دهوناً مضاعفة مقارنة بالمشي المستوي دون أي صدمات على الركبتين.',
            alternatives: []
          }
        ]
      }
    ]
  },
  {
    id: 'fat-loss-toning',
    name: 'الخيار الثاني: حرق الدهون وإنقاص الوزن وشد الترهلات (Full Body Fat Burn)',
    badge: 'حرق سعرات فائق • شد السيلوليت والترهلات 🔥',
    description: 'نظام 3 أيام بالأسبوع لكامل الجسم (Full Body Circuit) بأسلوب السوبر ست والفواصل القصيرة، يرفع نبضات القلب ويحرق أعلى كمية من السعرات الحرارية أثناء التمرين وبعده بساعات (Afterburn Effect).',
    idealFor: 'الراغبات في التخسيس السريع، تقليل مقاسات الجسم، التخلص من دهون البطن والأرداف والزنود.',
    frequency: '3 أيام تدريب متباعدة (مثال: سبت - إثنين - أربعاء) لضمان أعلى استهلاك طاقة واستشفاء',
    days: [
      {
        dayName: 'اليوم الأول (السبت)',
        title: 'حرق كامل الجسم - تركيز سفلي وسيركت هوائي (Full Body Tone A)',
        focusArea: 'حرق دهون الفخذين والمؤخرة، شد الظهر والبطن، ورفع الأيض',
        badge: 'حرق شحوم وسيلوليت ⚡',
        description: 'سلسلة تمارين متتالية لتحريك كبرى المجموعات العضلية وحرق مخازن السكر والدهون.',
        exercises: [
          {
            id: 'w2-1',
            name: 'سومو سكوات بالدمبل مع عصر الألوية (Sumo Dumbbell Squat)',
            targetMuscle: 'الفخذ الداخلي والمؤخرة (Inner Thighs & Glutes)',
            targetMuscleDetail: 'شد ترهلات الفخذ من الداخل ونحت الأرداف وحرق سعرات هائل',
            sets: '4 مجموعات × 15 تكرار (راحة 45 ثانية)',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-squat.gif',
            equipment: 'دمبل واحد بوزن مناسب',
            category: 'free',
            executionSteps: [
              'باعدي بين قدميك أوسع من الكتفين بوضوح مع توجيه أصابع القدمين للخارج بزاوية 45 درجة.',
              'أمسكي الدمبل بين يديك وانزلي بالحوض للأسفل مع بقاء الظهر مستقيماً والصدر مرفوعاً.',
              'ادفعي للأعلى بكعبي القدمين واعصري الفخذين الداخليين والمؤخرة بقوة في القمة.'
            ],
            tips: 'حافظي على الركبتين متتبعتين لاتجاه أصابع القدمين ولا تدعيهما تنطبقان للداخل.',
            alternatives: []
          },
          {
            id: 'w2-2',
            name: 'طعنات المشي بالدمبلز (Walking Dumbbell Lunges)',
            targetMuscle: 'الساقين بالكامل والمؤخرة (Full Leg Tone)',
            targetMuscleDetail: 'تمرين ديناميكي يرفع نبض القلب ويحرق دهون الساقين بسرعة قياسية',
            sets: '3 جولات × 20 خطوة (10 خطوات لكل ساق)',
            imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-squat.gif',
            equipment: 'دمبلين خفيفين في اليدين',
            category: 'free',
            executionSteps: [
              'تقدمي بخطوة واسعة للأمام وانزلي بالركبة الخلفية حتى تقارب الأرض بزاوية 90 درجة.',
              'ادفعي للأعلى وتقدمي مباشرة بالساق الأخرى إلى الأمام بحركة انسيابية متواصلة.'
            ],
            tips: 'لا تضربي ركبتك بالأرض واجعلي الدفع نابعاً من كعب الساق الأمامية.',
            alternatives: []
          },
          {
            id: 'w2-3',
            name: 'سحب ظهر عالي ماكينة (Lat Pulldown) مدمج مع ضغط أكتاف',
            targetMuscle: 'الظهر والكتفين (Upper Posture & Calorie Burn)',
            targetMuscleDetail: 'حرق دهون الظهر المزعجة حول حمالة الصدر ورسم خطوط أنيقة',
            sets: '3 مجموعات × 15 تكرار',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            animationUrl: '/assets/exercises/back-lat-pulldown.gif',
            equipment: 'جهاز سحب الكيبل العالي',
            category: 'machine',
            executionSteps: [
              'اسحبي البار إلى أعلى الصدر مع ضم لوحي الكتف للخلف والزفير.',
              'ارجعي ببطء مع التحكم في الوزن للشهيق وتمديد الظهر.'
            ],
            tips: 'استخدمي وزناً يسمح بـ 15 تكراراً بنقاء وحرقة عضلية خفيفة.',
            alternatives: []
          },
          {
            id: 'w2-4',
            name: 'تسلق الجبل للبطن والكارديو (Mountain Climbers)',
            targetMuscle: 'عضلات البطن وحرق السعرات السريع (Core & Cardio)',
            targetMuscleDetail: 'شد أسفل البطن وتفجير معدل الحرق في وقت قياسي',
            sets: '3 جولات × 35 ثانية متواصلة',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            equipment: 'مات أرضية',
            category: 'bodyweight',
            executionSteps: [
              'اتخذي وضعية البلانك المرتفع على الكفين.',
              'اسحبي الركبتين نحو الصدر بالتناوب بحركة تشبه الجري السريع مع الحفاظ على ثبات الحوض.'
            ],
            tips: 'لا ترفعي المؤخرة للأعلى، حافظي على استقامة الظهر لشد البطن.',
            alternatives: []
          }
        ]
      },
      {
        dayName: 'اليوم الثاني (الإثنين)',
        title: 'حرق كامل الجسم - تركيز علوي ونحت الخصر (Full Body Tone B)',
        focusArea: 'شد الذراعين، تنحيف الخصر، نحت الظهر والصدر، وحرق السعرات',
        badge: 'نحت الذراعين والخصر 💃',
        description: 'تركيز على الجزء العلوي والبطن مع فترات راحة قصيرة لتشغيل نظام التمثيل الغذائي السريع.',
        exercises: [
          {
            id: 'w2-5',
            name: 'تجديف دمبلين مع ثني الجذع (Bent-Over Dumbbell Rows)',
            targetMuscle: 'منتصف الظهر واللوحين (Mid Back Tone)',
            targetMuscleDetail: 'شد ترهلات الظهر وتصغير محيط القفص الصدري وتحسين الاستقامة',
            sets: '3 مجموعات × 15 تكرار',
            imageUrl: '/assets/images/back-barbell-row.jpg',
            animationUrl: '/assets/exercises/back-seated-cable-row.gif',
            equipment: 'زوج دمبلز خفيف إلى متوسط',
            category: 'free',
            executionSteps: [
              'ميلي بالجذع للأمام 45 درجة مع دفع المؤخرة للخلف والظهر مستقيم.',
              'اسحبي الدمبلين باتجاه جانبي الخصر مع عصر لوحي الكتف معاً.'
            ],
            tips: 'لا تحركي رأسك للأعلى والأسفل، حافظي على الرقبة في امتداد العمود الفقري.',
            alternatives: []
          },
          {
            id: 'w2-6',
            name: 'ديبس بنش لشد زنود الذراعين (Bench Dips for Triceps)',
            targetMuscle: 'الذراع الخلفية (Triceps Firming)',
            targetMuscleDetail: 'التخلص من ارتخاء وترهل جلد الذراع الخلفي',
            sets: '3 مجموعات × 12-15 تكرار',
            imageUrl: '/assets/images/triceps-pushdown.jpg',
            animationUrl: '/assets/exercises/arm-triceps-pushdown.gif',
            equipment: 'بنش أو كرسي ثابت',
            category: 'bodyweight',
            executionSteps: [
              'ضعي كفيك على حافة البنش وقدمي القدمين للأمام مع ثني الركبتين.',
              'انزلي بالوركين للأسفل بثني الكوعين لزاوية 90 درجة ثم ادفعي للأعلى لعصر الترايسبس.'
            ],
            tips: 'حافظي على ظهرك قريباً جداً من حافة البنش طوال الهبوط والصعود.',
            alternatives: []
          },
          {
            id: 'w2-7',
            name: 'تمرين الدراجة الهوائية للبطن والخصر (Bicycle Crunches)',
            targetMuscle: 'كامل عضلات البطن وجوانب الخصر',
            targetMuscleDetail: 'أعلى تمرين فعالية في نحت البطن المسطح وتصغير الخصر',
            sets: '3 مجموعات × 20 تكرار متناوب',
            imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
            equipment: 'مات أرضية',
            category: 'bodyweight',
            executionSteps: [
              'استلقي على الظهر واليدين خلف الرأس والكتفين مرتفعين قليلاً.',
              'قربي الكوع المعاكس للركبة المقابلة مع فرد الساق الأخرى بالتناوب.'
            ],
            tips: 'التحكم الهادئ والبطيء يعطي نتائج مضاعفة 3 مرات مقارنة بالسرعة العشوائية.',
            alternatives: []
          },
          {
            id: 'w2-8',
            name: 'قفز الحبل أو القفز الافتراضي (Jumping Rope / Cardio Intervals)',
            targetMuscle: 'القلب وحرق السعرات الشامل',
            targetMuscleDetail: 'حرق دهون مكثف وتنشيط الجهاز اللمفاوي لطرد السموم',
            sets: '5 جولات × 45 ثانية قفز + 20 ثانية راحة',
            imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80',
            equipment: 'حبل قفز أو قفز بوزن الجسم',
            category: 'bodyweight',
            executionSteps: [
              'اقفزي برفق على مشطي القدمين مع تحريك المعصمين بمرونة.',
              'تنفسي بعمق وحافظي على إيقاع ثابت.'
            ],
            tips: 'الهبوط الخفيف على أمشاط القدمين يحمي المفاصل والركبتين تماماً.',
            alternatives: []
          }
        ]
      },
      {
        dayName: 'اليوم الثالث (الأربعاء)',
        title: 'حرق السيلوليت ونحت المؤخرة والأرجل (Cellulite Burn & Glutes)',
        focusArea: 'السيلوليت، المؤخرة، الفخذ الخلفي، والبطن السفلية',
        badge: 'قضاء على السيلوليت 🌊',
        description: 'تنشيط الدورة الدموية في الأنسجة الدهنية العميقة في الفخذ والمؤخرة لشد الجلد والتخلص من مظهر قشرة البرتقال.',
        exercises: [
          {
            id: 'w2-9',
            name: 'جسر الحوض الأرضي مع شريط مقاومة وتكرار مرتفع (Banded Glute Bridge Burn)',
            targetMuscle: 'المؤخرة كاملة (Glutes Pump)',
            targetMuscleDetail: 'ضخ الدم بقوة في عضلات الألوية لشد الجلد المترهل',
            sets: '4 مجموعات × 20 تكرار (ثبات ثانيتين في القمة)',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/women-glute-bridge.gif',
            equipment: 'مات أرضية + حلقة مطاطية فوق الركبتين',
            category: 'bodyweight',
            executionSteps: [
              'استلقي على الظهر وضعي الشريط فوق الركبتين واثني القدمين بالقرب من الحوض.',
              'ادفعي الحوض للأعلى مع فتح الركبتين ضد مقاومة الشريط وعصر الألوية بشدة.'
            ],
            tips: 'الحرق الشديد في المؤخرة علامة على تنشيط الألياف الخاملة وطرد السوائل الراكدة.',
            alternatives: []
          },
          {
            id: 'w2-10',
            name: 'صعود الصندوق أو البنش بالدمبلز (Dumbbell Step-Ups)',
            targetMuscle: 'الفخذين والمؤخرة والقلب (Glute-Quad Lift)',
            targetMuscleDetail: 'حرق دهون موضعي رائع ورفع وشد ترهل الألوية',
            sets: '3 مجموعات × 12 خطوة لكل ساق',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            equipment: 'بنش أو صندوق خشبي + دمبلين',
            category: 'free',
            executionSteps: [
              'ضعي القدم بالكامل على الصندوق، ادفعي بكعب القدم للصعود باستقامة.',
              'انزلي ببطء مع التحكم التام بالساق النازلة.'
            ],
            tips: 'التركيز على الدفع بكعب القدم ينقل التركيز بالكامل إلى المؤخرة.',
            alternatives: []
          },
          {
            id: 'w2-11',
            name: 'جهاز صعود الدرج الكهربائي أو مشي السير المائل (StairMaster / Incline Cardio)',
            targetMuscle: 'حرق السعرات ونحت الجزء السفلي',
            targetMuscleDetail: 'الجهاز رقم 1 في صالات الجيم لمحاربة السيلوليت ونحت الأرداف',
            sets: '20 دقيقة متواصلة بمستوى جهد متوسط-مرتفع',
            imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=80',
            equipment: 'جهاز StairMaster أو سير بانحدار 12%',
            category: 'machine',
            executionSteps: [
              'اصعدي الدرج بخطوات عميقة مع الضغط بكامل باطن القدم دون الاتكاء بالوزن على المقابض.',
              'حافظي على استقامة الظهر وعصر المؤخرة مع كل خطوة.'
            ],
            tips: 'عدم التمسك بالمقابض يزيد من حرق السعرات بنسبة 35% ويشرك عضلات البطن.',
            alternatives: []
          }
        ]
      }
    ]
  },
  {
    id: 'curves-hypertrophy',
    name: 'الخيار الثالث: زيادة الوزن وتكبير العضلات والمنحنيات الأنثوية (Curves Hypertrophy)',
    badge: 'بناء وتكبير المنحنيات • زيادة الوزن بأنوثة 🍑',
    description: 'برنامج تدريبي 3 أيام مخصص للبنات النحيفات والراغبات في زيادة الوزن النقي، تكبير المؤخرة والأرداف، وتنسيق القوام دون اكتساب كرش أو دهون غير مرغوبة في البطن، بالاعتماد على التحميل التدريجي (Progressive Overload).',
    idealFor: 'النحيفات، الراغبات في ملء الخفسة وتكبير حجم المؤخرة والفخذين وبناء قوام أنثوي ممتلئ ومشدود.',
    frequency: '3 أيام تدريب بأوزان ممتازة + 4 أيام راحة وتغذية وبناء (سبت - إثنين - أربعاء)',
    days: [
      {
        dayName: 'اليوم الأول (السبت)',
        title: 'البناء الثقيل للألوية والمؤخرة (Heavy Glute Hypertrophy)',
        focusArea: 'تكبير عضلة المؤخرة الكبرى والوسطى، وملء جوانب الحوض',
        badge: 'تكبير الألوية والحوض 🍑',
        description: 'استهداف الألياف العضلية السريعة بأوزان تصاعدية وتكرارات بنائية (8-10 تكرارات) مع راحة كافية.',
        exercises: [
          {
            id: 'w3-1',
            name: 'هيب ثرست ثقيل ببار حر أو سميث (Heavy Barbell Hip Thrust)',
            targetMuscle: 'المؤخرة الكبرى (Gluteus Maximus Growth)',
            targetMuscleDetail: 'التمرين الأساسي الأول لزيادة حجم وبروز المؤخرة وبناء الكتلة العضلية النقية',
            sets: '4 مجموعات × 8-10 تكرارات (أوزان تصاعدية مع ثبات ثانيتين في القمة)',
            imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/women-hip-thrust.gif',
            equipment: 'بار مبطن + أوزان + بنش',
            category: 'free',
            executionSteps: [
              'ضعي وسادة حماية حول البار واختاري وزناً مناسباً يجعلك تصلين لقمة الجهد عند التكرار 8-10.',
              'ادفعي بقوة من الكعبين واثبتي في القمة لمدة ثانيتين كاملتين مع عصر الألوية بأقصى قوة.',
              'انزلي بتحكم بطيء لمدة 3 ثوانٍ لتحفيز التمزقات الميكروسكوبية البناءة.'
            ],
            tips: 'النزول البطيء (Eccentric phase) هو المسؤول عن 70% من إشارات التضخيم العضلي.',
            alternatives: []
          },
          {
            id: 'w3-2',
            name: 'سكوات بلغاري ثقيل بالدمبلز (Heavy Bulgarian Split Squat)',
            targetMuscle: 'بناء الألوية وتكبير الفخذ المندمج',
            targetMuscleDetail: 'عزل كل جانب لبناء تناسق مثالي وامتلاء عميق لعضلات الحوض',
            sets: '3 مجموعات × 8-10 تكرارات لكل ساق',
            imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-squat.gif',
            equipment: 'بنش + زوج دمبلز بأوزان محترمة',
            category: 'free',
            executionSteps: [
              'استندي بمشط القدم الخلفية، وقدمي الساق الأمامية بمسافة كافية.',
              'انزلي بعمق مع ميل خفيف بالجذع للأمام لتكبير استطالة الألوية، ثم اصعدي بقوة.'
            ],
            tips: 'كلما زاد عمق النزول بأمان، كلما زاد تفعيل وتكبير عضلات المؤخرة.',
            alternatives: []
          },
          {
            id: 'w3-3',
            name: 'ديدلفت روماني بالدمبلز الثقيلة (Heavy RDL for Glute-Ham Tie-in)',
            targetMuscle: 'تكبير الفخذ الخلفي ورفع المؤخرة',
            targetMuscleDetail: 'سماكة الفخذ من الخلف ورفع المؤخرة لفصلها عن الساق',
            sets: '3 مجموعات × 10 تكرارات (تركيز على التمدد العميق)',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-romanian-deadlift.gif',
            equipment: 'زوج دمبلز بوزن متقدم',
            category: 'free',
            executionSteps: [
              'ادفعي الحوض للخلف بأقصى ما يمكنك واشعري بتمدد عميق في أوتار الركبة والمؤخرة.',
              'ادفعي للأعلى بانفجار الحوض للأمام وعصر المؤخرة بقوة.'
            ],
            tips: 'لا تتركي الدمبلز تبتعد عن ساقيك لعدم تحميل الظهر.',
            alternatives: []
          },
          {
            id: 'w3-4',
            name: 'جهاز إبعاد الفخذين بوزن ثقيل وتكرار تنازلي (Heavy Hip Abduction Dropset)',
            targetMuscle: 'ملء الخفسة والمؤخرة الجانبية (Gluteus Medius)',
            targetMuscleDetail: 'ملء الفراغ الجانبي للحوض وإعطاء مظهر الاستدارة الجانبية الممتلئة',
            sets: '4 مجموعات × 12، 10، 8، 8 تكرارات (أوزان تصاعدية)',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-extension.gif',
            equipment: 'جهاز إبعاد الفخذين ماكينة',
            category: 'machine',
            executionSteps: [
              'ميلي بالجذع للأمام 30 درجة لزيادة الحمل على ألياف الألوية الجانبية العلوية.',
              'افتحي الساقين لأقصى اتساع واثبتي لثانيتين، ثم اغلقي ببطء شديد.'
            ],
            tips: 'هذا التمرين هو الحل الأول لملء الخفسة وإبراز استدارة الحوض عند زيادة الوزن.',
            alternatives: []
          }
        ]
      },
      {
        dayName: 'اليوم الثاني (الإثنين)',
        title: 'تنسيق الظهر والأكتاف والبطن (V-Taper & Core Balance)',
        focusArea: 'أعلى الظهر، الأكتاف العريضة خفيفاً، والبطن الممسوك',
        badge: 'تنسيق قوام الساعة الرملية ⏳',
        description: 'بناء ظهر أنيق وأكتاف مستديرة ناعمة يعطي خدعة بصرية تجعل الخصر يبدو أصغر وأضيق بطبيعته.',
        exercises: [
          {
            id: 'w3-5',
            name: 'سحب ظهر عالي قبضة محايدة ماكينة (Neutral Grip Lat Pulldown)',
            targetMuscle: 'الظهر العلوي وعرض القوام الأنثوي',
            targetMuscleDetail: 'بناء انسيابية الظهر التي تظهر الخصر بمظهر أنحف بنسبة 30%',
            sets: '3 مجموعات × 10 تكرارات',
            imageUrl: '/assets/images/back-lat-pulldown.jpg',
            animationUrl: '/assets/exercises/back-lat-pulldown.gif',
            equipment: 'جهاز السحب العالي بمقبض V',
            category: 'machine',
            executionSteps: [
              'اسحبي المقبض لأسفل الرقبة مع التركيز على ثني الكوعين للداخل وضم اللوحين.',
              'اصعدي ببطء لتمديد عضلات الظهر كاملة.'
            ],
            tips: 'لا تتمرجحي بالجذع، حافظي على ثبات الجسم التام.',
            alternatives: []
          },
          {
            id: 'w3-6',
            name: 'رفرفة جانبي بالدمبلز للأكتاف (Dumbbell Lateral Raises)',
            targetMuscle: 'الكتف الجانبي (Side Delts)',
            targetMuscleDetail: 'رسم استدارة الكتف الأنيقة لتحقيق توازن قوام الساعة الرملية',
            sets: '3 مجموعات × 12 تكرار بأوزان خفيفة-متوسطة',
            imageUrl: '/assets/images/shoulder-lateral-raise.jpg',
            animationUrl: '/assets/exercises/shoulder-lateral-raise.gif',
            equipment: 'زوج دمبلز خفيف',
            category: 'free',
            executionSteps: [
              'قفي بثبات وارفعي الذراعين للجانبين حتى مستوى الكتفين مع ثني خفيف جداً في الكوعين.',
              'انزلي ببطء مع التحكم التام.'
            ],
            tips: 'قودي الحركة بالكوعين وليس بالمعصمين لضمان عزل الكتف الجانبي.',
            alternatives: []
          },
          {
            id: 'w3-7',
            name: 'بلانك وتفريغ البطن (Stomach Vacuum & Plank)',
            targetMuscle: 'حزام البطن الداخلي والخصر',
            targetMuscleDetail: 'الحفاظ على البطن مشدوداً ومسطحاً تماماً أثناء فترة زيادة السعرات',
            sets: '3 جولات × 45 ثانية بلانك + 3 جولات شفط بطن فراغ',
            imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
            equipment: 'مات أرضية',
            category: 'bodyweight',
            executionSteps: [
              'اثبتي في وضعية البلانك مع شفط السرة للداخل بقوة والتنفس من الصدر.',
              'تمرين الفاكيوم الصباحي على الريق يساعد في شد جدار البطن الداخلي.'
            ],
            tips: 'الفاكيوم يمنع بروز البطن للأمام حتى مع تناول وجبات كبيرة لزيادة الوزن.',
            alternatives: []
          }
        ]
      },
      {
        dayName: 'اليوم الثالث (الأربعاء)',
        title: 'تكبير وبناء الساقين والألوية الشامل (Legs & Glutes Hypertrophy)',
        focusArea: 'الفخذين، الألوية الشاملة، وعضلات الساقين الممتلئة',
        badge: 'امتلاء وبناء الساقين 🦵',
        description: 'جلسة قوية لملء الفخذين وبناء الساقين المشدودتين لإنهاء النحافة المفرطة في الجزء السفلي.',
        exercises: [
          {
            id: 'w3-8',
            name: 'دفع رجلين ماكينة 45 بأوزان بنائية (Heavy 45° Leg Press)',
            targetMuscle: 'الفخذين والمؤخرة بالكامل',
            targetMuscleDetail: 'أمان فائق للعمود الفقري مع إمكانية استخدام أوزان ثقيلة لتحفيز النمو العضلي',
            sets: '4 مجموعات × 10 تكرارات بأوزان متصاعدة',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-press.gif',
            equipment: 'ماكينة دفع الأرجل Leg Press 45',
            category: 'machine',
            executionSteps: [
              'ضعي القدمين في أعلى المنصة بعرض الكتفين لزيادة التركيز على الألوية والفخذ الخلفي.',
              'انزلي بعمق حتى زاوية 90 درجة بالركبة ثم ادفعي للأعلى دون قفل المفصل.'
            ],
            tips: 'تنفسي: خذي شهيقاً عند النزول وزفيراً قوياً عند الدفع للأعلى.',
            alternatives: []
          },
          {
            id: 'w3-9',
            name: 'مد أرجل أمامي ماكينة (Leg Extension for Quad Fullness)',
            targetMuscle: 'الفخذ الأمامي العازل',
            targetMuscleDetail: 'ملء الفخذين وإعطائهما مظهراً رياضياً ممتلئاً وأنيقاً فوق الركبة',
            sets: '3 مجموعات × 12 تكرار مع ثبات ثانية في القمة',
            imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-extension.gif',
            equipment: 'جهاز Leg Extension',
            category: 'machine',
            executionSteps: [
              'ارفعي الوزن حتى استقامة الساقين واعصري الفخذ الأمامي بقوة.',
              'انزلي ببطء مع التحكم في المقاومة.'
            ],
            tips: 'التحكم في الوزن أثناء النزول هو سر تحفيز نمو الألياف العضلية.',
            alternatives: []
          },
          {
            id: 'w3-10',
            name: 'ثني أرجل خلفي نائم ماكينة (Lying Hamstring Curl)',
            targetMuscle: 'أوتار الفخذ الخلفية (Hamstrings)',
            targetMuscleDetail: 'تكبير الجزء الخلفي من الفخذ لمنح الساق منحنيات أنثوية واضحة من الجانب',
            sets: '3 مجموعات × 10-12 تكرار',
            imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
            animationUrl: '/assets/exercises/leg-curl.gif',
            equipment: 'ماكينة ثني الأرجل Lying Leg Curl',
            category: 'machine',
            executionSteps: [
              'استلقي على البطن وثبتي الحوض في المقعد تماماً.',
              'اثني الساقين للأعلى باتجاه المؤخرة واعصري أوتار الفخذ الخلفية بقوة.',
              'انزلي ببطء وتحكم دون ترك الأوزان تصطدم.'
            ],
            tips: 'حافظي على أصابع قدميك مشدودة باتجاه ساقيك لعزل أوتار الركبة.',
            alternatives: []
          }
        ]
      }
    ]
  }
];

// Fallback compatibility alias
export const WOMEN_WORKOUT_PLAN: WomenWorkoutDay[] = WOMEN_3DAY_PROGRAMS[0].days;

// ==========================================
// 2. دليل إنقاص الوزن وحرق الدهون للنساء
// ==========================================

export const WOMEN_WEIGHT_LOSS_PLAN: WomenWeightGoalPlan = {
  type: 'loss',
  title: 'دليل إنقاص الوزن وحرق الدهون ونحت القوام للنساء 🔥',
  subtitle: 'خطة علمية تضمن حرق الدهون العنيدة والتخلص من السيلوليت مع الحفاظ على نضارة الوجه وتوازن الهرمونات',
  targetCaloriesNote: 'عجز سعرات ذكي (Calorie Deficit): تقليل 350 - 500 سعرة عن احتياجك اليومي فقط، لحماية الغدة الدرقية والدورة الشهرية من أي اضطراب.',
  proteinRule: '1.6 إلى 1.8 جرام بروتين لكل كجم من وزنك (ضروري جداً لحماية عضلات الألوية والشد أثناء فقدان الوزن).',
  keyPrinciples: [
    {
      title: 'عجز السعرات المعتدل دون تجويع',
      desc: 'التجويع المفرط (أقل من 1200 سعرة) يبطئ الأيض، يرفع هرمون الكورتيزول، ويسبب تساقط الشعر وتأخر الدورة الشهرية. العجز الآمن هو خسارة 0.5 إلى 1 كجم أسبوعياً.'
    },
    {
      title: 'أسبقية البروتين في كل وجبة',
      desc: 'البروتين يرفع معدل الحرق بنسبة 25% بفضل التأثير الحراري للهضم (TEF)، ويمنحك شبعاً طويلاً ويمنع ترهل الجلد بعد نزول الوزن.'
    },
    {
      title: 'محاربة السيلوليت بالترطيب والبوتاسيوم',
      desc: 'السيلوليت ينتج عن ضعف الدورة الدموية واحتباس السوائل. شرب 3 لتر ماء مع تناول أطعمة غنية بالبوتاسيوم (السبانخ، الخيار، الأفوكادو) يطرد الصوديوم الزائد ويشد مظهر الجلد.'
    },
    {
      title: 'تمارين المقاومة قبل الكارديو',
      desc: 'حمل الأوزان في صالة باور جيم هو ما يرسم المنحنيات ويمنع مظهر "النحافة الرخوة Skinny Fat". الكارديو أداة مكملة وليس البديل عن الأوزان.'
    }
  ],
  goldenTips: [
    'ابدئي وجبتك دائماً بطبق السلطة الخضراء ثم البروتين، واجعلي الكربوهيدرات آخر ما تتناولينه لضبط قفزات الإنسولين.',
    'استبدلي السكر الأبيض ببدائل طبيعية خالية من السعرات (مثل ستيفيا النقية).',
    'احرصي على النوم 7-8 ساعات ليلاً؛ قلة النوم ترفع هرمون الجريلين (الجوع) بنسبة 30% وتزيد اشتهاء الحلويات.',
    'لا تعتمدي على الميزان فقط؛ استخدمي شريط القياس والصور الأسبوعية، فالدهون تنقص والعضلات المشدودة تكتسب كثافة.'
  ],
  foodsToFocus: [
    'صدور الدجاج والرومي منزوعة الجلد، بياض البيض، التونة بالماء، سمك السلمون والفيليه المشوي.',
    'الزبادي اليوناني قليل الدسم، الجبنة القريش الطبيعية.',
    'الشوفان الكامل، البطاطا الحلوة المشوية، الكينوا، الأرز البني.',
    'الخضار الورقية بكثافة: الجرجير، السبانخ، الخس، الخيار، البروكلي والكوسا.',
    'التوتيات والفراولة (أقل الفواكه سكراً وأعلاها مضادات أكسدة).'
  ],
  foodsToLimit: [
    'المشروبات الغازية والعصائر المعلبة حتى لو كُتب عليها طبيعية (مليئة بسكر الفركتوز السائل).',
    'المقليات والزيوت النباتية المكررة والمعجنات والمخبوزات البيضاء.',
    'الصلصات الجاهزة عالية السعرات (المايونيز، الرانش، الكاتشب المحلى بالسكر).',
    'الأطعمة فائقة المعالجة والأكياس المقرمشة المليئة بالصوديوم.'
  ],
  sampleDayMeals: [
    {
      mealName: 'وجبة الإفطار (شبع مستقر وحرق نشط)',
      time: '8:30 - 9:30 صباحاً',
      calories: 'حوالي 350 سعرة حرارية (28 جم بروتين)',
      items: [
        'أومليت من بيضة كاملة + بياض بيضتين مع سبانخ وطماطم شيري ورشة فلفل أسود.',
        'شريحة توست قمح كامل غني بالنخالة.',
        'نصف حبة خيار مقرمشة + شرائح خس.',
        'كوب شاي أخضر بالنعناع مع عصرة ليمون بدون سكر.'
      ],
      coachTip: 'بداية اليوم بالبروتين والألياف تمنع نوبات الجوع الصباحية وتبقيك في حالة حرق دهون نشطة.'
    },
    {
      mealName: 'سناك صباحي خفيف',
      time: '12:00 ظهراً',
      calories: 'حوالي 120 سعرة حرارية',
      items: [
        'كوب زبادي يوناني خالي الدسم مع ملعقة صغيرة بذور شيا و3 حبات فراولة مقطعة.'
      ],
      coachTip: 'بذور الشيا تنتفخ في المعدة وتمنحك شعوراً مريحاً بالامتلاء حتى موعد الغداء.'
    },
    {
      mealName: 'وجبة الغداء الرئيسية (تغذية العضلات وحرق السعرات)',
      time: '3:00 - 4:00 عصراً',
      calories: 'حوالي 420 سعرة حرارية (38 جم بروتين)',
      items: [
        '150 جرام صدر دجاج مشوي متبل بالأعشاب والليمون والثوم أو علبة تونة مصفاة.',
        '100 جرام بطاطا حلوة مشوية أو 4 ملاعق طعام أرز بسمتي مسلوق.',
        'طبق سلطة خضراء كبير (جرجير، خيار، فجل، فلفل أخضر) مع ملعقة صغيرة زيت زيتون بكر وخل تفاح.'
      ],
      coachTip: 'خل التفاح في السلطة يساعد في تقليل الارتفاع السريع لسكر الدم بنسبة تصل إلى 34%.'
    },
    {
      mealName: 'سناك قبل التمرين (طاقة خفيفة)',
      time: 'قبل التمرين بـ 45 دقيقة',
      calories: 'حوالي 110 سعرة حرارية',
      items: [
        'نصف حبة موزة متوسطة + فنجان قهوة أمريكية أو إسبريسو بدون سكر.'
      ],
      coachTip: 'الكافيين الطبيعي يعزز أكسدة الدهون أثناء التمرين ويزيد من قوتك ونشاطك داخل الصالة.'
    },
    {
      mealName: 'وجبة العشاء (استشفاء خفيف ونوم هادئ)',
      time: '7:30 - 8:30 مساءً',
      calories: 'حوالي 260 سعرة حرارية (25 جم بروتين)',
      items: [
        '150 جرام جبنة قريش مضروبة في الخلاط مع زعتر وقطرة زيت زيتون وخيار مبشور.',
        'أو بيضتان مسلوقتان مع طبق سلطة خضراء كبير.',
        'مغلي بابونج دافئ قبل النوم بنصف ساعة لتهدئة الأعصاب وخفض هرمون الكورتيزول.'
      ],
      coachTip: 'جبن القريش غني ببروتين الكازين بطيء الامتصاص الذي يحمي العضلات من الهدم طوال الليل.'
    }
  ],
  specialRecipe: {
    name: 'مشروب السموذي الأخضر الحارق للدهون وطارد السوائل (Green Fat Burner)',
    ingredients: [
      'قبضة يد جرجير طازج أو سبانخ صغيرة.',
      'نصف حبة خيار مقشرة وباردة.',
      'عصير نصف ليمونة خضراء.',
      'قطعة صغيرة زنجبيل طازج مبشور.',
      'نصف كوب ماء بارد + مكعبات ثلج + أوراق نعناع طازجة.'
    ],
    prep: 'توضع المكونات في الخلاط وتخفق جيداً حتى تصبح ناعمة ومنعشة وتشرب صباحاً أو بين الوجبات.',
    benefit: 'مشروب غني بمضادات الأكسدة والبوتاسيوم، ينقي الكبد من السموم، يطرد احتباس الماء فوراً، وسعراته لا تتجاوز 45 سعرة!'
  }
};

// ==========================================
// 3. دليل زيادة الوزن وبناء المنحنيات للنساء
// ==========================================

export const WOMEN_WEIGHT_GAIN_PLAN: WomenWeightGoalPlan = {
  type: 'gain',
  title: 'دليل زيادة الوزن وتكبير المنحنيات الأنثوية (Curves & Healthy Gain) 🥑',
  subtitle: 'خطة غذائية عالية الكثافة لإنهاء النحافة المفرطة وبناء حجم المؤخرة والأرجل بدون تراكم كرش أو دهون بطن',
  targetCaloriesNote: 'فائض سعرات صحي (Clean Calorie Surplus): تناول 300 - 500 سعرة حرارية إضافية فوق احتياج الحفاظ، لتوجيه الطاقة مباشرة نحو تكبير العضلات الأنثوية.',
  proteinRule: '1.8 إلى 2.0 جرام بروتين لكل كجم من وزنك المستهدف (لبناء ألياف عضلية جديدة وقوام مشدود وممتلئ).',
  keyPrinciples: [
    {
      title: 'السعرات المكثفة سهلة الهضم (Calorie-Dense Foods)',
      desc: 'صاحبات النحافة يمتلكن معدة سريعة الامتلاء؛ الحل ليس في أكل كميات طعام ضخمة تسد الشهية، بل في اختيار أطعمة صغيرة الحجم ولكنها مليئة بالسعرات الصحية كالمكسرات، الأفوكادو، وزبدة الفول السوداني.'
    },
    {
      title: 'شرب السعرات عبر السموذي الطبيعي',
      desc: 'السوائل لا تملأ المعدة مثل الأطعمة الصلبة. إضافة سموذي بروتيني غني بالسعرات بين الوجبات يمنحك 600-700 سعرة حرارية بسهولة تامة وبدون أي انتفاخ.'
    },
    {
      title: 'تناول الطعام كل 3 ساعات بانتظام',
      desc: 'تقسيم اليوم إلى 3 وجبات رئيسية دسمة صحياً و2 إلى 3 سناكات طاقة يضمن استمرار تدفق المغذيات وتفادي حرق الجسم لأنسجته العضلية.'
    },
    {
      title: 'الاقتران بتمارين المقاومة بالأوزان (ضروري جداً!)',
      desc: 'زيادة السعرات بدون رفع أوزان ممتازة ستتحول إلى دهون رخوة في البطن والخصر. التمارين القوية (هيب ثرست، سكوات، دفع رجلين) تجبر الجسم على إرسال السعرات الزائدة مباشرة لبناء وبروز المؤخرة والفخذين.'
    }
  ],
  goldenTips: [
    'أضيفي ملعقة طعام من زيت الزيتون البكر أو زبدة اللوز فوق وجباتك، فكل ملعقة تمنحك 120 سعرة صحية دون زيادة حجم الوجبة.',
    'لا تشربي الماء أثناء تناول الطعام أو قبله بنصف ساعة حتى لا تشعري بامتلاء كاذب وسريع في المعدة.',
    'استبدلي الحليب الخالي من الدسم بالحليب كامل الدسم، وتناولي الشوفان المطبوخ بالحليب والمكسرات.',
    'تناولي سناكاً مغذياً غنياً بالبروتين والكربوهيدرات قبل النوم مباشرة لتغذية الجسم طوال الليل.'
  ],
  foodsToFocus: [
    'زبدة الفول السوداني الطبيعية، زبدة اللوز، الكاجو، الجوز، وبذور الشيا والكتان.',
    'الأفوكادو، التمر المجدول، الزبيب، والموز الناضج.',
    'سمك السلمون، اللحم البقري المفروم الصافي، البيض الكامل، والأجبان الطبيعية الصفراء والقريش كاملة الدسم.',
    'الأرز البسمتي، البطاطا والبطاطس المسلوقة أو المشوية، الشوفان، والمكرونة المصنوعة من القمح الكامل.',
    'العسل الطبيعي النقي والمكسرات المطحونة.'
  ],
  foodsToLimit: [
    'الوجبات السريعة المقرمشة والمقليات المهدرجة (تسبب دهوناً حشوية وكرش وسيلوليت غير صحي).',
    'الحلويات الرخيصة المليئة بالزيوت النباتية المهدرجة (تضر بالهرمونات والبشرة).',
    'تخطي الوجبات بحجة انعدام الشهية.'
  ],
  sampleDayMeals: [
    {
      mealName: 'وجبة الإفطار (انطلاقة طاقة دسمة وصحية)',
      time: '8:00 - 9:00 صباحاً',
      calories: 'حوالي 580 سعرة حرارية (32 جم بروتين)',
      items: [
        '3 بيضات كاملة مطهوة بزيت زيتون أو زبدة طبيعية مع شرائح طماطم وجبن شيدر.',
        'شريحتان توست قمح كامل أو نصف رغيف خبز بلدي أسمر.',
        'نصف حبة أفوكادو مهروسة مع رشة ملح بحري وليمون.',
        'كوب حليب كامل الدسم دافئ مع ملعقة عسل نحل.'
      ],
      coachTip: 'الدهون الصحية في البيض والأفوكادو تدعم إنتاج هرمونات الأنوثة وتحفز نمو الأنسجة.'
    },
    {
      mealName: 'سناك الصباح البنائي (سموذي المنحنيات)',
      time: '11:30 صباحاً',
      calories: 'حوالي 620 سعرة حرارية (28 جم بروتين)',
      items: [
        'سموذي الطاقة والمنحنيات المنزلي (موز + شوفان + زبدة فول سوداني + حليب + عسل).'
      ],
      coachTip: 'هذا السناك السحري يزودك بأكثر من 600 سعرة دون أي مجهود في المضغ أو ثقل في المعدة.'
    },
    {
      mealName: 'وجبة الغداء الرئيسية (بناء العضلات والأنسجة)',
      time: '2:30 - 3:30 عصراً',
      calories: 'حوالي 680 سعرة حرارية (45 جم بروتين)',
      items: [
        '180 جرام صدر دجاج مشوي أو لحم بقري مفروم أو سمك سلمون مشوي.',
        'كوب ونصف أرز بسمتي ناضج مطبوخ مع زيت زيتون ومكسرات محمصة.',
        'كوب خضار سوتيه أو سلطة خضراء مضاف إليها ملعقة طعام زيت زيتون بكر وزيتون كامل.'
      ],
      coachTip: 'الأرز والمكسرات يمنحانك طاقة نظيفة تملأ مخازن الجليكوجين وتزيد من حجم العضلات.'
    },
    {
      mealName: 'سناك شحن ما بعد التمرين',
      time: 'بعد التمرين مباشرة (خلال 45 دقيقة)',
      calories: 'حوالي 320 سعرة حرارية',
      items: [
        'كوب زبادي يوناني كامل الدسم مع 3 حبات تمر مجدول ملعقة لوز مبشور ورشة قرفة.'
      ],
      coachTip: 'أهم نافذة بنائية لنقل البروتين والأحماض الأمينية مباشرة للألياف العضلية المستهدفة.'
    },
    {
      mealName: 'وجبة العشاء المشبعة (استشفاء وتكبير ليلي)',
      time: '8:00 - 9:00 مساءً',
      calories: 'حوالي 480 سعرة حرارية (30 جم بروتين)',
      items: [
        '150 جرام جبنة قريش مخلوطة مع ملعقة زيت زيتون بكر، سمسم، وبذور حبة البركة وخيار.',
        'بطاطا حلوة مشوية متوسطة الحجم مع رشة قرفة وعسل.',
        'قبضة صغيرة من اللوز أو الكاجو النيء قبل النوم.'
      ],
      coachTip: 'البطاطا الحلوة غنية بالكربوهيدرات المعقدة التي تساعد في نوم عميق وإفراز هرمون النمو الطبيعي.'
    }
  ],
  specialRecipe: {
    name: 'سموذي الطاقة وبناء المنحنيات المنزلي (Curves Builder Smoothie - 650+ kcal)',
    ingredients: [
      'كوب كبير (250 مل) حليب كامل الدسم (أو حليب الشوفان/اللوز المدعم).',
      'حبة موزة كبيرة ناضجة.',
      '4 ملاعق كبيرة شوفان حبة كاملة مطحون.',
      'ملعقتان كبيرتان زبدة فول سوداني طبيعية 100%.',
      '3 حبات تمر منزوع النوى (أو ملعقة طعام عسل نحل طبيعي).',
      'ملعقة صغيرة بودرة كاكاو خام (اختياري لنكهة شوكولاتة لذيذة).'
    ],
    prep: 'توضع جميع المكونات في الخلاط وتخلط لمدة دقيقة حتى تصبح كريمية ناعمة. يُشرب مرة إلى مرتين يومياً كسناك بين الوجبات أو بعد التمرين.',
    benefit: 'قنبلة غذائية طبيعية تمنحك أكثر من 650 سعرة حرارية و26 جرام بروتين نقي وفيتامينات مغذية وسهلة الامتصاص!'
  }
};

// ==========================================
// 4. دليل التغذية العام للمرأة الرياضية
// ==========================================

export const WOMEN_NUTRITION_DATA = {
  title: 'النظام الغذائي المتوازن للمرأة الرياضية',
  subtitle: 'تغذية ذكية تدعم نحت القوام، توازن الهرمونات، ونضارة البشرة والصحة العامة',
  macroGuidelines: {
    protein: '1.6 إلى 2.0 جرام لكل كجم من وزن الجسم (لبناء وشد العضلات ونضارة الكولاجين)',
    healthyFats: '25% إلى 30% من السعرات اليومية (ضرورية جداً لإنتاج هرمونات الأنوثة الإستروجين والبروجسترون)',
    carbs: 'كربوهيدرات معقدة غنية بالألياف (شوفان، كينوا، بطاطا حلوة، بقوليات) لتنظيم سكر الدم وتجنب تقلبات المزاج',
    water: '2.5 إلى 3 لتر ماء نقي يومياً لطرد السوائل المحتبسة وترطيب البشرة'
  },
  essentialMicroNutrients: [
    {
      name: 'الحديد (Iron)',
      benefit: 'تعويض الفاقد الشهري، منع الأنيميا والإرهاق، ونقل الأكسجين للعضلات',
      sources: 'اللحم البقري الهبر، الكبدة، العدس، السبانخ مع الليمون، بذور اليقطين'
    },
    {
      name: 'الكالسيوم وفيتامين D',
      benefit: 'حماية كثافة العظام والوقاية من الهشاشة وتقوية انقباض الألياف العضلية',
      sources: 'الزبادي اليوناني، السمسم والطحينة، الحليب المدعم، البيض، والتعرض للشمس'
    },
    {
      name: 'المغنيسيوم (Magnesium)',
      benefit: 'تهدئة تشنجات العضلات والرحم، تحسين جودة النوم، وضبط هرمونات التوتر (الكورتيزول)',
      sources: 'الشوكولاتة الداكنة (85%+ فما فوق)، اللوز، الموز، بذور الشيا، الأفوكادو'
    },
    {
      name: 'أحماض أوميغا 3 (Omega-3)',
      benefit: 'مضاد التهاب طبيعي، تقليل آلام المفاصل، ونضارة البشرة والشعر',
      sources: 'سمك السلمون، السردين، بذور الكتان المطحونة، الجوز (عين الجمل)'
    }
  ]
};

// ==========================================
// 5. دليل الدورة الشهرية ومزامنة التدريب (Cycle Syncing)
// ==========================================

export const MENSTRUAL_CYCLE_GUIDE: CyclePhaseInfo[] = [
  {
    phaseId: 'menstrual',
    nameAr: '1. مرحلة الحيض / الطمث (Menstrual Phase)',
    daysRange: 'الأيام 1 إلى 5 من الدورة',
    energyLevel: 'منخفضة / هادئة',
    hormoneStatus: 'أدنى مستويات الإستروجين والبروجسترون معاً، وتركيز الجسم على تجديد بطانة الرحم.',
    trainingAdvice: {
      recommended: [
        'تمارين المشي الهادئ في الهواء الطلق لمدة 20-30 دقيقة.',
        'إطالات اليوغا والتنفس العميق وتمارين المرونة الخفيفة.',
        'تمارين بيلاتس خفيفة وتفريغ أسفل الظهر بدون أوزان ثقيلة.',
        'الاستماع لجسدك وأخذ يوم أو يومين راحة تامة إذا كان هناك ألم أو تقلصات.'
      ],
      avoid: [
        'تمارين القفز العنيف (HIIT) أو الجري السريع المجهد.',
        'رفع الأوزان الثقيلة جداً (Deadlift / Heavy Squat) التي تضغط على الحوض.',
        'التدريب في درجات حرارة عالية أو الإرهاق المفرط.'
      ],
      coachNote: 'لا تشعري بالذنب عند تخفيف التمرين؛ الراحة في هذه الأيام تسمح لجسدك باستعادة القوة للانفجار التدريبي في الأسبوع القادم.'
    },
    nutritionAdvice: {
      keyNutrients: ['الحديد (Iron)', 'فيتامين C', 'المغنيسيوم', 'الماء والسوائل الدافئة'],
      recommendedFoods: [
        'الأطعمة الغنية بالحديد لتعويض الدم المفقود: كبدة الدجاج، اللحم الأحمر الصافي، شوربة العظام الغنية بالكولاجين، العدس، والسبانخ.',
        'الحمضيات والفلفل الرومي مع الأطعمة الغنية بالحديد لرفع امتصاصه 3 أضعاف.',
        'الأطعمة الغنية بالماء: الخيار، البطيخ، والشوربات الدافئة الخفيفة.'
      ],
      warmDrinks: [
        'مغلي الزنجبيل الطازج: مسكن طبيعي جبار لتقلصات الرحم يضاهي مفعول الإيبوبروفين.',
        'مغلي القرفة: يحفز تدفق الدورة بسلاسة ويخفف آلام التشنجات.',
        'شاي النعناع والبابونج: لتهدئة الجهاز الهضمي والنفخة والقولون.'
      ],
      foodsToAvoid: [
        'الأطعمة شديدة الملوحة والمخللات (تزيد احتباس السوائل وتورم الجسم).',
        'الإفراط في الكافيين والقهوة (قد يسبب انقباض الأوعية وزيادة المغص).',
        'الدهون المهدرجة والمقليات السريعة التي ترفع الالتهاب.'
      ],
      cravingTips: 'إذا شعرتِ بالرغبة في الشوكولاتة، تناولي مربعين من الشوكولاتة الداكنة (85% فما فوق) فهي غنية بالمغنيسيوم وتهدئ التقلصات بطبيعتها.'
    }
  },
  {
    phaseId: 'follicular',
    nameAr: '2. المرحلة الجُريبية (Follicular Phase)',
    daysRange: 'الأيام 6 إلى 13 (بعد انتهاء الحيض وحتى ما قبل الإباضة)',
    energyLevel: 'مرتفعة ومتصاعدة',
    hormoneStatus: 'ارتفاع تدريجي متسارع لهرمون الإستروجين، تحسن المزاج، وزيادة حساسية الإنسولين وقدرة العضلات على استخدام الكربوهيدرات كوقود.',
    trainingAdvice: {
      recommended: [
        'هذا هو الوقت الذهبي لرفع الأوزان وتحقيق أرقام قياسية شخصية (PRs)!',
        'تمارين المقاومة القوية للجزء السفلي والعلوي (Squats, Hip Thrust, Rows).',
        'تمارين الكارديو عالي الكثافة (HIIT) وحرق السعرات السريع.',
        'تعلم حركات جديدة وتجربة تمارين جديدة لأن التركيز الذهني والتوافق العضلي العصبي في أعلى مستوياته.'
      ],
      avoid: [
        'إهدار هذا الأسبوع في الراحة الطويلة بدون استغلال طاقة الإستروجين المتدفقة.'
      ],
      coachNote: 'أفضل أسبوع في الشهر لبناء العضلات، حرق الدهون، والشعور بالقوة والثقة الفائقة!'
    },
    nutritionAdvice: {
      keyNutrients: ['الكربوهيدرات المعقدة', 'البروتين عالي الجودة', 'مضادات الأكسدة'],
      recommendedFoods: [
        'الشوفان، الكينوا، البطاطا، والأرز البسمتي لشحن مخازن الجليكوجين.',
        'الدجاج، البيض، التونة، والزبادي اليوناني لدعم البناء العضلي السريع.',
        'الخضراوات الصليبية (بروكلي، قرنبيط، كرنب) للمساعدة في التمثيل الصحي للإستروجين وتوازن الهرمونات.',
        'بذور الكتان وبذور اليقطين لدعم المرحلة الجريبية (Seed Cycling).'
      ],
      warmDrinks: [
        'الشاي الأخضر بالليمون الغني بمضادات الأكسدة لتعزيز الأيض.',
        'الماتشا أو القهوة الصباحية المعتدلة لرفع كفاءة التمرين.'
      ],
      foodsToAvoid: [
        'السكريات المكررة والوجبات السريعة التي تسبب تذبذب الطاقة السريع.'
      ],
      cravingTips: 'الشهية تكون منضبطة وطبيعية في هذه المرحلة؛ استغلي ذلك في الالتزام الصارم بالسعرات والماكروز الصحية.'
    }
  },
  {
    phaseId: 'ovulation',
    nameAr: '3. مرحلة الإباضة (Ovulation Phase)',
    daysRange: 'الأيام 14 إلى 16 (منتصف الدورة)',
    energyLevel: 'الذروة القصوى',
    hormoneStatus: 'ذروة هرمون الإستروجين وهرمون التستوستيرون الأنثوي الطبيعي، أعلى معدل طاقة وقوة بدنية وجاذبية.',
    trainingAdvice: {
      recommended: [
        'أعلى درجات القوة الانفجارية والقدرة على التدريب المكثف.',
        'التمارين المركبة القوية والأوزان الممتازة.',
        'تمارين السبرنتات والكارديو القوي وحصص اللياقة الجماعية.'
      ],
      avoid: [
        'إهمال الإحماء الجيد! (ارتفاع الإستروجين الشديد قد يزيد من مرونة الأربطة والمفاصل، لذا احرصي على ثبات الركبتين والكاحلين لتجنب أي التواء).'
      ],
      coachNote: 'طاقتك في أوجها! ركزي على الأداء القوي مع الحفاظ على التكنيك الصحيح الصارم لحماية المفاصل.'
    },
    nutritionAdvice: {
      keyNutrients: ['الألياف الطبيعية', 'مضادات الأكسدة', 'الزنك'],
      recommendedFoods: [
        'التوتيات، الطماطم، الفواكه الطازجة الغنية بمضادات الأكسدة لدعم التبويض.',
        'الألياف الخضراء والورقيات لمساعدة الكبد على التخلص من فائض الإستروجين بعد انتهاء الإباضة.',
        'الأسماك الدهنية والمأكولات البحرية الغنية بالزنك والدهون غير المشبعة.'
      ],
      warmDrinks: [
        'الماء البارد المنعش بالنعناع وشرائح الخيار والليمون لترطيب الجسم.',
        'مغلي الهندباء البرية لدعم وظائف الكبد في تنقية الهرمونات.'
      ],
      foodsToAvoid: [
        'الأطعمة المصنعة والمليئة بالمواد الحافظة.'
      ],
      cravingTips: 'قد تلاحظين ارتفاعاً طفيفاً في درجة حرارة الجسم ومعدل الأيض؛ تناولي وجباتك البروتينية بانتظام لعدم الشعور بالجوع المفاجئ.'
    }
  },
  {
    phaseId: 'luteal',
    nameAr: '4. المرحلة الإفرازية / ما قبل الدورة (Luteal Phase & PMS)',
    daysRange: 'الأيام 17 إلى 28 (حتى بداية الدورة الجديدة)',
    energyLevel: 'متوسطة إلى منخفضة',
    hormoneStatus: 'هبوط الإستروجين وارتفاع هرمون البروجسترون، ارتفاع معدل الأيض الأساسي بحوالي 100-300 سعرة حرارية، ميل طبيعي لاحتباس السوائل وزيادة اشتهاء السكريات والدهون.',
    trainingAdvice: {
      recommended: [
        'التحول تدريجياً لتمارين بيلاتس، تمارين وزن الجسم، والمقاومة المعتدلة (Moderate Weights).',
        'زيادة فترات الراحة بين الجولات (دقيقة ونصف إلى دقيقتين).',
        'المشي المستمر المريح والسباحة والإطالات اللطيفة.',
        'تمارين التنفس والاسترخاء للسيطرة على تقلبات المزاج المصاحبة لـ PMS.'
      ],
      avoid: [
        'الضغط العصبي على نفسك لرفع أوزان قصوى إذا شعرتِ بضعف الطاقة أو الإرهاق.',
        'جلسات الكارديو الطويلة المرهقة التي قد ترفع هرمون الكورتيزول وتزيد من احتباس الماء.'
      ],
      coachNote: 'ارتفاع البروجسترون يجعل الجسم يحتاج وقتاً أطول للاستشفاء، لا تقارني أداءك اليوم بأسبوع الإباضة، فكل مرحلة لها طبيعتها البيولوجية.'
    },
    nutritionAdvice: {
      keyNutrients: ['المغنيسيوم', 'فيتامين B6', 'الألياف', 'الدهون الصحية المشبعة'],
      recommendedFoods: [
        'الأطعمة الغنية بالمغنيسيوم وفيتامين B6 لمحاربة أعراض ما قبل الطمث (PMS): الموز، الشوفان، بذور دوار الشمس، الحمص، والبطاطا.',
        'الدهون الصحية (الأفوكادو، زبدة اللوز، المكسرات) لإبقاء مستويات الشبع مرتفعة وتقليل الرغبة في السكريات.',
        'الأطعمة المدرة للبول طبيعياً لتخفيف احتباس السوائل: الهليون، الخيار، البقدونس، الأناناس.'
      ],
      warmDrinks: [
        'مغلي البابونج والخزامى (اللافندر): لتقليل التوتر وتحسين المزاج والنوم العميق.',
        'مغلي البقدونس المغسول: مدر طبيعي ممتاز للبول يطرد السوائل الزائدة بدون أدوية.',
        'شاي النعناع مع رشة قرفة لضبط مستويات السكر.'
      ],
      foodsToAvoid: [
        'الملح الزائد والأطعمة المعلبة والمخللات (تزيد من انتفاخ البطن وتورم اليدين والقدمين).',
        'الحلويات المصنعة والمعجنات البيضاء (تسبب قفزات وهبوطاً حاداً في الإنسولين مما يزيد العصبية والشراهة).'
      ],
      cravingTips: 'اشتهاء الحلويات طبيعي جداً لأن الأيض يرتفع ويطلب طاقة سريعة. البديل الذكي: موزة مهروسة مع بودرة الكاكاو الخام وملعقة زبدة فول سوداني، أو تمر محشو باللوز، أو شوكولاتة داكنة (85%+).'
    }
  }
];
