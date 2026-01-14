// components/drive/Breadcrumbs.tsx
import { HomeIcon, ChevronRightIcon } from "lucide-react";

export default function Breadcrumbs({
  breadcrumbs,
  onHomeClick,
  onBreadcrumbClick,
}) {
  // Configuration: How many crumbs to show before truncating
  const MAX_CRUMBS = 4;

  // Logic to determine which breadcrumbs to show
  const visibleBreadcrumbs = (() => {
    if (!breadcrumbs || breadcrumbs.length === 0) return [];

    // If within limit, show all
    if (breadcrumbs.length <= MAX_CRUMBS) {
      return breadcrumbs;
    }

    // If too many, show: [First] + [Ellipsis] + [Last Two]
    return [
      breadcrumbs[0],
      { _id: "ellipsis", name: "...", isEllipsis: true },
      ...breadcrumbs.slice(-2), // Take the last 2 items
    ];
  })();

  return (
    <nav className="px-8 py-2 bg-white dark:bg-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-450 mx-auto">
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#111]/50 border border-slate-200 dark:border-white/3 px-4 py-2 rounded-2xl w-fit shadow-inner">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-400 dark:text-gray-500 hover:text-lime-600 dark:hover:text-nexus-accent hover:bg-white dark:hover:bg-white/3 transition-all group"
          >
            <HomeIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Root_Drive
            </span>
          </button>

          {/* Updated Breadcrumbs Map */}
          {visibleBreadcrumbs.map((crumb, index) => {
            // Handle the Ellipsis Rendering
            if (crumb.isEllipsis) {
              return (
                <div
                  key="ellipsis"
                  className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ChevronRightIcon className="w-3 h-3 text-slate-300 dark:text-gray-700" />
                  <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-gray-600 select-none">
                    ...
                  </span>
                </div>
              );
            }

            // Handle Standard Folder Rendering
            const isLast = index === visibleBreadcrumbs.length - 1;

            return (
              <div
                key={crumb?._id || `crumb-${index}`}
                className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ChevronRightIcon className="w-3 h-3 text-slate-300 dark:text-gray-700" />
                <button
                  onClick={() => onBreadcrumbClick(crumb?._id)}
                  className={`
                    px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all
                    ${
                      isLast
                        ? "text-nexus-text dark:text-nexus-accent bg-nexus-accent/10 dark:bg-nexus-accent/5 border border-nexus-accent/20"
                        : "text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/3"
                    }
                  `}
                >
                  {crumb?.name || "Loading..."}
                </button>
              </div>
            );
          })}

          {/* Status dots at the end */}
          {breadcrumbs.length > 0 && (
            <div className="ml-2 flex gap-1">
              <span className="w-1 h-1 rounded-full bg-lime-500/40 dark:bg-nexus-accent/40" />
              <span className="w-1 h-1 rounded-full bg-lime-500/20 dark:bg-nexus-accent/20" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
