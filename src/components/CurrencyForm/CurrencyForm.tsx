import React, { useState } from 'react';
import { CurrencyFormInputs, CurrencyFormProps } from './CurrencyForm.types';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';


export const CurrencyForm: React.FC<CurrencyFormProps> = ({ onSubmit, onClick, isActive }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CurrencyFormInputs>();

  const pattern = /\d/;
  const getNumber = (str: string) => {
    return Number(str);
  };

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
          setValueAs: getNumber,
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
          setValueAs: getNumber,
        }) }
        label={ 'Euro' }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 20 } } position='end'>€</InputAdornment>,
          disabled: isDisabled,
        } }
        error={ !!errors.euro }
      />
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
