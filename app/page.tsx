'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import BatchActivityTable from '@/components/BatchActivityTable';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            <BatchActivityTable />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}