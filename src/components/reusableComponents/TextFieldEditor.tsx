import { ChangeEvent, useState } from "react";
import { TextField, Box } from "@mui/material";

import { useEdit } from "../../utils/useQuerySupabase.ts";
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
  const { mutate: updateSection } = useEdit(selectionTable);
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
      <Box sx={{ p: 2 }}>
        <TextField
          type={columnTitle === "deadline" ? "date" : "text"}
          sx={{
            '& input[type="date"]::-webkit-calendar-picker-indicator': {
              filter: "invert(1) brightness(1.5)",
              cursor: "pointer",
            },
          }}
          onBlur={() => {
            if (textEdit === editValue) closeEdit();
            else {
              handleSubmitEdit();
              closeEdit();
            }
          }}
          fullWidth
          autoFocus
          label={labelText}
          value={textEdit}
          variant={"outlined"}
          onChange={(event) => handleTextEdit(event)}
        />
      </Box>
    </>
  );
}
