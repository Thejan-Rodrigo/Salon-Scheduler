import { useEffect, useState } from "react";

import type { Appointment } from "@/features/appointment/types";

import { useUpdateAppointmentMutation } from "@/features/appointment/appointmentApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
}

export default function EditAppointmentDialog({
  open,
  onOpenChange,
  appointment,
}: Props) {
  const [updateAppointment, { isLoading }] =
    useUpdateAppointmentMutation();

  const [customerId, setCustomerId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [serviceId, setServiceId] = useState("");

  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!appointment) return;

    setCustomerId(appointment.customerId);
    setStaffId(appointment.staffId);
    setServiceId(appointment.serviceId);

    setAppointmentDate(appointment.appointmentDate);

    setStartTime(appointment.startTime);
    setEndTime(appointment.endTime);

    setStatus(appointment.status);
  }, [appointment]);

  const handleSave = async () => {
    if (!appointment) return;

    try {
      await updateAppointment({
        id: appointment.id,
        body: {
          customerId,
          staffId,
          serviceId,
          appointmentDate,
          startTime,
          endTime,
          status,
          
        },
      }).unwrap();

      onOpenChange(false);
    } catch (err) {
      console.error(err);
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
            Edit Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <Label>Customer ID</Label>

            <Input
              value={customerId}
              onChange={(e) =>
                setCustomerId(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Staff ID</Label>

            <Input
              value={staffId}
              onChange={(e) =>
                setStaffId(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Service ID</Label>

            <Input
              value={serviceId}
              onChange={(e) =>
                setServiceId(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Date</Label>

            <Input
              type="date"
              value={appointmentDate}
              onChange={(e) =>
                setAppointmentDate(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Start Time</Label>

            <Input
              type="time"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
            />
          </div>

          <div>
            <Label>End Time</Label>

            <Input
              type="time"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Status</Label>

            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Pending">
                  Pending
                </SelectItem>

                <SelectItem value="Confirmed">
                  Confirmed
                </SelectItem>

                <SelectItem value="Completed">
                  Completed
                </SelectItem>

                <SelectItem value="Cancelled">
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}