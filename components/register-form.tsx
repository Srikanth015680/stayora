
"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";

type RegisterFormProps = {
  action: (formData: FormData) => Promise<void>;
};

function RegisterSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-brand-500 px-4 py-2.5 font-semibold text-white hover:bg-brand-600 disabled:opacity-70"
    >
      {pending ? "Creating your account..." : "Create account"}
    </button>
  );
}

export function RegisterForm({ action }: RegisterFormProps) {
  const [googleLoading, setGoogleLoading] = useState(false);

  return (
    <>
      <form action={action} className="mt-5 space-y-3">
        <input
          name="name"
          required
          placeholder="Full name"
          className="w-full rounded-xl border border-ink-300 px-3.5 py-2.5 text-ink-800 outline-none ring-brand-300 focus:ring-2"
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Work or personal email"
          className="w-full rounded-xl border border-ink-300 px-3.5 py-2.5 text-ink-800 outline-none ring-brand-300 focus:ring-2"
        />

        <input
          name="password"
          type="password"
          minLength={8}
          required
          placeholder="Password (minimum 8 characters)"
          className="w-full rounded-xl border border-ink-300 px-3.5 py-2.5 text-ink-800 outline-none ring-brand-300 focus:ring-2"
        />

        <RegisterSubmitButton />
      </form>

      <button
        type="button"
        disabled={googleLoading}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-ink-300 px-4 py-2.5 font-semibold text-ink-700 hover:bg-ink-100 disabled:opacity-70"
        onClick={async () => {
          setGoogleLoading(true);
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
          />
          <path
            fill="#34A853"
            d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
          />
          <path
            fill="#FBBC05"
            d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
          />
          <path
            fill="#EA4335"
            d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.9 6.1-8.5 11.4-8.5Z"
          />
        </svg>

        {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
      </button>
    </>
  );
}
