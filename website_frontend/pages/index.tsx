import React, { useEffect, useState } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import {axiosMainServerInstance} from "@/libs/axiosInstance";
import useSearchStore from "@/hooks/useSearchStore";
import SearchResults from "@/components/SearchResults";
import useFavorites from "@/hooks/useFavorites";
import useProfiles from "@/hooks/useProfiles";
import useProfileStore from "@/hooks/useProfileStore";
import useSections from "@/hooks/useSections";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Home = () => {
  const {data:sections} = useSections();
  const {setProfile}=useProfileStore();
  const { data: profiles } = useProfiles();
  const { data: favorites } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  const {query,deepQuery} = useSearchStore();
  useEffect(()=>{profiles && setProfile(profiles[0]._id)},[profiles])
  const Browse = (
    <>
      <Billboard />
      <div className="pb-10">
        {sections && sections.map((section)=><MovieList key={section} title={section} />)}
      </div>
      <div>
        {favorites && <MovieList title="Favorites" data={favorites} />}
      </div>
    </>
  );
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      {(query||deepQuery)?<SearchResults />: Browse}
    </>
  );
};

export default Home;
