import { db } from "@/lib/db";
import { getOrCreateTestUser } from "./getTestUser";

const defaultCategories = [
  { name: "Food & Dining", color: "green" },
  { name: "Transport", color: "yellow" },
  { name: "Utilities", color: "blue" },
  { name: "Entertainment", color: "purple" },
  { name: "Other", color: "red" },
];

export async function seedTestCategories() {
  const user = await getOrCreateTestUser();

  const existing = await db.category.findMany({
    where: { userId: user.id },
  });

  if (existing.length > 0) return;

  await db.category.createMany({
    data: defaultCategories.map((cat) => ({
      ...cat,
      userId: user.id,
    })),
  });
}
