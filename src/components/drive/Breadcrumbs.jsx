// components/drive/Breadcrumbs.tsx
import { HomeIcon, ChevronRightIcon } from "lucide-react";

export default function Breadcrumbs({
  breadcrumbs,
  onHomeClick,
  onBreadcrumbClick,
}) {
  return (
    <nav className="px-8 py-2 bg-[#0A0A0A]">
      <div className="max-w-450 mx-auto">
        <div className="flex items-center gap-1.5 bg-[#111]/50 border border-white/3 px-4 py-2 rounded-2xl w-fit shadow-inner">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-gray-500 hover:text-[#E2FF54] hover:bg-white/3 transition-all group"
          >
            <HomeIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Root_Drive
            </span>
          </button>

          {breadcrumbs.map((crumb, index) => (
            <div
              key={crumb._id}
              className="flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2"
            >
              <ChevronRightIcon className="w-3 h-3 text-gray-700" />
              <button
                onClick={() => onBreadcrumbClick(crumb._id)}
                className={`
                  px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all
                  ${
                    index === breadcrumbs.length - 1
                      ? "text-[#E2FF54] bg-[#E2FF54]/5 border border-[#E2FF54]/20"
                      : "text-gray-400 hover:text-white hover:bg-white/3"
                  }
                `}
              >
                {crumb.name}
              </button>
            </div>
          ))}

          {breadcrumbs.length > 0 && (
            <div className="ml-2 flex gap-1">
              <span className="w-1 h-1 rounded-full bg-[#E2FF54]/40" />
              <span className="w-1 h-1 rounded-full bg-[#E2FF54]/20" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
