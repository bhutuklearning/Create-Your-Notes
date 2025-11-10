import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import TextEditorSection from "./TextEditorSection";
import { Star } from "lucide-react";

const EditorLayout = () => {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Top Banner */}
      <div className="bg-yellow-400 px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Star size={16} className="fill-black" />
          <span className="font-medium">Get 7 days of free trial.</span>
          <span className="text-gray-700">Enjoy Notes without limits</span>
        </div>
        <button className="bg-black text-white px-4 py-1 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
          Continue
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <TextEditorSection />
        <RightSidebar />
      </div>
    </div>
  );
};

export default EditorLayout;
