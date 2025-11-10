import React from "react";
import { FileText, Globe, Lock, Eye } from "lucide-react";

const ViewNotes = () => {
  const notes = [
    { id: 1, title: "My First Note", date: "Nov 9, 2025", status: "public" },
    { id: 2, title: "Project Ideas", date: "Nov 8, 2025", status: "private" },
    { id: 3, title: "Meeting Notes", date: "Nov 7, 2025", status: "public" },
    {
      id: 4,
      title: "Personal Thoughts",
      date: "Nov 6, 2025",
      status: "private",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText size={28} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Saved Notes</h2>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="group border border-slate-200 rounded-xl p-4 hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-slate-500">{note.date}</span>
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-slate-100">
                      {note.status === "public" ? (
                        <>
                          <Globe size={12} className="text-blue-600" />
                          <span className="text-slate-700">Public</span>
                        </>
                      ) : (
                        <>
                          <Lock size={12} className="text-purple-600" />
                          <span className="text-slate-700">Private</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-blue-100 rounded-lg">
                  <Eye size={20} className="text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;
