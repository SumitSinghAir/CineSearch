import { create } from 'zustand';
import useSwr from 'swr'
import useSwrImmutable from "swr/immutable";

import fetcher from '@/libs/fetcher';
import { Autocomplete, DiverseSearch, SemanticSearch } from '@/types';

export interface SearchStoreInterface{
    query:string;
    deepQuery:string;
    setQuery:(query:string)=>void;
}

let timeout:NodeJS.Timeout|null=null;
const useSearchStore = create<SearchStoreInterface>((set) => ({
    query :"",
    deepQuery:"",
    setQuery:(query:string)=>{
        set({query})
        timeout && clearTimeout(timeout);
        timeout=setTimeout(()=>set({deepQuery:query}),300)
    }
}));

export const useAutoComplete= (query:string)=>{
    const { data, error, isLoading } = useSwrImmutable(`/api/search/autocomplete/${query}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      return {
        data :data as Autocomplete[],
        error,
        isLoading
      }
}
export const useDiverseSearch= (query:string)=>{
    const { data, error, isLoading } = useSwr(`/api/search/diverse/${query}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      return {
        data :data as DiverseSearch,
        error,
        isLoading
      }
}
export const useDeepSearch= (query:string)=>{
    const { data, error, isLoading } = useSwr(`/api/search/deep/${query}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      return {
        data :data as SemanticSearch[],
        error,
        isLoading
      }
}

export default useSearchStore;