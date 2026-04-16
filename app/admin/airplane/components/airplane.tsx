import { columns } from '@/components/dataTable/columns';
import DataTable from '@/components/dataTable/data-table';
import { Button } from '@/components/ui/button';

import { createClient } from '@/lib/supabase/server';

export default async function Airplane() {
  const supabase = await createClient();
  const { data } = await supabase.from('airplane').select('*');

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2>Airplane</h2>
        <Button variant="outline">Tambah Data</Button>
      </div>
      <DataTable data={data ?? []} columns={columns} />
    </div>
  );
}
