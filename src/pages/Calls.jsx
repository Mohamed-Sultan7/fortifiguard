import React, { useState } from 'react';
import { Phone, Filter, Calendar, Clock, X, Play, ArrowUpDown, Search, MessageSquare } from 'lucide-react';
import { allCalls } from '../data/mockData';

const Calls = () => {
  const [selectedCall, setSelectedCall] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  // Filter and search calls
  const filteredCalls = allCalls.filter(call => {
    const matchesStatus = filterStatus === 'all' || call.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesSearch = searchTerm === '' || 
      call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.callerNumber.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Sort calls
  const sortedCalls = [...filteredCalls].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'date') {
      aValue = new Date(a.date + ' ' + a.time);
      bValue = new Date(b.date + ' ' + b.time);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCalls = sortedCalls.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Voicemail Played':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Auto-Message Played':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Call History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review calls handled by your protected phone service</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {sortedCalls.length} calls handled
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field w-auto min-w-[120px]"
            >
              <option value="all">All Status</option>
              <option value="voicemail">Voicemail Played</option>
              <option value="auto-message">Auto-Message</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search calls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calls Table */}
      {sortedCalls.length === 0 ? (
        // Empty State
        <div className="card p-12 text-center">
          <Phone className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No calls yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your protected phone number is active and ready to handle calls. Call history will appear here once calls are received.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">Your Protected Number:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              +1 (555) 123-4567
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Automated voicemail service active
            </p>
          </div>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => handleSort('callerName')}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <span>Caller Information</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <span>Date & Time</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => handleSort('duration')}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <span>Duration</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <span>Status</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedCalls.map((call) => (
                <tr
                  key={call.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedCall(call)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{call.callerName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{call.callerNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">{call.date}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{call.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                      <Clock className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
                      {call.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCalls.length)} of {filteredCalls.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-primary-600 dark:bg-primary-500 text-white rounded-md">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Enhanced Call Detail Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Details</h3>
              <button
                onClick={() => setSelectedCall(null)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Caller Name</label>
                <p className="text-gray-900 dark:text-white font-medium">{selectedCall.callerName}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                <p className="text-gray-900 dark:text-white">{selectedCall.callerNumber}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</label>
                  <p className="text-gray-900 dark:text-white">{selectedCall.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</label>
                  <p className="text-gray-900 dark:text-white">{selectedCall.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</label>
                  <p className="text-gray-900 dark:text-white">{selectedCall.duration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedCall.status)}`}>
                    {selectedCall.status}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Automated Message Played</label>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          "Hello, you've reached my protected voicemail service. I'm not available to take your call right now, but your message is important to me. Please leave your name, number, and a brief message, and I'll get back to you as soon as possible. Thank you for calling!"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  <Play className="h-4 w-4" />
                  <span>Play Voicemail Message (Mock)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Calls;