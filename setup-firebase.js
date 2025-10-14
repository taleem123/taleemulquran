#!/usr/bin/env node

/**
 * Firebase Setup Script for Taleem Ul Quran
 * This script helps you set up Firebase configuration
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔥 Firebase Setup for Taleem Ul Quran\n');

const questions = [
  {
    key: 'apiKey',
    question: 'Enter your Firebase API Key: ',
    required: true
  },
  {
    key: 'authDomain',
    question: 'Enter your Auth Domain (e.g., your-project.firebaseapp.com): ',
    required: true
  },
  {
    key: 'projectId',
    question: 'Enter your Project ID: ',
    required: true
  },
  {
    key: 'storageBucket',
    question: 'Enter your Storage Bucket (e.g., your-project.appspot.com): ',
    required: true
  },
  {
    key: 'messagingSenderId',
    question: 'Enter your Messaging Sender ID: ',
    required: true
  },
  {
    key: 'appId',
    question: 'Enter your App ID: ',
    required: true
  },
  {
    key: 'measurementId',
    question: 'Enter your Measurement ID (optional): ',
    required: false
  }
];

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question.question, (answer) => {
      if (question.required && !answer.trim()) {
        console.log('❌ This field is required!');
        askQuestion(question).then(resolve);
      } else {
        resolve(answer.trim());
      }
    });
  });
}

async function main() {
  console.log('Please provide your Firebase configuration details:\n');
  console.log('You can find these in Firebase Console > Project Settings > Your apps > Web app\n');

  const config = {};

  for (const question of questions) {
    config[question.key] = await askQuestion(question);
  }

  // Create .env file
  const envContent = `# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=${config.apiKey}
REACT_APP_FIREBASE_AUTH_DOMAIN=${config.authDomain}
REACT_APP_FIREBASE_PROJECT_ID=${config.projectId}
REACT_APP_FIREBASE_STORAGE_BUCKET=${config.storageBucket}
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=${config.messagingSenderId}
REACT_APP_FIREBASE_APP_ID=${config.appId}
REACT_APP_FIREBASE_MEASUREMENT_ID=${config.measurementId}
`;

  try {
    fs.writeFileSync('.env', envContent);
    console.log('\n✅ .env file created successfully!');
  } catch (error) {
    console.log('\n❌ Error creating .env file:', error.message);
  }

  // Update firebase.js with direct config
  const firebaseConfig = `// Firebase configuration - Replace with your actual config from Firebase Console
// Get this from: Firebase Console > Project Settings > Your apps > Web app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "${config.apiKey}",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "${config.authDomain}",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "${config.projectId}",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "${config.storageBucket}",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "${config.messagingSenderId}",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "${config.appId}",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "${config.measurementId}" // Optional
};`;

  try {
    const firebasePath = path.join(__dirname, 'src', 'config', 'firebase.js');
    let firebaseContent = fs.readFileSync(firebasePath, 'utf8');
    
    // Replace the config section
    firebaseContent = firebaseContent.replace(
      /const firebaseConfig = \{[\s\S]*?\};/,
      firebaseConfig
    );
    
    fs.writeFileSync(firebasePath, firebaseContent);
    console.log('✅ Firebase configuration updated!');
  } catch (error) {
    console.log('❌ Error updating Firebase config:', error.message);
  }

  console.log('\n🎉 Setup completed! Next steps:');
  console.log('1. Create an admin user in Firebase Console > Authentication');
  console.log('2. Set up Firestore security rules (see firestore.rules file)');
  console.log('3. Run: npm start');
  console.log('4. Visit: http://localhost:3000/admin');
  console.log('5. Login with your admin credentials\n');

  rl.close();
}

main().catch(console.error);
