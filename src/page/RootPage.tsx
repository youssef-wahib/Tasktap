import { Button, Divider, Drawer, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Home, ListAltRounded } from "@mui/icons-material";
import DrawerListItems from "../components/DrawerListItems";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.ts";
export default function RootPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | undefined>("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log(session);

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
    <Stack direction={"row"} spacing={"20%"} sx={{ justifyContent: "center" }}>
      <Drawer variant="permanent">
        <Stack sx={{ overflow: "auto" }}>
          {user ? (
            <Typography align={"center"} pt={4} sx={{ flexWrap: "wrap" }}>
              Welcome {user}
            </Typography>
          ) : null}
          <DrawerListItems
            Description={"New Project"}
            Icon={<Home color={"primary"} />}
            Link={`/${userId}`}
          />
          <DrawerListItems
            Description={"View your Projects"}
            Icon={<ListAltRounded color={"primary"} />}
            Link={"projects"}
          />
          <Divider />
        </Stack>
        <Button onClick={handleSignOut}>Logout</Button>
      </Drawer>

      <Outlet />
    </Stack>
  );
}
