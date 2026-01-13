import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signupFields } from "@/constants/formContants";
import Header from "./Header";

export default function RegisterForm({
  formData,
  setFormData,
  onSubmit,
  isLoading,
}) {
  return (
    <>
      <Header title="Initialize_Node" subtitle="Registration" />
      <form onSubmit={onSubmit} className="flex-1 space-y-4">
        {signupFields.map((field) => (
          <div
            key={field.id}
            className="p-4 rounded-2xl border bg-card border-border group focus-within:ring-1 focus-within:ring-nexus-accent/20"
          >
            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block mb-2">
              {field.label}
            </label>
            <div className="relative">
              <field.icon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-nexus-accent" />
              <input
                type={field.type}
                value={formData[field.id]}
                placeholder={field.placeholder}
                className="w-full bg-transparent pl-8 pr-2 py-1 text-sm focus:outline-none text-foreground font-mono"
                onChange={(e) =>
                  setFormData({ ...formData, [field.id]: e.target.value })
                }
                required
              />
            </div>
          </div>
        ))}
        <Button
          disabled={isLoading}
          className="w-full bg-nexus-accent text-black rounded-2xl h-14 font-black uppercase text-[12px] tracking-widest mt-2 group"
        >
          {isLoading ? "Syncing..." : "Create_New_Node"}
          <ChevronRight
            size={16}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </form>

      <div className="mt-8">
        <Link
          href="/signin"
          className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-2 hover:bg-muted transition-all group"
        >
          <span className="text-[8px] font-mono text-muted-foreground uppercase">
            Existing_User
          </span>
          <span className="text-[10px] font-bold text-foreground uppercase group-hover:text-nexus-accent">
            Login_Secure
          </span>
        </Link>
      </div>
    </>
  );
}
