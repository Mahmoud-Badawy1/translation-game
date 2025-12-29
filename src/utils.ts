export const seededRandom = (seed: string) => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
        h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
    }

    return function () {
        h = Math.imul(h ^ h >>> 16, 0x85ebca6b);
        h = Math.imul(h ^ h >>> 13, 0xc2b2ae35);
        h ^= h >>> 16;
        return (h >>> 0) / 4294967296;
    };
};

export const seededShuffle = <T>(array: T[], seed: string): T[] => {
    const rng = seededRandom(seed);
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};
