import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { Movie } from '@/types';
import useProfileStore from './useProfileStore';

const useFavourites = () => {
  const {profileId} = useProfileStore();
  const { data, error, isLoading, mutate } = useSwr('/api/favorites?profileId='+profileId, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data :data as Movie[],
    error,
    isLoading,
    mutate
  }
};

export default useFavourites;
