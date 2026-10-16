import BarChart from "@/components/charts/barChart";
import LineChart from "@/components/charts/lineChart";
import RadialChart from "@/components/charts/radialChart";
import { AnnualSalesOfEachProduct, xAxisData } from "@/datas";
const Home: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            نمای کلی فروشگاه
          </h1>
          <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
            گزارش فروش و عملکرد محصولات، در یک نگاه.
          </p>
        </div>
        <span className="rounded-lg border bg-card px-3 py-2 text-xs text-muted-foreground">
          گزارش سال ۱۴۰۲
        </span>
      </div>
      <LineChart title="فروش ماهانه" data={xAxisData} dataKey1="Sale" />
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="card my-0">
          <BarChart
            title="میزان فروش سال 1402"
            data={xAxisData}
            dataKey="Sale"
            XAxisDataKey="month"
            fill="hsl(var(--primary))"
          />
        </div>
        <div className="card my-0">
          <RadialChart
            title="فروش سالانه هر محصول"
            data={AnnualSalesOfEachProduct}
            dataKey="count"
          />
        </div>
      </div>
    </section>
  );
};
export default Home;
