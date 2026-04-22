'use client';

import InputFile from '@/components/input-file';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AirplaneForm() {
  return (
    <form className="flex flex-col ">
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Input airplane name here..."
          />
        </div>
        <div className="grid gap-1.5">
          <Label>Code</Label>
          <Input
            id="code"
            type="text"
            placeholder="Input airplane code here..."
          />
        </div>
        <div>
          <InputFile name="input" isDropable />
        </div>
      </div>

      <div className="flex items-center justify-end mt-4">
        <div className="flex gap-2 ">
          <Button size="sm" className="bg-gray-700">
            Cancel
          </Button>
          <Button variant="outline" size="sm">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
