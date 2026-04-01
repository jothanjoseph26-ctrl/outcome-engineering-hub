import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  
  scannerComplete: boolean;
  setScannerComplete: (complete: boolean) => void;
  
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  
  modalOpen: string | null;
  setModalOpen: (modal: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      chatOpen: false,
      setChatOpen: (chatOpen) => set({ chatOpen }),
      
      scannerComplete: false,
      setScannerComplete: (scannerComplete) => set({ scannerComplete }),
      
      selectedIndustry: 'All',
      setSelectedIndustry: (selectedIndustry) => set({ selectedIndustry }),
      
      modalOpen: null,
      setModalOpen: (modalOpen) => set({ modalOpen }),
    }),
    {
      name: 'outcome-labs-storage',
    }
  )
);
