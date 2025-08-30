-- Partner Management Database Schema
-- This file contains all the tables and policies needed for partner institution management

-- Partner institutions table
CREATE TABLE IF NOT EXISTS partner_institutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT NOT NULL,
  website TEXT,
  message TEXT,
  selected_courses TEXT[] NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partner courses table (for approved partnerships)
CREATE TABLE IF NOT EXISTS partner_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES partner_institutions(id) ON DELETE CASCADE,
  course_title TEXT NOT NULL,
  course_description TEXT,
  instructor TEXT,
  max_students INTEGER DEFAULT 20,
  current_students INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  start_date DATE,
  end_date DATE,
  class_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partner events table
CREATE TABLE IF NOT EXISTS partner_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES partner_institutions(id) ON DELETE CASCADE,
  event_title TEXT NOT NULL,
  event_description TEXT,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  max_attendees INTEGER DEFAULT 50,
  current_attendees INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partner students table
CREATE TABLE IF NOT EXISTS partner_students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES partner_institutions(id) ON DELETE CASCADE,
  course_id UUID REFERENCES partner_courses(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped')),
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partner_institutions_user_id ON partner_institutions(user_id);
CREATE INDEX IF NOT EXISTS idx_partner_institutions_status ON partner_institutions(status);
CREATE INDEX IF NOT EXISTS idx_partner_courses_partner_id ON partner_courses(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_events_partner_id ON partner_events(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_students_partner_id ON partner_students(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_students_course_id ON partner_students(course_id);

-- Enable Row Level Security
ALTER TABLE partner_institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_students ENABLE ROW LEVEL SECURITY;

-- RLS Policies for partner_institutions
CREATE POLICY "Users can view their own institution" ON partner_institutions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own institution" ON partner_institutions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own institution" ON partner_institutions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all institutions
CREATE POLICY "Admins can view all institutions" ON partner_institutions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Admins can update all institutions
CREATE POLICY "Admins can update all institutions" ON partner_institutions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for partner_courses
CREATE POLICY "Partners can view their own courses" ON partner_courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partner_institutions 
      WHERE partner_institutions.id = partner_courses.partner_id 
      AND partner_institutions.user_id = auth.uid()
    )
  );

CREATE POLICY "Partners can manage their own courses" ON partner_courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM partner_institutions 
      WHERE partner_institutions.id = partner_courses.partner_id 
      AND partner_institutions.user_id = auth.uid()
    )
  );

-- Admins can view all courses
CREATE POLICY "Admins can view all courses" ON partner_courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for partner_events
CREATE POLICY "Partners can view their own events" ON partner_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partner_institutions 
      WHERE partner_institutions.id = partner_events.partner_id 
      AND partner_institutions.user_id = auth.uid()
    )
  );

CREATE POLICY "Partners can manage their own events" ON partner_events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM partner_institutions 
      WHERE partner_institutions.id = partner_events.pner_id 
      AND partner_events.user_id = auth.uid()
    )
  );

-- RLS Policies for partner_students
CREATE POLICY "Partners can view their own students" ON partner_students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partner_institutions 
      WHERE partner_institutions.id = partner_students.partner_id 
      AND partner_institutions.user_id = auth.uid()
    )
  );

CREATE POLICY "Partners can manage their own students" ON partner_students
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM partner_institutions 
      WHERE partner_institutions.id = partner_students.partner_id 
      AND partner_institutions.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_partner_institutions_updated_at 
  BEFORE UPDATE ON partner_institutions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_courses_updated_at 
  BEFORE UPDATE ON partner_courses 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_events_updated_at 
  BEFORE UPDATE ON partner_events 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_students_updated_at 
  BEFORE UPDATE ON partner_students 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
