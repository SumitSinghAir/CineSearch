'use client'
import React,{useEffect, useRef, useState} from 'react';
import { Autocomplete, DiverseSearch, Movie, SemanticSearch } from '@/types';
import useMovieList from '@/hooks/useMovieList';
import MovieCard from '@/components/MovieCard';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface SearchResultListProps {
  title: string;
  data: Movie[]
}

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

const SearchResultList: React.FC<SearchResultListProps> = ({title,data }) => {
  const rowRef=useRef<HTMLDivElement>(null);
  if(!data || !data.length) return null;
  return (
    <div className="px-12 mt-12 space-y-4">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
      <div 
        className="relative grid grid-cols-5 gap-2" 
        ref={rowRef}
      >
        {data.map((movie,i) => (
          <MovieCard key={movie._id} data={movie} align={i==4?"origin-bottom-right":i==0?"origin-bottom-left":"origin-bottom"} />
        ))}
      </div>
    </div>
  );
}

export default SearchResultList;
