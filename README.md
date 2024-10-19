# Job Posting Board with Email Automation

This is a full-stack Job Posting Board application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. Companies can register, verify their accounts via OTP, post jobs, and send automated email notifications to candidates.

## Table of Contents
- [Job Posting Board with Email Automation](#job-posting-board-with-email-automation)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
    - [1. Set Up MongoDB](#1-set-up-mongodb)
    - [2. Set Environment Variables](#2-set-environment-variables)
    - [3. Run the Backend Server](#3-run-the-backend-server)
    - [4. Run the Frontend Application](#4-run-the-frontend-application)
  - [API Endpoints](#api-endpoints)
    - [1. Company Registration](#1-company-registration)
    - [2. Company Login](#2-company-login)
    - [3. Job Posting](#3-job-posting)
  - [Frontend Routes](#frontend-routes)
  - [Environment Variables](#environment-variables)
  - [Contributing](#contributing)
  - [License](#license)

## Technologies Used
- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer (for sending emails)
- **Authentication**: JWT

## Features
- Company registration with OTP verification
- Job posting with various details
- Email notifications to candidates
- Candidate management

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adgamerx/cuvetteAssignment
   cd cuvetteAssignment
   ```

2. **Install dependencies for the backend**
   ```bash
   cd Backend
   npm install
   ```

3. **Install dependencies for the frontend**
   ```bash
   cd Frontend
   npm install
   ```

## Running the Project

### 1. Set Up MongoDB
Make sure you have MongoDB installed and running locally, or you can use a cloud service like MongoDB Atlas. Create a new database for the project.

### 2. Set Environment Variables
Create a `.env` file in the `Backend` directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASS=your_email_app_password
JWT_SECRET=your_jwt_secret
```

- **MONGO_URI**: Your MongoDB connection string.
- **EMAIL_USER**: Your email address for sending notifications (use an email that allows less secure apps, or set up an app password).
- **EMAIL_APP_PASS**: Your email password or app password.
- **JWT_SECRET**: A secret key for signing JWT tokens.

### 3. Run the Backend Server
Navigate to the `Backend` folder and run:
```bash
npm start
```
This will start the backend server on `http://localhost:5000`.

### 4. Run the Frontend Application
Open a new terminal, navigate to the `Frontend` folder, and run:
```bash
npm start
```
This will start the React application on `http://localhost:3000`.

## API Endpoints
### 1. Company Registration
- **POST** `/api/companies/register`
- Request Body:
  ```json
  {
    "name": "Company Name",
    "email": "company@example.com",
    "password": "your_password",
    "mobile": "1234567890"
  }
  ```

### 2. Company Login
- **POST** `/api/companies/login`
- Request Body:
  ```json
  {
    "email": "company@example.com",
    "password": "your_password"
  }
  ```

### 3. Job Posting
- **POST** `/api/jobs`
- Request Body:
  ```json
  {
    "title": "Job Title",
    "description": "Job Description",
    "experienceLevel": "Experience Level",
    "endDate": "2024-11-01",
    "candidates": ["candidate1@example.com", "candidate2@example.com"]
  }
  ```

## Frontend Routes
- `/`: Home page (currently blank)
- `/register`: Company registration page
- `/login`: Company login page
- `/verify`: OTP verification page
- `/job`  : Job posting page
- `/job/create` : Job creation page (Broadcast mail to candidates)

## Environment Variables
Make sure to set up the environment variables as mentioned in the **Installation** section.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or bugs.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
