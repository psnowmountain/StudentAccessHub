import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/TopBar';
import type { User as UserType } from '../types';
import { 
  mockAcademicRecord, 
  mockFinancialRecord, 
  mockAnnouncements,
  mockNotifications 
} from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import { Link } from 'react-router';

export function StudentDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  if (!currentUser) return null;

  // Get today's schedule
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = mockAcademicRecord.schedule.filter(s => s.day === today);

  // Get upcoming exams (within 7 days)
  const upcomingExams = mockAcademicRecord.exams.filter(exam => {
    const examDate = new Date(exam.date);
    const now = new Date();
    const daysUntil = Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 7;
  });

  // Get pending assignments
  const pendingAssignments = mockAcademicRecord.assignments.filter(a => a.status === 'pending');

  // Get urgent announcements
  const urgentAnnouncements = mockAnnouncements.filter(a => a.isUrgent && !a.read);

  // Calculate alerts count
  const alertsCount = upcomingExams.length + pendingAssignments.filter(a => {
    const dueDate = new Date(a.dueDate);
    const now = new Date();
    const hoursUntil = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntil <= 48 && hoursUntil > 0;
  }).length + urgentAnnouncements.length;

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6 md:pl-64">
      <BottomNav currentUser={currentUser} />
      <TopBar title="Dashboard" notificationCount={unreadNotifications} />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Welcome back, {currentUser.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">Here's what's happening with your academics today</p>
        </div>

        {/* Alerts Section */}
        {alertsCount > 0 && (
          <div className="mb-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-start space-x-3">
              <div className="bg-orange-500 p-2 rounded-full">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  {alertsCount} Item{alertsCount > 1 ? 's' : ''} Requiring Attention
                </h3>
                <div className="space-y-1 text-sm text-gray-700">
                  {upcomingExams.length > 0 && (
                    <p>• {upcomingExams.length} exam{upcomingExams.length > 1 ? 's' : ''} within 7 days</p>
                  )}
                  {pendingAssignments.some(a => {
                    const dueDate = new Date(a.dueDate);
                    const now = new Date();
                    const hoursUntil = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
                    return hoursUntil <= 48 && hoursUntil > 0;
                  }) && (
                    <p>• Assignment{pendingAssignments.length > 1 ? 's' : ''} due within 48 hours</p>
                  )}
                  {urgentAnnouncements.length > 0 && (
                    <p>• {urgentAnnouncements.length} urgent announcement{urgentAnnouncements.length > 1 ? 's' : ''}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Today's Schedule */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3>
            <Link to="/academic" className="text-blue-600 text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          {todaySchedule.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {todaySchedule.map((schedule, index) => (
                <div
                  key={schedule.id}
                  className={`p-4 ${index !== todaySchedule.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{schedule.subject}</h4>
                        <span className="text-sm text-gray-600">
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {schedule.teacher} • {schedule.room}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No classes scheduled for today</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/academic" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(mockAcademicRecord.grades.reduce((acc, g) => acc + (g.score / g.maxScore * 100), 0) / mockAcademicRecord.grades.length)}%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600">Average Grade</p>
          </Link>

          <Link to="/academic" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {mockAcademicRecord.attendance.percentage}%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600">Attendance</p>
          </Link>
        </div>

        {/* Upcoming Exams */}
        {upcomingExams.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Exams</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {upcomingExams.map((exam, index) => {
                const examDate = new Date(exam.date);
                const daysUntil = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div
                    key={exam.id}
                    className={`p-4 ${index !== upcomingExams.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="bg-purple-100 p-3 rounded-xl">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{exam.subject}</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {exam.startTime} - {exam.endTime}
                        </p>
                        <p className="text-sm text-gray-600">{exam.room}</p>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            daysUntil <= 3 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pending Assignments */}
        {pendingAssignments.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Pending Assignments</h3>
              <Link to="/academic" className="text-blue-600 text-sm font-medium hover:underline">
                View All
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {pendingAssignments.slice(0, 3).map((assignment, index) => {
                const dueDate = new Date(assignment.dueDate);
                const hoursUntil = (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60);
                return (
                  <div
                    key={assignment.id}
                    className={`p-4 ${index !== pendingAssignments.slice(0, 3).length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="bg-orange-100 p-3 rounded-xl">
                          <BookOpen className="w-5 h-5 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{assignment.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{assignment.subject}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            hoursUntil <= 24 ? 'bg-red-100 text-red-700' : hoursUntil <= 48 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            Due: {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Announcements */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Announcements</h3>
            <Link to="/announcements" className="text-blue-600 text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {mockAnnouncements.slice(0, 3).map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-white rounded-2xl shadow-sm border ${
                  announcement.isUrgent ? 'border-red-300 bg-red-50' : 'border-gray-200'
                } p-4`}
              >
                <div className="flex items-start space-x-3">
                  {announcement.isUrgent && (
                    <div className="bg-red-500 p-2 rounded-full">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                      {announcement.isUrgent && (
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{announcement.content}</p>
                    <p className="text-xs text-gray-500">
                      {announcement.author} • {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Status Quick View */}
        <Link to="/financial" className="block bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-sm p-6 text-white hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">Fee Status</h3>
              <p className="text-green-100 text-sm mb-3">All payments are up to date</p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Fully Paid</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-xl">
              <p className="text-sm text-green-100 mb-1">Paid Amount</p>
              <p className="text-2xl font-bold">${mockFinancialRecord.paidAmount.toLocaleString()}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
