"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/config";
import { toast } from "sonner";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = "idle" | "sending" | "success";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof values>>({});

  const handleChange = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const validate = useCallback(() => {
    const next: Partial<typeof values> = {};
    if (!values.name.trim()) next.name = "Please tell me your name.";
    if (!values.email.trim()) next.email = "An email address is required.";
    else if (!EMAIL_PATTERN.test(values.email.trim()))
      next.email = "That email address doesn't look right.";
    if (!values.subject.trim()) next.subject = "A subject helps me spot your note.";
    if (values.message.trim().length < 10)
      next.message = "A little more detail helps (10+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [values]);

  const handleSubmitForm = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!validate()) return;

      setState("sending");
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
          }),
        });

        const result = (await response.json()) as {
          ok: boolean;
          error?: string;
        };

        if (!response.ok || !result.ok) {
          setState("idle");
          toast.error(result.error ?? "Something went wrong sending your message.", {
            description:
              response.status === 501
                ? "Add RESEND_API_KEY to your environment to enable the form."
                : "Please try again in a moment.",
          });
          return;
        }

        setState("success");
      } catch {
        setState("idle");
        toast.error("Something went wrong sending your message.", {
          description: "Please try again in a moment.",
        });
      }
    },
    [values, validate],
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 240 }}
            className="flex flex-col items-center rounded-3xl border bg-card px-6 py-16 text-center shadow-sm"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-foreground text-background"
            >
              <CheckCircle2 className="h-8 w-8" />
            </motion.span>
            <h3 className="font-display mt-6 text-2xl font-semibold">
              Message sent — thank you!
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              I read every message and reply as fast as I can. If it&apos;s urgent,
              reach me directly at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
            <Button
              variant="outline"
              className="mt-8"
              onClick={() => {
                setState("idle");
                setValues({ name: "", email: "", subject: "", message: "" });
              }}
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmitForm}
            noValidate
            className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={values.name}
                  onChange={handleChange("name")}
                  className="mt-1.5"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name ? (
                  <p id="contact-name-error" className="mt-1 text-xs text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  value={values.email}
                  onChange={handleChange("email")}
                  className="mt-1.5"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email ? (
                  <p id="contact-email-error" className="mt-1 text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="contact-subject">Subject</Label>
              <Input
                id="contact-subject"
                placeholder="Let's build something together"
                value={values.subject}
                onChange={handleChange("subject")}
                className="mt-1.5"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "contact-subject-error" : undefined}
              />
              {errors.subject ? (
                <p id="contact-subject-error" className="mt-1 text-xs text-destructive">
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div className="mt-5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                placeholder="Tell me about the project, role, or idea…"
                value={values.message}
                onChange={handleChange("message")}
                className="mt-1.5 min-h-[140px]"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message ? (
                <p id="contact-message-error" className="mt-1 text-xs text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              size="lg"
              variant="gradient"
              className="mt-7 w-full sm:w-auto"
              disabled={state === "sending"}
            >
              {state === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t pt-6 text-sm text-muted-foreground">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {SITE.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {SITE.location} · UTC+1
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Replies within 24h
              </span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}