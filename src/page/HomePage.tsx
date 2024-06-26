import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";

import { useGetUser, usePostNewProject } from "../utils/useQuerySupabase.ts";
import CustomizedSnackbars from "../components/reusableComponents/EventSuccessSnackBar.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Database } from "../supabaseTypes.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type projectsType = Database["public"]["Tables"]["projects"];

function HomePage() {
  const [currentUser, setCurrentUser] = useState<string>();
  const { data: userResponse, isSuccess: userFetched } = useGetUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (userFetched && userResponse.data.user)
      setCurrentUser(userResponse?.data.user?.id);
  }, [userResponse, userFetched]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<projectsType["Insert"]>();
  const { mutate: addNewProject, isLoading, isSuccess } = usePostNewProject();
  const onSubmit: SubmitHandler<projectsType["Insert"]> = (data) => {
    if (currentUser) {
      data.userId = currentUser;
      addNewProject(data);
      setTimeout(() => navigate(`/${currentUser}/projects`), 2500);
    }
    data.id = crypto.randomUUID();
    reset();
  };

  return (
    <Container sx={{ pt: "2%" }}>
      <Card variant={"elevation"} elevation={0}>
        <CardContent>
          <Typography
            gutterBottom
            color={"text.primary"}
            variant={"h3"}
            align={"center"}
            fontWeight={"bold"}
          >
            Create Your Project
          </Typography>
          <Typography color={"text.secondary"} variant={"h5"} align={"center"}>
            Enter the name of your project and a description.
          </Typography>
        </CardContent>
        <Container sx={{ p: 3 }} maxWidth={"sm"}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
            <Stack direction={"column"} spacing={4}>
              <TextField
                placeholder={"Project Name"}
                {...register("name", {
                  required: "Please enter a Project name",
                })}
              />
              <TextField
                multiline
                placeholder={"Project Description"}
                {...register("description")}
              />
              <Button
                disableElevation
                variant={"contained"}
                type={"submit"}
                startIcon={<SwitchAccessShortcutAddIcon />}
                disabled={isLoading}
              >
                Add Project
              </Button>
              <Typography variant={"h6"} align={"center"}>
                {errors.name?.message}
              </Typography>
              {isSuccess ? (
                <CustomizedSnackbars message={"Project Created"} />
              ) : null}
            </Stack>
          </form>
        </Container>
      </Card>
    </Container>
  );
}

export default HomePage;
