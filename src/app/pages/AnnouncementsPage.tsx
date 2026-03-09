import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/TopBar';
import type { User as UserType } from '../types';
import { mockAnnouncements } from '../data/mockData';
import { 
  AlertCircle, 
  Megaphone,
  Filter
} from 'lucide-react';

export function AnnouncementsPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [filter, setFilter] = useState<'all' | 'urgent' | 'read' | 'unread'>('all');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  if (!currentUser) return null;

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    if (filter === 'urgent') return announcement.isUrgent;
    if (filter === 'read') return announcement.read;
    if (filter === 'unread') return !announcement.read;
    return true;
  });

  const urgentCount = mockAnnouncements.filter(a => a.isUrgent && !a.read).length;
  const unreadCount = mockAnnouncements.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6 md:pl-64">
      <BottomNav currentUser={currentUser} />
      <TopBar title="Announcements" notificationCount={unreadCount} />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">School Announcements</h2>
          <p className="text-gray-600">Stay updated with important school information</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-2 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{urgentCount}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Urgent Unread</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Megaphone className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{mockAnnouncements.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Total</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All ({mockAnnouncements.length})
            </button>
            <button
              onClick={() => setFilter('urgent')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                filter === 'urgent'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Urgent ({mockAnnouncements.filter(a => a.isUrgent).length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                filter === 'unread'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
                filter === 'read'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Read ({mockAnnouncements.filter(a => a.read).length})
            </button>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-white rounded-2xl shadow-sm border-2 transition-shadow hover:shadow-md ${
                  announcement.isUrgent 
                    ? 'border-red-300 bg-red-50' 
                    : announcement.read
                    ? 'border-gray-200'
                    : 'border-blue-300'
                } p-6`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    {announcement.isUrgent && (
                      <div className="bg-red-500 p-2 rounded-full flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{announcement.title}</h3>
                        {announcement.isUrgent && (
                          <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                            URGENT
                          </span>
                        )}
                        {!announcement.read && (
                          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        announcement.authorRole === 'teacher' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}>
                        {announcement.author.charAt(0)}
                      </div>
                      <span className="font-medium">{announcement.author}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="capitalize">{announcement.authorRole}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(announcement.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-600">
                {filter === 'urgent' && 'There are no urgent announcements at the moment.'}
                {filter === 'read' && 'You haven\'t read any announcements yet.'}
                {filter === 'unread' && 'You\'ve read all announcements!'}
                {filter === 'all' && 'No announcements available.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
