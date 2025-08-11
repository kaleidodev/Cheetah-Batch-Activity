
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-apps-2-fill text-gray-600"></i>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-teal-600 rounded-sm" style={{backgroundColor: '#047876'}}></div>
              <span className="text-lg font-semibold text-gray-800">LOYALTY</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Link href="/analytics" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            ANALYTICS
          </Link>
          <Link href="/members" className="px-3 py-2 text-sm text-teal-600 border-b-2 border-teal-600 font-medium" style={{color: '#047876', borderBottomColor: '#047876'}}>
            MEMBERS
          </Link>
          <Link href="/campaigns" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            CAMPAIGNS
          </Link>
          <Link href="/challenges" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            CHALLENGES
          </Link>
          <Link href="/transactions" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            TRANSACTIONS
          </Link>
          <Link href="/rewards" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            REWARDS
          </Link>
          <Link href="/communities" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            COMMUNITIES
          </Link>
          <Link href="/rules" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            RULES
          </Link>
          <Link href="/program" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            PROGRAM
          </Link>
          <Link href="/admin" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-teal-600">
            ADMIN
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
            <i className="ri-map-pin-line text-gray-500"></i>
          </div>
          <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
            <i className="ri-question-line text-gray-500"></i>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-user-line text-gray-500"></i>
            </div>
            <span className="text-sm text-gray-600">qg-master10</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-user-line text-gray-500"></i>
            </div>
            <span className="text-sm text-gray-600">Simon</span>
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-down-s-line text-gray-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
