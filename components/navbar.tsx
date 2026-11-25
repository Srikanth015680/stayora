
import Link from "next/link";
import { House } from "lucide-react";
import { connection } from "next/server";

import { getCurrentUser } from "@/lib/current-user";
import { AuthButtons } from "./auth-buttons";
import { ThemeToggle } from "@/components/theme-toggle";

import prisma from "@/lib/prisma";

export async function Navbar() {
  await connection();

  const user = await getCurrentUser();

  const hasHostedListings = user
    ? (await prisma.listing.count({
        where: { userId: user.id },
      })) > 0
    : false;

  const hostCtaLabel = hasHostedListings
    ? "Manage hosting"
    : "Start hosting";

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-surface/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Stayora Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-brand-500"
        >
          <House
            className="h-5 w-5 text-pink-500"
            strokeWidth={2.5}
          />
          <span>Stayora</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Hosting Button */}
          <Link
            href="/host"
            className="hidden rounded-full px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-100 md:inline-block"
          >
            {hostCtaLabel}
          </Link>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Authentication Buttons */}
          <AuthButtons
            user={user}
            hostCtaLabel={hostCtaLabel}
          />
        </div>
      </nav>
    </header>
  );
}
