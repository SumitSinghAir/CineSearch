'use client'
import React,{useEffect, useRef, useState} from 'react';
import { Movie } from '@/types';
import useMovieList from '@/hooks/useMovieList';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import useSearchStore, { useAutoComplete, useDeepSearch, useDiverseSearch } from '@/hooks/useSearchStore';
import SearchResultList from './SearchResultList';


// const useBreakPoints=()=>{
//   const breakPoint=()=>[320,480,840,924,1250,1536].reduce((bp,b)=> window.innerWidth>b?bp+1:bp,0);
//   const [count,setCount]=useState(breakPoint());
//   useEffect(()=>{
//     const setDynamicCount=()=> setCount(breakPoint());
//     addEventListener("resize",setDynamicCount,{passive:true});
//     return ()=>removeEventListener("resize",setDynamicCount)
//   },[]);
//   return count;
// }

const SearchResults: React.FC = () => {
const {query,deepQuery} = useSearchStore();
const autocompleteResults = useAutoComplete(query);
const diverseSearchResults = useDiverseSearch(query);
const deepSearchResults = useDeepSearch(deepQuery);
// console.log(diverseSearchResults)
// if(!autocompleteResults) return null;
  return (
    <div className="text-white pt-40">
        <SearchResultList title={"Are you looking for"} data={autocompleteResults.data} />
        <SearchResultList title={"Based Genres"} data={diverseSearchResults.data?.genres} />
        <SearchResultList title={"Based on Directors"} data={diverseSearchResults.data?.directors} />
        <SearchResultList title={"Based on Cast"} data={diverseSearchResults.data?.cast} />
        <SearchResultList title={"Based on Title"} data={diverseSearchResults.data?.title} />
        <SearchResultList title={"Based on Plot Meaning"} data={deepSearchResults.data} />
    </div>
  );
}

export default SearchResults;
