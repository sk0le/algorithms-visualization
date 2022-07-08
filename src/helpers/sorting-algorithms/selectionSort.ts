const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function selectionSort(
  arr: number[],
  num: number,
  speed: number
) {
  for (let i = 0; i < num; i++) {
    let tmp = arr[i];
    let min = tmp;
    let index = 0;

    const doc1Arrow = document.getElementById(`sort-arrow-${i}`);
    if (doc1Arrow) {
      doc1Arrow.className = "text-xl opacity-100 text-yellow-600";
    }

    for (let j = i + 1; j < num; j++) {
      const paring = document.getElementById(`sort-arrow-${j}`);
      if (paring) {
        paring.className = "text-xl opacity-100 text-red-600";
      }
      if (arr[j] < min) {
        min = arr[j];
        index = j;
      }
      await delay(speed);
      if (paring) {
        paring.className = "text-xl opacity-0";
      }
    }

    if (min < tmp) {
      arr[i] = min;
      arr[index] = tmp;

      const doc1 = document.getElementById(`${i}`);
      const doc1Num = document.getElementById(`sort-num-${i}`);
      if (doc1 && doc1Num && doc1Arrow) {
        doc1.style.height = `${arr[i] * 4}px`;
        doc1Num.textContent = arr[i].toString();
      }

      const doc = document.getElementById(`${index}`);
      const docNum = document.getElementById(`sort-num-${index}`);
      if (doc && docNum) {
        doc.style.height = `${arr[index] * 4}px`;
        docNum.textContent = arr[index].toString();
      }

      //   await delay(speed);
    }
    if (doc1Arrow) {
      doc1Arrow.className = "text-xl text-green-600";
    }
  }
  return arr;
}
