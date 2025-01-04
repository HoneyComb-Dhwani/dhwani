'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dash/Sidebar';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/env';

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutProvider = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'supervisor' | 'therapist' | 'user' | null>(
    null,
  );
  const { removeToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkSession = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/session`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const resData = await res.json();

        if (!res.ok) {
          console.log(resData.message);
          removeToken();
          if (localStorage.getItem('hospitalId')) {
            localStorage.removeItem('hospitalId');
          }
          router.push('/auth');
        }

        setUserRole(resData.data.role.toLowerCase());
      } catch (error) {
        console.log(error);
        removeToken();
        router.push('/auth');
      }
    };

    if (!token) {
      removeToken();
      router.push('/auth');
    }

    checkSession();
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      setIsSidebarOpen(savedState === 'true');
    }
  }, []);

  const handleSidebarToggle = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', String(newState));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
      <main
        className={`flex-1 bg-gray-50 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}
      >
        {children}
      </main>
    </div>
  );
};

export default LayoutProvider;
