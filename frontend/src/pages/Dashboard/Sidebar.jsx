  import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import * as notesService from "../../services/notesService";

const Sidebar = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    let timeoutId;
    
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const resp = await notesService.getPublicNotes();
        if (mounted && resp && resp.notes) {
          setNotes(resp.notes.slice(0, 5));
        }
      } catch (err) {
        if (mounted) {
          console.error("Failed to load sidebar notes:", err);
          // Don't show error for rate limiting in sidebar (it's not critical)
          if (err.response?.status !== 429) {
            setError("Failed to load feed");
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    
    // Small delay to prevent simultaneous requests with Feed component
    timeoutId = setTimeout(load, 100);
    
    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const topics = [
    "Self Improvement",
    "Machine Learning",
    "Writing",
    "Relationships",
    "Politics",
    "Productivity",
  ];

  return (
    <aside className="space-y-8 sticky top-4">
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500 text-sm" /> From the feed
        </h2>

        {loading ? (
          <div className="text-sm text-gray-500">Loading feed…</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : (
          <ul className="space-y-4">
            {notes.map((n) => (
              <li
                key={n._id}
                className="pb-3 border-b border-gray-100 last:border-none"
              >
                <Link
                  to={`/notes/${n.slug}`}
                  className="block text-sm text-gray-900 font-medium hover:text-gray-700 transition mb-1 leading-snug"
                >
                  {n.title}
                </Link>
                <p className="text-xs text-gray-500">
                  <span className="font-medium">
                    {n.author?.name || "Unknown"}
                  </span>{" "}
                  ·{" "}
                  {new Date(n.publishedAt || n.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/dashboard"
          className="inline-block mt-3 text-sm font-medium text-green-700 hover:text-green-800"
        >
          See the full list
        </Link>
      </section>

      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Recommended topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <button
              key={index}
              className="px-4 py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition"
            >
              {topic}
            </button>
          ))}
        </div>
        <button className="inline-block mt-4 text-sm font-medium text-green-700 hover:text-green-800">
          See more topics
        </button>
      </section>

      <section>
        <button className="text-sm text-green-700 hover:text-green-800 font-medium">
          Write to follow
        </button>
      </section>
    </aside>
  );
};

export default Sidebar;
