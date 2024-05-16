import { Stack } from "@mui/material";

import ProjectCardDisplay from "../components/ProjectSectionsAndDetails/ProjectCardDisplay.tsx";

import { useFetchProjects } from "../utils/useQuerySupabase.ts";

import { useParams } from "react-router-dom";
import { Database } from "../supabaseTypes.ts";
type projectRow = Database["public"]["Tables"]["projects"]["Row"];
function UserProjectsPage() {
  const { id } = useParams();

  const { data: projects, isSuccess } = useFetchProjects(id as string);

  if (isSuccess) {
    return (
      <Stack spacing={3} direction="column" alignItems={"center"}>
        {projects?.map((project: projectRow, index: number) => {
          return (
            <div style={{ width: "100%" }} key={project.id}>
              <ProjectCardDisplay key={project.id} {...project} />{" "}
              {projects.length - 1 !== index ? (
                <hr style={{ width: "80%" }} />
              ) : null}
            </div>
          );
        })}
      </Stack>
    );
  }
}

export default UserProjectsPage;
