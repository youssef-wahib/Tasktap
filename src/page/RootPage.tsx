import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.ts";

import { SvgLogo } from "../components/logo.tsx";
import NavBarButton from "../components/reusableComponents/NavBarButton.tsx";

export default function RootPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | undefined>("");
  const [userId, setUserId] = useState<string | undefined>("");
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

  return (
    <>
      <AppBar sx={{ mb: 3 }} position="static">
        <Container>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Box minWidth={"70px"}>
              <SvgLogo inheritViewBox />
            </Box>
            <Typography fontWeight={"bold"} variant="h5">
              TaskTap
            </Typography>
            <Stack
              direction={"row"}
              sx={{ flexGrow: 1 }}
              spacing={3}
              justifyContent={"center"}
            >
              <NavBarButton Description={"New Project"} Link={`/${userId}`} />
              <NavBarButton Description={"View Projects"} Link={"projects"} />
            </Stack>
            <Typography variant="h5" fontWeight={"bold"} color={"secondary"}>
              {user}
            </Typography>

            <Button
              color={"inherit"}
              onClick={handleSignOut}
              sx={{ borderLeft: "1px solid currentColor", borderRadius: 0 }}
            >
              Logout
            </Button>
          </Stack>
        </Container>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
