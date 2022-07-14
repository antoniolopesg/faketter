import { ChakraProvider } from '@chakra-ui/react';
import { SignupPage } from './modules/users/SignupPage';
import { theme } from './theme';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <SignupPage />
    </ChakraProvider>
  );
}
