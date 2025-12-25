// Video URL processing utilities for multiple hosting platforms

export interface ProcessedVideoUrl {
  embedUrl: string;
  platform: 'youtube' | 'vimeo' | 'googledrive' | 'gumlet' | 'direct' | 'unknown';
  canEmbed: boolean;
  originalUrl: string;
}

/**
 * Process video URLs from various platforms and convert them to embeddable formats
 */
export function processVideoUrl(url: string): ProcessedVideoUrl {
  if (!url) {
    return {
      embedUrl: '',
      platform: 'unknown',
      canEmbed: false,
      originalUrl: url
    };
  }

  const normalizedUrl = url.trim();

  // YouTube processing
  if (normalizedUrl.includes('youtu.be/') || normalizedUrl.includes('youtube.com')) {
    let videoId = '';

    if (normalizedUrl.includes('youtu.be/')) {
      videoId = normalizedUrl.split('youtu.be/')[1]?.split('?')[0];
    } else if (normalizedUrl.includes('youtube.com/watch?v=')) {
      videoId = normalizedUrl.split('v=')[1]?.split('&')[0];
    } else if (normalizedUrl.includes('youtube.com/embed/')) {
      videoId = normalizedUrl.split('embed/')[1]?.split('?')[0];
    }

    if (videoId) {
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&muted=1&loop=1&playlist=${videoId}`,
        platform: 'youtube',
        canEmbed: true,
        originalUrl: normalizedUrl
      };
    }
  }

  // Vimeo processing
  if (normalizedUrl.includes('vimeo.com')) {
    let videoId = '';

    if (normalizedUrl.includes('vimeo.com/')) {
      videoId = normalizedUrl.split('vimeo.com/')[1]?.split('?')[0];
    }

    if (videoId && /^\d+$/.test(videoId)) {
      return {
        embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1`,
        platform: 'vimeo',
        canEmbed: true,
        originalUrl: normalizedUrl
      };
    }
  }

  // Google Drive processing
  if (normalizedUrl.includes('drive.google.com')) {
    let fileId = '';

    // Extract file ID from various Google Drive URL formats
    if (normalizedUrl.includes('/file/d/')) {
      fileId = normalizedUrl.split('/file/d/')[1]?.split('/')[0];
    } else if (normalizedUrl.includes('id=')) {
      fileId = normalizedUrl.split('id=')[1]?.split('&')[0];
    }

    if (fileId) {
      return {
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        platform: 'googledrive',
        canEmbed: true,
        originalUrl: normalizedUrl
      };
    }
  }

  // Gumlet processing
  if (normalizedUrl.includes('gumlet.tv')) {
    let videoId = '';

    if (normalizedUrl.includes('/watch/')) {
      videoId = normalizedUrl.split('/watch/')[1]?.split('/')[0];
    } else if (normalizedUrl.includes('/embed/')) {
      videoId = normalizedUrl.split('/embed/')[1]?.split('/')[0];
    }

    if (videoId) {
      return {
        embedUrl: `https://gumlet.tv/embed/${videoId}?autoplay=true&muted=true&loop=true&controls=true`,
        platform: 'gumlet',
        canEmbed: true,
        originalUrl: normalizedUrl
      };
    }
  }

  // Direct video file URLs (mp4, webm, ogg)
  if (normalizedUrl.match(/\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i)) {
    return {
      embedUrl: normalizedUrl,
      platform: 'direct',
      canEmbed: true,
      originalUrl: normalizedUrl
    };
  }

  // Unknown or unsupported platform
  return {
    embedUrl: normalizedUrl,
    platform: 'unknown',
    canEmbed: false,
    originalUrl: normalizedUrl
  };
}

/**
 * Get a human-readable platform name
 */
export function getPlatformName(platform: ProcessedVideoUrl['platform']): string {
  switch (platform) {
    case 'youtube':
      return 'YouTube';
    case 'vimeo':
      return 'Vimeo';
    case 'googledrive':
      return 'Google Drive';
    case 'gumlet':
      return 'Gumlet';
    case 'direct':
      return 'Direct Video';
    default:
      return 'Unknown Platform';
  }
}

/**
 * Check if a URL is a supported video platform
 */
export function isSupportedVideoPlatform(url: string): boolean {
  const processed = processVideoUrl(url);
  return processed.canEmbed;
}