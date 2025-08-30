# Partner Management System

## Overview

The Partner Management System is a comprehensive solution for managing institutional partnerships in the BEAM Skills platform. It includes a complete workflow from application to approval to dashboard access.

## 🏗️ **System Architecture**

### Database Schema
- **`partner_institutions`**: Core partnership data
- **`partner_courses`**: Courses offered by partners
- **`partner_events`**: Events hosted by partners
- **`partner_students`**: Student enrollments and progress

### Authentication
- **Google OAuth** through Supabase
- **Role-based access control** (Partners vs Admins)
- **Secure session management**

### API Endpoints
- **`/api/partners`**: Create and list partnerships
- **`/api/partners/[id]`**: Manage individual partnerships

## 🔄 **User Workflow**

### 1. Partnership Application
```
User visits /contact → Fills application form → Submits to database → Redirected to /partner-login
```

### 2. Partner Authentication
```
User signs in with Google → OAuth callback → Check partnership status → Redirect to appropriate page
```

### 3. Admin Review
```
Admin visits /admin/partners → Reviews applications → Approves/rejects → Updates status
```

### 4. Partner Dashboard
```
Approved partner → Accesses /institution-dashboard → Manages courses, events, students
```

## 🗄️ **Database Setup**

### 1. Run the Schema
```sql
-- Execute the partner_schema.sql file in your Supabase SQL editor
-- This creates all necessary tables, indexes, and RLS policies
```

### 2. Environment Variables
```bash
# Required for partner management
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Google OAuth Setup
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Set redirect URLs:
   - `http://localhost:3000/partner-login/callback` (development)
   - `https://yourdomain.com/partner-login/callback` (production)

## 🚀 **Features**

### Partner Application Form (`/contact`)
- Institution information collection
- Course selection from predefined list
- Form validation and error handling
- Database submission via API

### Partner Login (`/partner-login`)
- Google OAuth authentication
- Partnership status checking
- Automatic redirects based on status

### Admin Dashboard (`/admin/partners`)
- View all partnership applications
- Filter by status (pending/approved/rejected)
- Approve/reject applications
- Delete partnerships
- Search and filter functionality

### Institution Dashboard (`/institution-dashboard`)
- Overview of partnership details
- Course management
- Event planning
- Student tracking
- Settings and profile management

## 🔐 **Security Features**

### Row Level Security (RLS)
- Partners can only see their own data
- Admins can see all data
- Secure data isolation

### Authentication Guards
- Protected routes require valid sessions
- Automatic redirects for unauthorized access
- Session validation on every request

### API Security
- Service role key for admin operations
- Input validation and sanitization
- Error handling without data leakage

## 📱 **User Interface**

### Design System
- Consistent with BEAM Skills branding
- Responsive design for all devices
- Smooth animations with Framer Motion
- Accessible color schemes and typography

### Navigation
- Clear user flow between pages
- Breadcrumb navigation
- Contextual action buttons
- Status indicators and notifications

## 🧪 **Testing & Development**

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run the development server: `npm run dev`
5. Test the complete workflow

### Testing Scenarios
1. **New Partnership Application**
   - Fill out contact form
   - Submit to database
   - Verify data persistence

2. **Partner Authentication**
   - Google OAuth flow
   - Session management
   - Redirect logic

3. **Admin Operations**
   - Review applications
   - Approve/reject partnerships
   - Data management

4. **Partner Dashboard**
   - Access control
   - Data display
   - Functionality testing

## 🚨 **Troubleshooting**

### Common Issues

#### OAuth Redirect Errors
- Check Google OAuth configuration in Supabase
- Verify redirect URLs match exactly
- Ensure environment variables are set correctly

#### Database Connection Issues
- Verify Supabase credentials
- Check RLS policies are properly configured
- Ensure tables exist and have correct structure

#### Authentication Problems
- Clear browser cookies and local storage
- Check Supabase auth logs
- Verify user has proper permissions

### Debug Mode
Enable debug logging in development:
```typescript
// Add to components for debugging
console.log('Partnership data:', partnership)
console.log('User session:', user)
```

## 🔮 **Future Enhancements**

### Planned Features
- **Email Notifications**: Automated status updates
- **File Uploads**: Document management for partnerships
- **Analytics Dashboard**: Partnership performance metrics
- **Integration APIs**: Third-party system connections
- **Mobile App**: Native mobile experience

### Scalability Considerations
- Database indexing optimization
- API rate limiting
- Caching strategies
- Load balancing for high traffic

## 📞 **Support**

### Documentation
- This README file
- Code comments and TypeScript types
- API endpoint documentation

### Contact
For technical support or questions about the Partner Management System:
- Check the codebase for implementation details
- Review Supabase documentation for database issues
- Consult Next.js documentation for framework questions

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: BEAM Skills Development Team
