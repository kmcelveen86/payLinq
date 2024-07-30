import { handlers } from "@/auth";
export const { POST, GET } = handlers;
// export const runtime = "edge";

// export async function GET() {
//   // User authentication and role verification
//   const session = await auth();
//   const user = session?.user?.email;

//   // Check if the user is authenticated
//   if (!user) {
//     return new Response(null, { status: 401 }); // User is not authenticated
//   }

//   // Check if the user has the 'admin' role
// //   if (session.user.role !== "admin") {
// //     return new Response(null, { status: 403 }); // User is authenticated but does not have the right permissions
// //   }

//   // Data fetching for authorized users
// }
