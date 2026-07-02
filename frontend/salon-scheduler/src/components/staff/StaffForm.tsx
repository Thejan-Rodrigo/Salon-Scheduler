import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateStaffMutation } from "@/features/staff/staffApi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routePaths";

export default function StaffForm() {

  const navigate = useNavigate();
  const [createStaff, { isLoading }] = useCreateStaffMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createStaff({
        firstName,
        lastName,
        email,
        phone,
        role,
        password,
        isActive,
      }).unwrap();

      navigate(ROUTES.STAFF);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add Staff Member</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6" onSubmit={handleSubmit}>
        <form className="space-y-6">

          {/* Personal Information */}
          <div>
            <h3 className="font-semibold mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name
                </Label>

                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name
                </Label>

                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number
                </Label>

                <Input
                  id="phone"
                  placeholder="+94 77 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

            </div>
          </div>

          <Separator />

          {/* Account Information */}
          <div>

            <h3 className="font-semibold mb-4">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <Label>
                  Role
                </Label>

                <Select
                  value={role}
                  onValueChange={setRole}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                    <SelectItem value="Barber">Barber</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">

                <div>
                  <Label>
                    Active Status
                  </Label>

                  <p className="text-sm text-muted-foreground">
                    Allow this staff member to log in.
                  </p>
                </div>

                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />

              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>

                <Input
                  id="confirmPassword"
                  type="password"
                />
              </div>

            </div>

          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-3">

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(ROUTES.STAFF)}
            >
              Cancel
            </Button>

            <Button
                type="submit"
                disabled={isLoading}
            >
                {isLoading
                    ? "Saving..."
                    : "Save Staff Member"}
            </Button>

          </div>

        </form>
      </CardContent>
    </Card>
  );
}