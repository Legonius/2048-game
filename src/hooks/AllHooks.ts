import { useState } from "react";

type AllHooks = () => {
  restart: () => void;
  handleArrowKey: (ev: KeyboardEvent) => void;
  numbers: number[][];
};

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

  // random 2 pop up in free space;
  const randomPopup = () => {
    setNumbers((currentNumbers) => {
      let newArr = currentNumbers.map((arr) => arr);

      let add = false;
      while (!add) {
        const random1 = Math.floor(Math.random() * 4);
        const random = Math.floor(Math.random() * 4);

        if (newArr[random1][random] === 0) {
          newArr[random1][random] = 2;
          add = true;
        }
      }

      return newArr;
    });
  };

  // handling arrow key
  const handleArrowKey = (ev: KeyboardEvent) => {
    if (ev.code === "ArrowLeft") {
      movingLeft();
      randomPopup();
    } else if (ev.code === "ArrowRight") {
      movingRight();
      randomPopup();
    } else if (ev.code === "ArrowUp") {
      movingUp();
      randomPopup();
    } else if (ev.code === "ArrowDown") {
      movingDown();
      randomPopup();
    }
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
