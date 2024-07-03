"use strict";
const task = document.getElementById("task");
const add = document.getElementById("add");
const list = document.getElementById("list");
let tasks = loadTasks();
function loadTasks() {
    const tasksJson = localStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((totalTask, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('flex', 'justify-between', 'items-center', 'border-b', 'py-2');
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('flex', 'items-center', 'flex-grow');
        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.classList.add('mr-2');
        const taskText = document.createElement('span');
        taskText.textContent = totalTask;
        taskText.classList.add('flex-grow', 'px-2');
        taskCheckbox.addEventListener('change', () => {
            if (taskCheckbox.checked) {
                taskText.classList.add('line-through', 'text-gray-500');
            }
            else {
                taskText.classList.remove('line-through', 'text-gray-500');
            }
        });
        taskContainer.appendChild(taskCheckbox);
        taskContainer.appendChild(taskText);
        const editButton = document.createElement('button');
        editButton.classList.add('w-[30px]', 'h-[30px]', 'mr-1');
        editButton.innerHTML = '<i class="fa-regular fa-pen-to-square fa-sm" style="color: #FFD43B;"></i>';
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('w-[30px]', 'h-[30px]');
        deleteButton.innerHTML = '<i class="fa-regular fa-trash-can fa-sm" style="color: #ff0000;"></i>';
        editButton.addEventListener('click', () => editTask(index));
        deleteButton.addEventListener('click', () => deleteTask(index));
        taskElement.appendChild(taskContainer);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);
        list.appendChild(taskElement);
    });
}
function addTask(totalTask) {
    tasks.push(totalTask);
    saveTasks();
    renderTasks();
}
function editTask(index) {
    const newTask = prompt('Edit Task: ', tasks[index]);
    if (newTask !== null) {
        tasks[index] = newTask;
        saveTasks();
        renderTasks();
    }
}
function deleteTask(index) {
    if (confirm(`Are you sure you want to delete "${tasks[index]}"?`)) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}
add.addEventListener('click', () => {
    const taskText = task.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        task.value = '';
    }
    else {
        alert('Please enter a task!');
    }
});
task.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const taskText = task.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            task.value = '';
        }
        else {
            alert('Please enter a task!');
        }
    }
});
renderTasks();
