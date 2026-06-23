import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  LogIn,
  Mail,
  Lock,
  Eye,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-white px-4">
      {/* Decorative Circles */}
      <div className="absolute h-[900px] w-[900px] rounded-full border border-white/40" />
      <div className="absolute h-[1200px] w-[1200px] rounded-full border border-white/20" />

      {/* Logo */}
      <div className="absolute left-8 top-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white">
          <LogIn className="h-4 w-4" />
        </div>

        <span className="font-semibold">
          Salon Scheduler
        </span>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border-white/50 bg-white/70 shadow-2xl backdrop-blur">
        <CardContent className="p-8">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
              <LogIn className="h-8 w-8" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              Sign In
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Access your salon dashboard and manage
              appointments, staff and services.
            </p>
          </div>

          {/* Email */}
          <div className="mb-4 space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2 space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10 pr-10"
              />

              <Eye className="absolute right-3 top-3 h-4 w-4 cursor-pointer text-muted-foreground" />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="mb-6 text-right">
            <button className="text-sm text-muted-foreground hover:text-primary">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            className="w-full"
            size="lg"
          >
            Sign In
          </Button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-border" />

            <span className="px-4 text-xs text-muted-foreground">
              OR
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button className="font-medium text-primary">
              Contact Administrator
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
