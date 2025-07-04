# 🧠 Perplexity AI Clone

A fully functional and visually modern clone of [Perplexity AI](https://www.perplexity.ai/), built using **Next.js 14**, **Clerk**, **Supabase**, and more. This app mimics the intelligent search and conversational experience of Perplexity AI, with additional features like asynchronous summaries, a Discover news feed, and a user-specific searchable Library.

---

##🚀 Features
🔍 Brave Search API – Fetches real-time search results for any query.

🤖 Gemini API (Gemini 1.5 Flash) – Summarizes search results using LLM via Inngest for async execution.

🧠 Client-side Caching – Prevents redundant API calls when switching between search categories.

📚 User Library – Stores all past searches by authenticated users using Supabase; enables easy revisiting.

🧭 Discover Page – Dynamic news feed with topic filters, category badges, and news cards.

🔐 Clerk Authentication – Handles secure login and session management.

🌗 Modern UI – Fully responsive with dark/light modes, animated transitions, shimmer loaders, and accessibility-friendly layouts.

🎬 Video & Image Detection – Adds play icon if video content exists; fetches thumbnails and source branding.

🏷️ Badges for Trending/Editor's Pick – Dynamically applied based on index logic.

---

## 🧱 Tech Stack
Next.js 14 (App Router) – SSR, routing, layout composition

Tailwind CSS – Utility-first design with dark mode

Supabase – Backend-as-a-service (PostgreSQL + Auth)

Brave Search API – Data source for search and news

Gemini API – LLM summaries

Inngest – Async function orchestration

Clerk – Authentication

Lucide React – Icons

Axios – Data fetching
---


## 🧪 Development Setup

```bash
# git clone https://github.com/your-username/perplexity-clone
cd perplexity-clone
npm install
npm run dev

```
#Then open http://localhost:3000 in your browser.
---
📁 Environment Variables
Create a .env.local and add:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

GEMINI_API_KEY=

BRAVE_API_KEY=

INNGEST_SIGNING_KEY=
---
📦 Deployment
Deployed via Vercel:
---
🪪 License
Licensed under the MIT License © 2025 Ishikaagoyal
---
