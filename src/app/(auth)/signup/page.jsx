"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import RegisterForm from "./_components/RegisterForm";
import VerifyForm from "./_components/VerifyForm";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState("register");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const { signup, verifyOTP, isLoading, error, needsVerification } =
    useAuthStore();

  useEffect(() => {
    if (needsVerification) {
      setStep("verify");
    }
  }, [needsVerification]);

  // Timer logic managed here to persist even if forms re-render
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      setStep("verify");
      setTimer(60);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const result = await verifyOTP(formData.email, otp);
    if (result.success) router.push("/");
  };

  return (
    <div className="flex flex-col h-full w-full max-w-105 mx-auto justify-between relative overflow-hidden">
      {/* Global Error Banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-3 mb-4 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-red-400 font-mono uppercase">
            {error}
          </span>
        </div>
      )}

      {step === "register" ? (
        <RegisterForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleRegister}
          isLoading={isLoading}
        />
      ) : (
        <VerifyForm
          email={formData.email}
          otp={otp}
          setOtp={setOtp}
          onSubmit={handleVerify}
          onResend={handleRegister} // Re-using register logic for resend
          isLoading={isLoading}
          timer={timer}
          onBack={() => setStep("register")}
        />
      )}
    </div>
  );
}
