import { Section, CreateSectionDto } from "../types/lms";
import api from "./axios";
export async function fetchSections(moduleId : string){
    const res = await api.get(`section/${moduleId}`);
    return res.data;
}

export async function createSection(data : CreateSectionDto) : Promise<Section>{
    const res = await api.post(`section/${data.module_id}`,data);
    return res.data;
}