"use client";

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; 
import { useModal } from './useModal';

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = useSelector((state: any) => state.auth.isLoggedIn);
  const { open, setOpen } = useModal();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      setOpen(true); 
      router.push('/'); 
    }
  }, [isAuthenticated, router, setOpen]);

  if (!isAuthenticated) {
    return null; 
  }

  return <>{children}</>; 
}
