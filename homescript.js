// Function to load the background theme on page load
function loadBackground() {
  try {
    const savedTheme = localStorage.getItem('selectedTheme'); // Get the saved theme from localStorage
    if (savedTheme) {
      console.log(`Loading saved theme: ${savedTheme}`);
      const videoElement = document.querySelector('.back-video');
      videoElement.src = `image/${savedTheme}`; // Set the background video source based on the selected theme
    } else {
      console.log("No saved theme found.");
    }
  } catch (error) {
    console.error("Error loading the background:", error);
  }
}

// Update Time and Date
function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}

// Run updateTime every second
setInterval(updateTime, 1000);

// Get references to elements
const todoContainer = document.getElementById('todo-container');
const todoButton = document.querySelector('.floating-buttons .button:nth-child(4)');
const minimizeButton = document.getElementById('minimize-btn');
const addTaskButton = document.getElementById('add-task-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Toggle to-do list visibility
todoButton.addEventListener('click', () => {
  todoContainer.classList.toggle('hidden');
});

// Minimize the to-do list
minimizeButton.addEventListener('click', () => {
  todoContainer.classList.add('hidden');
});

// Load To-Do list from localStorage
function loadTodoList() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  todoList.innerHTML = ''; // Clear the current list
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task}</span>
      <button class="delete-task-btn">Delete</button>
    `;
    listItem.querySelector('.delete-task-btn').addEventListener('click', () => {
      deleteTask(task);
    });
    todoList.appendChild(listItem);
  });
}

// Add a new task to the list
function addTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTodoList(); // Re-render the list
}

// Delete a task from the list
function deleteTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  loadTodoList(); // Re-render the list
}

// Handle adding a new task
addTaskButton.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    addTask(task);
    todoInput.value = ''; // Clear the input
  }
});

// Handle Enter key for adding tasks
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click();
  }
});

// Load the To-Do list and background when the page loads
window.onload = function() {
  loadBackground(); // Load the background theme
  loadTodoList();   // Load the To-Do list from localStorage
  updateTime();     // Start updating the time
};
