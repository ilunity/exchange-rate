export interface CurrencyFormInputs {
  dollar: number,
  euro: number
}

export interface CurrencyFormProps {
  onSubmit: (inputs: CurrencyFormInputs) => void;
  onClick: () => void;
  isActive: boolean;
}
