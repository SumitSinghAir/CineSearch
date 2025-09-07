import React, { useCallback, useRef,useEffect } from 'react';
import { InformationCircleIcon,SpeakerWaveIcon,SpeakerXMarkIcon } from '@heroicons/react/24/outline';

import PlayButton from '@/components/PlayButton';
import useBillboard from '@/hooks/useBillboard';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useVideoStore from "@/hooks/useVideoStore";

const Billboard: React.FC = () => {
  const { openModal } = useInfoModalStore();
  const { data: movie } = useBillboard();
  const videoRef=useRef<HTMLVideoElement>(null);
  const {muted,setMuted,video:videoEl,setVideo} =useVideoStore();
  const handleOpenModal = useCallback(() => {
    openModal(movie?._id);
  }, [openModal, movie?._id]);

  useEffect(()=> {videoRef!.current && movie && setVideo(videoRef.current,movie.title)},[videoRef,movie])

  return (
    <div className="relative h-[45vw]">
      <video ref={videoRef} poster={movie?.poster} className="w-full h-[52vw] object-cover brightness-[60%] mask-video-gradient" autoPlay muted={muted} loop src={movie?.previewLink}></video>
      <div className="absolute bottom-[10%] md:bottom-[10%] ml-12">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-7xl whitespace-nowrap font-bold drop-shadow-xl">
          {movie?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {movie?.plot}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={movie?._id} />
          <button
            onClick={handleOpenModal}
            className="
            bg-white bg-opacity-30 text-white rounded-md py-1 md:py-2 px-2 md:px-4
            w-auto text-xs lg:text-lg font-semibold 
            flex flex-row items-center hover:bg-opacity-20 transition
            "
            >
              <InformationCircleIcon className="w-4 md:w-7 mr-1" />
              More Info
          </button>
        </div>
      </div>
      <div className="absolute bottom-12 right-12">
        {videoEl && (
          <button onClick={()=>setMuted(!muted)} className="border border-white text-white rounded-full aspect-square p-1">
            {muted?(
              <SpeakerXMarkIcon className="w-4 md:w-7 mx-2"/>
              ):(
              <SpeakerWaveIcon className="w-4 md:w-7 mx-2"/>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
export default Billboard;
