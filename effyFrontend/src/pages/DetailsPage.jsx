import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyById, getUserById, addUserToCompany, deleteUserFromCompany } from '../api/api'; 
import { Button, Container, Box, Heading, Text, Spinner, Alert, AlertIcon, useDisclosure, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import AssignedUserCard from '../components/AssignedUserCard';
import { userStore } from '../store/userstore.js';

function DetailsPage() {
    const { users, fetchAllUsers } = userStore();
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

 
    const fetchCompanyData = async () => {
        setLoading(true);
        try {
            const response = await getCompanyById(id);
            const companyData = response.data.data;
            setCompany(companyData);

            const userIds = companyData.users || []; 
            const userDetailsPromises = userIds.map(userId => getUserById(userId));
            const users = await Promise.all(userDetailsPromises);
            const validUsers = users
                .map(response => response.data.data)
                .filter(user => user !== null);
            setAssignedUsers(validUsers);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanyData();
        fetchAllUsers();
    }, [id, fetchAllUsers]);

    const handleAddUser = async () => {
        if (!selectedUser) return;

        try {
            await addUserToCompany(selectedUser, id); 
            const newUser = await getUserById(selectedUser); 
            setAssignedUsers(prevUsers => [...prevUsers, newUser.data.data]); 
            setSelectedUser(""); 
            onClose();
        } catch (err) {
            console.error("Error adding user:", err.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUserFromCompany(userId, id);
            setAssignedUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch (err) {
            console.error("Failed to delete user:", err.message);
        }
    };

    if (loading) return <Spinner size="xl" />;
    if (error) return (
        <Alert status="error">
            <AlertIcon />
            {error}
        </Alert>
    );

    if (!company) return <Text>No company found.</Text>;

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${company.latLong.lat},${company.latLong.long}`;

    const unassignedUsers = users.filter(user => 
        !assignedUsers.some(assignedUser => assignedUser._id === user._id) && 
        (user.company === null || (Array.isArray(user.company) && user.company.length === 0))
    );
    
    return (
        <Container>
            <Box p={4}>
                <Heading mb={4}>{company.companyName}</Heading>
                <Text mb={2}><strong>Address:</strong> {company.companyAdrs}</Text>
                <Text mb={2}><strong>Latitude:</strong> {company.latLong.lat}</Text>
                <Text mb={2}><strong>Longitude:</strong> {company.latLong.long}</Text>
            </Box>

            <Button onClick={onOpen} colorScheme="teal" mb={4}>Add User to Company</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add User to Company</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select
                            placeholder="Select user"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            {unassignedUsers.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.firstname} {user.lastname} - {user.designation}
                                </option>
                            ))}
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleAddUser} isDisabled={!selectedUser}>
                            Add User
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box>
                {assignedUsers.length > 0 ? (
                    assignedUsers.map(user => (
                        user && (
                            <AssignedUserCard
                                key={user._id}
                                user={user}
                                onDelete={() => handleDeleteUser(user._id)} 
                            />
                        )
                    ))
                ) : (
                    <Text>No users assigned to this company.</Text>
                )}
            </Box>

            <Box height="400px" mt={4}>
                <MapContainer
                    center={[company.latLong.lat, company.latLong.long]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[company.latLong.lat, company.latLong.long]}>
                        <Popup>
                            {company.companyName}<br />
                            {company.companyAdrs}
                            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </Container>
    );
}

export default DetailsPage;
