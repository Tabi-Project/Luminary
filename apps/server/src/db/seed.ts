import "dotenv/config";
import bcrypt from "bcryptjs";
import { db, pool } from "./index.js";
import { admins } from "./schema.js";

const email = process.env.ADMIN_EMAIL?.toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error(
    "Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables before running the seed script.",
  );
  process.exit(1);
}

const password_hash = await bcrypt.hash(password, 12);

await db
  .insert(admins)
  .values({ email, password_hash })
  .onConflictDoUpdate({
    target: admins.email,
    set: { password_hash, updated_at: new Date() },
  });

console.log(`Admin user ${email} is ready.`);

await pool.end();
