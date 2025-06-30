// import "server-only";

// import { Client, Account, Storage, Users, Databases } from "node-appwrite";

// export async function createAdminClient() {
//   const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
//   const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
//   const key = process.env.NEXT_APPWRITE_KEY;

//   if (!endpoint || !project || !key) {
//     throw new Error("Appwrite environment variables are missing");
//   }

//   const client = new Client()
//     .setEndpoint(endpoint)
//     .setProject(project)
//     .setKey(key);

//   return {
//     get account() {
//       return new Account(client);
//     },
//     get storage() {
//       return new Storage(client);
//     },
//     get databases() {
//       return new Databases(client);
//     },
//     get users() {
//       return new Users(client);
//     },
//   };
// }
// src/lib/appwrite.ts

import "server-only";
import { Client, Account, Storage, Users, Databases } from "node-appwrite";

export async function createAdminClient() {
  // const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  // const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  // const key = process.env.NEXT_APPWRITE_KEY;

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}
