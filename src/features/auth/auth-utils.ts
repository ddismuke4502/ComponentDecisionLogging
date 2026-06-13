import type { User } from "firebase/auth";

export function getAllowedAdminEmails() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUser(user: User | null) {
  if (!user?.email) {
    return false;
  }

  const allowedAdminEmails = getAllowedAdminEmails();

  return allowedAdminEmails.includes(user.email.toLowerCase());
}