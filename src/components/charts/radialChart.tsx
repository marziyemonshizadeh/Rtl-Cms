import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
interface RadialChartProps {
  title: string;
  data: Record<string, string | number>[];
  dataKey: string;
}

export default function RadialChart({
  title,
  data,
  dataKey,
}: RadialChartProps) {
  return (
    <>
      <h2 className="mb-5 text-sm font-semibold">{title}</h2>
      <ResponsiveContainer width="100%" height={280}>
        <RadialBarChart
          cx="50%"
          cy="42%"
          innerRadius="10%"
          outerRadius="70%"
          barSize={10}
          data={data}
        >
          <RadialBar
            label={{ position: "insideStart", fill: "#18181b", fontSize: 11 }}
            background={{ fill: "hsl(var(--muted))" }}
            dataKey={dataKey}
          />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{
              direction: "ltr",
              fontSize: "11px",
              lineHeight: "24px",
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </>
  );
}
