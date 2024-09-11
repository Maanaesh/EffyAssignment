import React, { useState } from 'react';
import { 
  Container, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  VStack,
  useToast ,
  Text,
} from '@chakra-ui/react';
import { createCompany } from '../api/api.js';


function CreateCompanyPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        companyAdrs: '',
        latLong: {
          lat: '',
          long: '',
        },
      });
    
      const toast = useToast();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'lat' || name === 'long') {
          setFormData((prev) => ({
            ...prev,
            latLong: {
              ...prev.latLong,
              [name]: value,
            },
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const res = await createCompany(formData); 
          //console.log(res.data);
    
          if (res.data.success) {
            toast({
              title: 'Form submitted',
              description: "Company information has been submitted successfully.",
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
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
          companyName: '',
          companyAdrs: '',
          latLong: {
            lat: '',
            long: '',
          },
        });
      };
    
      return (
        <Container>
             <Text as={'h3'} fontWeight={"bold"} align={"center"} fontSize={"25px"} fontFamily={"sans-serif"}>Create Company</Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Company Name</FormLabel>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Company XYZ"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </FormControl>
    
              <FormControl isRequired>
                <FormLabel>Company Address</FormLabel>
                <Input
                  type="text"
                  name="companyAdrs"
                  placeholder="1234 Street, City, Country"
                  value={formData.companyAdrs}
                  onChange={handleChange}
                />
              </FormControl>
    
              <FormControl isRequired>
                <FormLabel>Latitude</FormLabel>
                <Input
                  type="number"
                  name="lat"
                  placeholder="37.7749"
                  value={formData.latLong.lat}
                  onChange={handleChange}
                />
              </FormControl>
    
              <FormControl isRequired>
                <FormLabel>Longitude</FormLabel>
                <Input
                  type="number"
                  name="long"
                  placeholder="-122.4194"
                  value={formData.latLong.long}
                  onChange={handleChange}
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

export default CreateCompanyPage