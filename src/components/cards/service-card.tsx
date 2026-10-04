import Link from "next/link";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Service } from "@/config/services";
import { cn } from "@/lib/cn";

type ServiceCardProps = {
  service: Service;
  variant?: "wide" | "compact";
  className?: string;
};

/**
 * Service card.
 *
 * `wide` uses an asymmetric editorial split with an oversized index; `compact`
 * is the dense two-up treatment used further down the page.
 */
export function ServiceCard({ service, variant = "wide", className }: ServiceCardProps) {
  const wide = variant === "wide";

  return (
    <StaggerItem
      as="article"
      id={service.id}
      className={cn(
        "group/service relative flex scroll-mt-28",
        wide
          ? "flex-col border-t border-line-light pt-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:pt-10"
          : "flex-col border border-line-light bg-paper-25 p-5",
        className,
      )}
    >
      <div className={cn(wide ? "lg:col-span-5" : "")}>
        <div className="flex items-baseline gap-4">
          <span className="font-sans text-caption tabular-nums tracking-[0.2em] text-copper-700">
            {service.index}
          </span>
          <span aria-hidden className="h-px flex-1 bg-line-light" />
        </div>

        <h3
          className={cn(
            "mt-5 leading-tight display-type text-ink-900",
            wide ? "text-title-2xl sm:text-title-3xl" : "text-title-md",
          )}
        >
          {service.title}
        </h3>

        <p className="mt-2 text-caption uppercase tracking-[0.18em] text-text-muted">
          {service.kicker}
        </p>

        <p
          className={cn(
            "mt-5 leading-relaxed text-text-body",
            wide ? "max-w-[46ch] text-body" : "text-body-sm",
          )}
        >
          {service.summary}
        </p>

        {wide ? (
          <p className="mt-4 max-w-[52ch] text-body-sm leading-relaxed text-text-muted">
            {service.body}
          </p>
        ) : null}

        <ul className={cn("grid gap-2 text-meta text-text-body", wide ? "mt-7 sm:grid-cols-2" : "mt-5")}>
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                className="mt-1 size-3.5 shrink-0 text-copper-600"
              >
                <path d="m4 12.5 5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={cn(
            "mt-7 inline-flex items-center gap-2 text-caption uppercase tracking-[0.18em] text-ink-900",
          )}
        >
          <span className="link-wipe">Enquire about {service.title.toLowerCase()}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            className="size-3.5 transition-transform duration-500 ease-out-expo group-hover/service:translate-x-1"
          >
            <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className={cn(wide ? "mt-8 lg:col-span-7 lg:mt-0" : "mt-6")}>
        <ImageReveal
          image={service.image}
          from={wide ? "right" : "up"}
          ratio={wide ? "4 / 3" : "1 / 1"}
          sizes={
            wide
              ? "(min-width: 1024px) 56vw, 92vw"
              : "(min-width: 768px) 45vw, 92vw"
          }
          className="w-full"
        />

        {service.stat ? (
          <div className="mt-4 flex items-baseline gap-3 border-t border-line-light pt-4">
            <span className="text-title-lg display-type tabular-nums text-ink-900">
              {service.stat.value}
            </span>
            <span className="text-caption uppercase tracking-[0.18em] text-text-muted">
              {service.stat.label}
            </span>
          </div>
        ) : null}
      </div>
    </StaggerItem>
  );
}

export function ServiceGrid({
  services,
  className,
}: {
  services: readonly Service[];
  className?: string;
}) {
  return (
    <Stagger className={cn("flex flex-col gap-14 lg:gap-20", className)} step={0.06}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} variant="wide" />
      ))}
    </Stagger>
  );
}