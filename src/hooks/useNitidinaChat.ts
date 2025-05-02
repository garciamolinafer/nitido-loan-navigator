
import { create } from 'zustand';

interface NitidinaState {
  isOpen: boolean;
  message: string;
  openChat: (message?: string) => void;
  closeChat: () => void;
  setMessage: (message: string) => void;
}

// Create a store to manage Nitidina's chat state
const useNitidinaStore = create<NitidinaState>((set) => ({
  isOpen: false,
  message: '',
  openChat: (message = '') => set({ isOpen: true, message }),
  closeChat: () => set({ isOpen: false }),
  setMessage: (message: string) => set({ message }),
}));

// Hook for components to interact with Nitidina
export const useNitidinaChat = () => {
  const { isOpen, message, openChat, closeChat, setMessage } = useNitidinaStore();
  
  // Helper function to open chat with a specific message
  const openNitidinaChat = (message: string) => {
    openChat(message);
  };
  
  return {
    isNitidinaOpen: isOpen,
    nitidinaMessage: message,
    openNitidinaChat,
    closeNitidinaChat: closeChat,
    setNitidinaMessage: setMessage,
  };
};
