# Reverie Facade

Reverie Facade is a comprehensive mobile application designed to assist individuals struggling with maladaptive daydreaming. The app provides tools to log and analyze daydreams, manage patterns, and access resources to mitigate this behavior. Built using **React Native**, it ensures a seamless cross-platform experience, with secure backend functionality handled through **Node.js** and **MongoDB**.

## Features

- **Dream Database**: Users can log their daydreams and track frequency and intensity.
- **AI-Powered Dream Analyzer**: Analyze daydream patterns using AI algorithms and generate insights.
- **Daydream Log**: Keep a detailed log of daydreams and associated triggers or feelings.
- **Statistics Dashboard**: View visual statistics showing progress and trends over time.
- **Reminders and Notifications**: Set reminders to help mitigate the frequency of maladaptive daydreaming episodes.

## Technologies Used

- **Front-End**: React Native
- **Back-End**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token) with bcrypt.js encryption
- **Cloud Hosting**: Deployed using platforms like Heroku, AWS, or Google Cloud (optional to mention if hosted)

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: [Download Node.js](https://nodejs.org/en/download/)
- **MongoDB**: [Install MongoDB](https://docs.mongodb.com/manual/installation/)
- **Git**: [Install Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/uzair-obaid/Reverie-Facade.git
   cd Reverie-Facade
   ```

2. Install dependencies for both the front-end and back-end:
   ```bash
   # Install dependencies for the server
   cd server
   npm install

   # Install dependencies for the client
   cd ../client
   npm install
   ```

3. Create a `.env` file in the **server** folder for environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the server:
   ```bash
   cd server
   npm start
   ```

5. Run the React Native app (you can use a simulator or connect your mobile device):
   ```bash
   cd ../client
   npm start
   ```

## Usage

1. Register a new account or log in with existing credentials.
2. Log your daydreams through the intuitive interface.
3. View your daydream history and monitor progress through charts and insights.
4. Set daily or weekly reminders to reduce maladaptive daydreaming habits.

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch with your feature or bug fix.
3. Push your branch and create a pull request.


