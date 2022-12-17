import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Button from "../components/elements/Button";
import Header from "../components/layout/Header";

const Home: NextPage = () => {
  const router = useRouter();
  const routerChange = (url: string) => {
    router.push(url);
  };
  return (
    <div className="min-h-screen h-full w-full flex flex-col" id="def">
      <Head>
        <title>Amel Islamovic - Algorithms Visualization</title>
      </Head>
      <Header />
      <div className="h-full w-full flex-1 flex justify-center items-center flex-col py-5 px-5">
        <h1 className="text-5xl font-black text-white text-center">
          Visualize Most Common Algorithms
        </h1>
        <p className="text-xl font-medium text-zinc-500 mt-5 max-w-5xl text-center">
          Algorithms are sets of instructions or processes that are followed to
          accomplish a task or solve a problem. They are an essential part of
          computer science and are used in a wide range of fields, including
          machine learning, data analysis, and robotics. Visualization is the
          process of creating graphical representations of data or information.
          It allows us to understand and interpret complex data sets more easily
          by presenting them in a visual format, such as charts, graphs, and
          maps. By using visualization techniques, we can gain insights,
          identify patterns, and make informed decisions based on the data.
        </p>
        <div className="mt-10 flex space-y-5 sm:space-y-0 sm:space-x-5 flex-col sm:flex-row">
          <Button
            primary={true}
            onClickAction={() => routerChange("/pathfinding-visualization")}
          >
            Pathfinding
          </Button>
          <Button
            primary={true}
            onClickAction={() => routerChange("/sorting-visualization")}
          >
            Sorting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
