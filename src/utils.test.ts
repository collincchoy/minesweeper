import { convert1dTo2d, setupBoard } from "./utils";

describe("convert1dto2d works", () => {
  /**
   *  [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   */
  test("simple case", () => {
    expect(convert1dTo2d(5, 3)).toStrictEqual({ x: 2, y: 1 });
  });
  it("works with 0", () => {
    expect(convert1dTo2d(0, 3)).toStrictEqual({ x: 0, y: 0 });
  });
  it("works with corner", () => {
    expect(convert1dTo2d(6, 3)).toStrictEqual({ x: 0, y: 2 });
  });
});

describe("setupBoard works", () => {
  /**
   *  [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   */
  it("returns a board with all of the bombs added", () => {
    const intitialBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const bombsToPlace = 3;
    const result = setupBoard(intitialBoard, bombsToPlace);
    console.debug(result);

    const countBombs = (row: number[]) =>
      row.reduce((prev, next) => (next === -1 ? prev + 1 : prev), 0);
    expect(
      result.reduce(
        (bombCount, row) => bombCount + countBombs(row),
        0 // initialValue
      )
    ).toBe(bombsToPlace);
  });
});
