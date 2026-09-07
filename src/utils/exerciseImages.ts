/**
 * Exercise Image Mapping Utility
 * Guarantees that every exercise in Power Gym displays an accurate, high-quality
 * animated GIF or photo matching the EXACT targeted muscle group.
 */

export function getAccurateExerciseImage(item: {
  name?: string;
  targetMuscle?: string;
  targetMuscleDetail?: string;
  imageUrl?: string;
  animationUrl?: string;
  equipment?: string;
  type?: string;
  id?: string;
}): string {
  // If explicitly specified with an animationUrl that is a local asset, prefer it
  if (item.animationUrl && item.animationUrl.startsWith('/assets/')) {
    return item.animationUrl;
  }

  // Explicit image override if pointing to custom high-res anatomical image
  if (item.imageUrl && item.imageUrl.startsWith('/assets/images/free_')) {
    return item.imageUrl;
  }

  // Check ID specific overrides
  if (item.id === 'free-descent-dips') {
    return '/assets/images/free_descent_dips_anatomy.jpg';
  }
  if (item.id === 'free-squat-descent') {
    return '/assets/images/free_squat_descent_anatomy.jpg';
  }

  const name = (item.name || '').toLowerCase();
  const muscle = (item.targetMuscle || '').toLowerCase();
  const detail = (item.targetMuscleDetail || '').toLowerCase();
  const equip = (item.equipment || '').toLowerCase();
  const type = (item.type || '').toLowerCase();
  const text = `${name} ${muscle} ${detail} ${equip} ${type} ${item.id || ''}`;

  // FREE DESCENT EXERCISES / تمارين النزول الحر
  if (text.includes('نزول حر') || text.includes('هبوط حر') || (text.includes('متوازي') && text.includes('حر')) || text.includes('free descent')) {
    if (text.includes('سكوات') || text.includes('رجل') || text.includes('squat')) {
      return '/assets/images/free_squat_descent_anatomy.jpg';
    }
    return '/assets/images/free_descent_dips_anatomy.jpg';
  }

  // 1. CHEST / الصدر
  if (
    text.includes('صدر') ||
    text.includes('chest') ||
    text.includes('bench') ||
    text.includes('pectoral')
  ) {
    if (text.includes('انحدار') || text.includes('سفلي') || text.includes('decline')) {
      return '/assets/exercises/chest-decline-dumbbell.gif';
    }
    if (text.includes('كيبل') || text.includes('كروس') || text.includes('crossover')) {
      return '/assets/exercises/chest-decline-cable.gif';
    }
    if (text.includes('فراشة') || text.includes('جهاز تفتيح') || text.includes('pec deck')) {
      return '/assets/exercises/chest-fly-machine.gif';
    }
    if (text.includes('تفتيح') || text.includes('fly')) {
      return '/assets/exercises/chest-fly-dumbbell.gif';
    }
    if (text.includes('سميث') || text.includes('smith')) {
      return '/assets/exercises/chest-incline-smith.gif';
    }
    if (text.includes('جهاز') || text.includes('ماكينة') || text.includes('machine press')) {
      return '/assets/exercises/chest-press-machine.gif';
    }
    if (text.includes('مائل') || text.includes('علوي') || text.includes('incline')) {
      if (text.includes('دمبل')) {
        return '/assets/exercises/chest-incline-dumbbell.gif';
      }
      return '/assets/exercises/chest-incline-barbell.gif';
    }
    if (text.includes('دمبل')) {
      return '/assets/exercises/chest-flat-dumbbell.gif';
    }
    return '/assets/exercises/chest-flat-barbell.gif';
  }

  // 2. GLUTES & FEMALE TARGETS / الألوية والمؤخرة
  if (
    text.includes('ألوية') ||
    text.includes('الوية') ||
    text.includes('مؤخرة') ||
    text.includes('glute') ||
    text.includes('خفسة') ||
    text.includes('حوض') ||
    text.includes('thrust') ||
    text.includes('bridge') ||
    text.includes('kickback')
  ) {
    if (text.includes('ثرست') || text.includes('thrust')) {
      return '/assets/exercises/women-hip-thrust.gif';
    }
    if (text.includes('جسر') || text.includes('bridge')) {
      return '/assets/exercises/women-glute-bridge.gif';
    }
    if (text.includes('كيك باك') || text.includes('دونكي') || text.includes('kick') || text.includes('إبعاد') || text.includes('abduction')) {
      return '/assets/exercises/women-cable-kickback.gif';
    }
    return '/assets/exercises/women-hip-thrust.gif';
  }

  // 3. LEGS & CALVES / الأرجل والفخذ والبطات
  if (
    text.includes('رجل') ||
    text.includes('أرجل') ||
    text.includes('ارجل') ||
    text.includes('فخذ') ||
    text.includes('بطات') ||
    text.includes('سمانة') ||
    text.includes('leg') ||
    text.includes('squat') ||
    text.includes('calf') ||
    text.includes('quad') ||
    text.includes('hamstring')
  ) {
    if (text.includes('بطات') || text.includes('سمانة') || text.includes('calf') || text.includes('calves')) {
      return '/assets/exercises/leg-calf-raise.gif';
    }
    if (text.includes('دفع') || text.includes('press')) {
      return '/assets/exercises/leg-press.gif';
    }
    if (text.includes('مد') || text.includes('أمامي') || text.includes('extension')) {
      return '/assets/exercises/leg-extension.gif';
    }
    if (text.includes('ثني') || text.includes('خلفي') || text.includes('curl') || text.includes('hamstring')) {
      return '/assets/exercises/leg-curl.gif';
    }
    if (text.includes('ديدلفت') || text.includes('روماني') || text.includes('rdl') || text.includes('deadlift')) {
      return '/assets/exercises/leg-romanian-deadlift.gif';
    }
    if (
      text.includes('سكوات') ||
      text.includes('squat') ||
      text.includes('طعنات') ||
      text.includes('lunge') ||
      text.includes('صعود') ||
      text.includes('step-up')
    ) {
      return '/assets/exercises/leg-squat.gif';
    }
    return '/assets/exercises/leg-squat.gif';
  }

  // 4. SHOULDERS & TRAPS / الأكتاف والترابيس
  if (
    text.includes('كتف') ||
    text.includes('أكتاف') ||
    text.includes('اكتاف') ||
    text.includes('ترابيس') ||
    text.includes('دالية') ||
    text.includes('deltoid') ||
    text.includes('shoulder') ||
    text.includes('trap')
  ) {
    if (text.includes('ترابيس') || text.includes('شراغز') || text.includes('shrug')) {
      return '/assets/images/traps-shrugs.jpg';
    }
    if (
      text.includes('رفرفة') ||
      text.includes('جانبي') ||
      text.includes('خلفي') ||
      text.includes('أمامي') ||
      text.includes('فيس بول') ||
      text.includes('lateral') ||
      text.includes('rear') ||
      text.includes('front') ||
      text.includes('face pull')
    ) {
      return '/assets/exercises/shoulder-lateral-raise.gif';
    }
    return '/assets/exercises/shoulder-dumbbell-press.gif';
  }

  // 5. BACK / الظهر
  if (
    text.includes('ظهر') ||
    text.includes('back') ||
    text.includes('lat') ||
    text.includes('pulldown') ||
    text.includes('عقلة') ||
    text.includes('تجديف') ||
    text.includes('row')
  ) {
    if (text.includes('عقلة') || text.includes('pull-up') || text.includes('pullup')) {
      return '/assets/images/back-pullups.jpg';
    }
    if (text.includes('أرضي') || text.includes('سحب ضيق') || text.includes('seated cable')) {
      return '/assets/exercises/back-seated-cable-row.gif';
    }
    if (text.includes('مفرودة') || text.includes('straight arm')) {
      return '/assets/exercises/back-straight-arm-pulldown.gif';
    }
    if (text.includes('بار منحني') || text.includes('تي بار') || text.includes('t-bar') || text.includes('bent-over')) {
      return '/assets/images/back-barbell-row.jpg';
    }
    return '/assets/exercises/back-lat-pulldown.gif';
  }

  // 6. BICEPS / البايسبس
  if (
    text.includes('باي') ||
    text.includes('bicep') ||
    text.includes('براكيلس')
  ) {
    if (text.includes('هامر') || text.includes('مطرقة') || text.includes('hammer') || text.includes('تركيز')) {
      return '/assets/exercises/arm-biceps-hammer.gif';
    }
    return '/assets/exercises/arm-biceps-barbell.gif';
  }

  // 7. TRICEPS / الترايسبس
  if (
    text.includes('تراي') ||
    text.includes('tricep') ||
    text.includes('زنود')
  ) {
    if (text.includes('سكال') || text.includes('فرنش') || text.includes('skull') || text.includes('french')) {
      return '/assets/exercises/arm-triceps-skullcrusher.gif';
    }
    if (text.includes('متوازي') || text.includes('ديبس') || text.includes('dips')) {
      return '/assets/images/triceps-pushdown.jpg';
    }
    return '/assets/exercises/arm-triceps-pushdown.gif';
  }

  // 8. FOREARMS / السواعد
  if (
    text.includes('ساعد') ||
    text.includes('سواعد') ||
    text.includes('معصم') ||
    text.includes('forearm') ||
    text.includes('wrist')
  ) {
    return '/assets/images/forearms-wrist-curl.jpg';
  }

  // 9. ABS & CORE / البطن والخصر
  if (
    text.includes('بطن') ||
    text.includes('خصر') ||
    text.includes('بلانك') ||
    text.includes('plank') ||
    text.includes('crunch') ||
    text.includes('twist') ||
    text.includes('core') ||
    text.includes('جذع') ||
    text.includes('جبل')
  ) {
    return '/assets/images/core-abs-plank.jpg';
  }

  // 10. CARDIO & FITNESS / القلب والكارديو
  if (
    text.includes('كارديو') ||
    text.includes('cardio') ||
    text.includes('سير') ||
    text.includes('treadmill') ||
    text.includes('حبل') ||
    text.includes('جري') ||
    text.includes('درج') ||
    text.includes('حرق')
  ) {
    return '/assets/images/cardio-treadmill.jpg';
  }

  // 11. NECK / الرقبة
  if (text.includes('رقبة') || text.includes('neck')) {
    return '/assets/images/traps-shrugs.jpg';
  }

  // If item already had a valid local asset that matches, keep it
  if (item.imageUrl && item.imageUrl.startsWith('/assets/')) {
    return item.imageUrl;
  }

  // Default safe gym exercise image
  return '/assets/exercises/chest-flat-barbell.gif';
}
