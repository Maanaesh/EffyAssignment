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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { deleteCompany, updateCompany } from '../api/api'; 
import { useNavigate } from 'react-router-dom';

function CompanyCard({ company, onDelete,onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [formState,setFormState]=useState({
    companyName:company.companyName,
    companyAdrs:company.companyAdrs,
    latLong:{
      lat:company.latLong.lat,
      long:company.latLong.long,
    },
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const handleDelete = async (event) => {
    event.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete ${company.companyName}?`);
    if (!confirmDelete) return;
    
    try {
      await deleteCompany(company._id);
      if (onDelete) onDelete();
      toast({
        title: 'Company deleted.',
        description: `${company.companyName} has been deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      await updateCompany(company._id, formState);
      toast({
        title: 'Company updated.',
        description: `${company.companyName} has been updated.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); 
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating company:', error);
      toast({
        title: 'Error updating company.',
        description: 'There was a problem updating the company details.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/details/${company._id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'long') {
      setFormState(prevState => ({
        ...prevState,
        latLong: {
          ...prevState.latLong,
          [name]: value
        }
      }));
    } else {
      setFormState(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  return (
    <>
      <Card onClick={handleCardClick} cursor="pointer" bgColor="gray.100">
        <CardHeader>
          <Flex spacing="4" alignItems="center" justifyContent="space-between">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{company.companyName}</Heading>
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
          <Text>{company.companyAdrs}</Text>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Company</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input
                name='companyName'
                value={formState.companyName}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Company Address</FormLabel>
              <Input
                name='companyAdrs'
                value={formState.companyAdrs}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Lat</FormLabel>
              <Input
                name='lat'
                value={formState.latLong.lat}
                onChange={handleInputChange}
              />
              </FormControl>
              <FormControl isRequired mt={4}>
              <FormLabel>Long</FormLabel>
              <Input
                name='long'
                value={formState.latLong.long}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdate}
              isLoading={isUpdating}
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

export default CompanyCard;
