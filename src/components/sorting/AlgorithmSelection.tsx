import { Dispatch } from "react";
import { Dropdown } from "react-dropdown-now";

interface CProps {
  sorted: boolean;
  started: boolean;
  algorithm: string;
  setAlgorithm: Dispatch<React.SetStateAction<string>>;
}

export default function AlgorithmSelection({
  sorted,
  started,
  algorithm,
  setAlgorithm,
}: CProps) {
  return (
    <>
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
        disabled={started ? true : false}
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
    </>
  );
}
