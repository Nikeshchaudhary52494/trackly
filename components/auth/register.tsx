"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { tracklyMessages } from "@/lib/data";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function UserRegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    const msg =
      tracklyMessages[Math.floor(Math.random() * tracklyMessages.length)];
    setRandomMessage(msg);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        console.log("Registration successful!");
      } else {
        console.error("Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left message area */}
      <div className="flex items-center justify-center bg-blue-100 p-12">
        <h2 className="text-4xl font-bold text-blue-600 leading-snug max-w-md">
          {randomMessage}
        </h2>
      </div>

      {/* Right form area */}
      <div className="flex flex-col justify-center p-12">
        <h1 className="mb-10 text-4xl font-bold text-gray-800">
          Create your Trackly account
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Name</Label>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...field}
                      className="h-12 text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                      {...field}
                      className="h-12 text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="h-12 pr-10 text-lg"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
          </form>
        </Form>

        <p className="mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
