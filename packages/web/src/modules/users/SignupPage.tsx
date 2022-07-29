import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { FaTwitter } from 'react-icons/fa';

import BackgroundSignup from '../../assets/background-signup.jpg';
import { Input } from '../../shared-components/Input';

type SignupForm = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
};

const initialValues = {
  email: '',
  name: '',
  password: '',
  dateOfBirth: '',
};

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must have at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('The email needs to be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must have at least 7 characters')
    .test({
      message: 'Password must have at least 1 number',
      test: (value) => !!value && value.search(/[0-9]/) >= 0,
    })
    .test({
      message: 'Password must have at least 1 letter',
      test: (value) => !!value && value.search(/[a-zA-z]/) >= 0,
    })
    .test({
      message: 'Password must have at least 1 special character',
      test: (value) => !!value && value.search(/[^a-zA-Z0-9\s]/) >= 0,
    })
    .required('Password is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
});

export function SignupPage() {
  const formik = useFormik<SignupForm>({
    initialValues,
    validationSchema: signupSchema,
    validateOnMount: false,
    onSubmit: (values) => {
      /* eslint-disable no-console */
      console.log(values); // TODO: call the mutation
    },
  });

  const { isSubmitting, handleSubmit } = formik;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box display="flex" height="100vh" flexDir="column" background="black">
        <Flex w="full" flex="1" flexDir={{ base: 'column-reverse', md: 'row' }}>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor="twitter.500"
            pos="relative"
            backgroundImage={BackgroundSignup}
            minH="45vh"
            backgroundSize="cover"
            backgroundPosition="center"
            flex="1"
            p="4"
          >
            <Box
              w="full"
              h="full"
              maxW="full"
              pos="absolute"
              top="0"
              left="0"
              background="blackAlpha.400"
              backdropFilter="blur(3px)"
              zIndex="1"
            />
            <Text
              textShadow="1px 1px 5px rgba(0, 0, 0, 0.8)"
              zIndex="2"
              fontSize="6xl"
              fontWeight="bold"
              color="white"
            >
              Faketter
            </Text>
          </Flex>
          <Flex
            minWidth="45vw"
            justifyContent="center"
            alignItems="center"
            p="4"
          >
            <Stack alignItems="flex-start" w="full" p="5" spacing={12}>
              <Icon as={FaTwitter} w={10} h={10} color="white" />

              <Text color="white" fontFamily="Verdana" fontSize="64" as="span">
                Happening Now
              </Text>

              <Text color="white" fontFamily="Verdana" fontSize="31" as="span">
                Join Twitter Today
              </Text>

              <Button
                bgColor="primary.500"
                _hover={{ bgColor: 'primary.600' }}
                _active={{ bgColor: 'primary.600' }}
                borderRadius="3xl"
                size="md"
                width="300px"
                height="40px"
                fontSize="md"
                onClick={onOpen}
              >
                Sign up with your email
              </Button>
              <Stack>
                <Text color="white" fontFamily="Verdana" as="span">
                  Already have an account?
                </Text>
                <Button
                  size="md"
                  width="300px"
                  height="40px"
                  fontSize="md"
                  borderRadius="3xl"
                  color="primary.500"
                  bg="transparent"
                  border="1px"
                  borderColor="primary.900"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Flex>
        <Box as="footer" textAlign="center" p="3" fontSize="md">
          <Text color="whiteAlpha.600" fontFamily="footer">
            Faketter - The Fullstack GraphQL + Relay Twitter clone
          </Text>
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          formik.resetForm();
        }}
        isCentered
      >
        <ModalOverlay bg="whiteAlpha.200" />
        <ModalContent>
          <ModalHeader bg="black" color="white">
            Create your account
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" />
          <ModalBody bg="black">
            <FormikProvider value={formik}>
              <Stack as={Form}>
                <Input label="Name" name="name" validate />
                <Input label="Email" name="email" type="email" validate />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  validate
                />
                <Input
                  label="Date of birth"
                  type="date"
                  name="dateOfBirth"
                  validate
                />
              </Stack>
            </FormikProvider>
          </ModalBody>

          <ModalFooter bg="black">
            <Button
              w="full"
              size="md"
              height="40px"
              color="black"
              borderRadius="3xl"
              bgColor="white"
              _hover={{ bgColor: 'whiteAlpha.900' }}
              _active={{ bgColor: 'whiteAlpha.900' }}
              isLoading={isSubmitting}
              onClick={(_) => handleSubmit()}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
