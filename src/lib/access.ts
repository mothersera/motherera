export const ADMIN_EMAIL = "support@motherera.com";

export type SubscriptionPlan = "basic" | "premium" | "specialized";
export type SubscriptionStatus = "active" | "inactive" | "expired" | "canceled";

export type AccessUser = {
  email?: string | null;
  subscriptionPlan?: SubscriptionPlan | null;
  subscriptionStatus?: SubscriptionStatus | null;
};

export function normalizeEmail(email?: string | null) {
  return String(email || "").trim().toLowerCase();
}

export function isAdminEmail(email?: string | null) {
  return normalizeEmail(email) === ADMIN_EMAIL;
}

export function isActiveSubscription(user: AccessUser) {
  return user.subscriptionStatus === "active";
}

export function canAccessPremium(user: AccessUser) {
  if (isAdminEmail(user.email)) return true;
  if (!isActiveSubscription(user)) return false;
  return user.subscriptionPlan === "premium" || user.subscriptionPlan === "specialized";
}

export function canAccessSpecialized(user: AccessUser) {
  if (isAdminEmail(user.email)) return true;
  if (!isActiveSubscription(user)) return false;
  return user.subscriptionPlan === "specialized";
}

