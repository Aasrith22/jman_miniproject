import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export default function CourseStatsModal({ stats, onClose }: any) {

  const data = [
    { subject: "Students", value: stats.students },
    { subject: "Attempts", value: stats.attempts },
    { subject: "Pass Rate", value: stats.passRate },
    { subject: "Progress", value: stats.avgProgress },
  ];

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg p-6 w-[420px] relative">

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Course Statistics
        </h3>

        <div className="flex justify-center">

          <RadarChart width={350} height={280} data={data}>

            <PolarGrid />

            <PolarAngleAxis dataKey="subject" />

            <PolarRadiusAxis />

            <Radar
              dataKey="value"
              stroke="#6366F1"
              fill="#6366F1"
              fillOpacity={0.6}
            />

          </RadarChart>

        </div>

      </div>

    </div>

  );
}