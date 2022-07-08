import Link from "../elements/Link";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-5 py-3 md:px-10 md:py-5">
      <h1 className="text-2xl md:text-3xl text-zinc-100 font-bold tracking-wide">
        Algorithm Visualization
      </h1>
      <nav>
        <Link to="/sorting-visualization" name="Sorting Visualization" />
      </nav>
    </header>
  );
}
