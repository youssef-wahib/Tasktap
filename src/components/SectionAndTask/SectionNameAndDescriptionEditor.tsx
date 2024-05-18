import { Stack, Typography } from "@mui/material";
import TextFieldEditor from "../reusableComponents/TextFieldEditor.tsx";
import { useState } from "react";
import { Database } from "../../supabaseTypes.ts";
type sectionsType = Database["public"]["Tables"]["sections"]["Row"];
function SectionNameAndDescriptionEditor({
  title,
  id,
  description,
  deadline,
}: sectionsType) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingDeadline, setIsEditingDeadline] = useState(false);
  function handleOpenEditingTitle() {
    setIsEditingTitle(true);
  }
  function handleCloseEditingTitle() {
    setIsEditingTitle(false);
  }
  function handleOpenEditingDescription() {
    setIsEditingDescription(true);
  }
  function handleCloseEditingDescription() {
    setIsEditingDescription(false);
  }
  function handleOpenEditingDeadline() {
    setIsEditingDeadline(true);
  }
  function handleCloseEditingDeadline() {
    setIsEditingDeadline(false);
  }
  const hover = {
    ["&:hover"]: {
      cursor: "pointer",
    },
  };
  return (
    <>
      {isEditingTitle ? (
        <TextFieldEditor
          editValue={title as string}
          closeEdit={handleCloseEditingTitle}
          Id={id}
          columnTitle={"title"}
          selectionTable={"sections"}
          eqColumn={"id"}
          labelText={"Edit Title"}
        />
      ) : (
        <Typography
          sx={hover}
          pb={2}
          variant={"h4"}
          align={"center"}
          onClick={handleOpenEditingTitle}
        >
          {title?.toUpperCase()}
        </Typography>
      )}

      <Stack direction={"column"} spacing={1}>
        {isEditingDeadline ? (
          <TextFieldEditor
            editValue={deadline as string}
            closeEdit={handleCloseEditingDeadline}
            Id={id}
            columnTitle={"deadline"}
            selectionTable={"sections"}
            eqColumn={"id"}
            labelText={"Edit Deadline"}
          />
        ) : (
          <Typography
            sx={hover}
            variant={"h6"}
            color={"primary"}
            onClick={handleOpenEditingDeadline}
          >
            Deadline: {deadline ? deadline : "Add deadline"}
          </Typography>
        )}
        <Typography
          sx={hover}
          variant={"h5"}
          onClick={handleOpenEditingDescription}
        >
          Description:
        </Typography>

        {isEditingDescription ? (
          <TextFieldEditor
            editValue={description as string}
            closeEdit={handleCloseEditingDescription}
            Id={id}
            columnTitle={"description"}
            selectionTable={"sections"}
            eqColumn={"id"}
            labelText={"Edit Description"}
          />
        ) : (
          <Typography
            color={"textSecondary"}
            sx={hover}
            pl={3}
            variant={"h6"}
            textAlign={"justify"}
            onClick={handleOpenEditingDescription}
          >
            {description ? description : "Add Description"}
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default SectionNameAndDescriptionEditor;
