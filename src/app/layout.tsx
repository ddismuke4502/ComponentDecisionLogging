import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SkipLink } from "@/components/layout/SkipLink";
import { QueryProvider } from "@/lib/query/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Component Decision Log",
    template: "%s | Component Decision Log",
  },
  description:
    "A portfolio-grade frontend engineering project for documenting reusable UI component decisions, ownership, API contracts, accessibility notes, and architecture rationale.",
  keywords: [
    "frontend engineering",
    "component architecture",
    "design systems",
    "accessibility",
    "Next.js",
    "TypeScript",
    "React",
    "Firebase",
  ],
  authors: [{ name: "Dameion Dismuke" }],
  creator: "Dameion Dismuke",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SkipLink />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
