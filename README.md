# Psychometric Test Platform

A full-featured psychometric testing platform built with React and Next.js for the frontend. It uses tRPC for end-to-end type-safe APIs, Zod for input validation, and Prisma ORM with PostgreSQL for database operations. Authentication is handled securely through Kinde. The frontend is styled using Tailwind CSS for a modern and responsive UI.

## <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)

## Introduction

This platform allows users to take various psychometric assessments, 
securely track results, and receive dynamic reports. It leverages modern full-stack technologies to provide a seamless developer and user experience.
 Built with type safety and scalability in mind, the app uses tRPC and Zod on the backend, ensuring consistent validation and error handling.

## <a name="tech-stack">Tech Stack</a>


- React: A powerful JavaScript library for building interactive user interfaces.
- Next.js: A full-stack React framework with SSR support and built-in API routes.
- tRPC: End-to-end typesafe APIs without needing REST or GraphQL.
- Zod: A TypeScript-first schema validation library used for validating inputs and API responses.
- Tailwind CSS: A utility-first CSS framework for building modern responsive UIs.
- Kinde Auth: Authentication-as-a-service supporting OAuth and session management.
- PostgreSQL: A reliable and feature-rich open-source relational database.
- Prisma ORM: A type-safe ORM for interacting with PostgreSQL databases in Node.js.


## <a name="features">Features</a>


- Clean and Responsive UI: Styled with Tailwind CSS for a seamless user experience on all devices.
- Type-safe APIs with tRPC: All backend procedures are exposed via tRPC, providing full type safety across client and server.
- Input Validation with Zod: Ensures that all API inputs and outputs meet expected formats and constraints.
- Kinde Authentication: Secure authentication and session management using Kinde.
- Persistent User Sessions: Users stay signed in across sessions.
- Dynamic Test Engine: Supports dynamically loaded psychometric test flows with progress tracking.
- Result Evaluation and Scoring: Generates results and reports automatically based on user responses.
- PostgreSQL with Prisma: Stores users, tests, results, and analytics securely with full relational integrity.


## <a name="installation">Installation</a>

To run the project locally, follow these steps:

### Prerequisites

- Node.js
- PostgreSQL
- Git
- pnpm or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VinayN3gi/psychtest.git
   cd psychtest
2. Install depenpendencies:
    ```bash
    npm install
3. Create a .env file at the root of the project and add the following
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/psychometric_db
   KINDE_CLIENT_ID=your-kinde-client-id
   KINDE_CLIENT_SECRET=your-kinde-client-secret
   KINDE_ISSUER_URL=https://yourdomain.kinde.com
   KINDE_SITE_URL=http://localhost:3000
   KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
   KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
4. Set up the database
   ```bash
   npx prisma generate 
   npx prisma migrate dev --name init
5. Start the development server
    ```bash
    npm run dev
The app will be available at http://localhost:3000


## <a name="usage">Usage</a>

 - Authenticate with Kinde to access protected features.

 - Browse available psychometric assessments.

 - Complete assessments and receive real-time evaluated results.

 - View your previous results and track your progress.
