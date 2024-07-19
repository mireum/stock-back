import {Session} from 'express-session';

declare module 'express-session' {
  interface Session {
    accessToken: string | null;
  }
}