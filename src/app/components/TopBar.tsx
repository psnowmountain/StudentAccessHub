import { Bell } from 'lucide-react';

interface TopBarProps {
  title: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export function TopBar({ title, notificationCount = 0, onNotificationClick }: TopBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
        <button
          onClick={onNotificationClick}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Bell className="w-6 h-6 text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
