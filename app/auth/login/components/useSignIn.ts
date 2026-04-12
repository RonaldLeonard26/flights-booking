import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authServices } from '@/lib/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password min 6 characters'),
});

type LoginSchema = z.infer<typeof loginSchema>;
export type LoginPayload = LoginSchema;

export default function useSignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl: string = searchParams.get('callbackUrl')
    ? (searchParams.get('callbackUrl') as string)
    : '/';

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (payload: LoginPayload) => authServices.login(payload),
    onError: () => {
      setError('password', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    },
    onSuccess: () => {
      alert('success login');
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (data: LoginPayload) => mutateLogin(data);

  return {
    register,
    handleSubmit,
    errors,
    handleLogin,
    isPendingLogin,
    clearErrors,
  };
}
