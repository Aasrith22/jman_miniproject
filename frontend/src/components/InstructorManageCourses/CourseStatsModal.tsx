import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export default function CourseStatsModal({ stats }: any) {
  const data = [
    { subject: "Students", value: stats.students },
    { subject: "Attempts", value: stats.attempts },
    { subject: "Pass Rate", value: stats.passRate },
    { subject: "Progress", value: stats.avgProgress },
  ];

  return (
    <div>
      <h3>Course Statistics</h3>

      <RadarChart width={400} height={300} data={data}>
        <PolarGrid />

        <PolarAngleAxis dataKey="subject" />

        <PolarRadiusAxis />

        <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </RadarChart>
    </div>
  );
}
