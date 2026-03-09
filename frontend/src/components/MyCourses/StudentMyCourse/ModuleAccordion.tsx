import React from 'react'
import { useState } from 'react';
import { IconCheck, IconChevron } from '../../../assets/icons/course_icons';
import { Module } from '../../../Types/course_type';
import LessonRow from './LessonRow';


const ModuleAccordion = ({ module, defaultOpen }: { module: Module; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const completed = module.lessons.filter((l) => l.completed).length;
  const total = module.lessons.length;
  const allDone = completed === total;

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03] backdrop-blur-sm">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors"
      >

        <span className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold
            ${allDone ? "bg-emerald-400/20 text-emerald-400" : "bg-white/10 text-white/60"}`}>
          {allDone ? <IconCheck /> : module.id}
        </span>

        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-semibold text-white/90 truncate">{module.title}</p>
          <p className="text-xs text-white/40 mt-0.5">{module.description}</p>
        </div>

        <span className="text-xs text-white/40 whitespace-nowrap">
          {completed}/{total}
        </span>

        <span className={`text-white/40 transition-colors ${open ? "text-white/70" : ""}`}>
          <IconChevron open={open} />
        </span>
      </button>


      <div className="h-[2px] bg-white/5 mx-5">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500 rounded-full"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>

      {open && (
        <div className="divide-y divide-white/5 px-1 pb-2 pt-1 animate-fadeIn">
          {module.lessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
};


export default ModuleAccordion
