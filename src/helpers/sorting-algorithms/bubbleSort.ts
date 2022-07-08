const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function bubbleSort(
  arr: number[],
  num: number,
  speed: number
) {
  let max = num;

  while (max > 0) {
    for (let i = 0; i < max; i++) {
      if (arr[i] > arr[i + 1]) {
        let t = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = t;
        const doc1 = document.getElementById(`${i + 1}`);
        const doc1Num = document.getElementById(`sort-num-${i + 1}`);
        if (doc1 && doc1Num) {
          doc1.style.height = `${arr[i + 1] * 4}px`;
          doc1Num.textContent = arr[i + 1].toString();
        }
        const doc = document.getElementById(`${i}`);
        const docNum = document.getElementById(`sort-num-${i}`);
        if (doc && docNum) {
          doc.style.height = `${arr[i] * 4}px`;
          docNum.textContent = arr[i].toString();
        }

        await delay(speed);
      }
    }
    max--;
  }

  return arr;
}
