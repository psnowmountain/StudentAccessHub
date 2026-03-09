import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { UserRole } from '../types';
import { mockUsers } from '../data/mockData';
import { GraduationCap, LogIn } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Simulate login by storing user info
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Navigate to appropriate dashboard
      navigate(`/${role}`);
    }
  };

  const roles = [
    {
      role: 'student' as UserRole,
      title: 'Student',
      description: 'Access your academic info and submit requests',
      icon: '🎓',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      role: 'parent' as UserRole,
      title: 'Parent',
      description: 'Monitor your child\'s progress',
      icon: '👨‍👩‍👧',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      role: 'teacher' as UserRole,
      title: 'Teacher',
      description: 'Communicate with students and manage requests',
      icon: '👨‍🏫',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      role: 'admin' as UserRole,
      title: 'Admin',
      description: 'Manage platform and handle requests',
      icon: '⚙️',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg shadow-blue-500/50">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Student Access Hub</h1>
          <p className="text-gray-300 text-lg">One platform for students, parents, and teachers</p>
          <p className="text-sm text-gray-400 mt-2">Select your role to continue</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {roles.map((roleInfo) => (
            <button
              key={roleInfo.role}
              onClick={() => handleRoleSelect(roleInfo.role)}
              className={`relative overflow-hidden rounded-2xl p-6 bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border-2 ${
                selectedRole === roleInfo.role ? 'border-blue-500 shadow-blue-500/50' : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${roleInfo.gradient} opacity-20 rounded-bl-full`}></div>
              <div className="relative">
                <div className="text-5xl mb-3">{roleInfo.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{roleInfo.title}</h3>
                <p className="text-gray-300 mb-4">{roleInfo.description}</p>
                <div className="flex items-center text-blue-400 font-medium">
                  <span>Login as {roleInfo.title}</span>
                  <LogIn className="w-4 h-4 ml-2" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Demo Info */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-300">
            <strong className="text-blue-400">Demo Mode:</strong> Click any role to explore the Student Access Hub. 
            This is a demonstration with sample data.
          </p>
        </div>
      </div>
    </div>
  );
}