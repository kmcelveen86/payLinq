// import { DefaultSession } from "next-auth";
// import { AdapterUser } from "@auth/core/adapters";

// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: string;
//             firstName?: string | null;
//             lastName?: string | null;
//             membershipTier?: string;
//             phoneNumber?: string;
//             address?: string;
//             city?: string;
//             state?: string;
//             postalCode?: string;
//             dateOfBirth?: Date;
//         } & DefaultSession["user"];
//     }

//     interface User extends DefaultUser {
//         firstName?: string | null;
//         lastName?: string | null;
//         membershipTier?: string | null;
//     }
// }

// declare module "@auth/core/adapters" {
//     interface AdapterUser {
//         firstName?: string | null;
//         lastName?: string | null;
//         membershipTier?: string;
//         phoneNumber?: string;
//         address?: string;
//         city?: string;
//         state?: string;
//         postalCode?: string;
//         dateOfBirth?: Date;
//         provider?: string | null;
//     }
// }