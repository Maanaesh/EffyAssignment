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
  - View company details and display the company’s location on a map
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

