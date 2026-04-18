'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface PropsTypes {
  globalFilter: string;
  setGlobalFilter: (e: string) => void;
}

export default function TableToolbar({
  globalFilter,
  setGlobalFilter,
}: PropsTypes) {
  return (
    <div className="flex items-center justify-between py-6">
      <Input
        placeholder="search..."
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm w-64"
      />
      <Button className="bg-gray-500">Add Airplane</Button>
    </div>
  );
}
