import type { NextPage } from "next";
import Header from "../components/layout/Header";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-full bg-zinc-900">
      <Header />
    </div>
  );
};

export default Home;
