import {
  Button,
  Container,
  Divider,
  Drawer,
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
  const [userId, setUserId] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // console.log(session);
        if (session) {
          setUser(session.user?.email?.split("@")[0]);
          setUserId(session.user.id);
        }
      },
    );
    return authListener?.subscription.unsubscribe;
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    else navigate("/");
  }
  return (
    <>
      <Drawer variant="persistent" open={isDrawerOpen}>
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
          />
          <DrawerListItems
            Description={"View Projects"}
            Icon={<ListAltRounded color={"primary"} />}
            Link={"projects"}
          />
          <Divider />
        </Stack>
        <Button onClick={handleSignOut}>Logout</Button>
      </Drawer>
      <Container
        sx={{ pt: 3, ml: `${isDrawerOpen ? "20%" : "auto"}`, width: "auto" }}
      >
        {isDrawerOpen ? null : (
          <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <ListIcon />
          </IconButton>
        )}
        <Outlet />
      </Container>
    </>
  );
}
