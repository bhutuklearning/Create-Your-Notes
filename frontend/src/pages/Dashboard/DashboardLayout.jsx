import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";
import Feed from "./Feed";
import Library from "./Library";
import Profile from "./Profile";
import Sidebar from "./Sidebar";

// Main Dashboard Layout
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar - Fixed */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <TopNavbar 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Left Sidebar */}
        <LeftSidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Center + Right Content */}
        <div className="flex-1 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 p-4 sm:p-6 lg:p-8">
            {/* Main Content Section */}
            <main className="min-w-0">
              <Routes>
                <Route index element={<Feed />} />
                <Route path="library" element={<Library />} />
                <Route path="profile" element={<Profile />} />
              </Routes>
            </main>

            {/* Right Sidebar - Hidden on mobile/tablet */}
            <aside className="hidden lg:block">
              <Sidebar />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
