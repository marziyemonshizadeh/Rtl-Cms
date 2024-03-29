import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import { RootState } from "./redux/store";
function App() {
  const IsDarkMood = useSelector(
    (state: RootState) => state.darkmode.isDarkmode
  );
  console.log("IsDarkMood = ", IsDarkMood);

  return (
    <div
      dir="rtl"
      className={`${
        localStorage.getItem("IsDarkMood") === "true" ? "dark" : ""
      }`}
    >
      <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-1 grid-flow-cols bg-slate-50 dark:bg-gray-700">
        <div className="xl:col-span-1 md:col-span-1 sm:col-auto bg-lime-500 dark:bg-gray-600 md:h-screen min-h-32 sticky top-0 z-20">
          <Sidebar />
        </div>
        <div className="xl:col-span-5 md:col-span-3 block sm:col-span-1 bg-slate-50 dark:bg-gray-700  md:mx-3 mb-14">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
