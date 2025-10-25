import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard, Download, Calendar, CheckCircle, Settings as SettingsIcon, User, Shield, Bell, Phone, MapPin, MessageSquare } from 'lucide-react';
import { userData, invoices } from '../data/mockData';

const Settings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('protected-services');
  const [voicemailMessage, setVoicemailMessage] = useState("This number is not accepting calls at the moment. Please contact us by mail at the mailing address on file. Thank you.");

  // Check for tab parameter in URL or state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    const stateTab = location.state?.tab;
    
    if (stateTab) {
      setActiveTab(stateTab);
    } else if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  const tabs = [
    { id: 'protected-services', name: 'Protected Services', icon: Phone },
    { id: 'billing', name: 'Billing & Subscription', icon: CreditCard },
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'privacy', name: 'Privacy Settings', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account, billing, and privacy preferences</p>
      </div>

      {/* Tabs - Mobile Optimized */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'protected-services' && (
        <div className="space-y-6">
          {/* Protected Phone Number */}
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                <Phone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Protected Phone Number</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your dedicated protected phone number with automated voicemail</p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Protected Number</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Automated Voicemail Message
              </label>
              <textarea
                value={voicemailMessage}
                onChange={(e) => setVoicemailMessage(e.target.value)}
                readOnly
                disabled
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white resize-none opacity-70"
                placeholder="Enter your automated voicemail message..."
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This message will be played to callers when they reach your protected voicemail.
              </p>
            </div>
          </div>

          {/* Protected Mailing Address */}
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Protected Mailing Address</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your secure protected address for mail scanning and forwarding</p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Protected Address</p>
                  <div className="mt-1">
                    <p className="text-gray-900 dark:text-white font-medium">John Doe</p>
                    <p className="text-gray-900 dark:text-white">1234 Protected Mail Center</p>
                    <p className="text-gray-900 dark:text-white">Suite #VM789</p>
                    <p className="text-gray-900 dark:text-white">Privacy City, PC 12345</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Mail scanning and digital delivery enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
          {/* Current Subscription */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Subscription</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                <CheckCircle className="h-4 w-4 mr-1" />
                {userData.subscription.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan</label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{userData.subscription.plan}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Cost</label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{userData.subscription.amount}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Billing Date</label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{userData.subscription.nextBilling}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Plan Features</h4>
                  <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Unlimited call handling and forwarding</li>
                    <li>• Advanced mail scanning and digitization</li>
                    <li>• 24/7 protected service management</li>
                    <li>• Priority customer support</li>
                    <li>• Advanced reporting and analytics</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button className="btn-primary">Upgrade Plan</button>
                  <button className="btn-secondary">Cancel Subscription</button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Payment Method</h3>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-16 items-center justify-center rounded bg-gray-100 dark:bg-gray-700">
                  <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/25</p>
                </div>
              </div>
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm">
                Update
              </button>
            </div>
          </div>

          {/* Billing History */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing History</h3>
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                        {invoice.date}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                        {invoice.amount}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={userData.name}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Privacy Controls</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Auto-handle unknown callers</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically handle calls from numbers not in your contacts with voicemail</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Mail scanning notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when important mail is scanned and digitized</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about your account activity</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">SMS alerts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get text message alerts for important events</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-primary-600 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Settings;