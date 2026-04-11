'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authServices } from '@/lib/services/auth.service';
import { useMutation } from '@tanstack/react-query';

const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Fullname is required'),
    userName: z.string().min(3, 'Username min 3 characters'),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, 'Password min 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterPayload = Omit<RegisterSchema, 'confirmPassword'>;

export default function useSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: (payload: RegisterPayload) => authServices.register(payload),
    onError: (err) => {
      alert(err.message);
    },
    onSuccess: () => {
      alert('check your email for confirmation');
      reset();
    },
  });

  const handleRegister = (data: RegisterSchema) => {
    const { confirmPassword, ...payload } = data;
    mutateRegister(payload);
  };

  return { register, handleSubmit, errors, handleRegister, isPendingRegister };
}
