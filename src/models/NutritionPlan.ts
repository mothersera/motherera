import mongoose from 'mongoose';

const NutritionPlanSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true,
    enum: ['pregnancy', 'postpartum', 'child_0_5'],
  },
  dietaryPreference: {
    type: String,
    required: true,
    enum: ['vegetarian', 'non-vegetarian', 'eggetarian', 'vegan'],
    default: 'vegetarian',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  calories: {
    type: Number,
    required: true,
  },
  meals: {
    breakfast: [{ type: String }],
    midMorningSnack: [{ type: String }],
    lunch: [{ type: String }],
    eveningSnack: [{ type: String }],
    dinner: [{ type: String }],
    bedtime: [{ type: String }],
  },
  nutrients: {
    protein: String,
    carbs: String,
    fats: String,
    fiber: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.NutritionPlan || mongoose.model('NutritionPlan', NutritionPlanSchema);
