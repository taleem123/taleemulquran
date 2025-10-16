const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin
admin.initializeApp();

// Download video using yt-dlp
exports.downloadVideo = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { videoUrl, platform, title } = data;
  
  if (!videoUrl) {
    throw new functions.https.HttpsError('invalid-argument', 'Video URL is required');
  }

  try {
    // Create temporary file path
    const tempDir = '/tmp';
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const outputPath = path.join(tempDir, `${fileName}.%(ext)s`);
    
    // Build yt-dlp command
    let command;
    switch (platform) {
      case 'youtube':
        command = `yt-dlp -f "best[height<=720]" -o "${outputPath}" "${videoUrl}"`;
        break;
      case 'facebook':
        command = `yt-dlp -f "best[height<=720]" -o "${outputPath}" "${videoUrl}"`;
        break;
      case 'tiktok':
        command = `yt-dlp -f "best" -o "${outputPath}" "${videoUrl}"`;
        break;
      default:
        command = `yt-dlp -f "best" -o "${outputPath}" "${videoUrl}"`;
    }

    console.log('Executing command:', command);

    // Execute yt-dlp command
    const result = await new Promise((resolve, reject) => {
      exec(command, { timeout: 300000 }, (error, stdout, stderr) => {
        if (error) {
          console.error('yt-dlp error:', error);
          console.error('stderr:', stderr);
          reject(new Error(`Download failed: ${error.message}`));
          return;
        }
        
        console.log('yt-dlp stdout:', stdout);
        resolve(stdout);
      });
    });

    // Find the downloaded file
    const files = fs.readdirSync(tempDir);
    const downloadedFile = files.find(file => file.startsWith(fileName));
    
    if (!downloadedFile) {
      throw new Error('Downloaded file not found');
    }

    const filePath = path.join(tempDir, downloadedFile);
    const fileStats = fs.statSync(filePath);
    
    console.log(`File downloaded: ${downloadedFile}, size: ${fileStats.size} bytes`);

    // Upload to Firebase Storage
    const bucket = admin.storage().bucket();
    const storageFileName = `downloads/${context.auth.uid}/${Date.now()}_${downloadedFile}`;
    
    await bucket.upload(filePath, {
      destination: storageFileName,
      metadata: {
        contentType: 'video/mp4',
        metadata: {
          originalUrl: videoUrl,
          platform: platform,
          title: title || 'Downloaded Video',
          userId: context.auth.uid
        }
      }
    });

    // Generate signed URL for download (valid for 1 hour)
    const file = bucket.file(storageFileName);
    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000 // 1 hour
    });

    // Clean up temporary file
    fs.unlinkSync(filePath);

    return {
      success: true,
      downloadUrl: signedUrl,
      fileName: downloadedFile,
      size: fileStats.size
    };

  } catch (error) {
    console.error('Download error:', error);
    throw new functions.https.HttpsError('internal', `Download failed: ${error.message}`);
  }
});

// Get download status
exports.getDownloadStatus = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { downloadId } = data;
  
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(`downloads/${context.auth.uid}/${downloadId}`);
    
    const [exists] = await file.exists();
    
    if (exists) {
      const [metadata] = await file.getMetadata();
      return {
        exists: true,
        size: metadata.size,
        created: metadata.timeCreated
      };
    } else {
      return { exists: false };
    }
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
