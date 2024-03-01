import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProjectSections from "../components/SectionAndTask/ProjectSections.tsx";
import LoadingComponent from "../components/reuseableComponents/LoadingComponent.tsx";
import { SectionTypeSupabase } from "../utils/ProjectTypes.ts";
import CreateProjectSectionAndTasks from "../components/sectionAndTaskCreation/CreateProjectSectionAndTasks.tsx";
import { useFetchSectionOfProject } from "../utils/UseQueryHookSupabase.ts";

function ProjectPage() {
  const { id } = useParams();
  const ProjectId = id as string;
  const {
    isFetched,
    data: Sections,
    isLoading,
  } = useFetchSectionOfProject(ProjectId);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isFetched)
    return (
      <Container sx={{ alignContent: "center" }}>
        <CreateProjectSectionAndTasks projectId={ProjectId} />
        <Stack spacing={4} mt={5}>
          {Sections?.length ? (
            Sections?.map((section: SectionTypeSupabase) => (
              <ProjectSections key={section.SectionId} {...section} />
            ))
          ) : (
            <Card sx={{ alignSelf: "center" }}>
              <CardContent>
                <Typography variant={"h4"} align={"center"}>
                  There are no sections here
                </Typography>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>
    );
}

export default ProjectPage;
