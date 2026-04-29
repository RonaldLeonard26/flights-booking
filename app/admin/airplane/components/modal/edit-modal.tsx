import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AirplaneForm from '../form/form-add-airplane';
import { useState } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Airplanes } from '@/components/dataTable/columns';
import FormEditAirplane from '../form/form-edit-airplane';

export default function EditAirplaneModal({
  airplane,
}: {
  airplane: Airplanes;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm ">
        <DialogHeader>
          <DialogTitle>Edit Airplane</DialogTitle>
          <DialogDescription>
            Fill the form below to edit airplane.
          </DialogDescription>
        </DialogHeader>
        <FormEditAirplane />
      </DialogContent>
    </Dialog>
  );
}
