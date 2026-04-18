'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Airplane = {
  id: string;
  name: string;
  code: string;
  image: string;
};

export const columns: ColumnDef<Airplane>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt="airplane"
        className="w-16 h-10 object-cover rounded"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
];
