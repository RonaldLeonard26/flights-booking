import { airplaneServices } from '@/lib/services/airplane.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function UseAirplanes() {
  const {
    data: dataAirplanes,
    isLoading: isLoadingAirplanes,
    isRefetching: isRefetchingAirplanes,
    refetch: refetchAirplanes,
  } = useQuery({
    queryKey: ['airplanes'],
    queryFn: () => airplaneServices.getAirplanes(),
    placeholderData: keepPreviousData,
  });
  return {
    dataAirplanes,
    isLoadingAirplanes,
    isRefetchingAirplanes,
    refetchAirplanes,
  };
}
