import Head from "next/head";
import { useEffect, useState } from "react";
import { isBuffer } from "util";
import Button from "../components/elements/Button";
import Header from "../components/layout/Header";
import delay from "../helpers/delay";
import addNotification from "../helpers/notifications/addNotification";
import backtrackDfs from "../helpers/pathfinding-algorithms/dfs/backtrackDfs";
import getDefaultArray from "../helpers/pathfinding-algorithms/getDefalutArray";

const ROW = 25,
  COL = 50;

let offGrid = [Array(ROW).fill(Array(COL).fill(0))];

let START_ROW = 0,
  START_COL = 0;

let END_ROW = ROW - 1,
  END_COL = COL - 1;

export default function PathfindingVisualization() {
  const [oldGrid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);

  const randomizeGrid = () => {
    let a = [];
    for (let i = 0; i < ROW; i++) {
      let b = [];
      for (let j = 0; j < COL; j++) {
        if ((i === 0 && j === 0) || (i == ROW - 1 && j == COL - 1)) {
          b.push(0);
          continue;
        }
        let a = Math.random();
        if (a < 0.2) {
          b.push(1);
          continue;
        }
        b.push(0);
      }
      a.push(b);
    }
    a[START_ROW][START_COL] = 2;
    a[END_ROW][END_COL] = 3;
    setGrid([]);
    setGrid(a);
    offGrid = a;
  };

  const findPathBFS = async () => {
    setRunning(true);
    const grid = oldGrid;
    let q = [];
    let visited = [];
    for (let i = 0; i < ROW; i++) {
      let a = [];
      for (let j = 0; j < COL; j++) {
        a.push(false);
      }
      visited.push(a);
    }

    let info = {},
      foundPath = false;

    q.push([START_ROW, START_COL, -1, -1]);
    while (q.length > 0) {
      let row = q[0][0];
      let col = q[0][1];

      if (visited[row][col]) {
        q.shift();
        continue;
      }

      visited[row][col] = true;

      info[`${row}-${col}`] = [q[0][2], q[0][3]];
      if (grid[row][col] === 3) {
        foundPath = true;
        break;
      }

      const doc = document.getElementById(`${row}-${col}`);
      doc.classList.add("bg-yellow-600");

      await delay(10);

      // RIGHT
      if (row + 1 <= ROW - 1)
        if (grid[row + 1][col] !== 1 && visited[row + 1][col] == false) {
          q.push([row + 1, col, row, col]);
        }

      // BOTTOM
      if (col + 1 <= COL - 1)
        if (grid[row][col + 1] !== 1 && visited[row][col + 1] == false) {
          q.push([row, col + 1, row, col]);
        }

      // LEFt
      if (row - 1 >= 0)
        if (grid[row - 1][col] !== 1 && visited[row - 1][col] == false) {
          q.push([row - 1, col, row, col]);
        }

      // TOP
      if (col - 1 >= 0)
        if (grid[row][col - 1] !== 1 && visited[row][col - 1] == false) {
          q.push([row, col - 1, row, col]);
        }

      q.shift();
    }

    // backtracking
    if (foundPath) {
      backtrackDfs(q[0], info);
      addNotification(
        "Success",
        "You have successfully found a path.",
        "success"
      );
      return;
    }

    addNotification("Error", "No path found.", "danger");
  };

  const getStartAndEnd = () => {
    let newGrid = getDefaultArray(ROW, COL);
    setGrid(newGrid);
    offGrid = newGrid;
  };

  useEffect(() => {
    getStartAndEnd();

    return () => {
      setGrid(Array(ROW).fill(Array(COL).fill(0)));
    };
  }, []);

  const [mouseDown, setMouseDown] = useState(false);

  const mouseDownAction = () => {
    setMouseDown(true);
  };

  const mouseUpAction = () => {
    setMouseDown(false);
    setGrid(offGrid);
  };

  // const mouseOverAction = () => {};

  const dropAction = (e: DragEvent, index: number, index2: number) => {
    if (offGrid[index][index2] === 0) {
      e.preventDefault();

      const row = parseInt(e.dataTransfer.getData("row"));
      const col = parseInt(e.dataTransfer.getData("col"));
      const num = parseInt(e.dataTransfer.getData("type"));
      if (num === 2 || num === 3) {
        offGrid[row][col] = 0;
        offGrid[index][index2] = num;
        if (num === 2) {
          START_ROW = index;
          START_COL = index2;
        } else {
          END_ROW = index;
          END_COL = index2;
        }
        document
          .getElementById(`${row}-${col}`)
          .classList.remove(`bg-${num === 2 ? "red" : "green"}-600`);
        document
          .getElementById(`${index}-${index2}`)
          .classList.add(`bg-${num === 2 ? "red" : "green"}-600`);

        setGrid(offGrid);
        setMouseDown(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-900">
      <Head>
        <title>Pathfinding Visualization - Algorithms Visualization</title>
      </Head>
      <Header />
      <div className="h-full w-full flex-1  flex flex-col justify-around items-center">
        <div
          onMouseDown={mouseDownAction}
          onMouseUp={mouseUpAction}
          onMouseLeave={mouseUpAction}
        >
          {oldGrid.map((arr, index) => {
            return (
              <div className="flex" key={index}>
                {arr.map((value, index2) => {
                  return (
                    <div
                      id={`${index}-${index2}`}
                      key={index2}
                      draggable={value === 2 || value === 3 ? true : false}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setMouseDown(false);
                      }}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("row", index.toString());
                        e.dataTransfer.setData("col", index2.toString());
                        e.dataTransfer.setData("type", value.toString());
                        setMouseDown(false);
                      }}
                      onDrop={(e) => {
                        dropAction(e as any, index, index2);
                      }}
                      onMouseOver={(e) => {
                        if (mouseDown && offGrid[index][index2] === 0) {
                          document
                            .getElementById(`${index}-${index2}`)
                            .classList.add("bg-zinc-700");

                          offGrid[index][index2] = 1;
                        }
                      }}
                      className={`w-6 h-6   border rounded-full border-zinc-700 transition-all ${
                        value === 1
                          ? "bg-zinc-700"
                          : value === 2
                          ? "bg-red-600"
                          : value === 3
                          ? "bg-green-600"
                          : ""
                      }`}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="flex">
          <Button
            primary={true}
            disabled={running}
            onClickAction={(e) => {
              findPathBFS();
            }}
          >
            Find
          </Button>
          <Button
            primary={false}
            disabled={running}
            onClickAction={(e) => {
              randomizeGrid();
            }}
          >
            Randomize
          </Button>
        </div>
      </div>
    </div>
  );
}
