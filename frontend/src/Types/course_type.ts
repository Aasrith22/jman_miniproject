export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "video" | "reading" | "quiz" | "assignment";
  completed: boolean;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail: string;
  accent: string;
  badge: string;
  lastAccessed: string;
  modules: Module[];
}
