import { Link, useLocation, useNavigate } from 'react-router';
import { 
  Home, 
  BookOpen, 
  DollarSign, 
  FileText, 
  Bell, 
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import type { User as UserType } from '../types';

interface BottomNavProps {
  currentUser: UserType;
}

export function BottomNav({ currentUser }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Different nav items based on role
  const getNavItems = () => {
    if (currentUser.role === 'student' || currentUser.role === 'parent') {
      return [
        { path: `/${currentUser.role}`, icon: Home, label: 'Home' },
        { path: '/academic', icon: BookOpen, label: 'Academic' },
        { path: '/financial', icon: DollarSign, label: 'Financial' },
        { path: '/requests', icon: FileText, label: 'Requests' },
        { path: '/profile', icon: User, label: 'Profile' },
      ];
    } else if (currentUser.role === 'teacher') {
      return [
        { path: '/teacher', icon: Home, label: 'Home' },
        { path: '/announcements', icon: Bell, label: 'Announcements' },
        { path: '/requests', icon: FileText, label: 'Requests' },
        { path: '/profile', icon: User, label: 'Profile' },
      ];
    } else {
      return [
        { path: '/admin', icon: Home, label: 'Home' },
        { path: '/announcements', icon: Bell, label: 'Announcements' },
        { path: '/requests', icon: FileText, label: 'Requests' },
        { path: '/profile', icon: User, label: 'Profile' },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
          >
            {menuOpen ? <X className="w-6 h-6 mb-1" /> : <Menu className="w-6 h-6 mb-1" />}
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}>
          <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{currentUser.role}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Access Hub</span>
            </div>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-sm text-gray-600 capitalize">{currentUser.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
