# GitHub User Auth Frontend

A React application for searching and managing GitHub users with phone authentication.

## Project Structure

```
app-fe/
├── src/
│   ├── api/                  # API client functions
│   ├── components/
│   │   ├── features/        # Feature-specific components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── home/        # Home page components
│   │   │   └── layouts/     # Layout components
│   │   └── shared/          # Shared/common components
│   ├── constants/           # Constants and enums
│   ├── hooks/              # Custom React hooks
│   ├── libs/               # Third-party library configs
│   ├── models/             # TypeScript interfaces
│   ├── pages/              # Page components
│   ├── stores/            # Zustand stores
│   └── utils/             # Utility functions
├── .env                   # Environment variables
├── .env.sample           # Environment variables template
└── package.json
```

## Features

- Phone number authentication
- GitHub user search with pagination
- Like/Unlike GitHub users
- View liked profiles with details
- Responsive design using Tailwind CSS
- State management with Zustand

## Prerequisites

- Node.js (v18 or higher)
- Backend service running (on port 5000)

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/vohavinhtan01012001/github-user-FE.git
cd app-fe
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.sample .env
```
Edit `.env` file with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
npm run dev
```

The application will start on http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

