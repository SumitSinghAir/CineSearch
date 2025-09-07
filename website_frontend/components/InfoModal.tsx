import React, { useCallback, useEffect, useState,useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import PlayButton from '@/components/PlayButton';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovie from '@/hooks/useMovie';
import useVideoStore from "@/hooks/useVideoStore";
import useSearchStore from '@/hooks/useSearchStore';

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const {video:videoEl} =useVideoStore();
  const videoRef=useRef<HTMLVideoElement>(null);
  const {setQuery}=useSearchStore();
  const { movieId } = useInfoModalStore();
  const { data,isLoading } = useMovie(movieId);
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);
  
  const discardVideo=async()=>{
    if (videoRef!.current && data){
      videoRef.current.pause();
      videoEl?.play();
    }
  }

  const closeModalAndSearch=(query:string)=>{
    setQuery(query);
    handleClose();
  }

  const handleClose = useCallback(() => {
    setIsVisible(false);
    discardVideo();
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose,discardVideo]);

  useEffect(()=>{
    document.body.dataset.scroll=isVisible?"hidden":"show";
  },[isVisible])

  useEffect(()=>{
    
    if (isVisible && videoRef!.current && data){
      videoEl && videoEl.pause();
      videoRef.current.play();
    }
  },[isVisible,videoRef,data])

  if (!visible) {
    return null;
  }

  const LoaderComponent=(
    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center"/>
  )
  const InfoComponent=(
    <>
      <div className="relative">
        <video ref={videoRef} poster={data?.poster} loop src={data?.previewLink} className="w-full aspect-[2/1] brightness-[60%] object-cover mask-video-gradient" />
        <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
          <XMarkIcon className="text-white w-6" />
        </div>
        <div className="absolute bottom-0 left-10">
          <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
            {data?.title}
          </p>
          <div className="flex flex-row gap-4 items-center">
            <PlayButton movieId={data?._id} />
            <FavoriteButton movieId={data?._id} />
          </div>
        </div>
      </div>

      <div className="p-12 pt-4">
        <div className='flex flex-row items-end gap-2 mb-2'>
          <p className="text-green-300 font-semibold text-2xl mt-3"> 
            {data?.imdb.rating} 
            <span className='text-white text-lg font-normal ml-2'>
                IMDB Rating
            </span>
          </p>
          <p className="text-white text-lg">{data?.imdb.votes} votes</p>
          <p className="text-white text-lg ">{data?.runtime} minutes</p>
        </div>
        <p className="text-red-600 font-semibold text-xl my-2">
          {data?.genres?.map((item:string)=><span key={item} onClick={()=>closeModalAndSearch(item)}  className="mr-1 hover:underline">{item}</span>)}
        </p>
        <p className="text-white text-lg">
          {data?.fullplot}
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">
              <span className="text-sm">Directors :</span> 
              {data?.directors?.map((item:string)=><span key={item} onClick={()=>closeModalAndSearch(item)} className="ml-3 hover:underline">{item}</span>)}
          </p>
          <p className="text-white text-lg">
              <span className="text-sm">Casts :</span> 
              {data?.cast?.map((item:string)=><span key={item} onClick={()=>closeModalAndSearch(item)} className="ml-3 hover:underline">{item}</span>)}
          </p>
          <p className="text-white text-lg">
              <span className="text-sm">Languages :</span> 
              {data?.languages?.map((item:string)=><span key={item} onClick={()=>closeModalAndSearch(item)} className="ml-3 hover:underline">{item}</span>)}
          </p>
        </div>
      </div>
    </>)

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex flex-col py-10 overflow-x-hidden overflow-y-scroll overscroll-contain fixed inset-0">
      <div className="relative w-auto m-auto max-w-3xl">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} rounded-lg overflow-hidden transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
          {isLoading ? LoaderComponent:InfoComponent}
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
