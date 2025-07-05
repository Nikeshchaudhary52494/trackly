import { db } from "@/lib/db";

const TEST_USER_EMAIL = "test@trackly.dev";

export async function getOrCreateTestUser() {
  const existing = await db.user.findUnique({
    where: { email: TEST_USER_EMAIL },
  });

  if (existing) return existing;

  const newUser = await db.user.create({
    data: {
      name: "Test User",
      email: TEST_USER_EMAIL,
      password: "test-password",
    },
  });

  return newUser;
}
