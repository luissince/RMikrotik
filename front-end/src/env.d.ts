/// <reference path="../.astro/types.d.ts" />
import { Session } from "@auth/core/types";

declare module "astro" {
    interface AstroClientSession extends Session {
      user?: {
        providerId: string;
        id: string;
      } & Session["user"];
    }
  }