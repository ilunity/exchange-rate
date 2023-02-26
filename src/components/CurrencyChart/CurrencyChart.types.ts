export interface ChartPointData {
  day: Date;
  dollar: number;
  euro: number;
}

export type ChartData = ChartPointData[];

export interface CurrencyChartProps {
  chartData: ChartData;
}
