"use server";

import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";
import { categorySchema, CreateCategoryInput } from "@/lib/validationSchemas";

export default async function createCategory(input: CreateCategoryInput) {
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid category input");
  }

  const user = await getOrCreateTestUser();

  const category = await db.category.create({
    data: {
      ...parsed.data,
      userId: user.id,
    },
  });
  return category;
}
