// Mock data for demonstration purposes
import type { 
  User, 
  Student, 
  AcademicRecord, 
  FinancialRecord, 
  LeaveRequest, 
  Announcement,
  Notification 
} from '../types';

// Mock users for different roles
export const mockUsers: User[] = [
  {
    id: 'student-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@school.edu',
    role: 'student',
    studentId: 'STU001',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
  },
  {
    id: 'parent-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'parent',
    linkedStudentIds: ['STU001'],
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 'teacher-1',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@school.edu',
    role: 'teacher',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    id: 'admin-1',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@school.edu',
    role: 'admin',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
];

export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Alex Johnson',
    email: 'alex.johnson@school.edu',
    class: '10',
    section: 'A',
    rollNumber: '15',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    contactNumber: '+1 234-567-8901'
  },
  {
    id: 'STU002',
    name: 'Emma Davis',
    email: 'emma.davis@school.edu',
    class: '10',
    section: 'A',
    rollNumber: '16',
    profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    contactNumber: '+1 234-567-8902'
  }
];

export const mockAcademicRecord: AcademicRecord = {
  studentId: 'STU001',
  grades: [
    {
      id: 'G1',
      subject: 'Mathematics',
      examType: 'Mid-Term',
      score: 92,
      maxScore: 100,
      grade: 'A',
      date: '2026-02-15',
      remarks: 'Excellent performance'
    },
    {
      id: 'G2',
      subject: 'Physics',
      examType: 'Mid-Term',
      score: 88,
      maxScore: 100,
      grade: 'A',
      date: '2026-02-16'
    },
    {
      id: 'G3',
      subject: 'Chemistry',
      examType: 'Mid-Term',
      score: 85,
      maxScore: 100,
      grade: 'A',
      date: '2026-02-17'
    },
    {
      id: 'G4',
      subject: 'English',
      examType: 'Mid-Term',
      score: 90,
      maxScore: 100,
      grade: 'A',
      date: '2026-02-18'
    },
    {
      id: 'G5',
      subject: 'History',
      examType: 'Mid-Term',
      score: 87,
      maxScore: 100,
      grade: 'A',
      date: '2026-02-19'
    }
  ],
  attendance: {
    percentage: 95,
    totalDays: 120,
    presentDays: 114,
    absentDays: 6,
    records: [
      { date: '2026-03-05', status: 'present' },
      { date: '2026-03-04', status: 'present' },
      { date: '2026-03-03', status: 'absent', remarks: 'Medical leave' },
      { date: '2026-03-02', status: 'present' },
      { date: '2026-03-01', status: 'present' }
    ]
  },
  schedule: [
    {
      id: 'S1',
      day: 'Monday',
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      startTime: '08:00',
      endTime: '09:00',
      room: 'Room 101'
    },
    {
      id: 'S2',
      day: 'Monday',
      subject: 'Physics',
      teacher: 'Dr. Chen',
      startTime: '09:00',
      endTime: '10:00',
      room: 'Lab 201'
    },
    {
      id: 'S3',
      day: 'Monday',
      subject: 'English',
      teacher: 'Ms. Williams',
      startTime: '10:30',
      endTime: '11:30',
      room: 'Room 105'
    },
    {
      id: 'S4',
      day: 'Monday',
      subject: 'Chemistry',
      teacher: 'Dr. Brown',
      startTime: '11:30',
      endTime: '12:30',
      room: 'Lab 202'
    },
    {
      id: 'S5',
      day: 'Tuesday',
      subject: 'History',
      teacher: 'Mr. Anderson',
      startTime: '08:00',
      endTime: '09:00',
      room: 'Room 103'
    },
    {
      id: 'S6',
      day: 'Tuesday',
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      startTime: '09:00',
      endTime: '10:00',
      room: 'Room 101'
    }
  ],
  assignments: [
    {
      id: 'A1',
      subject: 'Mathematics',
      title: 'Chapter 5: Trigonometry Problems',
      description: 'Complete exercises 5.1 to 5.5 from the textbook',
      dueDate: '2026-03-08',
      status: 'pending'
    },
    {
      id: 'A2',
      subject: 'Physics',
      title: 'Lab Report: Newton\'s Laws',
      description: 'Submit lab report with observations and conclusions',
      dueDate: '2026-03-07',
      status: 'pending'
    },
    {
      id: 'A3',
      subject: 'English',
      title: 'Essay: Shakespeare Analysis',
      description: 'Write a 500-word essay analyzing Hamlet',
      dueDate: '2026-03-10',
      status: 'pending'
    },
    {
      id: 'A4',
      subject: 'History',
      title: 'Research Project: World War II',
      description: 'Create a presentation on WWII causes',
      dueDate: '2026-02-28',
      status: 'submitted',
      submittedDate: '2026-02-27'
    }
  ],
  exams: [
    {
      id: 'E1',
      subject: 'Mathematics',
      date: '2026-03-15',
      startTime: '09:00',
      endTime: '12:00',
      room: 'Main Hall',
      syllabus: 'Chapters 1-6'
    },
    {
      id: 'E2',
      subject: 'Physics',
      date: '2026-03-17',
      startTime: '09:00',
      endTime: '12:00',
      room: 'Main Hall',
      syllabus: 'Chapters 1-5'
    },
    {
      id: 'E3',
      subject: 'Chemistry',
      date: '2026-03-19',
      startTime: '09:00',
      endTime: '12:00',
      room: 'Main Hall',
      syllabus: 'Chapters 1-4'
    }
  ]
};

export const mockFinancialRecord: FinancialRecord = {
  studentId: 'STU001',
  feeStatus: 'paid',
  totalFees: 15000,
  paidAmount: 15000,
  pendingAmount: 0,
  paymentHistory: [
    {
      id: 'P1',
      date: '2026-01-05',
      amount: 7500,
      method: 'Bank Transfer',
      receiptNumber: 'RCP001234',
      description: 'Semester 1 Tuition Fee'
    },
    {
      id: 'P2',
      date: '2026-01-10',
      amount: 5000,
      method: 'Credit Card',
      receiptNumber: 'RCP001235',
      description: 'Annual Activity Fee'
    },
    {
      id: 'P3',
      date: '2026-01-15',
      amount: 2500,
      method: 'Bank Transfer',
      receiptNumber: 'RCP001236',
      description: 'Lab Equipment Fee'
    }
  ],
  upcomingDues: [
    {
      id: 'D1',
      description: 'Semester 2 Tuition Fee',
      amount: 7500,
      dueDate: '2026-07-01',
      status: 'upcoming'
    }
  ]
};

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'LR1',
    studentId: 'STU001',
    studentName: 'Alex Johnson',
    startDate: '2026-03-10',
    endDate: '2026-03-12',
    reason: 'Family wedding out of town',
    status: 'approved',
    submittedDate: '2026-03-01',
    reviewedBy: 'Emily Rodriguez',
    reviewedDate: '2026-03-02',
    reviewNotes: 'Approved'
  },
  {
    id: 'LR2',
    studentId: 'STU001',
    studentName: 'Alex Johnson',
    startDate: '2026-02-20',
    endDate: '2026-02-21',
    reason: 'Medical appointment',
    status: 'approved',
    submittedDate: '2026-02-15',
    reviewedBy: 'Emily Rodriguez',
    reviewedDate: '2026-02-16'
  },
  {
    id: 'LR3',
    studentId: 'STU002',
    studentName: 'Emma Davis',
    startDate: '2026-03-08',
    endDate: '2026-03-08',
    reason: 'Fever and cold',
    status: 'pending',
    submittedDate: '2026-03-06'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'AN1',
    title: 'Final Exam Schedule Released',
    content: 'The final examination schedule for this semester has been released. Please check the academic section for detailed timings and rooms.',
    author: 'Dr. Michael Chen',
    authorRole: 'teacher',
    date: '2026-03-05',
    isUrgent: true,
    read: false
  },
  {
    id: 'AN2',
    title: 'Sports Day Registration Open',
    content: 'Annual Sports Day will be held on March 25th. Students interested in participating should register by March 15th through the activities portal.',
    author: 'Emily Rodriguez',
    authorRole: 'admin',
    date: '2026-03-04',
    isUrgent: false,
    read: true
  },
  {
    id: 'AN3',
    title: 'School Closed Tomorrow - Weather Alert',
    content: 'Due to severe weather conditions, the school will remain closed tomorrow (March 7th). All classes and activities are cancelled.',
    author: 'Emily Rodriguez',
    authorRole: 'admin',
    date: '2026-03-06',
    isUrgent: true,
    read: false
  },
  {
    id: 'AN4',
    title: 'Parent-Teacher Meeting',
    content: 'Parent-teacher meetings will be held on March 20th from 9 AM to 4 PM. Parents can schedule appointments through the portal.',
    author: 'Dr. Michael Chen',
    authorRole: 'teacher',
    date: '2026-03-03',
    isUrgent: false,
    read: true
  },
  {
    id: 'AN5',
    title: 'Library New Books Arrival',
    content: 'The library has received new books across various subjects. Students are encouraged to visit and explore the new collection.',
    author: 'Emily Rodriguez',
    authorRole: 'admin',
    date: '2026-03-01',
    isUrgent: false,
    read: true
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'N1',
    type: 'assignment',
    title: 'Assignment Due Tomorrow',
    message: 'Physics Lab Report: Newton\'s Laws is due tomorrow',
    date: '2026-03-06',
    read: false,
    link: '/academic'
  },
  {
    id: 'N2',
    type: 'announcement',
    title: 'Urgent: School Closed Tomorrow',
    message: 'Due to severe weather conditions, school will be closed',
    date: '2026-03-06',
    read: false,
    link: '/announcements'
  },
  {
    id: 'N3',
    type: 'exam',
    title: 'Exam in 9 days',
    message: 'Mathematics exam scheduled for March 15th',
    date: '2026-03-06',
    read: true,
    link: '/academic'
  },
  {
    id: 'N4',
    type: 'leave_status',
    title: 'Leave Request Approved',
    message: 'Your leave request for March 10-12 has been approved',
    date: '2026-03-02',
    read: true,
    link: '/requests'
  }
];
