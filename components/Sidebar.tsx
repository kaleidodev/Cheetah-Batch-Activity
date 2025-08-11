
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-teal-600"
            style={{'--tw-ring-color': '#047876'} as any}
          />
          <div className="absolute left-2 top-2.5 w-4 h-4 flex items-center justify-center">
            <i className="ri-search-line text-gray-400"></i>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-1">
        <div className="py-2">
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-user-line text-gray-500"></i>
            </div>
            <span className="text-sm">Members</span>
            <div className="ml-auto w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-down-s-line text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-customer-service-line text-gray-500"></i>
            </div>
            <span className="text-sm">CSR</span>
            <div className="ml-auto w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-down-s-line text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-team-line text-gray-500"></i>
            </div>
            <span className="text-sm">People</span>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center space-x-2 text-teal-600 px-2 py-1 rounded cursor-pointer" style={{color: '#047876', backgroundColor: '#f0fdfa'}}>
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-bar-chart-box-line" style={{color: '#047876'}}></i>
            </div>
            <span className="text-sm font-medium">Batch Activity</span>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-bar-chart-box-line text-gray-500"></i>
            </div>
            <span className="text-sm">Batch Actions</span>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-flight-takeoff-line text-gray-500"></i>
            </div>
            <span className="text-sm">Flights Approval</span>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-pie-chart-line text-gray-500"></i>
            </div>
            <span className="text-sm">Segments</span>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-group-line text-gray-500"></i>
            </div>
            <span className="text-sm">Groups</span>
            <div className="ml-auto w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-down-s-line text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-settings-line text-gray-500"></i>
            </div>
            <span className="text-sm">Settings</span>
            <div className="ml-auto w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-down-s-line text-gray-400"></i>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
