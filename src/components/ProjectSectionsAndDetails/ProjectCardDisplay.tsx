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
import LoadingComponent from "../reuseableComponents/LoadingComponent.tsx";
import PopoverEditor from "../reuseableComponents/PopoverEditor.tsx";
import DeleteProjectConfirmation from "./DeleteProjectConfirmation.tsx";

function ProjectCardDisplay({
  ProjectName,
  ProjectDescription,
  ProjectId,
}: BaseProjectTypeSupabase) {
  const {
    data: ProjectSection,
    isSuccess,
    isLoading,
  } = useFetchSectionOfProject(ProjectId);
  if (isLoading) return <LoadingComponent />;
  if (isSuccess)
    return (
      <Container sx={{ width: "50rem" }}>
        <Card elevation={3}>
          <CardContent>
            <Stack
              spacing={2}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant={"h4"} color={"text"} align={"center"}>
                {ProjectName}
              </Typography>
              <PopoverEditor
                Id={ProjectId}
                columnTitle={"ProjectName"}
                selectionTable={"Projects"}
                eqColumn={"ProjectId"}
                labelText={"Edit Title"}
              />
            </Stack>
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <Typography variant={"h5"} py={1}>
                Description:
              </Typography>
              <PopoverEditor
                Id={ProjectId}
                columnTitle={"ProjectDescription"}
                selectionTable={"Projects"}
                eqColumn={"ProjectId"}
                labelText={"Edit Description"}
              />
            </Stack>

            <Typography variant={"h6"} pb={1} pl={3} color={"textSecondary"}>
              {ProjectDescription}
            </Typography>
            {ProjectSection?.length ? (
              <Typography variant={"h5"}>Project Sections:</Typography>
            ) : null}
            <Stack>
              {ProjectSection?.map((section) => (
                <ListItem key={section.SectionTitle}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <CircleIcon fontSize={"small"} />
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
              <Button variant={"contained"}>Project Details</Button>
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
