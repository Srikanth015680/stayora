
import { Suspense } from "react";
import {
  CalendarCheck2,
  CalendarX2,
  Wallet,
} from "lucide-react";

import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/current-user";

import { PageIntro } from "@/components/ui/page-intro";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ReservationCard } from "@/components/bookings/reservation-card";

import { uiShell } from "@/lib/ui-classes";

type BookingsPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

function BookingsLoading() {
  return (
    <main className={uiShell.pageContainer}>
      <div className="animate-pulse space-y-5">
        <div className="space-y-3">
          <div className="h-4 w-32 rounded bg-ink-200" />
          <div className="h-8 w-64 rounded bg-ink-200" />
          <div className="h-4 w-96 max-w-full rounded bg-ink-200" />
        </div>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-2xl border border-ink-200 bg-surface"
            />
          ))}
        </section>

        <section className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-40 rounded-2xl border border-ink-200 bg-surface"
            />
          ))}
        </section>
      </div>
    </main>
  );
}

async function BookingsContent({
  searchParams,
}: BookingsPageProps) {
  const user = await requireUser();
  const query = await searchParams;

  const reservations = await prisma.reservation.findMany({
    where: {
      userId: user.id,
    },
    include: {
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const today = new Date();

  const activeBookings = reservations.filter(
    (reservation) => reservation.endDate >= today
  );

  const totalCharged = reservations.reduce(
    (sum, reservation) => sum + reservation.totalPrice,
    0
  );

  return (
    <main className={uiShell.pageContainer}>
      <PageIntro
        badge="Your bookings"
        icon={CalendarCheck2}
        title="Your reservations"
        description="Track upcoming stays, review completed trips, and manage active bookings."
      />

      {query.message ? (
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
          {query.message}
        </p>
      ) : null}

      <section className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total bookings"
          value={reservations.length}
        />

        <StatCard
          label="Active bookings"
          value={activeBookings.length}
        />

        <StatCard
          label="Total spend"
          value={`$${totalCharged}`}
          icon={Wallet}
        />
      </section>

      <section className="mt-6 space-y-3 md:space-y-4">
        {reservations.length === 0 ? (
          <EmptyState
            icon={CalendarX2}
            title="No reservations yet"
            description="Reserve your first stay and it will appear here."
            actionHref="/"
            actionLabel="Browse homes"
          />
        ) : (
          reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              today={today}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default function BookingsPage({
  searchParams,
}: BookingsPageProps) {
  return (
    <Suspense fallback={<BookingsLoading />}>
      <BookingsContent searchParams={searchParams} />
    </Suspense>
  );
}
