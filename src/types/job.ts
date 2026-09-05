export type JobStatus =
  | "Interested"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  appliedDate?: string;
  jobUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}