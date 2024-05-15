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
      <Card variant={"elevation"} elevation={0}>
        <Stack direction={"column"} spacing={3} sx={{ p: 3 }}>
          <Typography
            variant={"h5"}
            align={"center"}
            fontWeight={"bold"}
            color={"text"}
          >
            Sign in to your account
          </Typography>
          <SignIn />
          <Divider>Or continue with</Divider>
          <Stack direction={"row"} spacing={1} justifyContent={"space-around"}>
            <Button
              fullWidth
              startIcon={
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  height="20"
                  alignmentBaseline={"central"}
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              }
              onClick={handleSignInGoogle}
            />
            <Button
              fullWidth
              startIcon={
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  height="20"
                >
                  <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                </svg>
              }
              onClick={handleSignInFacebook}
            />
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}

export default LoginPage;
