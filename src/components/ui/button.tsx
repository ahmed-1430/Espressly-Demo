import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "solid" | "outline" | "ghost" | "inverse" | "link";
export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Renders a rule that wipes in from the left on hover. */
  wipe?: boolean;
  fullWidth?: boolean;
};

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-3 rounded-pill font-sans font-medium tracking-[0.02em] transition-[color,background-color,border-color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-meta",
  md: "h-12 px-7 text-body-sm",
  lg: "h-14 px-9 text-body",
};

const variants: Record<ButtonVariant, string> = {
  solid:
    "bg-copper-600 text-paper-25 hover:bg-copper-700 focus-visible:outline-offset-4",
  outline:
    "border border-ink-900/25 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/[0.04]",
  ghost: "text-ink-900 hover:bg-ink-900/[0.05]",
  inverse:
    "border border-cream-100/35 text-cream-100 hover:border-cream-100 hover:bg-cream-100/10",
  link: "h-auto rounded-none px-0 text-ink-900",
};

function Wipe({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 z-base origin-bottom scale-y-0 rounded-pill bg-ink-900 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-y-100",
        className,
      )}
    />
  );
}

/** Trailing arrow that nudges forward on hover — the only "lively" button cue. */
function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      className={cn(
        "h-[0.9em] w-[0.9em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1",
        className,
      )}
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ButtonAsLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    arrow?: boolean;
  };

/**
 * Anchor-styled button. Kept as a separate export (rather than one polymorphic
 * component) so TypeScript can check `href` vs `type` at every call site.
 */
export function ButtonLink({
  children,
  variant = "solid",
  size = "md",
  className,
  wipe = false,
  fullWidth,
  arrow = false,
  ...rest
}: ButtonAsLinkProps) {
  return (
    <Link
      {...rest}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        wipe && "isolate",
        fullWidth && "w-full",
        className,
      )}
    >
      {wipe && variant !== "link" ? <Wipe /> : null}
      <span
        className={cn(
          "relative z-raised inline-flex items-center gap-3",
          wipe && variant === "outline" && "group-hover/btn:text-cream-100",
        )}
      >
        {children}
        {arrow ? <Arrow /> : null}
      </span>
    </Link>
  );
}

type NativeButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    arrow?: boolean;
  };

export function Button({
  children,
  variant = "solid",
  size = "md",
  className,
  wipe = false,
  fullWidth,
  arrow = false,
  type = "button",
  ...rest
}: NativeButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        wipe && "isolate",
        fullWidth && "w-full",
        className,
      )}
    >
      {wipe && variant !== "link" ? <Wipe /> : null}
      <span
        className={cn(
          "relative z-raised inline-flex items-center gap-3",
          wipe && variant === "outline" && "group-hover/btn:text-cream-100",
        )}
      >
        {children}
        {arrow ? <Arrow /> : null}
      </span>
    </button>
  );
}