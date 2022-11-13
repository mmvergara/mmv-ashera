# Ashera - Tasks and notes

https://mmv-ashera.vercel.app/

---

# Installation

## Setup Firebase

- Go to ./src/Config
- Change `firebaseInitializeConfig` to your own Firebase DB

### Cloud Firestore Rules

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

### Install

```
npm install
npm start
```
