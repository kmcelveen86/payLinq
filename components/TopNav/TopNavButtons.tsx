import { signOutAction } from "@/app/actions";
import { signIn, auth, signOut } from "@/auth";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export const TopNavButtons = async () => {
  const session = await auth();
  const user = session?.user?.email;
  return user ? (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}>
      <Box>
        <Button
          type="submit"
          color="info"
          variant="outlined"
          sx={{ marginRight: 2 }}>
          Log Out
        </Button>
      </Box>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}>
      <Box>
        <Button
          type="submit"
          color="info"
          variant="outlined"
          sx={{ marginRight: 2 }}>
          Log In
        </Button>
        <Link href="/register">
          <Button color="info" variant="outlined">
            Register
          </Button>
        </Link>
      </Box>
    </form>
  );
};
// {user ? (
//     <Box>
//       <Button
//         onClick={() => signOutAction()}
//         color="info"
//         variant="outlined"
//         sx={{ marginRight: 2 }}>
//         Log Out
//       </Button>
//     </Box>
//   ) : (
//     <Box>
//       {/* <Button
//         onClick={() => signInAction()}
//         color="info"
//         variant="outlined"
//         sx={{ marginRight: 2 }}>
//         Log In
//       </Button> */}
//       <Link
//         component={RouterLink}
//         href={"/auth/signin"}
//         variant="outlined"
//         sx={{ marginRight: 2 }}>
//         Sign In
//       </Link>
//       <Link href="/register">
//         <Button color="info" variant="outlined">
//           Register
//         </Button>
//       </Link>
//     </Box>
//   )}
