// Core data types for Student Access Hub

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  studentId?: string; // For students
  linkedStudentIds?: string[]; // For parents
}

export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  section: string;
  rollNumber: string;
  profilePicture?: string;
  contactNumber?: string;
}

export interface AcademicRecord {
  studentId: string;
  grades: Grade[];
  attendance: Attendance;
  schedule: ClassSchedule[];
  assignments: Assignment[];
  exams: Exam[];
}

export interface Grade {
  id: string;
  subject: string;
  examType: string;
  score: number;
  maxScore: number;
  grade: string;
  date: string;
  remarks?: string;
}

export interface Attendance {
  percentage: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  records: AttendanceRecord[];
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface ClassSchedule {
  id: string;
  day: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'overdue';
  submittedDate?: string;
}

export interface Exam {
  id: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  syllabus?: string;
}

export interface FinancialRecord {
  studentId: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  paymentHistory: Payment[];
  upcomingDues: Due[];
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  receiptNumber: string;
  description: string;
}

export interface Due {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'upcoming' | 'overdue';
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  reviewNotes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'teacher' | 'admin';
  date: string;
  isUrgent: boolean;
  read?: boolean;
}

export interface Notification {
  id: string;
  type: 'exam' | 'grade' | 'assignment' | 'announcement' | 'leave_status';
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}
