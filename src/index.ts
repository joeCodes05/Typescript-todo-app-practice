import { v4 as uuidV4 } from "uuid";

type Task = { id: string; title: string; completed: boolean; createdAt: Date };

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTask();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTask();

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.addEventListener("change", () => {
    task.completed = checkBox.checked;
    saveTask();
  });
  checkBox.type = "checkbox";
  checkBox.checked = task.completed;
  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTask(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
