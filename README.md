# 🥬 Fresh Harvest Frontend

A modern, responsive, SEO-optimized frontend built with **Next.js 15**, **Redux Toolkit**, **Tailwind CSS**, and **TypeScript** — designed for the Fresh Harvest e-commerce experience.

> 🚀 Live site: [fresh-harvest-frontend.vercel.app](https://fresh-harvest-frontend.vercel.app/)
> 📦 Repo: [GitHub - Shazzadhossensunny/fresh-harvest-frontend](https://github.com/Shazzadhossensunny/fresh-harvest-frontend)

---

## ✨ Features

- 🌐 SEO-friendly with server-side support via Next.js
- 🔁 State management with **Redux Toolkit + RTK Query**
- 🎨 Beautiful UI built using **Tailwind CSS**
- 🧩 Modular components and clean code structure
- 🔒 Auth-ready architecture (Redux slice + JWT support)
- 🎠 Testimonial slider with **Swiper.js**
- 📦 Optimized and deployable to Vercel

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **State Management:** Redux Toolkit + RTK Query + Redux Persist
- **Styling:** Tailwind CSS
- **UI Libraries:** Lucide, React Icons
- **Form Handling:** react-hook-form
- **Slider:** Swiper.js
- **Toast Notification:** sonner
- **Auth:** JWT decode ready

---

## ⚙️ Installation

Clone the project and install dependencies:

```bash
git clone https://github.com/Shazzadhossensunny/fresh-harvest-frontend.git
cd fresh-harvest-frontend
npm install
```

---

## 🚀 Getting Started

### Start Development Server

```bash
npm run dev
```

Access at: [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Folder Structure

```
src/
├── app/                 → Next.js app router
│   ├── (CommonLayout)/  → Main layout pages
│   └── product/[id]/    → Product detail page
├── components/          → Reusable UI components
├── redux/               → Redux Toolkit & API setup
│   ├── api/             → baseApi.ts, productApi.ts
│   ├── features/        → authSlice.ts, modalSlice.ts
├── styles/              → Global styles & Tailwind config
├── utils/               → Utility functions/helpers
public/                  → Static assets (images, SVGs)
```

---

## 🧠 Notes

### 🔗 Redux API Example

```ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://code-commando.com/api/v1" }),
  endpoints: () => ({}),
});
```

### ✅ ESLint Rule for `no-explicit-any`

To fix this warning, edit `.eslintrc.js`:

```js
rules: {
  '@typescript-eslint/no-explicit-any': 'off', // or 'warn'
}
```

---

## 🌐 SEO

- Dynamic meta tags per page
- Accessible & semantic HTML
- Fallback 404 page included

---

## 📦 Deployment

Deployed using [Vercel](https://vercel.com/) for optimal performance and CI/CD integration.

---

## 🤝 Contribution

Feel free to fork this repo and submit a PR. For bugs or improvements, open an issue.

---

## 📄 License

MIT © [Shazzadhossensunny](https://github.com/Shazzadhossensunny)
