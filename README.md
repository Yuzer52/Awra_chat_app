AwraChat
AwraChat is a modern real-time chat application built with React and Firebase. It enables users to send messages, share photos, and manage privacy settings in a secure and efficient manner.

Features
Real-time Messaging: Instantly send and receive messages.
Photo Sharing: Upload and share images with others in the chat.
User Authentication: Secure login and logout using Firebase Authentication.
Block/Unblock Users: Block or unblock users for privacy management.
Shared Media Viewing: View shared photos in the chat history.
Table of Contents
Technologies
Setup
Usage
File Structure
Firebase Configuration
Contributing
License
Technologies
AwraChat is built using the following technologies:

React.js: Front-end framework for building user interfaces.
Firebase Authentication: Handles user sign-in and sign-out securely.
Firebase Firestore: NoSQL database for storing chat messages and user data.
Firebase Storage: For storing and retrieving shared images.
CSS: Styling the user interface.
Setup
To run this project locally, follow these steps:

1. Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/AwraChat.git
2. Navigate to the project directory:
bash
Copy code
cd AwraChat
3. Install the dependencies:
bash
Copy code
npm install
4. Set up Firebase:
Go to the Firebase Console.
Create a new Firebase project.
Enable Firestore, Authentication, and Storage.
5. Add Firebase Configuration:
In the project root, create a .env file with your Firebase configuration:
makefile
Copy code
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
6. Run the project:
bash
Copy code
npm start
The app should now be running on http://localhost:3000.

Usage
Once the application is set up:

Sign Up or Log In: Users can sign up with an email address or log in if they already have an account.
Start a Chat: Select a user to start a conversation.
Send Messages: Type and send messages in real-time.
Share Photos: Click on the photo icon to upload and share images.
Block Users: Block or unblock users to control who can send messages.
View Shared Photos: Navigate to the "Shared Photos" section to view all photos exchanged in the chat.
File Structure
graphql
Copy code
awrachat/
│
├── public/                   # Public assets (HTML, icons, etc.)
├── src/                      # Source code
│   ├── components/           # Reusable React components
│   ├── lib/                  # Firebase and utility functions
│   ├── pages/                # Application pages (chat, login, etc.)
│   ├── styles/               # CSS files for styling
│   ├── App.js                # Main application component
│   └── index.js              # Entry point of the application
└── README.md                 # Project readme file
Firebase Configuration
Ensure the following Firebase services are enabled:

Firestore: For storing chat messages, user profiles, and media links.
Authentication: To manage user sign-ups and logins.
Storage: For uploading and fetching shared images.
In firebase.js, initialize Firebase like this:

javascript
Copy code
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
Contributing
If you’d like to contribute to AwraChat, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for more details.
