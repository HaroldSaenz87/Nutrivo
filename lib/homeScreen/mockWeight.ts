// One weigh-in. `date` is a full ISO timestamp (the format a real backend would send).
export type WeightEntry = {
  date: string;
  weight: number;
};

export type WeightData = {
  entries: WeightEntry[]; // oldest first, most recent last
  startWeight: number;
  unit: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const START_WEIGHT = 268.8;
const END_WEIGHT = 154.8;

// Builds ~6 months of weekly weigh-ins that END TODAY, so the mock data
// never goes stale no matter what day you open the app.
function buildMockEntries(): WeightEntry[] {
  const today = new Date();

  // First day of the month, 5 months ago (current month + previous 5 = 6 months)
  const start = new Date(today.getFullYear(), today.getMonth() - 5, 1);
  const totalDays = (today.getTime() - start.getTime()) / DAY_MS;

  const entries: WeightEntry[] = [];

  // One entry every 7 days, weight trending down with a small wobble
  // (so the line looks like real life, not a perfect ramp)
  for (let day = 0; day < totalDays; day += 7) {
    const progress = day / totalDays; // 0 at the start, 1 at today
    const wobble = Math.sin((day / 7) * 1.7) * 4;
    const weight = START_WEIGHT - (START_WEIGHT - END_WEIGHT) * progress + wobble;

    entries.push({
      date: new Date(start.getTime() + day * DAY_MS).toISOString(),
      weight: Math.round(weight * 10) / 10,
    });
  }

  // Final entry is always today's weight
  entries.push({ date: today.toISOString(), weight: END_WEIGHT });

  return entries;
}

export const mockWeightData: WeightData = {
  entries: buildMockEntries(),
  startWeight: START_WEIGHT,
  unit: 'lbs',
};