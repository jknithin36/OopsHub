import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";
import { z } from "zod";

// const signInSchema = z.object({
//   email: z.string().email({ message: "Enter a valid email" }),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters" }),
// });

export function SignInCard() {
  const { mutate } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };

  return (
    <div className="w-full max-w-xl bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 rounded-2xl p-8 sm:p-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Log in to pick up where you left off and keep things moving.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    className="h-11 text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-11 pr-10 text-sm"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-11 text-sm">
            Sign In
          </Button>
        </form>
      </Form>

      <div className="mt-8 space-y-3">
        <Button
          variant="outline"
          className="w-full h-11 text-sm flex gap-2 justify-center"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full h-11 text-sm flex gap-2 justify-center"
        >
          <FaGithub className="text-xl" /> Continue with GitHub
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-6">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
      <p className="text-sm text-center text-muted-foreground mt-2">
        Don’t have an account?{" "}
        <Link href="/sign-up" className="underline hover:text-primary">
          Sign up
        </Link>
      </p>
    </div>
  );
}
