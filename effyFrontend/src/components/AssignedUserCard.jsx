import React from 'react';
import {
  Box,
  Text,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function AssignedUserCard({ user, onDelete }) {
  const navigate = useNavigate();
  const toast = useToast();

  const handleDelete = async (event) => {
    event.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete ${user.firstname} ${user.lastname}?`);
    
    if (!confirmDelete) return;

    try {
      if (onDelete) onDelete();
      toast({
        title: 'User deleted.',
        description: `${user.firstname} ${user.lastname} has been deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error deleting user.',
        description: 'An error occurred while trying to delete the user.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/Userdetails/${user._id}`);
  };

  return (
    <Card onClick={handleCardClick} cursor="pointer" bgColor="gray.100">
      <CardHeader>
        <Flex spacing="4" alignItems="center" justifyContent="space-between">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="sm">
                {user.firstname} {user.lastname}
              </Heading>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            icon={<DeleteIcon />}
            onClick={handleDelete} 
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{user.designation}</Text>
      </CardBody>
    </Card>
  );
}

export default AssignedUserCard;
