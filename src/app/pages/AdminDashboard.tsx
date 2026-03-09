import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/TopBar';
import type { User as UserType, LeaveRequest } from '../types';
import { mockLeaveRequests, mockAnnouncements, mockStudents } from '../data/mockData';
import { 
  FileText, 
  Users, 
  Megaphone, 
  Clock,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  if (!currentUser) return null;

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(r => 
      r.id === requestId 
        ? { ...r, status: 'approved' as const, reviewedBy: currentUser.name, reviewedDate: new Date().toISOString() }
        : r
    ));
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.map(r => 
      r.id === requestId 
        ? { ...r, status: 'rejected' as const, reviewedBy: currentUser.name, reviewedDate: new Date().toISOString() }
        : r
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6 md:pl-64">
      <BottomNav currentUser={currentUser} />
      <TopBar title="Admin Dashboard" notificationCount={pendingRequests.length} />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Welcome, {currentUser.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">System overview and management tools</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-orange-100 p-2 rounded-xl">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{pendingRequests.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Pending Requests</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{mockStudents.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Students</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-100 p-2 rounded-xl">
                <Megaphone className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{mockAnnouncements.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Announcements</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">98%</span>
            </div>
            <p className="text-sm font-medium text-gray-600">System Status</p>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Pending Requests ({pendingRequests.length})
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {pendingRequests.map((request, index) => (
                <div
                  key={request.id}
                  className={`p-4 ${index !== pendingRequests.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="bg-yellow-100 p-3 rounded-xl">
                            <FileText className="w-5 h-5 text-yellow-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{request.studentName}</h4>
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>Leave Period:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Reason:</strong> {request.reason}
                          </p>
                          <p className="text-xs text-gray-500">
                            Submitted on {new Date(request.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Approved Requests */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Recently Approved ({approvedRequests.length})
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {approvedRequests.length > 0 ? (
                approvedRequests.slice(0, 5).map((request, index) => (
                  <div
                    key={request.id}
                    className={`p-4 ${index !== Math.min(5, approvedRequests.length) - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">{request.studentName}</h4>
                        <p className="text-xs text-gray-600">
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                        {request.reviewedDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Approved on {new Date(request.reviewedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-sm">No approved requests yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Rejected Requests */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Recently Rejected ({rejectedRequests.length})
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {rejectedRequests.length > 0 ? (
                rejectedRequests.slice(0, 5).map((request, index) => (
                  <div
                    key={request.id}
                    className={`p-4 ${index !== Math.min(5, rejectedRequests.length) - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="bg-red-100 p-2 rounded-full">
                          <XCircle className="w-4 h-4 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">{request.studentName}</h4>
                        <p className="text-xs text-gray-600">
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                        {request.reviewedDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Rejected on {new Date(request.reviewedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-sm">No rejected requests yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Sync Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">System Sync Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">ERP System</p>
                  <p className="text-sm text-gray-600">Last synced: 5 minutes ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">LMS System</p>
                  <p className="text-sm text-gray-600">Last synced: 3 minutes ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
