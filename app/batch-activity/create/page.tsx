'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CreateBatchActivity from '@/components/CreateBatchActivity';
import Footer from '@/components/Footer';

export default function CreateBatchActivityPage() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            <CreateBatchActivity />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}