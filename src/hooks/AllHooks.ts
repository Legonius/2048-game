import { useState } from "react";

type AllHooks = () => {
  restart: () => void;
  handleArrowKey: (ev: KeyboardEvent) => void;
  numbers: number[][];
};

let shouldPopUp = false;

export default function useAllHooks(): ReturnType<AllHooks> {
  const [numbers, setNumbers] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // random number for starting array
  const restart = () => {
    const count = 2;
    const initialNumber = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    for (let i = 0; i < count; i++) {
      const random1 = Math.floor(Math.random() * 4);
      const random = Math.floor(Math.random() * 4);

      if (initialNumber[random1][random] === 0) {
        initialNumber[random1][random] = 2;
      } else {
        i--;
      }
    }
    setNumbers(initialNumber);
  };

  // handling arrow key
  const handleArrowKey = (ev: KeyboardEvent) => {
    if (ev.code === "ArrowLeft") {
      movingLeft();
    } else if (ev.code === "ArrowRight") {
      movingRight();
    } else if (ev.code === "ArrowUp") {
      movingUp();
    } else if (ev.code === "ArrowDown") {
      movingDown();
    }
    setNumbers((prev) => {
      randomPopup(prev);
      return prev;
    });
  };

  // algorithym for left key
  const movingLeft = () => {
    setNumbers((currentNumbers) => {
      const tempArray = currentNumbers.map((row) => row);

      for (let i = 0; i < tempArray.length; i++) {
        tempArray[i] = filterZero(tempArray[i]);
        tempArray[i] = slideLeft(tempArray[i]);
        tempArray[i] = fillRow(tempArray[i]);
      }
      if (JSON.stringify(currentNumbers) !== JSON.stringify(tempArray)) {
        shouldPopUp = true;
      }
      return tempArray;
    });
  };

  // algorithym for right key
  const movingRight = () => {
    setNumbers((currentNumbers) => {
      const tempArray = currentNumbers.map((row) => row);

      for (let i = 0; i < tempArray.length; i++) {
        tempArray[i] = filterZero(tempArray[i]);
        tempArray[i].reverse();
        tempArray[i] = slideLeft(tempArray[i]);
        tempArray[i] = fillRow(tempArray[i]);
        tempArray[i].reverse();
      }
      if (JSON.stringify(currentNumbers) !== JSON.stringify(tempArray)) {
        shouldPopUp = true;
      }
      return tempArray;
    });
  };

  // algorithym for Up key
  const movingUp = () => {
    setNumbers((currentNumbers) => {
      const row: number[][] = [];
      for (let i = 0; i < currentNumbers.length; i++) {
        row[i] = columntToRow(currentNumbers, i);
        row[i] = filterZero(row[i]);
        row[i] = slideLeft(row[i]);
        row[i] = fillRow(row[i]);
      }
      if (JSON.stringify(currentNumbers) !== JSON.stringify(rowToColumn(row))) {
        shouldPopUp = true;
      }
      return rowToColumn(row);
    });
  };

  //algorithm for Down Key
  const movingDown = () => {
    setNumbers((currentNumbers) => {
      const row: number[][] = [];
      for (let i = 0; i < currentNumbers.length; i++) {
        row[i] = columntToRow(currentNumbers, i);
        row[i] = filterZero(row[i]);
        row[i].reverse();
        row[i] = slideLeft(row[i]);
        row[i] = fillRow(row[i]);
        row[i].reverse();
      }
      if (JSON.stringify(currentNumbers) !== JSON.stringify(rowToColumn(row))) {
        shouldPopUp = true;
      }
      return rowToColumn(row);
    });
  };

  return { restart, handleArrowKey, numbers };
}

//=============Helper Function ==================//

// Chunk functions

//filter zero
const filterZero = (row: number[]) => {
  return row.filter((n) => n !== 0);
};

//sliding to left
const slideLeft = (row: number[]) => {
  for (let j = 0; j < row.length - 1; j++) {
    if (row[j] === row[j + 1]) {
      row[j] *= 2;
      row[j + 1] = 0;
      shouldPopUp = true;
    }
  }
  row = filterZero(row);
  return row;
};

//filling row
const fillRow = (row: number[]) => {
  while (row.length < 4) {
    row.push(0);
  }
  return row;
};

//columntToRow
const columntToRow = (arr: number[][], n: number) => {
  let x: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    x.push(arr[i][n]);
  }
  return x;
};

const rowToColumn = (row: number[][]) => {
  let arr: number[][] = [];
  for (let i = 0; i < 4; i++) {
    arr[i] = columntToRow(row, i);
  }
  return arr;
};

// checking empty space
const checkSpace = (arr: number[][]) => {
  let empty = false;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 0) {
        empty = true;
        return empty;
      }
    }
  }
  return empty;
};

// checking gameover
const checkGameOver = (arr: number[][]) => {};

// random 2 pop up in free space;
const randomPopup = (arr: number[][]) => {
  let newArr = arr.map((arr) => arr);
  if (shouldPopUp) {
    shouldPopUp = false;
    let add = false;
    let empty = checkSpace(arr);
    while (!add && empty) {
      const random1 = Math.floor(Math.random() * 4);
      const random = Math.floor(Math.random() * 4);

      if (newArr[random1][random] === 0) {
        newArr[random1][random] = 2;
        add = true;
      }
    }
  }

  return newArr;
};
