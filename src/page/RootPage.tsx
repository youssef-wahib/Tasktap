import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(431));

  return (
    <>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Container sx={{ p: isMobile ? 0 : undefined }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box minWidth={isMobile ? "35px" : "70px"}>
              <SvgLogo inheritViewBox />
            </Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: isMobile ? "0.8rem" : undefined }}
            >
              TaskTap
            </Typography>
            <Stack
              direction="row"
              flexGrow={isMobile ? 0 : 1}
              spacing={3}
              justifyContent="center"
            >
              <NavBarButton Description="New Project" Link={`/${userId}`} />
              <NavBarButton Description="View Projects" Link="projects" />
            </Stack>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="secondary"
              sx={{ fontSize: isMobile ? "0.6rem" : undefined }}
            >
              {user}
            </Typography>
            <Button
              color="inherit"
              onClick={handleSignOut}
              sx={{
                borderLeft: "1px solid",
                borderRadius: 0,
                fontSize: isMobile ? "0.5rem" : undefined,
                mx: isMobile ? 0 : undefined,
                px: isMobile ? 0 : undefined,
              }}
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
