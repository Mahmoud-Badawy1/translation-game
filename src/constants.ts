import { Card, Term } from './types';

export const MISSION_DECK: Card[] = [
    {
        id: 'm1',
        category: 'QUEST',
        titleEn: 'Idiom',
        titleAr: 'اصطلاح',
        content: "It's raining cats and dogs",
        descriptionEn: 'Classic idiom for heavy rain.',
        descriptionAr: 'تعبير مجازي للمطر الغزير.',
        color: '#3B82F6',
        examples: ["تمطر بغزارة (Dynamic)", "إنها تمطر قططاً وكلاباً (Formal)", "السماء تصب صباً (Poetic)"]
    },
    {
        id: 'm2',
        category: 'QUEST',
        titleEn: 'Religious',
        titleAr: 'ديني',
        content: "Insha'Allah",
        descriptionEn: 'Cultural nuance depends on context.',
        descriptionAr: 'عبارة تعتمد على السياق الثقافي.',
        color: '#3B82F6',
        examples: ["If God wills (Literal)", "Hopefully (Communicative)", "I'll try my best (Contextual)"]
    },
    {
        id: 'm3',
        category: 'QUEST',
        titleEn: 'Metaphor',
        titleAr: 'استعارة',
        content: "To turn over a new leaf",
        descriptionEn: 'Idiom for starting fresh.',
        descriptionAr: 'البدء من جديد.',
        color: '#3B82F6',
        examples: ["يفتح صفحة جديدة (Equivalent Metaphor)", "يبدأ بداية جديدة (Sense-for-sense)"]
    },
    {
        id: 'm4',
        category: 'QUEST',
        titleEn: 'Proverb',
        titleAr: 'مثل',
        content: "A penny saved is a penny earned",
        descriptionEn: 'Wisdom about thriftiness.',
        descriptionAr: 'حكمة عن الاقتصاد في المال.',
        color: '#3B82F6',
        examples: ["القرش الأبيض ينفع في اليوم الأسود (Cultural Equivalence)", "توفير القرش كسب له (Formal)"]
    },
    {
        id: 'm5',
        category: 'QUEST',
        titleEn: 'Classic Saying',
        titleAr: 'قول مأثور',
        content: "الجنة تحت أقدام الأمهات",
        descriptionEn: 'Honor mothers.',
        descriptionAr: 'تكريم الأمهات.',
        color: '#3B82F6',
        examples: ["Paradise lies at the feet of mothers", "Heaven is found beneath the feet of mothers"]
    },
];

export const THEORY_DECK: Card[] = [
    { id: 't1', category: 'TOOL', titleEn: 'Formal Equivalence', titleAr: 'التكافؤ الشكلي', content: 'Formal Equivalence', descriptionEn: 'Word-for-word, focus on form.', descriptionAr: 'ترجمة حرفية تركز على الشكل.', color: '#10B981' },
    { id: 't2', category: 'TOOL', titleEn: 'Dynamic Equivalence', titleAr: 'التكافؤ الديناميكي', content: 'Dynamic Equivalence', descriptionEn: 'Meaning-for-meaning, focus on effect.', descriptionAr: 'ترجمة تركز على المعنى والأثر.', color: '#10B981' },
    { id: 't3', category: 'TOOL', titleEn: 'Skopos Theory', titleAr: 'نظرية الهدف', content: 'Skopos Theory', descriptionEn: 'The purpose of the translation is priority.', descriptionAr: 'الهدف من الترجمة هو الأولوية القصوى.', color: '#10B981' },
    { id: 't4', category: 'TOOL', titleEn: "Catford's Shifts", titleAr: 'تحويلات كاتفورد', content: "Catford's Shifts", descriptionEn: 'Structural or grammar reordering.', descriptionAr: 'تغيير في الهيكل أو القواعد.', color: '#10B981' },
];

export const TWIST_DECK: Card[] = [
    { id: 'w1', category: 'TWIST', titleEn: 'Semantic Loss', titleAr: 'فقدان دلالي', content: 'Loss', descriptionEn: 'Identify what nuance was sacrificed.', descriptionAr: 'حدد الفروق الدقيقة التي تم التضحية بها.', color: '#EF4444' },
    { id: 'w2', category: 'TWIST', titleEn: 'Communicative Gain', titleAr: 'مكسب تواصلي', content: 'Gain', descriptionEn: 'Identify added clarity for the reader.', descriptionAr: 'حدد الوضوح المضاف للقارئ.', color: '#EF4444' },
    { id: 'w3', category: 'TWIST', titleEn: 'Ideology', titleAr: 'أيديولوجيا', content: 'Ideology', descriptionEn: 'Inject a specific political/social bias.', descriptionAr: 'إضافة تحيز سياسي أو اجتماعي محدد.', color: '#EF4444' },
    { id: 'w4', category: 'TWIST', titleEn: 'Invisibility', titleAr: 'عدم مرئية المترجم', content: "Translator's Invisibility", descriptionEn: 'Make the text feel completely native.', descriptionAr: 'جعل النص يبدو أصيلاً تماماً.', color: '#EF4444' },
];

export const GLOSSARY_TERMS: Term[] = [
    {
        id: 'g1',
        term: 'Omission',
        definition: 'The act of intentionally leaving out a word or phrase from the source text.',
        example: "Leaving out 'Insha'Allah' when translating to a context where it's purely a filler word."
    },
    {
        id: 'g2',
        term: 'Domestication',
        definition: 'Making the text closely conform to the culture of the language being translated to.',
        example: "Translating 'Thanksgiving turkey' as 'عشاء العيد' in a localized Arabic context."
    },
    {
        id: 'g3',
        term: 'Foreignization',
        definition: 'Retaining information from the source text and breaking target language conventions.',
        example: "Keeping names and specific cultural food terms (like 'Kimchi') exactly as they are."
    },
    {
        id: 'g4',
        term: 'Calque',
        definition: 'A word or phrase borrowed from another language by literal, word-for-word translation.',
        example: "'Skyscraper' translated to 'ناطحة سحاب' in Arabic."
    },
    {
        id: 'g5',
        term: 'Adaptation',
        definition: 'Replacing a source-cultural element with one from the target culture.',
        example: "Replacing 'Cricket' with 'Football' to explain a popular sport in another country."
    },
    {
        id: 'g6',
        term: 'Modulation',
        definition: 'Changing the point of view or semantic perspective of the message.',
        example: "Translating 'It is not difficult' as 'إنه سهل' (It is easy)."
    },
    {
        id: 'g7',
        term: 'Transposition',
        definition: 'Replacing one word class with another without changing the meaning.',
        example: "Changing a noun into a verb during translation: 'After his arrival' to 'بعد أن وصل'."
    },
    {
        id: 'g8',
        term: 'Borrowing',
        definition: 'Taking a word directly from the source language without translation.',
        example: "Using 'Internet' or 'Computer' directly in Arabic."
    }
];
