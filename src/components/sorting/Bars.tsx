interface CProps {
  arr: number[];
}

export default function Bars({ arr }: CProps) {
  return (
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
            <div id={`sort-arrow-${index}`} className="text-xl opacity-0">
              &#8593;
            </div>
          </div>
        );
      })}
    </div>
  );
}
