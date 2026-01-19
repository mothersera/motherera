import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import NutritionPlan from '@/models/NutritionPlan';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  await dbConnect();

  try {
    // 1. Seed Nutrition Plans
    await NutritionPlan.deleteMany({}); // Clear existing plans
    
    const nutritionPlans = [
      {
        stage: 'pregnancy',
        dietaryPreference: 'vegetarian',
        title: 'Balanced Pregnancy Diet (Veg)',
        description: 'Rich in iron, calcium, and folate for expecting mothers.',
        calories: 2200,
        meals: {
          breakfast: ['Oats Porridge with Milk & Almonds', 'Moong Dal Chilla with Mint Chutney'],
          midMorningSnack: ['Apple/Banana', 'Handful of Walnuts'],
          lunch: ['2 Roti', 'Spinach Dal', 'Paneer Bhurji', 'Curd'],
          eveningSnack: ['Roasted Makhana', 'Ginger Tea'],
          dinner: ['Vegetable Khichdi', 'Cucumber Raita'],
          bedtime: ['Warm Turmeric Milk']
        },
        nutrients: { protein: '75g', carbs: '280g', fats: '70g', fiber: '35g' }
      },
      {
        stage: 'postpartum',
        dietaryPreference: 'vegetarian',
        title: 'Postpartum Recovery (Veg)',
        description: 'Galactogogues rich diet for lactation and recovery.',
        calories: 2400,
        meals: {
          breakfast: ['Daliya with Milk', 'Gond Ladoo'],
          midMorningSnack: ['Papaya', 'Jeera Water'],
          lunch: ['2 Multigrain Roti', 'Gourd (Lauki) Sabzi', 'Masoor Dal', 'Buttermilk'],
          eveningSnack: ['Methi Ladoo', 'Milk'],
          dinner: ['Broken Wheat Upma with Veggies'],
          bedtime: ['Milk with Shatavari']
        },
        nutrients: { protein: '80g', carbs: '300g', fats: '80g', fiber: '40g' }
      },
      {
        stage: 'pregnancy',
        dietaryPreference: 'non-vegetarian',
        title: 'Balanced Pregnancy Diet (Non-Veg)',
        description: 'High protein diet with eggs and lean meats.',
        calories: 2300,
        meals: {
          breakfast: ['2 Boiled Eggs', 'Whole Wheat Toast', 'Milk'],
          midMorningSnack: ['Orange', 'Pumpkin Seeds'],
          lunch: ['Rice', 'Chicken Curry', 'Mix Veg Salad', 'Curd'],
          eveningSnack: ['Vegetable Soup', 'Grilled Chicken Salad'],
          dinner: ['2 Roti', 'Fish Curry (Low Mercury)', 'Sauteed Beans'],
          bedtime: ['Warm Milk']
        },
        nutrients: { protein: '90g', carbs: '250g', fats: '75g', fiber: '30g' }
      }
    ];

    await NutritionPlan.insertMany(nutritionPlans);

    // 2. Seed Experts (Check if exists first to avoid duplicates if run multiple times without delete)
    // We won't delete all users, just check for these specific emails
    
    const expertEmails = ['expert1@motherera.com', 'expert2@motherera.com'];
    const expertsExist = await UserModel.find({ email: { $in: expertEmails } });
    
    if (expertsExist.length < expertEmails.length) {
       const hashedPassword = await bcrypt.hash('expert123', 10);
       
       const newExperts = [
         {
           name: 'Dr. Anjali Gupta',
           email: 'expert1@motherera.com',
           password: hashedPassword,
           role: 'expert',
           image: '/avatars/expert1.png',
           specialization: 'Prenatal Nutritionist',
           bio: '10+ years of experience in guiding mothers through high-risk pregnancies with diet.'
         },
         {
           name: 'Ms. Riya Singh',
           email: 'expert2@motherera.com',
           password: hashedPassword,
           role: 'expert',
           image: '/avatars/expert2.png',
           specialization: 'Postnatal Yoga Instructor',
           bio: 'Certified yoga instructor specializing in postpartum core recovery and pelvic floor health.'
         }
       ];

       // Filter out existing ones
       const expertsToCreate = newExperts.filter(e => !expertsExist.some(ex => ex.email === e.email));
       if (expertsToCreate.length > 0) {
         await UserModel.insertMany(expertsToCreate);
       }
    }

    return NextResponse.json({ message: 'Database seeded successfully', plans: nutritionPlans.length });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
