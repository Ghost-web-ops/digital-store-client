# Digital Store - Frontend

This is the frontend for the Digital Store, a modern, full-stack e-commerce platform. It is built with Next.js (App Router) and Tailwind CSS, providing a high-performance, responsive, and user-friendly shopping experience.

**➡️ Live Demo:** [Add Your Vercel Link Here After Deployment]

## ✨ Features

- **Multi-Language Support:** Fully internationalized with support for English and Arabic (`next-international`).
- **Product Catalog:** Browse and view digital products fetched from the backend API.
- **Shopping Cart:** A fully functional cart with the ability to add, remove, and update item quantities. Cart state is persisted in `localStorage` using Zustand.
- **Secure Checkout:** Integrated with Stripe for a secure and seamless payment process.
- **User Accounts:** Complete user registration, login, and a dedicated "My Account" page to view order history and download purchased products.
- **Modern UI/UX:** A clean, responsive design built with Tailwind CSS and shadcn/ui, featuring a dark/light mode theme toggle.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **API Communication:** Axios
- **Global State Management:** Zustand (for Cart), React Context API (for Auth)
- **Internationalization:** next-international

## 🚀 Getting Started

To run this project locally:

1. Clone the repository.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file and add your environment variables:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_KEY_HERE
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```
