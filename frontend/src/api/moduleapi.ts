import { CourseModule, CreateModuleDto } from "../types/lms";
import api from "./axios";

export async function fetchModules( course_id : string) : Promise<CourseModule[]>{
    const res = await api.get(`/coursemodule/${course_id}`);
    return res.data;
}

export async function createModule(data: CreateModuleDto){
    console.log(data.course_id);
    const res = await api.post(`/coursemodule/${data.course_id}`,data);
    return res.data;
}