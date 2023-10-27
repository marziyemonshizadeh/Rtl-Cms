import { Outlet } from "react-router";
import Modal from "./components/Modals/deleteModal";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <div dir="rtl">
      <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-1 grid-flow-cols bg-slate-50">
        <div className="xl:col-span-1 md:col-span-1 sm:col-auto bg-lime-500 md:h-screen min-h-32 sticky top-0">
          <Sidebar />
        </div>
        <div className="xl:col-span-5 md:col-span-3 block sm:col-span-1 bg-slate-50 md:mx-3 mb-14">
          <Navbar />
          <Modal />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
