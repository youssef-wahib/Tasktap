import { Stack, Typography } from "@mui/material";
import TextFieldEditor from "../reuseableComponents/TextFieldEditor.tsx";
import { SectionTypeSupabase } from "../../utils/ProjectTypes.ts";
import { useState } from "react";

function SectionNameAndDescriptionEditor({
  SectionTitle,
  SectionId,
  SectionDescription,
  SectionCreatedAt,
}: SectionTypeSupabase) {
  const SectionTime = new Date(SectionCreatedAt);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
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
  return (
    <>
      <Stack spacing={2} direction={"row"} justifyContent={"center"}>
        {isEditingTitle ? (
          <TextFieldEditor
            editValue={SectionTitle}
            closeEdit={handleCloseEditingTitle}
            Id={SectionId}
            columnTitle={"SectionTitle"}
            selectionTable={"Sections of Projects"}
            eqColumn={"SectionId"}
            labelText={"Edit Title"}
          />
        ) : (
          <Typography
            variant={"h3"}
            align={"center"}
            onClick={handleOpenEditingTitle}
          >
            {SectionTitle.toUpperCase()}
          </Typography>
        )}
      </Stack>
      <Stack direction={"column"} pb={2} spacing={2}>
        <Typography variant={"h4"} onClick={handleOpenEditingDescription}>
          Description:
        </Typography>
        {isEditingDescription ? (
          <TextFieldEditor
            editValue={SectionDescription}
            closeEdit={handleCloseEditingDescription}
            Id={SectionId}
            columnTitle={"SectionDescription"}
            selectionTable={"Sections of Projects"}
            eqColumn={"SectionId"}
            labelText={"Edit Description"}
          />
        ) : (
          <Typography
            pl={3}
            variant={"h5"}
            onClick={handleOpenEditingDescription}
          >
            {SectionDescription}
          </Typography>
        )}
      </Stack>
      <Typography gutterBottom variant={"h6"} color={"rgba(255,255,255,0.75)"}>
        Date: {SectionTime ? SectionTime.toUTCString() : ""}
      </Typography>
    </>
  );
}

export default SectionNameAndDescriptionEditor;
