import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import axios from "axios"
import { z } from 'zod';

import { authConfig } from '@/configs';
import type { User } from '@/lib/definitions'

async function getUser(username: string, password: string): Promise<User | undefined> {
  try {
    const { data } = await axios.post<User>(`http://localhost:3000/auth/login`, { username, password });
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(5) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username, password);
          if (!user) return null;
          return user;
        }

        return null;
      },
    })
  ],
  trustHost: true,
});