// Video URL testing utility
export const testVideoUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return {
      accessible: response.ok,
      status: response.status,
      contentType: response.headers.get('content-type')
    };
  } catch (error) {
    return {
      accessible: false,
      error: error.message
    };
  }
};

// Test all video URLs
export const testAllVideoUrls = async (videos) => {
  const results = [];
  
  for (const video of videos) {
    if (video.sources && video.sources[0]) {
      const testResult = await testVideoUrl(video.sources[0]);
      results.push({
        video: video.title,
        url: video.sources[0],
        ...testResult
      });
    }
  }
  
  return results;
};

// Log video test results
export const logVideoTestResults = (results) => {
  console.group('Video URL Test Results');
  results.forEach(result => {
    console.log(`${result.video}: ${result.accessible ? '✅' : '❌'} ${result.url}`);
    if (!result.accessible) {
      console.error(`Error: ${result.error || `Status: ${result.status}`}`);
    }
  });
  console.groupEnd();
};
