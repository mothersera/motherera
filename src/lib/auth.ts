import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';
import { evaluateLifecycle } from '@/lib/lifecycle';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || "",
      clientSecret: process.env.APPLE_SECRET || "",
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        await dbConnect();
        
        // Find user and explicitly select password since it's set to select: false
        const user = await UserModel.findOne({ email: credentials.email }).select('+password');

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        const evaluation = evaluateLifecycle({
          expectedDueDate: user.lifecycle?.expectedDueDate || null,
          gestationalAgeWeeks: user.lifecycle?.gestationalAgeWeeks || null,
          childBirthDates: user.lifecycle?.childBirthDates || null,
          wellnessObjectives: user.lifecycle?.wellnessObjectives || null,
        });

        const lifecycleNeedsUpdate =
          user.lifecycle?.stageId !== evaluation.stageId ||
          user.lifecycle?.stageLabel !== evaluation.label ||
          user.lifecycle?.confidence !== evaluation.confidence ||
          user.lifecycle?.derivedFrom !== evaluation.derivedFrom ||
          user.motherhoodStage !== evaluation.motherhoodStage;

        if (lifecycleNeedsUpdate) {
          await UserModel.findByIdAndUpdate(user._id, {
            motherhoodStage: evaluation.motherhoodStage,
            lifecycle: {
              ...(user.lifecycle || {}),
              stageId: evaluation.stageId,
              stageLabel: evaluation.label,
              confidence: evaluation.confidence,
              derivedFrom: evaluation.derivedFrom,
              updatedAt: new Date(),
            },
          });
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
          motherhoodStage: evaluation.motherhoodStage,
          lifecycleStageId: evaluation.stageId,
          lifecycleStageLabel: evaluation.label,
          lifecycleConfidence: evaluation.confidence,
          subscriptionPlan: user.subscriptionPlan,
          subscriptionStatus: user.subscriptionStatus,
          dietaryPreference: user.dietaryPreference
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update') {
        // Fetch latest user data from DB to ensure session is in sync
        if (token.id) {
          await dbConnect();
          const dbUser = await UserModel.findById(token.id);
          if (dbUser) {
            const evaluation = evaluateLifecycle({
              expectedDueDate: dbUser.lifecycle?.expectedDueDate || null,
              gestationalAgeWeeks: dbUser.lifecycle?.gestationalAgeWeeks || null,
              childBirthDates: dbUser.lifecycle?.childBirthDates || null,
              wellnessObjectives: dbUser.lifecycle?.wellnessObjectives || null,
            });

            const lifecycleNeedsUpdate =
              dbUser.lifecycle?.stageId !== evaluation.stageId ||
              dbUser.lifecycle?.stageLabel !== evaluation.label ||
              dbUser.lifecycle?.confidence !== evaluation.confidence ||
              dbUser.lifecycle?.derivedFrom !== evaluation.derivedFrom ||
              dbUser.motherhoodStage !== evaluation.motherhoodStage;

            if (lifecycleNeedsUpdate) {
              await UserModel.findByIdAndUpdate(dbUser._id, {
                motherhoodStage: evaluation.motherhoodStage,
                lifecycle: {
                  ...(dbUser.lifecycle || {}),
                  stageId: evaluation.stageId,
                  stageLabel: evaluation.label,
                  confidence: evaluation.confidence,
                  derivedFrom: evaluation.derivedFrom,
                  updatedAt: new Date(),
                },
              });
            }

            token.name = dbUser.name;
            token.motherhoodStage = evaluation.motherhoodStage;
            token.lifecycleStageId = evaluation.stageId;
            token.lifecycleStageLabel = evaluation.label;
            token.lifecycleConfidence = evaluation.confidence;
            token.dietaryPreference = dbUser.dietaryPreference;
            token.subscriptionPlan = dbUser.subscriptionPlan;
            token.subscriptionStatus = dbUser.subscriptionStatus;
          }
        }
      }

      if (user) {
        // If logging in with a provider (Google/Apple), ensure user exists in DB
        if (account?.provider === 'google' || account?.provider === 'apple') {
          await dbConnect();
          let dbUser = await UserModel.findOne({ email: user.email });

          if (!dbUser && user.email) {
            // Create new user
            try {
              dbUser = await UserModel.create({
                name: user.name || 'Mother',
                email: user.email,
                image: user.image || undefined,
                role: 'mother',
                motherhoodStage: 'pregnancy', // Default
                subscriptionPlan: 'basic',
                subscriptionStatus: 'active',
                password: '' // Passwordless
              });
            } catch (error) {
              console.error("Error creating user from provider:", error);
            }
          }

          if (dbUser) {
            const evaluation = evaluateLifecycle({
              expectedDueDate: dbUser.lifecycle?.expectedDueDate || null,
              gestationalAgeWeeks: dbUser.lifecycle?.gestationalAgeWeeks || null,
              childBirthDates: dbUser.lifecycle?.childBirthDates || null,
              wellnessObjectives: dbUser.lifecycle?.wellnessObjectives || null,
            });

            const lifecycleNeedsUpdate =
              dbUser.lifecycle?.stageId !== evaluation.stageId ||
              dbUser.lifecycle?.stageLabel !== evaluation.label ||
              dbUser.lifecycle?.confidence !== evaluation.confidence ||
              dbUser.lifecycle?.derivedFrom !== evaluation.derivedFrom ||
              dbUser.motherhoodStage !== evaluation.motherhoodStage;

            if (lifecycleNeedsUpdate) {
              await UserModel.findByIdAndUpdate(dbUser._id, {
                motherhoodStage: evaluation.motherhoodStage,
                lifecycle: {
                  ...(dbUser.lifecycle || {}),
                  stageId: evaluation.stageId,
                  stageLabel: evaluation.label,
                  confidence: evaluation.confidence,
                  derivedFrom: evaluation.derivedFrom,
                  updatedAt: new Date(),
                },
              });
            }

            token.id = dbUser._id.toString();
            token.role = dbUser.role;
            token.motherhoodStage = evaluation.motherhoodStage;
            token.lifecycleStageId = evaluation.stageId;
            token.lifecycleStageLabel = evaluation.label;
            token.lifecycleConfidence = evaluation.confidence;
            token.subscriptionPlan = dbUser.subscriptionPlan;
            token.subscriptionStatus = dbUser.subscriptionStatus;
            token.dietaryPreference = dbUser.dietaryPreference;
          }
        } else {
          // Credentials login already returns mapped user object
          token.role = user.role;
          token.id = user.id;
          token.motherhoodStage = user.motherhoodStage;
          token.lifecycleStageId = user.lifecycleStageId;
          token.lifecycleStageLabel = user.lifecycleStageLabel;
          token.lifecycleConfidence = user.lifecycleConfidence;
          token.subscriptionPlan = user.subscriptionPlan;
          token.subscriptionStatus = user.subscriptionStatus;
          token.dietaryPreference = user.dietaryPreference;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.motherhoodStage = token.motherhoodStage as string;
        session.user.lifecycleStageId = token.lifecycleStageId as string;
        session.user.lifecycleStageLabel = token.lifecycleStageLabel as string;
        session.user.lifecycleConfidence = token.lifecycleConfidence as string;
        session.user.subscriptionPlan = token.subscriptionPlan as string;
        session.user.subscriptionStatus = token.subscriptionStatus as string;
        session.user.dietaryPreference = token.dietaryPreference as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
