const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <div class="actions">
        <button onclick="removeTask(${index})">&times;</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    input.value = '';
    updateStorage();
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  updateStorage();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateStorage();
}

function updateStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener('submit', addTask);
renderTasks();
