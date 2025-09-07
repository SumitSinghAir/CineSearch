import React, { useState,useEffect,useCallback,useRef } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

import { Movie } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useVideoStore from "@/hooks/useVideoStore";
import { CSSTransition } from 'react-transition-group';
import useProfileStore from '@/hooks/useProfileStore';

interface MovieCardProps {
  data: Movie;
  align:string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data,align }) => {
  const router = useRouter();
  const [showVideoTimeout,setShowVideoTimeout]=useState<NodeJS.Timeout>();
  const videoRef=useRef<HTMLVideoElement>(null);
  const { openModal } = useInfoModalStore();
  const {video:videoEl} =useVideoStore();
  const {profileId}=useProfileStore();

  const redirectToWatch = useCallback(() => data._id && router.push(`/watch/${data._id}&${profileId}`), [router, data._id,profileId]);
  const loadVideo=async ()=>{
    const playVideo=( )=>{
      if (videoRef!.current && data){
        videoEl && videoEl.pause();
        videoRef.current.play();
        console.log("play->",data.title,data.previewLink);
      }
    }
    setShowVideoTimeout(setTimeout(playVideo,800));
  }
  const discardVideo=async()=>{
    showVideoTimeout && clearTimeout(showVideoTimeout);
    if (videoRef!.current && data){
      videoRef.current.pause();
      console.log("discard",data.title);
      videoEl?.play();
    }
  }
  useEffect(()=>{
    videoRef.current && videoRef.current.pause();
  },[])
  const info= (
    <>
      <div className="relative flex flex-row items-center gap-2">
        <div className="absolute -top-20 max-w-full overflow-x-hidden whitespace-nowrap text-ellipsis text-white font-semibold text-xl lg:text-2xl mt-3">
              {data.title}
        </div>
        <div onClick={redirectToWatch} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
          <PlayIcon className="text-black w-4 lg:w-5"  />
        </div>
        <FavoriteButton movieId={data._id} />
        <div onClick={() => openModal(data?._id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
          <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-5" />
        </div>
      </div>
      <div className="flex items-baseline flex-wrap mt-3">
        <span className="text-green-400 font-semibold text-base lg:text-lg whitespace-nowrap"> 
          {data.imdb.rating} 
           <span className='text-white text-xs lg:text-sm font-normal mx-2'>
              IMDB Rating
            </span>
        </span>
        <span className="text-white text-xs lg:text-sm  whitespace-nowrap">
          {data.imdb.votes} votes
        </span>
      </div>
      <p className="text-white text-[10px] lg:text-sm">{data.runtime} minutes</p>
      <div className="flex flex-row items-center gap-2 mt-2 text-[8px] text-white lg:text-sm">
        <p>{data?.genres?.map((genre:string)=><span key={genre} className="mr-2">{genre}</span>)}</p>
      </div>
    </>
  )
   
  return (
    <div className="group col-span relative">
        <img onMouseEnter={loadVideo} className="w-full aspect-[4/3] object-cover transition delay-[500ms] duration-[200ms] opacity-100 group-hover:opacity-0 rounded-md" src={data.poster} alt={data.title}/>
        <div onMouseLeave={discardVideo} className={`absolute top-0 left-0 z-10 opacity-0 pointer-events-none invisible sm:visible w-full scale-100 group-hover:-translate-y-[10vh] group-hover:pointer-events-auto group-hover:scale-[1.25] group-hover:opacity-100 transition delay-[500ms] duration-[300ms] ${align}`}>
          <video onClick={redirectToWatch} muted ref={videoRef} poster={data?.poster} className="w-full aspect-[4/3] object-cover rounded-t-md cursor-pointer bg-neutral-700" loop src={data?.previewLink} preload="none"></video>
          <div className="z-10 bg-neutral-800 p-2 lg:p-4 absolute w-full shadow-md rounded-b-md">
            {info}
          </div>
        </div>
    </div>
  )
}

export default MovieCard;
