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

/* Reference button: 12px, .15em tracking, weight 600, uppercase, padding
   19px 35px, transitioning colour and background over .3s. Corners are square
   rather than pill, which is most of what separates the reference's buttons
   from a modern SaaS pill. */
const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-3 rounded-none font-sans text-[12px] font-semibold uppercase leading-[1.15] tracking-[0.15em] transition-[color,background-color,border-color,opacity] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<ButtonSize, string> = {
  sm: "h-[46px] px-[26px]",
  md: "h-[52px] px-[35px]",
  lg: "h-[58px] px-[40px]",
};

const variants: Record<ButtonVariant, string> = {
  solid:
    "bg-copper-500 text-white hover:bg-copper-600 focus-visible:outline-offset-4",
  outline:
    "border border-ink-900/30 text-ink-900 hover:border-copper-500 hover:bg-copper-500 hover:text-white",
  ghost: "text-ink-900 hover:bg-ink-900/[0.05]",
  inverse:
    "border border-cream-100/40 text-cream-100 hover:border-copper-500 hover:bg-copper-500 hover:text-white",
  link: "h-auto rounded-none px-0 text-ink-900",
};

function Wipe({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 z-base origin-bottom scale-y-0 bg-ink-900 transition-transform duration-700 ease-out-expo group-hover/btn:scale-y-100",
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
        "h-[0.9em] w-[0.9em] transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1",
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