import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { supabase } from "../../utils/supabase.ts";
import { useForm, SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
type FormFields = {
  email: string;
  password: string;
};
function SignIn() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
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
      <form onSubmit={handleSubmit(onSubmitSignIn)}>
        <Stack direction={"column"} spacing={2}>
          <TextField
            autoComplete="off"
            required
            label={"Email"}
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
              type={showPass ? "text" : "password"}
              required
              label={"Password"}
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPass(!showPass)}
              edge="end"
            >
              {showPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Stack>
          {errors.password ? (
            <Typography variant={"subtitle1"}>
              {errors.password.message}
              {errors?.root?.message}
            </Typography>
          ) : null}
          {errors.root ? (
            <Typography variant={"subtitle1"}>
              {errors?.root?.message}
            </Typography>
          ) : null}
          <Button type={"submit"}>Sign In</Button>
          <Button onClick={handleSubmit(onSubmitSignUp)}>
            SignUp to a new account
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default SignIn;
