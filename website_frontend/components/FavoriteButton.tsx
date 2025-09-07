import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import useProfileStore from '@/hooks/useProfileStore';

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const {profileId}=useProfileStore();
  const { data:favs,mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    return favs?favs.map(f=>f._id).includes(movieId):false;
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.post('/api/favorite', { delete:true, movieId ,profileId });
    } else {
      response = await axios.post('/api/favorite', { movieId ,profileId});
    }
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
  
  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div onClick={toggleFavorites} className="cursor-pointer group/item w-5 h-5 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-5" />
    </div>
  )
}

export default FavoriteButton;
