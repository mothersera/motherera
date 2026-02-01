import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: string;
      motherhoodStage?: string;
      subscriptionPlan?: string;
      subscriptionStatus?: string;
      dietaryPreference?: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: string;
    motherhoodStage?: string;
    subscriptionPlan?: string;
    subscriptionStatus?: string;
    dietaryPreference?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    motherhoodStage?: string;
    subscriptionPlan?: string;
    subscriptionStatus?: string;
    dietaryPreference?: string;
  }
}
