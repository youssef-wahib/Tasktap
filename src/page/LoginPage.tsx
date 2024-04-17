import { supabase } from "../utils/supabase.ts";
import {
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import SignIn from "../components/authComponents/SignIn.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// /user
function LoginPage() {
  const navigate = useNavigate();
  async function handleSignInGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.log(error);
  }
  async function handleSignInFacebook() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
    if (error) console.log(error);
  }
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(session);
        if (event === "SIGNED_IN" && session) navigate(`/${session.user.id}`);
      },
    );
    return authListener.subscription.unsubscribe;
  }, [navigate]);
  return (
    <Container sx={{ pt: "5%" }} maxWidth={"sm"}>
      <Card variant={"outlined"}>
        <Stack direction={"column"} spacing={3} sx={{ p: 3 }}>
          <Typography variant={"h3"} align={"center"}>
            LOGIN
          </Typography>

          <SignIn />
          <Divider sx={{ borderColor: "rgba(255,255,255,0.4)" }} />
          <Typography variant={"h4"} align={"center"}>
            LOGIN WITH
          </Typography>
          <Button onClick={handleSignInGoogle}>Log in with Google</Button>
          <Button onClick={handleSignInFacebook}>Log in with Facebook</Button>
        </Stack>
      </Card>
    </Container>
  );
}

export default LoginPage;
