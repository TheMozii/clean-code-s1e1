//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task"); // Add a new task.
const addButton = document.getElementsByTagName("button")[0]; // First button
const incompleteTaskHolder = document.getElementById("incompleteTasks"); // ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

//New task list item
const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("todo-list__checkbox");

    const label = document.createElement("label");
    label.innerText = taskString;
    label.classList.add("todo-list__task");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("todo-list__edit-input");

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("todo-list__edit-button");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("todo-list__delete-button");

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = "Delete task";
    
    deleteButton.appendChild(deleteButtonImg);

    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
};

const addTask = () => {
    if (!taskInput.value.trim()) return; // Prevent empty tasks

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = ""; // Clear input after adding task
};

//Edit an existing task.
const editTask = function() {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector(".todo-list__edit-input");
    const label = listItem.querySelector(".todo-list__task");
    const editBtn = listItem.querySelector(".todo-list__edit-button");
    
    if (listItem.classList.contains("todo-list__item--edit-mode")) {
        label.innerText = editInput.value.trim() || label.innerText;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("todo-list__item--edit-mode");
};

//Delete task.
const deleteTask = function() {
    this.parentNode.remove();
};

//Mark task completed
const taskCompleted = function() {
    completedTasksHolder.appendChild(this.parentNode);
    bindTaskEvents(this.parentNode, taskIncomplete);
};

const taskIncomplete = function() {
    incompleteTaskHolder.appendChild(this.parentNode);
    bindTaskEvents(this.parentNode, taskCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector(".todo-list__checkbox");
    const editButton = taskListItem.querySelector(".todo-list__edit-button");
    const deleteButton = taskListItem.querySelector(".todo-list__delete-button");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

[...incompleteTaskHolder.children].forEach(item => bindTaskEvents(item, taskCompleted));
[...completedTasksHolder.children].forEach(item => bindTaskEvents(item, taskIncomplete));

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.