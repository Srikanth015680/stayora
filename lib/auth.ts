
import "server-only";

import { redirect } from "next/navigation";

import { auth } from "@/auth/config";
import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  let session;

  try {
    session = await auth();
  } catch {
    return null;
  }

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
