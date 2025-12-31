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
    id: 'q1',
    term: 'A system with absolute monarchy and a privileged stratified society',
    definition: 'What best defines the Ancien Régime as described in the lecture?',
    example: 'Reference: The Ancien Régime was based on absolute monarchy and a rigid social hierarchy.'
  },
  {
    id: 'q2',
    term: 'Agriculture-based economy',
    definition: 'In the Ancien Régime, which economic base is emphasized?',
    example: 'Reference: The economy of the Ancien Régime relied mainly on agriculture, with land as the main source of wealth.'
  },
  {
    id: 'q3',
    term: 'Nobility and clergy',
    definition: 'Which groups are described as privileged estates in the Ancien Régime?',
    example: 'Reference: The First Estate (clergy) and the Second Estate (nobility) enjoyed privileges such as tax exemption.'
  },
  {
    id: 'q4',
    term: 'Paying taxes and lacking political privilege',
    definition: 'According to the lecture, the Third Estate is characterized by:',
    example: 'Reference: The Third Estate paid most taxes while lacking political power and legal privileges.'
  },
  {
    id: 'q5',
    term: 'The Third Estate is everything, yet has been nothing in the political order',
    definition: "Abbé Sieyès' statement about the Third Estate emphasizes that:",
    example: "Reference: Sieyès argued that the Third Estate was everything but had no political power."
  },
  {
    id: 'q6',
    term: 'The rise of the bourgeoisie and Enlightenment ideas',
    definition: 'What factors contributed to the crisis of the Ancien Régime?',
    example: 'Reference: Bourgeois critics and Enlightenment ideas challenged the traditional social order.'
  },
  {
    id: 'q7',
    term: 'Peasants working from home with raw materials provided by merchants',
    definition: 'The "domestic system" in manufacturing involved:',
    example: 'Reference: The domestic system allowed peasants to work from home using materials from merchants.'
  },
  {
    id: 'q8',
    term: 'The trade of manufactured goods, enslaved people, and raw materials between Europe, Africa, and the Americas',
    definition: 'The "triangular trade" refers to:',
    example: 'Reference: Triangular trade involved manufactured goods to Africa, enslaved people to Americas, and raw materials to Europe.'
  },
  {
    id: 'q9',
    term: 'The Bill of Rights (1689)',
    definition: 'Which document established parliamentary supremacy in England after the Glorious Revolution?',
    example: 'Reference: The Bill of Rights (1689) limited the monarchy and established parliamentary authority.'
  },
  {
    id: 'q10',
    term: 'Whigs and Tories',
    definition: 'What were the two main political parties in 18th-century Britain?',
    example: 'Reference: The Whigs and Tories were the dominant organized political parties.'
  },
  {
    id: 'q11',
    term: 'A system where absolute monarchs applied Enlightenment ideas for reform without giving up power',
    definition: 'What is "Enlightened Despotism"?',
    example: 'Reference: Enlightened Despotism followed the slogan: "All for the people, nothing by the people".'
  },
  {
    id: 'q12',
    term: 'No taxation without representation',
    definition: 'What was the main slogan of the American colonists against British taxes?',
    example: 'Reference: Colonists protested against taxes like the Stamp Act under the slogan "No taxation without representation".'
  },
  {
    id: 'q13',
    term: 'The Boston Tea Party',
    definition: 'Which 1773 event was a major act of colonial defiance against British tax policies?',
    example: 'Reference: The Boston Tea Party was a protest against the Tea Act and British taxation.'
  },
  {
    id: 'q14',
    term: 'Common Sense by Thomas Paine',
    definition: 'Which 1776 pamphlet mobilized American public opinion in favor of independence?',
    example: 'Reference: Thomas Paine’s Common Sense was crucial in mobilizing support for the revolution.'
  },
  {
    id: 'q15',
    term: 'The Battle of Saratoga',
    definition: 'Which battle is considered the turning point of the American Revolution, leading to French support?',
    example: 'Reference: The victory at Saratoga (1777) convinced the French to support the American colonies.'
  },
  {
    id: 'q16',
    term: 'The rise of periodicals like The Tatler and The Spectator',
    definition: 'A major development in 18th-century British journalism was:',
    example: 'Reference: Periodicals like The Tatler and The Spectator targeted middle-class readers and shaped public opinion.'
  },
  {
    id: 'q17',
    term: 'Samuel Johnson',
    definition: 'Who compiled the influential "Dictionary of the English Language" in 1755?',
    example: "Reference: Samuel Johnson's dictionary was a landmark in English lexicography."
  },
  {
    id: 'q18',
    term: 'Epistolary novels (novels in letters) and Gothic fiction',
    definition: 'What new literary forms gained popularity in the 18th century?',
    example: 'Reference: The century saw the rise of the epistolary novel and Gothic fiction like The Castle of Otranto.'
  },
  {
    id: 'q19',
    term: 'Electoral districts with few voters controlled by wealthy patrons',
    definition: 'The term "rotten boroughs" referred to:',
    example: 'Reference: Rotten boroughs allowed elites to control seats in Parliament with minimal voters.'
  },
  {
    id: 'q20',
    term: 'Reason, science, and the rational organization of society',
    definition: 'The Enlightenment movement primarily promoted:',
    example: 'Reference: The Enlightenment sought to organize society more liberally through knowledge and reason.'
  },
    {
    id: 'q21',
    term: 'The maturation of British colonies and the rise of revolutionary ideas',
    definition: 'Which century is described as a decisive period in American history, marked by these two factors?',
    example: 'Reference: The eighteenth century was decisive in American history, witnessing the growth of the colonies and revolutionary thought. [cite: 1881]'
  },
  {
    id: 'q22',
    term: 'Jamestown, Virginia (1607)',
    definition: 'Which settlement is identified as the first major English foothold in the Thirteen Colonies?',
    example: 'Reference: Jamestown, founded in 1607, was the first permanent English settlement. [cite: 1897]'
  },
  {
    id: 'q23',
    term: 'Puritan traditions, fishing, trade, and town-based governance',
    definition: 'Which description best matches the New England colonies as described in the lecture?',
    example: 'Reference: New England was shaped by Puritan values, fishing, trade, and town meetings. [cite: 1913]'
  },
  {
    id: 'q24',
    term: 'Ethnically diverse, economically mixed, and religiously pluralistic',
    definition: 'Which description best matches the Middle Colonies according to the lecture?',
    example: 'Reference: The Middle Colonies were diverse in ethnicity, religion, and economy. [cite: 1921]'
  },
  {
    id: 'q25',
    term: 'Plantation-based, socially stratified, and dependent on enslaved labor',
    definition: 'How are the Southern Colonies characterized in the lecture?',
    example: 'Reference: Southern colonies relied on plantation agriculture and enslaved labor. [cite: 1929]'
  },
  {
    id: 'q26',
    term: 'Personal faith, emotional experience, and moral reform',
    definition: 'The First Great Awakening (1730s-1740s) emphasized which approach to religion?',
    example: 'Reference: The Great Awakening stressed personal religious experience and moral renewal. [cite: 1946]'
  },
  {
    id: 'q27',
    term: 'Encouraging individual conscience and resistance to hierarchy',
    definition: 'How did the Great Awakening help prepare the ideological ground for the Revolution?',
    example: 'Reference: The movement encouraged questioning authority and valuing individual conscience. [cite: 1955]'
  },
  {
    id: 'q28',
    term: 'Town meetings, elected representation, and written constitutions',
    definition: 'Which practices formed the basis for later American republican government?',
    example: 'Reference: Colonial self-government practices shaped later republican institutions. [cite: 1998]'
  },
  {
    id: 'q29',
    term: 'Lexington and Concord (1775)',
    definition: 'Where did the first battles of the armed conflict erupt in 1775?',
    example: 'Reference: The first battles occurred at Lexington and Concord in 1775. [cite: 2031]'
  },
  {
    id: 'q30',
    term: 'A constitutional monarchy consolidating parliamentary sovereignty',
    definition: 'How was 18th-century England defined after the Glorious Revolution?',
    example: 'Reference: After the Glorious Revolution, England developed a stable constitutional monarchy with Parliament holding primary authority. [cite: 1581]'
  },
  {
    id: 'q31',
    term: 'Whigs',
    definition: 'In the lecture, which party supported commerce and civil liberties?',
    example: 'Reference: The Whigs supported commerce, civil liberties, and parliamentary authority. [cite: 1604]'
  },
  {
    id: 'q32',
    term: 'Tories',
    definition: 'In the lecture, which party upheld aristocratic tradition and social hierarchy?',
    example: 'Reference: The Tories defended aristocratic tradition and established social hierarchy. [cite: 1612]'
  },
  {
    id: 'q33',
    term: 'A single kingdom that strengthened political stability (Act of Union 1707)',
    definition: 'The 1707 Act of Union united England and Scotland under what form?',
    example: 'Reference: The Act of Union (1707) united England and Scotland into a single kingdom, enhancing political stability. [cite: 1622]'
  },
  {
    id: 'q34',
    term: 'Expanded press freedom and party-affiliated newspapers',
    definition: 'Which development fostered broader public political discourse in 18th-century Britain?',
    example: 'Reference: Press freedom expanded, and newspapers affiliated with political parties encouraged public debate. [cite: 1631]'
  },
  {
    id: 'q35',
    term: 'The Seven Years\' War (1756-1763)',
    definition: 'The financial cost of which war prompted Parliament to tax the American colonies?',
    example: 'Reference: Britain\'s victory in the Seven Years\' War created heavy financial costs, leading Parliament to tax the colonies. [cite: 1639]'
  },
  {
    id: 'q36',
    term: 'Centers for civic debate and reformist agitation',
    definition: 'How are London\'s political clubs and coffeehouses described in the lecture?',
    example: 'Reference: Coffeehouses and clubs became centers for political discussion and reformist activity. [cite: 1663]'
  },
  {
    id: 'q37',
    term: 'A new commercial and professional middle class',
    definition: 'Which major social shift emerged between the aristocracy and the laboring poor?',
    example: 'Reference: A growing commercial and professional middle class emerged between elites and the laboring poor. [cite: 1677]'
  },
  {
    id: 'q38',
    term: 'John and Charles Wesley',
    definition: 'Who founded the Methodist movement which emphasized personal faith?',
    example: 'Reference: Methodism was founded by John and Charles Wesley and emphasized personal faith. [cite: 1694]'
  },
  {
    id: 'q39',
    term: 'Spinning jenny and water frame',
    definition: 'Which inventions revolutionized textile production in the early Industrial Revolution?',
    example: 'Reference: Inventions such as the spinning jenny and the water frame transformed textile production. [cite: 1702]'
  },
  {
    id: 'q40',
    term: 'Constitutional, commercial, imperial, and print-saturated society',
    definition: 'How does the lecture ultimately summarize 18th-century Britain?',
    example: 'Reference: Britain developed into a constitutional, commercial, imperial, and print-dominated society. [cite: 1828]'
  },
    {
    id: 'q41',
    term: 'The Tatler (1709) and The Spectator (1711)',
    definition: 'Which periodicals were founded by Joseph Addison and Richard Steele to address middle-class readers with moral and literary essays?',
    example: 'Reference: Addison and Steele founded The Tatler and later The Spectator to address middle-class readers[cite: 1710].'
  },
  {
    id: 'q42',
    term: 'Jonathan Swift',
    definition: "Who wrote Gulliver's Travels (1726), using fictional voyages to critique human folly and political absurdity?",
    example: "Reference: Jonathan Swift used fictional voyages in Gulliver's Travels to satirize politics and human nature[cite: 1719]."
  },
  {
    id: 'q43',
    term: 'Alexander Pope',
    definition: 'Which writer is linked to "The Rape of the Lock" (1712) and "An Essay on Man" (1734)?',
    example: 'Reference: Alexander Pope wrote both The Rape of the Lock and An Essay on Man[cite: 1728].'
  },
  {
    id: 'q44',
    term: 'Individual survival, self-reliance, and colonial expansion',
    definition: 'In the lecture, what themes does Robinson Crusoe (1719) explore?',
    example: 'Reference: Robinson Crusoe explores individual survival, self-reliance, and colonial expansion[cite: 1736].'
  },
  {
    id: 'q45',
    term: 'Epistolary (letter) form',
    definition: 'Samuel Richardson\'s "Pamela" (1740) is identified as a novel written in which form?',
    example: 'Reference: Samuel Richardson\'s Pamela is written in the epistolary form, using letters[cite: 1744].'
  },
  {
    id: 'q46',
    term: 'Comic realism and satire to critique society',
    definition: "According to the lecture, Henry Fielding's Tom Jones (1749) is noted for using:",
    example: "Reference: Tom Jones employs comic realism and satire to critique society[cite: 1752]."
  },
  {
    id: 'q47',
    term: 'Evelina by Fanny Burney',
    definition: "Which novel is connected to women's experiences in navigating a changing society?",
    example: "Reference: Fanny Burney's Evelina focuses on women's social experience and identity[cite: 1760]."
  },
  {
    id: 'q48',
    term: 'Dictionary of the English Language (1755)',
    definition: "Which work is listed as Samuel Johnson's major contribution to lexicography?",
    example: "Reference: Samuel Johnson's Dictionary of the English Language (1755) was a major lexicographical achievement[cite: 1769]."
  },
  {
    id: 'q49',
    term: 'Thomas Gray',
    definition: 'Which writer is associated with "Elegy Written in a Country Churchyard" (1751) and its pre-romantic tone?',
    example: 'Reference: Thomas Gray\'s Elegy Written in a Country Churchyard reflects a pre-Romantic sensibility[cite: 1778].'
  },
  {
    id: 'q50',
    term: 'The Castle of Otranto (1764) by Horace Walpole',
    definition: 'Which text is described as launching Gothic fiction?',
    example: 'Reference: Horace Walpole\'s The Castle of Otranto is considered the first Gothic novel[cite: 1787].'
  },
  {
    id: 'q51',
    term: 'Social comedy by satirizing elite pretensions',
    definition: 'On the 18th-century stage, Sheridan and Goldsmith are noted for revitalizing:',
    example: 'Reference: Sheridan and Goldsmith revived social comedy through satire of elite society[cite: 1795].'
  },
  {
    id: 'q52',
    term: 'Political reform, economic innovation, social transformation, and cultural production',
    definition: 'The "transition" section argues that the 18th century featured a dense interweaving of:',
    example: 'Reference: The century combined political reform, economic change, social transformation, and cultural growth[cite: 1802].'
  },
  {
    id: 'q53',
    term: 'Urban consumerism',
    definition: 'Industrial growth and global trade are said to have fueled prosperity and:',
    example: 'Reference: Industrial expansion and global trade encouraged urban consumer culture[cite: 1811].'
  },
  {
    id: 'q54',
    term: 'Coffeehouses, clubs, and salons',
    definition: 'Which set of "new social spaces" empowered broader public discourse and debate?',
    example: 'Reference: Coffeehouses, clubs, and salons enabled public discussion and debate[cite: 1820].'
  },
  {
    id: 'q55',
    term: 'Only property-owning men (about one-quarter of adult males)',
    definition: 'Regarding voting rights in the 1720s, who could vote?',
    example: 'Reference: Voting was restricted to property-owning men, representing about a quarter of adult males[cite: 1837].'
  },
  {
    id: 'q56',
    term: 'Public voting (no secret ballot) enabled coercion or bribery',
    definition: 'Why could wealthy patrons often influence elections according to the lecture?',
    example: 'Reference: Public voting allowed landlords to pressure or bribe voters[cite: 1846].'
  },
  {
    id: 'q57',
    term: 'Boroughs with tiny electorates controlled by local elites',
    definition: 'What are "rotten boroughs" as described in the lecture?',
    example: 'Reference: Rotten boroughs had very small electorates dominated by local elites[cite: 1855].'
  },
  {
    id: 'q58',
    term: 'The possession of property',
    definition: 'The lecture summarizes political power in the period as being inextricably connected with:',
    example: 'Reference: Political influence was closely linked to property ownership[cite: 1864].'
  },
  {
    id: 'q59',
    term: 'Rising agricultural output and improved farming that reduced famine',
    definition: 'How was the population of seven million supported from 1700 to the 1740s?',
    example: 'Reference: Improved agriculture supported population stability and reduced famine[cite: 1872].'
  },
  {
    id: 'q60',
    term: 'Secured French support for the American colonies',
    definition: 'What was the major outcome of the victory at the Battle of Saratoga (1777)?',
    example: 'Reference: The victory at Saratoga secured French support for the colonies[cite: 2040].'
  },
    {
    id: 'q61',
    term: 'House of Lords and House of Commons',
    definition: 'England’s parliamentary monarchy is described as being limited by which two chambers?',
    example: 'Reference: Parliament consisted of the House of Lords and the House of Commons. [cite: 1468]'
  },
  {
    id: 'q62',
    term: '1649: Charles I executed; Cromwell proclaimed a Republic and later a dictatorship',
    definition: 'Which event is correctly matched with its outcome regarding the English Civil War?',
    example: 'Reference: Charles I was executed in 1649, leading to the republican rule of Oliver Cromwell. [cite: 1477]'
  },
  {
    id: 'q63',
    term: 'Parliament offering the crown to William III under the Bill of Rights',
    definition: 'The 1689 Revolution described in the lecture led to what outcome?',
    example: 'Reference: The Glorious Revolution established parliamentary supremacy through the Bill of Rights. [cite: 1485]'
  },
  {
    id: 'q64',
    term: 'Colonies were taxed and denied representation; trade monopolies were imposed',
    definition: 'Which set of causes for the American Revolution is stated in the lecture?',
    example: 'Reference: Colonial resistance arose from taxation without representation and restrictive trade policies. [cite: 1501]'
  },
  {
    id: 'q65',
    term: 'Executive, legislative, and judicial branches',
    definition: 'According to the lecture, the U.S. Constitution ensured separation of powers among:',
    example: 'Reference: The Constitution divided power between executive, legislative, and judicial branches. [cite: 1510]'
  },
  {
    id: 'q66',
    term: 'All for the people, nothing by the people',
    definition: 'What was the famous slogan associated with Enlightened Despotism?',
    example: 'Reference: Enlightened despots claimed to rule for the people without granting them political participation. [cite: 1526]'
  },
  {
    id: 'q67',
    term: 'A powerful concept that reappears across many historical contexts',
    definition: 'In the lecture, "REVOLUTION" is presented primarily as:',
    example: 'Reference: The concept of revolution is presented as a recurring and powerful idea across different periods. [cite: 1545]'
  },
  {
    id: 'q68',
    term: 'Cyclical motion, such as the regular turning of a wheel',
    definition: 'In seventeenth-century usage, the word "REVOLUTION" could refer to:',
    example: 'Reference: In the seventeenth century, "revolution" often referred to cyclical motion. [cite: 1554]'
  },
  {
    id: 'q69',
    term: 'Newly-discovered orbits of the planets around the sun',
    definition: 'In sixteenth-century usage, the term "REVOLUTION" was also connected to:',
    example: 'Reference: The term revolution was linked to astronomy, particularly the discovery of planetary orbits. [cite: 1562]'
  },
  {
    id: 'q70',
    term: 'The accession of the Hanoverian dynasty in 1714',
    definition: 'The lecture links the consolidation of parliamentary sovereignty to the rise of:',
    example: 'Reference: The accession of the Hanoverian dynasty in 1714 reinforced parliamentary power. [cite: 1590]'
  },
  {
    id: 'q71',
    term: 'No taxation without representation',
    definition: 'Colonial protest against taxation is described as being based on which specific claim?',
    example: 'Reference: Colonists protested taxation under the slogan "No taxation without representation." [cite: 1648]'
  },
  {
    id: 'q72',
    term: 'Freedom of speech and electoral reform',
    definition: 'The Wilkes affair is presented as igniting demands for:',
    example: 'Reference: The Wilkes affair sparked demands for freedom of speech and reform of elections. [cite: 1656]'
  },
  {
    id: 'q73',
    term: 'Rural laborers seeking work in London and industrial cities like Manchester',
    definition: 'The lecture explains rapid urban growth by noting that laborers migrated mainly for:',
    example: 'Reference: Rural laborers moved to cities seeking employment, leading to rapid urban growth. [cite: 1671]'
  },
  {
    id: 'q74',
    term: 'Tobacco, rice, indigo, and later cotton',
    definition: 'The Southern plantation economy relied heavily on enslaved labor producing which specific crops?',
    example: 'Reference: Southern plantations produced tobacco, rice, indigo, and later cotton. [cite: 1981]'
  },
  {
    id: 'q75',
    term: 'Limiting centralized power to protect liberty',
    definition: 'Under "REPUBLICAN IDEOLOGY," the lecture argues that liberty required:',
    example: 'Reference: Republican liberty depended on limiting centralized authority. [cite: 2015]'
  },
  {
    id: 'q76',
    term: 'Enclosure Acts that displaced farmers and forced them into rural/city labor',
    definition: 'What was a major cause of the shift in rural labor patterns during the Agricultural Revolution?',
    example: 'Reference: Enclosure Acts led to better farming but displaced many farmers. [cite: 2052]'
  },
  {
    id: 'q77',
    term: 'Spain lost territories while Britain gained commercial advantages',
    definition: 'What was the outcome of the War of the Spanish Succession (1701-1714)?',
    example: 'Reference: Spain lost territories while Britain gained commercial advantages. [cite: 1537]'
  },
  {
    id: 'q78',
    term: 'Constitutional monarchy, Whigs vs Tories, and imperial expansion',
    definition: 'What defines the "Political Culture" of 18th-century Britain?',
    example: 'Reference: This period saw a stable constitutional monarchy and the rise of Whigs and Tories. [cite: 2043, 2045]'
  },
  {
    id: 'q79',
    term: 'A system revolving from rule of one → few → many → and back again',
    definition: 'What is the classical model of political change described in the lecture?',
    example: 'Reference: Classical political theory viewed political systems as cyclical, rotating between forms of rule. [cite: 1571]'
  },
  {
    id: 'q80',
    term: 'Securing French support for the American colonies and a French alliance',
    definition: 'What turning point is specifically mentioned as contributing to the eventual victory of the colonies?',
    example: 'Reference: The victory at Saratoga (1777) secured French support for the colonies. [cite: 2040, 2075]'
  }
];
