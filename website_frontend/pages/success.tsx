import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {CheckIcon} from '@heroicons/react/24/solid'

import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import dynamic from "next/dynamic";
import { axiosMainServerInstance } from "@/libs/axiosInstance";


const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [redeemKey,setRedeemKey]=useState<string|null>(null);
  const [msg,setMsg]=useState<string|null>(null);

  useEffect(()=>{
    if(typeof window === 'undefined')
        return;
    else{
        const param=new URL(location.href).searchParams.get("redeemKey");
        setRedeemKey(param);
    }
  },[])

  const redeem=()=>{
    axiosMainServerInstance.post("/redeem",{redeemKey}).then((res:any)=>{
        setMsg(res.data.msg);
        router.push("/");
    }).catch((err:any)=> setMsg(err.msg));
  }
  const triangleStyle = {
    // Clip path for the diagonal division
    // clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
  };
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Black triangle */}
      <div
        style={{
          ...triangleStyle,
          backgroundColor: 'black',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: '50%',
        }}
      ></div>
      {/* Red triangle */}
      <div
        style={{
          ...triangleStyle,
          backgroundColor: 'red',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          left: '50%',
        }}
      ></div>

      {/* Foreground card */}
      <div
        className="p-6 md:p-8 max-w-[40rem] w-full bg-gray-900 bg-opacity-95 rounded shadow-lg z-10"
        style={{
          // Custom styles here if needed
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center py-8">
          Payment Successful
        </h1>
        <p className="text-gray-300 mt-4">
          This is your redeem key:
        </p>
        <div className="text-center py-8">
          <span className="text-red-500 font-bold">{redeemKey}</span>
        </div>
        <button
          className="mt-6 px-6 py-2 w-full text-white bg-red-600 font-bold rounded hover:bg-red-700 transition duration-200"
          onClick={redeem}
        >
          Redeem Now
        </button>
        <p className="text-gray-300 mt-4">
          Message: <span className="text-red-500">{msg}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
