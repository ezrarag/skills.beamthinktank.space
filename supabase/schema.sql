-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  special_needs TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT NOT NULL,
  price TEXT DEFAULT 'Free (unlocked through community donations)',
  duration TEXT NOT NULL,
  total_hours INTEGER,
  instructor TEXT NOT NULL,
  level TEXT DEFAULT 'Beginner',
  featured BOOLEAN DEFAULT false,
  location TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  class_time TEXT NOT NULL,
  max_students INTEGER DEFAULT 15,
  enrolled_students INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course schedule table
CREATE TABLE IF NOT EXISTS public.course_schedule (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
  week INTEGER NOT NULL,
  topic TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course requirements and outcomes
CREATE TABLE IF NOT EXISTS public.course_requirements (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
  requirement TEXT NOT NULL,
  type TEXT DEFAULT 'requirement', -- 'requirement' or 'outcome'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'attended', 'cancelled')),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attended_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  UNIQUE(user_id, course_id)
);

-- Notifications table for SMS/email
CREATE TABLE IF NOT EXISTS public.notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('sms', 'email', 'both')),
  message TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  twilio_sid TEXT, -- Store Twilio message SID for tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add attendance_mode column to enrollments table
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS attendance_mode TEXT DEFAULT 'in-person' CHECK (attendance_mode IN ('in-person', 'jitsi', 'discord'));

-- Class sessions table for tracking individual class instances
CREATE TABLE IF NOT EXISTS public.class_sessions (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  jitsi_room_id TEXT UNIQUE,
  discord_channel_id TEXT,
  discord_invite_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance tracking per session
CREATE TABLE IF NOT EXISTS public.session_attendance (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES public.class_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  attendance_mode TEXT CHECK (attendance_mode IN ('in-person', 'jitsi', 'discord')),
  joined_at TIMESTAMP WITH TIME ZONE,
  left_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  UNIQUE(session_id, user_id)
);

-- Insert your BEAM Skills courses
INSERT INTO public.courses (
  title, description, long_description, category, price, duration, total_hours,
  instructor, level, featured, location, start_date, end_date, class_time, max_students
) VALUES 
(
  'Intro to Tech for All Ages',
  'Learn the basics of computers, phones, and the internet. Build confidence using email, Zoom, and everyday apps safely.',
  'This comprehensive course is designed for learners of all ages who want to build confidence with modern technology. Whether you''re a senior looking to stay connected with family, a parent wanting to help your children with homework, or anyone who feels left behind by the digital world, this course will give you the skills you need to thrive in today''s connected society.',
  'Technology',
  'Free (unlocked through community donations)',
  '6 weeks (1.5 hrs / session)',
  9,
  'BEAM Skills Volunteer Team',
  'Beginner',
  true,
  'Community Center - Room A',
  '2024-02-15',
  '2024-03-28',
  'Thursdays, 10:00 AM - 11:30 AM',
  15
),
(
  'Intro to Car Maintenance & Repair',
  'Hands-on introduction to car systems, safety checks, and basic repair skills. Includes community service car clinic.',
  'Get hands-on experience with car maintenance and repair in this practical course designed for beginners. Learn essential skills that will save you money and keep your vehicle running safely. The course includes both classroom learning and hands-on practice in our fully equipped auto shop. Plus, you''ll have the opportunity to participate in our community service car clinic, helping others while practicing your new skills.',
  'Transportation',
  'Free (unlocked through community donations)',
  '8 weeks (2 hrs / session)',
  16,
  'BEAM Skills Volunteer Mechanics',
  'Beginner',
  true,
  'Auto Shop - Bay 3',
  '2024-02-16',
  '2024-04-05',
  'Fridays, 2:00 PM - 4:00 PM',
  12
),
(
  'Orchestra Repertoire for Beginners',
  'Learn to play orchestral instruments and perform in a community ensemble. No prior musical experience required.',
  'Join our community orchestra and discover the joy of making music together. This course is designed for complete beginners who want to learn an orchestral instrument. We provide instruments and teach you everything from basic music theory to ensemble playing. By the end of the course, you''ll perform in a community concert.',
  'Arts & Music',
  'Free (unlocked through community donations)',
  '16 weeks (1.5 hrs / session)',
  24,
  'BEAM Skills Music Volunteers',
  'Beginner',
  false,
  'Library - Music Room',
  '2024-02-17',
  '2024-06-08',
  'Saturdays, 1:00 PM - 2:30 PM',
  20
),
(
  'Fabrication & Product Design',
  'Learn how to design and fabricate everyday products using modern tools like 3D printers, CNC machines, and textiles.',
  'Students will explore wearable tech concepts such as hybrid shoes with GPS tracking, custom clothing, and community-use devices. This course emphasizes how to build not just products, but also the tools for production.',
  'Manufacturing',
  'Free (unlocked through community donations)',
  '14 weeks (2.5 hrs / session)',
  35,
  'Product Design Engineer / Fabrication Specialist',
  'Intermediate',
  true,
  'BEAM Innovation Lab',
  '2024-09-20',
  '2024-12-27',
  'Fridays, 6:00 PM - 8:30 PM',
  12
),
(
  'Automotive Design & Fabrication',
  'A hands-on workshop for designing and building new vehicles from the ground up.',
  'Unlike the car maintenance course, this class focuses on innovation: designing lightweight chassis, experimenting with hybrid or electric drivetrains, and fabricating components in-house.',
  'Transportation Innovation',
  'Free (unlocked through community donations)',
  '16 weeks (3 hrs / session)',
  48,
  'Automotive Engineer / Fabrication Expert',
  'Advanced',
  true,
  'BEAM Automotive Workshop',
  '2024-09-21',
  '2025-01-11',
  'Saturdays, 9:00 AM - 12:00 PM',
  10
),
(
  'Juice & Food Manufacturing',
  'Learn how to design and operate small-scale juice and food manufacturing processes.',
  'From sourcing ingredients to packaging and community distribution. Students will gain hands-on experience with food handling equipment, learn about certifications in food safety, and understand the business aspects of community food production.',
  'Manufacturing',
  'Free (unlocked through community donations)',
  '12 weeks (2 hrs / session)',
  24,
  'Food Safety Specialist / Manufacturing Expert',
  'Beginner',
  false,
  'BEAM Food Lab',
  '2024-09-22',
  '2024-12-15',
  'Sundays, 2:00 PM - 4:00 PM',
  15
);

-- Insert course schedules
INSERT INTO public.course_schedule (course_id, week, topic, description) VALUES
-- Tech course schedule
(1, 1, 'Computer Basics & Safety', 'Introduction to computers, basic operations, and internet safety'),
(1, 2, 'Email & Communication', 'Setting up email, sending messages, and using communication apps'),
(1, 3, 'Internet & Search', 'Safe web browsing, search engines, and finding reliable information'),
(1, 4, 'Video Calls & Zoom', 'Making video calls, using Zoom, and staying connected virtually'),
(1, 5, 'Mobile Devices', 'Smartphone basics, apps, and mobile internet safety'),
(1, 6, 'Digital Security', 'Password management, privacy settings, and protecting your information'),

-- Car maintenance course schedule
(2, 1, 'Car Safety & Tools', 'Safety procedures, basic tools, and workshop orientation'),
(2, 2, 'Engine Basics', 'Understanding how engines work and basic engine maintenance'),
(2, 3, 'Oil & Fluids', 'Checking and changing oil, coolant, and other essential fluids'),
(2, 4, 'Brake Systems', 'Brake inspection, maintenance, and basic repairs'),
(2, 5, 'Tires & Wheels', 'Tire safety, rotation, and basic wheel maintenance'),
(2, 6, 'Electrical Systems', 'Battery maintenance, lights, and basic electrical troubleshooting'),
(2, 7, 'Preventive Maintenance', 'Regular maintenance schedules and DIY service tasks'),
(2, 8, 'Community Service Clinic', 'Practice skills by helping others with their vehicles');

-- Insert course requirements and outcomes
INSERT INTO public.course_requirements (course_id, requirement, type) VALUES
-- Tech course requirements
(1, 'No prior computer experience required', 'requirement'),
(1, 'Access to a computer or smartphone (we can help arrange if needed)', 'requirement'),
(1, 'Willingness to learn and ask questions', 'requirement'),
(1, 'Basic reading and writing skills', 'requirement'),

-- Tech course outcomes
(1, 'Confidently use computers and mobile devices', 'outcome'),
(1, 'Send emails and make video calls', 'outcome'),
(1, 'Safely browse the internet', 'outcome'),
(1, 'Use common apps and software', 'outcome'),
(1, 'Protect your personal information online', 'outcome'),

-- Car course requirements
(2, 'No prior automotive experience required', 'requirement'),
(2, 'Comfortable working with tools and getting hands dirty', 'requirement'),
(2, 'Closed-toe shoes and appropriate work clothing', 'requirement'),
(2, 'Basic math and reading skills', 'requirement'),

-- Car course outcomes
(2, 'Perform basic car maintenance and safety checks', 'outcome'),
(2, 'Change oil and other fluids', 'outcome'),
(2, 'Inspect and maintain brake systems', 'outcome'),
(2, 'Rotate tires and perform basic wheel maintenance', 'outcome'),
(2, 'Troubleshoot common car problems', 'outcome'),
(2, 'Understand when to seek professional help', 'outcome');

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Courses: Everyone can view courses
CREATE POLICY "Anyone can view courses" ON public.courses
  FOR SELECT USING (true);

-- Course schedule: Everyone can view
CREATE POLICY "Anyone can view course schedule" ON public.course_schedule
  FOR SELECT USING (true);

-- Course requirements: Everyone can view
CREATE POLICY "Anyone can view course requirements" ON public.course_requirements
  FOR SELECT USING (true);

-- Enrollments: Users can only see their own enrollments
CREATE POLICY "Users can view own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications: Users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Class sessions: Everyone can view
CREATE POLICY "Anyone can view class sessions" ON public.class_sessions
  FOR SELECT USING (true);

-- Session attendance: Users can only see their own attendance
CREATE POLICY "Users can view own session attendance" ON public.session_attendance
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own session attendance" ON public.session_attendance
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to update course enrollment count
CREATE OR REPLACE FUNCTION update_course_enrollment()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.courses 
    SET enrolled_students = enrolled_students + 1 
    WHERE id = NEW.course_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.courses 
    SET enrolled_students = enrolled_students - 1 
    WHERE id = OLD.course_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update enrollment counts
CREATE TRIGGER trigger_update_course_enrollment
  AFTER INSERT OR DELETE ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_course_enrollment();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
