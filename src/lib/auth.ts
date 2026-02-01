import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';

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

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
          motherhoodStage: user.motherhoodStage,
          subscriptionPlan: user.subscriptionPlan,
          dietaryPreference: user.dietaryPreference
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
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
                password: '' // Passwordless
              });
            } catch (error) {
              console.error("Error creating user from provider:", error);
            }
          }

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role;
            token.motherhoodStage = dbUser.motherhoodStage;
            token.subscriptionPlan = dbUser.subscriptionPlan;
            token.dietaryPreference = dbUser.dietaryPreference;
          }
        } else {
          // Credentials login already returns mapped user object
          token.role = user.role;
          token.id = user.id;
          token.motherhoodStage = user.motherhoodStage;
          token.subscriptionPlan = user.subscriptionPlan;
          token.dietaryPreference = (user as any).dietaryPreference;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.motherhoodStage = token.motherhoodStage as string;
        session.user.subscriptionPlan = token.subscriptionPlan as string;
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
