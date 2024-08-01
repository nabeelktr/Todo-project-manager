"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
