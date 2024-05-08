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
          pb={4}
          variant={"h4"}
          align={"center"}
          onClick={handleOpenEditingTitle}
        >
          {title?.toUpperCase()}
        </Typography>
      )}

      <Stack direction={"column"} pb={2} spacing={2}>
        <Typography variant={"h5"} onClick={handleOpenEditingDescription}>
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
            pl={3}
            variant={"h6"}
            onClick={handleOpenEditingDescription}
          >
            {description}
          </Typography>
        )}
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
          <Typography onClick={handleOpenEditingDeadline}>
            {deadline ? deadline : "Add deadline"}
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default SectionNameAndDescriptionEditor;
