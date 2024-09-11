import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/api';
import { Container, Text, VStack, Spinner, Grid, Box, Button,Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (error) {
      setError(error?.response?.data || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (deletedUserId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deletedUserId));
  };

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Text color="red.500">Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Heading as="h1" mb={8}>List of Users</Heading>
      <VStack spacing={4} align="start">
        {users.length === 0 ? (
          <>
            <Text>No Users Found</Text>
                <Button colorScheme="blue" onClick={() => navigate('/createUser')}>
                Add User
                </Button>
          </>
        ) : (
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
            {users.map((user) => (
              <Box key={user._id}>
                <UserCard user={user} onDelete={() => handleDelete(user._id)} onUpdate={fetchUsers} />
              </Box>
            ))}
            <Button colorScheme="blue" onClick={() => navigate('/createUser')}>
                Add User
                </Button>
          </Grid>
        )}
      </VStack>
    </Container>
  );
}

export default ListUsers;
