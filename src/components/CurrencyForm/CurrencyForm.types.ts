import { SIMULATION_METHOD } from '../../utils';

export interface CurrencyFormInputs {
  dollar: number;
  euro: number;
  method: SIMULATION_METHOD;
}

export interface CurrencyFormProps {
  onSubmit: (inputs: CurrencyFormInputs) => void;
  onClick: () => void;
  isActive: boolean;
}
