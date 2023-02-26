import React from 'react';
import { CurrencyChartProps } from './CurrencyChart.types';
import { Area, AreaChart, CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import dateFormat from 'dateformat';
import { formatDay, getNextDay, roundNumber } from '../../utils';


export const CurrencyChart: React.FC<CurrencyChartProps> = ({ chartData }) => {
  const data = chartData.map(((value) => {
    return {
      dollar: roundNumber(value.dollar, 2),
      euro: roundNumber(value.euro, 2),
      day: formatDay(value.day),
    };
  }));

  const nextDayData = {
    day: dateFormat(getNextDay(new Date()), '    mmmm dS: yyyy    '),
  };

  return (
    <ResponsiveContainer
      height={ 500 }
      width={ '100%' }
    >
      <AreaChart
        data={ data.length === 1
          ? [...data, nextDayData]
          : data
        }
        margin={ {
          bottom: 30,
        } }
      >
        <defs>
          <linearGradient id='colorEuro' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#229cff' stopOpacity={ 0.4 } />
            <stop offset='90%' stopColor='#3f7dff' stopOpacity={ 0 } />
          </linearGradient>
          <linearGradient id='colorDollar' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={ 0.4 } />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={ 0 } />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={ 'day' }>
          <Label position={ 'bottom' }>
            День
          </Label>
        </XAxis>
        <YAxis domain={ [0, 100] }>
          <Label
            position={ 'insideLeft' }
            angle={ -90 }
          >
            Курс
          </Label>
        </YAxis>
        <Tooltip />
        <Area
          type='linear'
          dataKey='dollar'
          stroke='#82ca9d'
          strokeWidth={ 3 }
          fill='url(#colorDollar)'
          isAnimationActive={ false }
        />
        <Area
          type='linear'
          dataKey='euro'
          stroke='#8884d8'
          strokeWidth={ 3 }
          fill='url(#colorEuro)'
          isAnimationActive={ false }
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
