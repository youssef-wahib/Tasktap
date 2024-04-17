import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import ProjectSections from "../components/SectionAndTask/ProjectSections.tsx";
import { SectionTypeSupabase } from "../utils/ProjectTypes.ts";
import CreateProjectSectionAndTasks from "../components/sectionAndTaskCreation/CreateProjectSectionAndTasks.tsx";
import { useFetchSectionOfProject } from "../utils/UseQueryHookSupabase.ts";

function ProjectPage() {
  const { data: Sections } = useFetchSectionOfProject(ProjectId);

  return (
    <Container sx={{ pt: "2%" }}>
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
