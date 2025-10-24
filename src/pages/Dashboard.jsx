import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  MapPin,
  Eye,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { userData, recentCalls, recentMail, stats } from '../data/mockData';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const statsData = [
    {
      id: 1,
      name: 'Call Attempts',
      value: stats.totalCallsReceived,
      change: '+12%',
      changeType: 'positive',
      icon: Phone,
      color: 'primary',
      description: 'This week',
      trend: [65, 78, 82, 95, 108, 115, 127]
    },
    {
      id: 2,
      name: 'Unread Mail',
      value: stats.unreadMail,
      change: '+3',
      changeType: 'positive',
      icon: Mail,
      color: 'secondary',
      description: 'New items',
      trend: [2, 3, 4, 5, 6, 7, 8]
    },
    {
      id: 3,
      name: 'Service Status',
      value: stats.serviceActive,
      change: 'Active',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'primary',
      description: 'All services',
      trend: [92, 94, 95, 96, 97, 98, 99]
    },
    {
      id: 4,
      name: 'Messages Sent',
      value: stats.totalCallsReceived,
      change: '+12%',
      changeType: 'positive',
      icon: Activity,
      color: 'success',
      description: 'Auto-responses',
      trend: [65, 78, 82, 95, 108, 115, 127]
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'call_received',
      title: 'Call received',
      description: 'Voicemail message played automatically',
      time: '2 hours ago',
      icon: Phone,
      color: 'success'
    },
    {
      id: 2,
      type: 'mail_scanned',
      title: 'Mail scanned',
      description: 'New document digitized and available',
      time: '4 hours ago',
      icon: Mail,
      color: 'success'
    },
    {
      id: 3,
      type: 'service_updated',
      title: 'Service settings updated',
      description: 'Voicemail message customized',
      time: '1 day ago',
      icon: Shield,
      color: 'success'
    },
    {
      id: 4,
      type: 'call_received',
      title: 'Call handled',
      description: 'Automated voicemail service activated',
      time: '2 days ago',
      icon: Phone,
      color: 'success'
    }
  ];

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    const isPositive = stat.changeType === 'positive';
    
    // Define color mappings for gradients
    const colorMap = {
      primary: {
        gradient: 'from-emerald-500 to-emerald-600',
        trendFrom: 'from-emerald-100',
        trendTo: 'to-emerald-200'
      },
      secondary: {
        gradient: 'from-blue-500 to-blue-600',
        trendFrom: 'from-blue-200',
        trendTo: 'to-blue-300'
      },
      success: {
        gradient: 'from-emerald-500 to-emerald-600',
        trendFrom: 'from-emerald-100',
        trendTo: 'to-emerald-200'
      },
      warning: {
        gradient: 'from-amber-500 to-amber-600',
        trendFrom: 'from-amber-100',
        trendTo: 'to-amber-200'
      },
      danger: {
        gradient: 'from-red-500 to-red-600',
        trendFrom: 'from-red-100',
        trendTo: 'to-red-200'
      }
    };
    
    const colors = colorMap[stat.color] || colorMap.primary;
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
        {/* Header with Icon and Value */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
            isPositive 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            {stat.change}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="space-y-3">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {stat.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {stat.description}
          </div>
          
          {/* Enhanced trend chart */}
          <div className="pt-4">
            <div className="flex items-end gap-1.5 h-12">
              {stat.trend.map((value, index) => (
                <div
                  key={index}
                  className={`flex-1 bg-gradient-to-t ${colors.trendFrom} ${colors.trendTo} rounded-t-lg hover:opacity-100 transition-all duration-300 shadow-sm`}
                  style={{ 
                    height: `${(value / Math.max(...stat.trend)) * 100}%`,
                    opacity: index === stat.trend.length - 1 ? 1 : 0.7
                  }}
                />
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2 text-center">
              7-day trend
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ActivityItem = ({ activity }) => {
    const Icon = activity.icon;
    
    return (
      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 group">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          activity.color === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/20' :
          activity.color === 'warning' ? 'bg-amber-100 dark:bg-amber-900/20' :
          activity.color === 'danger' ? 'bg-red-100 dark:bg-red-900/20' :
          'bg-blue-100 dark:bg-blue-900/20'
        }`}>
          <Icon className={`w-5 h-5 ${
            activity.color === 'success' ? 'text-emerald-600 dark:text-emerald-400' :
            activity.color === 'warning' ? 'text-amber-600 dark:text-amber-400' :
            activity.color === 'danger' ? 'text-red-600 dark:text-red-400' :
            'text-blue-600 dark:text-blue-400'
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors duration-200">
                {activity.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {activity.description}
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4">
              {activity.time}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Loading skeleton */}
        <div className="flex items-center justify-between">
          <div className="loading-skeleton h-8 w-48" />
          <div className="loading-skeleton h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card">
              <div className="loading-skeleton h-12 w-12 rounded-2xl mb-4" />
              <div className="loading-skeleton h-8 w-20 mb-2" />
              <div className="loading-skeleton h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, <span className="text-gradient">{userData.name.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your protected phone and mail services are active and managing your privacy
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input text-sm w-auto"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        
        </div>
      </div>

      {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Protected Services Status */}
      <div className="grid grid-cols-1 gap-6">
        {/* Assigned Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Protected Services</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-semibold">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-soft" />
                Services Active
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Protected Phone */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-6 border border-primary-200/50 dark:border-primary-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Protected Phone Number</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automated voicemail service</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                    {userData.assignedPhone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Redirecting calls since March 2024
                  </p>
                </div>
              </div>

              {/* Protected Address */}
              <div className="bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/20 rounded-2xl p-6 border border-success-200/50 dark:border-success-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-success-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Protected Mailing Address</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mail scanning service</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {userData.assignedAddress.street}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {userData.assignedAddress.city}, {userData.assignedAddress.state} {userData.assignedAddress.zipCode}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Scanning mail since March 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity 
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
              View All
            </button>
          </div>
          
          <div className="space-y-2">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>*/}
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <div className="table-container">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Calls</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                View All Calls
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentCalls.slice(0, 5).map((call) => (
              <div key={call.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      call.status === 'handled' 
                        ? 'bg-danger-100 text-danger-600' 
                        : call.status === 'allowed'
                        ? 'bg-success-100 text-success-600'
                        : 'bg-warning-100 text-warning-600'
                    }`}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {call.callerName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {call.callerNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`badge ${
                      call.status === 'handled' ? 'badge-danger' :
                      call.status === 'allowed' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {call.status}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {call.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Mail */}
        <div className="table-container">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Mail</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                View All Mail
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentMail.slice(0, 5).map((mail) => (
              <div key={mail.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      mail.status === 'scanned' 
                        ? 'bg-warning-100 text-warning-600' 
                        : mail.status === 'delivered'
                        ? 'bg-success-100 text-success-600'
                        : 'bg-danger-100 text-danger-600'
                    }`}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {mail.sender}
                        </p>
                        {mail.status === 'unread' && (
                          <div className="ml-2 h-2 w-2 bg-primary-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {mail.subject}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className={`badge ${
                      mail.status === 'scanned' ? 'badge-warning' :
                      mail.status === 'delivered' ? 'badge-success' : 'badge-danger'
                    }`}>
                      {mail.status}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {mail.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;