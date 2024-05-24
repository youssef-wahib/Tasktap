import { Card, CardContent, Container, Stack, Typography } from "@mui/material";

import { useFetchSections } from "../utils/useQuerySupabase.ts";
import { useParams } from "react-router-dom";
import { Database } from "../supabaseTypes.ts";
import CreateNewSection from "../components/sectionAndTaskCreation/CreateNewSection.tsx";
import ProjectSectionsAndTasks from "../components/ProjectSectionsAndDetails/ProjectSectionsAndTasks.tsx";
type sectionsType = Database["public"]["Tables"]["sections"]["Row"];
function ProjectPage() {
  const { id } = useParams();

  const { data: Sections } = useFetchSections(id as string);

  return (
    <Container sx={{ pt: "1%" }}>
      <CreateNewSection projectId={id as string} />

      <Stack spacing={4}>
        {Sections?.length ? (
          Sections?.map((section: sectionsType) => (
            <ProjectSectionsAndTasks key={section.id} {...section} />
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
