// components/drive/LoadingState.tsx
export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-40 transition-colors duration-500">
      <div className="w-10 h-10 border-2 border-lime-500/20 dark:border-nexus-accent/20 border-t-lime-500 dark:border-t-nexus-accent rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-gray-600">
        Syncing_Nodes...
      </p>
    </div>
  );
}
