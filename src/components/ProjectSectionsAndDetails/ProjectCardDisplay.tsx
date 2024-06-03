import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
type projectRow = Database["public"]["Tables"]["projects"]["Row"];
function ProjectCardDisplay({ name, description, id }: projectRow) {
  const { data: ProjectSection } = useFetchSections(id);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <Accordion
      sx={{ width: "100%" }}
      expanded={isExpanded}
      variant={"elevation"}
      elevation={0}
      onChange={() => setIsExpanded(!isExpanded)}
    >
      <AccordionSummary
        sx={{ width: "100%" }}
        expandIcon={<ExpandMoreIcon color={"secondary"} />}
      >
        <ProjectNameAndDescriptionEditor
          ProjectDescription={description}
          ProjectName={name}
          Id={id}
          accordionControl={setIsExpanded}
        />
      </AccordionSummary>

      <Container>
        <Typography variant={"h6"} color={"secondary"}>
          {ProjectSection?.length ? "Sections:" : "There are no sections here"}
        </Typography>
        {ProjectSection?.map((section) => (
          <ListItem key={section.id} sx={{ flexWrap: "wrap" }}>
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <CircleIcon color={"primary"} fontSize={"small"} />
            </ListItemIcon>
            <ListItemText color={"text"}>{section.title}</ListItemText>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <ListItemText color={"text"}>{section.deadline}</ListItemText>
            </Stack>
          </ListItem>
        ))}
      </Container>
      <AccordionDetails
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
        }}
      >
        <Button variant={"contained"}>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to={`${id}`}
          >
            Details
          </Link>
        </Button>
        <DeleteConfirmation Id={id} table={"projects"} />
      </AccordionDetails>
    </Accordion>
  );
}

export default ProjectCardDisplay;
