import Head from "next/head";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "../components/elements/Button";
import Header from "../components/layout/Header";
import "react-dropdown-now/style.css";
import addNotification from "../helpers/notifications/addNotification";
import bubbleSort from "../helpers/sorting-algorithms/bubbleSort";
import selectionSort from "../helpers/sorting-algorithms/selectionSort";
import Bars from "../components/sorting/Bars";
import ChangeSpeed from "../components/sorting/ChangeSpeed";
import AlgorithmSelection from "../components/sorting/AlgorithmSelection";

export default function SortingVisualization() {
  let [arr, setArr] = useState<number[]>([]);
  let [num, setNum] = useState(0);
  let [started, setStarted] = useState<boolean>(false);
  let [sorted, setSorted] = useState<boolean>(false);
  let [inputSpeed, setInputSpeed] = useState<number>(0);
  let [speed, setSpeed] = useState(200);
  let [algorithm, setAlgorithm] = useState("Bubble Sort");

  // remove arrows
  const removeArrows = () => {
    for (let i = 0; i < num; i++) {
      const arrow = document.getElementById(`sort-arrow-${i}`);
      if (arrow) {
        arrow.className = "text-xl opacity-0";
      }
    }
  };

  // random array
  const randomizeArray = (n?: number) => {
    removeArrows();
    let a = [];
    setSorted(false);
    let tmp = 0;
    if (n) tmp = n;
    else tmp = num;
    for (let i = 0; i < tmp; i++) {
      let b = Math.floor(Math.random() * 100 + 1);
      a.push(b);
    }
    setArr(a);
  };

  // get new array on load

  useEffect(() => {
    let width = window.innerWidth;
    let a = 0;

    if (width > 1279) {
      a = Math.floor((width - 400) / 42);
    } else {
      a = Math.floor(width / 42);
    }

    setNum(a);
    randomizeArray(a);
  }, []);

  const sortArray = async (e: React.MouseEvent) => {
    if (!started && !sorted) {
      removeArrows();
      setStarted(true);
      let newArr: number[] = [];
      switch (algorithm) {
        case "Bubble Sort":
          newArr = await bubbleSort(arr, num, speed);
          break;
        case "Selection Sort":
          newArr = await selectionSort(arr, num, speed);
          break;
      }

      addNotification("Success", "Successfully sorted an array", "success");

      setStarted(false);
      setSorted(true);
      setArr(newArr);
    }
  };

  const onRandomizeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    randomizeArray();
  };

  const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSpeed(parseInt(e.target.value));
  };

  const changeSpeed = (e: React.MouseEvent) => {
    if (inputSpeed < 0 || inputSpeed > 5000) {
      addNotification(
        "Error",
        "Number must be between 100 AND 5000 milliseconds",
        "danger"
      );
    } else if (inputSpeed != speed) {
      setSpeed(inputSpeed);
      addNotification("Success", "Successfully changed speed.", "success");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-900">
      <Head>
        <title>Sorting Visualization - Algorithms Visualization</title>
      </Head>
      <Header />
      <div className="h-full w-full flex-1 flex flex-col xl:flex-row-reverse justify-around items-center">
        <Bars arr={arr} />

        <div className="max-w-sm w-full flex flex-col items-start mt-10 justify-between">
          <AlgorithmSelection
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            sorted={sorted}
            started={started}
          />

          <ChangeSpeed
            speed={speed}
            changeSpeed={changeSpeed}
            onKeyChange={onKeyChange}
            started={started}
          />

          <div className="w-full flex flex-col md:flex-row md:space-x-4">
            <Button
              primary={true}
              onClickAction={sortArray}
              disabled={started || sorted ? true : false}
              className="w-full"
            >
              Sort Array
            </Button>
            <Button
              primary={false}
              onClickAction={onRandomizeClick}
              disabled={started ? true : false}
              className="w-full"
            >
              Randomize array
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
