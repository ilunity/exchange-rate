import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { ChartData } from '../CurrencyChart/CurrencyChart.types';
import { ChartDataAction, chartDataReducer } from './reducer';
import { generatePointData, SIMULATION_METHOD } from '../../utils';
import { Stack } from '@mui/material';
import { CurrencyChart } from '../CurrencyChart';
import { CurrencyForm } from '../CurrencyForm';
import { CurrencyFormInputs } from '../CurrencyForm/CurrencyForm.types';


export const CurrencySimulator: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [chartData, chartDataDispatch] = useReducer<Reducer<ChartData, ChartDataAction>>(chartDataReducer, []);
  const [simulationMethod, setSimulationMethod] = useState<SIMULATION_METHOD>(SIMULATION_METHOD.RANDOM);

  const toggleActive = () => {
    setIsActive(prevState => !prevState);
  };

  const handleFormSubmit = ({ dollar, euro, method }: CurrencyFormInputs) => {
    chartDataDispatch({
      type: 'setChart',
      payload: {
        day: new Date(),
        dollar,
        euro,
      },
    });

    setSimulationMethod(method);

    setIsActive(true);
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      const chartLastIndex = chartData.length - 1;

      chartDataDispatch({
        type: 'updateChart',
        payload: generatePointData(chartData[chartLastIndex], simulationMethod),
      });

    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, chartData]);

  return (
    <Stack
      direction={ 'column' }
      spacing={ 5 }
      sx={ { mt: 5 } }
    >
      <CurrencyForm onSubmit={ handleFormSubmit } onClick={ toggleActive } isActive={ isActive } />
      <CurrencyChart chartData={ chartData } />
    </Stack>
  );
};
