import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
interface LineChartProps {
  title: string;
  data: Record<string, string | number>[];
  dataKey1: string;
}
export default function chart({ title, data, dataKey1 }: LineChartProps) {
  return (
    <div className="card my-0">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-primary" />
          فروش
        </span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="hsl(var(--border))"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            dy={12}
            minTickGap={24}
          />
          <Line
            type="monotone"
            dataKey={dataKey1}
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 3, stroke: "hsl(var(--card))" }}
            name="فروش"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              direction: "rtl",
              fontSize: 12,
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
