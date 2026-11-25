
import { Suspense } from "react";
import Link from "next/link";

import {
  BadgeCheck,
  Building2,
  DollarSign,
  Sparkles,
} from "lucide-react";

import { createListing } from "@/app/actions";
import { ListingForm } from "@/components/listing-form";
import { HostSection } from "@/components/host/host-section";
import { HostListingItem } from "@/components/host/host-listing-item";

import { PageIntro } from "@/components/ui/page-intro";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";

import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/current-user";
import { uiShell } from "@/lib/ui-classes";

function HostDashboardLoading() {
  return (
    <main className={uiShell.pageContainer}>
      <div className="animate-pulse space-y-6">
        {/* Page heading skeleton */}
        <section className="space-y-3">
          <div className="h-4 w-32 rounded bg-ink-200" />
          <div className="h-8 w-64 rounded bg-ink-200" />
          <div className="h-4 w-96 max-w-full rounded bg-ink-200" />
        </section>

        {/* Statistics skeleton */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-2xl border border-ink-200 bg-surface"
            />
          ))}
        </section>

        {/* Dashboard content skeleton */}
        <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <div className="h-[520px] rounded-3xl border border-ink-200 bg-surface" />

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-40 rounded-2xl border border-ink-200 bg-surface"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

async function HostDashboardContent() {
  const user = await requireUser();

  const listings = await prisma.listing.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const listingCount = listings.length;

  const avgNightlyRate = listingCount
    ? Math.round(
        listings.reduce(
          (total, listing) => total + listing.PricePerNight,
          0
        ) / listingCount
      )
    : 0;

  const totalCapacity = listings.reduce(
    (total, listing) => total + listing.guestCount,
    0
  );

  return (
    <main className={uiShell.pageContainer}>
      <PageIntro
        badge="Host workspace"
        icon={Sparkles}
        title={`Welcome back, ${user.name ?? "Host"}`}
        description="Manage your homes, publish new listings, and keep every stay ready for guests."
      />

      {/* Host Statistics */}
      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Active Listings"
          value={listingCount}
          icon={Building2}
        />

        <StatCard
          label="Average Nightly Rate"
          value={`$${avgNightlyRate}`}
          icon={DollarSign}
        />

        <StatCard
          label="Total Guest Capacity"
          value={totalCapacity}
          icon={BadgeCheck}
        />
      </section>

      {/* Host Dashboard Content */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <HostSection
          title="Create a listing"
          description="Add a professionally presented listing with photos, pricing, and guest details."
        >
          <ListingForm action={createListing} />
        </HostSection>

        <HostSection
          title="Your listings"
          description="Update, review, or remove homes from your hosting portfolio."
          action={
            <Link
              href="/"
              className="rounded-full border border-ink-300 px-3 py-1.5 text-xs font-semibold text-ink-700 transition hover:bg-ink-50"
            >
              View guest experience
            </Link>
          }
        >
          <div className="space-y-3">
            {listings.length === 0 ? (
              <EmptyState
                title="No listings yet"
                description="Fill in the form to publish your first property."
              />
            ) : (
              listings.map((listing, index) => (
                <HostListingItem
                  key={listing.id}
                  listing={{
                    id: listing.id,
                    title: listing.title,
                    description: listing.description,
                    locationValue: listing.locationValue,
                    imageSrc: listing.imageSrc ?? "",
                    pricePerNight: listing.PricePerNight,
                    category: listing.category,
                    guestCount: listing.guestCount,
                    roomCount: listing.roomCount,
                    bathroomCount: listing.bathRoomCount,
                  }}
                  index={index}
                />
              ))
            )}
          </div>
        </HostSection>
      </div>
    </main>
  );
}

export default function HostDashboardPage() {
  return (
    <Suspense fallback={<HostDashboardLoading />}>
      <HostDashboardContent />
    </Suspense>
  );
}
