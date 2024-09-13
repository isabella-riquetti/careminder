# CareMinder
<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="node" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="supabase" />
</p>

## Overview
This project is a full-stack application structured as a monorepo, consisting of two main workspaces:

- **Client**: A frontend application built with React, Vite, Tailwind, DaisyUI, Clerk, React Testing Library, Vitest, and Playwright.
- **Server**: A backend application (Technology TBD).

## Project Structure

```
root
├── packages/
│   ├── client/        # Frontend application
│   └── server/        # Backend application (TBD)
├── node_modules/      # Shared dependencies
├── package.json       # Root package.json with workspaces configuration
└── README.md          # Project documentation
```

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version 16 or higher)
- **npm**

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/isabella-riquetti/careminder.git
cd careminder
```

### 2. Install Dependencies

Install the dependencies for both the client and server workspaces:

```bash
npm install
```

### 3. Running the Applications

#### Client (Frontend)

To start the frontend application:

```bash
npm run dev -w client
```

The client should now be running at `http://localhost:5173`.

#### Server (Backend)

The backend setup and start commands are to be determined (TBD). Once defined, you can run the backend using a similar command:

```bash
npm run dev -w server
```

The server should now be running at `http://localhost:3000`.

## Testing

### Frontend Tests

To run the tests for the frontend application:

```bash
npm run test:unit -w client
```

You can also run Playwright tests with:

```bash
npm run test:e2e -w client
```

### Backend Tests

Testing commands for the backend you just need to run.

```bash
npm run test -w server
```
