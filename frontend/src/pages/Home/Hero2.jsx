import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero2 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  const sections = [
    {
      id: 1,
      title: "Capture tasks at the speed of thought",
      subtitle: "Clear your mind",
      description:
        "We've spent over a decade refining Todoist to be an extension of your mind. Capture and organize tasks instantly using easy-flowing, natural language.",
      image: "/first.gif",
    },
    {
      id: 2,
      title: "Stay organized and focused",
      subtitle: "Focus on what's important",
      description:
        "Keep track of every detail effortlessly. Prioritize what matters most and achieve your goals step by step with clarity and confidence.",
      image: "/second.gif",
    },
    {
      id: 3,
      title: "Collaborate effortlessly",
      subtitle: "Work together seamlessly",
      description:
        "Share projects, assign tasks, and keep everyone on the same page. Todoist makes teamwork simple and efficient, no matter where you are.",
      image: "/third.gif",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollPosition = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const sectionHeight = window.innerHeight;

      const relativeScroll = scrollPosition - containerTop;
      const currentSection = Math.floor(relativeScroll / sectionHeight);

      setActiveSection(
        Math.max(0, Math.min(currentSection, sections.length - 1))
      );
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-linear-to-b from-white to-gray-50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Sticky Content */}
        <div className="lg:sticky lg:top-0 h-screen flex items-center justify-center bg-white border-r border-gray-100">
          <div className="px-6 sm:px-12 md:px-16 lg:px-20 max-w-xl">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Subtitle Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block mb-4"
              >
                <span className="bg-amber-50 text-amber-700 font-semibold text-xs sm:text-sm px-4 py-2 rounded-full border border-amber-200">
                  {sections[activeSection].subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
              >
                {sections[activeSection].title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-600 text-base sm:text-lg leading-relaxed"
              >
                {sections[activeSection].description}
              </motion.p>

              {/* Progress Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex gap-2 mt-8"
              >
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === activeSection
                        ? "bg-amber-600 w-12"
                        : "bg-gray-200 w-8"
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Scrolling Images */}
        <div className="bg-gray-50">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="h-screen flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full h-full max-w-2xl"
              >
                {/* Decorative background blob */}
                <div className="absolute -inset-4 bg-linear-to-br from-amber-100 to-orange-100 rounded-3xl blur-2xl opacity-30" />

                {/* Image container */}
                <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero2;
