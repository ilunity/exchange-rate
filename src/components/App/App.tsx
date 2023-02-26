import { Container, CssBaseline } from '@mui/material';
import { CurrencySimulator } from '../CurrencySimulator';

export const App: React.FC = () => {
  return (
    <Container maxWidth={ 'xl' }>
      <CssBaseline />
      <CurrencySimulator />
    </Container>
  );
};
