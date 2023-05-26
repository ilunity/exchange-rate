import React, { useState } from 'react';
import { CurrencyFormInputs, CurrencyFormProps } from './CurrencyForm.types';
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useController, useForm } from 'react-hook-form';
import { SIMULATION_METHOD } from '../../utils';


export const CurrencyForm: React.FC<CurrencyFormProps> = ({ onSubmit, onClick, isActive }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<CurrencyFormInputs>({
    defaultValues: { method: SIMULATION_METHOD.BROWNIAN },
  });

  const pattern = /\d+\.\d+|^[0-9]+$/g;

  const {
    field: { onChange },
  } = useController({
    name: 'method',
    control,
    rules: { required: true },
  });

  const currentMethod = watch('method');

  return (
    <Stack
      component={ 'form' }
      direction={ 'row' }
      spacing={ 5 }
      sx={ { m: '0 auto' } }
      onSubmit={ handleSubmit((data) => {
        if (isDisabled) {
          return;
        }

        setIsDisabled(true);
        onSubmit(data);
      }) }
    >
      <TextField
        { ...register('dollar', {
          pattern,
          required: true,
        }) }
        label={ 'Dollar' }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 20 } } position='end'>$</InputAdornment>,
          disabled: isDisabled,
        } }
        error={ !!errors.dollar }
      />
      <TextField
        { ...register('euro', {
          pattern,
          required: true,
        }) }
        label={ 'Euro' }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 20 } } position='end'>€</InputAdornment>,
          disabled: isDisabled,
        } }
        error={ !!errors.euro }
      />
      <FormControl sx={ { width: 200 } } disabled={ isDisabled }>
        <InputLabel id={ 'index-type' }>Simulation method</InputLabel>
        <Select
          labelId={ 'index-type' }
          value={ currentMethod }
          label='Ранжирование'
          onChange={ (event: SelectChangeEvent) => {
            onChange(event.target.value);
          } }
        >
          <MenuItem value={ SIMULATION_METHOD.RANDOM }>
            random
          </MenuItem>
          <MenuItem value={ SIMULATION_METHOD.BROWNIAN }>
            brownian process
          </MenuItem>
        </Select>
      </FormControl>
      <Button
        type={ 'submit' }
        variant={ 'outlined' }
        onClick={ onClick }
      >
        { isActive ? 'Stop' : 'Start' }
      </Button>
    </Stack>
  );
};
