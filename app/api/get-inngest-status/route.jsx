import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { runid } = await req.json();

  try {
    const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runid}/runs`, {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`
      }
    });

    //console.log("Inngest run result:", result.data); 

    return NextResponse.json(result.data); 

  } catch (e) {
    console.error("Error fetching run status:", e);
    return NextResponse.json({ error: e.message });
  }
}
