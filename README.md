# Cinema Guru

A modern movie tracking application built with Next.js that allows users to discover movies, manage their favorites, and create a watch later list. Features GitHub OAuth authentication and a beautiful, responsive UI.

![Cinema Guru](./images/task-2-a.png)

## 🎬 Features

- **Movie Discovery**: Browse through a curated collection of movies with advanced filtering
- **Smart Filtering**: Search by title, filter by release year range, and select multiple genres
- **Favorites System**: Mark movies as favorites for quick access
- **Watch Later List**: Save movies to watch later with one click
- **Activity Feed**: Track your recent activity (favorites and watch later additions)
- **GitHub Authentication**: Secure login with GitHub OAuth
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Instant feedback when adding/removing movies

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Vercel Postgres)
- **ORM**: [Kysely](https://kysely.dev/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database (or Vercel Postgres)
- GitHub OAuth Application credentials

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Frandy4ever/atlas-cinema-guru.git
cd atlas-cinema-guru
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
POSTGRES_URL="postgresql://user:password@host:5432/database?sslmode=require"
POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/database?sslmode=require"
POSTGRES_URL_NO_SSL="postgresql://user:password@host:5432/database"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host:5432/database?sslmode=require"
POSTGRES_USER="your_user"
POSTGRES_HOST="your_host"
POSTGRES_PASSWORD="your_password"
POSTGRES_DATABASE="your_database"

# NextAuth Configuration
AUTH_SECRET="your_generated_secret"

# GitHub OAuth
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
```

### 4. Generate AUTH_SECRET

```bash
openssl rand -base64 32
```

### 5. Set up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: Cinema Guru
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and generate a Client Secret
5. Add them to your `.env.local` file

### 6. Set up the database

Run the seed script to create tables and populate with movie data:

```bash
npm run dev
```

Then visit: `http://localhost:3000/api/seed`

## 🎯 Usage

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
atlas-cinema-guru/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── activities/          # User activities endpoint
│   │   ├── auth/                # NextAuth handlers
│   │   ├── favorites/           # Favorites CRUD operations
│   │   ├── genres/              # Genre listing
│   │   ├── titles/              # Movie listings
│   │   └── watch-later/         # Watch later CRUD operations
│   ├── favorites/               # Favorites page
│   ├── login/                   # Login page
│   ├── watch-later/             # Watch later page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── global.css               # Global styles
├── components/                   # React components
│   ├── activity-feed.tsx        # Activity feed component
│   ├── filters.tsx              # Movie filters
│   ├── header.tsx               # App header
│   ├── movie-card.tsx           # Movie card with actions
│   ├── movie-grid.tsx           # Grid layout for movies
│   ├── pagination.tsx           # Pagination controls
│   └── sidebar.tsx              # Navigation sidebar
├── lib/                          # Utility functions
│   ├── data.ts                  # Database queries
│   ├── db.ts                    # Database configuration
│   ├── definitions.ts           # TypeScript types
│   └── seed.ts                  # Database seeding
├── public/                       # Static assets
│   ├── images/                  # Movie images
│   └── logo.png                 # App logo
├── seed/                         # Seed data
│   └── titles.ts                # Movie data
├── auth.ts                       # NextAuth configuration
├── middleware.ts                 # Route protection
└── next.config.ts               # Next.js configuration
```

## 🎨 Design

The application features a modern, dark-themed UI with:
- **Primary Color**: Deep navy blue (`hsl(240, 100%, 12%)`)
- **Accent Color**: Bright cyan (`#1dd2af` / `hsl(168, 76%, 47%)`)
- **Secondary Accent**: Lighter cyan (`#54f4d0`)

Design files are available in Figma: [Cinema Guru Design](https://www.figma.com/design/AWVM8Ak0kY6aTdEbiqscFb/Cinema-Guru)

## 📊 Database Schema

### Tables

**titles**
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `synopsis` (TEXT)
- `released` (INTEGER)
- `genre` (VARCHAR)

**favorites**
- `id` (UUID, Primary Key)
- `title_id` (UUID, Foreign Key → titles)
- `user_id` (VARCHAR)

**watchlater**
- `id` (UUID, Primary Key)
- `title_id` (UUID, Foreign Key → titles)
- `user_id` (VARCHAR)

**activities**
- `id` (UUID, Primary Key)
- `timestamp` (TIMESTAMP)
- `title_id` (UUID, Foreign Key → titles)
- `user_id` (VARCHAR)
- `activity` (VARCHAR: 'FAVORITED' | 'WATCH_LATER')

## 🔐 Authentication

The app uses NextAuth.js v5 with GitHub OAuth provider:
- All pages except `/login` require authentication
- User sessions are managed server-side
- Middleware protects routes automatically

## 🌐 API Endpoints

### Movies
- `GET /api/titles?page=1&minYear=2020&maxYear=2024&genres=Sci-Fi,Drama` - Get movies with filters
- `GET /api/genres` - Get all available genres

### Favorites
- `GET /api/favorites?page=1` - Get user's favorites
- `POST /api/favorites/:id` - Add movie to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Watch Later
- `GET /api/watch-later?page=1` - Get watch later list
- `POST /api/watch-later/:id` - Add to watch later
- `DELETE /api/watch-later/:id` - Remove from watch later

### Activities
- `GET /api/activities?page=1` - Get user's recent activities

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

The application will be automatically deployed on every push to the main branch.

### Environment Variables in Vercel

Make sure to add all environment variables from `.env.local` to your Vercel project settings under "Environment Variables".

## 🧪 Testing

After deployment, verify:
1. ✅ Login with GitHub works
2. ✅ Movies are displayed on home page
3. ✅ Filtering and search work correctly
4. ✅ Adding/removing favorites works
5. ✅ Adding/removing from watch later works
6. ✅ Activity feed updates
7. ✅ Pagination works correctly

## 📝 Features Breakdown

### Home Page (`/`)
- Grid layout displaying 6 movies per page
- Search by title (case-insensitive)
- Filter by year range (min/max)
- Filter by multiple genres simultaneously
- Pagination with Previous/Next buttons
- Hover effects showing movie details
- Quick actions: Favorite & Watch Later

### Favorites Page (`/favorites`)
- Display all favorited movies
- Same grid layout and interactions as home
- Pagination support
- Empty state message

### Watch Later Page (`/watch-later`)
- Display all watch later movies
- Same grid layout and interactions as home
- Pagination support
- Empty state message

### Sidebar
- Collapsible navigation (expands on hover)
- Three main sections: Home, Favorites, Watch Later
- Activity feed showing recent actions
- Smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Frandy Slueue**
- GitHub: [@Frandy4ever](https://github.com/Frandy4ever)
- Email: frandy4ever@gmail.com

## 🏫 Project Context

This project is part of the Atlas School curriculum, designed to demonstrate proficiency in:
- Modern web development with Next.js and TypeScript
- Database design and management with PostgreSQL
- Authentication and authorization
- RESTful API design
- Responsive UI/UX development
- Full-stack application deployment

## 🙏 Acknowledgments

- Movie data and images provided by Atlas School
- Design inspiration from modern streaming platforms
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

If you have any questions or run into issues, please:
1. Check the [Issues](https://github.com/Frandy4ever/atlas-cinema-guru/issues) page
2. Create a new issue with detailed information
3. Email: frandy4ever@gmail.com

---

**Built with ❤️ using Next.js and TypeScript**