"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FormField } from "@/components/common/form";
import { Button } from "@/components/common/button";
import { AuthService } from "@/services/auth.service";
import type { ErrorApiResponse } from "@/types/api.type";

// `admin/page.tsx` already exists, so this won't 404. Repoint at the
// nominations route once that page lands.
const POST_LOGIN_REDIRECT = "/admin";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mirrors the old auth-guard.js: skip the login screen if already signed in.
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
      router.replace(POST_LOGIN_REDIRECT);
    }
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await AuthService.adminLogin({
        email: email.trim(),
        password: password.trim(),
      });

      if (!response || !("data" in response) || !response.data) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      const { access_token, refresh_token } = response.data.token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      router.push(POST_LOGIN_REDIRECT);
    } catch (err) {
      const apiError = err as Partial<ErrorApiResponse> & {
        message?: string;
        error?: string;
      };
      setError(
        apiError?.message ??
          apiError?.error ??
          "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-6">
      <article className="flex w-full max-w-[480px] flex-col gap-6 rounded-lg bg-white p-8 shadow">
        <Link href="/" className="w-fit">
          <Image
            src="/images/logo.png"
            alt="Luminary"
            width={108}
            height={32}
            priority
          />
        </Link>

        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted">
            Sign in to your Luminary account to continue.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <FormField
            label="Email address"
            htmlFor="login-email"
            name="email"
            type="email"
            required
            placeholder="ada.lovelace@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputClassName="rounded-md"
          />

          <div className="relative">
            <FormField
              label="Password"
              htmlFor="auth-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputClassName="rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute bottom-0 right-3 flex h-10 items-center text-muted transition-colors hover:text-primary"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {error && (
            <p role="alert" aria-live="polite" className="text-sm text-warning">
              {error}
            </p>
          )}

          <Button
            type="submit"
            text="Sign In"
            loading={loading}
            disabled={loading}
            className="w-full justify-center"
          />
        </form>
      </article>
    </main>
  );
}

/* Inline icons replace the old Font Awesome CDN kit. */

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}