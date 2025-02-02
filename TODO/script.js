// Initialize the todo list array
let todos = [];

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');

// Event listeners
todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', handleTodoClick);

// Function to add a new todo
function addTodo(e) {
    e.preventDefault();
    
    // Get the input value and trim whitespace
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        // Create a new todo object
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        
        // Add the new todo to the array
        todos.push(todo);
        
        // Render the updated todo list
        renderTodos();
        
        // Clear the input field
        todoInput.value = '';
    }
}

// Function to render the todo list
function renderTodos() {
    // Clear the existing list
    todoList.innerHTML = '';
    
    // Create and append todo items
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button class="delete-btn" data-id="${todo.id}">Delete</button>
        `;
        todoList.appendChild(li);
    });
    
    // Update the task counter
    updateTaskCount();
}

// Function to handle clicks on todo items (checkbox and delete button)
function handleTodoClick(e) {
    if (e.target.type === 'checkbox') {
        // Toggle the completed status
        const id = parseInt(e.target.dataset.id);
        const todo = todos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        renderTodos();
    } else if (e.target.classList.contains('delete-btn')) {
        // Delete the todo
        const id = parseInt(e.target.dataset.id);
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }
}

// Function to update the task counter
function updateTaskCount() {
    taskCount.textContent = todos.length;
}

// Initial render
renderTodos();