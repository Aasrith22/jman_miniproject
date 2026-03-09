import React from "react";

export default function AssessmentCompletionHeader() {
    return (
        <>
            <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                    { label: "Status", value: `Completed` },
                    { label: "Marks", value: "100 / 100" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-lg font-bold text-white text-green-500">{stat.value}</p>
                        <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>
        </>
    )
}