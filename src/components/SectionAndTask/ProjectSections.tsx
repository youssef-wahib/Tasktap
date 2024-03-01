import {
  Card,
  CardContent,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { SectionTypeSupabase, TaskSupabase } from "../../utils/ProjectTypes.ts";
import SingleTaskComponent from "./SingleTaskComponent.tsx";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useEffect, useState } from "react";
import {
  useFetchTasksOfSection,
  useUpdateTAskOrder,
} from "../../utils/UseQueryHookSupabase.ts";
import PopoverEditor from "../reuseableComponents/PopoverEditor.tsx";
import AddSingleTask from "./AddSingleTask.tsx";
import DeleteSectionConfirmation from "./DeleteSectionConfirmation.tsx";

const ProjectSections = ({
  SectionTitle,
  SectionId,
  SectionCreatedAt,
  SectionDescription,
}: SectionTypeSupabase) => {
  const {
    data: SectionTasks,

    isSuccess,
  } = useFetchTasksOfSection(SectionId);
  const [taskList, setTaskList] = useState(SectionTasks as TaskSupabase[]);
  const [isAddNewTask, setIsAddNewTask] = useState(false);
  const { mutate: updateTaskLocation, isSuccess: reordered } =
    useUpdateTAskOrder();
  useEffect(() => {
    if (SectionTasks) {
      setTaskList(SectionTasks);
    }
  }, [SectionTasks]);

  function handleCloseAddSingleTask() {
    setIsAddNewTask(false);
  }
  const getPosition = (id: string) =>
    taskList.findIndex((taskList) => taskList.TaskId === id);
  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const updatedTaskList = arrayMove(
        taskList,
        getPosition(active.id),
        getPosition(over.id),
      );
      setTaskList(updatedTaskList);
      updateTaskLocation(updatedTaskList);
    }
  };
  console.log(reordered);
  console.log(taskList);
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 3,
    },
  });
  const sensors = useSensors(pointerSensor);
  const SectionTime = new Date(SectionCreatedAt);

  if (isSuccess && taskList)
    return (
      <Container>
        <Card>
          <CardContent>
            <Stack spacing={2} direction={"row"} justifyContent={"center"}>
              <Typography variant={"h3"} align={"center"}>
                {SectionTitle.toUpperCase()}
              </Typography>
              <PopoverEditor
                Id={SectionId}
                columnTitle={"SectionTitle"}
                selectionTable={"Sections of Projects"}
                eqColumn={"SectionId"}
                labelText={"Edit Title"}
              />
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1} py={2}>
              <Typography gutterBottom variant={"h4"}>
                Description: {SectionDescription}
              </Typography>
              <PopoverEditor
                Id={SectionId}
                columnTitle={"SectionDescription"}
                selectionTable={"Sections of Projects"}
                eqColumn={"SectionId"}
                labelText={"Edit Description"}
              />
            </Stack>
            <Typography gutterBottom variant={"subtitle2"}>
              Date: {SectionTime ? SectionTime.toUTCString() : ""}
            </Typography>

            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
              <SortableContext
                id={SectionId}
                items={taskList?.map((task) => task.TaskId)}
              >
                {taskList?.length ? (
                  taskList.map((task) => (
                    <SingleTaskComponent key={task.TaskId} {...task} />
                  ))
                ) : (
                  <Typography variant={"h6"}>
                    No Tasks in this Section
                  </Typography>
                )}
              </SortableContext>
            </DndContext>
            {isAddNewTask ? (
              <AddSingleTask
                SectionRef={SectionId}
                handleCloseAddSingleTask={handleCloseAddSingleTask}
              />
            ) : null}
            <Stack direction={"row"} justifyContent={"space-around"}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsAddNewTask(!isAddNewTask)}
              >
                Add new Task
              </Button>
              <DeleteSectionConfirmation SectionId={SectionId} />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
};

export default ProjectSections;
