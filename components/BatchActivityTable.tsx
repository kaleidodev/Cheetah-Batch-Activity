
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BatchActivity {
  id: number;
  name: string;
  activityType: string;
  processedMembers: number;
  processedOn: string;
  progress: number;
  status: 'COMPLETE' | 'IN PROGRESS' | 'FAILURES';
  statusLabel: string;
}

const mockData: BatchActivity[] = [
  {
    id: 1,
    name: 'Quarterly Point Boost',
    activityType: 'Earn Adjustment',
    processedMembers: 5234,
    processedOn: 'March 4, 2025',
    progress: 100,
    status: 'COMPLETE',
    statusLabel: '100% complete (5234 of 5234)'
  },
  {
    id: 2,
    name: 'Quarterly Point Boost',
    activityType: 'Earn Adjustment',
    processedMembers: 5234,
    processedOn: 'March 4, 2025',
    progress: 40,
    status: 'IN PROGRESS',
    statusLabel: '40% complete (5234 of 12345)'
  },
  {
    id: 3,
    name: 'Quarterly Point Boost',
    activityType: 'Earn Adjustment',
    processedMembers: 5234,
    processedOn: 'March 4, 2025',
    progress: 0,
    status: 'FAILURES',
    statusLabel: 'Failures'
  }
];

const activityTypes = [
  'Earn Adjustment',
  'Tier Adjustment',
  'Update Member Attribute'
];

export default function BatchActivityTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Any Status');
  const [sortBy, setSortBy] = useState('Sort by Display name');
  const [activityType, setActivityType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [activitySearch, setActivitySearch] = useState('');

  const filteredActivityTypes = activityTypes.filter(type =>
    type.toLowerCase().includes(activitySearch.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETE':
        return 'bg-green-100 text-green-800';
      case 'IN PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'FAILURES':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'COMPLETE':
        return '#047876';
      case 'IN PROGRESS':
        return '#047876';
      case 'FAILURES':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  const handleActivityTypeSelect = (type: string) => {
    setActivityType(type);
    setIsActivityDropdownOpen(false);
    setActivitySearch('');
  };

  return (
    <div className="bg-white">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Batch Activity Assignment</h1>
        <p className="text-sm text-gray-600 mt-1">Assign activities to multiple members simultaneously</p>
      </div>

      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Enter Display name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
              style={{ '--tw-ring-color': '#047876' } as any}
            />

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}
                className="w-44 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-10 text-left cursor-pointer whitespace-nowrap"
                style={{ '--tw-ring-color': '#047876' } as any}
              >
                <span className={activityType ? 'text-gray-900 whitespace-nowrap' : 'text-gray-400 whitespace-nowrap'}>
                  {activityType || 'Select Activity Type'}
                </span>
              </button>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className={`ri-arrow-${isActivityDropdownOpen ? 'up' : 'down'}-s-line text-gray-400`}></i>
              </div>

              {isActivityDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search Activity Type"
                      value={activitySearch}
                      onChange={(e) => setActivitySearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-teal-600"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredActivityTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleActivityTypeSelect(type)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer text-gray-900 whitespace-nowrap"
                      >
                        {type}
                      </button>
                    ))}
                    {filteredActivityTypes.length === 0 && (
                      <div className="px-3 py-2 text-sm text-gray-400">
                        No results found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link href="/batch-activity/create">
              <button
                disabled={!searchTerm.trim()}
                className={`flex items-center space-x-2 px-4 py-2 rounded text-sm whitespace-nowrap cursor-pointer transition-colors ${
                  searchTerm.trim() ? 'text-white hover:opacity-90' : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                }`}
                style={searchTerm.trim() ? { backgroundColor: '#047876' } : {}}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-add-line"></i>
                </div>
                <span>Create</span>
              </button>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-36 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
              style={{ '--tw-ring-color': '#047876' } as any}
            />

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-10 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as any}
              >
                <option>Any Status</option>
                <option>Complete</option>
                <option>In Progress</option>
                <option>Failures</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-44 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-10 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as any}
              >
                <option>Sort by Display name</option>
                <option>Sort by Date</option>
                <option>Sort by Status</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>

            <button className="px-3 py-2 text-white rounded text-sm whitespace-nowrap cursor-pointer" style={{ backgroundColor: '#047876' }}>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line"></i>
              </div>
            </button>

            <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm whitespace-nowrap cursor-pointer">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-close-line"></i>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Batch Activities</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Activity Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Processed Members</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Processed on</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Progress</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="cursor-pointer font-medium" style={{ color: '#047876' }}>
                      {activity.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {activity.activityType}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {activity.processedMembers.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {activity.processedOn}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col space-y-1">
                      <div className="text-xs text-gray-600">
                        {activity.statusLabel}
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${activity.progress}%`,
                            backgroundColor: getProgressBarColor(activity.status)
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                        <i className="ri-eye-line text-gray-400"></i>
                      </button>
                      <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                        <i className="ri-download-line text-gray-400"></i>
                      </button>
                      {activity.status === 'IN PROGRESS' && (
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer">
                          <i className="ri-stop-circle-line text-red-500"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center mt-6 space-x-2">
          <span className="text-sm text-gray-500">Displaying items 1 to 3 of 215 in total</span>
        </div>

        <div className="flex items-center justify-center mt-4 space-x-1">
          <button className="px-3 py-1 text-sm hover:bg-gray-50 rounded cursor-pointer" style={{ color: '#047876' }}>
            ‹ Pre
          </button>
          <button className="px-3 py-1 text-sm bg-gray-800 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
            2
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
            3
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
            4
          </button>
          <span className="px-3 py-1 text-sm text-gray-400">...</span>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
            22
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
            23
          </button>
          <button className="px-3 py-1 text-sm hover:bg-gray-50 rounded cursor-pointer" style={{ color: '#047876' }}>
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}
