// Load background from localStorage
function loadBackground() {
  try {
    const savedTheme = localStorage.getItem('selectedTheme'); // Retrieve saved theme
    if (savedTheme) {
      console.log(`Loading saved theme: ${savedTheme}`);
      const videoElement = document.querySelector('.background-video');
      videoElement.src = `image/${savedTheme}`; // Set the source of the background video
    } else {
      console.log("No saved theme found.");
    }
  } catch (error) {
    console.error("Error loading the background:", error);
  }
}

// Call the loadBackground function when the page loads
window.onload = function () {
  loadBackground(); // Ensure the background loads with the selected theme
};

// Timer code
let timer = null;
let timeLeft = 25 * 60; // 25 minutes in seconds
const initialTime = 25 * 60; // Store initial time for resetting

function startTimer() {
  if (timer) return; // Prevent multiple timers from running

  const timeDisplay = document.getElementById("time");

  timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null; // Reset the timer variable
      alert("Time's up!");
    } else {
      timeLeft--;
    }
  }, 1000);
}

function stopTimer() {
  // Pause the timer by clearing the interval
  if (timer) {
    clearInterval(timer);
    timer = null; // Reset the timer variable
  }
}

function resetTimer() {
  // Reset the timer to the initial value and update the display
  stopTimer();
  timeLeft = initialTime;
  const timeDisplay = document.getElementById("time");
  timeDisplay.textContent = "25:00";
}
