import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyById, getUserById } from '../api/api';
import { Spinner, Alert, AlertIcon, Box, Heading, Text, Container } from '@chakra-ui/react';

function UserDetails() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState("");


  const fetchUserData = async (id) => {
    setLoading(true);
    try {
      const response = await getUserById(id);
      setUser(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const fetchCompanyName = async (companyId) => {
    try {
      const res = await getCompanyById(companyId);
      setCompanyName(res.data.data.companyName);
    } catch (err) {
      console.error("Error fetching company:", err.message);
    }
  };

  useEffect(() => {

    fetchUserData(id);
  }, [id]);

  useEffect(() => {
    if (user && user.company) {
      fetchCompanyName(user.company);
    }
  }, [user]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    
      
      <Container>
        <Heading size="lg">User Details</Heading>
      {user ? (
        
        <Box mt={4}>
          <Text><strong>First Name:</strong> {user.firstname}</Text>
          <Text><strong>Last Name:</strong> {user.lastname}</Text>
          <Text><strong>Email:</strong> {user.email}</Text>
          <Text><strong>Designation:</strong> {user.designation}</Text>
          <Text><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</Text>
          <Text><strong>Active:</strong> {user.active ? "Yes" : "No"}</Text>
          <Text><strong>Company:</strong> {companyName}</Text>
        </Box>
        
      ) : (
        <Text>No user data available</Text>
      )}
      </Container>

  );
}

export default UserDetails;
