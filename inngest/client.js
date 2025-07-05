import { Inngest } from "inngest";


export const inngest = new Inngest({ id: "perplexity-ai",
    eventKey: process.env.INNGEST_EVENT_KEY,
 });

