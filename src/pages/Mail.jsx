import React, { useState } from 'react';
import { Mail, Filter, Calendar, Eye, Download, X, FileText, Star, Archive, Tag } from 'lucide-react';
import { allMail } from '../data/mockData';

const MailPage = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter mail based on status and type
  const filteredMail = allMail.filter(mail => {
    if (filterStatus !== 'all' && mail.status !== filterStatus) return false;
    if (filterType !== 'all' && mail.type !== filterType) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMail.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMail = filteredMail.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    return status === 'unread' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Debt Collection': 'bg-red-100 text-red-800',
      'Legal Notice': 'bg-orange-100 text-orange-800',
      'Verification': 'bg-yellow-100 text-yellow-800',
      'Account Update': 'bg-blue-100 text-blue-800',
      'Payment Plan': 'bg-green-100 text-green-800',
      'Dispute': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mail Center</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your protected mailing address and view received mail.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filteredMail.length} items total
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredMail.filter(m => m.status === 'unread').length} unread
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="Debt Collection">Debt Collection</option>
              <option value="Legal Notice">Legal Notice</option>
              <option value="Verification">Verification</option>
              <option value="Account Update">Account Update</option>
              <option value="Payment Plan">Payment Plan</option>
              <option value="Dispute">Dispute</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Mail Table */}
      {filteredMail.length === 0 ? (
        // Empty State
        <div className="card p-12 text-center">
          <Mail className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No mail yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your protected mailing address is active. Mail will appear here once it's scanned and processed.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">Your Protected Address:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              123 Protected Street, Suite 456<br />
              Privacy City, PC 12345
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
                  Sender & Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedMail.map((mail) => (
                <tr
                  key={mail.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedMail(mail)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {mail.status === 'unread' && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{mail.sender}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{mail.subject}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(mail.type)}`}>
                      {mail.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{mail.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(mail.status)}`}>
                      {mail.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMail(mail);
                        }}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                      >
                        View Document
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMail.length)} of {filteredMail.length} results
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

      {/* Enhanced Mail Viewer Modal */}
      {selectedMail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full h-5/6 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedMail.subject}</h3>
                  {selectedMail.important && (
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>From: {selectedMail.sender}</span>
                  <span>•</span>
                  <span>{selectedMail.date}</span>
                </div>
                {/* Tags */}
                <div className="flex items-center space-x-2 mt-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <div className="flex space-x-1">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {selectedMail.type}
                    </span>
                    {selectedMail.important && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Important
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMail(null)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 ml-4"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Document Viewer Area */}
            <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
              <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <div className="text-center max-w-2xl">
                  <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Scanned Document</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    This document has been scanned and processed by your protected mail service.
                  </p>
                  
                  {/* Mock Document Preview */}
                  <div className="bg-white dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-left mx-auto max-w-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Document Preview</span>
                      <span className="text-xs text-gray-400">PDF • 2 pages</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Content Summary:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedMail.preview}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(selectedMail.type)}`}>
                    {selectedMail.type}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Scanned: {selectedMail.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300">
                    <Star className="h-4 w-4" />
                    <span>{selectedMail.important ? 'Remove Star' : 'Mark Important'}</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300">
                    <Archive className="h-4 w-4" />
                    <span>Archive</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default MailPage;