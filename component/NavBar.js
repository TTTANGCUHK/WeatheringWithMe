import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();

  const redirect = (URL) => {
    router.push(URL);
  };

  let barColor = "primary";
  let pageBtns = (
    <>
      <Button color="inherit" onClick={() => redirect("/")}>Home</Button>
      <Button color="inherit" onClick={() => redirect("/favorite")}>Favorite Locations</Button>
    </>
  );
  let userBtns = (
    <>
      <Button color="inherit" onClick={() => redirect("/forms/login")}>Login</Button>
      <Button color="inherit" onClick={() => redirect("/forms/signup")}>Signup</Button>
    </>
  )
  if (!session) {
    barColor = "transparent";
  } else {
    userBtns = (
      <>
        <Typography variant="h6">{session.user.username}</Typography>
        <Button color="inherit" onClick={() => signOut({ callbackUrl: "/forms/login" })}>Logout</Button>
      </>
    );
    if (session.user.isAdmin) {
      barColor = "secondary";
      pageBtns = (
        <>
          <Button color="inherit" onClick={() => redirect("/")}>Home</Button>
      <Button color="inherit" onClick={() => redirect("/favorite")}>Favorite Locations</Button>
          <Button color="inherit" onClick={() => redirect("/admin")}>Admin Panel</Button>
        </>
      );
    }
  }

  return (
    <AppBar position="static" color={barColor}>
      <Toolbar>
        <Stack direction="row" sx={{ flexGrow: 1 }}>
          {pageBtns}
        </Stack>
        <Stack direction="row" spacing={2}>
          {userBtns}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};