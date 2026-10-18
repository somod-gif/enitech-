"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICES = [
  { value: "website", label: "Professional website / landing page" },
  { value: "ecommerce", label: "E-commerce & online store" },
  { value: "inventory", label: "Inventory, sales & order system" },
  { value: "custom-software", label: "Custom business management software" },
  { value: "ai-automation", label: "AI & WhatsApp automation" },
  { value: "school-platform", label: "School platform (admissions, fees, results)" },
  { value: "mobile-app", label: "Mobile application" },
  { value: "agency-partner", label: "Agency white-label capacity" },
] as const;

const BUDGETS = [
  { value: "starter", label: "Under ₦100,000 — starter" },
  { value: "growth", label: "₦100,000 – ₦250,000 — growth" },
  { value: "custom", label: "₦250,000+ — custom system" },
  { value: "international", label: "International project ($1,000+)" },
  { value: "retainer", label: "Agency retainer capacity" },
] as const;

type Values = {
  name: string;
  email: string;
  service: string;
  budget: string;
  details: string;
};

type FormState = "idle" | "sending" | "success";

export function InquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    service: "",
    budget: "",
    details: "",
  });
  const [errors, setErrors] = useState<Partial<Values>>({});

  const handleChange =
    (field: keyof Values) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    };

  const validate = useCallback(() => {
    const next: Partial<Values> = {};
    if (!values.name.trim()) next.name = "Please tell me your name.";
    if (!values.email.trim()) next.email = "An email address is required.";
    else if (!EMAIL_PATTERN.test(values.email.trim()))
      next.email = "That email address doesn't look right.";
    if (!values.service) next.service = "Pick the closest option.";
    if (values.details.trim().length < 10)
      next.details = "A little more detail helps (10+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!validate()) return;

      const serviceLabel =
        SERVICES.find((option) => option.value === values.service)?.label ??
        values.service;
      const budgetLabel =
        BUDGETS.find((option) => option.value === values.budget)?.label ??
        "Not specified";

      setState("sending");
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            subject: `${serviceLabel} inquiry`,
            message: `Service: ${serviceLabel}\nBudget: ${budgetLabel}\n\n${values.details}`,
          }),
        });

        const result = (await response.json()) as {
          ok: boolean;
          error?: string;
        };

        if (!response.ok || !result.ok) {
          setState("idle");
          toast.error(
            result.error ?? "Something went wrong sending your inquiry.",
            {
              description:
                response.status === 501
                  ? "The form email service isn't configured yet — email us directly instead."
                  : "Please try again in a moment.",
            },
          );
          return;
        }

        setState("success");
      } catch {
        setState("idle");
        toast.error("Something went wrong sending your inquiry.", {
          description: "Please try again in a moment.",
        });
      }
    },
    [values, validate],
  );

  const inputClasses =
    "mt-1.5 rounded-lg font-mono text-sm focus-visible:border-brand";

  return (
    <AnimatePresence mode="wait">
      {state === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", damping: 24, stiffness: 240 }}
          className="flex flex-col items-center rounded-2xl border bg-card px-6 py-16 text-center"
          role="status"
        >
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand-solid text-black">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h3 className="mt-6 text-xl font-bold">Inquiry received!</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            We respond to every serious inquiry within 24 hours — usually with
            next steps and a fixed quote.
          </p>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => {
              setState("idle");
              setValues({
                name: "",
                email: "",
                service: "",
                budget: "",
                details: "",
              });
            }}
          >
            Send another inquiry
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border bg-card p-6 sm:p-8"
          aria-label="Project inquiry form"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="inquiry-name">Your name *</Label>
              <Input
                id="inquiry-name"
                autoComplete="name"
                placeholder="Jane Doe"
                value={values.name}
                onChange={handleChange("name")}
                className={inputClasses}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "inquiry-name-error" : undefined}
              />
              {errors.name ? (
                <p id="inquiry-name-error" className="mt-1 text-xs text-destructive">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="inquiry-email">Email address *</Label>
              <Input
                id="inquiry-email"
                type="email"
                autoComplete="email"
                placeholder="jane@company.com"
                value={values.email}
                onChange={handleChange("email")}
                className={inputClasses}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "inquiry-email-error" : undefined
                }
              />
              {errors.email ? (
                <p
                  id="inquiry-email-error"
                  className="mt-1 text-xs text-destructive"
                >
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="inquiry-service">Required solution *</Label>
              <select
                id="inquiry-service"
                value={values.service}
                onChange={handleChange("service")}
                className={`${inputClasses} w-full border border-input bg-background px-3 py-2`}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={
                  errors.service ? "inquiry-service-error" : undefined
                }
              >
                <option value="">Select primary requirement</option>
                {SERVICES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.service ? (
                <p
                  id="inquiry-service-error"
                  className="mt-1 text-xs text-destructive"
                >
                  {errors.service}
                </p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="inquiry-budget">Estimated budget</Label>
              <select
                id="inquiry-budget"
                value={values.budget}
                onChange={handleChange("budget")}
                className={`${inputClasses} w-full border border-input bg-background px-3 py-2`}
              >
                <option value="">Select a range</option>
                {BUDGETS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <Label htmlFor="inquiry-details">Project details &amp; goals *</Label>
            <Textarea
              id="inquiry-details"
              rows={4}
              placeholder="What do you want to build, and what business outcome should it achieve?"
              value={values.details}
              onChange={handleChange("details")}
              className="mt-1.5 min-h-[120px] font-mono text-sm"
              aria-invalid={Boolean(errors.details)}
              aria-describedby={
                errors.details ? "inquiry-details-error" : undefined
              }
            />
            {errors.details ? (
              <p
                id="inquiry-details-error"
                className="mt-1 text-xs text-destructive"
              >
                {errors.details}
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
                Submitting inquiry…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit inquiry
              </>
            )}
          </Button>

          <p className="mt-5 text-xs text-muted-foreground">
            Replies within 24 hours · Fixed quotes · 50% deposit to start
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
