import { ChangeEvent, useState } from "react";
import { TextField, Stack } from "@mui/material";

import { useEditSection } from "../../utils/UseQueryHookSupabase.ts";
export default function TextFieldEditor({
  Id,
  columnTitle,
  selectionTable,
  eqColumn,
  labelText,
  closeEdit,
  editValue,
}: {
  Id: string;
  columnTitle: string;
  selectionTable: string;
  eqColumn: string;
  labelText: string;
  closeEdit: () => void;
  editValue: string;
}) {
  const [textEdit, setTextEdit] = useState(editValue);
  const { mutate: updateSection } = useEditSection(selectionTable);
  function handleTextEdit(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setTextEdit(event.target.value);
  }

  function handleSubmitEdit() {
    updateSection({
      Id,
      textEdit,
      columnTitle,
      selectionTable,
      eqColumn,
    });
  }

  return (
    <>
      <Stack
        alignContent={"center"}
        justifyContent={"center"}
        direction={"row"}
        sx={{ p: 2, width: "60%" }}
        spacing={1}
      >
        <TextField
          sx={{ width: "80%" }}
          onBlur={() => {
            if (textEdit === editValue) closeEdit();
            else {
              handleSubmitEdit();
              closeEdit();
            }
          }}
          multiline
          autoFocus
          label={labelText}
          value={textEdit}
          variant={"outlined"}
          onChange={(event) => handleTextEdit(event)}
        />
      </Stack>
    </>
  );
}
