

export type WeightEntry = {
  date: string; // short label, e.g. "Jun 24"
  weight: number;
};

export type WeightData = {
  entries: WeightEntry[]; // oldest first, most recent last
  startWeight: number;
  unit: string;
};

export const mockWeightData: WeightData = {
  entries: [
    { date: 'Jan 10', weight: 267 },
    { date: 'Jun 17', weight: 236 },
    { date: 'Jun 24', weight: 203 },
    { date: 'Jul 1', weight: 179 },
    { date: 'Jul 3', weight: 172 },
    { date: 'Jul 4', weight: 166 },
    { date: 'Jul 5', weight: 155 },
  ],
  startWeight: 267,
  unit: 'lbs',
};