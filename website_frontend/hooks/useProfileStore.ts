import { create } from 'zustand';

export interface ProfileStoreInterface {
  profileId:string|null;
  setProfile:(profile:string)=>void
}

const useProfileStore = create<ProfileStoreInterface>((set) => ({
  profileId:null,
  setProfile:(profileId: string) => {set({profileId})},
}));

export default useProfileStore;