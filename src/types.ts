export type Gender = 'men' | 'women';

export interface TimeSlot {
  start: string; // e.g. "13:00" or "01:00 م"
  end: string;   // e.g. "24:00" or "12:00 ص"
  startHour: number; // 24h format (e.g. 13)
  startMinute: number;
  endHour: number;   // 24h format (e.g. 24 or 0 for midnight)
  endMinute: number;
  label: string;
}

export interface DaySchedule {
  dayName: string; // "السبت", "الأحد", etc.
  dayIndex: number; // 0 for Sunday or standard JS day index: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  menSlots: TimeSlot[];
  womenSlots: TimeSlot[];
  isClosed?: boolean;
  notes?: string;
}

export interface CurrentStatusInfo {
  isOpen: boolean;
  currentSession: 'men' | 'women' | 'none';
  statusText: string;
  timeRemaining?: string;
  nextSessionText?: string;
  isFridayRest: boolean;
}

export interface ExerciseAlternative {
  name: string;
  type: 'dumbbell' | 'barbell' | 'machine' | 'cable' | 'bodyweight';
  typeLabel: string; // "دمبلز" | "بار" | "ماكينة / جهاز" | "كيبل" | "وزن الجسم"
  equipment: string;
  category?: 'free' | 'machine' | 'bodyweight'; // تصنيف الخيار: حر أو جهاز أو وزن الجسم
  notes?: string;
  imageUrl?: string;
  animationUrl?: string; // رابط الحركة المتحركة الواقعية للتمرين
}

export interface ExerciseItem {
  id: string;
  name: string;
  targetMuscle: string;
  targetMuscleDetail?: string; // e.g. "ألياف الصدر الأوسط والسفلي"
  secondaryMuscles?: string;   // e.g. "الترايسبس، الكتف الأمامي"
  sets: string; // e.g. "4×10" or "3×12"
  imageUrl: string; // Realistic natural photography of the exercise
  thumbnailUrl?: string;
  animationUrl?: string; // رابط الحركة المتحركة الواقعية للتمرين
  equipment?: string; // بار، دمبلز، كيبل، وزن الجسم، جهاز
  category?: 'free' | 'machine' | 'bodyweight'; // تصنيف: حر أو جهاز أو وزن الجسم
  executionSteps?: string[]; // خطوة بخطوة
  commonMistakes?: string[]; // أخطاء شائعة لتجنب الإصابة
  notes?: string;
  completed?: boolean;
  alternatives?: ExerciseAlternative[]; // خيارات وبدائل متاحة لنفس العضلة (بار، دمبلز، جهاز، كيبل)
}

export interface WorkoutDayPlan {
  dayName: string;
  title: string;
  targetMuscles: string;
  isRestDay: boolean;
  restDescription?: string;
  exercises: ExerciseItem[];
}

export interface RoutinePlan {
  id: '5-days' | '4-days' | '3-days';
  title: string;
  daysCount: number;
  subtitle: string;
  description: string;
  badge: string;
  days: WorkoutDayPlan[];
}

export type SubscriptionDuration = '1-month' | '3-months' | '6-months' | '1-year';

export interface MemberSubscription {
  id: string;
  memberName: string;
  phone?: string;
  startDate: string; // YYYY-MM-DD
  duration: SubscriptionDuration;
  endDate: string;   // YYYY-MM-DD
  createdAt: string;
  notes?: string;
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  loseWeightCalories: number;
  gainWeightCalories: number;
  macros: {
    gain: { protein: number; carbs: number; fats: number };
    lose: { protein: number; carbs: number; fats: number };
  };
}

export interface WorkoutBurnSession {
  id: string;
  date: string;
  durationSeconds: number;
  caloriesBurned: number;
  intensity: 'light' | 'moderate' | 'intense';
  workoutName: string;
}

export interface WomenExercise {
  id: string;
  name: string;
  targetMuscle: string;
  targetMuscleDetail: string;
  sets: string;
  imageUrl: string;
  animationUrl?: string;
  equipment: string;
  category: 'free' | 'machine' | 'bodyweight';
  executionSteps: string[];
  tips: string;
  alternatives?: ExerciseAlternative[];
}

export interface WomenWorkoutDay {
  dayName: string;
  title: string;
  focusArea: string;
  badge: string;
  description: string;
  exercises: WomenExercise[];
}

export interface WomenProgramOption {
  id: string;
  name: string;
  badge: string;
  description: string;
  idealFor: string;
  frequency: string;
  days: WomenWorkoutDay[];
}

export interface WomenWeightGoalPlan {
  type: 'loss' | 'gain';
  title: string;
  subtitle: string;
  targetCaloriesNote: string;
  proteinRule: string;
  keyPrinciples: { title: string; desc: string }[];
  goldenTips: string[];
  foodsToFocus: string[];
  foodsToLimit: string[];
  sampleDayMeals: {
    mealName: string;
    time: string;
    calories: string;
    items: string[];
    coachTip: string;
  }[];
  specialRecipe?: {
    name: string;
    ingredients: string[];
    prep: string;
    benefit: string;
  };
}

export interface CyclePhaseInfo {
  phaseId: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  nameAr: string;
  daysRange: string;
  energyLevel: 'منخفضة / هادئة' | 'مرتفعة ومتصاعدة' | 'الذروة القصوى' | 'متوسطة إلى منخفضة';
  hormoneStatus: string;
  trainingAdvice: {
    recommended: string[];
    avoid: string[];
    coachNote: string;
  };
  nutritionAdvice: {
    keyNutrients: string[];
    recommendedFoods: string[];
    warmDrinks: string[];
    foodsToAvoid: string[];
    cravingTips: string;
  };
}
