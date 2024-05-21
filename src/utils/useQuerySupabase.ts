import { supabase } from "./supabase.ts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Database } from "../supabaseTypes.ts";

type projectsType = Database["public"]["Tables"]["projects"];
type sectionsType = Database["public"]["Tables"]["sections"];
type tasksType = Database["public"]["Tables"]["tasks"];
type tableName = keyof Database["public"]["Tables"];

export function usePostNewProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProject: projectsType["Insert"]) =>
      await supabase.from("projects").insert([newProject]),
    onSuccess: () => {
      queryClient
        .invalidateQueries(["projects"])
        .then(() => console.log("Projects query invalidated and refetched"));
    },
    onError: (error) => console.log(error),
    mutationKey: ["projects"],
  });
}
export function usePostNewSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSection: sectionsType["Insert"]) =>
      await supabase.from("sections").insert([newSection]),
    onSuccess: () => {
      queryClient
        .invalidateQueries(["sections"])
        .then(() => console.log("Sections query invalidated and refetched"));
    },
    onError: (error) => console.log(error),
    mutationKey: ["sections"],
  });
}
export function usePostNewTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTask: tasksType["Insert"]) =>
      await supabase.from("tasks").insert([newTask]),
    onSuccess: () => {
      queryClient
        .invalidateQueries(["tasks"])
        .then(() => console.log("Tasks query invalidated and refetched"));
    },
    onError: (error) => console.log(error),
    mutationKey: ["tasks"],
  });
}

export function useFetchProjects(userId: string) {
  return useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("userId", userId);
      return data as Database["public"]["Tables"]["projects"]["Row"][];
    },
    queryKey: ["projects", userId],
    onError: (err) => console.log(err),
  });
}
export function useDelete(tableName: tableName) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      await supabase.from(tableName).delete().eq("id", id),
    onSuccess: () => {
      queryClient
        .invalidateQueries([tableName])
        .then(() => console.log("Projects query invalidated and refetched"));
    },
    onError: (err) => console.log(err),
    mutationKey: [tableName],
  });
}

export function useEdit(selectionTable: tableName) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      Id,
      textEdit,
      columnTitle,
      selectionTable,
      eqColumn,
    }: {
      Id: string;
      textEdit: string;
      columnTitle: string;
      selectionTable: tableName;
      eqColumn: string;
    }) =>
      await supabase
        .from(selectionTable)
        .update({ [columnTitle]: textEdit })
        .eq(eqColumn, Id),

    onSuccess: () =>
      queryClient
        .invalidateQueries([selectionTable])
        .then(() => console.log("Edited successfully")),
  });
}
export function useFetchSections(projectId: string) {
  return useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("sections")
        .select("*")
        .eq("projectId", projectId);
      return data;
    },
    queryKey: ["sections", projectId],
    onError: (err) => console.log(err),
  });
}
export function useFetchTasks(sectionId: string) {
  return useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("sectionId", sectionId)
        .order("order");
      return data;
    },
    queryKey: ["tasks", sectionId],
    onError: (err) => console.log(err),
  });
}

async function editTaskQueryFn(
  id: string,
  edit: string | boolean,
  upColumn: string,
) {
  const { error } = await supabase
    .from("tasks")
    .update({ [upColumn]: edit })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export function useEditTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, edit }: { id: string; edit: string | boolean }) => {
      if (typeof edit === "string") return editTaskQueryFn(id, edit, "title");
      else return editTaskQueryFn(id, edit, "completed");
    },
    mutationKey: ["tasks", editTaskQueryFn],
    onSuccess: () =>
      queryClient
        .invalidateQueries(["tasks"])
        .then(() => console.log("Edited successfully")),
  });
}

export function useUpdateTaskOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTasks: tasksType["Row"][]) =>
      await supabase
        .from("tasks")
        .upsert(updatedTasks.map((task, index) => ({ ...task, order: index }))),
    onSuccess: () =>
      queryClient
        .invalidateQueries("tasks")
        .then(() => console.log("reordered")),
    mutationKey: ["tasks"],
    onError: (error) => {
      console.error("Error updating task order:", error);
    },
  });
}

export function useGetUser() {
  return useQuery({
    queryFn: async () => await supabase.auth.getUser(),
    onSuccess: () => console.log("user fetched"),
  });
}
