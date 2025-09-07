import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
// import StyledPlayer from "@/components/StyledPlayer";
import dynamic from 'next/dynamic'
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { axiosMainServerInstance } from '@/libs/axiosInstance';
const DynamicStyledPlayer = dynamic(() => import("@/components/StyledPlayer"), {
    ssr: false,
})

export async function getServerSideProps(context: NextPageContext) {
  try{
      const session = await getSession(context);
      if (!session || !session?.user?.email) {
        return {
          redirect: {
            destination: "/auth",
            permanent: false,
          },
        };
      }
      const queries=context.query.queries as string;
      const [movieId,profileId]=queries.split("&");
      console.log("*****",movieId , profileId);
      if(!movieId){
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      const movieLink= (await axiosMainServerInstance.post('/getlink',{email:session.user.email,movieId,profileId}))
        if(movieLink.status==200){
          return {
            props: {movieLink:movieLink.data.video},
          };
        }
  }
  catch(e){
    return {
        redirect: {
          destination: "/plans",
          permanent: false,
        },
      }
    }
}


const Watch = (props:any) => {
  const router = useRouter();
  const { queries } = router.query;
  const [movieId,profileId]=(queries as string).split("&");
  const { data } = useMovie(movieId as string);
  console.log(props.movieLink);
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
      </nav>
      <DynamicStyledPlayer data={{...data,previewLink:props.movieLink}}/>
      {/* <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video> */}
    </div>
  )
}

export default Watch;
