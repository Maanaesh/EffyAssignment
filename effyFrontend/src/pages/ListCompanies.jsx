import React, { useEffect, useState } from 'react';
import { Container, VStack, Spinner, Text, Grid,Box, Button,Heading } from '@chakra-ui/react';
import { getCompanies } from '../api/api.js'; 
import CompanyCard from '../components/CompanyCard';
import { useNavigate } from 'react-router-dom';

function ListCompanies() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const response = await getCompanies();
            setCompanies(response.data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies(); 
    }, []);
    const handleDelete = (deletedCompanyId) => {
        setCompanies((prev) => prev.filter((company) => company._id !== deletedCompanyId));
      };


    if (loading) {
        return <Spinner size="xl" />;
    }

    if (error) {
        return <Text color="red.500">Error: {error}</Text>;
    }

    return (
        <Container>
            <Heading as="h1" mb={8}>List of Companies</Heading>
            <VStack spacing={4} align="start">
                {companies.length === 0 ? (
                    <>
                    <Text>No companies found.</Text>
                    <Button colorScheme='blue' onClick={()=>navigate("/createCompany")}>Add Company</Button>
                    </>
                    
                ) : (
                    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                      {companies.map((company) => (
                        <Box key={company._id}> 
                          <CompanyCard
                            company={company}
                            onDelete={() => handleDelete(company._id)}
                            onUpdate={fetchCompanies}
                          />
                        </Box>
                      ))}
                      <Button colorScheme='blue' onClick={()=>navigate("/createCompany")}>Add Company</Button>
                    </Grid>
                  )}
            </VStack>
        </Container>
    );
}

export default ListCompanies