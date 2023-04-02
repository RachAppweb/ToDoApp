let btN = document.querySelector(".add");
let inpuVal = document.querySelector("input");
let tasksDive = document.querySelector(".tasks");
let clearAll = document.querySelector(".clearall");
let otherARray = [];
if (window.localStorage.getItem("inpute")) {
  otherARray = JSON.parse(localStorage.getItem("inpute"));
}
getDATAFROMLocalStorage();

btN.onclick = function () {
  if (inpuVal.value != "" && !inpuVal.value.startsWith(" ")) {
    addTasktoArray(inpuVal.value);
    inpuVal.value = "";
  }
};
tasksDive.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatuTAskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
// clearAll.addEventListener("click", (e) => {
//   if (e.target.classList.contains("clearall")) {
//     window.localStorage.removeItem("inpute");

//     tasksDive.innerHTML = "";
//     inpuVal.value = "";
//   }
// });
clearAll.onclick = function () {
  window.localStorage.removeItem("inpute");
  tasksDive.innerHTML = "";
  otherARray = [];
};
function addTasktoArray(thearray) {
  let tasks = {
    id: Date.now(),
    title: thearray,
    completed: false,
  };
  otherARray.push(tasks);
  addTheArrayToPage(otherARray);
  addTHEARRRAyToLOcalStorag(otherARray);
}
function addTheArrayToPage(otherARray) {
  tasksDive.innerHTML = "";
  otherARray.forEach((task) => {
    let dive = document.createElement("div");
    dive.className = "task";
    if (task.completed) {
      dive.className = "task done";
    }
    dive.setAttribute("data-id", task.id);
    dive.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode(" DELETE "));
    dive.appendChild(span);
    tasksDive.appendChild(dive);
  });
}

function addTHEARRRAyToLOcalStorag(array) {
  window.localStorage.setItem("inpute", JSON.stringify(array));
}
function deleteTaskWith(dataid) {
  otherARray = otherARray.filter((task) => task.id != dataid);
  addTHEARRRAyToLOcalStorag(otherARray);
}
function getDATAFROMLocalStorage() {
  let taskf = window.localStorage.getItem("inpute");
  if (taskf) {
    let DATA = JSON.parse(taskf);
    addTheArrayToPage(DATA);
  }
}
function toggleStatuTAskWith(taskid) {
  for (let i = 0; i < otherARray.length; i++) {
    if (otherARray[i].id == taskid) {
      otherARray[i].completed == false
        ? (otherARray[i].completed = true)
        : (otherARray[i].completed = false);
    }
  }
  addTHEARRRAyToLOcalStorag(otherARray);
}
