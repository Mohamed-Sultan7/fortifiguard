import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Phone, 
  Mail, 
  Settings, 
  Search, 
  Bell, 
  User, 
  Moon, 
  Sun,
  Shield,
  ChevronRight,
  Menu,
  X,
  LogOut,
  UserCircle,
  HelpCircle
} from 'lucide-react';
import { userData, recentCalls, recentMail, stats } from '../data/mockData';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: location.pathname === '/dashboard' },
    { name: 'Calls', href: '/calls', icon: Phone, current: location.pathname === '/calls' },
    { name: 'Mail', href: '/mail', icon: Mail, current: location.pathname === '/mail' },
    { name: 'Settings', href: '/settings', icon: Settings, current: location.pathname === '/settings' },
    { name: 'Support', href: '/support', icon: HelpCircle, current: location.pathname === '/support' },
  ];

  const breadcrumbs = {
    '/dashboard': [{ name: 'Dashboard', href: '/dashboard' }],
    '/calls': [{ name: 'Dashboard', href: '/dashboard' }, { name: 'Calls', href: '/calls' }],
    '/mail': [{ name: 'Dashboard', href: '/dashboard' }, { name: 'Mail', href: '/mail' }],
    '/settings': [{ name: 'Dashboard', href: '/dashboard' }, { name: 'Settings', href: '/settings' }],
    '/support': [{ name: 'Dashboard', href: '/dashboard' }, { name: 'Support', href: '/support' }],
  };

  const currentBreadcrumbs = breadcrumbs[location.pathname] || [];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getPageTitle = () => {
    const titles = {
      '/dashboard': 'Dashboard Overview',
      '/calls': 'Call Management',
      '/mail': 'Mail Center',
      '/settings': 'Account Settings',
      '/support': 'Help & Support',
    };
    return titles[location.pathname] || 'FortifiGuard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/60 dark:border-gray-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">FortifiGuard</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Protected Services</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-item ${
                  item.current ? 'sidebar-item-active' : 'sidebar-item-inactive'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="sidebar-icon" />
                <span className="font-medium">{item.name}</span>
                {item.current && (
                  <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full animate-pulse-soft" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200/60 dark:border-gray-700/60">
          <button 
            onClick={() => {
              navigate('/settings', { state: { tab: 'profile' } });
              setSidebarOpen(false); // Close sidebar on mobile after navigation
            }}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-700/50 hover:from-gray-100 hover:to-gray-200/50 dark:hover:from-gray-700 dark:hover:to-gray-600/50 transition-all duration-200 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold shadow-soft">
              {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0 text-start">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{userData.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Premium Plan</p>
            </div>
            <div className="w-3 h-3 bg-success-500 rounded-full border-2 border-white shadow-sm animate-pulse-soft" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="topbar">
          <div className="flex items-center justify-between h-full sm:px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Breadcrumbs */}
              <nav className="breadcrumb hidden md:flex">
                {currentBreadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.name}>
                    {index > 0 && <ChevronRight className="w-4 h-4 breadcrumb-separator" />}
                    <Link 
                      to={crumb.href} 
                      className={`breadcrumb-item ${index === currentBreadcrumbs.length - 1 ? 'text-gray-900 dark:text-white font-semibold' : ''}`}
                    >
                      {crumb.name}
                    </Link>
                  </React.Fragment>
                ))}
              </nav>

              {/* Page Title */}
              <div className="hidden md:hidden">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{getPageTitle()}</h1>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search 
              <div className="hidden md:block relative">
                <div className="input-group">
                  <Search className="input-icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-with-icon w-64 text-sm"
                  />
                </div>
              </div>*/}

              {/* Notifications
              <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-danger-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse-soft" />
              </button> */}

              {/* Dark Mode Toggle
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                )}
              </button>*/}

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                    {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-[50]" 
          onClick={(e) => {
            // Only close if clicking the overlay itself, not its children
            if (e.target === e.currentTarget) {
              setUserMenuOpen(false);
            }
          }}
        />
      )}

      {/* User Menu Portal - Outside main layout */}
      {userMenuOpen && (
        <div className="fixed top-20 right-6 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/60 dark:border-gray-700/60 py-2 z-[100] animate-slide-down">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{userData.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
          </div>
          <div className="py-2">
            <button 
              onClick={() => {
                setUserMenuOpen(false);
                // Navigate to profile/settings page with profile tab
                navigate('/settings', { state: { tab: 'profile' } });
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <UserCircle className="w-4 h-4" />
              Profile Settings
            </button>
            <button 
              onClick={() => {
                setUserMenuOpen(false);
                navigate('/support');
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
            <button 
              onClick={() => {
                setUserMenuOpen(false);
                // Handle sign out
                if (confirm('Are you sure you want to sign out?')) {
                  // Clear any stored auth data
                  localStorage.removeItem('authToken');
                  sessionStorage.clear();
                  // Redirect to login page
                  window.location.href = '/login';
                }
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;