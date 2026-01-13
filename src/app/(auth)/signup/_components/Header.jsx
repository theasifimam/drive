const Header = ({ title, subtitle }) => (
  <div className="mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
    <div className="flex items-center gap-2 mb-2">
      <div className="h-0.5 w-8 bg-nexus-accent" />
      <span className="text-[10px] font-mono text-nexus-accent uppercase tracking-[0.3em]">
        Module: {subtitle}
      </span>
    </div>
    <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter italic">
      {title}
    </h2>
  </div>
);
export default Header;
