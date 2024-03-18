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
import { BaseProjectTypeSupabase } from "../../utils/ProjectTypes.ts";
import { useFetchSectionOfProject } from "../../utils/UseQueryHookSupabase.ts";
import DeleteProjectConfirmation from "./DeleteProjectConfirmation.tsx";
import ProjectNameAndEditor from "../reuseableComponents/ProjectNameAndEditor.tsx";
import ProjectDescriptionAndEditor from "../reuseableComponents/ProjectDescriptionAndEditor.tsx";

function ProjectCardDisplay({
  ProjectName,
  ProjectDescription,
  ProjectId,
}: BaseProjectTypeSupabase) {
  const { data: ProjectSection, isSuccess } =
    useFetchSectionOfProject(ProjectId);

  if (isSuccess)
    return (
      <Container sx={{ width: "50rem" }}>
        <Card variant={"outlined"} elevation={0}>
          <CardContent>
            <ProjectNameAndEditor
              ProjectName={ProjectName}
              Id={ProjectId}
              columnTitle={"ProjectName"}
              selectionTable={"Projects"}
              eqColumn={"ProjectId"}
              labelText={"Edit Title"}
            />

            <ProjectDescriptionAndEditor
              DescriptionName={ProjectDescription}
              Id={ProjectId}
              columnTitle={"ProjectDescription"}
              selectionTable={"Projects"}
              eqColumn={"ProjectId"}
              labelText={"Edit Description"}
            />

            {ProjectSection?.length ? (
              <Typography variant={"h5"}>Project Sections:</Typography>
            ) : null}
            <Stack>
              {ProjectSection?.map((section) => (
                <ListItem key={section.SectionTitle}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <CircleIcon color={"secondary"} fontSize={"small"} />
                  </ListItemIcon>
                  <ListItemText color={"text"}>
                    {section.SectionTitle}
                  </ListItemText>
                </ListItem>
              ))}
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-evenly", pb: 2.5 }}>
            <Link to={`/${ProjectId}`}>
              <Button variant={"text"}>Project Details</Button>
            </Link>
            <DeleteProjectConfirmation
              ProjectId={ProjectId}
              SectionId={ProjectSection.map((Section) => Section.SectionId)}
            />
          </CardActions>
        </Card>
      </Container>
    );
}

export default ProjectCardDisplay;
