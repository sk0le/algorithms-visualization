import Head from "next/head";
import Header from "../components/layout/Header";

export default function PathfindingVisualization() {
  return (
    <div className="flex flex-col h-screen w-full bg-zinc-900">
      <Head>
        <title>Pathfinding Visualization - Algorithms Visualization</title>
      </Head>
      <Header />
    </div>
  );
}
