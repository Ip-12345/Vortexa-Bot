This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# 🧠 AI Content Generator

A full-stack **AI-powered content generation platform** built using modern web technologies, designed to streamline and automate content creation for individuals, marketers, creators, and businesses.

This app allows users to log in securely, select from a wide variety of prompt-based templates (50+), and instantly generate high-quality content using **Google’s Gemini LLM API**.

---

## 🚀 What Is This Project?

The **AI Content Generator** is a production-ready web application that enables:

- 📄 **Automated content generation** for blogs, ads, emails, social media, SEO, and more.
- 👤 **User-specific content history**, enabling users to track, reuse, or edit their generated content.
- 🔐 **Secure, role-based access** using Clerk authentication.
- 🧠 **Modular templates** that can be extended or customized for various content types.

> Ideal for content teams, digital marketers, small businesses, and personal productivity.

---

## 👨‍💻 How It Helps Users

- ⏱ Saves time by automating content generation workflows
- 💡 Sparks creativity by offering intelligent suggestions and structured templates
- 📦 Centralizes and stores all past generations securely in the user dashboard
- 🌐 Can be deployed and shared as a SaaS tool or internal content studio

---

## 🛠 Tech Stack

| Layer           | Technology                                                                 |
|------------------|----------------------------------------------------------------------------|
| **Frontend**     | [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/)  |
| **Styling**      | [Tailwind CSS](https://tailwindcss.com/)                                   |
| **Type Safety**  | TypeScript                                                                 |
| **Authentication** | [Clerk.dev](https://clerk.dev/)                                          |
| **AI Integration** | [Gemini API (Google Generative AI)](https://ai.google.dev/)              |
| **Database**     | Firebase / Supabase (configurable)                                         |
| **Deployment**   | Vercel                                                                     |

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
