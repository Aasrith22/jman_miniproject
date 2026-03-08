import { useState } from "react";

import { Course , Module , Lesson } from "../../Types/course_type";
import { COURSES } from "../../assets/dymmyData";
import { IconVideo, IconReading , IconAssignment , IconBack , IconCheck , IconChevron , IconClock , IconQuiz } from "../../assets/icons/course_icons";


const lessonTypeConfig = {
  video:      { icon: <IconVideo />,      label: "Video",      color: "text-sky-400",    bg: "bg-sky-400/10" },
  reading:    { icon: <IconReading />,    label: "Reading",    color: "text-amber-400",  bg: "bg-amber-400/10" },
  quiz:       { icon: <IconQuiz />,       label: "Quiz",       color: "text-violet-400", bg: "bg-violet-400/10" },
  assignment: { icon: <IconAssignment />, label: "Assignment", color: "text-rose-400",   bg: "bg-rose-400/10" },
};

const badgeStyle = (badge: string) => {
  if (badge === "Completed")    return "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30";
  if (badge === "Just Started") return "bg-amber-400/15 text-amber-400 border border-amber-400/30";
  return "bg-sky-400/15 text-sky-400 border border-sky-400/30";
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
          <div className="text-5xl">{course.thumbnail}</div>
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


const CourseCard = ({ course, onClick }: { course: Course; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group w-full text-left relative rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
  >
    <div className="absolute top-0 left-0 w-full h-1 opacity-60"
      style={{ background: `linear-gradient(90deg, ${course.accent}, transparent)` }} />

    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(ellipse at top left, ${course.accent}08, transparent 70%)` }} />

    <div className="p-5 relative">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${course.accent}20` }}>
          {course.thumbnail}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle(course.badge)}`}>
              {course.badge}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-white/90 leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-white/40 mt-0.5">{course.instructor}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-white/40">
          <span>{course.completedLessons} of {course.totalLessons} lessons</span>
          <span style={{ color: course.accent }} className="font-semibold">{course.progress}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${course.accent}cc, ${course.accent})` }}
          />
        </div>
      </div>

      <p className="text-[10px] text-white/25 mt-3">Last accessed {course.lastAccessed}</p>
    </div>
  </button>
);


export default function StudentCourses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");

  const filteredCourses = COURSES.filter((c) => {
    if (filter === "completed")   return c.progress === 100;
    if (filter === "in-progress") return c.progress > 0 && c.progress < 100;
    return true;
  });

  const stats = {
    total:       COURSES.length,
    inProgress:  COURSES.filter((c) => c.progress > 0 && c.progress < 100).length,
    completed:   COURSES.filter((c) => c.progress === 100).length,
    avgProgress: Math.round(COURSES.reduce((s, c) => s + c.progress, 0) / COURSES.length),
  };

  return (
    <>
      <div className="min-h-screen bg-[#080c14] text-white">

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {selectedCourse ? (
            <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />
          ) : (
            <div className="animate-slideIn">
              {/* page header */}
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  My Courses
                </h1>
                <p className="text-sm text-white/40">Track your learning journey</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { label: "Enrolled",    value: stats.total,       accent: "#6EE7B7" },
                  { label: "In Progress", value: stats.inProgress,  accent: "#93C5FD" },
                  { label: "Completed",   value: stats.completed,   accent: "#FCA5A5" },
                  { label: "Avg Progress",value: `${stats.avgProgress}%`, accent: "#FDE68A" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-2xl font-extrabold" style={{ color: s.accent, fontFamily: "Syne, sans-serif" }}>
                      {s.value}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-6">
                {(["all", "in-progress", "completed"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all
                      ${filter === f
                        ? "bg-white text-[#080c14]"
                        : "bg-white/[0.06] text-white/50 hover:bg-white/10 hover:text-white/80"
                      }`}
                  >
                    {f === "all" ? "All Courses" : f.replace("-", " ")}
                  </button>
                ))}
              </div>

              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onClick={() => setSelectedCourse(course)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-white/30">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-sm">No courses in this category.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}