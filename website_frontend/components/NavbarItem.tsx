import { useRouter } from 'next/router';
import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
  link?:string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active,link }) => {
  const router=useRouter();
  return (
    <div onClick={()=>{link && router.push(link)}} className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </div>
  )
}

export default NavbarItem;
