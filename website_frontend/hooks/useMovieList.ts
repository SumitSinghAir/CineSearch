import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { Movie } from '@/types';

const useMovieList = (name:string) => {
  const { data, error, isLoading } = useSwr(`/api/movielist/${name}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  // console.log(data);
  return {
    data :data as Movie[],
    error,
    isLoading
  }
};

export default useMovieList;
