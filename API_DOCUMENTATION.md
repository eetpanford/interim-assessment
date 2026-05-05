# Coinbase Clone Backend API Documentation

## Overview

This is the backend API for the Coinbase clone application. It provides user authentication and cryptocurrency data management using Node.js, Express, MongoDB, and JWT authentication.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/coinbase-clone
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

#### Register User
- **URL:** `POST /api/auth/register`
- **Description:** Create a new user account
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2023-09-01T12:00:00.000Z",
        "updatedAt": "2023-09-01T12:00:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### Login User
- **URL:** `POST /api/auth/login`
- **Description:** Authenticate user and return JWT token
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2023-09-01T12:00:00.000Z",
        "updatedAt": "2023-09-01T12:00:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### Get User Profile
- **URL:** `GET /api/auth/profile`
- **Description:** Get authenticated user's profile (Protected Route)
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
      "user": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2023-09-01T12:00:00.000Z",
        "updatedAt": "2023-09-01T12:00:00.000Z"
      }
    }
  }
  ```

### Cryptocurrency Endpoints

#### Get All Cryptocurrencies
- **URL:** `GET /api/crypto`
- **Description:** Get all available cryptocurrencies
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Cryptocurrencies retrieved successfully",
    "data": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "name": "Bitcoin",
        "symbol": "BTC",
        "price": 45000.50,
        "image": "https://example.com/btc.png",
        "change24h": 2.5,
        "createdAt": "2023-09-01T12:00:00.000Z",
        "updatedAt": "2023-09-01T12:00:00.000Z"
      }
    ]
  }
  ```

#### Get Top Gainers
- **URL:** `GET /api/crypto/gainers`
- **Description:** Get cryptocurrencies with highest 24h gains
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Top gainers retrieved successfully",
    "data": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
        "name": "Ethereum",
        "symbol": "ETH",
        "price": 3200.75,
        "image": "https://example.com/eth.png",
        "change24h": 5.2,
        "createdAt": "2023-09-01T12:00:00.000Z",
        "updatedAt": "2023-09-01T12:00:00.000Z"
      }
    ]
  }
  ```

#### Get New Listings
- **URL:** `GET /api/crypto/new`
- **Description:** Get most recently added cryptocurrencies
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "New listings retrieved successfully",
    "data": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
        "name": "NewCoin",
        "symbol": "NEW",
        "price": 1.25,
        "image": "https://example.com/new.png",
        "change24h": 0,
        "createdAt": "2023-09-01T14:30:00.000Z",
        "updatedAt": "2023-09-01T14:30:00.000Z"
      }
    ]
  }
  ```

#### Add New Cryptocurrency
- **URL:** `POST /api/crypto`
- **Description:** Add a new cryptocurrency to the database
- **Request Body:**
  ```json
  {
    "name": "Ripple",
    "symbol": "XRP",
    "price": 0.85,
    "image": "https://example.com/xrp.png",
    "change24h": -1.2
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "Cryptocurrency added successfully",
    "data": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j5",
      "name": "Ripple",
      "symbol": "XRP",
      "price": 0.85,
      "image": "https://example.com/xrp.png",
      "change24h": -1.2,
      "createdAt": "2023-09-01T15:00:00.000Z",
      "updatedAt": "2023-09-01T15:00:00.000Z"
    }
  }
  ```

## Error Responses

All endpoints return consistent error responses:

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Route not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Data Models

### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Crypto Model
```javascript
{
  name: String (required, max 50 chars),
  symbol: String (required, max 10 chars, uppercase),
  price: Number (required, min 0),
  image: String (required, valid URL),
  change24h: Number (optional, default 0),
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Environment Variables
Make sure to set these environment variables in production:
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing

### Recommended Deployment Services
- **Backend:** Render, Heroku, or Vercel
- **Database:** MongoDB Atlas for production

## Testing

You can test the API using:
- Postman
- curl commands
- Any HTTP client library

Example curl command for registration:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```
