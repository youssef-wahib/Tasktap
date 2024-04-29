import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import DeleteProjectConfirmation from "./DeleteProjectConfirmation.tsx";
import ProjectNameAndDescriptionEditor from "../reusableComponents/ProjectNameAndDescriptionEditor.tsx";
import { Database } from "../../supabaseTypes.ts";
import { useFetchSections } from "../../utils/useQuerySupabase.ts";
type projectRow = Database["public"]["Tables"]["projects"]["Row"];
function ProjectCardDisplay({ name, description, id }: projectRow) {
  const { data: ProjectSection } = useFetchSections(id);
  return (
    <Container sx={{ width: "50rem" }}>
      <Card variant={"outlined"} elevation={0}>
        <CardContent>
          <ProjectNameAndDescriptionEditor
            DescriptionName={description}
            ProjectName={name}
            Id={id}
          />

          {ProjectSection?.length ? (
            <Typography variant={"h5"}>Sections:</Typography>
          ) : null}

          {ProjectSection?.map((section) => (
            <ListItem key={section.id}>
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
            <Button variant={"text"}>Details</Button>
          </Link>
          <DeleteProjectConfirmation ProjectId={id} />
        </CardActions>
      </Card>
    </Container>
  );
}

export default ProjectCardDisplay;
