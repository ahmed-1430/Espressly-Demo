"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { enquiryTypes } from "@/config/contact";
import type { EnquiryType } from "@/config/contact";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";

type Status = "idle" | "loading" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact form.
 *
 * A complete request lifecycle (idle → loading → success | error) with client
 * validation and accessible error wiring. The submit is a stub for the future
 * API — swap `submitEnquiry` for the real call and the UI states already work.
 */
export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    type: "" as EnquiryType | "",
    message: "",
  });

  const update = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!EMAIL.test(values.email.trim()))
      next.email = "Enter an email address we can reply to.";
    if (values.message.trim().length < 12)
      next.message = "A sentence or two is plenty — just enough for us to help.";
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      // Move focus to the first invalid control for keyboard and screen-reader users.
      const firstKey = (["name", "email", "message"] as const).find((key) => found[key]);
      if (firstKey) document.getElementById(`${uid}-${firstKey}`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      // Replace with the real endpoint when available. No third-party service
      // is contacted from the client and no data leaves the browser yet.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setValues({ name: "", email: "", type: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={`${uid}-name`}
          label="Your name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Maeve Donnelly"
        />
        <TextField
          id={`${uid}-email`}
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <SelectField
        id={`${uid}-type`}
        label="What is this about?"
        name="type"
        placeholder="Choose one"
        value={values.type}
        onChange={(event) => update("type", event.target.value)}
        options={enquiryTypes.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
        hint="Optional — it helps us route the message to the right person."
      />

      <TextAreaField
        id={`${uid}-message`}
        label="Message"
        name="message"
        required
        rows={6}
        value={values.message}
        error={errors.message}
        onChange={(event) => update("message", event.target.value)}
        placeholder="Tell us what you are trying to do and we will tell you honestly whether we are the right people for it."
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "loading" || status === "success"} arrow>
          {status === "loading"
            ? "Sending…"
            : status === "success"
              ? "Message sent"
              : "Send the message"}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-[0.8125rem]",
            status === "error" ? "text-clay-500" : "text-text-muted",
          )}
        >
          {status === "success"
            ? "Thank you — we reply within one working day."
            : status === "error"
              ? "Something needs another look. The fields above will tell you what."
              : "We reply within one working day, usually sooner."}
        </p>
      </div>

      <p className="text-[0.75rem] leading-relaxed text-text-muted">
        This form runs entirely in the browser for now — nothing is transmitted
        yet. Until it is connected to a mail service, please email{" "}
        <a href="mailto:hello@espressly.coffee" className="link-wipe">
          hello@espressly.coffee
        </a>
        .
      </p>
    </form>
  );
}