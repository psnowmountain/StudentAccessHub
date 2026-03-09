import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/TopBar';
import type { User as UserType } from '../types';
import { mockLeaveRequests, mockAnnouncements } from '../data/mockData';
import { 
  Megaphone, 
  FileText, 
  CheckCircle, 
  Clock,
  Plus,
  AlertCircle
} from 'lucide-react';

export function TeacherDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  if (!currentUser) return null;

  const pendingRequests = mockLeaveRequests.filter(r => r.status === 'pending');
  const recentAnnouncements = mockAnnouncements.filter(a => a.authorRole === 'teacher').slice(0, 5);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to backend
    alert(`Announcement posted!\n\nTitle: ${announcementTitle}\nUrgent: ${isUrgent ? 'Yes' : 'No'}`);
    setShowAnnouncementModal(false);
    setAnnouncementTitle('');
    setAnnouncementContent('');
    setIsUrgent(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6 md:pl-64">
      <BottomNav currentUser={currentUser} />
      <TopBar title="Teacher Dashboard" notificationCount={pendingRequests.length} />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Welcome, {currentUser.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">Manage announcements and student requests</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setShowAnnouncementModal(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">Post Announcement</h3>
                <p className="text-blue-100 text-sm">Share updates with students</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/requests')}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Pending Requests</h3>
                <p className="text-gray-600 text-sm">Review student leave requests</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <span className="text-2xl font-bold text-orange-600">{pendingRequests.length}</span>
              </div>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <Megaphone className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{recentAnnouncements.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Announcements Posted</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-100 p-2 rounded-xl">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{mockLeaveRequests.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Requests</p>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pending Requests</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {pendingRequests.map((request, index) => (
                <div
                  key={request.id}
                  className={`p-4 ${index !== pendingRequests.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{request.studentName}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Leave: {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-700 mb-2">Reason: {request.reason}</p>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Announcements */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">My Recent Announcements</h3>
          </div>
          {recentAnnouncements.length > 0 ? (
            <div className="space-y-3">
              {recentAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`bg-white rounded-2xl shadow-sm border ${
                    announcement.isUrgent ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  } p-4`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                    {announcement.isUrgent && (
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                  <p className="text-xs text-gray-500">
                    Posted on {new Date(announcement.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <Megaphone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No announcements posted yet</p>
              <button
                onClick={() => setShowAnnouncementModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Your First Announcement
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Post New Announcement</h2>
              <form onSubmit={handlePostAnnouncement}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter announcement title"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={announcementContent}
                    onChange={(e) => setAnnouncementContent(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter announcement content"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                    />
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Mark as urgent (sends immediate notification)
                      </span>
                    </div>
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Post Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
