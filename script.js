let points = 0;

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">X</button>
    <button class="complete-btn" onclick="completeTask(this)">Complete</button>
  `;
  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
}

function completeTask(button) {
  const li = button.parentElement;
  const span = li.querySelector("span");

  const wasCompleted = li.classList.contains("completed");

  li.classList.toggle("completed");
  span.classList.toggle("completed");

  if (!wasCompleted) {
    alert("🎉 Congratulations! You completed a task!");
    points += 10;
    document.getElementById("pointsDisplay").innerText = `Points: ${points}`;
  }
}

function toggleTask(span) {
  span.parentElement.classList.toggle("completed");
}


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("taskInput").value = transcript;
    addTask(); 
  }

  recognition.onerror = function(event) {
    alert("Error recognizing speech: " + event.error);
  }

  function startListening() {
    recognition.start();
  }
} else {
  function startListening() {
    alert("Sorry, your browser does not support speech recognition.");
  }
}
