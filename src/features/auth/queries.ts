// "use server";

// import { cookies } from "next/headers";
// import { Account, Client } from "node-appwrite";
// import { AUTH_COOKIE } from "./constants";

// export const getCurrent = async () => {
//   try {
//     const client = new Client()
//       .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//       .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

//     const session = await cookies().get(AUTH_COOKIE);

//     if (!session) {
//       return null;
//     }

//     client.setSession(session.value);
//     const account = new Account(client);

//     return await account.get();
//   } catch (e) {
//     return null;
//   }
// };
// src/features/auth/getCurrent.ts
import "server-only";
import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/appwrite";

export const getCurrent = async () => {
  try {
    const client = await createSessionClient();
    return await client.account.get();
  } catch {
    return null;
  }
};
