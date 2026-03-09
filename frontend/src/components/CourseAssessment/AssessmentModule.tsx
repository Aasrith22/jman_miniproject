import React from "react";
import { IconBack } from "../../assets/icons/course_icons";
import AssessmentCard from "./QuestionCard";

export default function AssessmentModule() {
    return (
        <>
            <div className="animate-slideIn">
                <div className="relative rounded-3xl overflow-hidden mb-6 p-6 sm:p-8"
                    style={{ background: `linear-gradient(135deg, #FCA5A5 22 0%, #0f172a 70%)` }}>

                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                        style={{ background: "#FCA5A5", transform: "translate(30%, -30%)" }} />

                    <button
                        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors mb-4 group"
                    >
                        <span className="group-hover:-translate-x-0.5 transition-transform"><IconBack /></span>
                        Exit
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                        <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border"
                                style={{ borderColor: `#FCA5A550`, color: "#FCA5A5", background: `#FCA5A515` }}>
                                course category
                            </span>
                            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-1"> course title Assessment</h2>
                            <p className="text-sm text-white/50">by course instructor </p>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {[
                            { label: "Total Questions", value: `10` },
                            { label: "Answered", value: `1` },
                            { label: "Remaining", value: 10 - 1 },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
                                <p className="text-lg font-bold text-white" style={{ color: "#FCA5A5" }}>{stat.value}</p>
                                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>


                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest px-1 mb-4">
                        Question #1
                    </h3>
                    <div className="">
                        <AssessmentCard />
                    </div>
                </div>

            </div>
        </>
    )
}