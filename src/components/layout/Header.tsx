import Link from "../elements/Link";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-5 py-3 md:px-10 md:py-5">
      <Link
        to="/"
        className="text-2xl md:text-3xl text-zinc-100 font-bold tracking-wide cursor-pointer"
      >
        Algorithm <span className="text-yellow-600">Visualization</span>
      </Link>
      <nav>
        <Link to="/sorting-visualization">Sorting Visualization</Link>
      </nav>
    </header>
  );
}
