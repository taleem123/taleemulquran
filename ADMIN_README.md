# تعلیم القرآن - Admin Portal

A comprehensive admin portal for managing the Taleem Ul Quran website content with Firebase integration.

## Features

### 🎥 Content Management
- **Short Videos Management**: Add, edit, delete, and organize short Islamic videos
- **Lessons Management**: Manage longer educational lessons and tafseer content
- **Recent Videos**: Control which videos appear on the homepage
- **Selected Surahs**: Configure which surahs are featured on the homepage

### 🔧 Admin Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Changes reflect immediately on the website
- **User Authentication**: Secure admin login system
- **Dashboard**: Overview of content statistics and quick actions
- **Search & Filter**: Advanced filtering and search capabilities

### 🗄️ Database Integration
- **Firebase Firestore**: Scalable NoSQL database
- **Real-time Sync**: Automatic data synchronization
- **Offline Support**: Works offline with data sync when online
- **Data Validation**: Built-in data validation and error handling

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Firebase project (for production)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Firebase** (Optional - uses mock data by default)
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Copy your Firebase config to `src/config/firebase.js`

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Access Admin Portal**
   - Navigate to `http://localhost:3000/admin`
   - Use demo credentials:
     - Email: `admin@taleemulquran.pk`
     - Password: `admin123`

## Admin Portal Usage

### Dashboard
- View content statistics
- Quick access to all management features
- Recent activity feed
- System status overview

### Short Videos Management
1. **Add New Video**:
   - Click "Add Video" button
   - Fill in video details (title, URL, platform, category)
   - Set video as active/inactive
   - Save changes

2. **Edit Video**:
   - Click edit icon on any video
   - Modify video details
   - Update changes

3. **Delete Video**:
   - Click delete icon
   - Confirm deletion

### Lessons Management
Similar to short videos but for longer educational content:
- Add comprehensive lesson descriptions
- Set duration
- Categorize by topic (tafseer, ethics, prayer, etc.)

### Recent Videos Management
- Select videos to display on homepage
- Mix of short videos and lessons
- Drag and drop reordering
- Real-time preview

### Selected Surahs Management
- Choose up to 6 surahs for homepage
- Reorder surahs by priority
- Visual surah information display
- Meccan/Medinan classification

## Data Structure

### Short Videos
```javascript
{
  id: "string",
  title: "string",
  sources: ["string"], // Array of video URLs
  platform: "youtube|facebook|tiktok",
  description: "string",
  category: "tafseer|ethics|prayer|benefits|family",
  thumb: "string", // Thumbnail URL
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Lessons
```javascript
{
  id: "string",
  title: "string",
  sources: ["string"],
  platform: "youtube|facebook|tiktok",
  description: "string",
  category: "tafseer|ethics|prayer|benefits|family",
  duration: "string", // Format: MM:SS or HH:MM:SS
  thumb: "string",
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Recent Videos
```javascript
{
  id: "string",
  videoId: "string", // Reference to video ID
  type: "short|lesson",
  title: "string",
  platform: "string",
  sources: ["string"],
  thumb: "string",
  description: "string",
  createdAt: timestamp
}
```

### Selected Surahs
```javascript
{
  id: "string",
  number: number, // Surah number (1-114)
  name: "string", // Arabic name
  englishName: "string",
  englishNameTranslation: "string",
  numberOfAyahs: number,
  revelationType: "Meccan|Medinan",
  order: number, // Display order
  createdAt: timestamp
}
```

## API Integration

### Video Platforms Supported
- **YouTube**: Full support with thumbnails and embed
- **Facebook**: Basic support with external links
- **TikTok**: Basic support with external links

### URL Formats
- YouTube: `https://www.youtube.com/watch?v=VIDEO_ID` or `https://youtu.be/VIDEO_ID`
- Facebook: `https://www.facebook.com/watch/?v=VIDEO_ID`
- TikTok: `https://www.tiktok.com/@username/video/VIDEO_ID`

## Security Features

### Authentication
- Secure admin login system
- Session management
- Password protection
- Role-based access control

### Data Validation
- Input sanitization
- URL validation
- Required field checks
- Data type validation

### Error Handling
- Graceful error handling
- User-friendly error messages
- Fallback to default content
- Offline support

## Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Firebase Deployment
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
4. Deploy: `firebase deploy`

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Check Firebase configuration
   - Verify Firestore rules
   - Ensure internet connection

2. **Video Not Loading**
   - Verify video URL format
   - Check platform support
   - Test URL in browser

3. **Admin Login Issues**
   - Use correct credentials
   - Clear browser cache
   - Check console for errors

### Support
- Check browser console for error messages
- Verify Firebase project configuration
- Ensure all dependencies are installed
- Check network connectivity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This admin portal uses dummy Firebase credentials for demonstration. Replace with your actual Firebase configuration for production use.

