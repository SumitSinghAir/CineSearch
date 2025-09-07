'use client'
import React,{useEffect, useRef, useState} from 'react';
import { Movie } from '@/types';
import useMovieList from '@/hooks/useMovieList';
import MovieCard from '@/components/MovieCard';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface MovieListProps {
  title: string;
  data?: Movie[]; 
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
// }previewLink



// '#Similar to Godzilla 2000 #id: 573a139ff29313caabd00e06'
//  usingSimilarTo=true
//  titleWhenSimilarTo="Godzilla 2000"
//  heading="Similar to Godzilla 2000"
const MovieList: React.FC<MovieListProps> = ({title,data:data2 }) => {
  const usingSimilarTo=title.startsWith('#Similar to');
  const titleWhenSimilarTo=title.split('#id: ')[0].split('Similar to ')[1];
  const heading=usingSimilarTo?"Similar to "+titleWhenSimilarTo:title;
  const query=usingSimilarTo?"SimilarTo"+title.split('#id: ')[1]:title;
  const { data:data1 } = useMovieList(query);
  const data=data2||data1;
  const rowRef=useRef<HTMLDivElement>(null);
  if(!data) return null;
  return (
    <div className="px-12 mt-8 space-y-4">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{heading}</p>
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

export default MovieList;
