"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface FormProps {
  type: "login" | "register";
}

interface FormData {
  username?: string;
  email: string;
  password: string;
  [key: string]: unknown;
}

const Form: React.FC<FormProps> = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const sanitizedData = data;
    if (type === "register") {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedData),
        });

        if (res.ok) {
          toast.success("Registration successful!");
          router.push("/");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred during registration");
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...sanitizedData,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-zinc-900">
            {type === "register" ? "Create Account" : "Sign In"}
          </CardTitle>
          <CardDescription className="text-sm text-zinc-600">
            {type === "register"
              ? "Fill in the details to create an account."
              : "Please sign in to access your dashboard."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {type === "register" && (
              <div className="w-full">
                <Input
                  {...register("username", {
                    required: "Username is required",
                    validate: (value: unknown) =>
                      (typeof value === "string" && value.length >= 3) ||
                      "Username must be at least 3 characters long",
                  })}
                  type="text"
                  placeholder="Username"
                  className="w-full"
                />
                {errors.username && (
                  <p className="text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>
            )}
            <div className="w-full">
              <Input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full">
              <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full"
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-zinc-800 text-gray-50 hover:bg-zinc-700"
            >
              {type === "register" ? "Register" : "Login"}
            </Button>
            <div className="text-center">
              {type === "register" ? (
                <Link href="/">
                  <p className="mt-4 text-zinc-600 hover:underline">
                    Already have an account?{" "}
                    <span className="font-medium">Sign in here</span>
                  </p>
                </Link>
              ) : (
                <Link href="/register">
                  <p className="mt-4 text-zinc-600 hover:underline">
                    Don't have an account?{" "}
                    <span className="font-medium">Register here</span>
                  </p>
                </Link>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;
