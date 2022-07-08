import React from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";

interface CProps {
  speed: number;
  onKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  started: boolean;
  changeSpeed: (e: React.MouseEvent) => void;
}

export default function ChangeSpeed({
  speed,
  onKeyChange,
  started,
  changeSpeed,
}: CProps) {
  return (
    <>
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
    </>
  );
}
