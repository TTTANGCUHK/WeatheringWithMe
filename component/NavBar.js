// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

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

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    redirect("/forms/login");
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
        <Button color="inherit" onClick={handleSignOut}>Logout</Button>
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