import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {CheckIcon} from '@heroicons/react/24/solid'

import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";

export async function getServerSideProps(context: NextPageContext) {
  console.log("native",context.query);
  return {
    props: {}
  }
}


const App = () => {
  const router = useRouter();
  const onPlanSelected = useCallback(async(id:string) => {
    try{
      const res=await axios.post("/api/subscribe",{id});
      res.data.url && router.push(res.data.url);
    }catch(e:any){
      console.error(e.error)
    }
  }, [router]);

  const plans =[
    {id:"basic" ,name: "Basic", price: "Rs 59", benefits: ["Standard Definition (SD)","1 screen"]},
    {id:"standard", name: "Standard", price: "Rs 199", benefits: ["High Definition (HD)","2 screens"]},
    {id:"premium", name: "Premium", price: "Rs 349", benefits: ["Ultra High Definition (UHD)","4 screens"]},
  ]

  const PlansComponent= 
      <div className="mx-6 flex flex-col justify-start items-stretch md:grid md:grid-cols-3 md:items-center md:justify-center gap-8 mt-10">
        {plans.map((data, index) => (
            <div  key={data.id} className="relative p-6 bg-white border border-neutral-500 group h-full rounded-2xl lg:hover:-translate-y-6 ease-in duration-300 hover:bg-black hover:text-white">
              <div className="flex flex-row gap-5 items-center">
                <span className="text-3xl font-bold">{data.name}</span>
              </div>
              <span className="flex mt-4 text-neutral-500 text-2xl">
                What You&apos;ll Get
              </span>
              {data.benefits.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-2.5 items-start mt-6 text-left text-lg"
                >
                  <div className="pt-1 shrink-0">
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <span>{data}</span>
                </div>
              ))}
              <div className="border border-dashed border-neutral-500 tracking-widest my-4" />
              <div className="h-36">
                <div className="bottom-6 left-6 right-6 absolute">
                  <div className="flex justify-start items-baseline">
                    <span className="text-[32px] font-bold ">{data.price}</span>
                  </div>
                  <button onClick={()=>onPlanSelected(data.id)} className="w-full px-4 py-3 bg-red-500 text-white rounded-xl mt-6 font-semibold text-xl">
                    Choose
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>

  return (
    <div className="flex pt-8 items-start md:items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Select Your Plan</h1>
            {PlansComponent}
      </div>
    </div>
  );
}

export default App;
