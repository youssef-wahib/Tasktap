import {
  Button,
  Card,
  CardActions,
  CardContent,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../reusableComponents/DeleteConfirmation.tsx";
import ProjectNameAndDescriptionEditor from "./ProjectNameAndDescriptionEditor.tsx";
import { Database } from "../../supabaseTypes.ts";
import { useFetchSections } from "../../utils/useQuerySupabase.ts";
type projectRow = Database["public"]["Tables"]["projects"]["Row"];
function ProjectCardDisplay({ name, description, id }: projectRow) {
  const { data: ProjectSection } = useFetchSections(id);
  return (
    <Card variant={"outlined"} sx={{ width: "100%" }}>
      <CardContent>
        <ProjectNameAndDescriptionEditor
          ProjectDescription={description}
          ProjectName={name}
          Id={id}
        />

        {ProjectSection?.length ? (
          <Typography variant={"h5"}>Sections:</Typography>
        ) : null}

        {ProjectSection?.map((section) => (
          <ListItem key={section.id} sx={{ flexWrap: "wrap" }}>
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <CircleIcon color={"secondary"} fontSize={"small"} />
            </ListItemIcon>
            <ListItemText color={"text"}>{section.title}</ListItemText>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <ListItemText color={"text"}>{section.deadline}</ListItemText>
            </Stack>
          </ListItem>
        ))}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-evenly", pb: 2.5 }}>
        <Link to={`${id}`}>
          <Button variant={"contained"}>Details</Button>
        </Link>

        <DeleteConfirmation Id={id} table={"projects"} />
      </CardActions>
    </Card>
  );
}

export default ProjectCardDisplay;
