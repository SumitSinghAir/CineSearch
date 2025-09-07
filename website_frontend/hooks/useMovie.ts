import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { Movie } from '@/types';

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data:data as Movie,
    error,
    isLoading
  }
};

export default useMovie;
