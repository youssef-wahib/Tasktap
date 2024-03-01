export interface BaseProjectTypeSupabase {
  ProjectId: string;
  ProjectName: string;
  ProjectDescription?: string;
  CreatedAt: string;
}
export interface SectionTypeSupabase {
  SectionId: string;
  SectionTitle: string;
  SectionDescription: string;
  ProjectRef?: string;
  SectionCreatedAt: string;
}
export interface TaskSupabase {
  TaskId: string;
  Task: string;
  State: boolean;
  SectionRef: string;
  taskOrder: number;
}
