# Company and User Management System

This is a full-stack web application that allows you to manage companies and users. The app is built using a RESTful API with Node.js, Express, and MongoDB on the backend. The frontend is built with React and Chakra UI for a modern user interface. It allows you to view, create, update, and manage companies and users, as well as plot company addresses on a map using coordinates.

## Features

### Backend (Phase 1 - REST API)
- **Companies**: 
  - List companies
  - Get a specific company by ID
  - Create, update, and delete a company
  - Add or remove users to/from a company
  - Fetch and store coordinates (latitude and longitude)
- **Users**:
  - List users
  - Get a specific user by ID
  - Create, update, and delete users
  - Deactivate a user (sets `active` field to `false`)
  - Assign a user to a company or migrate them to another company

### Frontend (Phase 2 - UI)
- **Company Management**:
  - Create, update, and delete companies
  - View company details and display the company’s location on a map with direct google maps navigation link
  - Manage users assigned to a company
- **User Management**:
  - Create, update, and deactivate users
  - Migrate users between companies

## Tech Stack

### Backend:
- **Node.js** with **Express.js** for building the REST API
- **MongoDB** for data storage
- **Mongoose** for interacting with MongoDB

### Frontend:
- **React.js** for building the user interface
- **Chakra UI** for UI components and styling
- **React-Leaflet** for displaying maps and plotting company coordinates
- **Axios** for making API calls
- **React Router** for routing between pages

## Installation

### Backend Setup

1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone https://github.com/yourusername/yourrepo.git
   cd yourrepo/backend
2.Install dependencies:
```bash
    npm install
```
3.Set up your .env file with the following environment variables:
```bash
PORT=5005
MONGO_URI =
```
### Frontend Setup

1.Navigate to the frontend folder:
```bash
  cd ../frontend
```
2.Install dependencies:
```
  npm install
```
3.Start the frontend server:
``` bash
npm start
```
### HomePage
![image](https://github.com/user-attachments/assets/cfa8e3c2-d850-4518-b1a0-9b7d13e9d522)

### ListCompanies Page
![image](https://github.com/user-attachments/assets/290053ad-2ab8-4f9d-a41e-72a228b2dfee)

### CreateCompany Form
![image](https://github.com/user-attachments/assets/174d654f-b3cb-4067-bd6c-6d3f17e1043e)

### Modify Company Details
![image](https://github.com/user-attachments/assets/13cfc009-da68-4f04-84b5-0aa03125732a)

### Company Details Page
![image](https://github.com/user-attachments/assets/3f517eb5-3971-4350-848e-8df249f57ff3)

### List Users Page
![image](https://github.com/user-attachments/assets/10e0b312-e53e-401e-89b6-9c691008ab1e)

### Create User From
![image](https://github.com/user-attachments/assets/86d643d3-32e3-4a86-a770-a4fdf3a1bf6d)

### User Details Page
![image](https://github.com/user-attachments/assets/e1bb11bd-74ab-4fd2-b772-f34c7d6d4d3d)

### Modify User Details 
![image](https://github.com/user-attachments/assets/c2412755-97a3-41ea-802b-5c985741cb95)


