import { useState } from "react";
import { Plus, Search, Home, FileText, Tag, FolderOpen, Star, Users, Save, ChevronDown, Globe, Lock, Eye, MoreHorizontal } from "lucide-react";

const LeftSidebar = () => {
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const NavItem = ({ icon: Icon, label, active, nested, className = "" }) => (
    <button
      className={`
      w-full flex items-center gap-2 px-3 py-2 text-sm
      ${nested ? "ml-3" : ""}
      ${active ? "bg-gray-200 font-medium" : "hover:bg-gray-100"}
      ${className}
      rounded transition-colors text-left
    `}
    >
      <Icon size={16} className={active ? "text-gray-900" : "text-gray-600"} />
      <span className={active ? "text-gray-900" : "text-gray-700"}>
        {label}
      </span>
    </button>
  );

  return (
    <aside className="w-52 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden">
      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
            S
          </div>
          <span className="text-sm font-medium text-gray-700">
            sasmalarvey639
          </span>
        </div>

        {/* Quick Actions */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          Note
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-300"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        <NavItem icon={Home} label="Home" active />
        <NavItem icon={FileText} label="Notes" />
        <NavItem icon={Tag} label="Tasks" />
        <NavItem icon={FolderOpen} label="Files" />
        <NavItem icon={Star} label="Calendar" />

        <div className="px-3 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Notebooks
            </span>
          </div>
          <NavItem icon={FileText} label="First Notebook" nested />
          <NavItem
            icon={Plus}
            label="New Notebook"
            nested
            className="text-green-600"
          />
        </div>

        <div className="px-3 pt-2">
          <NavItem icon={Tag} label="Tags" />
          <NavItem icon={Users} label="Shared with me" />
        </div>

        {/* Save Options */}
        <div className="px-3 pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={() => setShowSaveOptions(!showSaveOptions)}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded text-sm font-medium text-gray-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Save size={16} />
              <span>Save As</span>
            </div>
            <ChevronDown
              size={14}
              className={`transition-transform ${
                showSaveOptions ? "rotate-180" : ""
              }`}
            />
          </button>

          {showSaveOptions && (
            <div className="mt-1 ml-3 space-y-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded text-sm text-gray-700 transition-colors">
                <Globe size={14} className="text-blue-600" />
                <span>Public</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-50 rounded text-sm text-gray-700 transition-colors">
                <Lock size={14} className="text-purple-600" />
                <span>Private</span>
              </button>
            </div>
          )}
        </div>

        <div className="px-3 pt-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors">
            <Eye size={16} />
            <span>View Notes</span>
          </button>
        </div>

        <div className="px-3 pt-4">
          <NavItem icon={MoreHorizontal} label="More" />
        </div>
      </nav>

      {/* Upgrade Button */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center justify-center gap-2 text-sm font-semibold transition-colors">
          <Star size={16} />
          Upgrade
        </button>
      </div>
    </aside>
  );
};
export default LeftSidebar;