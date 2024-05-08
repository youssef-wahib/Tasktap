import { Database } from "../../supabaseTypes.ts";
import { Card } from "@mui/material";
import SectionNameAndDescriptionEditor from "./SectionNameAndDescriptionEditor.tsx";
import TaskList from "./TaskList.tsx";
import AddTaskToList from "./AddTaskToList.tsx";

type sectionsType = Database["public"]["Tables"]["sections"]["Row"];
type tasksType = Database["public"]["Tables"]["tasks"]["Row"];

function ProjectSectionsAndTasks(section: sectionsType) {
  return (
    <Card variant={"outlined"} sx={{ p: 3 }}>
      <SectionNameAndDescriptionEditor {...section} />

      <TaskList sectionId={section.id} />
      <AddTaskToList sectionId={section.id} />
    </Card>
  );
}

export default ProjectSectionsAndTasks;
