export type PriorityType =
  | "PROFILE"
  | "OPPORTUNITY"
  | "DOCUMENT"
  | "APPLICATION"
  | "NOTIFICATION";

export interface PriorityItem {
  type: PriorityType;
  title: string;
  description: string;
  action: string;
  priority: number;
}