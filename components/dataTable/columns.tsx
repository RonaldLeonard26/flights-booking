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
