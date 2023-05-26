import { ChartPointData } from '../components/CurrencyChart/CurrencyChart.types';
import { getNextDay } from './get-next-day';
import { Random } from './random';

const k = 0.2;

function randomPercentage(previousNumber: number) {
  return previousNumber * (1 + k * (Math.random() - 0.5));
}

export enum SIMULATION_METHOD {
  RANDOM = 'random',
  BROWNIAN = 'brownian',
}


export const generatePointData = ({ day, dollar, euro }: ChartPointData, method: SIMULATION_METHOD): ChartPointData => {
  const randomFunction = {
    [SIMULATION_METHOD.RANDOM]: randomPercentage,
    [SIMULATION_METHOD.BROWNIAN]: Random.geomBrownianIterator(0.001, 0.01),
  };

  const newPointData = {
    day: getNextDay(day),
    dollar: randomFunction[method](dollar),
    euro: randomFunction[method](euro),
  };

  return newPointData;
};
