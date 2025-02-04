# Authorization and User CRUD Tests
## Introduction
This project is designed to test the authorization and user CRUD (Create, Read, Update, Delete) functionality of an API. The tests are written in JavaScript using the Mocha testing framework and the Supertest library for making HTTP requests.

## Features and Functionality
The project includes the following tests:
* Registration: Tests that a new user can be registered successfully.
* Login: Tests that a user can log in and obtain an access token.
* Create User: Tests that a new user can be created with a valid access token.
* Get User List: Tests that a list of users can be retrieved with a valid access token.
* Update User: Tests that a user can be updated with a valid access token.
* Delete User: Tests that a user can be deleted with a valid access token.
* Negative tests: Tests that the API returns the expected errors when attempting to create, read, update, or delete a user without a valid access token or with invalid data.

## Technology Stack
### Backend
* Node.js
* Mocha testing framework
* Supertest library

### Frontend
* None

### Other Tools
* Mochawesome-report-generator for generating test reports

## Prerequisites
* Node.js installed on the system
* Mocha and Supertest libraries installed using npm or yarn

## Installation
```bash
# Clone the repository
git clone https://github.com/bimapopo345/Bima-Prawang-Saputra_Tugas-4_Week-4_Sanbercode_Batch-49_QA-Automation-Intermediate-Karyawan.git
cd Bima-Prawang-Saputra_Tugas-4_Week-4_Sanbercode_Batch-49_QA-Automation-Intermediate-Karyawan

# Install dependencies
npm install
# or using pnpm
pnpm install
```

## Usage Guide
To run the tests, navigate to the project directory and execute the following command:
```bash
# Run the tests
npm test
# or using pnpm
pnpm test
```
This will execute the tests and generate a report in the `mochawesome-report` directory.

## API Documentation
The API endpoints used in this project are:
* `POST /registration`: Register a new user
* `POST /authentications`: Log in and obtain an access token
* `POST /users`: Create a new user
* `GET /users`: Get a list of users
* `PUT /users/:id`: Update a user
* `DELETE /users/:id`: Delete a user

## Deployment Instructions
To deploy this project, simply clone the repository and install the dependencies. The tests can be run using the `npm test` command.

## Contributing Guidelines
To contribute to this project, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT license.

## Contact/Support Information
For any questions or issues, please contact the project maintainer at [bimapopo345](https://github.com/bimapopo345).
