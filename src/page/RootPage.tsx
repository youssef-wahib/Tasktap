import {
  Button,
  Container,
  Drawer,
  Fade,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Home, ListAltRounded } from "@mui/icons-material";
import DrawerListItems from "../components/DrawerListItems";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.ts";
import ListIcon from "@mui/icons-material/List";
export default function RootPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | undefined>("");
  const [userId, setUserId] = useState<string | undefined>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user?.email?.split("@")[0]);
          setUserId(session.user.id);
        }
      },
    );
    return authListener?.subscription.unsubscribe;
  }, [userId]);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    else navigate("/");
  }
  function closeDrawer() {
    setIsDrawerOpen(false);
  }
  return (
    <>
      <Drawer variant="persistent" open={isDrawerOpen} transitionDuration={500}>
        <Stack sx={{ overflow: "auto" }} justifyContent={"center"}>
          {user ? (
            <Stack
              spacing={1}
              pt={3}
              direction={"row"}
              alignItems={"center"}
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
            >
              <div>
                <Typography>Welcome</Typography>
                <Typography>{user}</Typography>
              </div>
              <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <ArrowBackIcon fontSize={"small"} />
              </IconButton>
            </Stack>
          ) : null}
          <DrawerListItems
            Description={"New Project"}
            Icon={<Home color={"primary"} />}
            Link={`/${userId}`}
            closeDrawer={closeDrawer}
          />
          <DrawerListItems
            Description={"View Projects"}
            Icon={<ListAltRounded color={"primary"} />}
            Link={"projects"}
            closeDrawer={closeDrawer}
          />
          <Button
            sx={{ width: "50%", alignSelf: "center" }}
            variant={"contained"}
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </Stack>
      </Drawer>
      <Stack direction={"row"} alignItems={"flex-start"}>
        <Fade in={!isDrawerOpen} timeout={250}>
          <IconButton
            sx={{ ml: 5, mt: 5 }}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <ListIcon />
          </IconButton>
        </Fade>
        <Container
          sx={{
            pt: 3,
            marginLeft: `${isDrawerOpen ? "20%" : "15%"}`,
            transition: "margin-left 500ms ease-in-out",
          }}
        >
          <Outlet />
        </Container>
      </Stack>
    </>
  );
}
