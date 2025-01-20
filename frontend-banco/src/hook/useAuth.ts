import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'app/components/ui/use-toast';
import { Session } from 'app/data/interfaces';



export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // if (!response.ok) {
      //   throw new Error('Login failed');
      // }


      console.log({response})

      toast({
        title: 'Error',
        description: 'Credenciales incorrectas',
        });

      
      const data = await response.json();
      console.log(data)

      const newSession = { ...data };
      
      setSession(newSession);
      localStorage.setItem('session', JSON.stringify(newSession));

      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('session');
    setSession(null);
    router.push('/login');
  };

  return { session, login, logout };
}

