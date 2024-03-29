import { ChartData, ChartPointData } from '../CurrencyChart/CurrencyChart.types';

export type ChartDataAction = {
  type: 'setChart';
  payload: ChartPointData;
} | {
  type: 'updateChart';
  payload: ChartPointData;
}

export const chartDataReducer = (state: ChartData, action: ChartDataAction) => {
  switch (action.type) {
    case 'setChart':
      return [action.payload];
    case 'updateChart':
      const sliceIndex = state.length > 365 ? 1 : 0;
      return [...state.slice(sliceIndex), action.payload];
  }
};
