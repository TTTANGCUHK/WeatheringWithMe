import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession();

  let barColor = "primary";
  let pageBtns = (
    <>
      <Button color="inherit" href="/">Home</Button>
      <Button color="inherit" href="/favorite">Favorite Locations</Button>
    </>
  );
  let userBtns = (
    <>
      <Button color="inherit" href="/forms/login">Login</Button>
      <Button color="inherit" href="/forms/signup">Signup</Button>
    </>
  )
  if (!session) {
    barColor = "transparent";
  } else {
    userBtns = (
      <>
        <Typography variant="h6">{session.user.username}</Typography>
        <Button color="inherit" onClick={() => signOut()}>Logout</Button>
      </>
    );
    if (session.user.isAdmin) {
      barColor = "secondary";
      pageBtns = (
        <>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/favorite">Favorite Locations</Button>
          <Button color="inherit" href="/admin">Admin Panel</Button>
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