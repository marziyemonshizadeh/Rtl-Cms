import BarChart from "../../components/charts/barChart";
import LineChart from "../../components/charts/lineChart";
import RadialChart from "../../components/charts/radialChart";
import { AnnualSalesOfEachProduct, xAxisData } from "../../datas";
const Home: React.FC = () => {
  return (
    <>
      <LineChart title="فروش ماهانه" data={xAxisData} dataKey1="Sale" />
      <div className="grid  xl:grid-cols-2 md:grid-cols-1 gap-2">
        <div className="card">
          <BarChart
            title="میزان فروش سال 1402"
            data={xAxisData}
            dataKey="Sale"
            XAxisDataKey="month"
            fill="#65a30d"
          />
        </div>
        <div className="card p-10">
          <RadialChart
            title="فروش سالانه هر محصول"
            data={AnnualSalesOfEachProduct}
            dataKey="count"
          />
        </div>
      </div>
    </>
  );
};
export default Home;
