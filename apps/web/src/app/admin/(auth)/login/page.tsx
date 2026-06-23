"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FormField } from "@/components/common/form";
import { Button } from "@/components/common/button";
import { AuthService } from "@/services/auth.service";
import type { ErrorApiResponse } from "@/types/api.type";

const POST_LOGIN_REDIRECT = "/admin";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        return;
      }

      const { access_token, refresh_token } = response.data.token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      router.push(POST_LOGIN_REDIRECT);
    } catch (err) {
      const apiError = err as ErrorApiResponse;
      setError(
        apiError?.message ??
          apiError?.error ??
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-6">
      <article className="flex w-full max-w-[480px] flex-col gap-6 rounded-lg bg-white p-8 shadow">
        <Link href="/" className="w-fit">
          <Image
            src="/images/luminary-black-logo.png"
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
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
