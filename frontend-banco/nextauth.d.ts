import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      lastname: string;
      email: string;
      roles: string;
      access_token: string;
    } & DefaultSession['user'];
  }
}