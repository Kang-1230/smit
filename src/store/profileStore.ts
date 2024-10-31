import { create } from "zustand";

interface ProfileStore {
  isProfileModalOpen: boolean;
  modalOpen: () => void;
  modalClose: () => void;
}

const useProfileStore = create<ProfileStore>((set) => ({
  isProfileModalOpen: false,
  modalOpen: () => set({ isProfileModalOpen: true }),
  modalClose: () => set({ isProfileModalOpen: false }),
}));

export default useProfileStore;
