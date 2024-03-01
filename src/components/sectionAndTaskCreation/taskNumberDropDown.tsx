import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

function TaskNumberDropDown({
  getNumberOfTasksFromUser,
}: {
  getNumberOfTasksFromUser: (taskNumber: string) => void;
}) {
  const [getTaskNumber, setGetTaskNumber] = useState("1");
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    setGetTaskNumber(newValue);
    getNumberOfTasksFromUser(newValue);
  };
  const numbersInWords = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <Box sx={{ maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel>Select Number of Tasks</InputLabel>
        <Select
          value={getTaskNumber}
          label="Select Number of Tasks"
          onChange={(event) => {
            handleChange(event);
          }}
        >
          {numbersInWords.map((number) => (
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default TaskNumberDropDown;
