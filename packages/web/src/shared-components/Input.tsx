/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
} from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';

type Props = ChakraInputProps & {
  name: string;
  validate: boolean;
  label?: string;
};

export function Input({ name, label, validate, ...rest }: Props) {
  const [field, meta] = useField(name);

  const isInvalid = validate && !!meta.error;

  return (
    <FormControl isInvalid={isInvalid}>
      {label && (
        <FormLabel color="white" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <ChakraInput
          background="whiteAlpha.50"
          color="white"
          variant="filled"
          {...rest}
          {...field}
          name={name}
          _hover={{ background: 'whiteAlpha.50' }}
          _focus={{
            borderColor: isInvalid ? 'red' : 'primary',
            background: 'whiteAlpha.50',
          }}
        />
      </InputGroup>
      {validate && (
        <ErrorMessage name={name}>
          {(errorMessage) => (
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          )}
        </ErrorMessage>
      )}
    </FormControl>
  );
}
