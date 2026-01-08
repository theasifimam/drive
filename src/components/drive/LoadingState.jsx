// components/drive/LoadingState.tsx
export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-40">
      <div className="w-10 h-10 border-2 border-[#E2FF54]/20 border-t-[#E2FF54] rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
        Syncing_Nodes...
      </p>
    </div>
  );
}
