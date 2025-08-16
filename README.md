# Skills Training Platform

A modern, lean skills training website built with Next.js, TypeScript, Tailwind CSS, Supabase, and Stripe integration. Features class schedules, instructor profiles, course enrollment, and certification tracking.

## Features

- 🎓 **Course Management**: Browse and filter courses by category, level, and price
- 👨‍🏫 **Instructor Profiles**: View expert instructor profiles with ratings and expertise
- 📅 **Class Scheduling**: View upcoming classes with enrollment status
- 🏆 **Certification Tracking**: Track completed courses and earned certifications
- 💳 **Payment Integration**: Stripe-powered course enrollment system
- 🔍 **Advanced Filtering**: Search and filter by multiple criteria
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🚀 **Vercel Ready**: Optimized for Vercel deployment

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Payments**: Stripe
- **Icons**: Lucide React
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd skills-training-platform
npm install
```

### 2. Environment Setup

Copy the environment example file and fill in your credentials:

```bash
cp env.example .env.local
```

Update `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
3. Set up Row Level Security (RLS) policies

### 4. Stripe Setup

1. Create a Stripe account and get your API keys
2. Set up webhook endpoints pointing to `/api/stripe/webhook`
3. Configure webhook events for `checkout.session.completed`

### 5. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── stripe/        # Stripe integration
│   ├── courses/           # Courses page
│   ├── instructors/       # Instructors page
│   ├── schedule/          # Class schedule page
│   ├── certifications/    # Certifications page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client
│   └── stripe.ts          # Stripe configuration
├── supabase/              # Database schema
│   └── schema.sql         # SQL schema file
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

## Database Schema

The platform uses the following main tables:

- **profiles**: User profiles extending Supabase auth
- **instructors**: Instructor information and expertise
- **courses**: Course details, pricing, and metadata
- **enrollments**: User course enrollments and progress
- **certifications**: Earned certificates and completion status
- **course_schedules**: Class scheduling and availability
- **reviews**: Course ratings and feedback

## Key Features Implementation

### Course Filtering
- Category-based filtering
- Price range selection
- Skill level filtering
- Search functionality
- Sorting by popularity, rating, price, etc.

### Instructor Profiles
- Expertise area filtering
- Experience level filtering
- Rating and student count display
- Course count and company information

### Class Scheduling
- Date-based filtering
- Category filtering
- List and calendar view modes
- Enrollment status tracking

### Certification Tracking
- Status-based filtering (active, expired, pending)
- Category filtering
- Score display and color coding
- Expiry date tracking

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

Ensure all environment variables are set in your Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

## Customization

### Adding New Categories
Update the categories array in the relevant components and the database schema.

### Styling
Modify `tailwind.config.js` and `app/globals.css` for custom design system.

### Database Schema
Extend `supabase/schema.sql` for additional features like:
- Course prerequisites
- Advanced user roles
- Learning paths
- Assessment systems

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the Supabase documentation
- Review Stripe integration guides

## Roadmap

- [ ] User authentication and profiles
- [ ] Course content management system
- [ ] Advanced calendar integration
- [ ] Learning analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced assessment tools
- [ ] Social learning features
