import React, { useCallback, useEffect, useState } from "react";
import {
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import NavbarItem from "@/components/NavbarItem";
import Search from "@/components/Search";
import useSearchStore from "@/hooks/useSearchStore";
import { useRouter } from "next/router";

const Navbar = () => {
  const router=useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      // Adjust the scroll threshold and opacity values as needed
      const opacity = window.scrollY > 100 ? 1 : 0;
      setBgOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-20">
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent`}></div>
      {/* Background with dynamic opacity */}
      <div className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-300 ease-in-out`} style={{opacity: bgOpacity}}></div>

      
      <div className={`px-4 md:px-16 py-4 flex flex-row items-center relative z-40 `}>
        <img src="/images/logo.png" onClick={()=>router.push('/')} className="h-4 lg:h-12" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="Plans" link="/plans" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <Search
            showSearchBar={showSearchBar}
            setShowSearchBar={setShowSearchBar}
          />
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon className="w-6" />
          </div>
          <AccountMenu/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
