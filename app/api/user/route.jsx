import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { usersTable } from '../../../config/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// ✅ Initialize PostgreSQL pool and Drizzle
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
});
const db = drizzle(pool);

export async function POST(req) {
  const { email, name } = await req.json();

  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (user.length > 0) {
      return NextResponse.json({ message: "User already exists" });
    }
//insert the new user
    const result = await db
      .insert(usersTable)
      .values({ name, email })
      .returning();

    return NextResponse.json({ message: "User created", user: result[0] });
  } catch (err) {
    console.error("DB Error:", err);
    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}
