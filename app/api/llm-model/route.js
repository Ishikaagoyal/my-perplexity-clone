import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
export async function POST(req){
    const {searchinput, searchResult,recordId }=await req.json();
    const inngestrunid=await inngest.send({
    name: "llm-model",
    data: {
      searchinput: searchinput,
      searchResult:searchResult,
      recordId: recordId
    },
  });
  return NextResponse.json(inngestrunid.ids[0]);
}