# Express Basic Starter v2.0.0

[![npm version](https://badge.fury.io/js/express-basic-starter.svg)](https://badge.fury.io/js/express-basic-starter)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A lightweight, professional-grade CLI tool for scaffolding Express.js applications with a well-structured layout, essential packages, and built-in Swagger documentation. Supports both ES Modules and CommonJS.

## Key Features

- 🚀 **Zero Configuration**: Get started with a single command
- 📁 **MVC Architecture**: Pre-configured Model-View-Controller structure
- 📚 **API Documentation**: Built-in Swagger/OpenAPI documentation
- 🔒 **Security**: JWT authentication utility included
- ✨ **Modern JavaScript**: Support for both ES Modules and CommonJS
- 🛠️ **Error Handling**: Robust error handling system
- 📝 **Request Validation**: Express-validator integration
- 🔄 **Hot Reload**: Development server with nodemon

## Installation

Install the CLI tool globally to use it from anywhere:

```bash
npm install -g express-basic-starter

express-basic-starter <project-name>
```

Alternatively, you can use npx to run the tool without installing it globally:

```bash
npx express-basic-starter <project-name>
```

## Usage with ES Modules

To create a project using ES module syntax, use the --es flag:

```bash
npx express-basic-starter <project-name> --es
```

## Project Folder Structure

```
my-express-app
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
├── controllers
│ └── sampleController.js
├── docs
│ └── swagger
│       └── testDocs.js
├── models
│ └── sampleModel.js
├── routes
│ └── sampleRoute.js
├── utils
│ └── error.js
│ └── jwt.js
│ └── response.js
└── uploads
```
