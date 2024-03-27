import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskNumberDropDown from "./taskNumberDropDown.tsx";
import { ChangeEvent, useState } from "react";
import AddTaskToSection from "./AddTaskToSection.tsx";
import { SectionTypeSupabase, TaskSupabase } from "../../utils/ProjectTypes.ts";
import {
  usePostNewSection,
  usePostNewTaskSet,
} from "../../utils/UseQueryHookSupabase.ts";

// create an array of the tasks and submit the entire section to the current project
function CreateProjectSectionAndTasks({ projectId }: { projectId: string }) {
  const [selectedNumberOfTasks, setSelectedNumberOfTasks] = useState("1");
  const [userTasks, setUserTasks] = useState([] as TaskSupabase[]);
  const [getSectionTitle, setGetSectionTitle] = useState("");
  const [getSectionDescription, setGetSectionDescription] = useState("");
  const [newSectionId] = useState(crypto.randomUUID());
  function getNumberOfTasks(NumberOfTasks: string) {
    setSelectedNumberOfTasks(NumberOfTasks);
    const NumOfTasks = parseInt(NumberOfTasks);
    if (userTasks.length < NumOfTasks) {
      const newTasks = userTasks.filter((task) => task.Task.length > 0);
      setUserTasks(newTasks);
    }
    if (userTasks.length > parseInt(NumberOfTasks)) {
      const newTasks = userTasks.splice(0, NumOfTasks);
      setUserTasks(newTasks);
    }
  }

  const { mutate: postNewTaskSet, isSuccess } = usePostNewTaskSet();
  const { mutate: postNewSection } = usePostNewSection(() => {
    postNewTaskSet(userTasks);
  });
  if (isSuccess) window.location.reload();
  function getTask(Task: TaskSupabase) {
    setUserTasks((prevState) => {
      let found = false;

      const updatedTasks = prevState.map((currentTask) => {
        if (currentTask.TaskId === Task.TaskId) {
          found = true;
          return Task;
        }
        return currentTask;
      });

      if (!found) {
        return [...updatedTasks, Task];
      }

      return updatedTasks;
    });
  }

  function handleSectionTitle(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const SectionTitle = event.target.value;
    setGetSectionTitle(SectionTitle);
  }
  function handleSectionDescription(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const SectionDescription = event.target.value;
    setGetSectionDescription(SectionDescription);
  }

  function handleSubmit() {
    const Section: SectionTypeSupabase = {
      SectionId: newSectionId,
      SectionTitle: getSectionTitle,
      SectionDescription: getSectionDescription,
      SectionCreatedAt: new Date().toLocaleString(),
      ProjectRef: projectId,
    };
    console.log(Section);
    console.log(userTasks);

    if (!!getSectionTitle && userTasks.some((task) => !!task.Task.length))
      postNewSection(Section);
  }

  const tasksGenerator = Array.from({
    length: parseInt(selectedNumberOfTasks),
  });

  return (
    <Container>
      <Card elevation={3}>
        <CardContent>
          <Typography align={"center"} variant={"h4"}>
            Add a new Section with tasks
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 4 }}>
          <Stack width={"100%"} spacing={2} pl={2}>
            <Typography variant={"h6"}>Section Title: </Typography>
            <TextField
              value={getSectionTitle}
              label="Section Title"
              variant="outlined"
              required
              onChange={(event) => handleSectionTitle(event)}
            />
            {getSectionTitle ? null : (
              <Typography variant={"subtitle1"} color={"cadetblue"}>
                ** Section Title must be entered! **
              </Typography>
            )}
            <Typography variant={"h6"}>Section Description: </Typography>
            <TextField
              value={getSectionDescription}
              label="Section Description"
              variant="outlined"
              onChange={(event) => handleSectionDescription(event)}
            />
            <Typography variant={"h6"}> Select Number of Tasks: </Typography>

            <TaskNumberDropDown getNumberOfTasksFromUser={getNumberOfTasks} />
            <Typography variant={"h6"}>
              Write {parseInt(selectedNumberOfTasks)} Tasks here:
            </Typography>

            {tasksGenerator.map((_makeTask, index) => (
              <AddTaskToSection
                getTaskFromUser={getTask}
                key={index}
                Index={index}
                SectionRef={newSectionId}
              />
            ))}
            <Button
              size={"large"}
              startIcon={<AddTaskIcon />}
              fullWidth
              variant={"contained"}
              onClick={handleSubmit}
            >
              Add Section
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
}

export default CreateProjectSectionAndTasks;
