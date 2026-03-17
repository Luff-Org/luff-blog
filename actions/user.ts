"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UpdateProfileSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name: string; image?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validatedFields = UpdateProfileSchema.parse(data);
  const { name, image } = validatedFields;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      ...(image && { image }),
    },
  });

  revalidatePath("/");
  revalidatePath("/settings");
  return { success: true };
}
