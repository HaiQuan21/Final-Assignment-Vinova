import { useState, type ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
  defaultIndex?: number;
}

function TabBar({ tabs, defaultIndex = 0 }: TabBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "text-[#3A0099]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
              {/* Active indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#3A0099]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="pt-4">{tabs[activeIndex]?.content}</div>
    </div>
  );
}

export default TabBar;