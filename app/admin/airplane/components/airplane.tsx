import { columns } from '@/components/dataTable/columns';
import DataTable from '@/components/dataTable/data-table';
import { createClient } from '@/lib/supabase/server';

export default async function Airplane() {
  const supabase = await createClient();
  const { data } = await supabase.from('airplane').select('*');

  return (
    <div className="w-full flex flex-col gap-6">
      <h2>Airplane</h2>

      <DataTable data={data ?? []} columns={columns} />
    </div>
  );
}
