import { authServices } from '@/lib/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function useSignOut() {
  const router = useRouter();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: authServices.logout,
    onSuccess: () => {
      router.push('/');
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  return { signOut, isPending };
}
