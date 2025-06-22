import { DefaultSession, DefaultUser } from "@auth/core/types";

declare module "@auth/core/types" {
  interface User extends DefaultUser {
    providerId: string;
    token?: string;
    type?: string;
  }

  interface Session extends DefaultSession {
    user?:  DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    user: User;
  }
}
