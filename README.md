# SUVIT - Business Management Platform

A modern, responsive, and feature-rich web application for "SUVIT", a comprehensive business management solution. Built with Next.js 14, TypeScript, and Tailwind CSS, this project showcases a dynamic blog, reusable components, and a clean architecture following the latest web development best practices.

## 🚀 Live Demo

[**Explore the live application here**](https://blog-task-neon.vercel.app/blog)

---

## ✨ Key Features

-   **Framework**: Built with **Next.js 14** using the App Router for optimized performance and routing.
-   **Type Safety**: Fully written in **TypeScript** for robust, scalable, and maintainable code.
-   **Styling**: Styled with **Tailwind CSS**, following a utility-first approach for rapid and responsive UI development. Custom theming is achieved via CSS variables.
-   **Dynamic Blog**: A feature-rich blog page (`/blog`) with:
    -   **Tag-based Filtering**: Filter posts by category.
    -   **Pagination**: Easily navigate through numerous blog posts.
    -   **Featured Post Section**: Highlights a key article.
-   **Mock API**: Includes a Next.js API route (`/api/blog`) to simulate fetching blog data from a backend.
-   **Reusable Components**: A library of well-structured components like `Button`, `Header`, and `Footer` for a consistent UI.
-   **Responsive Design**: Mobile-first design ensures a seamless experience across all devices, from mobile phones to desktops.
-   **SEO Optimized**: Basic SEO setup with `metadata` in the root layout.

---

## 🛠️ Tech Stack

-   **Frontend**: Next.js 14, React 18
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Deployment**: Vercel 

---

## 📁 Project Structure

The project uses the `src` directory to colocate all application code, promoting a clean and organized structure.

```
nextjs-js-tailwind/
├── public/             # Static assets
├── src/
│   ├── app/            # App router components
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Main page component
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global styles and Tailwind configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration

```

## 🧩 Page Editing

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 🎨 Styling

This project uses Tailwind CSS for styling with the following features:
- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities
- PostCSS and Autoprefixer integration

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start the development server
- `npm run serve` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

## 📱 Deployment

Build the application for production:

  ```bash
  npm run build
  ```