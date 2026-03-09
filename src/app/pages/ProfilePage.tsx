import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/TopBar';
import type { User as UserType } from '../types';
import { mockStudents } from '../data/mockData';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap,
  Award,
  Settings,
  Bell,
  Shield
} from 'lucide-react';

export function ProfilePage() {
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

  const studentProfile = currentUser.role === 'student' 
    ? mockStudents.find(s => s.id === currentUser.studentId)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6 md:pl-64">
      <BottomNav currentUser={currentUser} />
      <TopBar title="Profile" />

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl md:text-5xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentUser.name}</h2>
              <p className="text-lg text-gray-600 mb-4 capitalize">{currentUser.role}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  <span>{currentUser.email}</span>
                </div>
                {studentProfile && (
                  <>
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-700">
                      <GraduationCap className="w-4 h-4" />
                      <span>Class {studentProfile.class}-{studentProfile.section} • Roll No. {studentProfile.rollNumber}</span>
                    </div>
                    {studentProfile.contactNumber && (
                      <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-700">
                        <Phone className="w-4 h-4" />
                        <span>{studentProfile.contactNumber}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats for Student */}
        {currentUser.role === 'student' && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">88%</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-100 p-2 rounded-xl">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">95%</span>
              </div>
              <p className="text-sm font-medium text-gray-600">Attendance</p>
            </div>
          </div>
        )}

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-700" />
                <h3 className="font-bold text-gray-900">Account Settings</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Edit Profile</p>
                    <p className="text-sm text-gray-600">Update your personal information</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Privacy Settings</p>
                    <p className="text-sm text-gray-600">Manage your data and privacy</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-700" />
                <h3 className="font-bold text-gray-900">Notification Preferences</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Exam Reminders</p>
                    <p className="text-sm text-gray-600">Get notified about upcoming exams</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Assignment Deadlines</p>
                    <p className="text-sm text-gray-600">Get reminded 24 hours before due date</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Urgent Announcements</p>
                    <p className="text-sm text-gray-600">Important school notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Grade Updates</p>
                    <p className="text-sm text-gray-600">New grades and marks posted</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Support & Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-gray-700" />
                <h3 className="font-bold text-gray-900">Support & Information</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Help Center</p>
                    <p className="text-sm text-gray-600">Get help and support</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">About</p>
                    <p className="text-sm text-gray-600">Version 1.0.0</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Terms & Privacy</p>
                    <p className="text-sm text-gray-600">Legal information</p>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-1">Student Access Hub v1.0.0</p>
          <p>© 2026 School Management System</p>
        </div>
      </div>
    </div>
  );
}
