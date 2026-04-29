import { useForm } from 'react-hook-form';
import z from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './useAddAirplane';
import { zodResolver } from '@hookform/resolvers/zod';
import { Airplanes } from '@/components/dataTable/columns';
import { useMutation } from '@tanstack/react-query';
import { airplaneServices } from '@/lib/services/airplane.service';

const schemaSingle = z.object({
  name: z.string().trim().min(4, 'Airplane name min 4 characters'),
  code: z
    .string()
    .trim()
    .min(1, 'Airplane code is required')
    .regex(/^[A-z]{3}-[0-9]{3}/, 'Example code [XXX-123]'),
  image: z
    .any()
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Image format must be jpg, jpeg, or png',
    )
    .refine((file: File) => {
      if (file instanceof File) return file.size <= MAX_FILE_SIZE;
      return true;
    }, 'Image siza max 1MB'),
});

export type AirplaneSingle = z.infer<typeof schemaSingle>;

export default function UseEditAirplane(airplane: Airplanes) {
  const {} = useForm<AirplaneSingle>({
    resolver: zodResolver(schemaSingle),
    defaultValues: {
      code: airplane.code,
      name: airplane.name,
      image: airplane.image,
    },
  });
  const { mutate: mutateEditAirplane, isPending: isPendingMutateAirplane } =
    useMutation({
      mutationFn: (data: AirplaneSingle) =>
        airplaneServices.update(airplane.id, data),
      onSuccess: () => {},
    });

  return {};
}
