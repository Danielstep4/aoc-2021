enum Axis {
  X = 0,
  Y = 1,
}
class HydrothermalVenture {
  board: number[][];
  isDiagonal: boolean;

  constructor(data: string[], isDiagonal = false) {
    this.isDiagonal = isDiagonal;
    this.board = this._extractBoardFromData(data);
  }

  public findOverlap = (min = 2) => {
    let counter = 0;

    for (let row of this.board) for (let num of row) if (num >= min) counter++;

    return counter;
  };

  private _extandVerticalAndHorizontalVecs = (coor1: Vec, coor2: Vec) => {
    const minX = Math.min(coor1[Axis.X], coor2[Axis.X]);
    const minY = Math.min(coor1[Axis.Y], coor2[Axis.Y]);
    const maxX = Math.max(coor1[Axis.X], coor2[Axis.X]);
    const maxY = Math.max(coor1[Axis.Y], coor2[Axis.Y]);

    const extandedVecs: Vec[] = [[maxX, maxY]];

    for (let x = minX; x < maxX; x++) extandedVecs.push([x, maxY] as Vec);

    for (let y = minY; y < maxY; y++) extandedVecs.push([maxX, y] as Vec);

    return extandedVecs;
  };

  private _extandDiagonalVecs = (coor1: Vec, coor2: Vec): Vec[] => {
    const extandedVecs: Vec[] = [];
    const [minVec, maxVec, direction] = this._findMinMaxVecAndDirection(
      coor1,
      coor2
    );

    let currentVec = minVec;

    for (let i = currentVec[Axis.Y]; i <= maxVec[Axis.Y]; i++) {
      extandedVecs.push(currentVec);
      currentVec = [
        currentVec[Axis.X] + (direction === "right" ? 1 : -1),
        currentVec[Axis.Y] + 1,
      ];
    }
    return extandedVecs;
  };

  private _findMinMaxVecAndDirection = (
    coor1: Vec,
    coor2: Vec
  ): [Vec, Vec, string] => {
    const minVec = coor1[Axis.Y] < coor2[Axis.Y] ? coor1 : coor2;
    const maxVec = minVec === coor1 ? coor2 : coor1;
    const direction = minVec[Axis.X] > maxVec[Axis.X] ? "left" : "right";

    return [minVec, maxVec, direction];
  };

  private _checkDiagonal = (coor1: Vec, coor2: Vec) =>
    Math.abs(coor1[Axis.Y] - coor2[Axis.Y]) /
      Math.abs(coor1[Axis.X] - coor2[Axis.X]) ===
    1;

  private _fromStrToVecs = (str: string): Vec[] => {
    // string structure: x1,y1 -> x2,y2;
    const [coor1, coor2] = str
      .split(" -> ")
      .map((coor) =>
        coor.split(",").map((innerStr) => parseInt(innerStr, 10))
      ) as [Vec, Vec];

    if (coor1[Axis.X] === coor2[Axis.X] || coor1[Axis.Y] === coor2[Axis.Y]) {
      return this._extandVerticalAndHorizontalVecs(coor1, coor2);
    }

    if (this.isDiagonal && this._checkDiagonal(coor1, coor2)) {
      return this._extandDiagonalVecs(coor1, coor2);
    }

    return [];
  };

  private _extractVecsFromData = (data: string[]): Vec[] => {
    const allVecs: Vec[] = [];

    for (let str of data) allVecs.push(...this._fromStrToVecs(str));

    return allVecs;
  };

  private _markBoard = (initialBoard: number[][], vecArr: Vec[]): void => {
    for (let [x, y] of vecArr) initialBoard[y][x]++;
  };

  private _extractBoardFromData = (data: string[]): number[][] => {
    const vecArr = this._extractVecsFromData(data);

    const boardSize = vecArr.reduce(
      (acc, curr) => [
        Math.max(curr[Axis.X], acc[Axis.X]),
        Math.max(curr[Axis.Y], acc[Axis.Y]),
      ],
      [0, 0]
    );

    const board = Array(boardSize[0] + 1)
      .fill(0)
      .map((_) => Array(boardSize[1] + 1).fill(0));

    this._markBoard(board, vecArr);

    return board;
  };
}

export default HydrothermalVenture;

type x = number;
type y = number;
type Vec = [x, y];
