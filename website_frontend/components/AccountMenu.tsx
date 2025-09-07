import { signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { CSSTransition } from 'react-transition-group';
import useProfiles from '@/hooks/useProfiles';

const Account: React.FC = () => {
  const { data: currentUser } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const {data:profiles}=useProfiles();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="relative inline-block text-left" >
      {/* Account Image and Chevron Icon */}
      <button onMouseEnter={toggleMenu} onClick={toggleMenu} className="flex items-center cursor-pointer space-x-2">
        <Image src="/images/default-blue.png" alt="Account" width={32} height={32} className="rounded-sm" priority />
        <ChevronDownIcon className={`w-5 h-5 text-white transition-transform ${isOpen?"rotate-180":""}`} />
      </button>

      {/* Menu (conditionally rendered) */}
      <CSSTransition
        in={isOpen}
        timeout={150}
        classNames="menu-fade"
        unmountOnExit
        nodeRef={menuRef}
      >
        <div className="absolute right-0 mt-2 rounded-sm border border-neutral-500 shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-50" ref={menuRef}>
          <div className=" text-white whitespace-nowrap pt-2" role="none">
            <div className="px-4 py-2 flex flex-col gap-2">
              {/* Map through the user profiles here */}
              {profiles?.map((profile:any)=>(
                <div key={profile._id} className="flex items-center space-x-3">
                  <Image src="/images/default-blue.png" alt="User Profile" width={32} height={32} className="rounded-sm" />
                  <a href="#" className="text-sm text-white hover:underline">{profile.Profile_name}</a>
                </div>)
              )}
              {/* Repeat the above block for other profiles */}
            </div>
            <div className="px-4 py-2 flex flex-col gap-2 opacity-75">
                <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                </svg>

                  <a href="#" className="text-sm text-white hover:underline">Manage Profiles</a>
                </div>
                <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
</svg>

                  <a href="#" className="text-sm text-white hover:underline">Transfer Profile</a>
                </div>
                <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
</svg>

                  <a href="#" className="text-sm text-white hover:underline">Account</a>
                </div>
                <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
</svg>

                  <a href="#" className="text-sm text-white hover:underline">Help Centre</a>
                </div>
            </div>
            <button onClick={()=>signOut()} className="px-4 py-2 w-full text-sm text-center border-t border-neutral-500 text-white block hover:underline">Sign Out</button>
          </div>
        </div>
        </CSSTransition>
    </div>
  );
};

export default Account;
