import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ArrowRight,
  Calendar,
  Clock,
  Scissors,
  Users,
} from "lucide-react";
import { ROUTES } from "@/routes/routePaths";

export default function LandingPage() {
  const navigate = useNavigate();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const isAuthenticated = !!user;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6" />
            <span className="text-xl font-bold">
              Salon Scheduler
            </span>
          </div>

          <nav className="hidden gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </a>

            <a
              href="#contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </a>
          </nav>

          <div className="flex gap-3">
            {isAuthenticated ? (
              <Button
                onClick={() =>
                  navigate(ROUTES.DASHBOARD)
                }
              >
                Go To Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(ROUTES.LOGIN)
                  }
                >
                  Login
                </Button>

                <Button
                  onClick={() =>
                    navigate(ROUTES.LOGIN)
                  }
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-100 via-sky-50 to-background">
        <div className="container mx-auto px-6 py-24 text-center">
          <Badge className="mb-6">
            Modern Salon Management Platform
          </Badge>

          <h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight md:text-7xl">
            Manage Your Salon
            <br />
            Effortlessly
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Schedule appointments, manage staff,
            organize services, and grow your salon
            business with one powerful platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() =>
                navigate(
                  isAuthenticated
                    ? ROUTES.DASHBOARD
                    : ROUTES.LOGIN
                )
              }
            >
              {isAuthenticated
                ? "Go To Dashboard"
                : "Get Started"}
            </Button>

            <Button
              variant="outline"
              size="lg"
            >
              Learn More
            </Button>
          </div>

          {/* Dashboard Preview */}
          <Card className="mx-auto mt-20 max-w-6xl shadow-2xl">
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardContent className="p-6">
                    <Calendar className="mb-4 h-8 w-8 text-blue-600" />

                    <p className="text-sm text-muted-foreground">
                      Appointments
                    </p>

                    <h3 className="text-3xl font-bold">
                      128
                    </h3>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Users className="mb-4 h-8 w-8 text-green-600" />

                    <p className="text-sm text-muted-foreground">
                      Customers
                    </p>

                    <h3 className="text-3xl font-bold">
                      560
                    </h3>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Scissors className="mb-4 h-8 w-8 text-purple-600" />

                    <p className="text-sm text-muted-foreground">
                      Services
                    </p>

                    <h3 className="text-3xl font-bold">
                      35
                    </h3>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Clock className="mb-4 h-8 w-8 text-orange-600" />

                    <p className="text-sm text-muted-foreground">
                      Bookings Today
                    </p>

                    <h3 className="text-3xl font-bold">
                      42
                    </h3>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="container mx-auto px-6 py-24"
      >
        <div className="mb-16 text-center">
          <Badge >
            Features
          </Badge>

          <h2 className="mt-4 text-4xl font-bold">
            Everything You Need
          </h2>

          <p className="mt-4 text-muted-foreground">
            Powerful tools for salon owners,
            staff, and customers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 text-blue-600" />

              <CardTitle>
                Appointment Scheduling
              </CardTitle>
            </CardHeader>

            <CardContent>
              Manage bookings, availability,
              and appointments from a single place.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-green-600" />

              <CardTitle>
                Staff Management
              </CardTitle>
            </CardHeader>

            <CardContent>
              Manage employees, working hours,
              and salon operations efficiently.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Scissors className="h-10 w-10 text-purple-600" />

              <CardTitle>
                Service Management
              </CardTitle>
            </CardHeader>

            <CardContent>
              Organize services, pricing,
              categories, and durations.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-muted/30 py-24"
      >
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <Badge>
              How It Works
            </Badge>

            <h2 className="mt-4 text-4xl font-bold">
              Get Started In Minutes
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create Your Salon",
                description:
                  "Register your salon and configure your business information.",
              },
              {
                step: "02",
                title: "Add Staff & Services",
                description:
                  "Setup employees, schedules, services, and pricing.",
              },
              {
                step: "03",
                title: "Start Managing",
                description:
                  "Accept appointments and manage your salon operations.",
              },
            ].map((item) => (
              <Card key={item.step}>
                <CardHeader>
                  <Badge>{item.step}</Badge>

                  <CardTitle>
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {item.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Card className="border-0 bg-black text-white">
            <CardContent className="flex flex-col items-center p-12 text-center">
              <h2 className="text-4xl font-bold">
                Ready To Grow Your Salon?
              </h2>

              <p className="mt-4 max-w-2xl text-gray-300">
                Join modern salons using Salon Scheduler
                to streamline operations and improve
                customer experience.
              </p>

              <Button
                size="lg"
                variant="outline"
                className="mt-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t py-8"
      >
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5" />
            <span className="font-semibold">
              Salon Scheduler
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 Salon Scheduler. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
