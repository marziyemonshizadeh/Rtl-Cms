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
      <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-1 grid-flow-cols bg-zinc-100 dark:bg-zinc-950">
        <div className="xl:col-span-1 md:col-span-1 sm:col-auto bg-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 md:h-screen min-h-32 sticky top-0 z-20">
          <Sidebar />
        </div>
        <div className="xl:col-span-5 md:col-span-3 block sm:col-span-1 bg-zinc-100 dark:bg-zinc-950 md:px-4 md:py-4 mb-14">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
