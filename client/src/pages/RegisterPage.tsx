import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { FormField } from "@/features/auth/components/FormField";
import { useRegister } from "@/features/auth/hooks";
import { registerSchema, type RegisterFormValues } from "@/features/auth/schemas";
import { getApiError } from "@/lib/api";

const FIELDS = ["name", "email", "age", "password"] as const satisfies readonly (keyof RegisterFormValues)[];

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";
  const registerUser = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", age: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const user = await registerUser.mutateAsync(values);
      toast.success(`Welcome to Solveitly, ${user.name}!`);
      navigate(from, { replace: true });
    } catch (error) {
      const apiError = getApiError(error);
      // Show server-side field errors (e.g. duplicate email) next to the right input.
      let handled = false;
      for (const field of FIELDS) {
        const message = apiError.errors?.[field]?.[0];
        if (message) {
          setError(field, { message });
          handled = true;
        }
      }
      if (!handled) setError("root", { message: apiError.message });
    }
  });

  return (
    <AuthLayout
      asideTitle="Learn Anytime, Anywhere"
      asideText="Solveitly offers a seamless e-learning experience with interactive courses, expert instructors, and a vibrant community to help you grow your skills and knowledge."
      title="Create your account"
      subtitle="Join Solveitly and start your learning journey today!"
    >
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <FormField
          id="name"
          label="Name"
          autoComplete="name"
          placeholder="Your full name"
          icon={<User />}
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={<Mail />}
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          id="age"
          label="Age"
          type="number"
          inputMode="numeric"
          min={1}
          max={120}
          placeholder="Your age"
          icon={<CalendarDays />}
          error={errors.age?.message}
          {...register("age")}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          icon={<Lock />}
          error={errors.password?.message}
          {...register("password")}
        />

        {errors.root && (
          <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.root.message}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={registerUser.isPending}>
          {registerUser.isPending && <Spinner />}
          Create account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" state={location.state} className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
