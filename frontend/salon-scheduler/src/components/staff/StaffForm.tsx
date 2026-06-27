import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function StaffForm() {
  const [isActive, setIsActive] = useState(true);

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add Staff Member</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name
                </Label>

                <Input
                  id="lastName"
                  placeholder="Doe"
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number
                </Label>

                <Input
                  id="phone"
                  placeholder="+94 77 123 4567"
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

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Admin">
                      Admin
                    </SelectItem>

                    <SelectItem value="Receptionist">
                      Receptionist
                    </SelectItem>

                    <SelectItem value="Barber">
                      Barber
                    </SelectItem>
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
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Staff Member
            </Button>

          </div>

        </form>
      </CardContent>
    </Card>
  );
}