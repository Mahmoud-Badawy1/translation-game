import React, { useState, useCallback, createContext, useContext, ReactNode } from 'react';

// Translation dictionary
const translations = {
  en: {
    theAcademy: 'The Academy',
    lobbySubtitle: 'Relive 18th-century history and master civilization concepts through interactive challenges.',
    theoryArena: 'Theory Arena',
    theoryArenaDesc: 'Apply Skopos, Dynamic Equivalence, and shifts to mission cards.',
    enterArena: 'Enter Arena',
    termRace: 'History Sprint',
    termRaceDesc: 'Identify historical events like the Boston Tea Party and the Act of Union in a rapid quiz.',
    startRace: 'Start Race',
    howToPlay: 'How to Play',
    startSession: 'START SESSION',
    theoryStep1: 'Receive a phrase and a theory card. Type your translation using that strategy.',
    theoryStep2: 'A "Red Twist" will reveal a challenge. Explain your choice based on the twist!',
    theoryStep3: 'Earn up to +10 points for correct theory application per round.',
    termStep1: 'Read the historical question or event description as quickly as you can.',
    termStep2: 'Pick the correct historical term or date from the options. 3 in a row triggers a Booster!',
    termStep3: 'Correct answers are worth 10 points. Speed and streaks are key to winning the revolution!',
    chooseMode: 'Choose Mode',
    onlineArena: 'Online Arena',
    connectWithOthers: 'Connect with others',
    localParty: 'Local Party',
    shareDevice: 'Share this device',
    localPlayers: 'Local Players',
    arenaSync: 'Arena Sync',
    host: 'Host',
    student: 'Student',
    yourName: 'YOUR NAME',
    roomCode: 'ROOM CODE',
    startArena: 'START ARENA',
    addPlayersPrompt: 'Add players to start the party',
    name: 'NAME',
    missionProgress: 'Mission Progress',
    turn: 'Turn',
    currentPoints: 'Current Points',
    targetText: 'Target Text',
    typeTranslation: 'Type your translation here...',
    draftTranslation: 'DRAFT TRANSLATION',
    submitStrategy: 'SUBMIT STRATEGY',
    constraintTwist: 'Constraint Twist',
    twistQuestion: 'How does this twist change your translation? Defend your choices!',
    continueToScore: 'CONTINUE TO SCORE',
    theoryMatch: 'Theory Match (+10)',
    creativeShift: 'Creative Shift (+5)',
    nextRound: 'NEXT ROUND',
    identifyTerm: 'Identify the Term',
    booster: '2x Booster!',
    correctAnswer: 'Correct Answer',
    example: 'Example',
    continue: 'CONTINUE',
    arenaComplete: 'Arena Complete',
    sessionChampion: 'Session Champion',
    drawMatch: 'Draw Match!',
    finalScore: 'Final Score',
    newGame: 'NEW GAME',
    waitingForHost: 'Waiting for host to start new game...',
    arenaRanks: 'Arena Ranks',
    streak: 'Streak',
    activePlayer: 'Active Player',
    score: 'Score',
    local: 'Local',
    live: 'Live',
    superTranslator: 'Super Translator',
    educationalArena: 'Educational Arena',
  },
  ar: {
    theAcademy: 'الأكاديمية',
    lobbySubtitle: 'عش أجواء القرن الثامن عشر وأتقن مفاهيم الحضارة من خلال تحديات تفاعلية.',
    theoryArena: 'ساحة النظريات',
    theoryArenaDesc: 'طبّق نظرية الهدف والتكافؤ الديناميكي والتحويلات على بطاقات المهام.',
    enterArena: 'ادخل الساحة',
    termRace: 'سباق الحضارة',
    termRaceDesc: 'حدد الأحداث التاريخية مثل "حفلة شاي بوسطن" و"قانون الاتحاد" في اختبار سريع.',
    startRace: 'ابدأ السباق',
    howToPlay: 'كيف تلعب',
    startSession: 'ابدأ الجلسة',
    theoryStep1: 'استلم عبارة وبطاقة نظرية. اكتب ترجمتك باستخدام تلك الاستراتيجية.',
    theoryStep2: 'ستظهر "لفة حمراء" كتحدي. اشرح اختيارك بناءً على التحدي!',
    theoryStep3: 'احصل على ما يصل إلى +10 نقاط للتطبيق الصحيح للنظرية في كل جولة.',
    termStep1: 'اقرأ السؤال التاريخي أو وصف الحدث بأسرع ما يمكن.',
    termStep2: 'اختر المصطلح أو التاريخ الصحيح من الخيارات. 3 إجابات متتالية تفعّل المعزز!',
    termStep3: 'الإجابات الصحيحة تمنحك 10 نقاط. السرعة والتتابع هما مفتاحك للفوز بالثورة!',
    chooseMode: 'اختر الوضع',
    onlineArena: 'الساحة عبر الإنترنت',
    connectWithOthers: 'تواصل مع الآخرين',
    localParty: 'حفلة محلية',
    shareDevice: 'شارك هذا الجهاز',
    localPlayers: 'اللاعبون المحليون',
    arenaSync: 'مزامنة الساحة',
    host: 'المضيف',
    student: 'طالب',
    yourName: 'اسمك',
    roomCode: 'رمز الغرفة',
    startArena: 'ابدأ الساحة',
    addPlayersPrompt: 'أضف لاعبين لبدء الحفلة',
    name: 'الاسم',
    missionProgress: 'تقدم المهمة',
    turn: 'الدور',
    currentPoints: 'النقاط الحالية',
    targetText: 'النص المستهدف',
    typeTranslation: 'اكتب ترجمتك هنا...',
    draftTranslation: 'صياغة الترجمة',
    submitStrategy: 'إرسال الاستراتيجية',
    constraintTwist: 'لفة القيد',
    twistQuestion: 'كيف تغير هذه اللفة ترجمتك؟ دافع عن اختياراتك!',
    continueToScore: 'متابعة للتسجيل',
    theoryMatch: 'تطابق نظري (+10)',
    creativeShift: 'تحول إبداعي (+5)',
    nextRound: 'الجولة التالية',
    identifyTerm: 'حدد المصطلح',
    booster: 'معزز 2x!',
    correctAnswer: 'الإجابة الصحيحة',
    example: 'مثال',
    continue: 'متابعة',
    arenaComplete: 'اكتملت الساحة',
    sessionChampion: 'بطل الجلسة',
    drawMatch: 'تعادل!',
    finalScore: 'النتيجة النهائية',
    newGame: 'لعبة جديدة',
    waitingForHost: 'في انتظار المضيف لبدء لعبة جديدة...',
    arenaRanks: 'ترتيب الساحة',
    streak: 'تتابع',
    activePlayer: 'اللاعب النشط',
    score: 'النتيجة',
    local: 'محلي',
    live: 'مباشر',
    superTranslator: 'المترجم الخارق',
    educationalArena: 'الساحة التعليمية',
  }
};

type Language = 'en' | 'ar';
type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: TranslationKeys): string => {
    return translations[language][key] || key;
  }, [language]);

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  return { t, language, setLanguage, isRTL };
};
