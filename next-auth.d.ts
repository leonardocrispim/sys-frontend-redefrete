import { Session } from 'next-auth';
import { User } from 'UsersTypes';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
    userdata: User;
  }
}
