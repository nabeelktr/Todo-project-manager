"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DrawerContextProps {
  isDrawerOpen: string;
  setDrawerOpen: (val: string) => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState("");

  return (
    <DrawerContext.Provider value={{ isDrawerOpen , setDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
