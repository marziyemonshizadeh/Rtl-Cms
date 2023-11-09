import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
interface commentProps {
  title: string;
  data: any;
  dataKey1: any;
}
export default function chart({ title, data, dataKey1 }: commentProps) {
  return (
    <div className="my-3 p-2 card">
      <h3>{title}</h3>
      {/* responsive chart aspect=height chart */}
      <ResponsiveContainer width="100%" aspect={4}>
        {/* chart data */}
        <LineChart data={data}>
          {/* month */}
          <XAxis dataKey="month" stroke="#65a30d" dy={10} />
          <Line
            type="monotone"
            dataKey={dataKey1}
            stroke="#a3e635"
            strokeWidth={2}
          />
          {/* hover */}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
