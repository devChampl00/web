class VideoPlayer {
    constructor(containerId) {
      // Store all elements as class properties
      this.container = document.getElementById(containerId);
      this.videoIframe = document.getElementById('video-iframe');
      this.playButton = document.getElementById('play-button');
      this.muteButton = document.getElementById('mute-button');
      this.volumeSlider = document.getElementById('volume-slider');
      this.progressContainer = document.getElementById('progress-container');
      this.progressFill = document.getElementById('progress-fill');
      this.timeDisplay = document.getElementById('time-display');
      this.fullscreenButton = document.getElementById('fullscreen-button');
      this.embedUrlInput = document.getElementById('embed-url');
      this.embedButton = document.getElementById('embed-button');
      this.sourceLabel = document.getElementById('source-label');

      // State properties
      this.isPlaying = false;
      this.isMuted = false;
      this.currentVolume = 50;
      this.currentProgress = 0;
      this.videoLength = 0;
      this.videoSource = 'YouTube';

      // Initialize player
      this.setupPlayer();
      this.setupEventListeners();
    }

    setupPlayer() {
      this.updatePlayButton();
      this.updateMuteButton();
      this.timeDisplay.textContent = '0:00 / 0:00';
      this.videoSource = this.detectVideoSource(this.videoIframe.src);
      this.sourceLabel.textContent = this.videoSource;

      // Add animations
      this.setupAnimations();
    }

    setupEventListeners() {
      this.playButton.addEventListener('click', () => this.togglePlay());
      this.muteButton.addEventListener('click', () => this.toggleMute());
      this.volumeSlider.addEventListener('input', (e) => this.handleVolume(e));
      this.progressContainer.addEventListener('click', (e) => this.handleProgressClick(e));
      this.fullscreenButton.addEventListener('click', () => this.toggleFullscreen());
      this.embedButton.addEventListener('click', () => this.embedVideo());
      this.embedUrlInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') this.embedVideo();
      });
    }

    // Move all your existing functions here as class methods
    // For example:
    detectVideoSource(url) {
      if (url.includes('youtube')) return 'YouTube';
      if (url.includes('vimeo')) return 'Vimeo';
      if (url.includes('dailymotion')) return 'Dailymotion';
      if (url.includes('twitch')) return 'Twitch';
      return 'External';
    }

    // ... Add all other methods similarly ...
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const player = new VideoPlayer('video-container');
});
