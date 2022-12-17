import { useState } from "react";
import Link from "../elements/Link";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <header className="w-full flex justify-between items-center px-5 py-3 md:px-10 md:py-5">
      <Link
        to="/"
        className="text-2xl md:text-3xl text-zinc-100 font-bold tracking-wide cursor-pointer"
      >
        Algorithm <span className="text-yellow-600">Visualization</span>
      </Link>
      {!navbarOpen && (
        <div
          className="flex flex-col space-y-2 lg:hidden cursor-pointer"
          onClick={() => {
            setNavbarOpen(true);
          }}
        >
          <div className="w-6 h-[0.1rem] bg-zinc-100"></div>
          <div className="w-6 h-[0.1rem] bg-zinc-100"></div>
          <div className="w-6 h-[0.1rem] bg-zinc-100"></div>
        </div>
      )}

      {navbarOpen && (
        <div className=" h-screen bg-zinc-900 absolute right-0 top-0 flex flex-col px-10 py-10 items-end">
          <svg
            onClick={() => {
              setNavbarOpen(false);
            }}
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 329.26933 329"
            width="329pt"
            fill="#fff"
          >
            <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
          </svg>
          <div className="flex-1 flex justify-start items-end flex-col space-y-5 mt-10">
            <Link to="/pathfinding-visualization">
              Pathfinding Visualization
            </Link>
            <Link to="/sorting-visualization">Sorting Visualization</Link>
          </div>
        </div>
      )}

      <nav className="space-x-7 hidden lg:flex">
        <Link to="/pathfinding-visualization">Pathfinding Visualization</Link>
        <Link to="/sorting-visualization">Sorting Visualization</Link>
      </nav>
    </header>
  );
}
