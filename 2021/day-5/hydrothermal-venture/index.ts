enum Axis {
  X = 0,
  Y = 1,
}
class HydrothermalVenture {
  board: number[][];
  constructor(data: string[]) {
    this.board = this._extractBoardFromData(data);
  }

  public findOverlap = (min = 2) => {
    let counter = 0;
    for (let row of this.board) {
      for (let num of row) if (num >= min) counter++;
    }

    return counter;
  };

  private _extandVecs = (
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) => {
    const extandedVecs: Vec[] = [];

    for (let x = minX; x < maxX; x++) extandedVecs.push([x, maxY] as Vec);

    for (let y = minY; y < maxY; y++) extandedVecs.push([maxX, y] as Vec);

    return extandedVecs;
  };
  private _fromStrToVecs = (str: string, isStrict = true): Vec[] => {
    // string structure: x1,y1 -> x2,y2;
    const [coor1, coor2] = str
      .split(" -> ")
      .map((coor) =>
        coor.split(",").map((innerStr) => parseInt(innerStr, 10))
      ) as [Vec, Vec];

    const minX = Math.min(coor1[Axis.X], coor2[Axis.X]);
    const minY = Math.min(coor1[Axis.Y], coor2[Axis.Y]);
    const maxX = Math.max(coor1[Axis.X], coor2[Axis.X]);
    const maxY = Math.max(coor1[Axis.Y], coor2[Axis.Y]);
    if (
      isStrict &&
      (coor1[Axis.X] === coor2[Axis.X] || coor1[Axis.Y] === coor2[Axis.Y])
    ) {
      return [[maxX, maxY], ...this._extandVecs(minX, minY, maxX, maxY)];
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
