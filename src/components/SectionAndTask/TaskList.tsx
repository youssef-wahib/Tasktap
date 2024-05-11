import { Stack, Typography } from "@mui/material";
import {
  useFetchTasks,
  useUpdateTaskOrder,
} from "../../utils/useQuerySupabase.ts";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import InteractiveTask from "./Tasks/InteractiveTask.tsx";
import AddNewTask from "./Tasks/AddNewTask.tsx";

function TaskList({ sectionId }: { sectionId: string }) {
  const { data: Tasks, isSuccess } = useFetchTasks(sectionId);
  const [taskList, setTaskList] = useState(Tasks);
  useEffect(() => {
    setTaskList(Tasks);
  }, [Tasks]);
  const getPosition = (id: string) =>
    taskList ? taskList.findIndex((task) => task.id === id) : -1;
  const { mutate: updateTaskOrder } = useUpdateTaskOrder();
  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;

    // Ensure that both active and over items are valid and that taskList is not empty
    if (
      !taskList ||
      taskList.length === 0 ||
      !active ||
      !over ||
      active.id === over.id
    ) {
      return; // Early return if conditions are not met for a valid operation
    }

    // Get positions only when both IDs are valid and different
    const activePosition = getPosition(active.id);
    const overPosition = getPosition(over.id);

    // Check if both positions are found
    if (activePosition === -1 || overPosition === -1) {
      return; // One of the elements wasn't found, no operation needed
    }

    // Proceed with reordering if all conditions are correct
    const updatedTaskList = arrayMove(taskList, activePosition, overPosition);
    setTaskList(updatedTaskList);
    updateTaskOrder(updatedTaskList);
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 3,
    },
  });
  const sensors = useSensors(pointerSensor);

  if (isSuccess)
    return (
      <Stack direction={"column"} spacing={1}>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext
            id={sectionId}
            items={taskList?.map((task) => task.id) ?? []}
          >
            {taskList?.length ? (
              taskList.map((task) => (
                <InteractiveTask key={task.id} {...task} />
              ))
            ) : (
              <Typography variant={"h6"}>No Tasks in this Section</Typography>
            )}
          </SortableContext>
        </DndContext>

        <AddNewTask SectionRef={sectionId} order={taskList?.length} />
      </Stack>
    );
}

export default TaskList;
