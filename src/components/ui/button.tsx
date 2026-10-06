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
  /** Fills the button from the bottom on hover. */
  wipe?: boolean;
  fullWidth?: boolean;
};

const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-pill font-mono text-eyebrow uppercase leading-none tracking-[0.14em] transition-[color,border-color,background-color] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-6",
  lg: "h-14 px-8",
};

const variants: Record<ButtonVariant, string> = {
  solid:
    "border border-ink-900 bg-ink-900 text-paper-25 hover:border-copper-500 hover:bg-copper-500 hover:text-paper-25",
  outline:
    "border border-ink-900/30 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-25",
  ghost: "border border-transparent text-ink-900 hover:border-ink-900/20",
  inverse:
    "border border-cream-100/35 text-cream-100 hover:border-copper-400 hover:bg-copper-500 hover:text-paper-25",
  link: "h-auto rounded-none px-0 text-ink-900",
};

function Wipe({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 -z-behind origin-bottom scale-y-0 bg-copper-500 transition-transform duration-700 ease-out-expo group-hover/btn:scale-y-100",
        className,
      )}
    />
  );
}

/** Trailing arrow that steps forward and up on hover. */
function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={cn(
        "size-3.5 shrink-0 transition-transform duration-500 ease-out-expo group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5",
        className,
      )}
    >
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
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
          "relative z-raised inline-flex items-center gap-2.5",
          wipe && variant === "outline" && "group-hover/btn:text-paper-25",
          wipe && variant === "ghost" && "group-hover/btn:text-paper-25",
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
          "relative z-raised inline-flex items-center gap-2.5",
          wipe && variant === "outline" && "group-hover/btn:text-paper-25",
          wipe && variant === "ghost" && "group-hover/btn:text-paper-25",
        )}
      >
        {children}
        {arrow ? <Arrow /> : null}
      </span>
    </button>
  );
}
