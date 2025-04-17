// src/auth.d.ts
import { DefaultSession, DefaultUser } from "@auth/core/types";

declare module "@auth/core/types" {
  interface User extends DefaultUser {
    providerId: string; // Agregamos la propiedad personalizada
  }

  interface Session extends DefaultSession {
    user?: {
      id: string;
      providerId: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    providerId?: string;
    userId?: string;
  }
}