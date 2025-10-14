# 🔥 Firebase Setup Guide for Taleem Ul Quran

This guide will help you set up a real Firebase account and configure it for your website.

## 📋 Prerequisites

- Google account
- Access to Firebase Console
- Your website code ready

## 🚀 Step-by-Step Setup

### 1. Create Firebase Project

1. **Go to Firebase Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Click "Create a project"**
3. **Enter project details**:
   - Project name: `taleem-ul-quran`
   - Project ID: `taleem-ul-quran-xxxxx` (auto-generated)
   - Region: Choose closest to your users
4. **Enable Google Analytics** (recommended)
5. **Click "Create project"**

### 2. Enable Required Services

#### A. Firestore Database
1. Go to **"Firestore Database"** in sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select location (same as project region)
5. Click **"Done"**

#### B. Authentication
1. Go to **"Authentication"** in sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"** provider
5. Click **"Save"**

### 3. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click **"Add app"** → **"Web"** (</> icon)
4. **Register app**:
   - App nickname: `taleem-ul-quran-web`
   - Check "Also set up Firebase Hosting" (optional)
5. **Copy the configuration object**

### 4. Update Your Code

Replace the configuration in `src/config/firebase.js` with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef...",
  measurementId: "G-XXXXXXXXXX" // Optional
};
```

### 5. Set Up Security Rules

Go to **Firestore Database** → **Rules** and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all collections for public site
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write access only to authenticated admin users
    match /shortVideos/{document} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /lessons/{document} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /recentVideos/{document} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /selectedSurahs/{document} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 6. Create Admin User

1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Enter admin credentials:
   - Email: `admin@taleemulquran.pk`
   - Password: `admin123` (or your preferred password)
4. Click **"Add user"**

### 7. Set Up Custom Claims (Optional)

For production, you can set up custom claims to identify admin users:

1. Go to **Functions** in Firebase Console
2. Create a function to set admin claims
3. Or manually set claims in Firebase Admin SDK

## 🔧 Testing Your Setup

1. **Start your development server**: `npm start`
2. **Visit admin portal**: `http://localhost:3000/admin`
3. **Login with admin credentials**
4. **Test CRUD operations**:
   - Add a short video
   - Add a lesson
   - Update recent videos
   - Modify selected surahs

## 📱 Public Site Integration

The public site will automatically:
- ✅ Fetch data from Firebase
- ✅ Display real-time updates
- ✅ Show loading states
- ✅ Handle errors gracefully

## 🚨 Important Security Notes

1. **Never commit real Firebase config** to public repositories
2. **Use environment variables** for production
3. **Set up proper security rules**
4. **Enable authentication** for admin access
5. **Regularly backup your data**

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase: No Firebase App '[DEFAULT]' has been created"**
   - Check your Firebase config is correct
   - Ensure you're importing the config properly

2. **"Permission denied" errors**
   - Check Firestore security rules
   - Verify authentication is working

3. **"Network request failed"**
   - Check your internet connection
   - Verify Firebase project is active

4. **Admin login not working**
   - Check if user exists in Authentication
   - Verify email/password are correct

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Check browser console for JavaScript errors
3. Verify all configuration steps were completed
4. Test with a simple Firebase connection first

---

**Next Steps**: Once Firebase is configured, your admin portal will have full CRUD capabilities and the public site will display real-time data!
