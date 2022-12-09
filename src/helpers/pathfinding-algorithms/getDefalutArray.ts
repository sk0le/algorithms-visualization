const getDefaultArray = (ROW: number, COL: number) => {
  let a = [];
  for (let i = 0; i < ROW; i++) {
    let b = [];
    for (let j = 0; j < COL; j++) {
      b.push(0);
    }
    a.push(b);
  }

  a[0][0] = 2;
  a[ROW - 1][COL - 1] = 3;
  return a;
};
export default getDefaultArray;
