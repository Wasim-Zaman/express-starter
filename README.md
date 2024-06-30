# Express Basic Starter

[![npm version](https://badge.fury.io/js/express-basic-starter.svg)](https://badge.fury.io/js/express-basic-starter)

Express Basic Starter is a command-line interface (CLI) tool that simplifies the process of setting up a basic Express.js project with a structured folder layout, essential packages, and Swagger documentation.

## Features

- **Quick Setup**: Initialize a new Express project with one command.
- **MVC Folder Structure**: Organized folders for controllers, models, and routes.
- **Basic Packages**: Includes essential npm packages pre-configured.
- **Swagger Documentation**: Integrated Swagger documentation for APIs.
- **Customizable**: Easily extend or modify the generated project structure.

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

## Project Folder Structure

```bash
my-express-app
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
├── controllers
│ └── swagger.js
├── controllers
│ └── sampleController.js
└── docs
├── models
│ └── sampleModel.js
├── routes
│ └── sampleRoute.js
├── utils
│ └── response.js
```
