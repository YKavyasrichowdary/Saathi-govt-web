"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthLogo from "@/components/auth/AuthLogo";
import AuthHeader from "@/components/auth/AuthHeader";
import OTPInput from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  async function verifyOTP() {
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Email verified successfully! Signing you in...");

      // Auto sign-in and redirect to onboarding
      const storedPw = sessionStorage.getItem("saathi_signup_pw") || "";
      sessionStorage.removeItem("saathi_signup_pw");

      if (storedPw) {
        const signInRes = await signIn("credentials", {
          redirect: false,
          email,
          password: storedPw,
        });

        if (signInRes?.ok) {
          router.push("/onboarding");
          router.refresh();
          return;
        }
      }

      // Fallback: if auto-signin fails or no stored password, go to signin page
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function resendOTP() {
    try {
      setResending(true);

      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("A new OTP has been sent.");
      setSeconds(60);
    } catch {
      toast.error("Unable to resend OTP.");
    } finally {
      setResending(false);
    }
  }

  return (
    <>
      <AuthHeader
        title="Verify your email"
        subtitle={`Enter the 6-digit OTP sent to ${email}`}
      />

      <div className="space-y-8">
        <OTPInput value={otp} onChange={setOtp} />

        <Button
          onClick={verifyOTP}
          disabled={loading}
          className="w-full h-11 rounded-full text-white"
          style={{
            background: "var(--gradient-primary)",
          }}
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Verify Email"
          )}
        </Button>

        <div className="text-center">
          {seconds > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend OTP in <span className="font-semibold">{seconds}s</span>
            </p>
          ) : (
            <Button variant="link" disabled={resending} onClick={resendOTP}>
              {resending ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Resend OTP"
              )}
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.push("/auth/signin")}
        >
          Back to Sign In
        </Button>
      </div>
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <AuthLogo />
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
            <p className="text-sm text-muted-foreground">Loading verification...</p>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </AuthLayout>
  );
}