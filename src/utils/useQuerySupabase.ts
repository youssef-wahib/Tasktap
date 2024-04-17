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
  });
}

export function useFetchProjects(userId: string) {
  return useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("userId", userId);
      return data;
    },
    queryKey: ["projects"],
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });
}
