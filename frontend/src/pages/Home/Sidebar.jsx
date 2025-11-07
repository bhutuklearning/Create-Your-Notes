import React from "react";
import { FaStar } from "react-icons/fa";

const Sidebar = () => {
  const staffPicks = [
    {
      title: "Can't believe I’m just a dateline to my friends.",
      author: "Jael Holtzman",
      date: "Oct 26",
    },
    {
      title: "I Bought a Witches’ Prison",
      author: "Jeff Maysh",
      date: "Oct 28, 2020",
    },
    {
      title: "Should You Let Your Kid Wear That?",
      author: "Kaitlin Moran",
      date: "Oct 21",
    },
  ];

  const topics = [
    "Self Improvement",
    "Machine Learning",
    "Writing",
    "Relationships",
    "Politics",
    "Productivity",
  ];

  return (
    <aside className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 sticky top-20">
      {/* Staff Picks */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500" /> Staff Picks
        </h2>

        <ul className="space-y-4">
          {staffPicks.map((pick, index) => (
            <li
              key={index}
              className="border-b border-gray-100 pb-2 last:border-none"
            >
              <a
                href="#"
                className="block text-sm text-gray-800 font-medium hover:text-blue-600 transition"
              >
                {pick.title}
              </a>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">{pick.author}</span> — {pick.date}
              </p>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="inline-block mt-3 text-sm font-medium text-blue-600 hover:underline"
        >
          See full list
        </a>
      </section>

      {/* Recommended Topics */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaStar className="text-blue-500" /> Recommended Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <a
              key={index}
              href="#"
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition"
            >
              {topic}
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
