import { inngest } from "./client";
import { supabase } from "@/services/supabase";
const { JSDOM } = require('jsdom');  // Used JSDOM for HTML parsing

// Helper function to clean HTML tags from the text
const stripHtml = (html) => {
  const dom = new JSDOM(html);
  return dom.window.document.body.textContent || "";  // Extract clean text content
};

export const llmModel = inngest.createFunction(
  { id: "llm-model" },
  { event: "llm-model" },
  async ({ event, step }) => {
    console.log(" Starting llmModel");

    const searchinput = event.data.searchinput || "[empty input]";
    const rawResults = event.data.searchResult || [];

    // Slice to prevent oversized payload, limiting the results
    const searchResult = rawResults.slice(0, 10);  // Adjust slice based on the number of results you want

    console.log(" searchInput:", searchinput);
    //console.log(" searchResult (sliced):", JSON.stringify(searchResult, null, 2));

    // Clean the HTML tags and concatenate descriptions
    const searchText = searchResult
      .map(result => stripHtml(result.description))  // Remove HTML tags
      .join(" ");  // Join descriptions into one string

    // Limit the text to the first 4000 characters to avoid overloading the model
    const limitedSearchText = searchText.substring(0, 4000);  // Adjust this limit as necessary

    //console.log(" searchText to summarize (limited):", limitedSearchText);

    // Construct the payload for Gemini
   const payload = {
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `Summarize the following input using markdown formatting.\n\nUser Input:\n${searchinput}\n\nSearch Context:\n${limitedSearchText}`
        }
      ]
    }
  ]
};

    console.log(" Payload to Gemini:", JSON.stringify(payload, null, 2));

    let aiResp;
    try {
      console.log(" API KEY EXISTS?", !!process.env.NEXT_PUBLIC_GEMINI_API_KEY);

     aiResp = await step.ai.infer("generate-ai-llm-model-call", {
  model: step.ai.models.gemini({
    model: "gemini-1.5-flash", 
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
  }),
  body: payload
});

    } catch (err) {
      console.error(" Gemini inference failed:", err?.message || err);
      console.log(" API KEY EXISTS?", !!process.env.NEXT_PUBLIC_GEMINI_API_KEY);

      return { error: "Gemini API call failed with 400" };
    }

    const content = aiResp?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!content) {
      console.warn("⚠️ Gemini responded with empty content.");
      return { warning: "Gemini returned no content" };
    }

    const savetodb = await step.run("savetodb", async () => {
      const { data, error } = await supabase
        .from("chats")
        .update({ aiResp: content })
        .eq("id", event.data.recordId)
        .select();

      if (error) {
        console.error(" Failed to save to DB:", error);
        throw error;
      }

      console.log(" AI response saved to DB");
      return data;
    });

    console.log(" llmModel completed successfully");
    return { success: true };
  }
);
// © 2025 Ishikaa Goyal. All rights reserved.

