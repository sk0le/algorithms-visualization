import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import Header from "../components/layout/Header";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import addNotification from "../helpers/notifications/addNotification";
import bubbleSort from "../helpers/sorting-algorithms/bubbleSort";

export default function SortingVisualization() {
  let [arr, setArr] = useState<number[]>([]);
  let [num, setNum] = useState(20);
  let [started, setStarted] = useState<boolean>(false);
  let [sorted, setSorted] = useState<boolean>(false);
  let [inputSpeed, setInputSpeed] = useState<number>(0);
  let [speed, setSpeed] = useState(200);
  let [algorithm, setAlgorithm] = useState("Bubble Sort");

  // random array
  const randomizeArray = () => {
    let a = [];
    setSorted(false);
    for (let i = 0; i < num; i++) {
      let b = Math.floor(Math.random() * 100 + 1);
      a.push(b);
    }
    setArr(a);
  };

  // get new array on load
  useEffect(() => {
    randomizeArray();
  }, []);

  const sortArray = async (e: React.MouseEvent) => {
    if (!started && !sorted) {
      setStarted(true);
      let newArr = await bubbleSort(arr, num, speed);
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
    if (inputSpeed < 100 || inputSpeed > 5000) {
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
    <div className="flex flex-col h-screen w-full bg-zinc-900">
      <Head>
        <title>Sorting Visualization - Algorithm Visualization</title>
      </Head>
      <Header />
      <div className="h-full w-full flex flex-col xl:flex-row-reverse justify-around items-center">
        <div className="flex items-end h-[405px]">
          {arr.map((value, index) => {
            return (
              <div key={index} className="flex flex-col items-center mr-4">
                <div
                  id={index.toString()}
                  className={`w-4 bg-blue-600 transition-all rounded-md`}
                  style={{ height: `${value * 4}px` }}
                ></div>
                <h1
                  id={`sort-num-${index}`}
                  className="font-base mt-2 text-gray-100 font-medium"
                >
                  {value}
                </h1>
              </div>
            );
          })}
        </div>

        <div className="max-w-sm w-full flex flex-col items-start mt-10 justify-between">
          <h2 className="text-3xl font-medium text-center mb-4">
            {sorted ? (
              <span className="text-green-600">Sorted</span>
            ) : started ? (
              <span className="text-orange-600">Sorting...</span>
            ) : (
              <span className="text-red-600">Not sorted</span>
            )}
          </h2>
          <h2 className="text-md text-zinc-100 font-medium text-center mb-2">
            Algorithm: <span className="text-blue-600">{algorithm}</span>
          </h2>
          <Dropdown
            placeholder="Select an algorithm"
            className="w-full"
            options={["Bubble Sort", "Selection Sort"]}
            onChange={(value) => {
              let a: string = value.value as string;
              if (a) {
                if (a != algorithm) setAlgorithm(a);
              }
            }}
          />

          <h2 className="text-md font-medium mb-2 mt-4 text-zinc-100 text-center">
            Speed - <span className="font-bold text-blue-600">{speed}</span> MS
          </h2>
          <form
            className="w-full flex space-x-5 mb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="number"
              placeholder="Speed of sorting in MS"
              onKeyChange={onKeyChange}
              disabled={started ? true : false}
            />
            <Button
              primary={true}
              onClickAction={changeSpeed}
              disabled={started ? true : false}
            >
              Change
            </Button>
          </form>
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
