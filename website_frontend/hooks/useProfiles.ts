import useSwr from 'swr'

import fetcher from '@/libs/fetcher';

const useProfiles = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/profiles', fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  }
};

export default useProfiles;
