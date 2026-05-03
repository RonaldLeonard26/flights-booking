import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import AirplaneForm from '../form/form-add-airplane';

export default function AddAirplaneModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" suppressHydrationWarning>
          Add Airplane
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm ">
        <DialogHeader>
          <DialogTitle>Add Airplane</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new airplane.
          </DialogDescription>
        </DialogHeader>
        <AirplaneForm close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
