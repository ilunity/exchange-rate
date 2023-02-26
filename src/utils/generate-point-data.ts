import { ChartPointData } from '../components/CurrencyChart/CurrencyChart.types';
import { getNextDay } from './get-next-day';

const k = 0.2;

function randomPercentage(previousNumber: number) {
  return previousNumber * (1 + k * (Math.random() - 0.5));
}

export const generatePointData = ({ day, dollar, euro }: ChartPointData): ChartPointData => {
  const newPointData = {
    day: getNextDay(day),
    dollar: randomPercentage(dollar),
    euro: randomPercentage(euro),
  };

  return newPointData;
};
