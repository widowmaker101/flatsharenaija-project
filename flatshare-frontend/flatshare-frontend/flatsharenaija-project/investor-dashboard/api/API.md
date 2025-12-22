# FlatshareNaija API Documentation

This document describes the key backend endpoints.

## Auth
### POST /auth/login
Authenticate user with email + password.

**Request Body**
{
  "email": "user@example.com",
  "password": "secret"
}

**Response**
{
  "access_token": "jwt-token",
  "token_type": "bearer"
}

### POST /auth/register
Register a new user.

**Request Body**
{
  "email": "user@example.com",
  "password": "secret",
  "name": "John Doe"
}

**Response**
{
  "id": 1,
  "email": "user@example.com"
}

## Listings
### GET /listings
Fetch all property listings.

Query Params: city, budget

**Response**
[
  {
    "id": 1,
    "title": "2-bedroom flat in Lagos",
    "price": 50000,
    "city": "Lagos"
  }
]

### POST /listings
Create a new listing.

**Request Body**
{
  "title": "Self-contained in Abuja",
  "price": 30000,
  "city": "Abuja"
}

## Admin
### POST /admin/reset-password
Reset admin password.

**Request Body**
{
  "new_password": "supersecret"
}
