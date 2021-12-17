class Submarine {
  private data: string[];
  private binaryLength: number;

  constructor(binaryData: string[]) {
    this.data = binaryData;
    this.binaryLength = this.data[0].length;
  }

  get lifeSupportRating() {
    return this._CO2Rating() * this._oxygenRating();
  }
  get powerConsumption() {
    return this._gammaRate() * this._epislonRate();
  }

  private _epislonRate = () => this._getRate('tuple[0] < tuple[1] ? "0" : "1"');

  private _gammaRate = () => this._getRate('tuple[0] > tuple[1] ? "0" : "1"');

  private _CO2Rating = () =>
    this._getRate('tuple[0] <= tuple[1] ? "0" : "1"', true);

  private _oxygenRating = () =>
    this._getRate('tuple[0] > tuple[1] ? "0" : "1"', true);

  private _extractNumberFromBinary = (binary: string) => parseInt(binary, 2);

  private _getRate = (condition: string, withFilter = false) => {
    const fn = new Function(
      "tuple",
      `return ${condition}`
    ) as ConditionFunction;

    return this._extractNumberFromBinary(
      this._extractInfoFromData(fn, withFilter)
    );
  };

  private _binaryRepation = (data: string[], idx: number) =>
    data.reduce(
      (acc, curr) => {
        +curr[idx] === 0 ? acc[0]++ : acc[1]++;
        return acc;
      },
      [0, 0]
    ) as Tuple;

  private _extractInfoFromData = (
    fn: ConditionFunction,
    withFilter = false
  ) => {
    let scopedData = this.data;
    let result = "";
    for (let i = 0; i < this.binaryLength; i++) {
      const tuple = this._binaryRepation(scopedData, i);
      const chosen = fn(tuple);
      withFilter
        ? (scopedData = scopedData.filter((item) => item[i] === chosen))
        : (result += chosen);
      if (scopedData.length === 1) return scopedData[0];
    }

    return result;
  };
}

export default Submarine;

type ConditionFunction = (tuple: Tuple) => string;

type Tuple = [number, number];
