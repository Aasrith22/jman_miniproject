import React from 'react'
import { Course } from '../../Types/course_type';
import { IconBack } from '../../assets/icons/course_icons';
import { badgeStyle } from '../../utils/badgeStyle';
import ModuleAccordion from '../MyCourses/StudentMyCourse/ModuleAccordion';


const CourseDetail = ({ course, onBack }: { course: Course; onBack: () => void }) => {
  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const doneLessons  = course.modules.reduce((s, m) => s + m.lessons.filter((l) => l.completed).length, 0);

  return (
    <div className="animate-slideIn">
      <div className="relative rounded-3xl overflow-hidden mb-6 p-6 sm:p-8"
        style={{ background: `linear-gradient(135deg, ${course.accent}22 0%, #0f172a 70%)` }}>

        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: course.accent, transform: "translate(30%, -30%)" }} />

        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors mb-4 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform"><IconBack /></span>
          My Courses
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border"
                style={{ borderColor: `${course.accent}50`, color: course.accent, background: `${course.accent}15` }}>
                {course.category}
              </span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeStyle(course.badge)}`}>
                {course.badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-1">{course.title}</h2>
            <p className="text-sm text-white/50">by {course.instructor}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: "Progress", value: `${course.progress}%` },
            { label: "Completed", value: `${doneLessons}/${totalLessons}` },
            { label: "Modules", value: course.modules.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white" style={{ color: course.accent }}>{stat.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${course.progress}%`, background: course.accent }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest px-1 mb-4">
          Course Modules
        </h3>
        {course.modules.map((mod, i) => (
          <ModuleAccordion key={mod.id} module={mod} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  );
};

export default CourseDetail
