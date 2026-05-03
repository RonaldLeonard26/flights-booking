import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useEffect, useState } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import FormEditAirplane from '../form/form-edit-airplane';
import { Airplanes } from '@/components/dataTable/columns';

export default function EditAirplaneModal({
  airplane,
}: {
  airplane: Airplanes;
}) {
  const [open, setOpen] = useState(false);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   const frame = requestAnimationFrame(() => {
  //     setMounted(true);
  //   });

  //   return () => cancelAnimationFrame(frame);
  // }, []);

  // // Jika belum mounted, jangan render trigger yang kompleks dulu
  // if (!mounted) return null;
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
        <FormEditAirplane airplane={airplane} close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
