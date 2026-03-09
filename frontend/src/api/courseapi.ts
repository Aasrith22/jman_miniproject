import { Course, CreateCourseDTO } from "../types/lms";
import api from "./axios";

export async function createCourse(data : CreateCourseDTO) : Promise<Course>{
    const res = await api.post("/course",data);
    return res.data;
}

