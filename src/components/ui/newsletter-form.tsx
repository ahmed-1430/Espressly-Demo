"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { cn } from "@/lib/cn";

type SubscribeState = "idle" | "loading" | "success" | "error";

type NewsletterFormProps = {
  className?: string;
  tone?: "dark" | "light";
  /** Compact single-row layout used in the footer. */
  compact?: boolean;
};

/**
 * Newsletter sign-up.
 *
 * The submit handler is a stub for the eventual mailing-list endpoint. It
 * models the full request lifecycle (idle → loading → success / error) so the
 * wiring is a one-line swap once an API exists, and it validates the address
 * before touching that layer.
 */
export function NewsletterForm({
  className,
  tone = "dark",
  compact = false,
}: NewsletterFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubscribeState>("idle");
  const [message, setMessage] = useState("");
  const light = tone === "light";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState("error");
      setMessage("Enter a valid email address so we know where to send it.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      // Replace with the real subscribe endpoint when available.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setState("success");
      setMessage("You are on the list. The next letter lands on the first Tuesday of the month.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Something went wrong on our side. Try again, or email us directly.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("w-full", className)}
      aria-describedby={`${id}-status`}
    >
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>

      <div
        className={cn(
          "flex items-center gap-2 border-b pb-2 transition-colors duration-400",
          compact
            ? "flex-row"
            : "flex-col items-stretch gap-4 sm:flex-row sm:items-center",
          light
            ? "border-cream-100/25 focus-within:border-copper-300"
            : "border-ink-900/20 focus-within:border-copper-600",
        )}
      >
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          disabled={state === "loading" || state === "success"}
          onChange={(event) => {
            setEmail(event.target.value);
            // Editing clears a previous result so the button reflects reality.
            if (status !== "idle" && status !== "loading") setState("idle");
          }}
          className={cn(
            "min-w-0 flex-1 bg-transparent py-2 text-body outline-none placeholder:text-current/40",
            light ? "text-cream-100" : "text-ink-900",
          )}
        />

        <button
          type="submit"
          disabled={state === "loading" || state === "success"}
          className={cn(
            "group relative inline-flex h-11 shrink-0 items-center justify-center overflow-hidden rounded-pill px-6 text-meta font-medium tracking-[0.06em] uppercase transition-colors duration-500 disabled:opacity-70",
            light
              ? "bg-cream-100 text-ink-950 hover:bg-copper-400"
              : "bg-ink-900 text-paper-50 hover:bg-copper-700",
          )}
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            {state === "loading" ? "Joining…" : state === "success" ? "Joined" : "Join"}
            {state !== "success" ? (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
              >
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </span>
        </button>
      </div>

      <p
        id={`${id}-status`}
        aria-live="polite"
        className={cn(
          "mt-3 min-h-[1.25rem] text-meta",
          state === "error"
            ? "text-clay-500"
            : light
              ? "text-cream-100/70"
              : "text-text-muted",
        )}
      >
        {message}
      </p>
    </form>
  );
}