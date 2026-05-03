import { airplaneServices } from '@/lib/services/airplane.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const MAX_FILE_SIZE = 2000000; // 1M

const schema = z.object({
  airplanes: z.array(
    z.object({
      name: z.string().trim().min(4, 'Airplane name min 4 characters'),
      code: z
        .string()
        .trim()
        .min(1, 'Airplane code is required')
        .regex(/^[A-z]{3}-[0-9]{3}/, 'Example code [XXX-123]'),
      image: z
        .any()
        .refine(
          (file: File) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
          'Image format must be jpg, jpeg, or png',
        )
        .refine((file: File) => {
          if (file instanceof File) {
            return file.size <= MAX_FILE_SIZE;
          }
          return true;
        }, 'Image siza max 1MB'),
    }),
  ),
});

export type AirplanePayload = z.infer<typeof schema>;

export default function useAddAirplane() {
  const queryQlient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AirplanePayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      airplanes: [{ name: '', code: '', image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'airplanes',
  });

  const { mutateAsync: mutateAirplane, isPending: isPendingAirplane } =
    useMutation({
      mutationFn: (payload: AirplanePayload) =>
        airplaneServices.create(payload),
      onError: (err) => {
        console.error(err);
      },
      onSuccess: () => {
        reset();
        return queryQlient.invalidateQueries({ queryKey: ['airplanes'] });
      },
    });

  return {
    register,
    handleSubmit,
    errors,
    control,

    mutateAirplane,
    isPendingAirplane,
    fields,
    append,
    remove,
  };
}
