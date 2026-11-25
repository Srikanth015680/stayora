# Stayora 🏡

Stayora is a modern property rental and booking platform inspired by Airbnb. It allows users to discover unique stays, explore property details, make reservations, and manage their own listings.

## ✨ Features

- Browse available properties
- Search and filter listings
- View detailed property information
- Interactive image galleries
- Date-range selection for bookings
- Secure user authentication
- Google login integration
- Create, edit, and delete property listings
- Manage reservations
- Host dashboard
- Light and dark mode
- Image uploads with UploadThing
- Responsive user interface

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 7
- **Authentication:** Auth.js
- **Image Uploads:** UploadThing
- **Icons:** Lucide React
- **Date Handling:** date-fns, React DayPicker

## 📁 Project Structure

```text
Stayora/
├── app/
│   ├── api/
│   ├── bookings/
│   ├── host/
│   ├── listings/
│   └── page.tsx
├── auth/
├── components/
├── Data/
├── generated/
├── lib/
├── prisma/
├── public/
├── types/
├── .env
├── next.config.ts
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd stayora
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgresql_connection_string"

AUTH_SECRET="your_auth_secret"

AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"

UPLOADTHING_TOKEN="your_uploadthing_token"
```

Add only the credentials for services you have configured.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Type Checking

```bash
npx tsc --noEmit
```

## 🏗️ Production Build

```bash
npm run build
npm start
```

## 🔐 Environment Variables

| Variable               | Description                    |
| ---------------------- | ------------------------------ |
| `DATABASE_URL`       | PostgreSQL database connection |
| `AUTH_SECRET`        | Auth.js secret                 |
| `AUTH_GOOGLE_ID`     | Google OAuth client ID         |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret     |
| `UPLOADTHING_TOKEN`  | UploadThing API token          |

**Important:** Never commit your `.env` file or expose API secrets publicly.

## 📌 Project Status

Stayora is under active development. New features and improvements are being added.

## 📄 License

This project is currently developed for learning and portfolio purpose

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
