import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/TopBar';
import type { User as UserType } from '../types';
import { mockFinancialRecord } from '../data/mockData';
import { 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Receipt
} from 'lucide-react';

export function FinancialPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-6 md:pl-64">
      <BottomNav currentUser={currentUser} />
      <TopBar title="Financial Information" />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Fee Status Overview */}
        <div className="mb-6">
          <div className={`rounded-2xl shadow-sm p-6 ${
            mockFinancialRecord.feeStatus === 'paid' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : mockFinancialRecord.feeStatus === 'pending'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
              : 'bg-gradient-to-r from-red-500 to-orange-500'
          } text-white`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Fee Status</h3>
                <div className="flex items-center space-x-2">
                  {mockFinancialRecord.feeStatus === 'paid' ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-xl font-bold">Fully Paid</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-6 h-6" />
                      <span className="text-xl font-bold capitalize">{mockFinancialRecord.feeStatus}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="text-sm opacity-90 mb-1">Total Fees</p>
                <p className="text-2xl font-bold">${mockFinancialRecord.totalFees.toLocaleString()}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="text-sm opacity-90 mb-1">Paid</p>
                <p className="text-2xl font-bold">${mockFinancialRecord.paidAmount.toLocaleString()}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="text-sm opacity-90 mb-1">Pending</p>
                <p className="text-2xl font-bold">${mockFinancialRecord.pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Dues */}
        {mockFinancialRecord.upcomingDues.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Dues</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {mockFinancialRecord.upcomingDues.map((due, index) => {
                const dueDate = new Date(due.dueDate);
                const daysUntil = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div
                    key={due.id}
                    className={`p-4 ${index !== mockFinancialRecord.upcomingDues.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${
                          due.status === 'overdue' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <Calendar className={`w-6 h-6 ${
                            due.status === 'overdue' ? 'text-red-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{due.description}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Due date: {dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              due.status === 'overdue' 
                                ? 'bg-red-100 text-red-700' 
                                : daysUntil <= 7 
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {due.status === 'overdue' 
                                ? 'Overdue' 
                                : daysUntil === 0 
                                ? 'Due Today'
                                : daysUntil === 1
                                ? 'Due Tomorrow'
                                : `Due in ${daysUntil} days`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${due.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Payment History */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Payment History</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {mockFinancialRecord.paymentHistory.map((payment, index) => (
              <div
                key={payment.id}
                className={`p-4 ${index !== mockFinancialRecord.paymentHistory.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Receipt className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{payment.description}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {new Date(payment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span><strong>Method:</strong> {payment.method}</span>
                        <span><strong>Receipt:</strong> {payment.receiptNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${payment.amount.toLocaleString()}</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 mt-2">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Paid
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 p-2 rounded-full">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Payment Information</h3>
              <p className="text-sm text-gray-700 mb-3">
                For fee payments, please visit the school office or use the designated bank account. 
                Payment confirmations will be reflected here within 24-48 hours.
              </p>
              <div className="bg-white rounded-xl p-4 text-sm text-gray-700">
                <p className="mb-1"><strong>Bank:</strong> City National Bank</p>
                <p className="mb-1"><strong>Account Name:</strong> School Fee Collection</p>
                <p><strong>Account Number:</strong> 1234567890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
