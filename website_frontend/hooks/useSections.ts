import useSwr from 'swr'

import fetcher from '@/libs/fetcher';
import useProfileStore from './useProfileStore';

const useSections = () => {
    const {profileId}=useProfileStore();
    const { data, error, isLoading, mutate } = useSwr('/api/sections?profileId='+profileId, fetcher);
    return {
        data:data as string[],
        error,
        isLoading,
        mutate,
    }
};

export default useSections;
