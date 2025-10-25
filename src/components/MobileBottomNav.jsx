import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Phone, 
  Mail, 
  Settings, 
  HelpCircle
} from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard, 
      current: location.pathname === '/dashboard' 
    },
    { 
      name: 'Calls', 
      href: '/calls', 
      icon: Phone, 
      current: location.pathname === '/calls' 
    },
    { 
      name: 'Mail', 
      href: '/mail', 
      icon: Mail, 
      current: location.pathname === '/mail' 
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Settings, 
      current: location.pathname === '/settings' 
    },
    { 
      name: 'Support', 
      href: '/support', 
      icon: HelpCircle, 
      current: location.pathname === '/support' 
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/60 dark:border-gray-700/60 shadow-2xl"></div>
      
      {/* Navigation container */}
      <nav className="relative px-4 py-2 safe-area-bottom">
        <div className="flex items-center justify-around">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                  item.current
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {/* Icon container with active indicator */}
                <div className={`relative p-2 rounded-xl transition-all duration-200 ${
                  item.current 
                    ? 'bg-primary-100 dark:bg-primary-900/30 scale-110' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  <Icon className={`w-5 h-5 transition-all duration-200 ${
                    item.current ? 'scale-110' : ''
                  }`} />
                  
                  {/* Active indicator dot */}
                  {item.current && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                {/* Label */}
                <span className={`text-xs font-medium mt-1 transition-all duration-200 ${
                  item.current 
                    ? 'text-primary-600 dark:text-primary-400 font-semibold' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl"></div>
    </div>
  );
};

export default MobileBottomNav;