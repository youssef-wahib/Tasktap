import { Container, Stack, Typography } from "@mui/material";

import ProjectCardDisplay from "../components/ProjectSectionsAndDetails/ProjectCardDisplay.tsx";
import { BaseProjectTypeSupabase } from "../utils/ProjectTypes.ts";
import LoadingComponent from "../components/reuseableComponents/LoadingComponent.tsx";
import { useFetchProjects } from "../utils/UseQueryHookSupabase.ts";

function UserProjectsPage() {
  const { data: Projects, isLoading, isSuccess } = useFetchProjects();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isSuccess) {
    return (
      <Container maxWidth={false}>
        <Typography align={"center"} variant={"h3"}>
          Select your Project
        </Typography>
        <Stack spacing={3} direction="column" alignItems={"center"} mt={3}>
          {Projects?.map((project: BaseProjectTypeSupabase) => {
            return <ProjectCardDisplay key={project.ProjectId} {...project} />;
          })}
        </Stack>
      </Container>
    );
  }
}

export default UserProjectsPage;
