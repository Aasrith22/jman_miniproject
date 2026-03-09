import React from 'react'
import { IconCheck, IconClock, IconVideo, IconReading, IconQuiz, IconAssignment } from '../../../assets/icons/course_icons';
import { Lesson } from '../../../Types/course_type';


const lessonTypeConfig = {
  video: { icon: <IconVideo />, label: "Video", color: "text-sky-400", bg: "bg-sky-400/10" },
  reading: { icon: <IconReading />, label: "Reading", color: "text-amber-400", bg: "bg-amber-400/10" },
  quiz: { icon: <IconQuiz />, label: "Quiz", color: "text-violet-400", bg: "bg-violet-400/10" },
  assignment: { icon: <IconAssignment />, label: "Assignment", color: "text-rose-400", bg: "bg-rose-400/10" },
};

const LessonRow = ({ lesson }: { lesson: Lesson }) => {
  const cfg = lessonTypeConfig[lesson.type];
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
          ${lesson.completed
          ? "hover:bg-white/5"
          : "hover:bg-white/[0.07]"
        }`}
    >

      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all
          ${lesson.completed
          ? "bg-emerald-400/20 text-emerald-400"
          : "border-2 border-white/20 text-transparent group-hover:border-white/40"
        }`}>
        <IconCheck />
      </div>


      <span className={`flex-1 text-sm font-medium leading-snug transition-colors
          ${lesson.completed ? "text-white/50 line-through decoration-white/30" : "text-white/85 group-hover:text-white"}`}>
        {lesson.title}
      </span>

      <span className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color} ${cfg.bg}`}>
        {cfg.icon}
        {cfg.label}
      </span>

      <span className="flex items-center gap-1 text-xs text-white/35">
        <IconClock />
        {lesson.duration}
      </span>
    </div>
  );
};


export default LessonRow
