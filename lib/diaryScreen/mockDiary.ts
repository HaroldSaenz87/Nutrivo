export type FoodItem = {
  name: string;
  calories: number;
};

export type Meal = {
  key: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  title: string;
  items: FoodItem[];
};

export type DiaryData = {
  goal: number;
  meals: Meal[];
};

export const mockDiaryData: DiaryData = {
  goal: 2200,
  meals: [
    {
      key: 'breakfast',
      title: 'Breakfast',
      items: [
        { name: 'Greek yogurt with berries', calories: 180 },
        { name: 'Black coffee', calories: 5 },
        { name: 'Whole grain toast', calories: 135 },
        { name: 'Scrambled eggs', calories: 140 },
        { name: 'Half an avocado', calories: 120 },
        { name: 'Orange juice', calories: 110 },
      ],
    },
    {
      key: 'lunch',
      title: 'Lunch',
      items: [
        { name: 'Grilled chicken wrap', calories: 420 },
        { name: 'Side salad', calories: 120 },
        { name: 'Sparkling water', calories: 0 },
        { name: 'Apple', calories: 95 },
        { name: 'Baked sweet potato', calories: 130 },
        { name: 'Hummus and veggies', calories: 150 },
      ],
    },
    {
      key: 'dinner',
      title: 'Dinner',
      items: [
        { name: 'Salmon and rice', calories: 490 },
        { name: 'Steamed broccoli', calories: 55 },
        { name: 'Garlic bread', calories: 150 },
        { name: 'Side of quinoa', calories: 120 },
        { name: 'Glass of red wine', calories: 125 },
        { name: 'Dark chocolate square', calories: 60 },
      ],
    },
    {
      key: 'snacks',
      title: 'Snacks',
      items: [
        { name: 'Almonds (small handful)', calories: 100 },
        { name: 'Protein bar', calories: 200 },
        { name: 'String cheese', calories: 80 },
        { name: 'Baby carrots', calories: 35 },
        { name: 'Rice cake', calories: 60 },
        { name: 'Herbal tea', calories: 5 },
      ],
    },
  ],
};

// Helper: total calories across every item in every meal
export function getTotalCalories(meals: Meal[]): number {
  return meals.reduce(
    (mealSum, meal) => mealSum + meal.items.reduce((itemSum, item) => itemSum + item.calories, 0),
    0
  );
}

// Helper: total calories for just one meal
export function getMealCalories(meal: Meal): number {
  return meal.items.reduce((sum, item) => sum + item.calories, 0);
}