import '../styles/coursebuilder.css';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CourseModule, Section } from "../types/lms";
import { fetchModules } from "../api/moduleapi";
import { fetchSections } from "../api/sectionapi";

import LeftSidebar from "../components/layout/LeftSidebar";
import RightSidebar from "../components/layout/RightSideBar";
import CenterPanel from "../components/layout/CenterPanel";

type ActiveForm = "addModule" | "addSection" | null;

const CourseBuilder = () => {
  const { courseId } = useParams<{ courseId: string }>();
  console.log(courseId);

  const [modules, setModules] = useState<CourseModule[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedModule, setSelectedModule] =
    useState<CourseModule | null>(null);
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);

  useEffect(() => {
    if (!courseId) return;
    fetchModules(courseId).then(setModules);
  }, [courseId]);

  useEffect(() => {
    if (!selectedModule) {
      setSections([]);
      return;
    }
    fetchSections(selectedModule.module_id).then(setSections);
  }, [selectedModule]);

  const refresh = async () => {
    if (!courseId) return;
    const mods = await fetchModules(courseId);
    setModules(mods);

    if (selectedModule) {
      const secs = await fetchSections(selectedModule.module_id);
      setSections(secs);
    }
  };

  return (
    <div className="layout">
      <LeftSidebar
        modules={modules}
        onSelectModule={setSelectedModule}
        onAddModule={() => setActiveForm("addModule")}
      />

      <CenterPanel
        activeForm={activeForm}
        courseId={courseId!}
        selectedModule={selectedModule}
        onSuccess={() => {
          setActiveForm(null);
          refresh();
        }}
      />

      <RightSidebar
        sections={sections}
        onAddSection={() => setActiveForm("addSection")}
      />
    </div>
  );
};

export default CourseBuilder;