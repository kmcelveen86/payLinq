// "use server";

// import { signIn, signOut } from "@/auth";

// export const signInAction = async (email: string): Promise<void> => {
//   try {

//     const result: any = await signIn("email", {
//       redirectTo: "/",
//       redirect: true,
//       email,
//     });

//     if (result?.error) {
//       console.error("Sign in error:", result.error);
//       // Handle sign-in error
//     } else {
//       // Sign-in successful, redirect or perform additional actions
//       console.log("Sign in successful", result);
//     }
//   } catch (error) {
//     console.error("Error signing in:", error);
//     throw error;
//     // Handle any other errors
//   }
// };

// export const signOutAction = async (): Promise<void> => {
//   try {
//     await signOut();
//     console.log("Sign out successful");
//   } catch (error) {
//     console.error("Error signing out:", error);
//     throw error;
//     // Handle any errors during sign-out
//   }
// };
