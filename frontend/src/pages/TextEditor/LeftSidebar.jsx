import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Plus,Search,Home,FileText,Tag,FolderOpen,Star,Users,Save,ChevronDown,Globe,Lock,Eye,MoreHorizontal,BookOpen,Calendar} from "lucide-react";
import api from "../../utils/axios";

// Navigation items configuration
const NAV_ITEMS = [
  { id: "home", icon: Home, label: "Home", path: "/dashboard" },
  { id: "notes", icon: FileText, label: "Notes", path: "/dashboard/library" },
  // files and calendar are actions handled in this component
  { id: "files", icon: FolderOpen, label: "Files", path: null },
  { id: "calendar", icon: Calendar, label: "Calendar", path: null },
];

const NOTEBOOKS = [
  {
    id: "notebook-1",
    icon: BookOpen,
    label: "First Notebook",
    path: "/dashboard/library",
  },
];

const SECONDARY_NAV = [
  { id: "tags", icon: Tag, label: "Tags", path: "/dashboard" },
  { id: "shared", icon: Users, label: "Shared with me", path: "/dashboard" },
];

const SAVE_OPTIONS = [
  { id: "public", icon: Globe, label: "Public", color: "blue" },
  { id: "private", icon: Lock, label: "Private", color: "purple" },
];

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [calendarText, setCalendarText] = useState("");

  // Handle file upload via hidden input
  const handleFileClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*";
    input.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      try {
        // POST to backend upload endpoint (adjust if your backend uses a different path)
        await api.post("/files/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // Simple feedback
        alert("File uploaded successfully");
      } catch (err) {
        console.error("File upload failed:", err);
        alert("File upload failed. Check console for details.");
      }
    };
    input.click();
  };

  const handleCalendarClick = () => {
    const now = new Date();
    setCalendarText(now.toLocaleString());
  };

  // Reusable NavItem Component
  const NavItem = ({
    icon: Icon,
    label,
    active,
    nested,
    className = "",
    onClick,
  }) => (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium
        transition-all duration-200 rounded-lg
        ${nested ? "ml-4" : ""}
        ${
          active
            ? "bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-100"
            : "text-slate-700 hover:bg-slate-100"
        }
        ${className}
      `}
    >
      <Icon
        size={18}
        className={active ? "text-indigo-600" : "text-slate-600"}
      />
      <span>{label}</span>
    </button>
  );

  // Handle navigation
  const handleNavigation = (path, id) => {
    setActiveNav(id);
    navigate(path);
  };

  // Handle save option selection
  const handleSaveOption = (option) => {
    console.log(`Selected: ${option.label}`);
    setShowSaveOptions(false);
  };

  return (
    <aside className="w-64 bg-linear-to-b from-slate-50 to-white border-r border-slate-200 flex flex-col overflow-hidden shadow-sm">
      {/* User Profile Section */}
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              sasmalarvey639
            </p>
            <p className="text-xs text-slate-500">Free Plan</p>
          </div>
        </div>

        {/* Create Note Button */}
        <button
          onClick={() => navigate("/editor")}
          className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus size={18} />
          Create Note
        </button>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b border-slate-200">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
          />
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeNav === item.id}
              onClick={() => {
                if (item.id === "files") {
                  setActiveNav(item.id);
                  handleFileClick();
                } else if (item.id === "calendar") {
                  setActiveNav(item.id);
                  handleCalendarClick();
                } else {
                  handleNavigation(item.path, item.id);
                }
              }}
            />
          ))}

          {/* Show calendar date/time when available */}
          {calendarText && (
            <div className="mt-3 px-3 py-2 text-xs text-slate-600 bg-slate-50 rounded">
              {calendarText}
            </div>
          )}
        </div>

        {/* Notebooks Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Notebooks
            </span>
          </div>
          <div className="space-y-1">
            {NOTEBOOKS.map((notebook) => (
              <NavItem
                key={notebook.id}
                icon={notebook.icon}
                label={notebook.label}
                nested
                onClick={() => navigate(notebook.path)}
              />
            ))}
            <NavItem
              icon={Plus}
              label="New Notebook"
              nested
              className="text-emerald-600 hover:bg-emerald-50"
            />
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1 mb-6">
          {SECONDARY_NAV.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>

        {/* Save Options Section */}
        <div className="mb-4 pt-4 border-t border-slate-200">
          <button
            onClick={() => setShowSaveOptions(!showSaveOptions)}
            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-100 rounded-lg text-sm font-semibold text-slate-700 transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <Save size={18} className="text-slate-600" />
              <span>Save As</span>
            </div>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 text-slate-400 ${
                showSaveOptions ? "rotate-180" : ""
              }`}
            />
          </button>

          {showSaveOptions && (
            <div className="mt-2 ml-4 space-y-1">
              {SAVE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSaveOption(option)}
                  className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-${option.color}-50 rounded-lg text-sm font-medium text-slate-700 transition-all duration-200`}
                >
                  <option.icon
                    size={16}
                    className={`text-${option.color}-600`}
                  />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Notes Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/dashboard/library")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Eye size={18} />
            <span>View Library</span>
          </button>
        </div>

        {/* More Options */}
        <div className="pt-4 border-t border-slate-200">
          <NavItem
            icon={MoreHorizontal}
            label="More"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </nav>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-slate-200">
        <button className="w-full bg-linear-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-900 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg">
          <Star size={18} />
          Upgrade to Pro
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
