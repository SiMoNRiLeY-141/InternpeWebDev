function addTask() {
    var taskInput = document.getElementById("taskInput");
    var deadline = document.getElementById("deadline");
    var taskList = document.getElementById("taskList");
    if (taskInput.value === "") {
        alert("Please enter a task name!");
        return;
    }
    if (deadline.value === "") {
        alert("Please select a deadline!");
        return;
    }
    var task = taskInput.value;
    var deadlineValue = new Date(deadline.value);
    var today = new Date();
    var daysRemaining = Math.ceil((deadlineValue - today) / (1000 * 60 * 60 * 24));
    var div = document.createElement("div");
    div.classList.add("task-item");
    div.innerHTML = `<input type="checkbox" onclick="toggleCompletion(this)"> ${task} - ${daysRemaining} days remaining <button class="removeBtn" onclick="removeTask(this)">Remove</button>`;
    taskList.appendChild(div);
    saveTasksToLocalStorage();
    taskInput.value = "";
    deadline.value = "";
}
function toggleCompletion(checkbox) {
    var div = checkbox.parentNode;
    if (checkbox.checked) {
        div.classList.add("completed");
    } else {
        div.classList.remove("completed");
    }
    saveTasksToLocalStorage();
}
function removeTask(button) {
    var div = button.parentNode;
    div.parentNode.removeChild(div);
    saveTasksToLocalStorage();
}
function saveTasksToLocalStorage() {
    var tasks = document.querySelectorAll("#taskList .task-item");
    var tasksArray = [];
    tasks.forEach(function (task) {
        var completed = task.classList.contains("completed");
        tasksArray.push({
            taskName: task.innerText.split("-")[0].trim(),
            daysRemaining: task.innerText.split("-")[1].trim().split(" ")[0],
            completed: completed
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
function loadTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        var taskList = document.getElementById("taskList");
        tasks.forEach(function (task) {
            var div = document.createElement("div");
            div.classList.add("task-item");
            div.innerHTML = `<input type="checkbox" onclick="toggleCompletion(this)"> ${task.taskName} - ${task.daysRemaining} days remaining <button class="removeBtn" onclick="removeTask(this)">Remove</button>`;
            if (task.completed) {
                div.classList.add("completed");
                div.querySelector("input[type='checkbox']").checked = true;
            }
            taskList.appendChild(div);
        });
    }
}
window.onload = function () {
    loadTasksFromLocalStorage();
};
document.getElementById("addTaskBtn").addEventListener("click", addTask);
