export const mapBeatType = {
    1: 'mp3 lease',
    2: 'wav lease',
    3: 'Exclusive rights'
} as const;

export const beatTypes = Object.entries(mapBeatType).map(([value, name]) => (
    {
        name,
        value
    }
))

export type BeatType = keyof typeof mapBeatType