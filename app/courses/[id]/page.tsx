'use client'

import Link from 'next/link'
import { BookOpen, Clock, Users, Star, MapPin, Calendar, Heart, ArrowRight, Brain } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: "Intro to Tech for All Ages",
    description: "Learn the basics of computers, phones, and the internet. Build confidence using email, Zoom, and everyday apps safely.",
    longDescription: "This comprehensive course is designed for learners of all ages who want to build confidence with modern technology. Whether you're a senior looking to stay connected with family, a parent wanting to help your children with homework, or anyone who feels left behind by the digital world, this course will give you the skills you need to thrive in today's connected society.",
    category: "Technology",
    price: "Free (unlocked through community donations)",
    duration: "6 weeks (1.5 hrs / session)",
    totalHours: 9,
    students: 0,
    rating: 4.9,
    instructor: "BEAM Skills Volunteer Team",
    level: "Beginner",
    featured: true,
    schedule: [
      { week: 1, topic: "Computer Basics & Safety", description: "Introduction to computers, basic operations, and internet safety" },
      { week: 2, topic: "Email & Communication", description: "Setting up email, sending messages, and using communication apps" },
      { week: 3, topic: "Internet & Search", description: "Safe web browsing, search engines, and finding reliable information" },
      { week: 4, topic: "Video Calls & Zoom", description: "Making video calls, using Zoom, and staying connected virtually" },
      { week: 5, topic: "Mobile Devices", description: "Smartphone basics, apps, and mobile internet safety" },
      { week: 6, topic: "Digital Security", description: "Password management, privacy settings, and protecting your information" }
    ],
    requirements: [
      "No prior computer experience required",
      "Access to a computer or smartphone (we can help arrange if needed)",
      "Willingness to learn and ask questions",
      "Basic reading and writing skills"
    ],
    outcomes: [
      "Confidently use computers and mobile devices",
      "Send emails and make video calls",
      "Safely browse the internet",
      "Use common apps and software",
      "Protect your personal information online"
    ],
    location: "Community Center - Room A",
    startDate: "February 15, 2024",
    endDate: "March 28, 2024",
    classTime: "Thursdays, 10:00 AM - 11:30 AM"
  },
  {
    id: 2,
    title: "Intro to Car Maintenance & Repair",
    description: "Hands-on introduction to car systems, safety checks, and basic repair skills. Includes community service car clinic.",
    longDescription: "Get hands-on experience with car maintenance and repair in this practical course designed for beginners. Learn essential skills that will save you money and keep your vehicle running safely. The course includes both classroom learning and hands-on practice in our fully equipped auto shop. Plus, you'll have the opportunity to participate in our community service car clinic, helping others while practicing your new skills.",
    category: "Transportation",
    price: "Free (unlocked through community donations)",
    duration: "8 weeks (2 hrs / session)",
    totalHours: 16,
    students: 0,
    rating: 4.8,
    instructor: "BEAM Skills Volunteer Mechanics",
    level: "Beginner",
    featured: true,
    schedule: [
      { week: 1, topic: "Car Safety & Tools", description: "Safety procedures, basic tools, and workshop orientation" },
      { week: 2, topic: "Engine Basics", description: "Understanding how engines work and basic engine maintenance" },
      { week: 3, topic: "Oil & Fluids", description: "Checking and changing oil, coolant, and other essential fluids" },
      { week: 4, topic: "Brake Systems", description: "Brake inspection, maintenance, and basic repairs" },
      { week: 5, topic: "Tires & Wheels", description: "Tire safety, rotation, and basic wheel maintenance" },
      { week: 6, topic: "Electrical Systems", description: "Battery maintenance, lights, and basic electrical troubleshooting" },
      { week: 7, topic: "Preventive Maintenance", description: "Regular maintenance schedules and DIY service tasks" },
      { week: 8, topic: "Community Service Clinic", description: "Practice skills by helping others with their vehicles" }
    ],
    requirements: [
      "No prior automotive experience required",
      "Comfortable working with tools and getting hands dirty",
      "Closed-toe shoes and appropriate work clothing",
      "Basic math and reading skills"
    ],
    outcomes: [
      "Perform basic car maintenance and safety checks",
      "Change oil and other fluids",
      "Inspect and maintain brake systems",
      "Rotate tires and perform basic wheel maintenance",
      "Troubleshoot common car problems",
      "Understand when to seek professional help"
    ],
    location: "Auto Shop - Bay 3",
    startDate: "February 16, 2024",
    endDate: "April 5, 2024",
    classTime: "Fridays, 2:00 PM - 4:00 PM"
  },
  {
    id: 3,
    title: "Orchestra Repertoire for Beginners",
    description: "A welcoming introduction to orchestral music for beginners. Learn how to explore, prepare, and perform standard orchestra repertoire. Students will be guided through essential resources, performance history, technical lessons, and rehearsal prep skills to build a solid foundation in orchestral playing.",
    longDescription: "Discover the joy of orchestral music in this welcoming course designed for beginners. Whether you're a complete newcomer to classical music or have some musical background, you'll learn how to explore, prepare, and appreciate standard orchestra repertoire. Our experienced music volunteers will guide you through essential resources, performance history, technical lessons, and rehearsal preparation skills to build a solid foundation in orchestral playing.",
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    duration: "16 weeks (1.5 hrs / session)",
    totalHours: 24,
    students: 0,
    rating: 4.7,
    instructor: "BEAM Skills Music Volunteers",
    level: "Beginner",
    featured: true,
    schedule: [
      { week: 1, topic: "Introduction to Orchestra", description: "What is an orchestra, different sections, and basic terminology" },
      { week: 2, topic: "Finding & Reading Scores", description: "How to locate and understand orchestral sheet music" },
      { week: 3, topic: "Performance History", description: "Major orchestral works and their cultural significance" },
      { week: 4, topic: "String Family Basics", description: "Violin, viola, cello, and double bass fundamentals" },
      { week: 5, topic: "Woodwind Family", description: "Flute, clarinet, oboe, and bassoon basics" },
      { week: 6, topic: "Brass Family", description: "Trumpet, trombone, French horn, and tuba fundamentals" },
      { week: 7, topic: "Percussion Section", description: "Drums, cymbals, and other percussion instruments" },
      { week: 8, topic: "Rehearsal Techniques", description: "How to prepare for and participate in ensemble rehearsals" },
      { week: 9, topic: "Score Analysis", description: "Understanding musical structure and conductor cues" },
      { week: 10, topic: "Performance Preparation", description: "Mental and physical preparation for performances" },
      { week: 11, topic: "Ensemble Skills", description: "Playing together, listening, and blending with other musicians" },
      { week: 12, topic: "Classical Period", description: "Haydn, Mozart, and early orchestral music" },
      { week: 13, topic: "Romantic Period", description: "Beethoven, Brahms, and 19th century orchestral works" },
      { week: 14, topic: "Modern Era", description: "20th and 21st century orchestral compositions" },
      { week: 15, topic: "Performance Practice", description: "Historical performance techniques and modern interpretations" },
      { week: 16, topic: "Final Performance", description: "Showcase your learning in a group performance" }
    ],
    requirements: [
      "No prior orchestral experience required",
      "Basic reading skills (musical notation helpful but not required)",
      "Interest in classical and orchestral music",
      "Willingness to participate in group activities",
      "Bring your instrument if you have one (we can help arrange if needed)"
    ],
    outcomes: [
      "Understand orchestral music structure and history",
      "Read and interpret orchestral scores",
      "Recognize different instrument families and their roles",
      "Prepare for and participate in ensemble rehearsals",
      "Appreciate classical music from different periods",
      "Build confidence as a new orchestral musician"
    ],
    location: "Library - Music Room",
    startDate: "February 17, 2024",
    endDate: "June 8, 2024",
    classTime: "Sundays, 1:00 PM - 2:30 PM"
  },
  {
    id: 4,
    title: "Planting & Houseplants: Community Green Skills",
    description: "Learn plant care, propagation, and community gardening. Create mini community garden projects and care for at least 3 plants.",
    longDescription: "Transform your space and community through the power of plants! This hands-on course teaches you everything from basic plant care to advanced propagation techniques. Whether you have a sunny windowsill or access to community garden plots, you'll learn how to grow thriving plants and contribute to local green spaces. The course emphasizes sustainable practices, community sharing, and creating lasting environmental impact.",
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    duration: "8 weeks (1.5 hrs / session)",
    totalHours: 12,
    students: 0,
    rating: 4.6,
    instructor: "Local Practitioner / Beginner-friendly Mentor",
    level: "Beginner",
    featured: false,
    schedule: [
      { week: 1, topic: "Plant Fundamentals", description: "Understanding plants: indoor vs outdoor, sunlight, watering schedules" },
      { week: 2, topic: "Soil & Growing Mediums", description: "Soil prep, pots, fertilizers, composting basics" },
      { week: 3, topic: "Propagation Methods", description: "Cuttings, seeds, layering, and division techniques" },
      { week: 4, topic: "Seasonal Plant Selection", description: "Low-maintenance species and seasonal considerations" },
      { week: 5, topic: "Community Gardening", description: "How to grow food/flowers to distribute locally" },
      { week: 6, topic: "Sustainable Practices", description: "Water conservation, organic methods, and eco-friendly growing" },
      { week: 7, topic: "Project Planning", description: "Design and plan your mini community garden project" },
      { week: 8, topic: "Project Implementation", description: "Execute your garden project and share with community" }
    ],
    requirements: [
      "No prior gardening experience required",
      "Access to growing space (windowsill, balcony, backyard, or community plot)",
      "Basic tools (we can help arrange if needed)",
      "Willingness to get hands dirty and care for plants regularly"
    ],
    outcomes: [
      "Successfully care for at least 3 different types of plants",
      "Understand plant needs and growing requirements",
      "Master basic propagation techniques",
      "Create and maintain a mini community garden project",
      "Share knowledge and plants with neighbors",
      "Contribute to local green spaces and sustainability"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 10, 2024",
    endDate: "November 5, 2024",
    classTime: "Tuesdays, 6:00 PM - 7:30 PM"
  },
  {
    id: 5,
    title: "Emergency & Proactive Health Skills",
    description: "Learn CPR, first aid, home remedies, and preventive care. Practice emergency response skills and basic medical procedures.",
    longDescription: "Be prepared for life's emergencies and take control of your health! This comprehensive course covers essential emergency response skills, preventive healthcare, and practical home remedies. You'll learn life-saving techniques like CPR and bleeding control, plus gain confidence in managing common health issues at home. The course emphasizes both emergency preparedness and proactive wellness monitoring.",
    category: "Health & Wellness",
    price: "Free (unlocked through community donations)",
    duration: "10 weeks (2 hrs / session)",
    totalHours: 20,
    students: 0,
    rating: 4.8,
    instructor: "Certified Healthcare Professional",
    level: "Beginner",
    featured: false,
    schedule: [
      { week: 1, topic: "Emergency Response Basics", description: "CPR, bleeding control, and bone setting fundamentals" },
      { week: 2, topic: "First Aid Essentials", description: "Home first aid kits, wound care, and injury management" },
      { week: 3, topic: "Poison Management", description: "Identifying and responding to poisoning emergencies" },
      { week: 4, topic: "Home Remedies", description: "Natural inflammation reduction and common ailment treatments" },
      { week: 5, topic: "Medication Basics", description: "Understanding medications and low-cost alternatives (as allowed by law)" },
      { week: 6, topic: "Preventive Care", description: "Wellness monitoring and health maintenance strategies" },
      { week: 7, topic: "Emergency Planning", description: "Creating emergency response plans for your household" },
      { week: 8, topic: "Community Health Networks", description: "Building neighborhood health support systems" },
      { week: 9, topic: "Skill Practice", description: "Hands-on practice of emergency response techniques" },
      { week: 10, topic: "Final Assessment", description: "Demonstrate emergency response skills and medical procedures" }
    ],
    requirements: [
      "No prior healthcare experience required",
      "Comfortable with hands-on practice and physical activity",
      "Willingness to learn emergency response procedures",
      "Basic reading and comprehension skills"
    ],
    outcomes: [
      "Perform CPR and basic life support techniques",
      "Control bleeding and manage common injuries",
      "Recognize and respond to poisoning emergencies",
      "Create and maintain home first aid kits",
      "Understand preventive healthcare strategies",
      "Build community health support networks"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 11, 2024",
    endDate: "November 13, 2024",
    classTime: "Wednesdays, 6:00 PM - 8:00 PM"
  },
  {
    id: 6,
    title: "Audio Recording & Production",
    description: "Master audio gear, recording setups, mixing, and mastering. Complete a full recording project with professional guidance.",
    longDescription: "Turn your passion for sound into professional-quality recordings! This comprehensive course covers everything from basic audio equipment to advanced mixing and mastering techniques. You'll learn in professional recording environments and work on real projects, gaining hands-on experience with industry-standard gear and software. Whether you're interested in music, podcasts, or sound design, this course provides the foundation for professional audio work.",
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    duration: "12 weeks (2 hrs / session)",
    totalHours: 24,
    students: 0,
    rating: 4.5,
    instructor: "Audio Engineer / Advanced Musician",
    level: "Intermediate",
    featured: false,
    schedule: [
      { week: 1, topic: "Audio Fundamentals", description: "Audio gear & electrical basics (mics, preamps, mixing boards)" },
      { week: 2, topic: "Recording Setups", description: "Solo, ensemble, and live venue recording configurations" },
      { week: 3, topic: "Microphone Techniques", description: "Microphone placement, selection, and acoustic considerations" },
      { week: 4, topic: "Signal Processing", description: "Compression, EQ, and basic audio effects" },
      { week: 5, topic: "Digital Audio Workstations", description: "Introduction to DAW software and workflow" },
      { week: 6, topic: "Recording Projects", description: "Begin recording your first project" },
      { week: 7, topic: "Editing Techniques", description: "Audio editing, comping, and arrangement" },
      { week: 8, topic: "Mixing Fundamentals", description: "Balance, panning, and spatial arrangement" },
      { week: 9, topic: "Advanced Mixing", description: "Dynamic processing, effects, and automation" },
      { week: 10, topic: "Mastering Basics", description: "Final processing and preparation for distribution" },
      { week: 11, topic: "Project Completion", description: "Finish mixing and mastering your recording project" },
      { week: 12, topic: "Project Showcase", description: "Present your completed recording project" }
    ],
    requirements: [
      "Basic computer skills and familiarity with audio concepts",
      "Access to recording equipment (provided in class)",
      "Willingness to work with technical equipment",
      "Interest in audio production and sound quality"
    ],
    outcomes: [
      "Set up and operate professional recording equipment",
      "Record high-quality audio in various environments",
      "Mix and master audio projects to professional standards",
      "Complete a full recording project from start to finish",
      "Understand industry-standard audio production workflows",
      "Prepare audio for various distribution formats"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 12, 2024",
    endDate: "December 5, 2024",
    classTime: "Thursdays, 6:00 PM - 8:00 PM"
  },
  {
    id: 7,
    title: "Band Instruments – Multi-Genre Training",
    description: "Learn strings, brass, percussion, and woodwinds across jazz, classical, and contemporary genres. Perform in ensemble showcases.",
    longDescription: "Master multiple instruments and genres in this comprehensive band training program! Whether you're a complete beginner or have some musical experience, you'll learn the fundamentals of various instrument families while exploring diverse musical styles. The course emphasizes ensemble playing, improvisation, and performance skills, preparing you for community music programs and local performances.",
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    duration: "14 weeks (1.5 hrs / session)",
    totalHours: 21,
    students: 0,
    rating: 4.7,
    instructor: "Experienced Musician / Mentor",
    level: "Beginner",
    featured: false,
    schedule: [
      { week: 1, topic: "Instrument Introduction", description: "Overview of strings, brass, percussion, and woodwinds" },
      { week: 2, topic: "String Family Basics", description: "Violin, viola, cello, and bass fundamentals" },
      { week: 3, topic: "Brass Family Basics", description: "Trumpet, trombone, French horn, and tuba fundamentals" },
      { week: 4, topic: "Woodwind Family", description: "Flute, clarinet, oboe, and bassoon basics" },
      { week: 5, topic: "Percussion Section", description: "Drums, cymbals, and auxiliary percussion" },
      { week: 6, topic: "Classical Techniques", description: "Classical playing styles and repertoire" },
      { week: 7, topic: "Jazz Fundamentals", description: "Jazz theory, improvisation, and swing feel" },
      { week: 8, topic: "Contemporary Styles", description: "Rock, pop, and modern ensemble playing" },
      { week: 9, topic: "Funk & Groove", description: "Rhythm section playing and groove development" },
      { week: 10, topic: "Ensemble Coordination", description: "Playing together, listening, and blending" },
      { week: 11, topic: "Improvisation Skills", description: "Solo development and creative expression" },
      { week: 12, topic: "Sight Reading", description: "Reading music notation and rhythm exercises" },
      { week: 13, topic: "Performance Preparation", description: "Rehearsal techniques and stage presence" },
      { week: 14, topic: "Final Showcase", description: "Perform in small ensemble or community showcase" }
    ],
    requirements: [
      "No prior musical experience required",
      "Access to instruments (we can help arrange if needed)",
      "Willingness to practice regularly",
      "Interest in multiple musical genres and instruments"
    ],
    outcomes: [
      "Play basic melodies on multiple instrument families",
      "Understand different musical genres and styles",
      "Participate in ensemble playing and coordination",
      "Develop basic improvisation skills",
      "Read and interpret musical notation",
      "Perform confidently in public settings"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 13, 2024",
    endDate: "December 20, 2024",
    classTime: "Fridays, 6:00 PM - 7:30 PM"
  },
  {
    id: 8,
    title: "Voice Training – Multi-Genre",
    description: "Master breath control, pitch, tone, and diction across classical, jazz, and contemporary styles. Perform in public showcases.",
    longDescription: "Discover the full potential of your voice through comprehensive training across multiple genres! This course builds a solid foundation in vocal technique while exploring classical, jazz, and contemporary singing styles. You'll develop proper breathing, pitch control, and performance skills through individual and ensemble practice. The course culminates in public performances that showcase your vocal development.",
    category: "Arts & Music",
    price: "Free (unlocked through community donations)",
    duration: "12 weeks (1.5 hrs / session)",
    totalHours: 18,
    students: 0,
    rating: 4.6,
    instructor: "Vocal Coach / Mentor",
    level: "Beginner",
    featured: false,
    schedule: [
      { week: 1, topic: "Vocal Fundamentals", description: "Breath control, posture, and vocal anatomy" },
      { week: 2, topic: "Pitch & Tone", description: "Developing accurate pitch and beautiful tone quality" },
      { week: 3, topic: "Diction & Articulation", description: "Clear pronunciation and vocal clarity" },
      { week: 4, topic: "Classical Technique", description: "Classical singing styles and repertoire" },
      { week: 5, topic: "Jazz Vocal Style", description: "Jazz phrasing, scat singing, and swing feel" },
      { week: 6, topic: "Contemporary Pop", description: "Modern pop vocal techniques and styles" },
      { week: 7, topic: "Ensemble Singing", description: "Harmony, blending, and group vocal work" },
      { week: 8, topic: "Performance Skills", description: "Stage presence, microphone technique, and audience connection" },
      { week: 9, topic: "Recording Techniques", description: "Studio singing and recording best practices" },
      { week: 10, topic: "Song Interpretation", description: "Expressing emotion and telling stories through song" },
      { week: 11, topic: "Performance Preparation", description: "Rehearsal techniques and mental preparation" },
      { week: 12, topic: "Final Showcase", description: "Public or recorded performance demonstrating vocal development" }
    ],
    requirements: [
      "No prior vocal training required",
      "Willingness to practice vocal exercises regularly",
      "Comfort with singing in front of others",
      "Interest in multiple musical genres"
    ],
    outcomes: [
      "Master proper breathing and vocal technique",
      "Sing with accurate pitch and beautiful tone",
      "Perform confidently in classical, jazz, and contemporary styles",
      "Participate in ensemble singing and harmony",
      "Develop strong performance and recording skills",
      "Build confidence as a vocal performer"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 14, 2024",
    endDate: "December 7, 2024",
    classTime: "Saturdays, 10:00 AM - 11:30 AM"
  },
  {
    id: 9,
    title: "Community Beautification & Design",
    description: "Learn urban aesthetics, public space design, and DIY skills. Complete small-scale public beautification projects.",
    longDescription: "Transform your community through creative design and beautification! This hands-on course teaches you how to enhance public spaces through thoughtful design, artistic expression, and community collaboration. You'll learn practical skills like painting, landscaping, and mural creation while developing an understanding of urban aesthetics and community engagement. Leave a lasting visible impact on your neighborhood!",
    category: "Community Skills",
    price: "Free (unlocked through community donations)",
    duration: "10 weeks (2 hrs / session)",
    totalHours: 20,
    students: 0,
    rating: 4.5,
    instructor: "Local Designer / Advanced Participant",
    level: "Beginner",
    featured: false,
    schedule: [
      { week: 1, topic: "Urban Aesthetics", description: "Color theory, signage, and visual design principles" },
      { week: 2, topic: "Public Space Analysis", description: "Assessing community spaces and identifying improvement opportunities" },
      { week: 3, topic: "Design Fundamentals", description: "Layout, composition, and design thinking for public spaces" },
      { week: 4, topic: "Mural Planning", description: "Designing murals and public art installations" },
      { week: 5, topic: "Landscaping Basics", description: "Plant selection, garden design, and maintenance" },
      { week: 6, topic: "DIY Skills", description: "Painting, tiling, and basic construction techniques" },
      { week: 7, topic: "Community Engagement", description: "Collaborating with neighbors and local organizations" },
      { week: 8, topic: "Project Planning", description: "Designing your beautification project" },
      { week: 9, topic: "Project Implementation", description: "Executing your beautification project" },
      { week: 10, topic: "Project Completion", description: "Finishing touches and community celebration" }
    ],
    requirements: [
      "No prior design or construction experience required",
      "Willingness to work outdoors and get hands dirty",
      "Access to basic tools (we can help arrange if needed)",
      "Interest in community improvement and visual arts"
    ],
    outcomes: [
      "Understand urban design principles and aesthetics",
      "Create and execute public beautification projects",
      "Master basic DIY skills for community projects",
      "Collaborate effectively with community members",
      "Leave lasting visible impact on public spaces",
      "Build community pride and engagement"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 15, 2024",
    endDate: "November 17, 2024",
    classTime: "Sundays, 2:00 PM - 4:00 PM"
  },
  {
    id: 10,
    title: "Entrepreneurship & Business Building",
    description: "Master business planning, marketing, and scaling strategies. Create and present business plans to mentor panels.",
    longDescription: "Turn your ideas into successful businesses! This comprehensive course covers everything from initial concept development to business scaling and investor pitching. You'll learn practical business skills while working on real business plans with guidance from experienced entrepreneurs. The course emphasizes hands-on learning, market research, and practical application of business principles.",
    category: "Business & Finance",
    price: "Free (unlocked through community donations)",
    duration: "12 weeks (2 hrs / session)",
    totalHours: 24,
    students: 0,
    rating: 4.7,
    instructor: "Experienced Entrepreneur / Business Mentor",
    level: "Intermediate",
    featured: false,
    schedule: [
      { week: 1, topic: "Business Fundamentals", description: "Business planning, market research, and competitive analysis" },
      { week: 2, topic: "Market Research", description: "Understanding your market, customers, and competition" },
      { week: 3, topic: "Business Models", description: "Different business models and revenue strategies" },
      { week: 4, topic: "Startup Essentials", description: "Business registration, legal structure, and compliance" },
      { week: 5, topic: "Financial Planning", description: "Bookkeeping, budgeting, and financial projections" },
      { week: 6, topic: "Marketing Strategy", description: "Brand identity, social media, and customer acquisition" },
      { week: 7, topic: "Sales & Customer Service", description: "Building customer relationships and sales processes" },
      { week: 8, topic: "Operations & Systems", description: "Building efficient business processes and workflows" },
      { week: 9, topic: "Scaling Strategies", description: "Growth planning and hiring for small businesses" },
      { week: 10, topic: "Funding & Investment", description: "Pitching to investors and securing funding" },
      { week: 11, topic: "Business Plan Development", description: "Creating comprehensive business plans" },
      { week: 12, topic: "Final Presentations", description: "Present business plans to mentor panels and peers" }
    ],
    requirements: [
      "Basic business and computer skills",
      "Business idea or concept to develop",
      "Willingness to conduct market research",
      "Interest in entrepreneurship and business development"
    ],
    outcomes: [
      "Develop comprehensive business plans",
      "Conduct effective market research and analysis",
      "Create marketing and branding strategies",
      "Understand financial planning and management",
      "Master investor pitching and funding strategies",
      "Build scalable business operations"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 16, 2024",
    endDate: "December 9, 2024",
    classTime: "Mondays, 6:00 PM - 8:00 PM"
  },
  {
    id: 11,
    title: "Commercial Real Estate Acquisition & Development",
    description: "Learn commercial real estate fundamentals, investment strategies, and construction management. Analyze real properties.",
    longDescription: "Master the complex world of commercial real estate! This advanced course covers everything from property acquisition to development and construction management. You'll learn investment strategies, market analysis, and the legal framework for real estate development. The course includes hands-on property analysis and development planning, preparing you for real-world real estate projects.",
    category: "Real Estate",
    price: "Free (unlocked through community donations)",
    duration: "14 weeks (2.5 hrs / session)",
    totalHours: 35,
    students: 0,
    rating: 4.8,
    instructor: "Real Estate Developer / Finance Mentor",
    level: "Advanced",
    featured: false,
    schedule: [
      { week: 1, topic: "Commercial Real Estate Fundamentals", description: "Property types, market dynamics, and investment basics" },
      { week: 2, topic: "Market Analysis", description: "Understanding local markets, trends, and property valuation" },
      { week: 3, topic: "Investment Strategies", description: "REITs, EB-5, syndication, and direct investment" },
      { week: 4, topic: "Site Selection", description: "Criteria for choosing development sites and locations" },
      { week: 5, topic: "Property Acquisition", description: "Due diligence, negotiation, and closing processes" },
      { week: 6, topic: "Financing Options", description: "Commercial loans, private equity, and funding sources" },
      { week: 7, topic: "Legal Framework", description: "Zoning, permits, and regulatory compliance" },
      { week: 8, topic: "Construction Planning", description: "Project planning, budgeting, and timeline development" },
      { week: 9, topic: "Contractor Management", description: "Selecting and managing construction contractors" },
      { week: 10, topic: "Construction Oversight", description: "Quality control, inspections, and project management" },
      { week: 11, topic: "Budget Management", description: "Cost control, change orders, and financial oversight" },
      { week: 12, topic: "Project Completion", description: "Final inspections, punch lists, and project handover" },
      { week: 13, topic: "Property Management", description: "Ongoing management and maintenance strategies" },
      { week: 14, topic: "Final Project", description: "Analyze property and produce real-world development plan" }
    ],
    requirements: [
      "Basic understanding of business and finance concepts",
      "Interest in real estate development and investment",
      "Willingness to conduct detailed property analysis",
      "Basic computer skills for research and planning"
    ],
    outcomes: [
      "Understand commercial real estate markets and investment",
      "Conduct comprehensive property analysis and due diligence",
      "Develop and execute real estate development plans",
      "Manage construction projects and contractor relationships",
      "Navigate legal and regulatory requirements",
      "Create profitable real estate investment strategies"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 17, 2024",
    endDate: "December 24, 2024",
    classTime: "Tuesdays, 6:00 PM - 8:30 PM"
  },
  {
    id: 12,
    title: "Cryptocurrency & Digital Finance",
    description: "Master crypto fundamentals, blockchain technology, and DeFi basics. Complete wallet creation and trading simulations.",
    longDescription: "Navigate the future of finance with confidence! This comprehensive course covers cryptocurrency fundamentals, blockchain technology, and decentralized finance. You'll learn how to safely store, trade, and invest in digital assets while understanding the underlying technology. The course emphasizes security, risk management, and practical application through hands-on projects and simulations.",
    category: "Digital Finance",
    price: "Free (unlocked through community donations)",
    duration: "10 weeks (2 hrs / session)",
    totalHours: 20,
    students: 0,
    rating: 4.6,
    instructor: "Crypto Professional / Fintech Mentor",
    level: "Intermediate",
    featured: false,
    schedule: [
      { week: 1, topic: "Cryptocurrency Fundamentals", description: "Bitcoin, Ethereum, altcoins, and digital asset basics" },
      { week: 2, topic: "Blockchain Technology", description: "How blockchain works, consensus mechanisms, and security" },
      { week: 3, topic: "Digital Wallets", description: "Wallet types, key management, and safe storage practices" },
      { week: 4, topic: "Trading Basics", description: "Exchanges, buying/selling, and understanding market trends" },
      { week: 5, topic: "Smart Contracts", description: "Ethereum smart contracts and DeFi applications" },
      { week: 6, topic: "DeFi & NFTs", description: "Decentralized finance and non-fungible tokens" },
      { week: 7, topic: "Security & Risk Management", description: "Avoiding scams, safeguarding assets, and risk assessment" },
      { week: 8, topic: "Regulatory Landscape", description: "Legal considerations and compliance requirements" },
      { week: 9, topic: "Practical Projects", description: "Wallet creation, trading simulation, and smart contract demo" },
      { week: 10, topic: "Future of Finance", description: "Emerging trends and career opportunities in digital finance" }
    ],
    requirements: [
      "Basic computer and internet skills",
      "Understanding of basic financial concepts",
      "Willingness to learn new technology and concepts",
      "Interest in digital finance and emerging technologies"
    ],
    outcomes: [
      "Understand cryptocurrency and blockchain fundamentals",
      "Safely create and manage digital wallets",
      "Navigate cryptocurrency exchanges and trading platforms",
      "Understand DeFi protocols and smart contracts",
      "Implement security best practices for digital assets",
      "Complete practical projects demonstrating crypto skills"
    ],
    location: "Cleveland Ave Library",
    startDate: "September 18, 2024",
    endDate: "November 20, 2024",
    classTime: "Wednesdays, 6:00 PM - 8:00 PM"
  }
]

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === parseInt(params.id))
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link href="/courses" className="btn-primary">
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
              {course.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{course.title}</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            {course.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Course Overview */}
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {course.longDescription}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{course.totalHours}</div>
                  <div className="text-sm text-gray-600">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{course.duration.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600">Weeks</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{course.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{course.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Course Schedule */}
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Schedule</h2>
              <div className="space-y-4">
                {course.schedule.map((week) => (
                  <div key={week.week} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {week.week}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{week.topic}</h4>
                      <p className="text-gray-600">{week.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Need</h3>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  {course.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sticky top-24 space-y-8 self-start">
            {/* Enrollment Card */}
            <div className="card">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">{course.price}</div>
                <p className="text-gray-600">Community funded program</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.startDate} - {course.endDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{course.classTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 text-primary-600 mr-3" />
                  <span>Instructor: {course.instructor}</span>
                </div>
              </div>
              
              <Link href={`/enroll/${course.id}`} className="btn-primary w-full text-center text-lg py-4">
                Enroll Now
              </Link>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                Limited spots available • First come, first served
              </p>
            </div>

            {/* Instructor Info */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Instructor</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{course.instructor}</div>
                  <div className="text-sm text-gray-600">Volunteer Team</div>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                Our volunteer instructors are experienced professionals passionate about sharing their knowledge and helping others succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
