import { DefaultSession, DefaultUser } from "@auth/core/types";

declare module "@auth/core/types" {
  interface User extends DefaultUser {
    providerId: string;
    subscription?: {
      planId: string;
      startDate: string;
      endDate: string;
      status: string;
      price: number;
      method: string;
    } | null;
  }

  interface Session extends DefaultSession {
    user?: {
      id: string;
      providerId: string;
      subscription?: {
        planId: string;
        startDate: string;
        endDate: string;
        status: string;
        price: number;
        method: string;
      } | null;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    providerId?: string;
    userId?: string;
    subscription?: {
      planId: string;
      startDate: string;
      endDate: string;
      status: string;
      price: number;
      method: string;
    } | null;
  }
}
