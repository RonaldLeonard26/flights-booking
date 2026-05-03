'use client';
import AddAirplaneModal from '@/app/admin/airplane/components/modal/add-modal';
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
    <div className="flex items-center justify-between py-2">
      <Input
        placeholder="search..."
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm w-64"
      />
      <AddAirplaneModal />
    </div>
  );
}
