import { useState } from "react";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

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

import { Separator } from "@/components/ui/separator";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/routes/routePaths";

import {
    useCreateAppointmentMutation,
} from "@/features/appointment/appointmentApi";

export default function AppointmentForm() {

    const navigate = useNavigate();

    const [createAppointment, { isLoading }] =
        useCreateAppointmentMutation();

    const [customerId, setCustomerId] = useState("");

    const [staffId, setStaffId] = useState("");

    const [serviceId, setServiceId] = useState("");

    const [appointmentDate, setAppointmentDate] =
        useState("");

    const [startTime, setStartTime] =
        useState("");

    const [endTime, setEndTime] =
        useState("");

    const [notes, setNotes] =
        useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            await createAppointment({
                customerId,
                staffId,
                serviceId,
                appointmentDate,
                startTime,
                endTime,
                notes,
            }).unwrap();

            navigate(ROUTES.APPOINTMENTS);

        } catch (err) {
            console.error(err);
        }

    };

    return (

        <Card className="max-w-4xl mx-auto">

            <CardHeader>
                <CardTitle>
                    Appointment Information
                </CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div className="grid grid-cols-2 gap-6">

                        <div className="space-y-2">

                            <Label>
                                Customer
                            </Label>

                            {/* TODO: List down all the active Customers */}
                            <Select
                                value={customerId}
                                onValueChange={setCustomerId}
                            >

                                <SelectTrigger>
                                    <SelectValue placeholder="Select Customer" />
                                </SelectTrigger>

                                <SelectContent>
                                    {/* Populate later */}
                                    <SelectItem value="1">
                                        John Doe
                                    </SelectItem>
                                </SelectContent>

                            </Select>

                        </div>

                        <div className="space-y-2">

                            <Label>
                                Staff
                            </Label>

                            {/* TODO: List down the all the available staff */}
                            <Select
                                value={staffId}
                                onValueChange={setStaffId}
                            >

                                <SelectTrigger>
                                    <SelectValue placeholder="Select Staff" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="1">
                                        Emma Wilson
                                    </SelectItem>
                                </SelectContent>

                            </Select>

                        </div>

                        <div className="space-y-2">

                            <Label>
                                Service
                            </Label>

                            {/* TODO: List dow all the active services */}
                            <Select
                                value={serviceId}
                                onValueChange={setServiceId}
                            >

                                <SelectTrigger>
                                    <SelectValue placeholder="Select Service" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="1">
                                        Hair Cut
                                    </SelectItem>
                                </SelectContent>

                            </Select>

                        </div>

                        <div className="space-y-2">

                            <Label>
                                Date
                            </Label>

                            <Input
                                type="date"
                                value={appointmentDate}
                                onChange={(e) =>
                                    setAppointmentDate(e.target.value)
                                }
                            />

                        </div>

                        <div className="space-y-2">

                            <Label>
                                Start Time
                            </Label>

                            <Input
                                type="time"
                                value={startTime}
                                onChange={(e) =>
                                    setStartTime(e.target.value)
                                }
                            />

                        </div>

                        <div className="space-y-2">

                            <Label>
                                End Time
                            </Label>

                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) =>
                                    setEndTime(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className="space-y-2">

                        <Label>
                            Notes
                        </Label>

                        <Input
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                        />

                    </div>

                    <Separator />

                    <div className="flex justify-end gap-3">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                navigate(ROUTES.APPOINTMENTS)
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
                                : "Create Appointment"}
                        </Button>

                    </div>

                </form>

            </CardContent>

        </Card>
    );
}