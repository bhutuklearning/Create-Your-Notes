import React from "react";
import { FaStar } from "react-icons/fa";

const Sidebar = () => {
  const staffPicks = [
    {
      title: "Can't believe I'm just a dateline to my friends.",
      author: "Jael Holtzman",
      date: "Oct 26",
    },
    {
      title: "I Bought a Witches' Prison",
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
    <aside className="space-y-8 sticky top-4">
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500 text-sm" /> Staff Picks
        </h2>

        <ul className="space-y-4">
          {staffPicks.map((pick, index) => (
            <li
              key={index}
              className="pb-3 border-b border-gray-100 last:border-none"
            >
              <a
                href="#"
                className="block text-sm text-gray-900 font-medium hover:text-gray-700 transition mb-1 leading-snug"
              >
                {pick.title}
              </a>
              <p className="text-xs text-gray-500">
                <span className="font-medium">{pick.author}</span> · {pick.date}
              </p>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="inline-block mt-3 text-sm font-medium text-green-700 hover:text-green-800"
        >
          See the full list
        </a>
      </section>

      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Recommended topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <a
              key={index}
              href="#"
              className="px-4 py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition"
            >
              {topic}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="inline-block mt-4 text-sm font-medium text-green-700 hover:text-green-800"
        >
          See more topics
        </a>
      </section>

      <section>
        <a
          href="#"
          className="text-sm text-green-700 hover:text-green-800 font-medium"
        >
          Write to follow
        </a>
      </section>
    </aside>
  );
};

export default Sidebar;
