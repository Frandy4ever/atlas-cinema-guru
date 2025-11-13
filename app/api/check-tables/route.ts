import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    return Response.json({ tables: result.rows });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}