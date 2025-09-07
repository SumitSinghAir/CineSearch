'use client'
import { useState, useEffect,useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { CSSTransition } from 'react-transition-group';
import useSearchStore from '@/hooks/useSearchStore';

interface SearchProps {
  showSearchBar: boolean;
  setShowSearchBar: (show: boolean) => void;
}

const Search : React.FC<SearchProps> = ({
  showSearchBar,
  setShowSearchBar,
}) => {
  const {query:searchQuery, setQuery:setSearchQuery} = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearchBar) {
      inputRef.current && inputRef.current.getElementsByTagName("input")[0].focus();
    }
    return () => {};
  }, [showSearchBar]);

  useEffect(()=>{
    //update the search query
    const url = new URL(location.href);
    const query = url.searchParams.get("q");
    if(showSearchBar && query){
      setSearchQuery(query);
      inputRef.current && (inputRef.current.getElementsByTagName("input")[0].value=query);
    }
  },[showSearchBar])

  useEffect(()=>{
    //update the page link
    const url = new URL(location.href);
    url.searchParams.delete("q");
    if(searchQuery){
      url.searchParams.set("q", searchQuery);
      inputRef.current && (inputRef.current.getElementsByTagName("input")[0].value=searchQuery);
      setShowSearchBar(true);
    }
    history.pushState({}, "", url);
  },[searchQuery])
  
  return (
    <div className="relative">
      {/* Search Icon */}
      <button onFocus={() => setShowSearchBar(true)} tabIndex={showSearchBar?-1:1} className="flex items-center cursor-pointer">
        <MagnifyingGlassIcon className="w-6 h-6 text-white" />
      </button>

      {/* CSSTransition for the search bar */}
      <CSSTransition
        in={showSearchBar}
        timeout={150}
        classNames="search-slide"
        unmountOnExit
        nodeRef={inputRef}
      >
        <div className="absolute top-1/2 -translate-y-1/2 right-0 overflow-hidden" ref={inputRef}>
          <div className="flex items-center border border-neutral-500 shadow-lg bg-black ring-1 ring-black p-1 ">
            <MagnifyingGlassIcon className="w-6 h-6 flex-none text-neutral-100 ml-3" />
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Titles, people, genres"
              className="flex-grow bg-transparent text-neutral-100 placeholder:text-neutral-500 pl-2 py-1 focus:outline-none"
              onBlur={() => setShowSearchBar((searchQuery.length > 0))}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Search;
