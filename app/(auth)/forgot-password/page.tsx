"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (data: ForgotPasswordFormValues) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/forgot-password`,
        data
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setMessage(response.data.message);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred.");
      console.error("Forgot Password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center p-4">
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(handleForgotPassword)}
          className="space-y-6 w-full max-w-md p-8 shadow-2xl rounded-lg bg-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-2xl font-semibold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Forgot Password
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Label htmlFor="email">Email</Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input id="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {message && (
            <motion.div
              className="p-3 bg-green-100 text-green-800 rounded-md text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {message}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>
          </motion.div>

          <motion.p 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            Remember your password? 
            <Link 
              className="hover:text-blue-500 underline ml-1"
              href="/signin"
            >
              Sign In
            </Link> 
          </motion.p> 

          <motion.p 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            Reset password? 
            <Link 
              className="hover:text-blue-500 underline ml-1"
              href="/reset-password"
            >
              Reset password
            </Link> 
          </motion.p> 
        </motion.form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage; 