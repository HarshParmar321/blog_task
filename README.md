
# SUVIT - Business Management Platform

A modern, responsive blog application built with Next.js 14, TypeScript, and Tailwind CSS. This project features a dynamic blog system with filtering, pagination, and a clean, professional design following modern web development best practices.

## 🚀 Live Demo

[**Explore the live application here**](https://blog-task-neon.vercel.app/blog)

---

## ✨ Key Features

- **Framework**: Built with **Next.js 14** using the App Router for optimized performance and routing
- **Type Safety**: Fully written in **TypeScript** for robust, scalable, and maintainable code
- **Styling**: Styled with **Tailwind CSS** with custom theme configuration using CSS variables
- **Dynamic Blog System**: 
  - Tag-based filtering for blog posts
  - Pagination support for large content sets
  - Featured post highlighting
  - Author information and metadata
- **API Integration**: Next.js API routes (`/api/blog`) with mock data simulation
- **Reusable Components**: Clean component architecture with `Button`, `Header`, and other UI components
- **Responsive Design**: Mobile-first approach ensuring seamless experience across all devices
- **SEO Ready**: Optimized metadata configuration in root layout

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Development**: ESLint, Prettier
- **Deployment**: Vercel-ready configuration

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── blog/
│   │       └── route.ts          # Blog API endpoints
│   ├── blog/
│   │   └── page.tsx              # Main blog page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (redirects to blog)
├── components/
│   ├── common/
│   │   └── Header.tsx            # Navigation header
│   └── ui/
│       └── Button.tsx            # Reusable button component
├── styles/
│   ├── index.css                 # Global styles
│   └── tailwind.css              # Tailwind imports
└── types/
    └── blog.ts                   # TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites
- Nextjs 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:4028](http://localhost:4028) in your browser

The application will automatically redirect from the home page to the blog (`/blog`).

---

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start development server (same as dev)
- `npm run serve` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

---

## 🎨 Styling & Theme

This project uses Tailwind CSS with a custom theme configuration:

- **Custom Colors**: Defined through CSS variables for consistent theming
- **Global Background & Text Colors**: `global.background1-5` and `global.text1-5`
- **Button Colors**: Specialized button text colors
- **Responsive Design**: Mobile-first utilities throughout

---

## 🔧 Configuration

### Next.js Configuration
- **Source Maps**: Enabled for production debugging
- **Redirects**: Root path (`/`) redirects to `/blog`
- **Custom Webpack**: Component tagging loader integration

### TypeScript Configuration
- **Strict Mode**: Enabled for better type safety
- **Path Mapping**: `@/*` maps to `./src/*`
- **Next.js Plugin**: Integrated for optimal development experience

---

## 📱 Deployment

The application is configured for deployment on Vercel:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deployed to Vercel hosting platform


---

## 🏗️ Architecture

- **App Router**: Utilizing Next.js 14's latest routing system
- **API Routes**: Server-side API endpoints for blog data
- **Component-Based**: Modular, reusable component architecture
- **Type-Safe**: Full TypeScript integration with proper interfaces
- **Performance Optimized**: Built-in Next.js optimizations and best practices

---

## 📄 License

This project is private and proprietary to SUVIT.
