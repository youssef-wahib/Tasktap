import { supabase } from "./supabase.ts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Database } from "../supabaseTypes.ts";

type projectsType = Database["public"]["Tables"]["projects"];
type sectionsType = Database["public"]["Tables"]["sections"];
type tasksType = Database["public"]["Tables"]["tasks"];

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
export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      await supabase.from("projects").delete().eq("id", id),
    queryKey: ["projects"],
    onSuccess: () => {
      queryClient
        .invalidateQueries(["projects"])
        .then(() => console.log("Projects query invalidated and refetched"));
    },
    onError: (err) => console.log(err),
  });
}

export function useEdit(selectionTable: string) {
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
      selectionTable: string;
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
