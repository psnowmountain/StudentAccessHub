import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/TopBar';
import type { User as UserType } from '../types';
import { mockAcademicRecord } from '../data/mockData';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Users,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export function AcademicPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<'grades' | 'attendance' | 'schedule' | 'assignments' | 'exams'>('grades');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  if (!currentUser) return null;

  const tabs = [
    { id: 'grades' as const, label: 'Grades', icon: BookOpen },
    { id: 'attendance' as const, label: 'Attendance', icon: Users },
    { id: 'schedule' as const, label: 'Schedule', icon: Calendar },
    { id: 'assignments' as const, label: 'Assignments', icon: FileText },
    { id: 'exams' as const, label: 'Exams', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6 md:pl-64">
      <BottomNav currentUser={currentUser} />
      <TopBar title="Academic Information" />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <div>
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-sm p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Overall Performance</h3>
                <div className="flex items-end space-x-6">
                  <div>
                    <p className="text-sm text-blue-100 mb-1">Average Score</p>
                    <p className="text-4xl font-bold">
                      {Math.round(mockAcademicRecord.grades.reduce((acc, g) => acc + (g.score / g.maxScore * 100), 0) / mockAcademicRecord.grades.length)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100 mb-1">Total Exams</p>
                    <p className="text-2xl font-bold">{mockAcademicRecord.grades.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {mockAcademicRecord.grades.map((grade, index) => (
                <div
                  key={grade.id}
                  className={`p-4 ${index !== mockAcademicRecord.grades.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{grade.subject}</h4>
                      <p className="text-sm text-gray-600 mb-2">{grade.examType}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(grade.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      {grade.remarks && (
                        <p className="text-sm text-gray-700 mt-2 italic">{grade.remarks}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                          grade.grade === 'A' ? 'bg-green-100 text-green-700' :
                          grade.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {grade.grade}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {grade.score}/{grade.maxScore}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round((grade.score / grade.maxScore) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div>
            <div className="mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-sm p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Attendance Summary</h3>
                <div className="flex items-end space-x-6">
                  <div>
                    <p className="text-sm text-green-100 mb-1">Attendance Rate</p>
                    <p className="text-4xl font-bold">{mockAcademicRecord.attendance.percentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-100 mb-1">Present</p>
                    <p className="text-2xl font-bold">{mockAcademicRecord.attendance.presentDays} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-100 mb-1">Absent</p>
                    <p className="text-2xl font-bold">{mockAcademicRecord.attendance.absentDays} days</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Attendance</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {mockAcademicRecord.attendance.records.map((record, index) => (
                <div
                  key={index}
                  className={`p-4 ${index !== mockAcademicRecord.attendance.records.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        record.status === 'present' ? 'bg-green-100' :
                        record.status === 'late' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        {record.status === 'present' ? (
                          <CheckCircle className={`w-5 h-5 text-green-600`} />
                        ) : record.status === 'late' ? (
                          <Clock className={`w-5 h-5 text-yellow-600`} />
                        ) : (
                          <XCircle className={`w-5 h-5 text-red-600`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        {record.remarks && (
                          <p className="text-sm text-gray-600">{record.remarks}</p>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      record.status === 'present' ? 'bg-green-100 text-green-700' :
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Schedule</h3>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
              const daySchedule = mockAcademicRecord.schedule.filter(s => s.day === day);
              if (daySchedule.length === 0) return null;
              
              return (
                <div key={day} className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{day}</h4>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {daySchedule.map((schedule, index) => (
                      <div
                        key={schedule.id}
                        className={`p-4 ${index !== daySchedule.length - 1 ? 'border-b border-gray-200' : ''}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 text-center min-w-[80px]">
                            <p className="text-sm font-semibold text-gray-900">{schedule.startTime}</p>
                            <p className="text-xs text-gray-600">to</p>
                            <p className="text-sm font-semibold text-gray-900">{schedule.endTime}</p>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-1">{schedule.subject}</h5>
                            <p className="text-sm text-gray-600">{schedule.teacher}</p>
                            <p className="text-sm text-gray-600">{schedule.room}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Assignments</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {mockAcademicRecord.assignments.map((assignment, index) => {
                const dueDate = new Date(assignment.dueDate);
                const hoursUntil = (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60);
                
                return (
                  <div
                    key={assignment.id}
                    className={`p-4 ${index !== mockAcademicRecord.assignments.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 mb-2">
                          <div className={`p-2 rounded-full ${
                            assignment.status === 'submitted' ? 'bg-green-100' :
                            assignment.status === 'overdue' ? 'bg-red-100' :
                            'bg-orange-100'
                          }`}>
                            <FileText className={`w-5 h-5 ${
                              assignment.status === 'submitted' ? 'text-green-600' :
                              assignment.status === 'overdue' ? 'text-red-600' :
                              'text-orange-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{assignment.title}</h4>
                            <p className="text-sm text-gray-600 mb-1">{assignment.subject}</p>
                            <p className="text-sm text-gray-700">{assignment.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Due: {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'submitted' ? 'bg-green-100 text-green-700' :
                        assignment.status === 'overdue' ? 'bg-red-100 text-red-700' :
                        hoursUntil <= 24 ? 'bg-red-100 text-red-700' :
                        hoursUntil <= 48 ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {assignment.status === 'submitted' ? 'Submitted' :
                         assignment.status === 'overdue' ? 'Overdue' :
                         hoursUntil <= 24 ? 'Due Soon' : 'Pending'}
                      </span>
                    </div>
                    {assignment.submittedDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Submitted on {new Date(assignment.submittedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Exams Tab */}
        {activeTab === 'exams' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Exams</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {mockAcademicRecord.exams.map((exam, index) => {
                const examDate = new Date(exam.date);
                const daysUntil = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div
                    key={exam.id}
                    className={`p-4 ${index !== mockAcademicRecord.exams.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-100 p-3 rounded-xl">
                          <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 text-lg">{exam.subject}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {examDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p><strong>Time:</strong> {exam.startTime} - {exam.endTime}</p>
                            <p><strong>Room:</strong> {exam.room}</p>
                            {exam.syllabus && <p><strong>Syllabus:</strong> {exam.syllabus}</p>}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        daysUntil <= 3 ? 'bg-red-100 text-red-700' :
                        daysUntil <= 7 ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
