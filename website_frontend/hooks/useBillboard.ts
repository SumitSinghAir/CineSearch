import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { Movie } from '@/types';
const useBillboard = () => {
  const { data, error, isLoading } = useSwr('/api/random', fetcher, { 
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
   });
  return {
    data: data as Movie,
    error,
    isLoading
  }
};

export default useBillboard;
