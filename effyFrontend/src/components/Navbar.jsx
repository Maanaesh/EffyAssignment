import { Button, Container, Flex, HStack, Text, Icon, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import React from 'react';

const Navbar = () => {
  return (
    <Container maxW="container.xl" px={4}>
      <Flex 
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", md: "row" }}
        py={2}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          textTransform="uppercase"
          textAlign="center"
          color={'black'}
          fontWeight="bold"
        >
          <Link to="/">Home</Link>
        </Text>

        <HStack spacing={4} alignItems="center">
          <a href="https://www.linkedin.com/in/maanaesh-swamy-7366b4182/" target="_blank" rel="noopener noreferrer">
            <Icon as={FaLinkedin} boxSize={6} _hover={{ color: "blue.500" }} />
          </a>
          <a href="https://github.com/Maanaesh" target="_blank" rel="noopener noreferrer">
            <Icon as={FaGithub} boxSize={6} _hover={{ color: "gray.500" }} />
          </a>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
