const { sqrt, log, sin, PI } = Math;

type MultipleEvents = {
  probabilitiesArray: number[];
  arraySize?: undefined;
} | {
  probabilitiesArray?: undefined;
  arraySize: number;
}

export abstract class Random {
  static generate = () => Math.random();
  static getBoolean = (probability = 0.5) => Math.random() < probability;
  static getFromMultipleEvents = ({ probabilitiesArray, arraySize }: MultipleEvents) => {
    let A = this.generate();
    let i = -1;

    if (!probabilitiesArray) {
      const probability = 1 / arraySize;
      probabilitiesArray = [];
      for (let j = 0; j < arraySize; j++) {
        probabilitiesArray.push(probability);
      }
    }

    do {
      A -= probabilitiesArray[++i];
    } while (A > 0);

    return i;
  };
  static normalDistribution = (mean: number, variance: number) => {
    const base = sqrt(-2.0 * log(this.generate())) * sin(2.0 * PI * this.generate());
    return base * sqrt(variance) + mean;
  };

  static wienerMotionIterator() {
    let previousValue = -1;

    const current = () => previousValue;

    const next = () => {
      if (previousValue === -1) {
        return ++previousValue;
      }

      previousValue += this.normalDistribution(0, 1);
      return previousValue;
    };

    return { next, current };
  }

  static geomBrownianIterator(drift: number, volatility: number) {
    const wienerIter = this.wienerMotionIterator();
    wienerIter.next();

    const next = (previousValue: number) => {
      return previousValue * Math.exp((drift - volatility ** 2 / 2) + volatility * wienerIter.next());
    };

    return next;
  }
}
