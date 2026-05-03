'use client';

import { columns } from '@/components/dataTable/columns';
import DataTable from '@/components/dataTable/data-table';

import UseAirplanes from './hooks/use-airplanes';
import { useEffect, useState } from 'react';

export default function Airplane() {
  const [mounted, setMounted] = useState(false);
  const {
    dataAirplanes,
    isLoadingAirplanes,
    isRefetchingAirplanes,
    refetchAirplanes,
  } = UseAirplanes();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col">
      <h2>Airplane</h2>
      <DataTable data={dataAirplanes ?? []} columns={columns} />
    </div>
  );
}
