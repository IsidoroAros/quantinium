# Quantinium Web3 Interface

A modern, responsive Web3 interface for interacting with the Quantinium blockchain platform. Built with React, TypeScript, and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) version 18.18.0
- [Yarn](https://yarnpkg.com/) package manager
- [MetaMask](https://metamask.io/) or any Web3 wallet

## Node.js Setup with NVM

1. Install NVM (Node Version Manager):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. Set up Node.js 18.18.0:
   ```bash
   nvm install 18.18.0
   nvm use 18.18.0
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quantinium-web3
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

## Development

Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

Build the application:
```bash
yarn build
```

Preview the production build:
```bash
yarn preview
```

## Features

- Web3 wallet integration
- Transaction signing and sending
- Network switching support
- Responsive design with mobile support
- Real-time blockchain interaction

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- ethers.js
- Vite
- shadcn/ui

## Credits

This project was developed as part of the Isidoros Challenge for Quantinium, demonstrating secure and efficient blockchain interactions through a modern web interface.
