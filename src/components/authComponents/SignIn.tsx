import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { supabase } from "../../utils/supabase.ts";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
type FormFields = {
  email: string;
  password: string;
};
function SignIn() {
  const navigate = useNavigate();
  const [toggleSignIn, setToggleSignIn] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormFields>();
  const onSubmitSignIn: SubmitHandler<FormFields> = async (data) => {
    const { error, data: res } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setError("root", { message: error.message });
    }
    if (res.user) navigate(`/${res.user.id}`);
  };
  const onSubmitSignUp: SubmitHandler<FormFields> = async (data) => {
    const { error, data: res } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) setError("root", { message: error.message });
    if (res.user) navigate(`/${res.user.id}`);
  };

  return (
    <>
      <form
        onSubmit={
          toggleSignIn
            ? handleSubmit(onSubmitSignIn)
            : handleSubmit(onSubmitSignUp)
        }
      >
        <Stack direction={"column"} spacing={3}>
          <Stack direction={"row"} justifyContent={"space-around"} pb={2}>
            <Box
              borderBottom={
                !toggleSignIn
                  ? `solid cadetblue`
                  : `solid ${"rgba(95,158,160,0.2)"}`
              }
              sx={{ width: "48%" }}
            >
              <Typography
                variant={"h6"}
                color={"cadetblue"}
                onClick={() => setToggleSignIn(false)}
                align={"center"}
                sx={{
                  ["&:hover"]: {
                    cursor: "pointer",
                    color: "rgba(95,158,160,0.8)",
                  },
                }}
              >
                Sign up
              </Typography>
            </Box>
            <Box
              sx={{ width: "48%" }}
              borderBottom={
                toggleSignIn
                  ? `solid cadetblue`
                  : `solid ${"rgba(95,158,160,0.2)"}`
              }
            >
              <Typography
                variant={"h6"}
                color={"cadetblue"}
                onClick={() => setToggleSignIn(true)}
                align={"center"}
                sx={{
                  ["&:hover"]: {
                    cursor: "pointer",
                    color: "rgba(95,158,160,0.8)",
                  },
                }}
              >
                Log in
              </Typography>
            </Box>
          </Stack>
          <TextField
            autoComplete="email"
            sx={{ color: "red" }}
            required
            placeholder={"Email"}
            {...register("email", {
              required: true,
              validate: (value) => {
                if (value.includes("@")) return true;
                else {
                  return "Email missing @";
                }
              },
            })}
          />
          {errors.email ? (
            <Typography variant={"subtitle1"}>
              {errors.email.message}
              {errors.root?.message}
            </Typography>
          ) : null}
          <Stack direction={"row"} spacing={1}>
            <TextField
              autoComplete="off"
              fullWidth
              type={"password"}
              required
              placeholder={"Password"}
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </Stack>
          {errors.password ? (
            <Typography variant={"subtitle1"}>
              {errors.password.message}
            </Typography>
          ) : null}
          {errors.root ? (
            <Typography variant={"subtitle1"}>
              {errors?.root?.message}
            </Typography>
          ) : null}
          <Button variant={"contained"} type={"submit"}>
            {toggleSignIn ? "Log In" : "Sign Up"}
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default SignIn;
