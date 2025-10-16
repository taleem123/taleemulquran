import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Close,
  Download,
  OpenInNew,
  VideoLibrary,
  Extension,
  Computer
} from '@mui/icons-material';

const DownloadModal = ({ open, onClose, video, platform, videoId, videoUrl }) => {
  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'youtube': return '#FF0000';
      case 'facebook': return '#1877F2';
      case 'tiktok': return '#000000';
      default: return '#666666';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'youtube': return '📺';
      case 'facebook': return '📘';
      case 'tiktok': return '🎵';
      default: return '🎥';
    }
  };

  const getDownloadMethods = (platform) => {
    const methods = {
      youtube: [
        {
          title: "Online Downloaders",
          description: "Use web-based YouTube downloaders",
          steps: [
            "Go to yt-dlp.org or savefrom.net",
            "Paste the video URL",
            "Select quality and download"
          ],
          icon: <OpenInNew />
        },
        {
          title: "Browser Extensions",
          description: "Install video downloader extensions",
          steps: [
            "Install 'Video DownloadHelper' or '4K Video Downloader'",
            "Play the video",
            "Click the extension icon to download"
          ],
          icon: <Extension />
        },
        {
          title: "Desktop Software",
          description: "Use dedicated video downloader apps",
          steps: [
            "Download 4K Video Downloader or yt-dlp",
            "Paste the video URL",
            "Choose quality and download location"
          ],
          icon: <Computer />
        }
      ],
      facebook: [
        {
          title: "Online Tools",
          description: "Use Facebook video downloaders",
          steps: [
            "Go to fbdown.net or getfvid.com",
            "Paste the Facebook video URL",
            "Download in your preferred quality"
          ],
          icon: <OpenInNew />
        },
        {
          title: "Browser Extensions",
          description: "Use video downloader extensions",
          steps: [
            "Install 'Video DownloadHelper'",
            "Right-click on the video",
            "Select 'Download video'"
          ],
          icon: <Extension />
        }
      ],
      tiktok: [
        {
          title: "Built-in Download",
          description: "Use TikTok's own download feature",
          steps: [
            "Open the video in TikTok app",
            "Tap the share button",
            "Select 'Save video'"
          ],
          icon: <Download />
        },
        {
          title: "Online Downloaders",
          description: "Use TikTok video downloaders",
          steps: [
            "Go to tiktokdownloader.com",
            "Paste the video URL",
            "Download without watermark"
          ],
          icon: <OpenInNew />
        }
      ]
    };

    return methods[platform] || [
      {
        title: "Direct Download",
        description: "Try right-clicking on the video",
        steps: [
          "Right-click on the video",
          "Select 'Save video as...'",
          "Choose download location"
        ],
        icon: <Download />
      }
    ];
  };

  const methods = getDownloadMethods(platform);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VideoLibrary sx={{ color: getPlatformColor(platform) }} />
          <Typography variant="h6">
            Download Video
          </Typography>
          <Chip 
            label={platform.toUpperCase()} 
            size="small"
            sx={{ 
              backgroundColor: getPlatformColor(platform),
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {video?.title || 'Video Download'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {getPlatformIcon(platform)} This is a {platform} video. Due to platform restrictions, 
            direct download is not possible. Here are several methods to download it:
          </Typography>
        </Box>

        <List>
          {methods.map((method, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ px: 0, py: 2 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {method.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {method.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {method.description}
                      </Typography>
                      <Box component="ol" sx={{ pl: 2, m: 0 }}>
                        {method.steps.map((step, stepIndex) => (
                          <Typography 
                            key={stepIndex} 
                            component="li" 
                            variant="body2"
                            sx={{ mb: 0.5 }}
                          >
                            {step}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < methods.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Video URL:</strong> {videoUrl}
          </Typography>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Button 
          onClick={() => window.open(videoUrl, '_blank')}
          variant="contained"
          startIcon={<OpenInNew />}
          sx={{ 
            backgroundColor: getPlatformColor(platform),
            '&:hover': {
              backgroundColor: getPlatformColor(platform),
              opacity: 0.9
            }
          }}
        >
          Open in {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadModal;
