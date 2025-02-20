# Mutual Fund Broker Frontend

This repository contains the frontend application for the Mutual Fund Broker system. Below are detailed instructions for setting up and running the project locally.

## Prerequisites

Before getting started, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- [Git](https://git-scm.com/)

## Setup Instructions

### 1. Clone the Repository

Clone the repository using SSH:

```bash
git clone git@github.com:Lavin-kulal/mutual-fund-broker-fe.git
cd mutual-fund-broker-fe
```

### 2. Install Dependencies

Install all required Node.js dependencies:

```bash
npm install
```

This might take a few minutes depending on your internet connection and system performance.

### 3. Run the Application

Start the development server:

```bash
npm start
```

This will automatically open [http://localhost:3000](http://localhost:3000) in your default browser. The page will reload if you make edits to the source code.

## Project Structure

```
mutual-fund-broker-fe/
├── public/             # Public assets and HTML template
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── context/        # React context providers
│   ├── services/       # API services and utility functions
│   ├── styles/         # CSS and styling files
│   ├── App.js          # Main application component
│   └── index.js        # Application entry point
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder, optimized for best performance

### `npm run lint`
Runs ESLint to check for code quality issues

## Troubleshooting

### Common Issues

1. **Node version incompatibility**
   - Ensure you're using Node.js v16.0.0 or higher
   - Use nvm (Node Version Manager) to switch between Node versions if needed

2. **Port 3000 already in use**
   - If port 3000 is already in use, the CLI will ask if you want to use a different port

3. **Module not found errors**
   - Try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again

## Contributing

Please refer to our contribution guidelines before submitting pull requests to the project.

## Contact

For any questions or support, please contact the repository maintainer at [lavin.kulal@example.com](mailto:lavin.kulal@example.com).
