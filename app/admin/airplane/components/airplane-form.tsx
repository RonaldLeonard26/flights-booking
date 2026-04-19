import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AirplaneForm() {
  return (
    <div>
      <form>
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
              id="name"
              type="text"
              placeholder="Input airplane code here..."
            />
          </div>
          <div>Input File</div>
        </div>
      </form>
    </div>
  );
}
