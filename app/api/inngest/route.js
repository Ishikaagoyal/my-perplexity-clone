import { serve } from "inngest/next";
import { inngest } from "../../../inngest/server";
import { helloWorld, llmModel } from "../../../inngest/functions";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   
   llmModel
  ],
});

