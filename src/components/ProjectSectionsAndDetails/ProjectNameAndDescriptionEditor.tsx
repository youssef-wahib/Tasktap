import { Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import TextFieldEditor from "../reusableComponents/TextFieldEditor.tsx";

export default function ProjectNameAndDescriptionEditor({
  Id,
  ProjectName,
  ProjectDescription,
  accordionControl,
}: {
  Id: string;
  ProjectName: string;
  ProjectDescription?: string | null;
  accordionControl: Dispatch<SetStateAction<boolean>>;
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  function toggleEditTitle() {
    setIsEditingTitle(!isEditingTitle);

    accordionControl(true);
  }
  function toggleEditDescription() {
    setIsEditingDescription(!isEditingDescription);

    accordionControl(true);
  }

  return (
    <Stack direction="column" width={"95%"} px={1}>
      {isEditingTitle ? (
        <TextFieldEditor
          editValue={ProjectName}
          closeEdit={toggleEditTitle}
          Id={Id}
          columnTitle={"name"}
          selectionTable={"projects"}
          eqColumn={"id"}
          labelText={"Edit Title"}
        />
      ) : (
        <Typography
          variant={"h4"}
          color={"textPrimary"}
          align={"left"}
          onClick={toggleEditTitle}
        >
          {ProjectName}
        </Typography>
      )}
      <Typography color={"secondary"} variant={"h6"}>
        Description:
      </Typography>
      {isEditingDescription ? (
        <TextFieldEditor
          editValue={ProjectDescription as string}
          closeEdit={toggleEditDescription}
          Id={Id}
          columnTitle={"description"}
          selectionTable={"projects"}
          eqColumn={"id"}
          labelText={"Edit Description"}
        />
      ) : (
        <Typography
          variant={"body1"}
          textAlign={"justify"}
          pl={2.25}
          py={1}
          onClick={toggleEditDescription}
        >
          {ProjectDescription ? ProjectDescription : "Add Description"}
        </Typography>
      )}
    </Stack>
  );
}
