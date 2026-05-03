import { useForm } from 'react-hook-form';
import z from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from './useAddAirplane';
import { zodResolver } from '@hookform/resolvers/zod';
import { Airplanes } from '@/components/dataTable/columns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    .refine((file) => file !== null && file !== undefined, 'Image is required')
    .refine((file) => {
      //jika user tidak ganti gambar
      if (typeof file === 'string') return true;
      //jika user ganti gambar {object file} cek type
      if (file instanceof File) {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }
      return true;
    }, 'Image format must be jpg, jpeg, or png')
    .refine((file) => {
      //hanya cek ukuran jika upload file baru
      if (file instanceof File) {
        return file.size <= MAX_FILE_SIZE;
      }
      return true; //jika string lewati cek size
    }, 'Image size max 2MB'),
});

export type AirplaneSingle = z.infer<typeof schemaSingle>;

export default function UseEditAirplane(airplane: Airplanes) {
  const queryQlient = useQueryClient();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AirplaneSingle>({
    resolver: zodResolver(schemaSingle),
    defaultValues: {
      code: airplane.code,
      name: airplane.name,
      image: airplane.image,
    },
  });
  const {
    mutateAsync: mutateEditAirplane,
    isPending: isPendingMutateAirplane,
  } = useMutation({
    mutationFn: (data: AirplaneSingle) =>
      airplaneServices.update(airplane.id, data),
    onSuccess: () => {
      reset();
      return queryQlient.invalidateQueries({ queryKey: ['airplanes'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    register,
    control,
    handleSubmit,
    errors,
    mutateEditAirplane,
    isPendingMutateAirplane,
  };
}
