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
  FormLabel,
  FormControl,
  Input,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaTwitter } from 'react-icons/fa';

import BackgroundSignup from '../../assets/background-signup.jpg';

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="whiteAlpha.200" />
        <ModalContent>
          <ModalHeader bg="black" color="white">
            Create your account
          </ModalHeader>
          <ModalCloseButton borderRadius="50%" />
          <ModalBody bg="black">
            <Stack as="form">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" variant="filled" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" variant="filled" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type="password"
                    variant="filled"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date">Date of birth</FormLabel>
                <Input size="md" id="date" type="date" variant="filled" />
              </FormControl>
            </Stack>
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
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
