import { create } from 'zustand';

export const useBantuanStore = create((set) => ({
  bantuanData: [],
  setBantuanData: (data) => set({ bantuanData: data }), // langsung replace
  resetBantuanData: () => set({ bantuanData: [] }),
  filterStatus: 'Semua',
  setFilterStatus: (status) => set({ filterStatus: status }),
}));
