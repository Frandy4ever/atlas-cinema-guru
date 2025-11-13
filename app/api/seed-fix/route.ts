import { sql } from "@vercel/postgres";
import { titles } from "@/seed/titles";

export async function GET() {
  try {
    console.log("Starting database fix...");

    // Create tables with simple SQL
    await sql`
      CREATE TABLE IF NOT EXISTS titles (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        synopsis TEXT NOT NULL,
        released INTEGER NOT NULL,
        genre VARCHAR(255) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS favorites (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title_id UUID NOT NULL REFERENCES titles(id),
        user_id VARCHAR(255) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS watchlater (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title_id UUID NOT NULL REFERENCES titles(id),
        user_id VARCHAR(255) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS activities (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT NOW(),
        title_id UUID NOT NULL REFERENCES titles(id),
        user_id VARCHAR(255) NOT NULL,
        activity VARCHAR(255) NOT NULL
      )
    `;

    // Insert titles
    for (const title of titles) {
      await sql`
        INSERT INTO titles (id, title, synopsis, released, genre)
        VALUES (${title.id}, ${title.title}, ${title.synopsis}, ${title.released}, ${title.genre})
        ON CONFLICT (id) DO NOTHING
      `;
    }

    console.log("Database fix completed successfully");
    return Response.json({ message: "Database tables created and seeded successfully" });

  } catch (error) {
    console.error("Database fix error:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}