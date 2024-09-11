import React, { useState } from 'react';
import { 
  Container, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  VStack,
  FormHelperText,
  Switch,
  useToast,
  Text,
} from '@chakra-ui/react';
import { createUser } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

function UserSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        designation: '',
        dob: '',
        active: true,
      });
    
      const toast = useToast();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSwitchChange = () => {
        setFormData((prev) => ({
          ...prev,
          active: !prev.active,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const res = await createUser(formData);  
          console.log(res.data);
    
          if (res.data.success) {
            toast({
              title: 'Form submitted',
              description: "User information has been submitted successfully.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            navigate("/");
            
          }
        } catch (error) {
    
          if (error.response) {
            
            console.log('Error response:', error.response.data);
            
            toast({
              title: 'Error',
              description: `Error: ${error.response.data.message || 'An error occurred.'} (Code: ${error.response.status})`,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          } 
        }
    
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          designation: '',
          dob: '',
          active: true,
        });
      };
    
      return (
        <Container>
             <Text as={'h3'} fontWeight={"bold"} align={"center"} fontSize={"25px"} fontFamily={"sans-serif"}>Create User</Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstname"
                  placeholder="John"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </FormControl>
    
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Doe"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </FormControl>
    
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="someone@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
    
              <FormControl isRequired>
                <FormLabel>Designation</FormLabel>
                <Input
                  type="text"
                  name="designation"
                  placeholder="Developer"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </FormControl>
    
              <FormControl isRequired>
                <FormLabel>DOB</FormLabel>
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </FormControl>
    
              <FormControl display="flex" alignItems="center" mt={4}>
                <FormLabel mb="0">Active</FormLabel>
                <Switch
                  id="active"
                  isChecked={formData.active}
                  onChange={handleSwitchChange}
                />
              </FormControl>
    
              <Button type="submit" colorScheme="teal" size="md" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Container>
      );
}

export default UserSignup