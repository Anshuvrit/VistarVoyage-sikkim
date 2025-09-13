# Sikkim Sanctuary - Backend Integration Contracts

## Overview
This document outlines the API contracts, data structures, and backend integration points for the Sikkim Sanctuary application. The frontend is currently using mock data that needs to be replaced with actual backend endpoints.

## Authentication Endpoints

### POST /api/auth/register
**Purpose**: User registration
**Location**: `src/contexts/AuthContext.js` - `register()` function
**Request Body**:
```json
{
  "name": "string",
  "email": "string", 
  "password": "string"
}
```
**Response**:
```json
{
  "success": boolean,
  "user": {
    "id": "string",
    "name": "string", 
    "email": "string",
    "verified": boolean
  },
  "token": "string"
}
```

### POST /api/auth/login
**Purpose**: User authentication
**Location**: `src/contexts/AuthContext.js` - `login()` function
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**: Same as register

### POST /api/auth/logout
**Purpose**: User logout
**Location**: `src/contexts/AuthContext.js` - `logout()` function

### GET /api/auth/me
**Purpose**: Get current user profile
**Headers**: `Authorization: Bearer {token}`

## Monasteries API

### GET /api/monasteries
**Purpose**: Get all monasteries with filtering
**Location**: Replace mock data in `src/data/mockData.js` - `monasteries` array
**Query Parameters**:
- `sect`: Filter by Buddhist sect (Kagyu, Nyingma, etc.)
- `district`: Filter by district (East Sikkim, West Sikkim, etc.)
- `search`: Search by name or description

**Response**:
```json
{
  "monasteries": [
    {
      "id": "string",
      "name": "string",
      "tibetanName": "string", 
      "sect": "string",
      "founded": number,
      "location": "string",
      "altitude": "string",
      "distance": "string",
      "monks": number,
      "hours": "string",
      "description": "string",
      "image": "string",
      "features": ["string"],
      "audioGuides": ["string"],
      "virtualTour": boolean,
      "coordinates": [number, number]
    }
  ]
}
```

### GET /api/monasteries/:id
**Purpose**: Get single monastery details
**Location**: Used in `src/pages/MonasteryDetail.js`

## Festivals API

### GET /api/festivals
**Purpose**: Get all festivals
**Location**: Replace mock data in `src/data/mockData.js` - `festivals` array
**Query Parameters**:
- `category`: Filter by festival category
- `upcoming`: Get only upcoming festivals

**Response**:
```json
{
  "festivals": [
    {
      "id": "string",
      "name": "string",
      "tibetanName": "string",
      "category": "string", 
      "duration": "string",
      "date": "string",
      "monasteries": number,
      "cost": "string",
      "description": "string",
      "image": "string",
      "upcoming": boolean
    }
  ]
}
```

### GET /api/festivals/:id
**Purpose**: Get single festival details
**Location**: Used in `src/pages/FestivalDetail.js`

## Community Stories API

### GET /api/community/stories
**Purpose**: Get community stories
**Location**: Replace mock data in `src/data/mockData.js` - `communityStories` array
**Query Parameters**:
- `category`: Filter by story category
- `monastery`: Filter by monastery
- `verified`: Filter verified stories

**Response**:
```json
{
  "stories": [
    {
      "id": number,
      "title": "string",
      "category": "string",
      "monastery": "string", 
      "author": "string",
      "date": "string",
      "verified": boolean,
      "local": boolean,
      "likes": number,
      "comments": number,
      "content": "string",
      "image": "string"
    }
  ]
}
```

### POST /api/community/stories
**Purpose**: Create new community story
**Location**: `src/pages/Community.js` - Share Story dialog
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "title": "string",
  "category": "string",
  "monastery": "string",
  "content": "string"
}
```

### POST /api/community/stories/:id/like
**Purpose**: Like a story
**Location**: `src/pages/Community.js` - `handleLike()` function
**Headers**: `Authorization: Bearer {token}`

## Manuscripts API

### GET /api/manuscripts
**Purpose**: Get manuscripts collection
**Location**: `src/pages/Manuscripts.js` - manuscripts array
**Query Parameters**:
- `category`: Filter by manuscript category
- `language`: Filter by language
- `search`: Search manuscripts
- `digitalized`: Filter digitalized manuscripts

**Response**:
```json
{
  "manuscripts": [
    {
      "id": number,
      "title": "string",
      "tibetanTitle": "string",
      "category": "string",
      "language": "string", 
      "monastery": "string",
      "century": "string",
      "pages": number,
      "description": "string",
      "image": "string",
      "digitalized": boolean,
      "sacred": boolean,
      "likes": number,
      "views": number
    }
  ]
}
```

## Virtual Tours API

### GET /api/virtual-tours
**Purpose**: Get available virtual tours
**Location**: `src/pages/VirtualTours.js`

### GET /api/virtual-tours/:id/spots
**Purpose**: Get tour spots for a monastery
**Location**: Used in virtual tour navigation

## Statistics API

### GET /api/stats
**Purpose**: Get application statistics
**Location**: Replace mock data in `src/data/mockData.js` - `stats` array
**Response**:
```json
{
  "stats": [
    {
      "number": "string",
      "label": "string", 
      "icon": "string"
    }
  ]
}
```

## File Upload API

### POST /api/upload/image
**Purpose**: Upload images for stories/profiles
**Content-Type**: `multipart/form-data`
**Response**:
```json
{
  "url": "string",
  "filename": "string"
}
```

## Search API

### GET /api/search
**Purpose**: Global search across monasteries, festivals, stories
**Location**: `src/components/Navbar.js` - search functionality
**Query Parameters**:
- `q`: Search query
- `type`: Search type (monasteries, festivals, stories, all)

## Protected Routes
Routes that require authentication (add middleware):
- POST /api/community/stories
- POST /api/community/stories/:id/like
- GET /api/auth/me
- POST /api/upload/image

## Database Schema Requirements

### Users Table
- id (primary key)
- name
- email (unique)
- password (hashed)
- verified (boolean)
- created_at
- updated_at

### Monasteries Table
- id (primary key)
- name
- tibetan_name
- sect
- founded (year)
- location
- altitude
- distance_from_gangtok
- monks_count
- operating_hours
- description (text)
- image_url
- features (JSON array)
- audio_guides (JSON array)
- virtual_tour_available (boolean)
- coordinates (lat, lng)
- created_at
- updated_at

### Festivals Table
- id (primary key)  
- name
- tibetan_name
- category
- duration
- date
- monasteries_count
- cost_info
- description (text)
- image_url
- upcoming (boolean)
- created_at
- updated_at

### Community Stories Table
- id (primary key)
- title
- category
- monastery_name
- author_name
- user_id (foreign key, nullable)
- date
- verified (boolean)
- local (boolean)
- likes_count
- comments_count
- content (text)
- image_url
- created_at
- updated_at

### Manuscripts Table
- id (primary key)
- title
- tibetan_title
- category
- language
- monastery_name
- century
- pages_count
- description (text)
- image_url
- digitalized (boolean)
- sacred (boolean)
- likes_count
- views_count
- created_at
- updated_at

## Environment Variables Needed
```
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=24h
UPLOAD_PATH=/uploads
MAX_FILE_SIZE=5mb
MONGODB_URI=mongodb://localhost:27017/sikkim_sanctuary
```

## Integration Steps
1. Create MongoDB collections based on schema above
2. Implement authentication middleware using JWT
3. Create API endpoints following the contracts above
4. Replace mock data imports with API calls in frontend components
5. Add error handling and loading states
6. Implement file upload functionality
7. Add input validation and sanitization
8. Test all endpoints and frontend integration

## Current Mock Data Files to Replace
- `/src/data/mockData.js` - Contains all mock data arrays
- `/src/contexts/AuthContext.js` - Mock authentication functions
- Various page components have TODO comments marking integration points

## Notes
- All dates should be in ISO format
- Images should be served from a CDN or static file server
- Implement proper error handling for API failures
- Add loading states for better UX
- Consider implementing caching for frequently accessed data
- Add API rate limiting and request validation