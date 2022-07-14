import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: chakraTheme.colors.twitter,
  },
  config: {
    initialColorMode: 'dark',
  },
  fonts: {
    footer: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
  },
});
