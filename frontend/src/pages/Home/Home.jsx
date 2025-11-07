import React from "react";
import Feed from "./Feed"
import FeedSidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed Section */}
        <div className="lg:col-span-2">
          <Feed />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block">
          <FeedSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
