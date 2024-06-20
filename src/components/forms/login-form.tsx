"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { authenticate } from "@/lib/action";
import { useFormState } from "react-dom";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  return (
    <form className="space-y-4" action={formAction}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="m@example.com" required type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="••••••••" required type="password" />
      </div>
      <button
        aria-disabled={isPending}
        className="relative h-12 w-full mx-auto text-center font-geist tracking-tighter  overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
      >
        <span className="relative">Sign In</span>
      </button>
      <div className="text-center text-red-500 dark:text-red-400">
        {errorMessage && (
          <>
            <p>{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
