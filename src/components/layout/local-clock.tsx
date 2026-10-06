"use client";

import { useEffect, useState } from "react";

/**
 * Live local time in the roastery's timezone.
 *
 * Rendered as a placeholder on the server and filled in after mount, so the
 * markup is identical on both sides of hydration. Updating twice a minute is
 * enough for a clock that only shows hours and minutes.
 */
export function LocalClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-IE", {
        timeZone: "Europe/Dublin",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

    const tick = () => setTime(format());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className}>
      Dublin · <span className="tabular-nums">{time ?? "--:--"}</span>
    </span>
  );
}
