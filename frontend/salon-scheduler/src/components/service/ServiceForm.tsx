import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/routes/routePaths";

import { useCreateServiceMutation } from "@/features/service/serviceApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function ServiceForm() {
  const navigate = useNavigate();

  const [createService, { isLoading }] =
    useCreateServiceMutation();

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] =
    useState(true);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createService({
        name,
        description,
        duration,
        price,
        isActive,
      }).unwrap();

      navigate(ROUTES.SERVICE);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add Service</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-6">

            <div className="space-y-2">
              <Label>Name</Label>

              <Input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Hair Cut"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Service description..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <Label>
                  Duration (minutes)
                </Label>

                <Input
                  type="number"
                  value={duration}
                  onChange={(e) =>
                    setDuration(
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Price (Rs.)</Label>

                <Input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      Number(e.target.value)
                    )
                  }
                />
              </div>

            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">

              <div>
                <Label>Active</Label>

                <p className="text-sm text-muted-foreground">
                  Available for booking.
                </p>
              </div>

              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />

            </div>

          </div>

          <Separator />

          <div className="flex justify-end gap-3">

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(ROUTES.SERVICE)
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : "Save Service"}
            </Button>

          </div>

        </form>
      </CardContent>
    </Card>
  );
}