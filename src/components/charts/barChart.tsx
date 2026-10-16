import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
interface BarChartProps {
  title: string;
  data: Record<string, string | number>[];
  dataKey: string;
  XAxisDataKey: string;
  fill: string;
}

export default function barChart({
  title,
  data,
  dataKey,
  XAxisDataKey,
  fill,
}: BarChartProps) {
  return (
    <>
      <h2 className="mb-5 text-sm font-semibold">{title}</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          width={150}
          height={40}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Bar
            dataKey={dataKey}
            fill={fill}
            radius={[4, 4, 0, 0]}
            name="فروش"
          />
          <XAxis
            dataKey={XAxisDataKey}
            axisLine={false}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={45}
            tickFormatter={(value: number) =>
              new Intl.NumberFormat("fa-IR", { notation: "compact" }).format(
                value,
              )
            }
          />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
