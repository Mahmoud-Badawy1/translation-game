// Sound effects disabled due to CDN access issues
// To re-enable, add local audio files to /public/sounds/ and update paths
export const SOUNDS = {
    CORRECT: '',
    WRONG: '',
    BOOSTER: '',
    CLICK: '',
    START: ''
};

export const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.4;
    audio.play().catch(() => { });
};
