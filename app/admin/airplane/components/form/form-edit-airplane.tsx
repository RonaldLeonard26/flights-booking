import InputFile from '@/components/input-file';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FormEditAirplane() {
  return (
    <div>
      <form action="" className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Code</Label>
          <Input />
        </div>
        <div>
          <InputFile name="" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="destructive">Cancel</Button>
          <Button variant="outline">Save</Button>
        </div>
      </form>
    </div>
  );
}
