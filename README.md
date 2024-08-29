# Secure Flight Search and Booking System

## Overview

This project is a basic flight search and booking system designed to showcase the development of secure travel applications. The system includes both frontend and backend components, focusing on secure user authentication, data transmission, and compliance with GDPR/PDPA principles.

## Features

### Frontend
- **Search Form:** Users can input origin, destination, and travel dates.
- **Search Results:** Displays flight options based on user input.
- **Booking Form:** Captures passenger details and payment information securely.

### Backend
- **RESTful APIs:** Handles flight search requests and bookings.
- **Mock Data:** Uses mock flight data for search results.
- **Secure Storage:** Stores booking information securely in MongoDB.

## Architecture

The system is built using the following technologies:
- **Frontend:** React application using Auth0 for authentication.
- **Backend:** Node.js (NestJS) application with MongoDB as the database and Redis for caching.
- **Docker:** Containerized services for easy deployment and scaling.

## Project Structure

```plaintext
- flight-book-api/        # Backend API service
  - src/
  - Dockerfile
  - .env
- flight-book-app/        # Frontend React application
  - src/
  - Dockerfile
  - .env
- docker-compose.yml      # Docker Compose configuration
- README.md               # Project documentation
```
