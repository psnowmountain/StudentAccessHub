import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/TopBar';
import type { User as UserType, LeaveRequest } from '../types';
import { mockLeaveRequests } from '../data/mockData';
import { 
  Plus, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Calendar
} from 'lucide-react';

export function RequestsPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
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

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: LeaveRequest = {
      id: `LR${Date.now()}`,
      studentId: currentUser.studentId || 'STU001',
      studentName: currentUser.name,
      startDate,
      endDate,
      reason,
      status: 'pending',
      submittedDate: new Date().toISOString()
    };
    
    setRequests([newRequest, ...requests]);
    setShowRequestModal(false);
    setStartDate('');
    setEndDate('');
    setReason('');
    
    alert('Leave request submitted successfully!');
  };

  // Filter requests based on user role
  const displayRequests = currentUser.role === 'student' 
    ? requests.filter(r => r.studentId === currentUser.studentId)
    : currentUser.role === 'parent'
    ? requests.filter(r => currentUser.linkedStudentIds?.includes(r.studentId))
    : requests; // Admin and teacher see all

  const pendingRequests = displayRequests.filter(r => r.status === 'pending');
  const approvedRequests = displayRequests.filter(r => r.status === 'approved');
  const rejectedRequests = displayRequests.filter(r => r.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6 md:pl-64">
      <BottomNav currentUser={currentUser} />
      <TopBar title="Requests" />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header with Submit Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Leave Requests</h2>
            <p className="text-gray-600 mt-1">Submit and track your leave applications</p>
          </div>
          {currentUser.role === 'student' && (
            <button
              onClick={() => setShowRequestModal(true)}
              className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">Submit Request</span>
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-2 rounded-xl">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{pendingRequests.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Pending</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-2 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{approvedRequests.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Approved</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-2 rounded-xl">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{rejectedRequests.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Rejected</p>
          </div>
        </div>

        {/* All Requests */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">All Requests</h3>
          {displayRequests.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {displayRequests.map((request, index) => (
                <div
                  key={request.id}
                  className={`p-4 ${index !== displayRequests.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      request.status === 'approved' ? 'bg-green-100' :
                      request.status === 'rejected' ? 'bg-red-100' :
                      'bg-yellow-100'
                    }`}>
                      {request.status === 'approved' ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : request.status === 'rejected' ? (
                        <XCircle className="w-6 h-6 text-red-600" />
                      ) : (
                        <Clock className="w-6 h-6 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Leave Request
                            {(currentUser.role === 'admin' || currentUser.role === 'teacher') && (
                              <span className="ml-2 text-sm font-normal text-gray-600">
                                by {request.studentName}
                              </span>
                            )}
                          </h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          request.status === 'approved' ? 'bg-green-100 text-green-700' :
                          request.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Reason:</strong> {request.reason}
                      </p>
                      <p className="text-xs text-gray-500">
                        Submitted on {new Date(request.submittedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      {request.reviewedBy && (
                        <p className="text-xs text-gray-500 mt-1">
                          Reviewed by {request.reviewedBy} on {request.reviewedDate && new Date(request.reviewedDate).toLocaleDateString()}
                        </p>
                      )}
                      {request.reviewNotes && (
                        <p className="text-sm text-gray-700 mt-2 italic">
                          <strong>Notes:</strong> {request.reviewNotes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No leave requests yet</p>
              {currentUser.role === 'student' && (
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit Your First Request
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submit Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Leave Request</h2>
              <form onSubmit={handleSubmitRequest}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason *
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide a reason for your leave request"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Submit Request
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
