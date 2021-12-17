class Bingo {
  private numbers: string[];
  private boards: string[][][];
  private lastScore: number;
  constructor(data: string[]) {
    [this.boards, this.numbers] = this._parseBingoInfo(data);
    this.lastScore = 0;
  }

  public play = (firstBoardToWin = true) => {
    for (let number of this.numbers) {
      this._markBoard(number);
      const [isWon, winningBoards] = this._checkEachBoard();

      if (isWon) {
        if (firstBoardToWin)
          return this._computeFinalScore(+number, winningBoards[0]);
        if (this.boards.length === winningBoards.length) {
          this.lastScore = this._computeFinalScore(
            +number,
            winningBoards[winningBoards.length - 1]
          );
        }
        for (let winningBoard of winningBoards) {
          this.boards = this.boards.filter((board) => board !== winningBoard);
        }
      }
    }

    return this.lastScore;
  };

  private _computeFinalScore = (number: number, board: string[][]) => {
    let result = 0;
    for (let row of board) {
      const rowResult = row.reduce((rowAcc, curr) => {
        const currentNum = parseInt(curr);

        return isNaN(currentNum) ? (rowAcc += 0) : (rowAcc += currentNum);
      }, 0);
      result += rowResult;
    }

    return number * result;
  };

  private _markBoard = (number: string) => {
    for (let i = 0; i < this.boards.length; i++) {
      for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 5; k++) {
          const currentNum = this.boards[i][j][k];
          if (currentNum === number) this.boards[i][j][k] = "_" + currentNum;
        }
      }
    }
  };

  private _checkEachBoard = (): [boolean, string[][][]] => {
    const tuple: [boolean, string[][][]] = [false, []];
    for (let board of this.boards) {
      if (this._checkIfRowWon(board) || this._checkIfColWon(board)) {
        tuple[0] = true;
        tuple[1].push(board);
      }
    }
    return tuple;
  };

  private _checkIfRowWon = (board: string[][]) => {
    for (let row of board) {
      if (row.every((item) => item[0] === "_")) return true;
    }
    return false;
  };

  private _checkIfColWon = (board: string[][]) => {
    for (let i = 0; i < board.length; i++) {
      let counter = 0;
      for (let j = 0; j < board.length; j++) {
        const currentNum = board[j][i];
        if (currentNum[0] === "_") counter++;
      }
      if (counter === board.length) return true;
    }

    return false;
  };

  private _parseBingoInfo = (data: string[]): [string[][][], string[]] => {
    const numbers = data.shift()!.split(",");
    const boards = [];

    for (let i = 0; i < data.length; i++) {
      let currentString = data[i];
      const currentBoard: string[][] = [];
      while (currentString !== "" && i < data.length) {
        currentBoard.push(
          currentString.split(" ").filter((item) => item.trim() !== "")
        );
        i++;
        currentString = data[i];
      }
      currentBoard.length > 0 && boards.push(currentBoard);
    }
    return [boards, numbers];
  };
}

export default Bingo;
