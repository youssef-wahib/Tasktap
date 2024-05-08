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

import { usePostNewProject } from "../utils/useQuerySupabase.ts";
import CustomizedSnackbars from "../components/reusableComponents/EventSuccessSnackBar.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Database } from "../supabaseTypes.ts";

import { supabase } from "../utils/supabase.ts";

type projectsType = Database["public"]["Tables"]["projects"];

function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<projectsType["Insert"]>();
  const { mutate: addNewProject, isLoading, isSuccess } = usePostNewProject();
  const onSubmit: SubmitHandler<projectsType["Insert"]> = (data) => {
    supabase.auth.onAuthStateChange((_event, session) => {
      data.userId = session?.user.id;
    });
    data.id = crypto.randomUUID();
    addNewProject(data);
    console.log("submitted");
    reset();
  };

  return (
    <Container sx={{ pt: "2%" }}>
      <Card variant={"outlined"}>
        <CardContent>
          <Typography
            color={"text.primary"}
            variant={"h2"}
            gutterBottom
            align={"center"}
          >
            Create Your Project
          </Typography>
          <Typography color={"text.secondary"} variant={"h5"} align={"center"}>
            Enter the name of your project and a small description.
          </Typography>
        </CardContent>
        <Container sx={{ p: 3 }} maxWidth={"sm"}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
            <Stack direction={"column"} spacing={4}>
              <TextField
                variant={"outlined"}
                label={"Project Name"}
                {...register("name", {
                  required: "Please enter a Project name",
                })}
              />
              <TextField
                variant={"outlined"}
                label={"Project Description"}
                {...register("description")}
              />

              <Button
                disableElevation
                color={"secondary"}
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
