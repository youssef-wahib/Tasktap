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
import AddSingleTask from "./AddSingleTask.tsx";
import DeleteSectionConfirmation from "./DeleteSectionConfirmation.tsx";
import SectionNameAndDescriptionEditor from "./SectionNameAndDescriptionEditor.tsx";

const ProjectSections = ({
  SectionTitle,
  SectionId,
  SectionCreatedAt,
  SectionDescription,
}: SectionTypeSupabase) => {
  const { data: SectionTasks, isSuccess } = useFetchTasksOfSection(SectionId);
  const [taskList, setTaskList] = useState(SectionTasks as TaskSupabase[]);
  const [isAddNewTask, setIsAddNewTask] = useState(false);
  const { mutate: updateTaskLocation } = useUpdateTAskOrder();
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

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 3,
    },
  });
  const sensors = useSensors(pointerSensor);

  if (isSuccess && taskList)
    return (
      <Container>
        <Card>
          <CardContent>
            <SectionNameAndDescriptionEditor
              SectionTitle={SectionTitle}
              SectionId={SectionId}
              SectionCreatedAt={SectionCreatedAt}
              SectionDescription={SectionDescription}
            />
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
