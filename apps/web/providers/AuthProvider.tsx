import { BACKEND_URL } from '@/env';
import { useRouter } from 'next/navigation';
import React, { createContext } from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  removeToken: () => {},
});

const AuthProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | null>(null);

  const router = useRouter();

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/session`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          removeToken();
          router.push('/auth');
        }
      } catch (error) {
        console.log(error);
        removeToken();
        router.push('/auth');
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      removeToken();
      router.push('/auth');
    }

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
