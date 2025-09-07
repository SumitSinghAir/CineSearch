import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {CheckIcon} from '@heroicons/react/24/solid'

import useCurrentUser from "@/hooks/useCurrentUser";
const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Plan Cancelled</h1>
        <p className="text-white text-center">Go back to home</p>
        <button onClick={()=>router.push("/")} className="bg-white text-black p-2 rounded-md">Home</button>
      </div>
    </div>
  );
}

export default App;
