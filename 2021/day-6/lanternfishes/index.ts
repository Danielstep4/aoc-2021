class Lanternfish {
  innerTimer: number;
  constructor(innerTimer = 8) {
    this.innerTimer = innerTimer;
  }

  public dayPassed = () => {
    if (!this.innerTimer) {
      this.innerTimer = 6;
      return new Lanternfish();
    }
    this.innerTimer--;
  };
}

class Lanternfishes {
  fishes: Lanternfish[];

  constructor(data: string[]) {
    this.fishes = this._parseData(data);
  }

  get fishesAmount() {
    return this.fishes.length;
  }

  public goToFuture = (days: number) => {
    for (let i = 0; i < days; i++) {
      this._newDay();
    }
    return this.fishesAmount;
  };

  private _newDay = () => {
    const newFishes = [];

    for (let i = 0; i < this.fishes.length; i++) {
      const currentFish = this.fishes[i];
      const newFish = currentFish.dayPassed();
      if (newFish) newFishes.push(newFish);
    }

    for (let i = 0; i < newFishes.length; i++) {
      const currentNewFish = newFishes[i];
      this.fishes.push(currentNewFish);
    }
  };

  private _createNewLanternfish = (innerTimer?: number) =>
    new Lanternfish(innerTimer);

  private _parseData = (data: string[]) =>
    data
      .map((l) => [...l])
      .flat()
      .filter((str) => str !== ",")
      .map((str) => this._createNewLanternfish(+str));
}

export default Lanternfishes;
