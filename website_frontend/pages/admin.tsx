import axios from "axios";
import { useCallback, useState } from "react";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/components/Input";

export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);
//   if (session &&session?.user?.email) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

  return {
    props: {},
  };
}

const Auth = () => {
  const router = useRouter();
  const handle=()=>{
    const out=prompt("Enter special access");
    alert("Access Denied for " + out);
  }
  return (
    <div className="relative h-full w-full">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover -z-10"/>
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Admin Page
            </h2>
            <div className="text-white grid grid-cols-2 gap-8 font-bold text-base whitespace-nowrap">
                <span>
                    <span className="text-green-400 p-4 text-3xl">Rs {52*300}</span>Total Revenue
                </span>
                <span>
                    <span className="text-green-400 p-4 text-3xl">52</span>Subscribers
                </span>
                <span>
                    <span className="text-green-400 p-4 text-3xl">140</span>Active Users
                </span>
                <span>
                    <span className="text-green-400 p-4 text-3xl">10</span>Users Signed Up Today
                </span>
                <span>
                    <span className="text-green-400 p-4 text-3xl">40</span>Users Visited Today
                </span>
                <span>
                    <span className="text-green-400 p-4 text-3xl">56</span>Movies Watched Today
                </span>
                <span>
                    <span className="text-green-400 p-4 text-3xl">230</span>Movies Added to WatchList
                </span>
                <span>
                    <span className="text-green-400 p-4 text-3xl">350</span>Total Movies Watched
                </span>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-8">
                <button onClick={handle} className="bg-green-400 text-black font-bold text-lg py-2 rounded-md">Create User</button>
                <button  onClick={handle} className="bg-green-400 text-black font-bold text-lg py-2 rounded-md">Get User</button>
                <button  onClick={handle} className="bg-green-400 text-black font-bold text-lg py-2 rounded-md">Update User</button>
                <button  onClick={handle} className="bg-green-400 text-black font-bold text-lg py-2 rounded-md">Delete User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
