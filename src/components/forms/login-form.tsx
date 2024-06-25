"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { authenticate } from "@/action/auth-action";

export function LoginForm() {
  const [errorMessage, formAction, pending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form className="space-y-4" action={formAction}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          required
          disabled={pending}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          disabled={pending}
        />
      </div>
      <SubmitButton />
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="relative h-12 w-full mx-auto text-center font-geist tracking-tighter  overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
    >
      {pending ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : null}
      Sign In
    </Button>
  );
}
