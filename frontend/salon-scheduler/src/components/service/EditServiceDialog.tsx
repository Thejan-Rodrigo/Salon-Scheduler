import { useEffect, useState } from "react";

import type { Service } from "@/features/service/types";

import { useUpdateServiceMutation } from "@/features/service/serviceApi";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    service: Service | null;
}

export default function EditServiceDialog({
    open,
    onOpenChange,
    service,
}: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [price, setPrice] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [updateService, { isLoading }] = useUpdateServiceMutation();

    useEffect(() => {
        if (!service) return;

        setName(service.name);
        setDescription(service.description);
        setDuration(service.duration);
        setPrice(service.price);
        setIsActive(service.isActive);
    }, [service]);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!service) return;

        try {
            await updateService({
                id: service.id,
                name,
                description,
                duration,
                price,
                isActive,
            }).unwrap();

            onOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-xl">

                <DialogHeader>
                    <DialogTitle>
                        Edit Service
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="space-y-2">
                        <Label>Name</Label>

                        <Input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>

                        <Textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

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
                            <Label>Price</Label>

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
                            <Label>
                                Active Service
                            </Label>

                            <p className="text-sm text-muted-foreground">
                                Allow customers to book this service.
                            </p>
                        </div>

                        <Switch
                            checked={isActive}
                            onCheckedChange={setIsActive}
                        />

                    </div>

                    <DialogFooter>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                onOpenChange(false)
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
                                : "Save Changes"}
                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    );
}