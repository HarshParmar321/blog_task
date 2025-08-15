# SUVIT - Business Management Platform

A modern Next.js 14 application for "SUVIT", a comprehensive business management solution designed for CAs and businesses. Built with TypeScript and Tailwind CSS.

## 🚀 Features

-   **Next.js 14**: The latest version of the React framework for production.
-   **TypeScript**: Strong typing for enhanced code quality and developer experience.
-   **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development.
-   **Dynamic Blog**: A feature-rich blog with tag-based filtering and pagination, powered by a Next.js API route.
-   **Core Business Modules**:
    -   GST Management & Compliance
    -   Invoice Automation
    -   Expense Tracking
    -   Practice Management

## 📋 Prerequisites

-   Node.js (v18.x or higher)
- npm or yarn


## 🛠️ Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd harsha_s_application
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Open [http://localhost:4028](http://localhost:4028) with your browser to see the result.

## 📁 Project Structure

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