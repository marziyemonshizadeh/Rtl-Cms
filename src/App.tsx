import AddNewProduct from "./components/addNewProduct/addNewProduct";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
function App() {
  return (
    <div dir="rtl">
      <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-1 grid-flow-cols bg-slate-50">
        <div className="xl:col-span-1 md:col-span-1 hidden sm:block sm:col-auto bg-lime-500">
          <Sidebar />
        </div>
        <div className="xl:col-span-5 md:col-span-3 block sm:col-span-1 h-screen bg-slate-50 ">
          <Navbar />
          <AddNewProduct />
        </div>
      </div>
    </div>
  );
}

export default App;
