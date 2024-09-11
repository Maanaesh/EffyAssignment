import React, { useState } from 'react';
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
  Modal,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { deleteUser, updateUser } from '../api/api';

function UserCard({ user, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formState, setFormState] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    designation: user.designation,
    dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    active: user.active,
  });

  const handleDelete = async (event) => {
    event.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete ${user.firstname} ${user.lastname}?`);
    
    if (!confirmDelete) return;

    try {
      await deleteUser(user._id);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateUser(user._id, formState);
      toast({
        title: 'User updated.',
        description: 'The user details have been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); 
      if (onUpdate) onUpdate(); 
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error updating user.',
        description: 'An error occurred while trying to update the user.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
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
              icon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onOpen(); 
              }}
            />
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstname"
                value={formState.firstname}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastname"
                value={formState.lastname}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Designation</FormLabel>
              <Input
                name="designation"
                value={formState.designation}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                name="dob"
                type="date"
                value={formState.dob}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" mt={4}>
              <FormLabel htmlFor="active" mb="0">
                Active
              </FormLabel>
              <Switch
                id="active"
                name="active"
                isChecked={formState.active}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserCard;
