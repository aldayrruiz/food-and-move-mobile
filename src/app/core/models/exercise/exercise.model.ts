export interface ExerciseModel {
  _id: string;
  patient: string;
  title: string;
  description?: string;
  date: string;
  links: string[];
  videos: string[];
  done: boolean;
}
