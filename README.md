# Getting Started

## About

Ashera Notes lightweight app that can manage your tasks and notes, yep That's it! <br/>

- **https://mmv-ashera.vercel.app/**
- **[Github Repository](https://github.com/mmvergara/mmv-ashera)**
- **Deployment Date: November 6, 2022**

### Technologies

- **[React](https://reactjs.org/)**
- **[Firebase](https://firebase.google.com/)**
- **[Chakra UI](https://chakra-ui.com/)**

### [Documentation Link 📃](https://mmv-docs.vercel.app/docs/ashera/getting-started)

## Installation

### Setup Firebase

#### Firebase

Ashera is using Firebase as a backend more specifically 'Firestore' for realtime updates

##### Frontend Setup

```jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, arrayUnion, arrayRemove, collection, doc } from "firebase/firestore";
import { getFirestore, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

//Firebase App Initialize
export const appFB = initializeApp(firebaseConfig);

//Services
export const firestoreDB = getFirestore();
export const authFB = getAuth();

//References
export const taskSectionRef = collection(firestoreDB, "TaskSections");
export const notesRef = collection(firestoreDB, "Notes");
```

##### Cloud Firestore Security rules

- We allow read,update,delete if the user is authenticated and is the owner
- We allow create if the user is authenticated

```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {

        match /TaskSections/{TaskSectionName} {
          allow read,update,delete: if request.auth != null && request.auth.uid == resource.data.author;
          allow create: if request.auth != null;
        }

        match /Notes/{TaskSectionName} {
          allow read,update,delete: if request.auth != null && request.auth.uid == resource.data.noteAuthor;
          allow create: if request.auth != null;
        }

    }
  }
```


### Environment Variables and Dependencies

- Change Config at ./src/Config.tsx
- npm install & npm start

- Fill out .env file

```jsx
MONGODB_URI=
SECRET_KEY_EXP=
HOST=
PORT=
```

- `npm install`
- `npm run dev / npm start`

