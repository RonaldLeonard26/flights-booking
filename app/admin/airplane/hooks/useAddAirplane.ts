import { airplaneServices } from '@/lib/services/airplane.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
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
          (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Image format must be jpg, jpeg, or png',
        )
        .refine(
          (file: File) => file.size <= MAX_FILE_SIZE,
          'Image siza max 1MB',
        ),
    }),
  ),
});

export type AirplanePayload = z.infer<typeof schema>;

export default function useAddAirplane() {
  const router = useRouter();
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

  const { mutate: mutateAirplane, isPending: isPendingAirplane } = useMutation({
    mutationFn: (payload: AirplanePayload) => airplaneServices.create(payload),
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      router.refresh();
      reset();
    },
  });
  const handleSave = (data: AirplanePayload) => mutateAirplane(data);

  return {
    register,
    handleSubmit,
    errors,
    control,

    handleSave,
    isPendingAirplane,
    fields,
    append,
    remove,
  };
}
