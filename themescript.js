// Function to set the background video and save the theme
function setBackground(videoSrc) {
  // Set background for the current page
  let existingBackground = document.querySelector('.background-video');
  if (existingBackground) {
    existingBackground.src = `image/${videoSrc}`; // Update the source if already exists
  } else {
    const video = document.createElement('video');
    video.classList.add('background-video');
    video.src = `image/${videoSrc}`;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.zIndex = '-1';
    document.body.appendChild(video);
  }

  // Save the selected video source to localStorage
  localStorage.setItem('selectedTheme', videoSrc);
}

// Function to load the background theme on page load
function loadBackground() {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    const video = document.createElement('video');
    video.classList.add('background-video');
    video.src = `image/${savedTheme}`;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.zIndex = '-1';
    document.body.appendChild(video);
  }
}

// Load the background when the page loads
window.onload = loadBackground;
