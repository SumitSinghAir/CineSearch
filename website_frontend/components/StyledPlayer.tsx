'use client'
import { Movie } from "@/types";
import React, { useRef, useEffect, useState, useCallback } from "react"
import ReactPlayer from 'react-player';
import { CSSTransition } from "react-transition-group";
import { AdjustmentsHorizontalIcon, PauseIcon, PlayIcon ,SpeakerWaveIcon,SpeakerXMarkIcon} from "@heroicons/react/24/solid";
import useIdle from "@/hooks/useIdle";

interface StyledPlayerProps{
    data: Movie;
}
const StyledPlayer:React.FC<StyledPlayerProps>=({data})=>{
    const playerRef = useRef<ReactPlayer>(null);

    //Controls
    
    const [levels, setLevels] = React.useState([]);
    const [currentLevel, setCurrentLevel] = React.useState<number>(-1);
    const [auto,setAuto]=useState(true);
    const progressRef = useRef<HTMLInputElement>(null);
    const [progress,setProgress]=useState(0);
    const [duration,setDuration]=useState(0);
    const [playing, setPlaying] = useState(true);
    const [muted,setMuted] = useState(false);
    
    const playbackRates=[0.5,0.75,1,1.25,1.5];
    const [playbackRate,setPlaybackRate]=useState(1);
    
    const [url, setUrl] = useState('');
    const selectRef=useRef<HTMLSelectElement>(null);

    const handleLoad = () => {
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        // console.log(internalPlayer.levels)
        if (internalPlayer) setLevels(internalPlayer.levels.filter((l:any)=>l.height!=360));   
    }

    const onChangeBitrate = () => {
        const newBitRate=Number(selectRef.current?.value);
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        if (newBitRate && internalPlayer) {
            if(newBitRate>=0){
                setAuto(false);    
                internalPlayer.currentLevel  = newBitRate;
            }
            else{
                setAuto(true);
                internalPlayer.levelController.manualLevelIndex = -1
            }
            // do smooth quality transition with hls.js
            // internalPlayer.nextLevel = event.target.value;
            setCurrentLevel(newBitRate);
        }
    }

    const handleProgress = useCallback(() => {
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        const currentLevel=internalPlayer?.currentLevel;
        // const currentLevel=internalPlayer?.currentLevel;
        // console.log(internalPlayer,"current bitrate",{currentLevel},{auto});
        !auto && currentLevel && setCurrentLevel(currentLevel);
        if(playerRef.current){
            const frac=playerRef.current.getCurrentTime()/playerRef.current.getDuration();
            setDuration(playerRef.current.getDuration());
            setProgress(frac);
        }
    },[playerRef]);
    
    useEffect(() => {
        // console.log('loaded')
        setUrl(data?.previewLink);
    }, []);
    
    const isIdle = useIdle({timeToIdle: 5000,ignoredEventsWhenIdle:[]})
    
    const controlRef=useRef(null);
    const [showControls, setShowControls] = React.useState(false);

    useEffect(()=>{
        setShowControls(!isIdle);
    },[isIdle]);

    const HMSTime=(time:number)=> {
        const h = Math.floor(time / 3600);
        const m = Math.floor(time % 3600 / 60);
        const s = Math.floor(time % 3600 % 60);
        let result = '';
        result+=h>0?String(h).padStart(2,"0")+":":'';
        result+=String(m).padStart(2,"0")+":";
        result+=String(s).padStart(2,"0")
        return result;
    }

    const [showBuffering, setShowBuffering] = React.useState(false);
    
    const bufferingRef=useRef(null);
    const BufferComponent=(
        <div className="fixed inset-0 grid place-items-center">
            <span className="loader"></span>
        </div>
    )

    const descRef=useRef(null);
    const DescriptionComponent=( 
        <div ref={descRef} className="fixed inset-0 bg-black bg-opacity-40 z-10 pointer-events-none">
            <div className="absolute left-[10%] top-[40%] ml-12 z-10">
                <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-7xl whitespace-nowrap font-bold drop-shadow-xl">
                  {data?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                  {data?.plot}
                </p>
            </div>
        </div>
    );
    const QualityControlComponent=(
        <div className="text-neutral-400">
            {/* <div >{currentLevel}</div> */}
            Quality
            <select ref={selectRef} className=" text-white bg-black ml-1" onChange={onChangeBitrate} value={currentLevel}>
                <option value={-1}>auto</option>
                {/* @ts-ignore */}
                {levels.toSorted((a,b)=>a.bitrate-b.bitrate).map(
                    (level, id) => 
                    <option key={id} value={id}>
                        {/* @ts-ignore */}
                        {level.height+"p"}
                    </option>
                )}
            </select>
        </div>
    )

    const PlayBackRateControlComponent=(
        <div className="text-neutral-400">
        {/* <AdjustmentsHorizontalIcon className="w-10 h-10 text-white"/> */}
            PlayBack Rate
            <select className="text-white bg-black ml-1"  onChange={(e)=>setPlaybackRate(Number(e.target.value))} defaultValue={playbackRate}>
                {playbackRates.map(
                    (rate, id) => 
                    <option key={id} value={rate}>
                        {rate}x
                    </option>
                )}
            </select>
        </div>
    )

    return (
        <div className="fixed inset-0 object-cover">
                <CSSTransition
                    in={!playing}
                    delay={2000}
                    timeout={150}
                    classNames="fade"
                    unmountOnExit
                    nodeRef={descRef}
                >
                    {DescriptionComponent}
                </CSSTransition>
                <CSSTransition
                    in={showBuffering}
                    delay={2000}
                    timeout={150}
                    classNames="fade"
                    unmountOnExit
                    nodeRef={bufferingRef}
                >
                    {BufferComponent}
                </CSSTransition>
                <ReactPlayer
                    url={url}
                    playing={playing}
                    controls={false}
                    muted={muted}
                    onBuffer={()=>setShowBuffering(true)}
                    onBufferEnd={()=>setShowBuffering(false)}
                    playbackRate={playbackRate}
                    onReady={handleLoad}
                    onError={(e) => console.log(e)}
                    width="100%"
                    height="100%"
                    playIcon={<PlayIcon className="w-6 h-6 text-white"/>}
                    onProgress={handleProgress}
                    ref={playerRef}
                />
                <span onClick={()=>setPlaying(!playing)} className="fixed inset-0 w-full h-full z-10" />
                <CSSTransition
                    in={showControls}
                    delay={2000}
                    timeout={150}
                    classNames="fade"
                    unmountOnExit
                    nodeRef={controlRef}
                >
                <div ref={controlRef} className="absolute w-full p-4 pb-2 bottom-0 text-white z-30">
                    <div className="flex items-center inset-x-0 gap-2">
                        <span className="flex-0 w-[40px] text-left">{HMSTime(progress*duration)}</span>
                        <input className="flex-1" onInput={(e)=>progressRef.current && setProgress(Number(progressRef.current.value))} onChange={(e)=>playerRef.current && playerRef.current.seekTo(Number(e.target.value))} 
                        ref={progressRef} step={0.001} min={0} max={1} type="range" value={progress}/>
                        <span className="flex-0 w-[40px] text-left">{HMSTime(duration)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xl">
                        <button className="w-[50px] grid place-items-center" onClick={()=>setPlaying(!playing)}>
                            {
                                playing?
                                <PauseIcon className="w-10 h-10  text-white"/>:
                                <PlayIcon className="w-10 h-10 text-white" />
                            }
                        </button>
                        <button className="w-[50px] grid place-items-center" onClick={()=>setMuted(!muted)}>
                            {
                                muted?
                                <SpeakerXMarkIcon className="w-10 h-10 text-white" />:
                                <SpeakerWaveIcon className="w-10 h-10 text-white"/>
                            }
                        </button>
                        <h1 className="flex-1 font-bolder  text-2xl text-center">{data.title}</h1>

                        {QualityControlComponent}
                        {PlayBackRateControlComponent}
                        {/* <span>{progress}</span> */}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default StyledPlayer;