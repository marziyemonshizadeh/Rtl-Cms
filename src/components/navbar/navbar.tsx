import { useDispatch } from "react-redux";
import { toggleDarkmode } from "../../redux/store/darkmood";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between bg-slate-50 dark:bg-gray-700 m-2">
      <img
        src="https://img.freepik.com/free-photo/woman-with-beauty-face-clean-skin_186202-5677.jpg"
        alt="profile"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-lime-500 p-2 rounded-xl flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </div>
        {/* darkmood set */}
        <button
          className="w-10 h-10 bg-lime-500 p-2 rounded-xl flex justify-center items-center"
          onClick={() => dispatch(toggleDarkmode())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
