import { airplaneServices } from '@/lib/services/airplane.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function UseDeleteAirplane() {
  const queryQlient = useQueryClient();
  const { mutate: mutateDeleteAirplane, isPending: isPendingDeleteAirplane } =
    useMutation({
      mutationFn: (id: string) => airplaneServices.remove(id),
      onSuccess: () => {
        queryQlient.invalidateQueries({ queryKey: ['airplanes'] });
        toast.success('Airplane deleted successfully!', {
          duration: 3000,
          style: {
            fontFamily: 'Inter',
          },
        });
      },
      onError: () => {
        toast.error('Failed to delete airplane', {
          duration: 3000,
          style: {
            fontFamily: 'Inter',
          },
        });
      },
    });

  return { mutateDeleteAirplane, isPendingDeleteAirplane };
}
