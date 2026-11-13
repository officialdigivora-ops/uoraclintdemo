import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(160),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(1000),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;
const field = "w-full bg-soft border border-line px-4 text-base outline-none focus:border-gold placeholder:text-muted-foreground";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const r = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    // No backend connected yet — enquiries are logged locally.
    console.info("UORA enquiry", r.data);
    toast.success("Enquiry sent ✦", { description: "We'll get back to you within 24 hours." });
    form.reset();
  };
  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {(["name", "email"] as const).map((n) => (
        <div key={n}>
          <label htmlFor={n} className="eyebrow block mb-2">{n === "name" ? "Your Name" : "Email Address"}</label>
          <input id={n} name={n} type={n === "email" ? "email" : "text"} className={`${field} h-12`} aria-invalid={!!errors[n]} />
          {errors[n] && <p className="text-xs text-destructive mt-1.5">{errors[n]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="eyebrow block mb-2">Message</label>
        <textarea id="message" name="message" rows={5} className={`${field} py-3`} aria-invalid={!!errors.message} />
        {errors.message && <p className="text-xs text-destructive mt-1.5">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full sm:w-auto">Send Enquiry</Button>
    </form>
  );
}
