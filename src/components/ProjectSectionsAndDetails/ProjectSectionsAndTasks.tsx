import { Database } from "../../supabaseTypes.ts";
import { Card, Stack } from "@mui/material";
import SectionNameAndDescriptionEditor from "../SectionAndTask/SectionNameAndDescriptionEditor.tsx";
import TaskList from "../SectionAndTask/TaskList.tsx";
import DeleteConfirmation from "../reusableComponents/DeleteConfirmation.tsx";

type sectionsType = Database["public"]["Tables"]["sections"]["Row"];

function ProjectSectionsAndTasks(section: sectionsType) {
  return (
    <Card variant={"outlined"}>
      <Stack p={3} spacing={2}>
        <SectionNameAndDescriptionEditor {...section} />
        <TaskList sectionId={section.id} />
        <DeleteConfirmation table={"sections"} Id={section.id} />
      </Stack>
    </Card>
  );
}

export default ProjectSectionsAndTasks;
