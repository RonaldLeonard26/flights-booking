'use client';

import { columns } from '@/components/dataTable/columns';
import DataTable from '@/components/dataTable/data-table';

import UseAirplanes from './hooks/use-airplanes';

export default function Airplane() {
  const {
    dataAirplanes,
    isLoadingAirplanes,
    isRefetchingAirplanes,
    refetchAirplanes,
  } = UseAirplanes();

  return (
    <div className="w-full flex flex-col gap-6">
      <h2>Airplane</h2>

      <DataTable data={dataAirplanes ?? []} columns={columns} />
    </div>
  );
}
