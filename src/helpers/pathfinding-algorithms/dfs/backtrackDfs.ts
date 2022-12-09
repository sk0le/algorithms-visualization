import delay from "../../delay";

const backtrackDfs = async (q: number[], info: object) => {
  let row = q[0];
  let col = q[1];

  while (true) {
    if (row === -1 && col === -1) {
      break;
    }

    const doc = document.getElementById(`${row}-${col}`);
    doc.classList.remove("bg-yellow-600");
    doc.classList.add("bg-blue-600");
    await delay(50);

    const newRow = info[`${row}-${col}`][0];
    const newCol = info[`${row}-${col}`][1];

    row = newRow;
    col = newCol;
  }
};

export default backtrackDfs;
