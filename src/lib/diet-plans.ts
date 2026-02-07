
export interface DailyPlan {
  day: number;
  meals: {
    breakfast: Meal;
    midMorningSnack: Meal;
    lunch: Meal;
    eveningSnack: Meal;
    dinner: Meal;
  };
}

export interface Meal {
  name: string;
  description: string;
  benefits: string;
}

export interface WeeklyPlan {
  dietType: string;
  stage: string;
  days: DailyPlan[];
  supplements: string[];
}

export const DIET_TYPES = [
  { id: 'keto', label: 'Keto', desc: 'Low-carb, high-fat meals for sustained energy.' },
  { id: 'vegetarian', label: 'Vegetarian', desc: 'Balanced plant-based meals with dairy.' },
  { id: 'non-vegetarian', label: 'Non-Vegetarian', desc: 'Includes lean meats, fish, and eggs.' },
  { id: 'vegan', label: 'Plant-Based (Vegan)', desc: '100% plant-derived nutrition.' },
  { id: 'eggetarian', label: 'Eggitarian', desc: 'Vegetarian meals including eggs.' },
];

// Helper to generate a plan (simplified for demo, in reality this would be huge)
export const generateWeeklyPlan = (stage: string, diet: string): WeeklyPlan => {
  const isPregnancy = stage === 'pregnancy';
  const isPostpartum = stage === 'postpartum';
  const isChild = stage === 'child_0_5' || stage === 'toddler'; // Mapping 'toddler' to child logic for simplicity

  const supplements = isPregnancy 
    ? ['Prenatal Multivitamin (with Folic Acid)', 'Iron (after lunch)', 'Calcium (after dinner)']
    : isPostpartum
      ? ['Postnatal Multivitamin', 'Calcium & Vitamin D', 'Omega-3 DHA']
      : ['Vitamin D Drops (if advised)', 'Multivitamin Syrup'];

  const days: DailyPlan[] = Array.from({ length: 7 }, (_, i) => ({
    day: i + 1,
    meals: {
      breakfast: getMeal(stage, diet, 'breakfast', i),
      midMorningSnack: getMeal(stage, diet, 'snack1', i),
      lunch: getMeal(stage, diet, 'lunch', i),
      eveningSnack: getMeal(stage, diet, 'snack2', i),
      dinner: getMeal(stage, diet, 'dinner', i),
    }
  }));

  return {
    dietType: diet,
    stage,
    days,
    supplements
  };
};

// Content Database
const getMeal = (stage: string, diet: string, type: string, dayIndex: number): Meal => {
  const safeDiet = diet.toLowerCase();
  
  // Basic templates to mix and match
  const templates: Record<string, Record<string, Meal[]>> = {
    breakfast: {
      vegetarian: [
        { name: "Spinach & Paneer Paratha", description: "Whole wheat flatbread stuffed with spinach and cottage cheese.", benefits: "Rich in iron and calcium." },
        { name: "Vegetable Poha", description: "Flattened rice cooked with peas, carrots, and peanuts.", benefits: "Easy to digest energy source." },
        { name: "Oats Upma", description: "Savory oats with mixed vegetables.", benefits: "High fiber for steady sugar levels." },
        { name: "Besan Chilla", description: "Savory gram flour pancakes with herbs.", benefits: "Good protein kickstart." },
        { name: "Multigrain Toast with Avocado", description: "Toasted multigrain bread topped with mashed avocado.", benefits: "Healthy fats for brain development." },
        { name: "Idli with Sambar", description: "Steamed rice cakes with lentil stew.", benefits: "Fermented foods aid gut health." },
        { name: "Daliya Khichdi", description: "Broken wheat porridge with moong dal.", benefits: "Complete protein and very comforting." },
      ],
      keto: [
        { name: "Paneer Scramble", description: "Scrambled cottage cheese with butter and spices.", benefits: "High protein and healthy fats." },
        { name: "Coconut Flour Pancakes", description: "Low-carb pancakes served with sugar-free syrup.", benefits: "Satisfying without the carb crash." },
        { name: "Avocado Smoothie", description: "Creamy smoothie with avocado, spinach, and almond milk.", benefits: "Packed with potassium and fiber." },
        { name: "Mushroom & Cheese Omelet (No Egg, use Paneer)", description: "Sautéed mushrooms with cheese crust.", benefits: "Vitamin D boost." },
        { name: "Greek Yogurt Bowl", description: "Full-fat yogurt with walnuts and chia seeds.", benefits: "Probiotics for digestion." },
        { name: "Almond Flour Porridge", description: "Warm porridge made with almond flour and ghee.", benefits: "Comforting and nutrient-dense." },
        { name: "Bulletproof Coffee & Nuts", description: "Coffee with MCT oil/ghee plus a handful of almonds.", benefits: "Instant energy boost." },
      ],
      "non-vegetarian": [
        { name: "Masala Omelet", description: "2 eggs whisked with onions, tomatoes, and chilies.", benefits: "Complete protein for recovery." },
        { name: "Chicken Sausages & Toast", description: "Grilled lean chicken sausages with whole wheat toast.", benefits: "High protein breakfast." },
        { name: "Egg Bhurji with Roti", description: "Indian style scrambled eggs with spices.", benefits: "Classic comfort food." },
        { name: "Boiled Eggs & Fruit", description: "2 hard-boiled eggs with a side of papaya.", benefits: "Simple and nutritious." },
        { name: "Chicken Sandwich", description: "Shredded chicken with lettuce in multigrain bread.", benefits: "Sustained energy." },
        { name: "Egg & Spinach Muffins", description: "Baked egg cups with spinach.", benefits: "Iron and protein combo." },
        { name: "Scrambled Eggs with Toast", description: "Soft scrambled eggs on buttered toast.", benefits: "Easy to digest." },
      ]
    },
    lunch: {
      vegetarian: [
        { name: "Palak Paneer & Roti", description: "Cottage cheese in spinach gravy with 2 rotis.", benefits: "Iron and calcium powerhouse." },
        { name: "Rajma Chawal", description: "Kidney bean curry with steamed brown rice.", benefits: "High fiber and protein." },
        { name: "Mixed Veg Curry & Dal", description: "Seasonal vegetable stir-fry with yellow lentils.", benefits: "Balanced micronutrients." },
        { name: "Chickpea Salad", description: "Boiled chickpeas tossed with veggies and lemon dressing.", benefits: "Light yet filling." },
        { name: "Methi Thepla & Curd", description: "Fenugreek flatbreads with a bowl of yogurt.", benefits: "Fenugreek aids lactation/digestion." },
        { name: "Bhindi Aloo & Paratha", description: "Okra and potato stir-fry with wheat bread.", benefits: "Folate rich." },
        { name: "Khichdi with Ghee", description: "Rice and lentil porridge topped with clarified butter.", benefits: "Ultimate comfort for digestion." },
      ],
      keto: [
        { name: "Palak Paneer (No Roti)", description: "Cottage cheese in rich spinach gravy with extra cream.", benefits: "High fat, moderate protein." },
        { name: "Cauliflower Rice Biryani", description: "Grated cauliflower cooked with keto-friendly veggies and spices.", benefits: "Low carb alternative to rice." },
        { name: "Grilled Paneer Salad", description: "Marinated paneer cubes on a bed of greens with olive oil.", benefits: "Antioxidant rich." },
        { name: "Zucchini Noodles with Cream Sauce", description: "Spiralized zucchini in heavy cream and cheese sauce.", benefits: "Satisfying pasta alternative." },
        { name: "Mushroom Masala", description: "Mushrooms cooked in butter and spices.", benefits: "Immunity boosting." },
        { name: "Broccoli & Cheese Soup", description: "Creamy soup with cheddar cheese.", benefits: "Calcium rich." },
        { name: "Eggplant Lasagna", description: "Layers of eggplant with cheese and low-carb marinara.", benefits: "Vegetable variety." },
      ]
    },
    snack1: {
      vegetarian: [
        { name: "Fruit Bowl", description: "Seasonal fruits sprinkled with chia seeds.", benefits: "Hydration and vitamins." },
        { name: "Roasted Makhana", description: "Fox nuts roasted with turmeric and ghee.", benefits: "Low calorie, calcium rich." },
        { name: "Handful of Almonds", description: "Soaked almonds and walnuts.", benefits: "Brain health." },
        { name: "Buttermilk (Chaas)", description: "Spiced yogurt drink.", benefits: "Cooling and probiotic." },
        { name: "Carrot Sticks with Hummus", description: "Crunchy carrots with chickpea dip.", benefits: "Vitamin A boost." },
        { name: "Banana", description: "One ripe banana.", benefits: "Instant potassium." },
        { name: "Coconut Water", description: "Fresh tender coconut water.", benefits: "Natural electrolytes." },
      ]
    },
    dinner: {
      vegetarian: [
        { name: "Moong Dal & Rice", description: "Yellow lentil soup with steamed rice.", benefits: "Light and easy to sleep on." },
        { name: "Vegetable Soup & Salad", description: "Clear mixed veg soup with a green salad.", benefits: "Low calorie, high fiber." },
        { name: "Bottle Gourd (Lauki) Curry", description: "Stewed bottle gourd with 1 roti.", benefits: "Excellent for hydration and digestion." },
        { name: "Paneer Tikka", description: "Grilled marinated paneer with bell peppers.", benefits: "Protein without the heavy carbs." },
        { name: "Quinoa Pulao", description: "Quinoa cooked with mixed veggies.", benefits: "Complete protein grain." },
        { name: "Pumpkin Soup & Toast", description: "Creamy pumpkin soup.", benefits: "Rich in Vitamin A." },
        { name: "Lentil Soup", description: "Thick lentil soup with herbs.", benefits: "Warm and filling." },
      ]
    }
  };

  // Logic to pick content
  // 1. Determine base category (Veg/Non-Veg/Keto)
  let category = 'vegetarian';
  if (safeDiet.includes('non')) category = 'non-vegetarian';
  if (safeDiet.includes('keto')) category = 'keto';
  if (safeDiet.includes('vegan')) category = 'vegetarian'; // Fallback for demo, would replace dairy with alternatives in real logic

  // 2. Select meal
  const mealList = templates[type]?.[category] || templates[type]?.['vegetarian'];
  
  // 3. Fallback logic
  if (!mealList) {
    return { name: "Balanced Meal", description: "A balanced plate of protein, carbs, and veggies.", benefits: "Essential nutrition." };
  }

  // 4. Modulo for day rotation
  return mealList[dayIndex % mealList.length];
};
