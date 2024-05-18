import { Typography } from "@mui/material";
import { useState } from "react";
import TextFieldEditor from "../reusableComponents/TextFieldEditor.tsx";

export default function ProjectNameAndDescriptionEditor({
  Id,
  ProjectName,
  ProjectDescription,
}: {
  Id: string;
  ProjectName: string;
  ProjectDescription?: string | null;
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  function toggleEditTitle() {
    setIsEditingTitle(!isEditingTitle);
  }
  function toggleEditDescription() {
    setIsEditingDescription(!isEditingDescription);
  }

  return (
    <>
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
          color={"text"}
          align={"center"}
          onClick={toggleEditTitle}
        >
          {ProjectName}
        </Typography>
      )}
      <Typography variant={"h5"} py={1}>
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
          pb={1}
          pl={3}
          onClick={toggleEditDescription}
        >
          {ProjectDescription ? ProjectDescription : "Add Description"}
        </Typography>
      )}
    </>
  );
}
