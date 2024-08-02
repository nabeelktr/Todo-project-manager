# Todo-project-manager

A real-time Todo-Project management system featuring a Trello-Style dashboard. Built with Next.js and RTK Query for the frontend, it provides real-time updates via Socket.io. The backend, using NestJS in a microservice architecture, integrates Redis for caching, RabbitMQ for messaging, and MongoDB for storage. Developed with Node.js, TypeScript, and JWT Passport for secure authentication.

!['Dashboard'](https://drive.google.com/uc?export=view&id=179M2NBAHWVIcZPe_zp62apq0BOoWAGCs)

## Features

- Frontend: Next.js with RTK Query for efficient data fetching and real-time updates via Socket.io.
- Backend: NestJS microservices architecture with RESTful APIs for task management.
- Caching: Redis to enhance performance.
- Messaging: RabbitMQ for handling asynchronous events.
- Authentication: JWT Passport for secure user access.

# Getting Started

## Prerequisites
- Docker
## Installation

```bash
git clone https://github.com/nabeelktr/Crework.git
cd Task-management-app
docker compose up
```

## Usage
- Access the application frontend at http://localhost:4000.

