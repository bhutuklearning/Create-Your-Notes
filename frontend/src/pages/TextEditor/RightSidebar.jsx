import { Star, FileText } from "lucide-react";
import React from "react";


// Right Sidebar Component
const RightSidebar = () => {


  const InfoCard = ({ title, description, icon: Icon }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded">
          <Icon size={18} className="text-gray-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm text-gray-900 mb-1">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );


  return (
    <aside className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
      {/* AI Helper Section */}
      <div className="p-6">
        <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI Helper</h3>
          <p className="text-sm text-white/90 mb-4">
            Your intelligent writing assistant is ready to help you create
            better content.
          </p>
          <button className="w-full bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-6 space-y-4">
        <InfoCard
          title="My templates"
          description="Discover more templates"
          icon={FileText}
        />

        <InfoCard
          title="Quick Tips"
          description="Use shortcuts to boost productivity"
          icon={Star}
        />

        <InfoCard
          title="Recent Activity"
          description="3 notes edited today"
          icon={FileText}
        />
      </div>
    </aside>
  );
};

export default RightSidebar;
