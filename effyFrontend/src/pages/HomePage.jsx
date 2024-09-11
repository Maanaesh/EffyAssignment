import { Container, Box, Button, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate(); 


  return (
    <Container centerContent>
      <Box textAlign="center" p={8}>
        <Heading as="h1" mb={8}>Welcome to the Dashboard</Heading>
        
        
        <VStack spacing={6}>
          <Button colorScheme="teal" size="lg" width="200px" onClick={()=>navigate("/ListCompanies")}>
            List Companies
          </Button>

          <Button colorScheme="blue" size="lg" width="200px" onClick={()=>navigate("/ListUsers")}>
            List Users
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}

export default HomePage;
