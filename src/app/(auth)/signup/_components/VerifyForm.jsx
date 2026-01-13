import { KeyRound, ArrowLeft, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";

export default function VerifyForm({
  email,
  otp,
  setOtp,
  onSubmit,
  onResend,
  isLoading,
  timer,
  onBack,
}) {
  return (
    <>
      <div className="mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-[10px] text-muted-foreground hover:text-foreground uppercase font-mono mb-4"
        >
          <ArrowLeft size={12} className="mr-2" /> Return_To_Config
        </button>
        <Header title="Secure_Handshake" subtitle="Verification" />
      </div>

      <p className="text-[11px] text-muted-foreground font-mono bg-card/50 p-4 rounded-2xl mb-6 border border-border">
        Key sent to <span className="text-nexus-accent">{email}</span>. Input
        sequence to finalize node connection.
      </p>

      <form onSubmit={onSubmit} className="flex-1 space-y-4">
        <div className="p-4 rounded-2xl border bg-card border-border group-focus-within:border-nexus-accent/40 focus-within:ring-1 focus-within:ring-nexus-accent/20">
          <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block mb-2">
            Protocol_Key
          </label>
          <div className="relative">
            <KeyRound className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              maxLength={6}
              value={otp}
              placeholder="XXX-XXX"
              className="w-full bg-transparent pl-8 pr-2 py-1 text-lg tracking-[0.5em] focus:outline-none text-foreground font-mono uppercase"
              onChange={(e) =>
                /^\d*$/.test(e.target.value) && setOtp(e.target.value)
              }
              required
            />
          </div>
        </div>

        <Button
          disabled={isLoading}
          className="w-full bg-nexus-accent text-black rounded-2xl h-14 font-black uppercase text-[12px] tracking-widest mt-2 group"
        >
          {isLoading ? "Verifying..." : "Establish_Connection"}
          <Lock
            size={16}
            className="ml-2 group-hover:scale-110 transition-transform"
          />
        </Button>

        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={onResend}
            disabled={timer > 0 || isLoading}
            className={`flex items-center text-[10px] font-mono uppercase tracking-widest ${
              timer > 0
                ? "text-muted-foreground cursor-wait"
                : "text-nexus-accent hover:text-nexus-accent/80"
            }`}
          >
            <RefreshCw
              size={12}
              className={`mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            {timer > 0
              ? `Resync_Available_In_${timer}s`
              : "Resend_Protocol_Key"}
          </button>
        </div>
      </form>
    </>
  );
}
